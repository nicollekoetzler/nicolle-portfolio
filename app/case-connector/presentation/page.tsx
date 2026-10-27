/* eslint-disable @next/next/no-img-element -- logo mark and design exports as plain <img> */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../../components/ProjectAside";
import { goals, marketProblems, marketSolutions, personas, phases, sitemap } from "../data";
import "./presentation.css";

/* New presentation for Case Connector, reworked after portfolio feedback: one short, skimmable page that
   still covers the whole project (context, role, research, market, architecture, key decisions, delivery),
   each part condensed to what a reviewer needs. The project's context sits in a full-height panel fixed to the right edge.
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

/* the four main areas of the app, from the architecture sitemap */
const areas = (sitemap.children?.[0]?.children ?? []).map((a) => ({ label: a.label === "Home" ? "Find & refer" : a.label, items: (a.children ?? []).map((c) => c.label) }));

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
          <p className="cp-eyebrow">Goals</p>
          <h2>What the app had to do</h2>
          <ol className="cp-goals">
            {goals.map((g) => (
              <li key={g.text}><strong>{g.title.join(" ")}</strong><span>{g.text}</span></li>
            ))}
          </ol>
        </section>

        <section className="cp-text">
          <p className="cp-eyebrow">Research</p>
          <h2>Two sides of every referral</h2>
          <p>
            I interviewed attorneys and met weekly with Trial Lawyers University. Every referral has two people with
            different needs: the attorney who sends the case and the one who takes it.
          </p>
          <div className="cp-personas">
            {personas.map((p) => (
              <article key={p.name} className="cp-persona">
                <header>
                  <img src={p.image} width={48} height={48} alt="" />
                  <div><strong>{p.name}</strong><span>{p.role}</span></div>
                </header>
                <p className="cp-persona__quote">{p.quote}</p>
                <dl>
                  <div><dt>Pain points</dt><dd>{p.pains.slice(0, 3).map((x) => <span key={x}>{x}</span>)}</dd></div>
                  <div><dt>What we built</dt><dd>{p.insights.slice(0, 3).map((x) => <span key={x}>{x}</span>)}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="cp-text">
          <p className="cp-eyebrow">Market</p>
          <h2>From problems to product</h2>
          <ul className="cp-map">
            {marketProblems.map((problem, i) => (
              <li key={problem}><span>{problem}</span><span aria-hidden="true">→</span><span>{marketSolutions[i]}</span></li>
            ))}
          </ul>
        </section>

        <section className="cp-text">
          <p className="cp-eyebrow">Architecture</p>
          <h2>Four areas, one connected app</h2>
          <p>Networking, case discovery and case management, usually spread across tools, live in one place.</p>
          <div className="cp-areas">
            {areas.map((a) => (
              <div key={a.label}>
                <strong>{a.label}</strong>
                <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
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

        <section className="cp-text">
          <p className="cp-eyebrow">Delivery</p>
          <h2>Built in 7 phases, in 4 months</h2>
          <p>I planned the build with the team in two-week phases, each ending in a working deliverable reviewed in our weekly meetings.</p>
          <ol className="cp-phases">
            {phases.map((ph, i) => (
              <li key={ph.title}>
                <span className="cp-phases__num">{i + 1}</span>
                <div>
                  <strong>{ph.title.replace(/^Phase \d+:\s*/, "")}</strong>
                  <small>{ph.date}</small>
                  <p>{ph.deliverable ?? ph.goal}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="cp-text">
          <p className="cp-eyebrow">Outcome</p>
          <h2>Launched on the App Store</h2>
          <p>
            In 4 months, Case Connector went from an idea to a launch-ready app on the App Store: attorneys can find
            the right partner, refer cases with clear and compliant fees, and follow every case to the end, sponsored
            and validated by Trial Lawyers University along the way.
          </p>
        </section>
      </main>
    </ProjectLayout>
  );
}
