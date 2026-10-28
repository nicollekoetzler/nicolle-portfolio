import type { Metadata } from "next";
import CVContent from "../../../components/CVContent";

export const metadata: Metadata = {
  title: "CV · Nicolle Koetzler · Legal Tech",
  description: "Experience, skills and education of Nicolle Koetzler, Product Engineer for legal tech.",
  alternates: { canonical: "/cv" },
};

export default function LegalCV() {
  return (
    <CVContent
      role="Product Engineer · Legal Tech"
      summary="Product engineer for legal tech with 12+ years in digital design and 4+ years building production front ends. Led a 20-person design and development team shipping websites, dashboards and web apps for 40+ U.S. law firms: 20+ law firm websites, Case Connector, an attorney-to-attorney referral app on the App Store, and a performance dashboard used by 30+ firms. I work directly with attorneys, turning client-acquisition and case-management needs into requirements, flows, data structures and runnable React/Next.js + Tailwind code."
    />
  );
}
