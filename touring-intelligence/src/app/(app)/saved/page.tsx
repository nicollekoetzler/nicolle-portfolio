"use client";

import { Bookmark, Check, PenLine, Plus } from "lucide-react";
import Link from "next/link";
import { useAppState } from "@/components/providers/app-state";
import { LinkButton } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/panel";
import { AvailabilityPill } from "@/components/ui/pill";
import { ScoreRing } from "@/components/ui/score";
import { venues } from "@/lib/data/venues";
import { scoreFor } from "@/lib/match";

export default function SavedPage() {
  const { saved, tourPlan, pitches, toggleSaved } = useAppState();
  const ids = Array.from(new Set([...saved, ...tourPlan]));
  const list = venues.filter((v) => ids.includes(v.id)).sort((a, b) => scoreFor(b) - scoreFor(a));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Saved Opportunities"
        title="Your shortlist"
        description="Venues you've saved or pencilled into the Autumn Tour 2027 draft, with outreach status."
        actions={<LinkButton href="/discover" variant="primary">Find more venues</LinkButton>}
      />
      {list.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line-strong p-12 text-center">
          <Bookmark className="mx-auto size-5 text-muted" />
          <p className="mt-3 text-[14px] text-fg">Nothing saved yet</p>
          <p className="mt-1 text-[13px] text-muted">Save venues from Discovery to build your shortlist.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <ul className="divide-y divide-line">
            {list.map((v) => {
              const p = pitches[v.id];
              return (
                <li key={v.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <ScoreRing value={scoreFor(v)} size={42} />
                  <div className="min-w-0 flex-1">
                    <Link href={`/venues/${v.id}`} className="text-[14px] font-medium text-fg hover:text-accent">{v.name}</Link>
                    <p className="text-[12px] text-muted">{v.city}, {v.country} · Cap {v.capacity}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[12px]">
                    <AvailabilityPill value={v.availability} />
                    {tourPlan.includes(v.id) && (
                      <span className="inline-flex items-center gap-1 rounded-sm border border-accent/25 px-1.5 py-[3px] text-[11px] text-accent"><Plus className="size-3" />Tour plan</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-fg-2">
                      {p === "sent" ? <><Check className="size-3 text-accent" />Pitch sent</> : p === "drafted" ? <><PenLine className="size-3" />Pitch drafted</> : <span className="text-faint">No outreach</span>}
                    </span>
                  </div>
                  {saved.includes(v.id) && (
                    <button onClick={() => toggleSaved(v.id, v.name)} className="rounded-md p-2 text-accent hover:bg-hover" aria-label={`Remove ${v.name}`}>
                      <Bookmark className="size-4" fill="currentColor" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
