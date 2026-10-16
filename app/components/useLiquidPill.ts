"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export type LiquidPill = { left: number; right: number; dir: "left" | "right" | null; moving: boolean };

/**
 * Positions an absolutely placed pill under the item matching `selector` inside `containerRef`.
 * When the item changes it reports the direction of travel and a short `moving` phase, which the
 * .v2-liquid styles turn into a stretch-and-settle "liquid" move. Resizes reposition without animating.
 */
export function useLiquidPill(containerRef: RefObject<HTMLElement | null>, selector: string) {
  const [pill, setPill] = useState<LiquidPill>();

  useLayoutEffect(() => {
    const box = containerRef.current;
    if (!box) return;
    const measure = (animate: boolean) => {
      const item = box.querySelector<HTMLElement>(selector);
      if (!item) return;
      const left = item.offsetLeft;
      const right = box.clientWidth - left - item.offsetWidth;
      setPill((prev) => {
        const dir = animate && prev ? (left > prev.left ? "right" : left < prev.left ? "left" : prev.dir) : null;
        return { left, right, dir, moving: animate && !!prev && left !== prev.left };
      });
    };
    measure(true);
    const settle = window.setTimeout(() => setPill((p) => p && { ...p, moving: false }), 420);
    const onResize = () => measure(false);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("resize", onResize);
    };
  }, [containerRef, selector]);

  return pill;
}

export function liquidClass(base: string, pill: LiquidPill) {
  return [base, "v2-liquid", pill.dir && `is-${pill.dir}`, pill.moving && pill.dir && "is-moving"].filter(Boolean).join(" ");
}
