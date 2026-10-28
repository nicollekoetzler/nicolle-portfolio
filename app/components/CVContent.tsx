import JobMedia, { type Media } from "./JobMedia";
import StatusPill from "./StatusPill";

const experience: { role: string; company: string; dates: string; place: string; points: string[]; media?: Media[] }[] = [
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
    media: [
      {
        src: "/assets/cv/case-assessment-tool.webp", w: 1800, h: 1350,
        alt: "AI case assessment tool for GetCompensation.law on a laptop",
        title: "Case Assessment Tool",
        description: "An AI-powered legal assessment tool that helps accident victims estimate the potential value of their compensation claims through a quick, data-driven evaluation.",
      },
      {
        src: "/assets/cv/case-connector.webp", w: 1800, h: 1215,
        alt: "Case Connector landing page with the app on a phone",
        title: "TLU Case Connector — The Future of Attorney Referrals",
        description: "The app that makes attorney-to-attorney referrals simple, transparent, and reliable, across every state and every practice area.",
      },
      {
        src: "/assets/cv/leads-dashboard.webp", w: 1800, h: 1350,
        alt: "Leads dashboard from the CG Performance platform on a laptop",
        title: "CG Performance Dashboard",
        description: "A client-facing dashboard that brings website, SEO, call and lead data for law firms into one place.",
      },
      {
        src: "/assets/cv/casely-team.webp", w: 1800, h: 1536,
        alt: "The Casely Group team together at an in-person meeting",
        title: "The Casely Group — In-Person Team Meeting",
        description: "Bringing our US and Brazil teams together 🇺🇸🇧🇷",
      },
    ],
  },
  {
    role: "UX/UI Engineer",
    company: "NefroAtual",
    dates: "Jan 2023 – Feb 2024",
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

/** The CV page's content; the main site and the legal-tech site (legal.nicollekoetzler.com) differ only in the role and summary */
export default function CVContent({ role, summary }: { role: string; summary: string }) {
  return (
    <>
      <section className="v2-section v2-intro">
        <h1 className="v2-page-title">
          Nicolle Koetzler <span>{role}</span>
        </h1>
        {/* phones only: the email pill moves here, under the title (the sidebar copy is hidden) */}
        <StatusPill className="v2-status--page" />
        <p className="v2-meta">Brazil (UTC-3) · Remote · Working with U.S. teams</p>
        <div className="v2-prose">
          <p>{summary}</p>
        </div>
      </section>

      <section className="v2-section">
        <h2 className="v2-h2">Experience</h2>
        <ol className="v2-jobs">
          {experience.map((job) => (
            <li key={job.role + job.company}>
              <div className="v2-jobs__head">
                <h3>{job.role} <span>· {job.company}</span></h3>
                <p className="v2-jobs__dates">{job.dates}</p>
              </div>
              <p className="v2-jobs__place">{job.place}</p>
              <ul className="v2-jobs__points">
                {job.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              {job.media && <JobMedia items={job.media} label="Projects & team" />}
            </li>
          ))}
        </ol>
      </section>

      <section className="v2-section">
        <h2 className="v2-h2">Skills &amp; Tools</h2>
        {/* one flowing line per group: "Group — item · item · item" */}
        <div className="v2-skill-lines">
          {skills.map((s) => (
            <p key={s.group}>
              <strong>{s.group}</strong> — {s.items.join(" · ")}
            </p>
          ))}
        </div>
      </section>

      <section className="v2-section">
        <h2 className="v2-h2">Education</h2>
        <ol className="v2-jobs">
          {education.map((e) => (
            <li key={e.title}>
              <div className="v2-jobs__head">
                <h3>{e.title} <span>· {e.school}</span></h3>
                <p className="v2-jobs__dates">{e.dates}</p>
              </div>
              <p className="v2-jobs__text">{e.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="v2-section">
        <h2 className="v2-h2">Languages</h2>
        <ul className="v2-pills">
          <li><strong>Portuguese</strong> Native</li>
          <li><strong>English</strong> Fluent (C2)</li>
          <li><strong>German</strong> Elementary (A2)</li>
        </ul>
      </section>
    </>
  );
}
