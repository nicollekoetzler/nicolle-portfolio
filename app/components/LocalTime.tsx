"use client";

import { useEffect, useState } from "react";

const TZ = "America/Sao_Paulo"; // Curitiba: GMT-3 all year
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true });
/* WMO weather codes (Open-Meteo) → short label and emoji */
function describe(code: number, isDay: boolean) {
  if (code === 0) return { text: "Clear", icon: isDay ? "☀️" : "🌙" };
  if (code <= 2) return { text: "Partly cloudy", icon: isDay ? "⛅" : "☁️" };
  if (code === 3) return { text: "Cloudy", icon: "☁️" };
  if (code === 45 || code === 48) return { text: "Foggy", icon: "🌫️" };
  if (code >= 51 && code <= 57) return { text: "Drizzle", icon: "🌦️" };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { text: "Rain", icon: "🌧️" };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { text: "Snow", icon: "❄️" };
  if (code >= 95) return { text: "Thunderstorm", icon: "⛈️" };
  return { text: "Cloudy", icon: "☁️" };
}

type Weather = { temp: number; code: number; isDay: boolean };

/** Tiny analog clock with live hands; the second hand sweeps with a CSS animation synced to the real second */
function AnalogClock({ now }: { now: Date | null }) {
  const [h, m, sec] = now
    ? new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "numeric", second: "numeric", hour12: false })
        .formatToParts(now)
        .filter((p) => p.type !== "literal")
        .map((p) => Number(p.value) % 24)
    : [0, 0, 0];
  const minuteDeg = m * 6 + sec * 0.1;
  const hourDeg = (h % 12) * 30 + m * 0.5;
  return (
    <svg className="v2-clock__face" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" className="v2-clock__rim" />
      {[0, 90, 180, 270].map((d) => <line key={d} x1="16" y1="3.5" x2="16" y2="5.5" transform={`rotate(${d} 16 16)`} className="v2-clock__tick" />)}
      {now && (
        <>
          <line x1="16" y1="16" x2="16" y2="9.5" transform={`rotate(${hourDeg} 16 16)`} className="v2-clock__hand v2-clock__hand--h" />
          <line x1="16" y1="16" x2="16" y2="6" transform={`rotate(${minuteDeg} 16 16)`} className="v2-clock__hand" />
          <g className="v2-clock__sec" style={{ animationDelay: `-${sec}s` }}>
            <line x1="16" y1="18" x2="16" y2="5" />
          </g>
        </>
      )}
      <circle cx="16" cy="16" r="1.4" className="v2-clock__pin" />
    </svg>
  );
}

/**
 * Top-right corner (desktop): a tiny live analog clock, location and local time.
 * Hovering opens a small card with the current weather in Curitiba (Open-Meteo, no key, fetched on first hover).
 */
export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Weather | "error" | null>(null);
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 10000);
    return () => window.clearInterval(id);
  }, []);

  const loadWeather = () => {
    if (asked) return;
    setAsked(true);
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-25.43&longitude=-49.27&current=temperature_2m,weather_code,is_day&timezone=America%2FSao_Paulo")
      .then((r) => r.json())
      .then((d) => setWeather({ temp: Math.round(d.current.temperature_2m), code: d.current.weather_code, isDay: d.current.is_day === 1 }))
      .catch(() => setWeather("error"));
  };

  // rendered after mount, so the static page never shows a stale time
  const time = now && timeFmt.format(now).replace(" ", "");
  const ok = weather && weather !== "error" ? weather : null;
  const sky = ok ? describe(ok.code, ok.isDay) : null;
  const gloomy = sky && ["Cloudy", "Foggy", "Drizzle", "Rain"].includes(sky.text);

  return (
    <div className="v2-clock" tabIndex={0} onMouseEnter={loadWeather} onFocus={loadWeather}>
      <AnalogClock now={now} />
      <div className="v2-clock__text">
        <p className="v2-clock__place">Curitiba, Brazil</p>
        <p className="v2-clock__time">{time ? `${time} GMT -3` : "\u00a0"}</p>
      </div>

      <div className="v2-clock__card" role="tooltip">
        {ok && sky ? (
          <>
            <p className="v2-clock__weather">
              <span className="v2-clock__icon" aria-hidden="true">{sky.icon}</span>
              <span className="v2-clock__temp">{ok.temp}°C</span>
              <span className="v2-clock__sky">{sky.text}</span>
            </p>
            <p className="v2-clock__note">{gloomy ? "Curitiba being Curitiba." : "A good day to design something."}</p>
          </>
        ) : (
          <p className="v2-clock__note">{weather === "error" ? "Weather is shy right now." : "Checking the sky…"}</p>
        )}
      </div>
    </div>
  );
}
