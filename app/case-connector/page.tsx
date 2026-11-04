import type { Metadata } from "next";
import CaseConnectorPresentation from "./Presentation";

export const metadata: Metadata = {
  title: "Case Connector · Case Study · Nicolle Koetzler",
  description:
    "How Case Connector, an attorney-to-attorney referral app for Trial Lawyers University, went from research to the App Store in 4 months.",
};

export default function Page() {
  return <CaseConnectorPresentation />;
}
