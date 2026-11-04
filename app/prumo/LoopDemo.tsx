"use client";

import { useEffect, useState } from "react";

type Check = { label: string; value: string; ok: boolean; options?: string[] };
type Note = {
  id: string;
  tab: string;
  who: string;
  role: string;
  time: string;
  transcript: string;
  checks: Check[];
  report: string;
  stage: string;
  from: number;
  to: number;
  why: string;
};

/* sample data from the product's Reports screen */
const notes: Note[] = [
  {
    id: "rafael",
    tab: "Confident",
    who: "Rafael Souza",
    role: "Metalworker",
    time: "11:05",
    transcript: "Rafael from metalwork. Only four of the eight LaserTech sections arrived. I already drilled and welded those four. They said the rest comes Thursday. Put it at around fifty percent.",
    checks: [
      { label: "Person · by number", value: "Rafael Souza", ok: true },
      { label: "Project · 92%", value: "4-row display shelf", ok: true },
      { label: "Stage", value: "Metalwork", ok: true },
    ],
    report: "4 of 8 sections received, drilled and welded. The rest is expected Thursday.",
    stage: "Metalwork",
    from: 35,
    to: 50,
    why: "Prumo is sure who, where and what. It still asks, because progress moves on the project's timeline.",
  },
  {
    id: "ana",
    tab: "Unsure",
    who: "Ana",
    role: "Finishing",
    time: "09:47",
    transcript: "Ana here. The top is sanded and sealed, it's ready for assembly tomorrow.",
    checks: [
      { label: "Person · by number", value: "Ana", ok: true },
      { label: "Project", value: "", ok: false, options: ["4-row display shelf", "Service counter", "Apt. 1204 kitchen"] },
      { label: "Stage", value: "Finishing", ok: true },
    ],
    report: "Top sanded and sealed; released for assembly tomorrow.",
    stage: "Finishing",
    from: 80,
    to: 100,
    why: "She didn't say which project. Prumo won't guess: a person picks it, and then the note can move on.",
  },
  {
    id: "unknown",
    tab: "Unknown number",
    who: "(11) 95512-0098",
    role: "New number",
    time: "10:52",
    transcript: "Hi, it's about the delivery of the four remaining sections. We can get them to you on the first, before noon.",
    checks: [
      { label: "Person · new number", value: "", ok: false, options: ["LaserTech (supplier)", "Someone else"] },
      { label: "Project · likely", value: "4-row display shelf", ok: true },
      { label: "Stage", value: "Metalwork", ok: true },
    ],
    report: "Supplier confirms the 4 remaining sections by noon on the 1st.",
    stage: "Metalwork",
    from: 50,
    to: 50,
    why: "A stranger's message can't change a project on its own. A person says who this is first.",
  },
];

/** A working miniature of the Reports screen: a voice note comes in, the AI proposes, and you decide */
export default function LoopDemo() {
  const [tab, setTab] = useState(0);
  const note = notes[tab];
  const [shown, setShown] = useState(0);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Record<string, "applied" | "dismissed">>({});
  const [log, setLog] = useState<string[]>([]);

  const state = done[note.id];
  const typed = shown >= note.transcript.length;
  const missing = note.checks.some((c) => !c.ok && !picked[`${note.id}:${c.label}`]);

  // the transcript types itself out, as if the AI were listening
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(note.transcript.length);
      return;
    }
    setShown(0);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 2;
      setShown(i);
      if (i >= note.transcript.length) window.clearInterval(timer);
    }, 18);
    return () => window.clearInterval(timer);
  }, [note]);

  const decide = (result: "applied" | "dismissed") => {
    setDone((d) => ({ ...d, [note.id]: result }));
    setLog((l) => [
      result === "applied"
        ? `${note.stage}: ${note.report} Approved by you, from the voice note at ${note.time}.`
        : `Note from ${note.who} dismissed by you. Nothing changed.`,
      ...l,
    ]);
  };

  const progress = state === "applied" ? note.to : note.from;

  return (
    <div className="ar-demo">
      <div className="ar-demo__tabs" role="tablist" aria-label="Voice notes">
        {notes.map((n, i) => (
          <button key={n.id} type="button" role="tab" aria-selected={tab === i} className={tab === i ? "is-on" : undefined} onClick={() => setTab(i)}>
            {n.tab}{done[n.id] ? " ✓" : ""}
          </button>
        ))}
      </div>

      <div className="ar-demo__grid">
        <div className="ar-demo__note">
          <header>
            <span className="ar-demo__avatar" aria-hidden="true">{note.who.startsWith("(") ? "?" : note.who.split(" ").map((p) => p[0]).join("")}</span>
            <div><strong>{note.who}</strong><small>{note.role} · WhatsApp voice note · {note.time}</small></div>
          </header>
          <p className="ar-demo__transcript" aria-label={note.transcript}>
            <span aria-hidden="true">{note.transcript.slice(0, shown)}</span>
            {!typed && <i aria-hidden="true" />}
          </p>
        </div>

        <div className={typed ? "ar-demo__ai is-ready" : "ar-demo__ai"}>
          <p className="ar-demo__label">What Prumo understood</p>
          <ul className="ar-demo__checks">
            {note.checks.map((c) => {
              const key = `${note.id}:${c.label}`;
              return (
                <li key={c.label} className={c.ok || picked[key] ? "is-ok" : "is-ask"}>
                  <small>{c.ok || picked[key] ? "✓" : "?"} {c.label}</small>
                  {c.ok ? <strong>{c.value}</strong> : (
                    <select aria-label={c.label} value={picked[key] ?? ""} disabled={!!state} onChange={(e) => setPicked((p) => ({ ...p, [key]: e.target.value }))}>
                      <option value="" disabled>Choose…</option>
                      {c.options?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="ar-demo__report">{note.report}</p>
          <div className="ar-demo__stage">
            <span>{note.stage}</span>
            <div className="ar-demo__bar"><i style={{ width: `${progress}%` }} /></div>
            <span>{note.from === note.to ? `${note.to}%` : state === "applied" ? `${note.to}%` : `${note.from}% → ${note.to}%`}</span>
          </div>
          <p className="ar-demo__why">{note.why}</p>
          {state ? (
            <p className="ar-demo__done">{state === "applied" ? "Applied to the timeline." : "Dismissed. Nothing changed."}</p>
          ) : (
            <div className="ar-demo__actions">
              <button type="button" className="is-primary" disabled={!typed || missing} onClick={() => decide("applied")}>Apply to timeline</button>
              <button type="button" disabled={!typed} onClick={() => decide("dismissed")}>Dismiss</button>
            </div>
          )}
        </div>
      </div>

      {log.length > 0 && (
        <ul className="ar-demo__log" aria-label="Activity log">
          {log.map((l, i) => <li key={`${l}-${i}`}>{l}</li>)}
        </ul>
      )}
    </div>
  );
}
