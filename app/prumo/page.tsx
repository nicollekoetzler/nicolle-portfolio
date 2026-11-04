import type { Metadata } from "next";
import ArtoriaCase from "./ArtoriaCase";

/* Hidden while it's being refined: reachable by direct link only. The previous case study is kept at /prumo/original. */
export const metadata: Metadata = {
  title: "Prumo · Case Study · Nicolle Koetzler",
  description: "Prumo: designing how an AI and a 100-person factory work together. AI proposes, people confirm.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ArtoriaCase />;
}
