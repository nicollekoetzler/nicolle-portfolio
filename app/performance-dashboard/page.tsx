/* eslint-disable @next/next/no-img-element -- design exports keep their Figma sizes as plain <img> */
import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import Link from "next/link";
import "../case-connector/case-connector.css";
import "./performance-dashboard.css";

const mono = DM_Mono({ subsets: ["latin"], weight: ["400"], variable: "--cs-font-mono" });

export const metadata: Metadata = {
  title: "CG Performance Dashboard · Case Study · Nicolle Koetzler",
  description:
    "Case study: a client-facing performance dashboard for The Casely Group that brings website, SEO, speed, call and lead data for law firms into one place.",
};

const A = "/assets/performance-dashboard";

const meta = [
  { label: "Client", value: "The Casely Group" },
  { label: "Product", value: "Client performance dashboard" },
  { label: "Audience", value: "U.S. law firms" },
  { label: "Platform", value: "Web app" },
];

const goals = [
  { title: "One source of truth", text: "Bring web, SEO, speed, call and lead data into a single dashboard for each firm." },
  { title: "Plain-language metrics", text: "Pair technical scores like RES, LCP and CLS with a clear status and a short explanation." },
  { title: "Attention at a glance", text: "Use color-coded status and trends so what needs attention stands out without reading every number." },
  { title: "Built to scale", text: "Serve many firms with a client switcher and one consistent, reusable component system." },
];

const modules = [
  { name: "Overview", text: "A snapshot of web, leads and SEO metrics for the selected firm." },
  { name: "Web Development", text: "Site health and technical performance of the firm’s website." },
  { name: "Speed Insights", text: "Real Experience Score and Core Web Vitals, on desktop and mobile." },
  { name: "Call Tracking", text: "Incoming calls and where they come from." },
  { name: "Leads", text: "Every lead with its source, date and status, searchable and filterable." },
  { name: "Reports", text: "Periodic summaries of the firm’s performance." },
  { name: "Social Media", text: "How the firm’s social channels are performing." },
  { name: "Email Templates", text: "AI-assisted newsletters with per-recipient merge fields." },
];

const screens = [
  {
    id: "sign-in",
    eyebrow: "Sign in",
    title: "A focused front door",
    text: "A calm sign-in with email, Google or Apple. The right side previews real dashboard cards, so the first thing a client sees is the value: their data turned into insights.",
    images: [{ src: "pd-login.webp", w: 2880, h: 1856, alt: "CG Performance sign-in screen with a preview of dashboard cards" }],
  },
  {
    id: "overview",
    eyebrow: "Overview",
    title: "“How are we doing?” in seconds",
    text: "Metrics are grouped the way a firm thinks about them: Web Development, Leads Report and SEO Metrics. Every card follows the same pattern: one number, its context and a status color.",
    images: [{ src: "pd-overview.webp", w: 2880, h: 1618, alt: "Overview screen with web development, leads and SEO metric cards" }],
  },
  {
    id: "speed",
    eyebrow: "Speed Insights",
    title: "Technical scores, explained",
    text: "The Real Experience Score sits front and center with a plain-language verdict (“Excellent: above 90”), a monthly trend, and the four Core Web Vitals, each with a progress bar and a one-line explanation.",
    images: [{ src: "pd-speed.webp", w: 2880, h: 1618, alt: "Speed Insights screen with a Real Experience Score of 91 and Core Web Vitals" }],
  },
  {
    id: "leads",
    eyebrow: "Leads",
    title: "Every lead, in one table",
    text: "A dense but scannable table: a status dot, contact details, source icons (Google Ads, Meta, organic), date and quick actions, with filters, search and pagination for firms with thousands of leads.",
    images: [{ src: "pd-leads.webp", w: 2880, h: 1618, alt: "Leads dashboard table with status, contact details, source and actions" }],
  },
  {
    id: "email",
    eyebrow: "Email Templates",
    title: "Weekly updates, personalized at scale",
    text: "An internal tool for the team: browse email jobs by status, preview each personalized email, then edit its merge fields, including the AI-generated introduction, before sending.",
    images: [
      { src: "pd-email-preview.webp", w: 2880, h: 1618, alt: "Email Templates screen previewing a weekly newsletter" },
      { src: "pd-email-edit.webp", w: 2880, h: 1618, alt: "Email Templates screen editing a newsletter's merge fields" },
    ],
  },
];

export default function PerformanceDashboardPage() {
  return (
    <div className={`cs pd ${mono.variable}`}>
      <header className="cs-bar">
        <Link href="/" className="cs-bar__item">CG Performance</Link>
        <span className="cs-bar__item cs-bar__center">Case Study</span>
        <Link href="/" className="cs-bar__item cs-bar__right">Nicolle Koetzler</Link>
      </header>

      <main>
        <section className="pd-hero">
          <img className="pd-hero__logo" src={`${A}/cg-performance-logo.svg`} width={246} height={29} alt="CG Performance" />
          <h1 className="pd-hero__title">Performance Dashboard</h1>
          <p className="pd-hero__lead">
            One place for law firms to see how their website, SEO, calls and leads are performing, in plain language.
          </p>
          <dl className="pd-meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          <div className="pd-frame pd-hero__shot">
            <img src={`${A}/pd-overview.webp`} width={2880} height={1618} alt="CG Performance overview dashboard" />
          </div>
        </section>

        <section className="pd-challenge">
          <h2 className="cs-h2 pd-center">Challenges &amp; Goals</h2>
          <div className="pd-challenge__panels">
            <div className="pd-panel">
              <p className="pd-panel__label">The challenge</p>
              <p>
                Law firms invest heavily in their websites and marketing, but the data that shows whether it is
                working lives in separate tools (hosting, SEO audits, call tracking, form submissions) and is full of
                technical jargon. Without a single view, it is hard for a firm to know what is working and what needs
                attention.
              </p>
            </div>
            <div className="pd-panel pd-panel--accent">
              <p className="pd-panel__label">The goal</p>
              <p>
                A dashboard any attorney can open and understand in seconds, while still giving The Casely Group’s
                team the depth they need to manage dozens of firms.
              </p>
            </div>
          </div>
          <ol className="pd-goals">
            {goals.map((goal, i) => (
              <li key={goal.title}>
                <span className="pd-goals__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{goal.title}</h3>
                  <p>{goal.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="cs-split">
          <div className="cs-split__head">
            <h2 className="cs-h2">Product Structure</h2>
          </div>
          <div className="cs-split__text">
            <p>
              The navigation mirrors the questions a firm asks: is my website healthy and fast, where are my leads and
              calls coming from, and what has happened lately. Each module lives in a persistent sidebar, with a firm
              switcher at the top so the team can move between clients without losing their place.
            </p>
          </div>
        </section>

        <ul className="pd-modules">
          {modules.map((m, i) => (
            <li key={m.name}>
              <span className="pd-modules__index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{m.name}</h3>
              <p>{m.text}</p>
            </li>
          ))}
        </ul>

        <section className="pd-screens" aria-label="Screens">
          {screens.map((s, i) => (
            <article key={s.id} className={i % 2 ? "pd-screen pd-screen--flip" : "pd-screen"}>
              <div className="pd-screen__text">
                <p className="pd-screen__eyebrow">{s.eyebrow}</p>
                <h2 className="pd-screen__title">{s.title}</h2>
                <p>{s.text}</p>
              </div>
              <div className={s.images.length > 1 ? "pd-screen__media pd-screen__media--stack" : "pd-screen__media"}>
                {s.images.map((img) => (
                  <div key={img.src} className="pd-frame">
                    <img src={`${A}/${img.src}`} width={img.w} height={img.h} loading="lazy" alt={img.alt} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="pd-closing">
          <img src={`${A}/cg-performance-logo.svg`} width={246} height={29} loading="lazy" alt="CG Performance" />
          <Link className="pd-closing__link" href="/#work">
            Back to all projects <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
