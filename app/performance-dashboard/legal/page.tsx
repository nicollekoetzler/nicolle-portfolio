import type { Metadata } from "next";
import PerformanceDashboardPresentation from "../Presentation";

/* legal.nicollekoetzler.com/performance-dashboard: the same case study with the client logo carousel (proxy.ts serves it there) */
export const metadata: Metadata = {
  title: "CG Performance Dashboard · Case Study · Nicolle Koetzler",
  description: "CG Performance Dashboard: a client-facing dashboard that shows law firms how their website, SEO, calls and leads perform.",
  alternates: { canonical: "https://legal.nicollekoetzler.com/performance-dashboard" },
};

export default function Page() {
  return <PerformanceDashboardPresentation logos />;
}
