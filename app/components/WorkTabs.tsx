"use client";

/* eslint-disable @next/next/no-img-element -- project covers are plain <img> inside fixed-ratio cards */
import { useRef, useState } from "react";
import { liquidClass, useLiquidPill } from "./useLiquidPill";

type Work = {
  title: string;
  text: string;
  href: string;
  image: string;
  video?: string;
  background?: string;
  contain?: boolean;
  position?: string;
};

const groups: { label: string; items: Work[] }[] = [
  {
    label: "Product Design",
    items: [
      {
        title: "Case Connector",
        text: "An attorney-to-attorney referral app for Trial Lawyers University, from research to the App Store.",
        href: "/case-connector",
        image: "/assets/v2/case-connector-poster.webp",
        video: "/assets/case-connector.mp4",
      },
      {
        title: "CG Performance Dashboard",
        text: "A client dashboard that brings website, SEO, call and lead data for law firms into one place.",
        href: "/performance-dashboard",
        image: "/assets/project-performance-dashboard-cover-v2.webp",
        background: "#356CFF",
        contain: true,
      },
    ],
  },
  {
    label: "Websites",
    items: [
      {
        title: "California Trial Law Group",
        text: "A website for a California personal injury law firm.",
        href: "https://california-trial-law-group-c53x5nd6y.thecaselygroup.dev",
        image: "/assets/v2/california.webp",
      },
      {
        title: "Law-Di-Gras",
        text: "An event website for Law-Di-Gras.",
        href: "https://lawdigras.org",
        image: "/assets/v2/law-di-gras.webp",
        position: "50% 0%",
      },
    ],
  },
];

/** `productLabel` renames the first tab (the legal-tech site calls it "Product Engineering") */
export default function WorkTabs({ productLabel = "Product Design" }: { productLabel?: string }) {
  const [active, setActive] = useState(0);
  const toggleRef = useRef<HTMLDivElement>(null);
  const pill = useLiquidPill(toggleRef, `[data-tab="${active}"]`);

  return (
    <section className="v2-work" aria-labelledby="featured-work">
      <div className="v2-work__head">
        <h2 className="v2-h2" id="featured-work">Featured Work</h2>
        <div ref={toggleRef} className={pill ? "v2-toggle has-pill" : "v2-toggle"} role="tablist" aria-label="Project type">
          {pill && <span className={liquidClass("v2-toggle__pill", pill)} style={{ left: pill.left, right: pill.right }} aria-hidden="true" />}
          {groups.map((g, i) => (
            <button
              key={g.label}
              type="button"
              role="tab"
              data-tab={i}
              aria-selected={active === i}
              className={active === i ? "is-active" : undefined}
              onClick={() => setActive(i)}
            >
              {i === 0 ? productLabel : g.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="v2-cards" role="tabpanel" aria-label={active === 0 ? productLabel : groups[active].label}>
        {groups[active].items.map((w) => (
          <li key={w.title}>
            <a
              className={w.contain ? "v2-card v2-card--contain" : "v2-card"}
              href={w.href}
              // case studies open in place; client websites open in a new tab
              {...(w.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
              style={w.background ? { background: w.background } : undefined}
            >
              {w.video ? (
                <video src={w.video} poster={w.image} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
              ) : (
                <img src={w.image} alt="" style={w.position ? { objectPosition: w.position } : undefined} />
              )}
              <span className="v2-card__shade" aria-hidden="true" />
              <span className="v2-card__text">
                <span className="v2-card__title">{w.title}</span>
                <span className="v2-card__desc">{w.text}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
