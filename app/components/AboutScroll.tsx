"use client";

/* eslint-disable @next/next/no-img-element -- the portrait keeps its export size as a plain <img> */
import { useEffect, useRef } from "react";

/*
 * About page scroll story. The section is a tall scroll runway; inside it the card sticks to the top of the
 * viewport while scroll progress (0 → 1) drives three "screens" in the card (photo → UI mockup → the same
 * component as code) and two narrative headings that slide and crossfade in underneath.
 * Progress is written to CSS custom properties on the section, so the styles do the animating.
 */

const ease = (t: number) => t * t * (3 - 2 * t);
/** 0 → 1 between `from` and `to`, clamped and eased */
const ramp = (p: number, from: number, to: number) => ease(Math.min(1, Math.max(0, (p - from) / (to - from))));

const headings = [
  "I’m a product designer and design engineer with 12+ years in digital design.",
  "My work lives where interface craft meets engineering.",
];

function UiMockup() {
  const bars = [38, 52, 44, 63, 58, 72, 66, 84, 78, 92, 86, 100];
  return (
    <div className="ab-ui">
      <aside className="ab-ui__nav" aria-hidden="true">
        <span className="ab-ui__logo" />
        {Array.from({ length: 6 }, (_, i) => <span key={i} className={i === 1 ? "is-on" : undefined} />)}
      </aside>
      <div className="ab-ui__body">
        <p className="ab-ui__title">Leads overview</p>
        <div className="ab-ui__stats">
          <div className="ab-ui__stat is-accent">
            <span>New leads</span>
            <strong>1,284</strong>
            <em>▲ 12.4%</em>
          </div>
          <div className="ab-ui__stat">
            <span>Calls</span>
            <strong>342</strong>
            <em>▲ 4.1%</em>
          </div>
          <div className="ab-ui__stat">
            <span>Speed score</span>
            <strong>91</strong>
            <em>Excellent</em>
          </div>
        </div>
        <div className="ab-ui__chart">
          {bars.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
        </div>
      </div>
    </div>
  );
}

/* hand-highlighted so it stays tiny: k keyword, t tag, a attribute, s string, f function, n number, c comment */
function CodeView() {
  return (
    <pre className="ab-code" aria-label="React code for the stat card">
      <code>
        <span className="c">{"// the card from the mockup, in code"}</span>{"\n"}
        <span className="k">export function</span> <span className="f">StatCard</span>{"({ label, value, delta }) {\n"}
        {"  "}<span className="k">const</span>{" up = delta >= "}<span className="n">0</span>{";\n"}
        {"  "}<span className="k">return</span>{" (\n"}
        {"    <"}<span className="t">article</span> <span className="a">className</span>{"="}<span className="s">&quot;rounded-2xl bg-panel p-5&quot;</span>{">\n"}
        {"      <"}<span className="t">p</span> <span className="a">className</span>{"="}<span className="s">&quot;text-sm text-muted&quot;</span>{">{label}</"}<span className="t">p</span>{">\n"}
        {"      <"}<span className="t">strong</span> <span className="a">className</span>{"="}<span className="s">&quot;text-3xl font-semibold&quot;</span>{">\n"}
        {"        {value."}<span className="f">toLocaleString</span>{"()}\n"}
        {"      </"}<span className="t">strong</span>{">\n"}
        {"      <"}<span className="t">Delta</span> <span className="a">up</span>{"={up}>{"}<span className="f">formatPct</span>{"(delta)}</"}<span className="t">Delta</span>{">\n"}
        {"    </"}<span className="t">article</span>{">\n"}
        {"  );\n}"}
      </code>
    </pre>
  );
}

export default function AboutScroll() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const sticky = el.firstElementChild as HTMLElement;
      // 0 when the section's top reaches the sticky offset, 1 when the runway is used up
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const run = rect.height - sticky.offsetHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, (top - rect.top) / run)) : 0;
      const set = (name: string, v: number) => el.style.setProperty(name, v.toFixed(3));
      set("--photo", 1 - ramp(p, 0.12, 0.28));
      set("--ui", ramp(p, 0.12, 0.28) - ramp(p, 0.52, 0.68));
      set("--code", ramp(p, 0.52, 0.68));
      set("--h1-in", ramp(p, 0.16, 0.32));
      set("--h1-out", ramp(p, 0.52, 0.66));
      set("--h2-in", ramp(p, 0.58, 0.74));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={ref} className="ab-scroll" aria-label="From design to code">
      <div className="ab-scroll__sticky">
        <div className="ab-screen">
          <img className="ab-screen__layer ab-screen__photo" src="/assets/v2/about-me.webp" width={2104} height={893} alt="Nicolle Koetzler working on her laptop" />
          <div className="ab-screen__layer ab-screen__ui" aria-hidden="true">
            <div className="ab-window">
              <div className="ab-window__bar"><i /><i /><i /><span>Leads overview · Design</span></div>
              <UiMockup />
            </div>
          </div>
          <div className="ab-screen__layer ab-screen__code">
            <div className="ab-window">
              <div className="ab-window__bar"><i /><i /><i /><span>StatCard.tsx</span></div>
              <CodeView />
            </div>
          </div>
        </div>
        <div className="ab-captions">
          <p className="ab-caption ab-caption--1">{headings[0]}</p>
          <p className="ab-caption ab-caption--2">{headings[1]}</p>
        </div>
      </div>
    </section>
  );
}
