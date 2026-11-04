import type { Metadata } from "next";
import CaseConnectorPresentation from "../Presentation";

/* legal.nicollekoetzler.com/case-connector: the same case study with the client logo carousel (proxy.ts serves it there) */
export const metadata: Metadata = {
  title: "Case Connector · Case Study · Nicolle Koetzler",
  description:
    "How Case Connector, an attorney-to-attorney referral app for Trial Lawyers University, went from research to the App Store in 4 months.",
  alternates: { canonical: "https://legal.nicollekoetzler.com/case-connector" },
};

export default function Page() {
  return <CaseConnectorPresentation logos />;
}
