"use client";

/* eslint-disable @next/next/no-img-element -- portrait and icons keep their design sizes as plain <img> */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { BEHANCE, EMAIL, GITHUB, LINKEDIN } from "./site";
import "../shell.css";

type Page = "home" | "about" | "contact" | "cv";

const nav: { href: string; label: string; page: Page }[] = [
  { href: "/", label: "Home", page: "home" },
  { href: "/about", label: "About", page: "about" },
  { href: "/contact", label: "Contact", page: "contact" },
  { href: "/cv", label: "CV", page: "cv" },
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

const navIcons: Record<Page, React.ReactNode> = {
  home: <path d="M2.5 7 8 2.5 13.5 7v6a.5.5 0 0 1-.5.5H10V10H6v3.5H3a.5.5 0 0 1-.5-.5V7Z" />,
  about: <><circle cx="8" cy="8" r="5.75" /><path d="M8 7.25v3.5M8 5.25v.01" /></>,
  contact: <><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></>,
  cv: <path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M3 13.5h10" />,
};

/* The current page detaches from the bar as its own purple pill, with a gap on both sides; the other links
   stay grouped in dark segments. Changing page slides the gaps over and fades the color across, in plain CSS. */
function Nav({ current }: { current: Page }) {
  const [target, setTarget] = useState(current);
  // follow the route (back/forward included); clicks switch straight away
  useLayoutEffect(() => setTarget(current), [current]);
  const active = nav.findIndex((l) => l.page === target);

  return (
    <nav className="v2-nav" aria-label="Main">
      {nav.map((l, i) => {
        const classes = [
          i === active && "is-active",
          // a dark segment ends wherever it meets the active pill (or the end of the bar)
          (i === 0 || i === active || i - 1 === active) && "is-start",
          (i === nav.length - 1 || i === active || i + 1 === active) && "is-end",
        ];
        return (
          <Link
            key={l.page}
            href={l.href}
            className={classes.filter(Boolean).join(" ")}
            aria-current={l.page === current ? "page" : undefined}
            onClick={() => setTarget(l.page)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">{navIcons[l.page]}</svg>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

const pages: Record<string, Page> = { "/": "home", "/about": "about", "/contact": "contact", "/cv": "cv" };

/* Sidebar + main column shared by Home, About, Contact and CV (Figma "Nicolle Website" › 1728w default) */
export default function Shell({ children }: { children: React.ReactNode }) {
  const current = pages[usePathname().replace(/\/$/, "") || "/"] ?? "home";
  const home = current === "home";
  // the sidebar headline is the page title only on Home; inner pages have their own h1
  const Title = home ? "h1" : "p";

  return (
    <div className={home ? "v2" : "v2 v2--inner"}>
      <div className="v2-side">
        <Nav current={current} />
        <aside className="v2-aside">
          <div className="v2-aside__top">
            <Title className="v2-title">I design products, and I build them too.</Title>
            <p className="v2-lead">
              I help companies think through product decisions, design for web and mobile, and build production front
              ends in React and Next.js.
            </p>
            <div className="v2-status">
              <span className="v2-status__dot" aria-hidden="true" />
              <a href={`mailto:${EMAIL}`} className="v2-status__email">{EMAIL}</a>
              <Link href="/contact" className="v2-status__cta">Get in touch</Link>
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
      </div>

      <main className="v2-main" id={home ? "work" : "top"}>
        {children}

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
