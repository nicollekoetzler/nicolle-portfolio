"use client";

import { useEffect, useRef } from "react";

/** Seconds spent travelling between two phases, and resting on each one */
const TRAVEL = 0.9;
const REST = 0.45;
/** Pause at the last phase before the trail fades and the run starts over */
const HOLD = 1.6;
const FADE = 0.6;

type Point = { x: number; y: number };

/**
 * The yellow dot that walks the roadmap from phase to phase, leaving a trail
 * behind it and lighting up every phase it reaches. Rendered inside the
 * timeline <ol>, it reads the phase dots' positions from its parent.
 */
export default function TimelineRunner() {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const self = ref.current;
    const list = self?.parentElement;
    if (!self || !list) return;

    const phases = Array.from(list.querySelectorAll<HTMLElement>(".phase"));
    let points: Point[] = [];
    let vertical = false;

    const measure = () => {
      // layout offsets rather than on-screen boxes, so a transform on a parent (e.g. a reveal animation) can't skew them
      points = phases.map((phase) => {
        const dot = phase.querySelector<HTMLElement>(".phase__dot")!;
        return { x: phase.offsetLeft + dot.offsetLeft + dot.offsetWidth / 2, y: phase.offsetTop + dot.offsetTop + dot.offsetHeight / 2 };
      });
      vertical = Math.abs(points[points.length - 1].x - points[0].x) < 4;
      list.classList.toggle("is-vertical", vertical);
      list.style.setProperty("--run-x", `${points[0].x}px`);
      list.style.setProperty("--run-y", `${points[0].y}px`);
      // lets the vertical (mobile) line stop at the last phase instead of running past it
      list.style.setProperty("--run-end-y", `${points[points.length - 1].y}px`);
    };

    const runTime = () => (phases.length - 1) * (TRAVEL + REST);
    const cycle = () => runTime() + HOLD + FADE;

    let frame = 0;
    let start = 0;
    let lastReached = -1;

    const render = (now: number) => {
      // the first frame's timestamp can be a hair before `start`
      const t = (Math.max(0, now - start) / 1000) % cycle();
      // which leg we are on and how far along it
      let reached = phases.length - 1;
      let pos = points[reached];
      if (t < runTime()) {
        const step = TRAVEL + REST;
        const leg = Math.floor(t / step);
        const into = t - leg * step;
        const k = Math.min(1, into / TRAVEL);
        const ease = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const a = points[leg];
        const b = points[leg + 1];
        pos = { x: a.x + (b.x - a.x) * ease, y: a.y + (b.y - a.y) * ease };
        reached = k >= 1 ? leg + 1 : leg;
      }
      const fade = t > runTime() + HOLD ? 1 - (t - runTime() - HOLD) / FADE : 1;
      const done = vertical ? pos.y - points[0].y : pos.x - points[0].x;

      list.style.setProperty("--run-pos-x", `${pos.x}px`);
      list.style.setProperty("--run-pos-y", `${pos.y}px`);
      list.style.setProperty("--run-done", `${Math.max(0, done)}px`);
      list.style.setProperty("--run-fade", `${Math.max(0, fade)}`);

      if (fade < 1) reached = fade > 0.5 ? reached : -1;
      if (reached !== lastReached) {
        phases.forEach((phase, i) => phase.classList.toggle("is-reached", i <= reached));
        lastReached = reached;
      }
      frame = requestAnimationFrame(render);
    };

    const play = () => {
      if (frame || phases.length < 2) return;
      start = performance.now();
      lastReached = -1;
      list.classList.add("is-running");
      frame = requestAnimationFrame(render);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => resize.disconnect();
    const seen = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop()), {
      // the vertical (mobile) timeline is taller than the screen, so watch for any overlap
      rootMargin: "-15% 0px",
    });
    seen.observe(list);

    return () => {
      stop();
      resize.disconnect();
      seen.disconnect();
    };
  }, []);

  return (
    <li ref={ref} className="timeline__runner" aria-hidden="true">
      <span className="timeline__trail" />
      <span className="timeline__dot" />
    </li>
  );
}
