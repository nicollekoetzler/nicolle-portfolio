/* eslint-disable @next/next/no-img-element -- logo mark and design exports as plain <img> */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../../components/ProjectAside";
import CaseConnectorPage from "../page";
import "./presentation.css";

/* New presentation for Case Connector, reworked after portfolio feedback: a 60-second summary (context for
   people outside legal tech, a clear role, key facts), three key decisions, and the full process tucked
   behind a toggle. The project's context sits in a full-height panel fixed to the right edge.
   Kept apart from the live page while it's being refined. */
export const metadata: Metadata = {
  title: "Case Connector · Nicolle Koetzler",
  description: "Case Connector: an attorney-to-attorney referral app for Trial Lawyers University.",
  robots: { index: false, follow: false },
};

const A = "/assets/case-connector";

const project: ProjectInfo = {
  kicker: "Trial Lawyers University",
  logo: <span className="pa-mark"><img src={`${A}/cc-emblem.png`} width={48} height={48} alt="" /></span>,
  title: "Case Connector",
  tagline: "A mobile app where U.S. attorneys refer cases to each other, from the first contact to the fee.",
  paragraphs: [
    "I led the product from the idea to the App Store: market research and interviews with attorneys, the full design on my own, and a team of 6 developers who built the app, with my hands in the code too.",
    "Every week I met with the team and with the attorneys at Trial Lawyers University, who sponsored the app, to review progress and decide what came next.",
  ],
  details: [
    { term: "My Role", value: ["Product Designer & Lead", "Design + Front-end"] },
    { term: "Team", value: ["Me (design)", "6 developers"] },
    { term: "Timeline", value: "4 months" },
    { term: "Platform", value: "iOS app" },
    { term: "Responsibilities", value: ["Product vision", "Research & interviews", "UX & UI design", "Team leadership", "Development"] },
  ],
};

const facts = [
  { value: "4 months", label: "from idea to the App Store" },
  { value: "6", label: "developers led" },
  { value: "1", label: "designer: me, end to end" },
];

const decisions = [
  {
    title: "Making each referral trackable",
    text: "Today, once a case is handed over, the referring attorney loses sight of it. Every referral in the app has a clear status, from proposal to signed case, and both sides see the same timeline, so nobody has to call to ask “where are we?”",
    img: { src: "cc-pres-3.webp", w: 3200, h: 2400, alt: "Four app screens: home, attorney profile, case details and case management" },
  },
  {
    title: "Profiles that earn trust",
    text: "Referrals run on trust. Instead of a directory, each attorney gets a profile with practice areas, track record and reviews, so you can decide who to send a client to in seconds.",
    img: { src: "cc-pres-2.webp", w: 3200, h: 3200, alt: "Attorney profile and the referral workflow" },
  },
  {
    title: "Updates where attorneys already are",
    text: "Attorneys live in their phones between hearings. Real-time notifications for new candidates, approvals and case activity mean nobody has to open the app to know something changed.",
    img: { src: "cc-lockscreen.webp", w: 3120, h: 1776, alt: "Lock screen notifications for referrals and case activity" },
  },
];

export default function CaseConnectorPresentation() {
  return (
    <ProjectLayout info={project} flush>
      <main className="cp">
        <div className="cp-hero">
          <video src="/assets/case-connector.mp4" poster={`${A}/cc-hero.webp`} autoPlay muted loop playsInline preload="metadata" aria-label="Case Connector app on a phone in a blue control room" />
        </div>

        <section className="cp-text">
          <p className="cp-eyebrow">The case in 60 seconds</p>
          <h1>A home for attorney-to-attorney referrals</h1>
          <p className="cp-context">
            <strong>Some context:</strong> in the U.S., when an attorney can’t take a case (it’s outside their
            practice area or their state), they refer the client to another attorney and share the fee. Referrals are
            a major source of new business for law firms, yet they still happen over phone calls, emails and texts,
            and nobody really knows where a case stands once it changes hands.
          </p>
          <dl className="cp-psr">
            <div><dt>Problem</dt><dd>Referrals were scattered across channels, with no visibility, no status and no record of who owed what.</dd></div>
            <div><dt>Solution</dt><dd>A mobile app where attorneys find the right partner, send and accept referrals, and follow each case to the end.</dd></div>
            <div><dt>My role</dt><dd>I shaped the product idea, interviewed attorneys, designed the whole app on my own, and led the 6 developers who built it, coding alongside them.</dd></div>
          </dl>
          <ul className="cp-facts">
            {facts.map((f) => (
              <li key={f.label}><strong>{f.value}</strong><span>{f.label}</span></li>
            ))}
          </ul>
        </section>

        <section className="cp-text">
          <p className="cp-eyebrow">Key decisions</p>
          <h2>How I thought about it</h2>
        </section>
        {decisions.map((d, i) => (
          <section key={d.title} className="cp-decision">
            <div className="cp-text">
              <h3><span>0{i + 1}</span>{d.title}</h3>
              <p>{d.text}</p>
            </div>
            <img src={`${A}/${d.img.src}`} width={d.img.w} height={d.img.h} alt={d.img.alt} loading="lazy" />
          </section>
        ))}

        <details className="cp-process">
          <summary>
            <span>See the full process</span>
            <small>Research, personas, market, app architecture, timeline and roadmap</small>
          </summary>
          <div className="cp-process__body">
            <CaseConnectorPage />
          </div>
        </details>
      </main>
    </ProjectLayout>
  );
}
