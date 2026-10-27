/* eslint-disable @next/next/no-img-element -- small logo marks */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../../components/ProjectAside";
import CaseConnectorPage from "../../case-connector/CaseConnectorCase";

/* Work in progress: the case-connector case study with the fixed project-context panel. Not linked anywhere. */
export const metadata: Metadata = { title: "Lab · case-connector", robots: { index: false, follow: false } };

export const project: ProjectInfo = {
  kicker: "Trial Lawyers University",
  logo: <span className="pa-mark"><img src="/assets/case-connector/cc-emblem.png" width={48} height={48} alt="" /></span>,
  title: "Case Connector",
  tagline: "Attorney referrals lived across calls, emails and texts. We gave them one home.",
  paragraphs: [
    "Trial Lawyers University wanted a better way for attorneys across the U.S. to refer cases to each other. Referrals run on relationships, but the process itself was scattered across channels, with little visibility once a case changed hands.",
    "I designed Case Connector at The Casely Group, from research and personas to the information architecture, the core flows and the final UI, keeping the relationship-driven nature of the legal industry at the center.",
    "The app shipped on the App Store as a place where attorneys discover opportunities, showcase their expertise and follow each referral as it moves between firms.",
  ],
  details: [
    { term: "Client", value: "Trial Lawyers University" },
    { term: "Platform", value: "Mobile app" },
    { term: "My Role", value: "Product Designer" },
    { term: "Responsibilities", value: ["Research & Personas", "Information Architecture", "User Flows", "UI Design", "Prototyping"] },
  ],
};


export default function Page() {
  return (
    <ProjectLayout info={project}>
      <CaseConnectorPage />
    </ProjectLayout>
  );
}
