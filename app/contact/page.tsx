import type { Metadata } from "next";
import { Arrow, BEHANCE, EMAIL, GITHUB, LINKEDIN, LINKTREE, SiteFooter, SiteHeader } from "../components/site";

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
    <div className="page">
      <img className="glow glow--left" src="/assets/ellipse-8.svg" alt="" aria-hidden="true" />
      <img className="glow glow--right" src="/assets/ellipse-7.svg" alt="" aria-hidden="true" />
      <SiteHeader current="contact" />

      <main id="top" className="inner container">
        <section className="inner-hero contact-hero">
          <p className="chip eyebrow">
            Contact
            <svg className="chip__border" aria-hidden="true"><rect /></svg>
          </p>
          <h1 className="inner-title">
            Let’s build something <span className="muted">together.</span>
          </h1>
          <p className="prose prose--lead">
            Tell me about your product and where you’d like to take it.
          </p>

          <a className="contact-email" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="hero__actions">
            <a className="btn btn--primary" href={`mailto:${EMAIL}`}>
              Send me an email
              <Arrow variant="white" />
            </a>
          </div>
        </section>

        <ul className="channels" aria-label="Elsewhere">
          {channels.map((c) => (
            <li key={c.label}>
              <a className="channel" href={c.href} target="_blank" rel="noopener">
                <span className="channel__label">{c.label}</span>
                <span className="channel__handle">{c.handle}</span>
                <span className="channel__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="contact-note">Based in Brazil (UTC-3), working remotely with teams in the U.S. and beyond.</p>
      </main>

      <SiteFooter />
    </div>
  );
}
