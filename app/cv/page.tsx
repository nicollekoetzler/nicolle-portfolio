import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, SiteFooter, SiteHeader } from "../components/site";

export const metadata: Metadata = {
  title: "CV · Nicolle Koetzler",
  description: "Experience, skills and education of Nicolle Koetzler, Senior Product Designer & Design Engineer.",
};

const experience = [
  {
    role: "Head of UX/UI Engineering",
    company: "The Casely Group",
    dates: "Oct 2023 – Oct 2026",
    place: "Miami, FL · Remote",
    points: [
      "Led a team of 20 designers and developers delivering websites, dashboards and web apps for 40+ U.S. law firms; owned prioritization, delivery and final visual quality.",
      "Designed and built sites and web apps from concept to production (Figma to React + Tailwind), making the calls on page structure, information architecture and responsive behavior.",
      "Built and maintained a design system in Figma and React + Tailwind, keeping design and code in sync and integrating with backend APIs and AI-powered workflows.",
      "Introduced AI-assisted design-to-code workflows across the team, speeding up development and tightening the design–engineering handoff.",
      "Primary contact for attorneys: turned client-acquisition and case-management needs into product requirements, flows and data structures.",
      "Mentored designers and developers on connecting UX decisions with engineering execution.",
    ],
  },
  {
    role: "UX/UI Engineer",
    company: "NefroAtual",
    dates: "Jan 2023 – Jan 2024",
    place: "Toronto, Canada · Remote",
    points: [
      "Designed and built the website and app for a learning platform that prepares doctors for nephrology residency (React + Tailwind on web, React Native on mobile).",
      "Owned front-end features end to end: components, application logic, layout and bug fixes across web and mobile.",
      "Worked with physicians to understand study goals and shaped the study flows and content structure around them.",
    ],
  },
];

const skills = [
  {
    group: "Design",
    items: ["Product & visual design", "Typography & layout", "Information architecture", "User flows", "Prototyping", "Design systems", "Responsive design", "Figma", "Photoshop"],
  },
  {
    group: "Front-end",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Astro", "Tailwind CSS", "Radix UI"],
  },
  { group: "Back-end & data", items: ["Node.js", "NestJS", "GraphQL", "PostgreSQL", "Prisma"] },
  {
    group: "AI-assisted development",
    items: ["Claude", "ChatGPT", "Gemini", "Directing & reviewing coding agents", "Prompt engineering", "AI agents"],
  },
  { group: "Tools", items: ["GitHub", "Docker", "AWS", "Cloudflare", "Webflow", "WordPress", "Notion", "Slack"] },
];

const education = [
  {
    title: "Internet Systems",
    school: "FIAP, São Paulo",
    dates: "2023 – 2025",
    text: "UX/UI and product design, information architecture, front-end development (JavaScript, React, Node.js), cloud, databases and AI.",
  },
  {
    title: "Software Engineering Program",
    school: "Driven Education, São Paulo",
    dates: "2022 – 2023",
    text: "1,000+ hours of hands-on training; built 25+ projects with React, Node.js, TypeScript, Tailwind CSS and Prisma.",
  },
];

export default function CV() {
  return (
    <div className="page">
      <img className="glow glow--left" src="/assets/ellipse-8.svg" alt="" aria-hidden="true" />
      <SiteHeader current="cv" />

      <main id="top" className="inner container">
        <section className="inner-hero">
          <p className="chip eyebrow">
            Curriculum Vitae
            <svg className="chip__border" aria-hidden="true"><rect /></svg>
          </p>
          <h1 className="inner-title">
            Nicolle Koetzler <span className="muted">Senior Product Designer &amp; Design Engineer</span>
          </h1>
          <p className="cv-meta">Brazil (UTC-3) · Remote · Working with U.S. teams</p>
          <p className="prose prose--lead">
            Senior product designer and design engineer with 12+ years in digital design and 4+ years building
            production front ends. I take products from a short brief to a shipped build: information architecture,
            data model, visual design, and runnable React/Next.js + Tailwind code. Led a 20-person design and
            development team shipping websites and web apps for 40+ U.S. law firms.
          </p>
        </section>

        <section className="cv-section">
          <h2 className="section-title">Experience</h2>
          <ol className="jobs">
            {experience.map((job) => (
              <li key={job.role + job.company} className="job">
                <div className="job__head">
                  <h3>
                    {job.role} <span className="muted">· {job.company}</span>
                  </h3>
                  <p className="job__dates">{job.dates}</p>
                </div>
                <p className="job__place">{job.place}</p>
                <ul className="job__points">
                  {job.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="cv-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group} className="skills__group">
                <h3>{s.group}</h3>
                <ul className="tags">
                  {s.items.map((item) => <li key={item} className="tag">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <h2 className="section-title">Education</h2>
          <ol className="jobs">
            {education.map((e) => (
              <li key={e.title} className="job">
                <div className="job__head">
                  <h3>
                    {e.title} <span className="muted">· {e.school}</span>
                  </h3>
                  <p className="job__dates">{e.dates}</p>
                </div>
                <p className="job__text">{e.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="cv-section">
          <h2 className="section-title">Languages</h2>
          <ul className="inline-list">
            <li><strong>Portuguese</strong> Native</li>
            <li><strong>English</strong> Fluent (C2)</li>
            <li><strong>German</strong> Elementary (A2)</li>
          </ul>
        </section>

        <div className="inner-cta">
          <Link className="btn btn--primary" href="/contact">
            Let’s work together
            <Arrow variant="white" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
