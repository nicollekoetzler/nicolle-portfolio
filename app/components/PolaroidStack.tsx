"use client";

/* eslint-disable @next/next/no-img-element -- small fixed-size photos as plain <img> */
import { Caveat } from "next/font/google";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const hand = Caveat({ subsets: ["latin"], weight: ["500"] });

/* the two photos tucked behind the top polaroid; they fly out big when the stack is opened */
const photos = [
  { src: "/assets/v2/polaroid-london.webp", alt: "Nicolle in London", caption: "london", stackTilt: -8, openTilt: -4 },
  { src: "/assets/v2/polaroid-street.webp", alt: "Nicolle walking down a street", caption: "wandering", stackTilt: 7, openTilt: 3 },
];

type Phase = "closed" | "opening" | "open" | "closing";

/**
 * Sidebar portrait as a small stack of polaroids. Clicking it pulls the two back polaroids out of the stack
 * into two large ones on screen (FLIP: they start exactly over their stacked copies, then animate to their
 * place); clicking anywhere or pressing Esc sends them back into the stack the same way.
 */
export default function PolaroidStack() {
  const [phase, setPhase] = useState<Phase>("closed");
  const backRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bigRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /** transform that puts big polaroid i exactly over its small copy in the stack */
  const fromStack = (i: number) => {
    const small = backRefs.current[i]?.getBoundingClientRect();
    const big = bigRefs.current[i];
    if (!small || !big) return "";
    // measure the big card untransformed
    const prev = big.style.transform;
    big.style.transform = "none";
    const r = big.getBoundingClientRect();
    big.style.transform = prev;
    const dx = small.left + small.width / 2 - (r.left + r.width / 2);
    const dy = small.top + small.height / 2 - (r.top + r.height / 2);
    // the small copy's box is its rotated bounding box; scale by the unrotated width instead
    const scale = (backRefs.current[i]?.offsetWidth ?? r.width) / r.width;
    return `translate(${dx}px, ${dy}px) scale(${scale}) rotate(${photos[i].stackTilt}deg)`;
  };

  useLayoutEffect(() => {
    if (phase !== "opening") return;
    // start over the stack, then release to the open layout on the next frame
    bigRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transition = "none";
      el.style.transform = fromStack(i);
    });
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        bigRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.transition = "";
          el.style.transform = `rotate(${photos[i].openTilt}deg)`;
        });
        setPhase("open");
      }),
    );
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const close = useCallback(() => {
    setPhase((p) => {
      if (p !== "open" && p !== "opening") return p;
      bigRefs.current.forEach((el, i) => {
        if (el) el.style.transform = fromStack(i);
      });
      return "closing";
    });
  }, []);

  // after the fly-back, unmount the overlay and hand focus back to the stack
  useEffect(() => {
    if (phase !== "closing") return;
    const t = window.setTimeout(() => {
      setPhase("closed");
      triggerRef.current?.focus({ preventScroll: true });
    }, 620);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, close]);

  const showing = phase !== "closed";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`pl-stack ${hand.className}${showing ? " is-out" : ""}`}
        onClick={() => setPhase("opening")}
        aria-label="Open photos of Nicolle"
        aria-expanded={showing}
      >
        {photos.map((p, i) => (
          <span
            key={p.src}
            ref={(el) => { backRefs.current[i] = el; }}
            className="pl pl--back"
            style={{ ["--tilt" as string]: `${p.stackTilt}deg` }}
            aria-hidden="true"
          >
            <img src={p.src} alt="" width={115} height={115} />
            <span className="pl__caption">{p.caption}</span>
          </span>
        ))}
        <span className="pl pl--top">
          <img src="/assets/v2/nicolle.webp" alt="Nicolle Koetzler" width={115} height={115} />
          <span className="pl__caption">that’s me</span>
        </span>
      </button>

      {showing &&
        createPortal(
          <div
            className={`pl-overlay ${hand.className}${phase === "open" ? " is-open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Photos of Nicolle"
            onClick={close}
          >
            <div className="pl-overlay__row">
              {photos.map((p, i) => (
                <div key={p.src} ref={(el) => { bigRefs.current[i] = el; }} className="pl pl--big" style={{ transitionDelay: `${i * 70}ms` }}>
                  <img src={p.src} alt={p.alt} width={800} height={1000} />
                  <span className="pl__caption">{p.caption}</span>
                </div>
              ))}
            </div>
            <p className="pl-overlay__hint">click anywhere to close</p>
          </div>,
          document.body,
        )}
    </>
  );
}
