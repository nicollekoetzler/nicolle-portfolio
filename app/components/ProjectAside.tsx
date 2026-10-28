/* eslint-disable @next/next/no-img-element -- small logo marks */
import Link from "next/link";
import StatusPill from "./StatusPill";
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

type TagIcon = "design" | "team" | "code";

/* 16px line icons for the skill tags: pen nib, people, code brackets */
const tagIcons: Record<TagIcon, React.ReactNode> = {
  design: <><path d="M12 19l7-7 3 3-7 7-3-3Z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" /><path d="M2 2l7.59 7.59" /><circle cx="11" cy="11" r="2" /></>,
  team: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  code: <><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></>,
};

export type ProjectInfo = {
  kicker?: string;
  /** this project's own link in the Work list; adds previous / next project arrows to the panel */
  href?: string;
  /** skill tags at the bottom of the panel, each with a small icon; their labels type themselves out */
  tags?: { label: string; icon: TagIcon }[];
  logo: React.ReactNode;
  title: string;
  tagline: string;
  paragraphs: string[];
  details: { term: string; value: string | string[] }[];
  /** show the site's email pill (radar dot, typed email, Get in touch) under the details */
  contact?: boolean;
  /** optional link at the end of the panel, e.g. to the full case study */
  link?: { href: string; label: string; icon?: React.ReactNode };
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
          <div className="pa-aside__brand">
            <div className="pa-aside__logo">{info.logo}</div>
            <h2 className="pa-aside__title">{info.title}</h2>
          </div>
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
          {info.contact && <StatusPill className="pa-status" />}
          {info.link && (info.link.href.startsWith("http") ? (
            <a href={info.link.href} target="_blank" rel="noopener" className="pa-aside__link">
              {info.link.icon}{info.link.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link href={info.link.href} className="pa-aside__link">
              {info.link.icon}{info.link.label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
          {info.tags && (
            <ul className="pa-aside__tags">
              {info.tags.map((t, i) => (
                <li key={t.label}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">{tagIcons[t.icon]}</svg>
                  <TypedText text={t.label} delay={900 + i * 700} speed={45} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
