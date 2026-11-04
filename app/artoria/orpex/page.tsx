import type { Metadata } from "next";
import ArtoriaCase from "../ArtoriaCase";

/* The same case study with a closing block written for Orpex; a private link, out of search engines */
export const metadata: Metadata = {
  title: "ArtorIA · Case Study · Nicolle Koetzler",
  description: "ArtorIA: designing how an AI platform and a 100-person factory work together. AI proposes, people confirm.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ArtoriaCase orpex />;
}
