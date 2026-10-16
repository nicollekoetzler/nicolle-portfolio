"use client";

/* eslint-disable @next/next/no-img-element -- photos are plain <img> */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type Media = { src: string; w: number; h: number; alt: string; title: string; description: string };

type Phase = "closed" | "spreading" | "spread" | "focus" | "unfocus" | "gathering";
type Rect = { left: number; top: number; width: number; height: number };

/* little tilts for the pile and for the spread-out row */
const PILE_TILT = [-5, 4, -2, 1.5];
const SPREAD_TILT = [-3, 2, -1.5, 2.5];
const T_SPREAD = 520; // ms, pile → row
const T_FOCUS = 420; // ms, row → window

/** Where the cards sit when spread out: one centered row, or a 2-column grid on small screens */
function spreadRects(count: number): Rect[] {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cols = vw < 700 ? 2 : count;
  const rows = Math.ceil(count / cols);
  const gap = vw < 700 ? 14 : 24;
  const width = Math.min(260, (vw - 48 - gap * (cols - 1)) / cols);
  const height = width * 0.66;
  const totalW = cols * width + (cols - 1) * gap;
  const totalH = rows * height + (rows - 1) * gap;
  return Array.from({ length: count }, (_, i) => ({
    left: (vw - totalW) / 2 + (i % cols) * (width + gap),
    top: (vh - totalH) / 2 + Math.floor(i / cols) * (height + gap),
    width,
    height,
  }));
}

/** transform that makes an element laid out at `to` appear over `from` */
const flip = (from: DOMRect | Rect, to: Rect, tilt: number) =>
  `translate(${from.left + from.width / 2 - (to.left + to.width / 2)}px, ${from.top + from.height / 2 - (to.top + to.height / 2)}px) scale(${from.width / to.width}) rotate(${tilt}deg)`;

/**
 * Job media as a small pile of white-bordered photos. Opening spreads the pile into a row, then zooms one
 * photo into a window with its title and description; arrows / clicking the photo step through them.
 * Closing (red dot, ×, backdrop or Esc) reverses it: back to the row, then back into the pile.
 */
export default function JobMedia({ items, label }: { items: Media[]; label: string }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [index, setIndex] = useState(0);
  const [spread, setSpread] = useState<Rect[]>([]);
  const pileRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const winImgRef = useRef<HTMLImageElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const open = (i = 0) => {
    setIndex(i);
    setSpread(spreadRects(items.length));
    setPhase("spreading");
  };

  // pile → row (FLIP from each pile card)
  useLayoutEffect(() => {
    if (phase !== "spreading") return;
    cardRefs.current.forEach((el, i) => {
      const pile = pileRefs.current[i]?.getBoundingClientRect();
      if (!el || !pile) return;
      el.style.transition = "none";
      el.style.transform = flip(pile, spread[i], PILE_TILT[i % PILE_TILT.length]);
    });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.transition = "";
          el.style.transform = `rotate(${SPREAD_TILT[i % SPREAD_TILT.length]}deg)`;
        });
        setPhase("spread");
        later(() => setPhase("focus"), T_SPREAD + 120);
      }),
    );
  }, [phase, spread]);

  // row → window: the chosen card's photo grows into the window's photo
  useLayoutEffect(() => {
    if (phase !== "focus") return;
    const img = winImgRef.current;
    const card = cardRefs.current[index];
    if (!img || !card) return;
    const to = img.getBoundingClientRect();
    const from = card.getBoundingClientRect();
    img.style.transition = "none";
    img.style.transform = flip(from, to, SPREAD_TILT[index % SPREAD_TILT.length]);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        img.style.transition = "";
        img.style.transform = "none";
      }),
    );
    // only on entering focus, not on every next/prev
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const close = useCallback(() => {
    if (phase !== "focus") return;
    // window → row
    const img = winImgRef.current;
    const card = cardRefs.current[index];
    if (img && card) {
      const to = img.getBoundingClientRect();
      img.style.transform = flip(card.getBoundingClientRect(), to, SPREAD_TILT[index % SPREAD_TILT.length]);
    }
    setPhase("unfocus");
    later(() => {
      // row → pile
      cardRefs.current.forEach((el, i) => {
        const pile = pileRefs.current[i]?.getBoundingClientRect();
        if (el && pile) el.style.transform = flip(pile, spread[i], PILE_TILT[i % PILE_TILT.length]);
      });
      setPhase("gathering");
      later(() => {
        setPhase("closed");
        triggerRef.current?.focus({ preventScroll: true });
      }, T_SPREAD + 80);
    }, T_FOCUS);
  }, [phase, index, spread]);

  const step = useCallback((d: number) => setIndex((i) => (i + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (phase !== "focus") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, close, step]);

  const showing = phase !== "closed";
  const windowUp = phase === "focus" || phase === "unfocus";
  const current = items[index];

  return (
    <div className="jm">
      <button ref={triggerRef} type="button" className={showing ? "jm-pile is-out" : "jm-pile"} onClick={() => open(0)} aria-label={`Open ${items.length} photos`}>
        {items.map((m, i) => (
          <span
            key={m.src}
            ref={(el) => { pileRefs.current[i] = el; }}
            className="jm-pile__card"
            style={{ ["--tilt" as string]: `${PILE_TILT[i % PILE_TILT.length]}deg`, zIndex: items.length - i }}
          >
            <img src={m.src} alt="" width={m.w} height={m.h} loading="lazy" />
          </span>
        ))}
      </button>
      <div className="jm-label">
        <p className="jm-label__title">{label}</p>
        <p className="jm-label__meta">{items.length} photos · click to open</p>
      </div>

      {showing &&
        createPortal(
          <div
            className={`jm-stage is-${phase}`}
            role="dialog"
            aria-modal="true"
            aria-label={windowUp ? current.title : label}
            onClick={close}
          >
            {items.map((m, i) => (
              <div
                key={m.src}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={i === index ? "jm-card is-current" : "jm-card"}
                style={spread[i] && { left: spread[i].left, top: spread[i].top, width: spread[i].width, height: spread[i].height, zIndex: items.length - i, transitionDelay: phase === "spread" ? `${i * 40}ms` : "0ms" }}
              >
                <img src={m.src} alt="" width={m.w} height={m.h} />
              </div>
            ))}

            {windowUp && (
              <div className="jm-window" onClick={(e) => e.stopPropagation()}>
                <div className="jm-window__bar">
                  <button type="button" className="jm-dot jm-dot--close" onClick={close} aria-label="Close">
                    <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M3 3l4 4M7 3l-4 4" /></svg>
                  </button>
                  <span className="jm-dot jm-dot--min" aria-hidden="true" />
                  <span className="jm-dot jm-dot--max" aria-hidden="true" />
                  <span className="jm-window__count">{index + 1} / {items.length}</span>
                  <button type="button" className="jm-window__x" onClick={close} aria-label="Close">
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                  </button>
                </div>
                <div className="jm-window__media">
                  <img
                    key={current.src}
                    ref={winImgRef}
                    src={current.src}
                    alt={current.alt}
                    width={current.w}
                    height={current.h}
                    onClick={() => step(1)}
                  />
                  <button type="button" className="jm-nav jm-nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
                  </button>
                  <button type="button" className="jm-nav jm-nav--next" onClick={() => step(1)} aria-label="Next photo">
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
                  </button>
                </div>
                <div className="jm-window__text" key={current.title}>
                  <p className="jm-window__title">{current.title}</p>
                  <p className="jm-window__desc">{current.description}</p>
                </div>
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
