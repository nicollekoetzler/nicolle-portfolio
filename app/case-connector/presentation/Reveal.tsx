"use client";

import { useEffect } from "react";

/** Each topic block rises into place the first time it scrolls into view. Without JS (or with reduced motion) they just show. */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(".cp-block"));
    // blocks already on screen when the page opens stay put; only the ones below wait for the scroll
    const below = blocks.filter((b) => b.getBoundingClientRect().top > window.innerHeight);
    below.forEach((b) => b.classList.add("is-waiting"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove("is-waiting");
        io.unobserve(e.target);
      }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    below.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
  return null;
}
