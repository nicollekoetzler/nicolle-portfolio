/* eslint-disable @next/next/no-img-element -- the banner keeps its export size as a plain <img> */
import Link from "next/link";

const stats = [
  { value: "12+", label: "years in digital design" },
  { value: "4+", label: "years building production software" },
  { value: "40+", label: "U.S. law firms served" },
  { value: "20", label: "designers & developers led" },
];

/** The About page's layout; the main site and the legal-tech site (legal.nicollekoetzler.com) differ only in the title and text */
export default function AboutContent({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <img
        className="v2-banner"
        src="/assets/v2/about-me-2.webp"
        width={2104}
        height={892}
        alt="Nicolle Koetzler"
      />

      <section className="v2-section v2-intro v2-intro--full">
        <h1 className="v2-page-title">{title}</h1>
        <div className="v2-prose">{children}</div>
        <div className="v2-actions">
          <Link className="v2-btn v2-btn--primary" href="/cv">
            See my CV
          </Link>
          <Link className="v2-btn" href="/contact">
            Get in touch
          </Link>
        </div>
      </section>

      <ul className="v2-stats" aria-label="In numbers">
        {stats.map((s) => (
          <li key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      <section className="v2-section">
        <h2 className="v2-h2">Languages</h2>
        <ul className="v2-pills">
          <li>
            <strong>Portuguese</strong> Native
          </li>
          <li>
            <strong>English</strong> Fluent (C2)
          </li>
          <li>
            <strong>German</strong> Elementary (A2)
          </li>
        </ul>
      </section>
    </>
  );
}
