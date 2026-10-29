import type { Metadata } from "next";
import AboutContent from "../../../components/AboutContent";

export const metadata: Metadata = {
  title: "About · Nicolle Koetzler · Legal Tech",
  description:
    "Nicolle Koetzler designs and builds software for the legal industry: 20+ law firm websites, an attorney referral app and a dashboard used by 30+ law firms.",
  alternates: { canonical: "/about" },
};

export default function LegalAbout() {
  return (
    <AboutContent title="I’m Nicolle, a Product Engineer for legal tech.">
      <p>
        I design and build software for the legal industry. For the past three years I’ve led a team of 20 designers
        and developers at The Casely Group, shipping websites, dashboards and web apps for 40+ U.S. law firms, and
        working directly with attorneys to turn client-acquisition and case-management needs into product
        requirements, flows and data structures.
      </p>
      <p>
        In that time I’ve shipped more than 20 law firm websites, built from Figma to production on a shared design
        system in React and Tailwind. For a law firm, speed, search visibility and a clear path to contact turn
        directly into new cases.
      </p>
      <p>
        Case Connector is an attorney-to-attorney referral app for Trial Lawyers University. I led it from research
        with attorneys to the App Store in 4 months, designing the whole app and coding alongside 6 developers:
        verified attorney profiles (bar license and ID), case discovery and bidding, referral fees aligned with ABA
        and state rules, document uploads, payments and real-time case notifications.
      </p>
      <p>
        The CG Performance Dashboard brings each firm’s website health, SEO, Core Web Vitals, call tracking and lead
        data into one view, in plain language. We built it in 3 months with 6 developers, and today more than 30 law
        firms use it. I also worked on an AI-powered case assessment tool that helps accident victims estimate the
        value of their compensation claims.
      </p>
      <p>
        I started in design in 2012 and moved into software development in 2020. Today I work across product, design
        and full-stack engineering with React, Next.js, Node.js and PostgreSQL, backed by a structured design system and
        maintainable code.
      </p>
      <p>
        AI-assisted development lets me prototype faster, test ideas earlier and turn decisions into working software
        with fewer handoffs. In legal tech, where the stakes are high and trust is everything, sound judgment, clarity
        and craftsmanship still matter most.
      </p>
    </AboutContent>
  );
}
