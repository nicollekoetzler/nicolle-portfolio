/* eslint-disable @next/next/no-img-element -- SVG logos/icons keep their Figma root sizes as plain <img> */
import Link from "next/link";

export const LINKEDIN = "https://www.linkedin.com/in/nicollekoetzler";
export const GITHUB = "https://github.com/nicollekoetzler";
export const BEHANCE = "https://www.behance.net/nicollekoetzler";
export const LINKTREE = "https://linktr.ee/nicollekoetzler";
export const EMAIL = "hello@nicollekoetzler.com";

type Page = "home" | "about" | "cv" | "contact";

const links: { href: string; label: string; page?: Page }[] = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About", page: "about" },
  { href: "/cv", label: "CV", page: "cv" },
  { href: "/contact", label: "Contact", page: "contact" },
];

export function Arrow({ variant }: { variant: "white" | "dark" }) {
  return (
    <span className="btn__arrow">
      <img src={`/assets/arrow-${variant}.svg`} alt="" />
    </span>
  );
}

export function SiteHeader({ current = "home" }: { current?: Page }) {
  return (
    <header className="nav container">
      <Link className="nav__logo" href="/" aria-label="Nicolle Koetzler, home">
        <img src="/assets/nk-logo.svg" width={45.741} height={35.5} alt="NK" />
      </Link>
      <nav className="nav__links" aria-label="Main">
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={link.page === current ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer container">
      <div className="footer__brand">
        <img src="/assets/nk-logo.svg" width={30} height={23.3} alt="NK" />
        <span>© {new Date().getFullYear()} Nicolle Koetzler</span>
      </div>
      <nav className="footer__links" aria-label="Footer">
        <Link href="/#portfolio">Portfolio</Link>
        <Link href="/about">About</Link>
        <Link href="/cv">CV</Link>
        <Link href="/contact">Contact</Link>
        <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a>
        <a href="#top">Back to top ↑</a>
      </nav>
    </footer>
  );
}
