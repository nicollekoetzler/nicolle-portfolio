"use client";

import { useEffect, useState } from "react";

const TZ = "America/Sao_Paulo"; // Curitiba: GMT-3 all year
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit", hour12: true });
const partsFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", hour: "numeric", hour12: false });

/* working hours in Curitiba: Mon–Fri, 9AM–6PM */
const START = 9;
const END = 18;

function availability(now: Date) {
  const parts = Object.fromEntries(partsFmt.formatToParts(now).map((p) => [p.type, p.value]));
  const hour = Number(parts.hour) % 24;
  const day = parts.weekday; // Mon … Sun
  const weekday = !["Sat", "Sun"].includes(day);
  if (weekday && hour >= START && hour < END) return { online: true, label: "Online now" };
  // next opening: later today, tomorrow, or Monday
  const beforeOpen = weekday && hour < START;
  const nextIsMonday = day === "Sat" || day === "Sun" || (day === "Fri" && hour >= END);
  const when = beforeOpen ? "at 9AM" : nextIsMonday ? "Monday 9AM" : "tomorrow 9AM";
  return { online: false, label: `Offline · back ${when}` };
}

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

/**
 * Top-right corner (desktop): availability status + location and local time.
 * Hovering opens a small card with the current weather in Curitiba (Open-Meteo, no key, fetched on first hover).
 */
export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  const [weather, setWeather] = useState<Weather | "error" | null>(null);
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15000);
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

  // rendered after mount, so the static page never shows a stale time or status
  const status = now && availability(now);
  const time = now && timeFmt.format(now).replace(" ", "");
  const ok = weather && weather !== "error" ? weather : null;
  const sky = ok ? describe(ok.code, ok.isDay) : null;
  const gloomy = sky && ["Cloudy", "Foggy", "Drizzle", "Rain"].includes(sky.text);

  return (
    <div className="v2-clock" tabIndex={0} onMouseEnter={loadWeather} onFocus={loadWeather}>
      <p className={status?.online ? "v2-clock__status is-online" : "v2-clock__status"}>
        <span className="v2-clock__dot" aria-hidden="true" />
        {status?.label ?? " "}
      </p>
      <p className="v2-clock__place">
        Curitiba, Brazil{time && <> · <span className="v2-clock__time">{time} GMT -3</span></>}
      </p>

      <div className="v2-clock__card" role="tooltip">
        <p className="v2-clock__card-label">Right now in Curitiba</p>
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
        <p className="v2-clock__card-foot">
          {time} local time · {status?.online ? "usually replies within a few hours" : "replies next working day"}
        </p>
      </div>
    </div>
  );
}
