import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader } from "../components/site";

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

const services = [
  {
    title: "Product design",
    text: "Information architecture, user flows, prototyping and design systems, from the first sketch to a polished UI.",
  },
  {
    title: "Design engineering",
    text: "Production React, Next.js and Tailwind, built from my own designs and kept in sync with Figma.",
  },
  {
    title: "AI-assisted delivery",
    text: "Directing and reviewing AI coding agents to ship faster without losing the details that matter.",
  },
];

export default function About() {
  return (
    <div className="page">
      <img className="glow glow--left" src="/assets/ellipse-8.svg" alt="" aria-hidden="true" />
      <SiteHeader current="about" />

      <main id="top" className="inner container">
        <section className="inner-hero about-hero">
          <div className="about-hero__text">
            <p className="eyebrow">About me</p>
            <h1 className="inner-title">
              I design products, <span className="muted">and I build them too.</span>
            </h1>
            <div className="prose">
              <p>
                I’m Nicolle, a senior product designer and design engineer based in Brazil, working remotely with
                U.S. teams. I’ve spent 12+ years in digital design and the last 4+ building production front ends.
              </p>
              <p>
                I like taking a product from a short brief to a shipped build: information architecture, data model,
                visual design and runnable React / Next.js + Tailwind code. I work every day with AI coding agents as a
                design-to-code partner, directing the work, reviewing every output and correcting it down to spacing
                and typography.
              </p>
              <p>
                Most recently I led a 20-person design and development team at The Casely Group, shipping websites,
                dashboards and web apps for 40+ U.S. law firms.
              </p>
            </div>
            <div className="hero__actions">
              <Link className="btn btn--primary" href="/cv">
                See my CV
                <Arrow variant="white" />
              </Link>
              <Link className="btn btn--link" href="/contact">
                Get in touch
                <Arrow variant="dark" />
              </Link>
            </div>
          </div>
          <div className="about-hero__photo">
            <Image src="/assets/photo-london.png" alt="Nicolle in London" fill sizes="(max-width: 960px) 90vw, 480px" priority />
          </div>
        </section>

        <ul className="stats" aria-label="In numbers">
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <section className="inner-section">
          <h2 className="section-title">What I do</h2>
          <ul className="cards">
            {services.map((s, i) => (
              <li key={s.title} className="card">
                <span className="card__index">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="inner-section inner-section--split">
          <h2 className="section-title">Languages</h2>
          <ul className="inline-list">
            <li><strong>Portuguese</strong> Native</li>
            <li><strong>English</strong> Fluent (C2)</li>
            <li><strong>German</strong> Elementary (A2)</li>
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
