import { EMAIL } from "../../components/site";
import { briefLocally, briefText, estimate, isEmail, sanitizeAnswers, type Brief } from "../../components/estimator/engine";

/* Sends the finished project brief to Nicolle by email through Resend (https://resend.com), with Reply-To set to
   the client. Env: RESEND_API_KEY (required to send), INQUIRY_TO (defaults to the site email), INQUIRY_FROM (a sender
   on a domain verified in Resend). Without a key it answers 503 and the page falls back to opening the visitor's
   email app with the brief written out. */

const hits = new Map<string, number[]>();
function limited(ip: string, max = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > max;
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  let body: { answers?: unknown; brief?: Partial<Brief>; website?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  // honeypot: people never see this field, bots fill it in
  if (body.website) return Response.json({ ok: true, id: "NK-000000" });
  if (limited(ip)) return Response.json({ error: "Too many inquiries, please try again later." }, { status: 429 });

  const a = sanitizeAnswers(body.answers);
  if (!a.name.trim() || !isEmail(a.email)) return Response.json({ error: "Name and a valid email are required." }, { status: 400 });

  const e = estimate(a);
  const local = briefLocally(a, e);
  const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : "");
  const list = (v: unknown, fallback: string[]) => (Array.isArray(v) ? v.map((x) => str(x, 260)).filter(Boolean).slice(0, 6) : fallback);
  const brief: Brief = {
    ...local,
    headline: str(body.brief?.headline, 90) || local.headline,
    summary: str(body.brief?.summary, 700) || local.summary,
    requirements: list(body.brief?.requirements, local.requirements),
    considerations: list(body.brief?.considerations, local.considerations),
    approach: str(body.brief?.approach, 260) || local.approach,
  };
  const id = `NK-${Date.now().toString(36).slice(-6).toUpperCase()}`;

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email delivery is not configured.", fallback: "mailto", id }, { status: 503 });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM || "Project Estimator <onboarding@resend.dev>",
        to: [process.env.INQUIRY_TO || EMAIL],
        reply_to: a.email.trim(),
        subject: `[${id}] ${brief.headline} · ${a.name.trim()}`,
        text: briefText(a, e, brief),
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return Response.json({ error: "Couldn’t send right now.", fallback: "mailto", id }, { status: 502 });
  } catch {
    return Response.json({ error: "Couldn’t send right now.", fallback: "mailto", id }, { status: 502 });
  }
  return Response.json({ ok: true, id });
}
