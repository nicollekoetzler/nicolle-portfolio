/* eslint-disable @next/next/no-img-element -- design exports keep their Figma sizes as plain <img> */
import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";
import { goals, marketProblems, marketSolutions, personas, phases, sitemap, type Phase, type SitemapNode } from "./data";
import TimelineRunner from "./TimelineRunner";
import "./case-connector.css";

const display = localFont({
  src: "./fonts/BomstadDisplay-Regular.ttf",
  weight: "400",
  variable: "--cs-font-display",
});
const mono = DM_Mono({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--cs-font-mono" });

export const metadata: Metadata = {
  title: "Case Connector · Case Study · Nicolle Koetzler",
  description:
    "How Case Connector, an attorney-to-attorney referral app by Trial Lawyers University, was researched, structured, designed and built.",
};

const A = "/assets/case-connector";

function GoalIcon() {
  return (
    <svg className="phase__icon" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 8l5-5M11 3h2v2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DeliverableIcon() {
  return (
    <svg className="phase__icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M14.5 1.5L1.5 7l5 2 2 5 6-12.5zM6.5 9l8-7.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function TreeNode({ node, depth = 0 }: { node: SitemapNode; depth?: number }) {
  return (
    <li className={`tree__item tree__item--d${depth}`}>
      {/* nodes with children sit in a fixed-width slot so each level lines up in a column */}
      <span className={node.children ? "tree__slot" : undefined}>
        <span className={node.primary ? "tree__node tree__node--primary" : "tree__node"}>{node.label}</span>
      </span>
      {node.children && (
        <ul>
          {node.children.map((child, i) => (
            <TreeNode key={`${child.label}-${i}`} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const top = index % 2 === 1;
  return (
    <li className={`phase phase--${index + 1} ${top ? "phase--top" : "phase--bottom"}`}>
      <span className="phase__date">{phase.date}</span>
      <span className="phase__dot" aria-hidden="true" />
      <div className="phase__body">
        <h3 className="phase__title">{phase.title}</h3>
        <ul className="phase__list">
          <li className="phase__goal">
            <GoalIcon />
            <span><strong>Goal:</strong> {phase.goal}</span>
          </li>
          {phase.items.map((item) => (
            <li key={item} className="phase__item">{item}</li>
          ))}
          {phase.deliverable && (
            <li className="phase__goal">
              <DeliverableIcon />
              <span><strong>Deliverable:</strong> {phase.deliverable}</span>
            </li>
          )}
        </ul>
      </div>
    </li>
  );
}

export default function CaseConnectorPage() {
  return (
    <div className={`cs ${display.variable} ${mono.variable}`}>
      <header className="cs-bar">
        <a href="/" className="cs-bar__item">Case Connector</a>
        <span className="cs-bar__item cs-bar__center">Case Study</span>
        <a href="/" className="cs-bar__item cs-bar__right">Nicolle Koetzler</a>
      </header>

      <main>
        <div className="cs-hero">
          <video
            src="/assets/case-connector.mp4"
            poster={`${A}/cc-hero.webp`}
            aria-label="Case Connector app on a phone in a futuristic blue control room"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        </div>

        <section className="cs-split">
          <div className="cs-split__head">
            <h1 className="cs-h2">Challenges &amp; Goals</h1>
          </div>
          <div className="cs-split__text">
            <p>
              Attorney referrals are still heavily driven by personal relationships, but the process itself often
              happens across multiple channels. As opportunities move between firms, it becomes difficult to keep
              everything organized, track progress, and maintain visibility into what’s happening.
            </p>
            <p>
              The challenge was creating a platform that could bring structure to this process without disrupting the
              relationship-driven nature of the legal industry. Attorneys needed a simple way to discover
              opportunities, showcase their expertise, communicate with other firms, and stay informed throughout the
              referral process.
            </p>
          </div>
        </section>

        <ul className="cs-goals">
          {goals.map((goal) => (
            <li key={goal.text} className="cs-goal">
              <h2 className="cs-goal__title">
                {goal.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p>{goal.text}</p>
            </li>
          ))}
        </ul>

        <img
          className="cs-lockscreen"
          src={`${A}/cc-lockscreen.webp`}
          width={1560}
          height={888}
          loading="lazy"
          alt="Lock screen showing Case Connector notifications. Stay connected to your cases, wherever you are: receive real-time updates on referrals, approvals, and case activity."
        />

        <section className="cs-split cs-split--ruled">
          <div className="cs-split__head">
            <h2 className="cs-h2">App Architecture</h2>
          </div>
          <div className="cs-split__text">
            <p>
              Case Connector architecture was built around the attorney referral workflow, creating a clear and
              intuitive structure for discovering cases, managing referrals, tracking progress, and handling payments
              within a single connected experience.
            </p>
            <p>
              The structure was intentionally designed around the natural flow of attorney referrals. Research showed
              that attorneys follow a consistent process: building trust, evaluating opportunities, and managing ongoing
              referrals. The app was built to support those behaviors directly.
            </p>
          </div>
        </section>

        <div className="sitemap">
          <ul className="tree" aria-label="App sitemap">
            <TreeNode node={sitemap} />
          </ul>
        </div>

        <section className="cs-roadmap">
          <div className="cs-split cs-split--ruled">
            <div className="cs-split__head">
              <h2 className="cs-h2">Development Roadmap</h2>
            </div>
            <div className="cs-split__text">
              <p>
                Case Connector was organized into <strong>seven strategic phases</strong>. The roadmap was designed to
                prioritize foundational infrastructure first, followed by core user workflows, financial operations,
                and final product refinement.
              </p>
              <p>
                Rather than attempting to launch a fully featured platform at once, development focused on delivering
                value incrementally while validating critical assumptions throughout the process.
              </p>
            </div>
          </div>

          <ol className="timeline">
            {phases.map((phase, i) => (
              <PhaseCard key={phase.title} phase={phase} index={i} />
            ))}
            <TimelineRunner />
          </ol>
        </section>

        <section className="cs-presentation" aria-labelledby="presentation">
          <h2 className="cs-h2 cs-presentation__title" id="presentation">Presentation:</h2>
          <img src={`${A}/cc-pres-1.webp`} width={1600} height={1080} loading="lazy"
            alt="Case Connector website hero: The Future of Attorney Referrals, with app screens, 184 matched referrals, 138+ attorneys, and partner firm logos." />
          <img src={`${A}/cc-pres-2.webp`} width={1600} height={1600} loading="lazy"
            alt="The Smartest Way to Exchange Cases: monetize overflow and get better leads. A Faster, Safer Referral Workflow designed for busy law firms." />
          <img src={`${A}/cc-pres-3.webp`} width={1600} height={1200} loading="lazy"
            alt="Tools That Eliminate Guesswork and Risk: four app screens showing the home feed, an attorney profile, a case overview and case management." />
          <img src={`${A}/cc-pres-4.webp`} width={1600} height={1660} loading="lazy"
            alt="Case Connector brand mark by Trial Lawyers University, and a banner: Trusted Connections. Your Professional Network, Upgraded." />
        </section>

        <section className="cs-empathize">
          <h2 className="cs-h2 cs-h2--sm">Empathize UX Study</h2>
          <p className="cs-lead">
            <strong>Attorneys posting cases (Case Posters):</strong> want to delegate cases and earn referral fees.
          </p>
          <p className="cs-lead">
            <strong>Attorneys bidding on cases (Case Bidders):</strong> want to acquire new clients and grow their
            caseload.
          </p>

          <div className="personas">
            {personas.map((p) => (
              <article key={p.name} className="persona">
                <header className="persona__head">
                  <img src={p.image} width={160} height={160} loading="lazy" alt="" />
                  <div>
                    <p className="persona__label">{p.label}</p>
                    <h3>{p.name}</h3>
                    <p className="persona__role">{p.role}</p>
                  </div>
                  <blockquote>{p.quote}</blockquote>
                </header>
                <h4 className="persona__heading persona__heading--goals">Goals</h4>
                <ul className="persona__list persona__list--goals">
                  {p.goals.map((g) => <li key={g}>{g}</li>)}
                </ul>
                <h4 className="persona__heading persona__heading--pains">Pain Points</h4>
                <ul className="persona__list persona__list--pains">
                  {p.pains.map((g) => <li key={g}>{g}</li>)}
                </ul>
                <h4 className="persona__heading persona__heading--insights">Solution Insights</h4>
                <ul className="persona__list persona__list--insights">
                  {p.insights.map((g) => <li key={g}>{g}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="cs-market">
          <h2 className="cs-h3">Market-Wide Problems the App Solves:</h2>
          <div className="cs-market__cols">
            <div>
              <h3>Market Problem:</h3>
              <ul>{marketProblems.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div>
              <h3>Solution:</h3>
              <ul>{marketSolutions.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
          <div className="cs-closing">
            <img className="cs-closing__logo" src={`${A}/cc-closing-logo.png`} width={624} height={104} loading="lazy" alt="Case Connector" />
            <img className="cs-closing__phone" src={`${A}/cc-closing-phone.png`} width={375} height={591} loading="lazy" alt="" />
          </div>
        </section>
      </main>
    </div>
  );
}
