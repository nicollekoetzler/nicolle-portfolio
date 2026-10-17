"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", hour: "numeric", minute: "2-digit", hour12: true });

/** Nicolle's location and current local time (Curitiba is GMT-3 all year), ticking every 15s */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()).replace(" ", ""));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="v2-clock">
      <p>Curitiba, Brazil</p>
      {/* rendered after mount, so the static page never shows a stale time */}
      <p className="v2-clock__time">{time ?? " "}{time && " GMT -3"}</p>
    </div>
  );
}
