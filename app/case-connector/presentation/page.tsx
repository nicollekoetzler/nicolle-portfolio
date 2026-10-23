/* eslint-disable @next/next/no-img-element -- presentation boards keep their export sizes as plain <img> */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../../components/ProjectAside";
import "./presentation.css";

/* New presentation style for Case Connector (Figma "Nicolle Website" › node 94:393): a gallery of the
   project's boards on the left and the project's context fixed on the right. Kept apart from the live
   case study while it's being refined. */
export const metadata: Metadata = {
  title: "Case Connector · Nicolle Koetzler",
  description: "Case Connector: an attorney-to-attorney referral app for Trial Lawyers University.",
  robots: { index: false, follow: false },
};

const A = "/assets/case-connector";

const project: ProjectInfo = {
  kicker: "Trial Lawyers University",
  logo: <span className="pa-mark"><img src={`${A}/cc-emblem.png`} width={48} height={48} alt="" /></span>,
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
  link: { href: "/case-connector", label: "Read the full case study" },
};

export default function CaseConnectorPresentation() {
  return (
    <ProjectLayout info={project}>
      <main className="pr">
        <div className="pr-card pr-card--wide">
          <video src="/assets/case-connector.mp4" poster={`${A}/cc-hero.webp`} autoPlay muted loop playsInline preload="metadata" aria-label="Case Connector app on a phone in a blue control room" />
        </div>
        <div className="pr-card pr-card--wide">
          <img src={`${A}/cc-pres-1.webp`} width={3200} height={2160} alt="Case Connector landing page: The Future of Attorney Referrals" />
        </div>
        <div className="pr-card">
          <img src={`${A}/cc-pres-2.webp`} width={3200} height={3200} loading="lazy" alt="The smartest way to exchange cases, and a faster, safer referral workflow" />
        </div>
        <div className="pr-card">
          <img src={`${A}/cc-pres-4.webp`} width={3200} height={3320} loading="lazy" alt="Case Connector brand, the attorney profile and the landing hero" />
        </div>
        <div className="pr-card pr-card--wide">
          <img src={`${A}/cc-pres-3.webp`} width={3200} height={2400} loading="lazy" alt="Four app screens: home, attorney profile, case details and case management" />
        </div>
        <div className="pr-card pr-card--wide">
          <img src={`${A}/cc-lockscreen.webp`} width={3120} height={1776} loading="lazy" alt="Lock screen notifications for referrals and case activity" />
        </div>
      </main>
    </ProjectLayout>
  );
}
