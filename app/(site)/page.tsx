/* eslint-disable @next/next/no-img-element -- stack icons keep their design sizes as plain <img> */
import Logos from "../components/Logos";
import WorkTabs from "../components/WorkTabs";

const skills = [
  ["Product Design", "UI Design", "Visual Design", "Typography & Layout", "Information Architecture", "User Flows"],
  ["Prototyping", "Design Systems", "Responsive Design", "Web & Mobile Design", "Design Engineering", "UX Strategy"],
  ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "PostgreSQL"],
];

/* icons: Simple Icons (CC0) in brand colors, Photoshop from the Figma file; black marks drawn white for the dark UI */
const stack = [
  { name: "Figma", icon: "figma" },
  { name: "Photoshop", icon: "photoshop" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Prisma", icon: "prisma" },
  { name: "GitHub", icon: "github" },
  { name: "Notion", icon: "notion" },
  { name: "Slack", icon: "slack" },
];

export default function Home() {
  return (
    <>
      <WorkTabs />

      <section className="v2-section v2-trusted">
        <h2 className="v2-h2">Trusted by</h2>
        <div className="marquee">
          <div className="marquee__track">
            <Logos />
            <Logos hidden />
          </div>
        </div>
      </section>

      <section className="v2-section">
        <h2 className="v2-h2">Skills</h2>
        <div className="v2-skills">
          {skills.map((row, i) => (
            <div key={i} className={i % 2 ? "v2-marquee v2-marquee--reverse" : "v2-marquee"}>
              {/* each row is repeated once so the loop is seamless */}
              <ul>
                {[...row, ...row].map((s, j) => (
                  <li key={`${s}-${j}`} aria-hidden={j >= row.length || undefined}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="v2-section">
        <h2 className="v2-h2">Tech Stack</h2>
        <ul className="v2-stack">
          {stack.map((t) => (
            <li key={t.name}>
              <img src={`/assets/v2/stack/${t.icon}.svg`} width={17} height={17} alt="" />
              {t.name}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
