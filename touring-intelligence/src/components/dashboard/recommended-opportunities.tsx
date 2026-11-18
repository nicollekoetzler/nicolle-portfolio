"use client";

import { ArrowRight, Bookmark } from "lucide-react";
import Link from "next/link";
import { venues } from "@/lib/data/venues";
import { scoreFor } from "@/lib/match";
import { cn } from "@/lib/cn";
import { useAppState } from "../providers/app-state";
import { AIBadge, AIMark } from "../ui/ai";
import { LinkButton } from "../ui/button";
import { ScoreRing } from "../ui/score";

export function RecommendedOpportunities() {
  const { isSaved, toggleSaved } = useAppState();
  const top = [...venues].sort((a, b) => scoreFor(b) - scoreFor(a)).slice(0, 4);
  return (
    <section className="flex flex-col rounded-lg border border-line bg-surface">
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <AIBadge label="Ranked for NØCTURNE" />
          <h2 className="mt-2 text-[14px] font-medium text-fg">Recommended opportunities</h2>
        </div>
        <LinkButton href="/discover" variant="ghost" size="sm">
          View all <ArrowRight className="size-3.5" />
        </LinkButton>
      </header>
      <ul className="divide-y divide-line">
        {top.map((v) => {
          const saved = isSaved(v.id);
          return (
            <li key={v.id} className="group relative flex gap-4 px-5 py-4 transition-colors hover:bg-raised/50">
              <ScoreRing value={scoreFor(v)} size={42} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <Link href={`/venues/${v.id}`} className="text-[14px] font-medium text-fg after:absolute after:inset-0 hover:text-accent">
                    {v.name}
                  </Link>
                  <span className="text-[12px] text-muted">{v.city}, {v.country}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-3 font-mono text-[11px] text-faint">
                  <span>Cap {v.capacity}</span>
                  <span>Genre fit {v.breakdown.genre}%</span>
                  <span>{v.availability}</span>
                </div>
                <p className="mt-2 flex gap-2 text-[12.5px] leading-snug text-fg-2">
                  <AIMark size={8} className="mt-1 opacity-70" />
                  <span className="line-clamp-2">{v.reason}</span>
                </p>
              </div>
              <button
                onClick={() => toggleSaved(v.id, v.name)}
                className={cn(
                  "relative z-10 h-8 self-start rounded-md p-2 transition-colors hover:bg-hover",
                  saved ? "text-accent" : "text-faint hover:text-fg",
                )}
                aria-label={saved ? `Remove ${v.name} from saved` : `Save ${v.name}`}
                aria-pressed={saved}
              >
                <Bookmark className="size-4" fill={saved ? "currentColor" : "none"} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
