import { cn } from "@/lib/cn";
import type { Venue } from "@/lib/types";

/**
 * Placeholder "image" for a venue. Instead of decorative stock photography it draws
 * the room's recent attendance history as a skyline, so the visual carries data.
 */
export function VenueVisual({ venue, className, detailed }: { venue: Venue; className?: string; detailed?: boolean }) {
  const events = [...venue.events].reverse();
  const w = 320;
  const h = 200;
  const pad = 18;
  const bw = (w - pad * 2) / events.length;
  const initials = venue.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const capY = pad + 26;

  return (
    <div className={cn("relative overflow-hidden rounded-md border border-line bg-[#0c0c0e]", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <pattern id={`hatch-${venue.id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1" />
          </pattern>
          <linearGradient id={`fade-${venue.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c4ee4f" stopOpacity="0.16" />
            <stop offset="1" stopColor="#c4ee4f" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width={w} height={h} fill={`url(#hatch-${venue.id})`} />
        <line x1={pad} x2={w - pad} y1={capY} y2={capY} stroke="#ecebe6" strokeOpacity="0.18" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        {events.map((e, i) => {
          const ratio = e.attendance / venue.capacity;
          const top = capY + (h - pad - capY) * (1 - ratio);
          const last = i === events.length - 1;
          return (
            <rect
              key={i}
              x={pad + i * bw + 3}
              y={top}
              width={bw - 6}
              height={h - pad - top}
              rx="2"
              fill={last ? "#c4ee4f" : `url(#fade-${venue.id})`}
              fillOpacity={last ? 0.55 : 1}
              stroke="#c4ee4f"
              strokeOpacity={last ? 0 : 0.18}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        <line x1={pad} x2={w - pad} y1={h - pad} y2={h - pad} stroke="#ffffff" strokeOpacity="0.12" />
      </svg>
      <span className="pointer-events-none absolute -bottom-3 right-2 select-none text-[96px] font-semibold leading-none tracking-[-0.06em] text-white/[0.035]" aria-hidden>
        {initials}
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-2.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
        <span>{venue.city.slice(0, 3)} · {venue.countryCode}</span>
        <span>Cap {venue.capacity}</span>
      </div>
      {detailed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-2 font-mono text-[9.5px] uppercase tracking-[0.1em] text-faint">
          Attendance, last {venue.events.length} shows vs. capacity
        </div>
      )}
    </div>
  );
}
