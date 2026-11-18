"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EMAIL } from "../site";
import {
  analyzeLocally,
  briefLocally,
  briefText,
  BUDGETS,
  DEFAULT_SERVICES,
  emptyAnswers,
  estimate,
  featuresFor,
  followupLocally,
  INDUSTRIES,
  INTEGRATIONS,
  label,
  labels,
  money,
  OBJECTIVES,
  PRIORITIES,
  PROJECT_TYPES,
  SERVICES,
  STACKS,
  STAGES,
  stepComplete,
  stepsFor,
  TIMELINES,
  typeLabel,
  FEATURES,
  type Analysis,
  type Answers,
  type Brief,
  type Field,
  type Option,
  type ProjectType,
  type Step,
  type StepId,
} from "./engine";
import "./estimator.css";

/* Project Discovery & Budget Estimator: a short conversation that turns into a project brief and an estimate.
   The questions adapt to earlier answers (engine.ts), the AI reads the description, asks one tailored follow-up and
   drafts the brief (app/api/estimator), and the numbers always come from engine.ts so they stay consistent. */

type Mode = "flow" | "thinking" | "review" | "sent";
type Saved = { answers: Answers; current: StepId; analysis: Analysis | null; prefilled: StepId[]; followupKey: string };

const STORE = "nk-estimator-v1";
const EXAMPLES = [
  "A client portal for our law firm where clients upload documents, track their case and book calls.",
  "Redesign our SaaS onboarding; most users sign up but never finish setup.",
  "A mobile app for a fitness studio with class booking, memberships and push reminders.",
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
/* the AI never needs to know who the visitor is */
const forAi = (a: Answers) => ({ ...a, name: "", email: "", notes: "" });

async function askAi<T>(task: string, answers: Answers): Promise<T | null> {
  try {
    const res = await fetch("/api/estimator", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ task, answers: forAi(answers) }),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

const followupKeyOf = (a: Answers) => [a.projectType, a.industry, a.stage, ...a.features].join("|");

export default function ProjectEstimator() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [current, setCurrent] = useState<StepId>("describe");
  const [mode, setMode] = useState<Mode>("flow");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [prefilled, setPrefilled] = useState<StepId[]>([]);
  const [followupKey, setFollowupKey] = useState("");
  const [followupLoading, setFollowupLoading] = useState(false);
  const [thinking, setThinking] = useState<{ title: string; steps: string[]; done: number } | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [briefSource, setBriefSource] = useState<"ai" | "local">("local");
  const [returnToReview, setReturnToReview] = useState(false);
  const [sent, setSent] = useState<{ id: string; via: "email" | "mailto" } | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [restored, setRestored] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const honeypot = useRef<HTMLInputElement>(null);
  const turnRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const steps = useMemo(() => stepsFor(answers), [answers]);
  const index = Math.max(0, steps.findIndex((s) => s.id === current));
  const step = steps[index];
  const est = useMemo(() => estimate(answers), [answers]);
  const canContinue = stepComplete(step, answers);

  /* ---------- persistence: refreshing the page doesn't lose the conversation ---------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const s = JSON.parse(raw) as Saved;
        if (s?.answers) {
          setAnswers({ ...emptyAnswers, ...s.answers });
          setCurrent(s.current ?? "describe");
          setAnalysis(s.analysis ?? null);
          setPrefilled(s.prefilled ?? []);
          setFollowupKey(s.followupKey ?? "");
          if (s.current && s.current !== "describe") setRestored(true);
        }
      }
    } catch {}
  }, []);
  useEffect(() => {
    if (mode === "sent") return;
    try {
      localStorage.setItem(STORE, JSON.stringify({ answers, current, analysis, prefilled, followupKey } satisfies Saved));
    } catch {}
  }, [answers, current, analysis, prefilled, followupKey, mode]);

  const update = useCallback((patch: Partial<Answers>) => {
    setAnswers((a) => {
      const next = { ...a, ...patch };
      // switching project type drops capabilities that don't apply to the new one
      if (patch.projectType && patch.projectType !== a.projectType) {
        const ok = new Set(featuresFor(patch.projectType).map((f) => f.id));
        next.features = next.features.filter((f) => ok.has(f));
      }
      return next;
    });
    setError("");
  }, []);

  /* ---------- entering a step: pre-fill from the analysis, fetch the tailored question ---------- */
  const enter = useCallback(
    (id: StepId, a: Answers, an: Analysis | null) => {
      if (!prefilled.includes(id)) {
        const patch: Partial<Answers> = {};
        if (id === "type" && !a.projectType && an?.projectType) patch.projectType = an.projectType;
        if (id === "goals" && !a.objectives.length && an?.objectives.length) patch.objectives = an.objectives;
        if (id === "context" && !a.industry && an?.industry) patch.industry = an.industry;
        if (id === "services" && !a.services.length) patch.services = an?.services.length && an.projectType === a.projectType ? an.services : DEFAULT_SERVICES[a.projectType ?? "unsure"];
        if (id === "features" && !a.features.length && an?.features.length) {
          const ok = new Set(featuresFor(a.projectType).map((f) => f.id));
          patch.features = an.features.filter((f) => ok.has(f));
        }
        if (Object.keys(patch).length) update(patch);
        setPrefilled((p) => [...p, id]);
      }
      if (id === "followup") {
        const key = followupKeyOf(a);
        if (key !== followupKey && !a.followupAnswer.trim()) {
          setFollowupKey(key);
          setFollowupLoading(true);
          const started = Date.now();
          askAi<{ question: string; placeholder: string }>("followup", a).then(async (r) => {
            await wait(Math.max(0, 700 - (Date.now() - started)));
            update({ followupQuestion: r?.question || followupLocally(a).question });
            setFollowupLoading(false);
          });
        }
      }
    },
    [prefilled, followupKey, update],
  );

  const go = useCallback(
    (id: StepId, d: 1 | -1, a = answers, an = analysis) => {
      setDir(d);
      setCurrent(id);
      setRestored(false);
      enter(id, a, an);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [answers, analysis, enter],
  );

  const runSummary = useCallback(async () => {
    setMode("thinking");
    const list = ["Reading your answers", "Mapping requirements", "Calculating the investment", "Writing your brief"];
    setThinking({ title: "Drafting your project brief", steps: list, done: 0 });
    let i = 0;
    const tick = window.setInterval(() => setThinking((t) => (t ? { ...t, done: Math.min(++i, list.length - 1) } : t)), 650);
    const [r] = await Promise.all([askAi<{ brief: Brief; source: "ai" | "local" }>("summary", answers), wait(2400)]);
    window.clearInterval(tick);
    setThinking((t) => (t ? { ...t, done: list.length } : t));
    await wait(350);
    setBrief(r?.brief ?? briefLocally(answers, estimate(answers)));
    setBriefSource(r?.source === "ai" ? "ai" : "local");
    setReturnToReview(false);
    setThinking(null);
    setMode("review");
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [answers]);

  const next = useCallback(async () => {
    if (!stepComplete(step, answers)) return;
    if (returnToReview && step.id !== "describe") return runSummary();
    if (step.id === "describe") {
      setMode("thinking");
      setThinking({ title: "Reading your description", steps: ["Understanding the project", "Spotting requirements", "Tailoring the next questions"], done: 0 });
      let i = 0;
      const tick = window.setInterval(() => setThinking((t) => (t ? { ...t, done: Math.min(++i, 2) } : t)), 520);
      const [r] = await Promise.all([askAi<Analysis>("analyze", answers), wait(1600)]);
      window.clearInterval(tick);
      const an = r ?? analyzeLocally(answers.description);
      setAnalysis(an);
      // a new description means new suggestions
      setPrefilled([]);
      setThinking(null);
      setMode("flow");
      if (returnToReview) return runSummary();
      setDir(1);
      setCurrent("type");
      if (!answers.projectType && an.projectType) update({ projectType: an.projectType });
      setPrefilled(["type"]);
      return;
    }
    const nextStep = steps[index + 1];
    if (nextStep) go(nextStep.id, 1);
    else runSummary();
  }, [step, answers, returnToReview, runSummary, steps, index, go, update]);

  const back = () => {
    const prev = steps[index - 1];
    if (prev) go(prev.id, -1);
  };

  /* single-choice steps with one question move on by themselves, like answering in a chat */
  const autoAdvance = useRef<number | undefined>(undefined);
  const choose = (field: Field, id: string) => {
    update({ [field.key]: id } as Partial<Answers>);
    if (step.fields.length === 1 && field.kind === "single" && !returnToReview) {
      window.clearTimeout(autoAdvance.current);
      autoAdvance.current = window.setTimeout(() => {
        const n = steps[index + 1];
        if (n) go(n.id, 1, { ...answers, [field.key]: id });
      }, 380);
    }
  };
  useEffect(() => () => window.clearTimeout(autoAdvance.current), []);

  /* focus: text steps put the caret in the field (on devices with a mouse), others announce the question */
  useEffect(() => {
    if (mode !== "flow") return;
    const el = turnRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const input = el.querySelector<HTMLElement>("textarea, input:not([type=hidden])");
    if (fine && input && current !== "contact") input.focus({ preventScroll: true });
    else el.querySelector<HTMLElement>(".pe-q")?.focus({ preventScroll: true });
  }, [current, mode]);

  /* keyboard: 1-9 pick an option, Enter continues (⌘/Ctrl+Enter inside a text area) */
  useEffect(() => {
    if (mode !== "flow") return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t.tagName === "TEXTAREA" || t.tagName === "INPUT";
      if (e.key === "Enter" && (!typing || t.tagName === "INPUT" || e.metaKey || e.ctrlKey)) {
        if (t.tagName === "BUTTON" && !e.metaKey && !e.ctrlKey) return;
        e.preventDefault();
        next();
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      const n = Number(e.key);
      const first = step.fields[0];
      if (step.fields.length === 1 && n >= 1 && n <= 9 && (first.kind === "single" || first.kind === "multi")) {
        const opt = first.options[n - 1];
        if (!opt) return;
        e.preventDefault();
        if (first.kind === "single") choose(first, opt.id);
        else toggle(first, opt.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const toggle = (field: Field, id: string) => {
    const list = (answers[field.key] as string[]) ?? [];
    const has = list.includes(id);
    if (!has && field.kind === "multi" && field.max && list.length >= field.max) return;
    update({ [field.key]: has ? list.filter((x) => x !== id) : [...list, id] } as Partial<Answers>);
  };

  const restart = () => {
    try {
      localStorage.removeItem(STORE);
    } catch {}
    setAnswers(emptyAnswers);
    setAnalysis(null);
    setPrefilled([]);
    setFollowupKey("");
    setBrief(null);
    setSent(null);
    setReturnToReview(false);
    setRestored(false);
    setDir(-1);
    setCurrent("describe");
    setMode("flow");
  };

  const edit = (id: StepId) => {
    setReturnToReview(true);
    setMode("flow");
    setDir(-1);
    setCurrent(id);
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async () => {
    if (!brief || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers, brief, website: honeypot.current?.value ?? "" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string; fallback?: string; error?: string };
      if (res.ok && data.ok) {
        setSent({ id: data.id ?? "", via: "email" });
      } else if (data.fallback === "mailto") {
        openMail(answers, brief, data.id);
        setSent({ id: data.id ?? "", via: "mailto" });
      } else {
        setError(data.error ?? "Something went wrong. Please try again, or email me directly.");
        setSending(false);
        return;
      }
      setMode("sent");
      try {
        localStorage.removeItem(STORE);
      } catch {}
    } catch {
      openMail(answers, brief);
      setSent({ id: "", via: "mailto" });
      setMode("sent");
    }
    setSending(false);
  };

  /* ---------- render ---------- */
  const showLive = Boolean(answers.projectType) && mode === "flow";
  const sectionNames = [...new Set(steps.map((s) => s.section))];

  return (
    <section ref={rootRef} className="pe" aria-label="Project discovery and budget estimator">
      <header className="pe-head">
        <span className="pe-badge"><Spark /> AI project consultation</span>
        <h1 className="v2-page-title">
          Let’s scope your project.
          <span>A few questions, a tailored brief and an estimate in about three minutes.</span>
        </h1>
      </header>

      <div className={`pe-console pe-console--${mode}`}>
        <div className="pe-glow" aria-hidden="true" />

        {(mode === "flow" || mode === "thinking") && (
          <div className="pe-bar">
            <div className="pe-progress">
              <div className="pe-progress__meta">
                <span className="pe-progress__section">{returnToReview ? "Editing" : step.section}</span>
                <span className="pe-progress__count">
                  {String(index + 1).padStart(2, "0")} <i>/</i> {String(steps.length).padStart(2, "0")}
                </span>
              </div>
              <ol className="pe-progress__track" aria-label={`Step ${index + 1} of ${steps.length}`}>
                {steps.map((s, i) => (
                  <li key={s.id} className={i < index ? "is-done" : i === index ? "is-current" : undefined} title={s.section} />
                ))}
              </ol>
              <ul className="pe-progress__sections" aria-hidden="true">
                {sectionNames.map((n) => (
                  <li key={n} className={n === step.section ? "is-current" : steps.findIndex((s) => s.section === n) < index ? "is-done" : undefined}>{n}</li>
                ))}
              </ul>
            </div>
            <LiveEstimate show={showLive} low={est.low} high={est.high} confidence={est.confidence} />
          </div>
        )}

        {mode === "thinking" && thinking && <Thinking {...thinking} />}

        {mode === "flow" && (
          <>
            <div className="pe-body">
              {restored && (
                <div className="pe-note">
                  <span>Welcome back. I kept your answers so you can pick up where you left off.</span>
                  <button type="button" onClick={restart}>Start over</button>
                </div>
              )}
              <Transcript steps={steps} index={index} answers={answers} onEdit={(id) => go(id, -1)} />

              <div key={current} ref={turnRef} className={dir === 1 ? "pe-turn" : "pe-turn is-back"}>
                {current === "type" && analysis?.insight && (
                  <Message>{analysis.insight}</Message>
                )}
                <Message question>
                  {current === "followup" && followupLoading ? <span className="pe-shimmer">Thinking of the right question for you…</span> : step.prompt}
                </Message>
                {step.sub && <p className="pe-sub">{step.sub}</p>}

                <div className="pe-fields">
                  {step.fields.map((f) => (
                    <FieldView
                      key={String(f.key)}
                      field={f}
                      answers={answers}
                      suggested={suggestionsFor(f.key, analysis, answers.projectType)}
                      onChoose={choose}
                      onToggle={toggle}
                      onText={(k, v) => update({ [k]: v } as Partial<Answers>)}
                      hideNumbers={step.fields.length > 1}
                      disabled={current === "followup" && followupLoading}
                    />
                  ))}
                </div>

                {current === "describe" && !answers.description && (
                  <div className="pe-examples">
                    <span>Try an example</span>
                    {EXAMPLES.map((ex) => (
                      <button key={ex} type="button" onClick={() => update({ description: ex })}>{ex}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pe-foot">
              <button type="button" className="pe-ghost" onClick={back} disabled={index === 0}>
                <Arrow left /> Back
              </button>
              <span className="pe-hint" aria-hidden="true">
                {step.fields.some((f) => f.kind === "text") ? <><kbd>⌘</kbd><kbd>↵</kbd> to continue</> : <><kbd>↵</kbd> to continue</>}
              </span>
              <div className="pe-foot__end">
                {step.optional && !returnToReview && (
                  <button type="button" className="pe-ghost" onClick={next}>Skip</button>
                )}
                <button type="button" className="pe-primary" onClick={next} disabled={!canContinue}>
                  {returnToReview ? "Update brief" : index === steps.length - 1 ? "Generate my brief" : "Continue"}
                  {index === steps.length - 1 || returnToReview ? <Spark /> : <Arrow />}
                </button>
              </div>
            </div>
          </>
        )}

        {mode === "review" && brief && (
          <Review
            answers={answers}
            brief={brief}
            source={briefSource}
            est={est}
            steps={steps}
            onEdit={edit}
            onSubmit={submit}
            sending={sending}
            error={error}
            honeypot={honeypot}
          />
        )}

        {mode === "sent" && sent && brief && (
          <Sent id={sent.id} via={sent.via} name={answers.name} text={briefText(answers, est, brief)} onRestart={restart} />
        )}
      </div>
    </section>
  );
}

function openMail(a: Answers, b: Brief, id?: string) {
  const body = briefText(a, estimate(a), b);
  const subject = `${id ? `[${id}] ` : ""}Project inquiry: ${b.headline}`;
  // mail apps cap the URL length; the full brief is also on screen to copy
  const short = body.length > 1800 ? `${body.slice(0, 1780)}\n…` : body;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(short)}`;
}

function suggestionsFor(key: keyof Answers, an: Analysis | null, type?: ProjectType): string[] {
  if (!an) return [];
  if (key === "projectType") return an.projectType ? [an.projectType] : [];
  if (key === "industry") return an.industry ? [an.industry] : [];
  if (key === "objectives") return an.objectives;
  if (key === "features") return an.features;
  if (key === "services") return an.projectType === type ? an.services : [];
  return [];
}

/* ---------- pieces ---------- */

function Message({ children, question }: { children: React.ReactNode; question?: boolean }) {
  const text = typeof children === "string" ? children : null;
  const Tag = question ? "h2" : "p";
  return (
    <div className={question ? "pe-msg pe-msg--q" : "pe-msg"} aria-live={question ? undefined : "polite"}>
      <Orb />
      <Tag className={question ? "pe-q" : "pe-insight"} tabIndex={question ? -1 : undefined}>
        {text ? <Words text={text} /> : children}
      </Tag>
    </div>
  );
}

/* words fade in one after another, in CSS; screen readers get the plain sentence */
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="pe-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="pe-word" style={{ animationDelay: `${Math.min(i * 28, 900)}ms` }}>{w}{i < words.length - 1 ? " " : ""}</span>
        ))}
      </span>
    </>
  );
}

function Orb({ busy }: { busy?: boolean }) {
  return <span className={busy ? "pe-orb is-busy" : "pe-orb"} aria-hidden="true"><i /></span>;
}

function Spark() {
  return (
    <svg className="pe-spark" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.5c.4 2.9 1.6 4.6 4.5 5.1-2.9.5-4.1 2.2-4.5 5.1-.4-2.9-1.6-4.6-4.5-5.1 2.9-.5 4.1-2.2 4.5-5.1Z" />
      <path d="M13 10.5c.2 1.2.7 1.8 1.8 2-1.1.2-1.6.8-1.8 2-.2-1.2-.7-1.8-1.8-2 1.1-.2 1.6-.8 1.8-2Z" />
    </svg>
  );
}

/* line icons for the project types, drawn on the same 20px grid as the site's social icons */
function Glyph({ id }: { id: string }) {
  const d: Record<string, React.ReactNode> = {
    website: <><rect x="2.5" y="3.5" width="15" height="13" rx="2" /><path d="M2.5 7.5h15M5.5 5.5h.01M7.5 5.5h.01" /></>,
    webapp: <><rect x="2.5" y="3.5" width="15" height="13" rx="2" /><path d="M7.5 3.5v13M10 7.5h5M10 10.5h3.5" /></>,
    mobile: <><rect x="5.5" y="2.5" width="9" height="15" rx="2" /><path d="M9 14.5h2" /></>,
    dashboard: <><rect x="2.5" y="2.5" width="15" height="15" rx="2" /><path d="M6 14v-3M10 14V7M14 14v-5" /></>,
    ecommerce: <><path d="M3 4h2l1.6 8.5h8.4L16.5 6.5H6" /><circle cx="8" cy="15.5" r="1" /><circle cx="14" cy="15.5" r="1" /></>,
    designsystem: <><rect x="2.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="2.5" width="6" height="6" rx="3" /><rect x="2.5" y="11.5" width="6" height="6" rx="3" /><rect x="11.5" y="11.5" width="6" height="6" rx="1.5" /></>,
    audit: <><circle cx="9" cy="9" r="5.5" /><path d="m13 13 4 4M7 9l1.5 1.5L11.5 7.5" /></>,
    unsure: <><circle cx="10" cy="10" r="7.5" /><path d="M8 8a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2v.5M10 14h.01" /></>,
  };
  return <svg viewBox="0 0 20 20">{d[id] ?? d.unsure}</svg>;
}

function Arrow({ left }: { left?: boolean }) {
  return (
    <svg className="pe-arrow" viewBox="0 0 16 16" aria-hidden="true" style={left ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function Check() {
  return <svg className="pe-check" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>;
}

function useTween(value: number, ms = 650) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      setV(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const cur = a + (value - a) * (1 - Math.pow(1 - p, 3));
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return v;
}

function LiveEstimate({ show, low, high, confidence }: { show: boolean; low: number; high: number; confidence: number }) {
  const l = useTween(low);
  const h = useTween(high);
  return (
    <div className={show ? "pe-live is-on" : "pe-live"} aria-live="polite" aria-hidden={!show}>
      <span className="pe-live__label">Live estimate</span>
      <span className="pe-live__value">{money(Math.round(l / 100) * 100)} – {money(Math.round(h / 100) * 100)}</span>
      <span className="pe-live__conf" title={`Confidence grows as you answer: ${Math.round(confidence * 100)}%`}>
        <i style={{ width: `${Math.round(confidence * 100)}%` }} />
      </span>
    </div>
  );
}

function Thinking({ title, steps, done }: { title: string; steps: string[]; done: number }) {
  return (
    <div className="pe-thinking" role="status" aria-live="polite">
      <Orb busy />
      <p className="pe-thinking__title"><span className="pe-shimmer">{title}</span></p>
      <ul>
        {steps.map((s, i) => (
          <li key={s} className={i < done ? "is-done" : i === done ? "is-active" : undefined}>
            <span className="pe-thinking__mark">{i < done ? <Check /> : <i />}</span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* answers so far, as a compact transcript you can jump back into */
function Transcript({ steps, index, answers, onEdit }: { steps: Step[]; index: number; answers: Answers; onEdit: (id: StepId) => void }) {
  const [open, setOpen] = useState(false);
  const past = steps.slice(0, index).map((s) => ({ s, text: answerText(s, answers) })).filter((x) => x.text);
  if (!past.length) return null;
  const shown = open ? past : past.slice(-2);
  return (
    <div className="pe-transcript">
      {past.length > 2 && (
        <button type="button" className="pe-transcript__more" onClick={() => setOpen((o) => !o)}>
          {open ? "Show less" : `Show ${past.length - 2} earlier ${past.length - 2 === 1 ? "answer" : "answers"}`}
        </button>
      )}
      <ol>
        {shown.map(({ s, text }) => (
          <li key={s.id}>
            <button type="button" onClick={() => onEdit(s.id)} aria-label={`Edit: ${s.short}`}>
              <span className="pe-transcript__q">{s.short}</span>
              <span className="pe-transcript__a">{text}</span>
              <span className="pe-transcript__edit" aria-hidden="true">Edit</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function answerText(s: Step, a: Answers): string {
  return s.fields
    .map((f) => {
      const v = a[f.key];
      if (f.kind === "single") return label(f.options, v as string);
      if (f.kind === "multi") return labels(f.options, (v as string[]) ?? []).join(", ");
      return String(v ?? "").trim();
    })
    .filter(Boolean)
    .join(" · ");
}

type FieldProps = {
  field: Field;
  answers: Answers;
  suggested: string[];
  onChoose: (f: Field, id: string) => void;
  onToggle: (f: Field, id: string) => void;
  onText: (k: keyof Answers, v: string) => void;
  hideNumbers: boolean;
  disabled?: boolean;
};

function FieldView({ field, answers, suggested, onChoose, onToggle, onText, hideNumbers, disabled }: FieldProps) {
  const value = answers[field.key];
  const id = `pe-${String(field.key)}`;

  // options with descriptions render as cards, short ones as compact chips
  const rich = field.kind !== "text" && field.kind !== "input" && field.options.filter((o) => o.hint).length > field.options.length / 2;

  if (field.kind === "single") {
    return (
      <fieldset className="pe-field">
        {field.label && <legend className="pe-label">{field.label}</legend>}
        <div role="radiogroup" className={`pe-options pe-options--${field.columns ?? 2}${rich ? "" : " is-compact"}`}>
          {field.options.map((o, i) => (
            <OptionCard
              key={o.id}
              option={o}
              n={hideNumbers ? undefined : i + 1}
              checked={value === o.id}
              suggested={suggested.includes(o.id) && value === o.id}
              onClick={() => onChoose(field, o.id)}
              role="radio"
            />
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.kind === "multi") {
    const list = (value as string[]) ?? [];
    const full = Boolean(field.max && list.length >= field.max);
    return (
      <fieldset className="pe-field">
        {field.label && <legend className="pe-label">{field.label} {field.optional && <em>Optional</em>}</legend>}
        <div className={rich ? "pe-options pe-options--2" : "pe-chips"}>
          {field.options.map((o, i) =>
            rich ? (
              <OptionCard
                key={o.id}
                option={o}
                n={hideNumbers ? undefined : i + 1}
                checked={list.includes(o.id)}
                suggested={suggested.includes(o.id) && list.includes(o.id)}
                disabled={full && !list.includes(o.id)}
                onClick={() => onToggle(field, o.id)}
                multi
              />
            ) : (
              <button
                key={o.id}
                type="button"
                className={list.includes(o.id) ? "pe-chip is-on" : "pe-chip"}
                aria-pressed={list.includes(o.id)}
                disabled={full && !list.includes(o.id)}
                onClick={() => onToggle(field, o.id)}
              >
                <span className="pe-chip__box"><Check /></span>
                {o.label}
                {suggested.includes(o.id) && list.includes(o.id) && <span className="pe-tag" title="Suggested from your description"><Spark /></span>}
              </button>
            ),
          )}
        </div>
        {field.max && <p className="pe-count">{list.length} of {field.max} selected</p>}
      </fieldset>
    );
  }

  if (field.kind === "text") {
    const v = String(value ?? "");
    return (
      <div className="pe-field">
        {field.label && <label className="pe-label" htmlFor={id}>{field.label} {field.optional && <em>Optional</em>}</label>}
        <div className="pe-textarea">
          <textarea
            id={id}
            rows={field.rows ?? 3}
            value={v}
            maxLength={1200}
            placeholder={field.placeholder}
            disabled={disabled}
            onChange={(e) => onText(field.key, e.target.value)}
            aria-label={field.label ? undefined : "Your answer"}
          />
          <span className="pe-textarea__count" aria-hidden="true">{v.length > 0 ? `${v.length}/1200` : ""}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pe-field pe-field--input">
      <label className="pe-label" htmlFor={id}>{field.label} {field.optional && <em>Optional</em>}</label>
      <input
        id={id}
        type={field.type ?? "text"}
        value={String(value ?? "")}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        onChange={(e) => onText(field.key, e.target.value)}
      />
    </div>
  );
}

function OptionCard({
  option,
  n,
  checked,
  suggested,
  disabled,
  onClick,
  multi,
  role,
}: {
  option: Option;
  n?: number;
  checked: boolean;
  suggested?: boolean;
  disabled?: boolean;
  onClick: () => void;
  multi?: boolean;
  role?: "radio";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={role ? checked : undefined}
      aria-pressed={role ? undefined : checked}
      disabled={disabled}
      className={checked ? "pe-option is-on" : "pe-option"}
      onClick={onClick}
    >
      {option.glyph && <span className="pe-option__glyph" aria-hidden="true"><Glyph id={option.id} /></span>}
      <span className="pe-option__text">
        <span className="pe-option__label">
          {option.label}
          {suggested && <span className="pe-tag"><Spark /> Suggested</span>}
        </span>
        {option.hint && <span className="pe-option__hint">{option.hint}</span>}
      </span>
      {n && n <= 9 && <kbd className="pe-option__kbd" aria-hidden="true">{n}</kbd>}
      <span className={multi ? "pe-option__mark is-square" : "pe-option__mark"} aria-hidden="true"><Check /></span>
    </button>
  );
}

/* ---------- review ---------- */

function Review({
  answers: a,
  brief,
  source,
  est,
  steps,
  onEdit,
  onSubmit,
  sending,
  error,
  honeypot,
}: {
  answers: Answers;
  brief: Brief;
  source: "ai" | "local";
  est: ReturnType<typeof estimate>;
  steps: Step[];
  onEdit: (id: StepId) => void;
  onSubmit: () => void;
  sending: boolean;
  error: string;
  honeypot: React.RefObject<HTMLInputElement | null>;
}) {
  const low = useTween(est.low, 1100);
  const high = useTween(est.high, 1100);
  const budget = BUDGETS.find((b) => b.id === a.budget);
  // the range bar spans from zero to a little past the highest number on it
  const top = Math.max(est.high, budget && budget.id !== "unsure" ? Math.min(budget.range[1], est.high * 2) : 0) * 1.15;
  const pct = (n: number) => `${Math.min(100, (n / top) * 100)}%`;
  const fitText = {
    aligned: "Your budget lines up with the estimate.",
    stretch: "Your budget covers the lower end. Phasing the scope keeps it comfortable.",
    below: `Your budget is under the full scope. A lean first release (${money(est.mvpLow)}–${money(est.mvpHigh)}) fits better.`,
    above: "Your budget leaves room for extra polish, research or a faster timeline.",
    unknown: "Use this as a starting point. We’ll refine it together.",
  }[est.fit];

  const all: { id: StepId; label: string; value: string }[] = [
    { id: "describe", label: "In your words", value: a.description.trim() },
    { id: "type", label: "Project", value: [typeLabel(a.projectType), label(STAGES, a.stage)].filter(Boolean).join(" · ") },
    { id: "goals", label: "Objectives", value: labels(OBJECTIVES, a.objectives).join(", ") },
    { id: "context", label: "Business", value: [label(INDUSTRIES, a.industry), a.challenges.trim()].filter(Boolean).join(" · ") },
    { id: "services", label: "Services", value: labels(SERVICES, a.services).join(", ") },
    { id: "features", label: a.projectType === "audit" ? "Audit scope" : "Capabilities", value: labels(FEATURES, a.features).join(", ") },
    { id: "followup", label: "Follow-up", value: a.followupAnswer.trim() },
    { id: "tech", label: "Technology", value: [label(STACKS, a.stack), labels(INTEGRATIONS, a.integrations).join(", ")].filter(Boolean).join(" · ") },
    { id: "timeline", label: "Timeline", value: [label(TIMELINES, a.timeline), label(PRIORITIES, a.priority)].filter(Boolean).join(" · ") },
    { id: "budget", label: "Budget in mind", value: label(BUDGETS, a.budget) },
    { id: "contact", label: "Contact", value: [a.name, a.email, a.company].filter((x) => x.trim()).join(" · ") },
  ];
  const rows = all.filter((r) => r.value && steps.some((s) => s.id === r.id));

  return (
    <div className="pe-review">
      <div className="pe-review__head pe-rise">
        <span className="pe-badge pe-badge--soft">
          <Spark /> {source === "ai" ? "Brief drafted by AI from your answers" : "Brief drafted from your answers"}
        </span>
        <h2 className="pe-review__title">{brief.headline}</h2>
        <p className="pe-review__summary">{brief.summary}</p>
      </div>

      <div className="pe-invest pe-rise" style={{ animationDelay: "80ms" }}>
        <div className="pe-invest__top">
          <div>
            <p className="pe-eyebrow">Estimated investment</p>
            <p className="pe-invest__value">{money(Math.round(low / 100) * 100)} <i>–</i> {money(Math.round(high / 100) * 100)}</p>
            <p className="pe-invest__meta">{est.weeksLow}–{est.weeksHigh} weeks · USD · {a.timeline === "asap" ? "includes a rush factor" : "standard timeline"}</p>
          </div>
          <div className="pe-invest__side">
            <div><span>Lean MVP</span><strong>{money(est.mvpLow)} – {money(est.mvpHigh)}</strong></div>
            {est.retainer && <div><span>Ongoing support</span><strong>from {money(est.retainer)}/mo</strong></div>}
          </div>
        </div>

        <div className="pe-range" aria-hidden="true">
          {budget && budget.id !== "unsure" && (
            <span className="pe-range__budget" style={{ left: pct(budget.range[0]), width: `calc(${pct(Math.min(budget.range[1], top))} - ${pct(budget.range[0])})` }}>
              <em>Your budget</em>
            </span>
          )}
          <span className="pe-range__est" style={{ left: pct(est.low), width: `calc(${pct(est.high)} - ${pct(est.low)})` }}>
            <em>Estimate</em>
          </span>
        </div>
        <p className={`pe-fit pe-fit--${est.fit}`}><i aria-hidden="true" />{fitText}</p>

        <div className="pe-split">
          <p className="pe-eyebrow">Where the effort goes</p>
          <div className="pe-split__bar" aria-hidden="true">
            {est.breakdown.map((b, i) => <span key={b.label} className={`is-${i}`} style={{ flexGrow: b.share }} />)}
          </div>
          <ul className="pe-split__legend">
            {est.breakdown.map((b, i) => (
              <li key={b.label}><i className={`is-${i}`} />{b.label}<span>{Math.round(b.share * 100)}%</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pe-cols pe-rise" style={{ animationDelay: "160ms" }}>
        <div className="pe-card">
          <p className="pe-eyebrow">Key requirements</p>
          <ul className="pe-list">
            {brief.requirements.map((r) => <li key={r}><Check />{r}</li>)}
          </ul>
        </div>
        <div className="pe-card">
          <p className="pe-eyebrow">Things to consider</p>
          <ul className="pe-list pe-list--dots">
            {brief.considerations.map((c) => <li key={c}><i aria-hidden="true" />{c}</li>)}
          </ul>
        </div>
      </div>

      <div className="pe-card pe-approach pe-rise" style={{ animationDelay: "220ms" }}>
        <p className="pe-eyebrow">Recommended approach</p>
        <p>{brief.approach}</p>
      </div>

      <details className="pe-answers pe-rise" style={{ animationDelay: "280ms" }}>
        <summary>
          <span>Your answers</span>
          <span className="pe-answers__hint">Review or edit anything; the brief updates</span>
        </summary>
        <dl>
          {rows.map((r) => (
            <div key={r.id}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
              <button type="button" onClick={() => onEdit(r.id)} aria-label={`Edit ${r.label}`}>Edit</button>
            </div>
          ))}
        </dl>
      </details>

      <div className="pe-submit pe-rise" style={{ animationDelay: "340ms" }}>
        <input ref={honeypot} className="pe-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div>
          <p className="pe-submit__title">Ready to talk it through?</p>
          <p className="pe-submit__text">I’ll review your brief and reply within one business day with questions and next steps.</p>
        </div>
        <button type="button" className="pe-primary pe-primary--lg" onClick={onSubmit} disabled={sending}>
          {sending ? <span className="pe-spin" aria-hidden="true" /> : null}
          {sending ? "Sending…" : "Send inquiry"}
          {!sending && <Arrow />}
        </button>
        {error && <p className="pe-error" role="alert">{error}</p>}
      </div>
      <p className="pe-disclaimer">Estimates are a starting point based on similar projects, not a quote. Final pricing follows a short discovery call.</p>
    </div>
  );
}

function Sent({ id, via, name, text, onRestart }: { id: string; via: "email" | "mailto"; name: string; text: string; onRestart: () => void }) {
  const [copied, setCopied] = useState(false);
  const first = name.trim().split(" ")[0];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <div className="pe-sent" role="status">
      <span className="pe-sent__mark" aria-hidden="true"><Check /></span>
      <h2 className="pe-review__title">{via === "email" ? `Thanks${first ? `, ${first}` : ""}. Your brief is on its way.` : "Almost there: your email is ready."}</h2>
      <p className="pe-review__summary">
        {via === "email"
          ? "I’ve received your project brief and estimate. You’ll hear from me within one business day."
          : `Your email app should have opened with the brief written out. Just press send. If it didn’t open, copy the brief and send it to ${EMAIL}.`}
      </p>
      {id && <p className="pe-sent__ref">Reference <code>{id}</code></p>}
      <ol className="pe-next">
        <li><span>01</span><div><strong>I review your brief</strong><p>Within one business day</p></div></li>
        <li><span>02</span><div><strong>A 30-minute discovery call</strong><p>We confirm goals, scope and priorities</p></div></li>
        <li><span>03</span><div><strong>A detailed proposal</strong><p>Fixed scope, timeline and price</p></div></li>
      </ol>
      <div className="pe-sent__actions">
        <button type="button" className="pe-ghost pe-ghost--bordered" onClick={copy}>{copied ? "Copied" : "Copy brief"}</button>
        <button type="button" className="pe-ghost" onClick={onRestart}>Start a new brief</button>
      </div>
    </div>
  );
}
