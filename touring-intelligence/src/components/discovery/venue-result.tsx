"use client";

import { ArrowUpRight, Bookmark, ChevronDown, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { factorExplanations } from "@/lib/explain";
import { breakdownFor, FACTORS, matchTier, totalScore } from "@/lib/match";
import type { DrawBand, Venue } from "@/lib/types";
import { useAppState } from "../providers/app-state";
import { AIMark } from "../ui/ai";
import { buttonClass } from "../ui/button";
import { AvailabilityPill, ContactPill, Pill } from "../ui/pill";
import { Meter, ScoreRing } from "../ui/score";
import { VenueVisual } from "../ui/venue-visual";

export function VenueResult({ venue, rank, draw, delay = 0 }: { venue: Venue; rank: number; draw: DrawBand; delay?: number }) {
  const { isSaved, toggleSaved } = useAppState();
  const [open, setOpen] = useState(false);
  const b = breakdownFor(venue, draw);
  const score = totalScore(b);
  const saved = isSaved(venue.id);
  const why = factorExplanations(venue, draw);

  return (
    <article
      className="group animate-fade-up rounded-lg border border-line bg-surface transition-colors hover:border-line-strong"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
        <Link href={`/venues/${venue.id}`} className="block shrink-0" aria-label={`Open ${venue.name}`} tabIndex={-1}>
          <VenueVisual venue={venue} className="h-[120px] w-full sm:h-[128px] sm:w-[176px]" />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="tabular font-mono text-[11px] text-faint">#{String(rank).padStart(2, "0")}</span>
                <Link href={`/venues/${venue.id}`} className="truncate text-[16px] font-medium tracking-[-0.01em] text-fg hover:text-accent">
                  {venue.name}
                </Link>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
                <span className="inline-flex items-center gap-1"><MapPin className="size-3" />{venue.city}, {venue.country}</span>
                <span className="inline-flex items-center gap-1"><Users className="size-3" />Cap {venue.capacity}</span>
                <span>{venue.type}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden text-right sm:block">
                <div className="text-[11px] text-muted">{matchTier(score)}</div>
                <div className="font-mono text-[10.5px] text-faint">match</div>
              </div>
              <ScoreRing value={score} size={50} />
            </div>
          </div>

          <p className="mt-3 flex gap-2 text-[13px] leading-relaxed text-fg-2">
            <AIMark size={9} className="mt-[5px]" />
            <span>{venue.reason}</span>
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
            <Pill>
              Genre fit <span className="tabular font-mono text-fg">{b.genre}%</span>
            </Pill>
            <AvailabilityPill value={venue.availability} />
            <ContactPill status={venue.buyer.status} />
            <span className="ml-1 hidden text-[11.5px] text-faint md:inline">
              Booked <span className="text-fg-2">{venue.similarArtists.slice(0, 3).join(", ")}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5 sm:px-5">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[12.5px] text-fg-2 transition-colors hover:bg-hover hover:text-fg"
        >
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
          Why this match
        </button>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleSaved(venue.id, venue.name)}
            aria-pressed={saved}
            className={buttonClass("ghost", "sm", saved ? "text-accent hover:text-accent" : undefined)}
          >
            <Bookmark className="size-3.5" fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save"}
          </button>
          <Link href={`/venues/${venue.id}`} className={buttonClass("secondary", "sm")}>
            Intelligence report <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {open && (
        <div className="animate-fade-up border-t border-line bg-bg/40 px-4 py-4 sm:px-5">
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {FACTORS.map((f) => (
              <div key={f.key}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-fg">{f.label}</span>
                  <span className="tabular font-mono text-fg-2">{b[f.key]}%</span>
                </div>
                <Meter value={b[f.key]} className="mt-1.5" />
                <p className="mt-1.5 text-[11.5px] leading-snug text-muted">{why[f.key]}</p>
              </div>
            ))}
            <div className="flex flex-col justify-end">
              <p className="font-mono text-[10.5px] leading-relaxed text-faint">
                Weighted total {score}% · simulated prototype scoring
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
