/* eslint-disable @next/next/no-img-element -- the design export keeps its size as a plain <img> */
import type { Metadata } from "next";
import ProjectLayout, { type ProjectInfo } from "../components/ProjectAside";
import Reveal from "../case-connector/presentation/Reveal";
import "../case-connector/presentation/presentation.css";

export const metadata: Metadata = {
  title: "GoVibe · Nicolle Koetzler",
  description: "GoVibe: a social platform that connects people around ecological causes and positive initiatives.",
};

const project: ProjectInfo = {
  href: "/go-vibe",
  logo: <span className="pa-mark" style={{ background: "#4caf50" }}>G</span>,
  title: "GoVibe",
  tagline: "A social platform that connects people around ecological causes and positive initiatives for a healthier, more sustainable lifestyle.",
  paragraphs: [],
  details: [
    { term: "Type", value: "Social platform" },
    { term: "Focus", value: "Sustainability" },
    { term: "Platform", value: "Web" },
  ],
  contact: true,
  tags: [{ label: "UI/UX Design", icon: "design" }],
};

export default function GoVibe() {
  return (
    <ProjectLayout info={project} flush>
      <main className="cp">
        <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>GoVibe</h1>
        <figure className="cp-block cp-shot">
          <img src="/assets/v2/go-vibe-presentation.webp" width={2400} height={2681} alt="GoVibe home page with the headline “Pause. Breathe. Connect.” and a community feed of posts, events and groups" />
        </figure>
        <Reveal />
      </main>
    </ProjectLayout>
  );
}
