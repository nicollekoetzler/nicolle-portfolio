/* eslint-disable @next/next/no-img-element -- portrait and icons keep their design sizes as plain <img> */
import type { Metadata } from "next";
import Link from "next/link";
import { BEHANCE, EMAIL, GITHUB, LINKEDIN } from "../components/site";
import Logos from "../components/Logos";
import WorkTabs from "./WorkTabs";
import "./v2.css";

/* Style test for a new homepage, built from the Figma frame "1728w default" (node 33:25) */
export const metadata: Metadata = {
  title: "Nicolle Koetzler · Product Designer & Software Developer",
  description: "Portfolio of Nicolle Koetzler, Product Designer and Software Developer.",
  robots: { index: false, follow: false },
};

const skills = [
  ["Product Design", "UI Design", "Visual Design", "Typography & Layout", "Information Architecture", "User Flows"],
  ["Prototyping", "Design Systems", "Responsive Design", "Web & Mobile Design", "Design Engineering", "UX Strategy"],
  ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"],
];

/* icons: Simple Icons (CC0) in brand colors, Photoshop from the Figma file; black marks drawn white for the dark UI */
const stack = [
  { name: "Figma", icon: "figma" },
  { name: "Photoshop", icon: "photoshop" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Prisma", icon: "prisma" },
  { name: "GitHub", icon: "github" },
  { name: "Notion", icon: "notion" },
  { name: "Slack", icon: "slack" },
];

function SocialIcon({ name }: { name: "mail" | "linkedin" | "github" | "behance" }) {
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V16M8 8v.01M11.5 16v-5.5M11.5 13c0-1.7 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" /></>,
    github: <path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.2a2.8 2.8 0 0 0-.8-2.2c2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C6.5 3.3 5.5 3.6 5.5 3.6a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 4.2 9.8c0 4.5 2.7 5.5 5.3 5.8a2.8 2.8 0 0 0-.8 2.2V21" />,
    behance: <><path d="M3 7h4.5a2.5 2.5 0 0 1 0 5H3V7Zm0 5h5a2.5 2.5 0 0 1 0 5H3v-5ZM14.5 8.5h5" /><path d="M14 14h7a3.5 3.5 0 1 0-1 2.5" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function HomeV2() {
  return (
    <div className="v2">
      <aside className="v2-aside">
        <div className="v2-aside__top">
          <nav className="v2-nav" aria-label="Main">
            <Link href="/v2" className="is-active" aria-current="page">Home</Link>
            <a href="#work">Work</a>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cv" className="v2-nav__cv">
              CV
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M3 13.5h10" /></svg>
            </Link>
          </nav>

          <h1 className="v2-title">I design products, and I build them too.</h1>
          <p className="v2-lead">
            I help companies think through product decisions, design for web and mobile, and build production front
            ends in React and Next.js.
          </p>
          <div className="v2-status">
            <span className="v2-status__dot" aria-hidden="true" />
            Available across US and EU timezones
            <Link href="/contact" className="v2-status__cta">Book a Call →</Link>
          </div>
        </div>

        <div className="v2-aside__bottom">
          <img className="v2-photo" src="/assets/v2/nicolle.webp" width={127} height={127} alt="Nicolle Koetzler" />
          <ul className="v2-social" aria-label="Elsewhere">
            <li><a href={`mailto:${EMAIL}`} aria-label="Email"><SocialIcon name="mail" /></a></li>
            <li><a href={LINKEDIN} target="_blank" rel="noopener" aria-label="LinkedIn"><SocialIcon name="linkedin" /></a></li>
            <li><a href={GITHUB} target="_blank" rel="noopener" aria-label="GitHub"><SocialIcon name="github" /></a></li>
            <li><a href={BEHANCE} target="_blank" rel="noopener" aria-label="Behance"><SocialIcon name="behance" /></a></li>
          </ul>
          <div className="v2-id">
            <p className="v2-id__name">Nicolle Koetzler</p>
            <p>Product Designer and Software Developer</p>
            <p>+10 years experience</p>
          </div>
        </div>
      </aside>

      <main className="v2-main" id="work">
        <WorkTabs />

        <section className="v2-section v2-trusted">
          <h2 className="v2-h2">Trusted by</h2>
          <div className="marquee">
            <div className="marquee__track">
              <Logos />
              <Logos hidden />
            </div>
          </div>
        </section>

        <section className="v2-section">
          <h2 className="v2-h2">Skills</h2>
          <div className="v2-skills">
            {skills.map((row, i) => (
              <div key={i} className={i % 2 ? "v2-marquee v2-marquee--reverse" : "v2-marquee"}>
                {/* each row is repeated once so the loop is seamless */}
                <ul>
                  {[...row, ...row].map((s, j) => (
                    <li key={`${s}-${j}`} aria-hidden={j >= row.length || undefined}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="v2-section">
          <h2 className="v2-h2">Tech Stack</h2>
          <ul className="v2-stack">
            {stack.map((t) => (
              <li key={t.name}>
                <img src={`/assets/v2/stack/${t.icon}.svg`} width={17} height={17} alt="" />
                {t.name}
              </li>
            ))}
          </ul>
        </section>

        <footer className="v2-footer">
          <p className="v2-footer__title">Want to chat about your project?</p>
          <a className="v2-footer__cta" href={`mailto:${EMAIL}`}>Book a Free Strategy Call</a>
          <ul className="v2-footer__links">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/cv">CV</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <p className="v2-footer__small">Made with love,<br />© {new Date().getFullYear()} Nicolle Koetzler. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
