/* eslint-disable @next/next/no-img-element -- small logo mark */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../components/ProjectAside";
import CaseConnectorCase from "./CaseConnectorCase";

/* Case Connector case study, presented with the project's context in a full-height panel fixed to the right
   (Figma "Nicolle Website" › node 94:393). */
export const metadata: Metadata = {
  title: "Case Connector · Case Study · Nicolle Koetzler",
  description:
    "How Case Connector, an attorney-to-attorney referral app by Trial Lawyers University, was researched, structured, designed and built.",
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

export default function CaseConnectorPage() {
  return (
    <ProjectLayout info={project} flush>
      <CaseConnectorCase />
    </ProjectLayout>
  );
}
