"use client";

/* eslint-disable @next/next/no-img-element -- design exports keep their sizes as plain <img> */
import { useState } from "react";

export type Note = { x: number; y: number; title: string; text: string };

/** A product screen with numbered pins; hovering or tapping a pin or its note highlights the pair */
export default function Annotated({ src, w, h, alt, notes }: { src: string; w: number; h: number; alt: string; notes: Note[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="ar-shot">
      <div className="ar-shot__frame" onMouseLeave={() => setActive(null)}>
        <img src={src} width={w} height={h} alt={alt} loading="lazy" />
        {notes.map((n, i) => (
          <button
            key={n.title}
            type="button"
            className={active === i ? "ar-pin is-on" : "ar-pin"}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-label={n.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ol className="ar-notes" onMouseLeave={() => setActive(null)}>
        {notes.map((n, i) => (
          <li key={n.title} className={active === i ? "is-on" : undefined} onMouseEnter={() => setActive(i)}>
            <span aria-hidden="true">{i + 1}</span>
            <div><strong>{n.title}</strong><p>{n.text}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
