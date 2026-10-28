/* eslint-disable @next/next/no-img-element -- logo mark and design exports as plain <img> */
import type { Metadata } from "next";
import Logos from "../components/Logos";
import ProjectLayout, { type ProjectInfo } from "../components/ProjectAside";
import Reveal from "../case-connector/presentation/Reveal";
import "../case-connector/presentation/presentation.css";
import "./presentation/presentation.css";

/* New presentation for the CG Performance Dashboard, in the same structure as the Case Connector one: one short,
   skimmable page with the project's context in a full-height panel fixed to the right edge.
   The previous, longer case study is kept at /performance-dashboard/original. */
export const metadata: Metadata = {
  title: "CG Performance Dashboard · Case Study · Nicolle Koetzler",
  description: "CG Performance Dashboard: a client-facing dashboard that shows law firms how their website, SEO, calls and leads perform.",
};

const A = "/assets/performance-dashboard";

const project: ProjectInfo = {
  href: "/performance-dashboard",
  logo: <span className="pa-mark pd-mark"><img src={`${A}/cg-mark-white.svg`} width={22} height={21} alt="" /></span>,
  title: "CG Performance Dashboard",
  tagline: "One place for law firms to see how their website, SEO, calls and leads are performing, in plain language.",
  paragraphs: [],
  details: [
    { term: "My Role", value: ["Product Designer & Lead", "Design + Team Lead"] },
    { term: "Team", value: "Me + 6 developers" },
    { term: "Timeline", value: "3 months" },
    { term: "Client", value: "The Casely Group" },
  ],
  contact: true,
  tags: [
    { label: "Product Design", icon: "design" },
    { label: "Team Leadership", icon: "team" },
    { label: "Data Visualization", icon: "chart" },
    { label: "Design System", icon: "layers" },
  ],
};

const facts = [
  { value: "3 months", label: "from kickoff to launch" },
  { value: "6", label: "developers led" },
  { value: "30+", label: "law firms using it today" },
];

const goals = [
  { title: "One source of truth", text: "Bring web, SEO, speed, call and lead data into a single dashboard for each firm." },
  { title: "Plain-language metrics", text: "Pair technical scores like RES, LCP and CLS with a clear status and a short explanation." },
  { title: "Attention at a glance", text: "Use color-coded status and trends so what needs attention stands out without reading every number." },
  { title: "Built to scale", text: "Serve many firms with a client switcher and one consistent, reusable component system." },
];

const modules = [
  { name: "Overview", text: "A snapshot of web, leads and SEO metrics." },
  { name: "Web Development", text: "Site health and technical performance." },
  { name: "Speed Insights", text: "Real Experience Score and Core Web Vitals." },
  { name: "Call Tracking", text: "Incoming calls and where they come from." },
  { name: "Leads", text: "Every lead with its source, date and status." },
  { name: "Reports", text: "Periodic summaries of the firm’s results." },
  { name: "Social Media", text: "How the firm’s social channels perform." },
  { name: "Email Templates", text: "AI-assisted newsletters, personalized per recipient." },
];

const decisions = [
  {
    title: "A focused front door",
    text: "A calm sign-in with email, Google or Apple. The right side previews real dashboard cards, so the first thing a client sees is the value: their data turned into insights.",
    img: { src: "pd-login.webp", w: 2880, h: 1856, alt: "CG Performance sign-in screen with a preview of dashboard cards" },
  },
  {
    title: "“How are we doing?” in seconds",
    text: "Metrics are grouped the way a firm thinks about them: Web Development, Leads Report and SEO Metrics. Every card follows the same pattern: one number, its context and a status color.",
    img: { src: "pd-overview.webp", w: 2880, h: 1618, alt: "Overview screen with web development, leads and SEO metric cards" },
  },
  {
    title: "Technical scores, explained",
    text: "The Real Experience Score sits front and center with a plain-language verdict (“Excellent: above 90”), a monthly trend, and the four Core Web Vitals, each with a progress bar and a one-line explanation.",
    img: { src: "pd-speed.webp", w: 2880, h: 1618, alt: "Speed Insights screen with a Real Experience Score of 91 and Core Web Vitals" },
  },
  {
    title: "Every lead, in one table",
    text: "A dense but scannable table: a status dot, contact details, source icons (Google Ads, Meta, organic), date and quick actions, with filters, search and pagination for firms with thousands of leads.",
    img: { src: "pd-leads-3.webp", w: 2880, h: 1618, alt: "Leads dashboard table with status, contact details, source and actions" },
  },
  {
    title: "Weekly updates, personalized at scale",
    text: "An internal tool for the team: browse email jobs by status, preview each personalized email, then edit its merge fields, including the AI-generated introduction, before sending.",
    img: { src: "pd-email-preview.webp", w: 2880, h: 1618, alt: "Email Templates screen previewing a weekly newsletter" },
  },
];

export default function PerformanceDashboardPresentation() {
  return (
    <ProjectLayout info={project} flush>
      <main className="cp">
        <div className="cp-hero pd-cover">
          <img src={`${A}/pd-cover-trim.webp`} width={2321} height={1295} alt="CG Performance sign-in and leads dashboard screens" />
        </div>

        {/* the home's client logo carousel, minus HostGator */}
        <section className="cp-block cp-logos" aria-label="Trusted by">
          <div className="marquee">
            <div className="marquee__track">
              <Logos without={["hostgator"]} />
              <Logos without={["hostgator"]} hidden />
            </div>
          </div>
        </section>

        <section className="cp-block"><div className="cp-text">
          <h1>A dashboard any attorney can read in seconds</h1>
          <p className="cp-context">
            <strong>Some context:</strong> The Casely Group manages websites and marketing for U.S. law firms. Their
            clients invest heavily in both, but the data that shows whether it works lived in separate tools (hosting,
            SEO audits, call tracking, form submissions) and was full of technical jargon.
          </p>
          <dl className="cp-psr">
            <div><dt>Problem</dt><dd>Without a single view, a firm couldn’t tell what was working and what needed attention.</dd></div>
            <div><dt>Solution</dt><dd>A client-facing web dashboard that brings website, SEO, speed, call and lead data together, each number with a clear status and a short explanation.</dd></div>
            <div><dt>My role</dt><dd>I led the product and designed it end to end (information architecture, data visualization, UI and one reusable component system), and led the 6 developers who built it.</dd></div>
          </dl>
          <ul className="cp-facts">
            {facts.map((f) => (
              <li key={f.label}><strong>{f.value}</strong><span>{f.label}</span></li>
            ))}
          </ul>
        </div></section>

        <section className="cp-block"><div className="cp-text">
          <p className="cp-eyebrow">Goals</p>
          <h2>What the dashboard had to do</h2>
          <ol className="cp-goals">
            {goals.map((g) => (
              <li key={g.title}><strong>{g.title}</strong><span>{g.text}</span></li>
            ))}
          </ol>
        </div></section>

        <section className="cp-block"><div className="cp-text">
          <p className="cp-eyebrow">Architecture</p>
          <h2>Eight modules, one sidebar</h2>
          <p>
            The navigation mirrors the questions a firm asks: is my website healthy and fast, where are my leads and
            calls coming from, and what has happened lately. A firm switcher at the top lets the team move between
            clients without losing their place.
          </p>
          <ul className="pd-modules-grid">
            {modules.map((m, i) => (
              <li key={m.name}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{m.name}</strong>
                <p>{m.text}</p>
              </li>
            ))}
          </ul>
        </div></section>

        {decisions.map((d, i) => (
          <section key={d.title} className="cp-block pd-decision">
            <div className="cp-text">
              {i === 0 && (
                <>
                  <p className="cp-eyebrow">Key decisions</p>
                  <h2>How I thought about it</h2>
                </>
              )}
              <h3><span>{String(i + 1).padStart(2, "0")}</span>{d.title}</h3>
              <p>{d.text}</p>
            </div>
            <img className="pd-shot" src={`${A}/${d.img.src}`} width={d.img.w} height={d.img.h} alt={d.img.alt} loading="lazy" />
          </section>
        ))}

        <section className="cp-block"><div className="cp-text">
          <p className="cp-eyebrow">Outcome</p>
          <h2>In use by 30+ law firms</h2>
          <p>
            In 3 months, the dashboard went from idea to a live product. Today more than 30 law firms use it to see
            how their website, SEO, calls and leads are performing, in one place and in plain language, while The
            Casely Group’s team manages every client from the same tool.
          </p>
        </div></section>
        <Reveal />
      </main>
    </ProjectLayout>
  );
}
