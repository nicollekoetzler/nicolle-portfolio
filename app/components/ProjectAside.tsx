/* eslint-disable @next/next/no-img-element -- small logo marks */
import Link from "next/link";
import "./project-aside.css";

export type ProjectInfo = {
  kicker: string;
  logo: React.ReactNode;
  title: string;
  tagline: string;
  paragraphs: string[];
  details: { term: string; value: string | string[] }[];
};

/**
 * Case-study layout: the page content on the left and a fixed panel on the right with the project's context
 * (who, what, my role, responsibilities), styled like the site's sidebar card. Below 1100px the panel
 * becomes a regular block at the top of the page.
 */
export default function ProjectLayout({ info, children }: { info: ProjectInfo; children: React.ReactNode }) {
  return (
    <div className="pa">
      <div className="pa__content">{children}</div>
      <aside className="pa-aside" aria-label="About this project">
        <div className="pa-aside__head">
          <p className="pa-aside__kicker">{info.kicker}</p>
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
        </div>
      </aside>
    </div>
  );
}
