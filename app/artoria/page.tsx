import type { Metadata } from "next";
import ArtoriaCase from "./ArtoriaCase";

/* Hidden while it's being refined: reachable by direct link only. The previous case study is kept at /artoria/original. */
export const metadata: Metadata = {
  title: "ArtorIA · Case Study · Nicolle Koetzler",
  description: "ArtorIA: designing how an AI platform and a 100-person factory work together. AI proposes, people confirm.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ArtoriaCase />;
}
