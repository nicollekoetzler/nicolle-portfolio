"use client";

import { useEffect, useState } from "react";

/**
 * Types `text` out once, letter by letter, with a blinking caret that fades when it's done.
 * The full text sits underneath (invisible) so the layout never shifts while typing.
 * It types once per mount; the site shell stays mounted across page changes, so it doesn't replay.
 */
export default function TypedText({ text, delay = 700, speed = 55 }: { text: string; delay?: number; speed?: number }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setDone(true);
      return;
    }
    let i = 0;
    let timer = window.setTimeout(function tick() {
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(tick, speed);
      else timer = window.setTimeout(() => setDone(true), 1400);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, delay, speed]);

  return (
    <span className="typed">
      <span className="typed__ghost">{text}</span>
      <span className="typed__shown" aria-hidden="true">
        {text.slice(0, count)}
        <i className={done ? "typed__caret is-done" : "typed__caret"} />
      </span>
    </span>
  );
}
