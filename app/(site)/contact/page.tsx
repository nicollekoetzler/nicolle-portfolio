import type { Metadata } from "next";
import CopyButton from "../../components/CopyButton";
import ProjectEstimator from "../../components/estimator/ProjectEstimator";
import { BEHANCE, EMAIL, GITHUB, LINKEDIN, LINKTREE } from "../../components/site";

export const metadata: Metadata = {
  title: "Contact · Nicolle Koetzler",
  description:
    "Scope your project with an AI-guided consultation: answer a few questions and get a tailored project brief and budget estimate from Nicolle Koetzler.",
};

const channels = [
  { label: "LinkedIn", handle: "in/nicollekoetzler", href: LINKEDIN },
  { label: "GitHub", handle: "@nicollekoetzler", href: GITHUB },
  { label: "Behance", handle: "nicollekoetzler", href: BEHANCE },
  { label: "Linktree", handle: "nicollekoetzler", href: LINKTREE },
];

/* Contact: the Project Discovery & Budget Estimator first, the direct channels below for people who'd rather just write */
export default function Contact() {
  return (
    <>
      <ProjectEstimator />

      <section className="v2-section pe-direct" aria-labelledby="direct-contact">
        <h2 id="direct-contact" className="v2-h2">Prefer to just write?</h2>
        <div className="v2-email-row">
          <a className="v2-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <CopyButton text={EMAIL} label="Copy email address" />
        </div>
        <ul className="v2-channels" aria-label="Elsewhere">
          {channels.map((c) => (
            <li key={c.label}>
              <a href={c.href} target="_blank" rel="noopener">
                <span className="v2-channels__label">{c.label}</span>
                <span className="v2-channels__handle">{c.handle}</span>
                <span className="v2-channels__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="v2-meta">Based in Brazil (UTC-3), working remotely with teams in the U.S. and beyond.</p>
      </section>
    </>
  );
}
