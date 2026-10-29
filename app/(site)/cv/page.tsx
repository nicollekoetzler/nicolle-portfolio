import type { Metadata } from "next";
import CVContent from "../../components/CVContent";

export const metadata: Metadata = {
  title: "CV · Nicolle Koetzler",
  description: "Experience, skills and education of Nicolle Koetzler, Senior Product Designer & Design Engineer.",
};

export default function CV() {
  return (
    <CVContent
      role="Senior Product Designer & Design Engineer"
      summary="Senior product designer and design engineer with 12+ years in digital design and 4+ years building full-stack products. I take products from a short brief to a shipped build: information architecture, data model, visual design, and runnable React/Next.js + Tailwind code. Led a 20-person design and development team shipping websites and web apps for 40+ U.S. law firms."
    />
  );
}
