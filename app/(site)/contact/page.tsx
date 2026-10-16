import type { Metadata } from "next";
import CopyButton from "../../components/CopyButton";
import { BEHANCE, EMAIL, GITHUB, LINKEDIN, LINKTREE } from "../../components/site";

export const metadata: Metadata = {
  title: "Contact · Nicolle Koetzler",
  description: "Get in touch with Nicolle Koetzler for product design and design engineering work.",
};

const channels = [
  { label: "LinkedIn", handle: "in/nicollekoetzler", href: LINKEDIN },
  { label: "GitHub", handle: "@nicollekoetzler", href: GITHUB },
  { label: "Behance", handle: "nicollekoetzler", href: BEHANCE },
  { label: "Linktree", handle: "nicollekoetzler", href: LINKTREE },
];

export default function Contact() {
  return (
    <>
      <section className="v2-section v2-intro">
        <h1 className="v2-page-title">Let’s build something together.</h1>
        <div className="v2-prose">
          <p>Tell me about your product and where you’d like to take it.</p>
        </div>
        <div className="v2-email-row">
          <a className="v2-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <CopyButton text={EMAIL} label="Copy email address" />
        </div>
        <div className="v2-actions">
          <a className="v2-btn v2-btn--primary" href={`mailto:${EMAIL}`}>Send me an email</a>
        </div>
      </section>

      <section className="v2-section">
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
