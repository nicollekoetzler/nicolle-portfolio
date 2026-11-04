import type { Metadata } from "next";
import PerformanceDashboardPresentation from "./Presentation";

export const metadata: Metadata = {
  title: "CG Performance Dashboard · Case Study · Nicolle Koetzler",
  description: "CG Performance Dashboard: a client-facing dashboard that shows law firms how their website, SEO, calls and leads perform.",
};

export default function Page() {
  return <PerformanceDashboardPresentation />;
}
