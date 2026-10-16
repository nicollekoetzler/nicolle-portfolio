/* eslint-disable @next/next/no-img-element -- the banner keeps its export size as a plain <img> */
import type { Metadata } from "next";
import Link from "next/link";
import Shell from "../components/Shell";

export const metadata: Metadata = {
  title: "About · Nicolle Koetzler",
  description:
    "Nicolle Koetzler is a senior product designer and design engineer with 12+ years in digital design and 4+ years building production front ends.",
};

const stats = [
  { value: "12+", label: "years in digital design" },
  { value: "4+", label: "years building production front ends" },
  { value: "40+", label: "U.S. law firms served" },
  { value: "20", label: "designers & developers led" },
];

export default function About() {
  return (
    <Shell current="about">
      <img className="v2-banner" src="/assets/v2/about-me.webp" width={2104} height={893} alt="Nicolle Koetzler" />

      <section className="v2-section v2-intro v2-intro--full">
        <h1 className="v2-page-title">Designer by craft, engineer by habit.</h1>
        <div className="v2-prose">
          <p>
            I’m Nicolle, a senior product designer and design engineer based in Brazil, working remotely with U.S.
            teams. I’ve spent 12+ years in digital design and the last 4+ building production front ends.
          </p>
          <p>
            I like taking a product from a short brief to a shipped build: information architecture, data model,
            visual design and runnable React / Next.js + Tailwind code.
          </p>
          <p>
            Most recently I led a 20-person design and development team at The Casely Group, shipping websites,
            dashboards and web apps for 40+ U.S. law firms.
          </p>
        </div>
        <div className="v2-actions">
          <Link className="v2-btn v2-btn--primary" href="/cv">See my CV</Link>
          <Link className="v2-btn" href="/contact">Get in touch</Link>
        </div>
      </section>

      <ul className="v2-stats" aria-label="In numbers">
        {stats.map((s) => (
          <li key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      <section className="v2-section">
        <h2 className="v2-h2">Languages</h2>
        <ul className="v2-pills">
          <li><strong>Portuguese</strong> Native</li>
          <li><strong>English</strong> Fluent (C2)</li>
          <li><strong>German</strong> Elementary (A2)</li>
        </ul>
      </section>
    </Shell>
  );
}
