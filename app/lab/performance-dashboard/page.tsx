/* eslint-disable @next/next/no-img-element -- small logo marks */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../../components/ProjectAside";
import PerformanceDashboardPage from "../../performance-dashboard/page";

/* Work in progress: the performance-dashboard case study with the fixed project-context panel. Not linked anywhere. */
export const metadata: Metadata = { title: "Lab · performance-dashboard", robots: { index: false, follow: false } };

export const project: ProjectInfo = {
  kicker: "The Casely Group",
  logo: <img src="/assets/performance-dashboard/cg-performance-logo.svg" width={197} height={23} alt="CG Performance" />,
  title: "CG Performance Dashboard",
  tagline: "One place for law firms to see how their website, SEO, calls and leads are performing, in plain language.",
  paragraphs: [
    "Law firms invest heavily in their websites and marketing, but the data that shows whether it works lived in separate tools and was full of technical jargon.",
    "I designed a client-facing dashboard that brings it all together: technical scores paired with clear status and short explanations, color-coded trends, and a firm switcher so the team can manage dozens of clients.",
    "Every module follows the same reusable component system, so the product can grow with new data without losing consistency.",
  ],
  details: [
    { term: "Client", value: "The Casely Group" },
    { term: "Audience", value: "U.S. law firms" },
    { term: "Platform", value: "Web app" },
    { term: "My Role", value: "Product Designer" },
    { term: "Responsibilities", value: ["Information Architecture", "Data Visualization", "UI Design", "Design System"] },
  ],
};


export default function Page() {
  return (
    <ProjectLayout info={project}>
      <PerformanceDashboardPage />
    </ProjectLayout>
  );
}
