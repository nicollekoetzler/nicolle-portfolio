/* eslint-disable @next/next/no-img-element -- small logo mark */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../../components/ProjectAside";
import CaseConnectorPage from "../page";

/* New presentation for Case Connector (Figma "Nicolle Website" › node 94:393): the live case study,
   with the project's context in a full-height panel fixed to the right edge. Kept apart from the live
   page while it's being refined. */
export const metadata: Metadata = {
  title: "Case Connector · Nicolle Koetzler",
  description: "Case Connector: an attorney-to-attorney referral app for Trial Lawyers University.",
  robots: { index: false, follow: false },
};

const project: ProjectInfo = {
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
    { term: "My Role", value: "Product Designer" },
    { term: "Company", value: "The Casely Group" },
    { term: "Platform", value: "Mobile app" },
    { term: "Responsibilities", value: ["Research & Personas", "Information Architecture", "User Flows", "UI Design", "Prototyping"] },
  ],
};

export default function CaseConnectorPresentation() {
  return (
    <ProjectLayout info={project} flush>
      <CaseConnectorPage />
    </ProjectLayout>
  );
}
