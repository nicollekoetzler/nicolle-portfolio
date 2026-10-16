"use client";

/* eslint-disable @next/next/no-img-element -- thumbnails and the enlarged view are plain <img> */
import { useEffect, useState } from "react";

export type Media = { src: string; w: number; h: number; alt: string; title?: string; caption?: string };

/**
 * LinkedIn-style media under a job: small thumbnails (a captioned one shows its title and caption beside it).
 * Clicking a thumbnail opens it large over a dimmed backdrop; click anywhere or press Esc to close.
 */
export default function JobMedia({ items }: { items: Media[] }) {
  const [open, setOpen] = useState<Media | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const plain = items.filter((m) => !m.title);
  const captioned = items.filter((m) => m.title);

  const thumb = (m: Media) => (
    <button type="button" className="jm__thumb" onClick={() => setOpen(m)} aria-label={`Enlarge: ${m.alt}`}>
      <img src={m.src} alt={m.alt} width={m.w} height={m.h} loading="lazy" />
    </button>
  );

  return (
    <div className="jm">
      {plain.length > 0 && <div className="jm__row">{plain.map((m) => <div key={m.src}>{thumb(m)}</div>)}</div>}
      {captioned.map((m) => (
        <div key={m.src} className="jm__captioned">
          {thumb(m)}
          <div>
            <p className="jm__title">{m.title}</p>
            {m.caption && <p className="jm__caption">{m.caption}</p>}
          </div>
        </div>
      ))}

      {open && (
        <div className="jm__overlay" role="dialog" aria-modal="true" aria-label={open.alt} onClick={() => setOpen(null)}>
          <figure className="jm__figure">
            <img src={open.src} alt={open.alt} width={open.w} height={open.h} />
            {open.title && (
              <figcaption>
                <strong>{open.title}</strong>
                {open.caption && <span>{open.caption}</span>}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}
