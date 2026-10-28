"use client";

import { useEffect } from "react";

/** The video and each topic block rise into place: the ones on screen right away when the page loads (one after
 *  another), the rest the first time they scroll into view. Without JS (or with reduced motion) they just show. */
export default function Reveal() {
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(".cp-hero, .cp-block"));
    // they start hidden in the CSS, so the ones already on screen animate in too instead of flashing first
    let first = true;
    let order = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          // on load, stagger the visible blocks; later ones come in as they're reached
          el.style.transitionDelay = first ? `${order++ * 120}ms` : "";
          el.classList.add("is-in");
          io.unobserve(el);
        });
        first = false;
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
  // without JS the blocks are shown straight away
  return <noscript><style>{".cp-hero, .cp-block { opacity: 1 !important; transform: none !important; }"}</style></noscript>;
}
