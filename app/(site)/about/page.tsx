/* eslint-disable @next/next/no-img-element -- the banner keeps its export size as a plain <img> */
import type { Metadata } from "next";
import Link from "next/link";

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
    <>
      <img
        className="v2-banner"
        src="/assets/v2/about-me.webp"
        width={2104}
        height={893}
        alt="Nicolle Koetzler"
      />

      <section className="v2-section v2-intro v2-intro--full">
        <h1 className="v2-page-title">Designer by craft, engineer by habit.</h1>
        <div className="v2-prose">
          <p>
            I’m a product designer and design engineer with 12+ years in digital
            design, and I build what I design. As Head of UX/UI Engineering at
            The Casely Group, I led a team of 20 designers and developers
            building websites, dashboards and web apps for more than 40 U.S. law
            firms, from client-facing performance dashboards to Case Connector,
            an attorney-to-attorney referral app that went from research to the
            App Store.
          </p>
          <p>
            My work lives where interface craft meets engineering. I design in
            Figma and build in React, Next.js and Tailwind, so the details
            survive the handoff, because I’m usually on both sides of it. I built
            and maintained our design system in Figma and code, and I brought
            AI-assisted design-to-code workflows into the team. AI helps me move
            from a rough brief to something real much faster; judgment, taste and
            a lot of care decide what’s actually worth shipping.
          </p>
          <p>
            Before The Casely Group, I designed and built a learning platform
            that helps doctors prepare for nephrology residency, on web and
            mobile. I came to code by choice: after years of design, I went
            through more than 1,000 hours of software engineering training and a
            degree in Internet Systems, because I wanted to understand the whole
            product, not just the screens. I work remotely from Brazil with teams
            in the U.S., in Portuguese, fluent English and a little German.
          </p>
          <p>
            Outside of work, I’m a music nerd, a psychology enthusiast, and a
            cinephile. You’ll probably find me playing gigs as a bassist or DJ 🎧
          </p>
        </div>
        <div className="v2-actions">
          <Link className="v2-btn v2-btn--primary" href="/cv">
            See my CV
          </Link>
          <Link className="v2-btn" href="/contact">
            Get in touch
          </Link>
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
          <li>
            <strong>Portuguese</strong> Native
          </li>
          <li>
            <strong>English</strong> Fluent (C2)
          </li>
          <li>
            <strong>German</strong> Elementary (A2)
          </li>
        </ul>
      </section>
    </>
  );
}
