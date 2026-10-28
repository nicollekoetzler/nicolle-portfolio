import type { Metadata } from "next";
import Shell from "../../components/Shell";

/* legal.nicollekoetzler.com: the same site with its text pitched at legal tech. proxy.ts serves these pages at the
   root of that domain (legal.nicollekoetzler.com/about shows /legal/about). */
const title = "Nicolle Koetzler · Product Engineer for Legal Tech";
const description =
  "Nicolle Koetzler designs and builds products for the legal industry: 20+ law firm websites, an attorney referral app on the App Store and a dashboard used by 30+ law firms.";

export const metadata: Metadata = {
  metadataBase: new URL("https://legal.nicollekoetzler.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Nicolle Koetzler", type: "website" },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <Shell variant="legal">{children}</Shell>;
}
