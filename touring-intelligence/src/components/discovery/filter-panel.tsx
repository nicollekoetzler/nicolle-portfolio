"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ALL_GENRES, venues } from "@/lib/data/venues";
import { DEFAULT_FILTERS, DRAW_BANDS } from "@/lib/match";
import type { Availability, CountryCode, Filters, VenueType } from "@/lib/types";
import { Chip } from "../ui/pill";

const COUNTRIES: { code: CountryCode; name: string }[] = [
  { code: "DE", name: "Germany" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "AT", name: "Austria" },
  { code: "NL", name: "Netherlands" },
  { code: "HU", name: "Hungary" },
];
const TYPES: VenueType[] = ["Club", "Bar", "DIY Space", "Concert Hall", "Cultural Centre"];
const AVAIL: Availability[] = ["Open dates", "Limited dates", "Fully booked"];

function toggle<T>(list: T[], item: T) {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Group({ title, children, defaultOpen = true, count }: { title: string; children: ReactNode; defaultOpen?: boolean; count?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-4 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-left" aria-expanded={open}>
        <span className="label flex items-center gap-2">
          {title}
          {!!count && <span className="rounded-sm bg-accent/15 px-1 text-accent">{count}</span>}
        </span>
        <ChevronDown className={cn("size-3.5 text-faint transition-transform", !open && "-rotate-90")} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function FilterPanel({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const cityOptions = Array.from(
    new Set(venues.filter((v) => filters.countries.length === 0 || filters.countries.includes(v.countryCode)).map((v) => v.city)),
  ).sort();

  return (
    <div>
      <Group title="Estimated draw" count={filters.draw !== DEFAULT_FILTERS.draw ? 1 : 0}>
        <div className="grid grid-cols-4 gap-1 rounded-md border border-line p-0.5">
          {DRAW_BANDS.map((d) => (
            <button
              key={d}
              onClick={() => set({ draw: d })}
              className={cn(
                "tabular h-7 rounded-[4px] font-mono text-[11px] transition-colors",
                filters.draw === d ? "bg-hover text-fg" : "text-muted hover:text-fg",
              )}
            >
              {d}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] text-faint">Changes capacity fit and re-ranks results.</p>
      </Group>

      <Group title="Country" count={filters.countries.length}>
        <div className="flex flex-wrap gap-1.5">
          {COUNTRIES.map((c) => (
            <Chip
              key={c.code}
              active={filters.countries.includes(c.code)}
              onClick={() => {
                const countries = toggle(filters.countries, c.code);
                const cities = filters.cities.filter((city) => venues.some((v) => v.city === city && (countries.length === 0 || countries.includes(v.countryCode))));
                set({ countries, cities });
              }}
            >
              <span className="font-mono text-[10.5px] text-muted">{c.code}</span>
              {c.name}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="City" count={filters.cities.length} defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {cityOptions.map((c) => (
            <Chip key={c} active={filters.cities.includes(c)} onClick={() => set({ cities: toggle(filters.cities, c) })}>
              {c}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Genre" count={filters.genres.length}>
        <div className="flex flex-wrap gap-1.5">
          {ALL_GENRES.map((g) => (
            <Chip key={g} active={filters.genres.includes(g)} onClick={() => set({ genres: toggle(filters.genres, g) })}>
              {g}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Venue capacity" count={filters.capacity[0] !== DEFAULT_FILTERS.capacity[0] || filters.capacity[1] !== DEFAULT_FILTERS.capacity[1] ? 1 : 0}>
        <div className="flex items-center justify-between font-mono text-[12px] text-fg">
          <span className="tabular">{filters.capacity[0]}</span>
          <span className="text-faint">to</span>
          <span className="tabular">{filters.capacity[1]}</span>
        </div>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 text-[11px] text-muted">
            <span className="w-7">Min</span>
            <input
              type="range"
              min={100}
              max={450}
              step={10}
              value={filters.capacity[0]}
              onChange={(e) => set({ capacity: [Math.min(+e.target.value, filters.capacity[1] - 20), filters.capacity[1]] })}
              className="h-1 flex-1"
            />
          </label>
          <label className="flex items-center gap-2 text-[11px] text-muted">
            <span className="w-7">Max</span>
            <input
              type="range"
              min={100}
              max={450}
              step={10}
              value={filters.capacity[1]}
              onChange={(e) => set({ capacity: [filters.capacity[0], Math.max(+e.target.value, filters.capacity[0] + 20)] })}
              className="h-1 flex-1"
            />
          </label>
        </div>
      </Group>

      <Group title="Venue type" count={filters.types.length} defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <Chip key={t} active={filters.types.includes(t)} onClick={() => set({ types: toggle(filters.types, t) })}>
              {t}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Booking availability" count={filters.availability.length}>
        <div className="flex flex-wrap gap-1.5">
          {AVAIL.map((a) => (
            <Chip key={a} active={filters.availability.includes(a)} onClick={() => set({ availability: toggle(filters.availability, a) })}>
              {a}
            </Chip>
          ))}
        </div>
      </Group>
    </div>
  );
}
