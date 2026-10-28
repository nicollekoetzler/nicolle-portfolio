/* eslint-disable @next/next/no-img-element -- the banner keeps its export size as a plain <img> */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About · Nicolle Koetzler",
  description:
    "Nicolle Koetzler is a senior product designer and design engineer with 12+ years in digital design and 4+ years building production front ends.",
};

const stats = [
  { value: "12+", label: "years in digital design" },
  { value: "4+", label: "years building production front ends" },
  { value: "40+", label: "U.S. law firms served" },
  { value: "20", label: "designers & developers led" },
];

export default function About() {
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
        <h1 className="v2-page-title">I’m Nicolle, a Product Designer and Engineer.</h1>
        <div className="v2-prose">
          <p>
            My journey began in 2012, when I started creating digital products and online communities across
            entertainment, education, and service-based businesses. I also worked as a designer, creating visual
            content for Facebook pages and local businesses. These early experiences helped me develop a deeper
            understanding of people, their needs, and how design and communication can connect them with products.
          </p>
          <p>
            Over time, my interest in technology grew beyond design. In 2020, I began studying software development,
            expanding my ability to combine product thinking, interface design, and implementation. Since then, I’ve
            been working toward a more integrated approach to building digital products, connecting the experience,
            the design, and the technology behind them.
          </p>
          <p>
            Three years ago, my responsibilities expanded further when I became responsible for leading a team of 20
            designers and developers. This experience broadened my understanding of product delivery, team
            leadership, client communication, problem-solving, and process organization. It also strengthened my
            appreciation for structured design systems, maintainable code, and scalable product development.
          </p>
          <p>
            Through team leadership, stronger client communication, and a more structured product delivery process,
            we increased client approval rates from 30% to 80%.
          </p>
          <p>
            Today, I work across product design and software development, using technologies such as React, Next.js,
            and Tailwind CSS to turn ideas into functional digital products.
          </p>
          <p>
            AI-assisted development has expanded how I work across the product lifecycle. It allows me to prototype
            faster, test ideas earlier, and translate design decisions into working products with fewer handoffs. The
            tools are evolving, but the fundamentals remain the same: sound judgment, clarity, craftsmanship, and
            understanding what is worth building.
          </p>
        </div>
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
