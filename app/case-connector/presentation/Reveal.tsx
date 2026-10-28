"use client";

import { useEffect } from "react";

/** The video and each topic block rise into place every time they scroll into view (the ones on screen when the
 *  page loads come in one after another), and reset once they're well out of it. Without JS (or with reduced motion)
 *  they just show. */
export default function Reveal() {
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(".cp-hero, .cp-block"));
    // they start hidden in the CSS, so the ones already on screen animate in too instead of flashing first
    let first = true;
    let order = 0;
    // in: once a block is a little way into the screen
    const enter = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          // on load, stagger the visible blocks; later ones come in as they're reached
          el.style.transitionDelay = first ? `${order++ * 120}ms` : "";
          el.classList.add("is-in");
        });
        first = false;
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    // out: only once it's fully off screen with room to spare, so a block still in view never vanishes and the
    // 64px drop of the hidden state can't pull it back into view
    const leave = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = "0ms";
          el.classList.remove("is-in");
        });
      },
      { rootMargin: "80px 0px 80px 0px" },
    );
    blocks.forEach((b) => {
      enter.observe(b);
      leave.observe(b);
    });
    return () => {
      enter.disconnect();
      leave.disconnect();
    };
  }, []);
  // without JS the blocks are shown straight away
  return <noscript><style>{".cp-hero, .cp-block { opacity: 1 !important; transform: none !important; }"}</style></noscript>;
}
