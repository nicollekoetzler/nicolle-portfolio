import {
  analyzeLocally,
  briefLocally,
  estimate,
  FEATURES,
  followupLocally,
  INDUSTRIES,
  money,
  OBJECTIVES,
  PROJECT_TYPES,
  sanitizeAnswers,
  SERVICES,
  type Analysis,
  type Answers,
  type Brief,
  type ProjectType,
  briefText,
} from "../../components/estimator/engine";

/* The estimator's AI. Three small tasks, each answered as JSON:
   analyze  · read the visitor's own description and pre-fill type, industry, services and features
   followup · write one question tailored to everything answered so far
   summary  · turn the answers into a project brief (the numbers always come from engine.ts, never from the model)
   With ANTHROPIC_API_KEY set it asks Claude; without it, or if the call fails, it answers with the local heuristics,
   so the flow always works. ANTHROPIC_MODEL overrides the model. */

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";

/* a small per-instance limit so the endpoint can't be used as a free LLM proxy */
const hits = new Map<string, number[]>();
function limited(ip: string, max = 40, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

const SYSTEM = `You are the project discovery assistant on the portfolio of Nicolle Koetzler, a senior product designer and design engineer (12+ years; React, Next.js, Node.js; deep experience with law firms and legal tech, dashboards and mobile apps).
You help potential clients scope a project. Be warm, concise and concrete, like a senior consultant. Never invent prices, numbers of weeks or facts about the client. Write in the language the client wrote their description in.
Always reply with a single JSON object and nothing else.`;

async function askClaude(ai: boolean, prompt: string, maxTokens = 700): Promise<Record<string, unknown> | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!ai || !key) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system: SYSTEM, messages: [{ role: "user", content: prompt }] }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((c) => c.type === "text")?.text ?? "";
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    return json ? (JSON.parse(json) as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

const ids = (list: { id: string; label: string }[]) => list.map((o) => `${o.id} (${o.label})`).join(", ");
const pick = (v: unknown, list: { id: string }[]) => (typeof v === "string" && list.some((o) => o.id === v) ? v : undefined);
const pickMany = (v: unknown, list: { id: string }[]) =>
  Array.isArray(v) ? [...new Set(v.filter((x): x is string => typeof x === "string" && list.some((o) => o.id === x)))] : [];
const text = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : "");
const texts = (v: unknown, n: number, max: number) => (Array.isArray(v) ? v.map((x) => text(x, max)).filter(Boolean).slice(0, n) : []);

async function analyze(a: Answers, ai: boolean): Promise<Analysis & { source: string }> {
  const local = analyzeLocally(a.description);
  const out = await askClaude(
    ai,
    `A potential client described their project:
"""${a.description}"""

Return JSON with:
- "projectType": one of ${ids(PROJECT_TYPES)}
- "industry": one of ${ids(INDUSTRIES)}, or null if unclear
- "services": the services they most likely need, ids from ${ids(SERVICES)}
- "features": capabilities clearly implied by the description, ids from ${ids(FEATURES)} (only ones that fit the project type)
- "objectives": up to 3 likely business goals, ids from ${ids(OBJECTIVES)}
- "insight": one or two short sentences reflecting back what you understood and what stands out, ending with something like "I've pre-filled what I could." Address the client as "you".`,
  );
  if (!out) return { ...local, source: "local" };
  const projectType = (pick(out.projectType, PROJECT_TYPES) as ProjectType | undefined) ?? local.projectType;
  const allowed = new Set(FEATURES.filter((f) => f.types.includes(projectType ?? "unsure")).map((f) => f.id));
  return {
    projectType,
    industry: pick(out.industry, INDUSTRIES) ?? local.industry,
    services: pickMany(out.services, SERVICES).length ? pickMany(out.services, SERVICES) : local.services,
    features: pickMany(out.features, FEATURES).filter((f) => allowed.has(f)),
    objectives: pickMany(out.objectives, OBJECTIVES).slice(0, 3),
    insight: text(out.insight, 320) || local.insight,
    source: "ai",
  };
}

async function followup(a: Answers, ai: boolean) {
  const local = followupLocally(a);
  const out = await askClaude(
    ai,
    `Here is what a potential client has shared so far (JSON):
${JSON.stringify({ ...a, name: undefined, email: undefined })}

Ask the ONE follow-up question a senior consultant would ask next to remove the biggest uncertainty in scope or cost. Make it specific to their answers, not generic. Under 30 words.
Return JSON: {"question": string, "placeholder": "a short example answer starting with e.g."}`,
    300,
  );
  const question = text(out?.question, 240);
  return question ? { question, placeholder: text(out?.placeholder, 160) || local.placeholder, source: "ai" } : { ...local, source: "local" };
}

async function summary(a: Answers, ai: boolean) {
  const e = estimate(a);
  const local = briefLocally(a, e);
  const out = await askClaude(
    ai,
    `Write a project brief from this discovery session. The estimate is fixed and already shown to the client: ${money(e.low)}–${money(e.high)}, ${e.weeksLow}–${e.weeksHigh} weeks, budget fit "${e.fit}"; do not restate or change numbers except to mention a phased MVP (${money(e.mvpLow)}–${money(e.mvpHigh)}) if the fit is "below".

Session (plain text):
"""${briefText(a, e, local)}"""

Return JSON:
{"headline": "max 8 words, names the product, not the client's name",
 "summary": "2-3 sentences: what will be built, for whom, and the outcome it should drive",
 "requirements": ["3-6 key requirements, short phrases"],
 "considerations": ["2-3 risks, open questions or recommendations specific to this project, one sentence each"],
 "approach": "one sentence on the recommended way to run the project"}`,
    900,
  );
  if (!out) return { brief: local, source: "local" };
  const brief: Brief = {
    headline: text(out.headline, 90) || local.headline,
    summary: text(out.summary, 700) || local.summary,
    requirements: texts(out.requirements, 6, 120).length ? texts(out.requirements, 6, 120) : local.requirements,
    considerations: texts(out.considerations, 3, 260).length ? texts(out.considerations, 3, 260) : local.considerations,
    approach: text(out.approach, 260) || local.approach,
    phases: local.phases,
  };
  return { brief, source: "ai" };
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  let body: { task?: string; answers?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const a = sanitizeAnswers(body.answers);
  // over the limit: keep working, just without the model
  const ai = !limited(ip);
  switch (body.task) {
    case "analyze":
      return Response.json(await analyze(a, ai));
    case "followup":
      return Response.json(await followup(a, ai));
    case "summary":
      return Response.json(await summary(a, ai));
    default:
      return Response.json({ error: "Unknown task" }, { status: 400 });
  }
}
