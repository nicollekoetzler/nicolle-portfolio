/* eslint-disable @next/next/no-img-element -- small logo marks */
import Link from "next/link";
import TypedText from "./TypedText";
import "./project-aside.css";

/* every project in the order of the home's Work list; the panel's arrows step through it (and wrap around) */
const projects = [
  { href: "/case-connector", label: "Case Connector" },
  { href: "/performance-dashboard", label: "CG Performance Dashboard" },
  { href: "https://california-trial-law-group-c53x5nd6y.thecaselygroup.dev", label: "California Trial Law Group" },
  { href: "https://lawdigras.org", label: "Law-Di-Gras" },
];

function Arrow({ href, dir }: { href: string; dir: "prev" | "next" }) {
  const i = projects.findIndex((p) => p.href === href);
  const to = projects[(i + (dir === "next" ? 1 : -1) + projects.length) % projects.length];
  const label = `${dir === "next" ? "Next" : "Previous"} project: ${to.label}`;
  const icon = <svg viewBox="0 0 16 16" aria-hidden="true"><path d={dir === "next" ? "M6 3.5 10.5 8 6 12.5" : "M10 3.5 5.5 8 10 12.5"} /></svg>;
  return to.href.startsWith("http")
    ? <a href={to.href} target="_blank" rel="noopener" className="pa-aside__btn" aria-label={label} title={to.label}>{icon}</a>
    : <Link href={to.href} className="pa-aside__btn" aria-label={label} title={to.label}>{icon}</Link>;
}

export type ProjectInfo = {
  kicker?: string;
  /** this project's own link in the Work list; adds previous / next project arrows to the panel */
  href?: string;
  /** skill tags at the bottom of the panel, each with a glowing dot; their labels type themselves out */
  tags?: { label: string; color: string }[];
  logo: React.ReactNode;
  title: string;
  tagline: string;
  paragraphs: string[];
  details: { term: string; value: string | string[] }[];
  /** optional link at the end of the panel, e.g. to the full case study */
  link?: { href: string; label: string };
};

/**
 * Case-study layout: the page content on the left and a fixed panel on the right with the project's context
 * (who, what, my role, responsibilities), styled like the site's sidebar card. Below 1100px the panel
 * becomes a regular block at the top of the page.
 */
export default function ProjectLayout({ info, flush = false, children }: { info: ProjectInfo; flush?: boolean; children: React.ReactNode }) {
  // flush: the panel runs the full height of the window and sits against its right edge, with no margins
  return (
    <div className={flush ? "pa pa--flush" : "pa"}>
      <div className="pa__content">{children}</div>
      <aside className="pa-aside" aria-label="About this project">
        <div className="pa-aside__head">
          {info.href ? (
            <nav className="pa-aside__arrows" aria-label="Other projects">
              <Arrow href={info.href} dir="prev" />
              <Arrow href={info.href} dir="next" />
            </nav>
          ) : (
            <p className="pa-aside__kicker">{info.kicker}</p>
          )}
          <Link href="/#work" className="pa-aside__close" aria-label="Close project and go back to all projects">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </Link>
        </div>
        <div className="pa-aside__body">
          <div className="pa-aside__logo">{info.logo}</div>
          <h2 className="pa-aside__title">{info.title}</h2>
          <p className="pa-aside__tagline">{info.tagline}</p>
          {info.paragraphs.map((p) => <p key={p} className="pa-aside__text">{p}</p>)}
          <dl className="pa-aside__details">
            {info.details.map((d) => (
              <div key={d.term}>
                <dt>{d.term}</dt>
                <dd>{Array.isArray(d.value) ? d.value.map((v) => <span key={v}>{v}</span>) : d.value}</dd>
              </div>
            ))}
          </dl>
          {info.tags && (
            <ul className="pa-aside__tags">
              {info.tags.map((t, i) => (
                <li key={t.label} style={{ "--dot": t.color } as React.CSSProperties}>
                  <TypedText text={t.label} delay={900 + i * 700} speed={45} />
                </li>
              ))}
            </ul>
          )}
          {info.link && (
            <Link href={info.link.href} className="pa-aside__link">
              {info.link.label} <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
