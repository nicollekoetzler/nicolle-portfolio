/* eslint-disable @next/next/no-img-element -- small logo marks */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../../components/ProjectAside";
import UndvCaseStudy from "../../undv/page";

/* Work in progress: the undv case study with the fixed project-context panel. Not linked anywhere. */
export const metadata: Metadata = { title: "Lab · undv", robots: { index: false, follow: false } };

export const project: ProjectInfo = {
  kicker: "UNDV · Design Audit & Redesign",
  logo: <span className="pa-mark">U</span>,
  title: "UNDV",
  tagline: "A discovery platform where what people create becomes their identity.",
  paragraphs: [
    "UNDV is a place to discover and share digital work: landing pages, apps, dashboards and AI products. The product was already live, with a strong visual foundation.",
    "My first deliverable was a design audit, followed by redesign proposals for the project view, search, onboarding and the profile design editor, all built around connecting each project to the person who made it.",
  ],
  details: [
    { term: "Platform", value: "Web app" },
    { term: "My Role", value: "Product Designer" },
    { term: "Responsibilities", value: ["Design Audit", "Benchmarking", "UX Strategy", "UI Design", "Prototyping"] },
  ],
};


export default function Page() {
  return (
    <ProjectLayout info={project}>
      <UndvCaseStudy />
    </ProjectLayout>
  );
}
