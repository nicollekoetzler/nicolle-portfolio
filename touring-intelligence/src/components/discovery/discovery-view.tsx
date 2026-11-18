"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { venues } from "@/lib/data/venues";
import { applyFilters, countActiveFilters, DEFAULT_FILTERS, scoreFor } from "@/lib/match";
import { EXAMPLE_PROMPT, parseQuery, type Interpretation } from "@/lib/search";
import type { Filters } from "@/lib/types";
import { AIBadge } from "../ui/ai";
import { Button } from "../ui/button";
import { PageHeader } from "../ui/panel";
import { FilterPanel } from "./filter-panel";
import { MatchModelCard } from "./match-model";
import { SearchBox, THINKING_STEPS } from "./search-box";
import { VenueResult } from "./venue-result";

type Sort = "match" | "capacity" | "distance";
type Status = "idle" | "thinking" | "done";

export function DiscoveryView() {
  const params = useSearchParams();
  const router = useRouter();
  const initialQ = params.get("q");

  const [prompt, setPrompt] = useState(initialQ ?? EXAMPLE_PROMPT);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [peer, setPeer] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [interpretation, setInterpretation] = useState<Interpretation[] | null>(null);
  const [sort, setSort] = useState<Sort>("match");
  const [showFilters, setShowFilters] = useState(false);
  const [runId, setRunId] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback(
    (text?: string) => {
      const q = (text ?? prompt).trim();
      if (!q) return;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setStatus("thinking");
      setStep(0);
      setInterpretation(null);
      THINKING_STEPS.forEach((_, i) => {
        timers.current.push(setTimeout(() => setStep(i), i * 380));
      });
      timers.current.push(
        setTimeout(() => {
          const parsed = parseQuery(q);
          setFilters(parsed.filters);
          setPeer(parsed.peerArtist);
          setInterpretation(parsed.interpretation);
          setStatus("done");
          setRunId((r) => r + 1);
        }, THINKING_STEPS.length * 380 + 200),
      );
      router.replace(`/discover?q=${encodeURIComponent(q)}`, { scroll: false });
    },
    [prompt, router],
  );

  useEffect(() => {
    const boot = initialQ ? setTimeout(() => run(initialQ), 0) : undefined;
    const t = timers.current;
    return () => {
      clearTimeout(boot);
      t.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setPrompt(EXAMPLE_PROMPT);
    setFilters(DEFAULT_FILTERS);
    setPeer(undefined);
    setInterpretation(null);
    setStatus("idle");
    setRunId((r) => r + 1);
    router.replace("/discover", { scroll: false });
  };

  const results = useMemo(() => {
    let list = applyFilters(venues, filters);
    if (peer) list = list.filter((v) => v.similarArtists.includes(peer));
    const s = [...list];
    if (sort === "match") s.sort((a, b) => scoreFor(b, filters.draw) - scoreFor(a, filters.draw));
    if (sort === "capacity") s.sort((a, b) => a.capacity - b.capacity);
    if (sort === "distance") s.sort((a, b) => a.distanceKm - b.distanceKm);
    return s;
  }, [filters, peer, sort]);

  const active = countActiveFilters(filters) + (peer ? 1 : 0);
  const avg = results.length ? Math.round(results.reduce((s, v) => s + scoreFor(v, filters.draw), 0) / results.length) : 0;

  const filtersAside = (
    <>
      <div className="rounded-lg border border-line bg-surface px-4">
        <div className="flex items-center justify-between border-b border-line py-3.5">
          <span className="text-[13px] font-medium text-fg">Refine</span>
          {active > 0 && (
            <button
              onClick={() => {
                setFilters(DEFAULT_FILTERS);
                setPeer(undefined);
              }}
              className="text-[12px] text-muted hover:text-fg"
            >
              Clear all
            </button>
          )}
        </div>
        <FilterPanel filters={filters} onChange={setFilters} />
      </div>
      <MatchModelCard />
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={<span className="flex items-center gap-2">Venue Discovery <AIBadge label="AI" /></span>}
        title="Find the rooms that fit, not just the rooms that exist."
        description="Describe the tour you're planning. Discovery reads it against NØCTURNE's sound, draw and peer acts, then ranks venues by how well they fit."
      />

      <SearchBox
        value={prompt}
        onChange={setPrompt}
        onSubmit={run}
        status={status}
        step={step}
        interpretation={interpretation}
        onReset={reset}
      />

      <div className="grid gap-6 lg:grid-cols-[272px_minmax(0,1fr)]">
        <aside className="hidden space-y-4 lg:block">{filtersAside}</aside>

        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <h2 className="text-[15px] font-medium text-fg">
                {status === "thinking" ? "Ranking venues…" : <><span className="tabular">{results.length}</span> matches</>}
              </h2>
              {status !== "thinking" && results.length > 0 && (
                <span className="font-mono text-[11px] text-muted">
                  avg. fit {avg}% · {status === "done" ? "for your prompt" : "based on your profile"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="lg:hidden" onClick={() => setShowFilters(true)}>
                <SlidersHorizontal className="size-3.5" /> Filters {active > 0 && <span className="text-accent">{active}</span>}
              </Button>
              <label className="flex items-center gap-2 text-[12px] text-muted">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-8 rounded-md border border-line-strong bg-raised px-2 text-[12.5px] text-fg focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <option value="match">Best match</option>
                  <option value="capacity">Capacity</option>
                  <option value="distance">Distance from base</option>
                </select>
              </label>
            </div>
          </div>

          {peer && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-line bg-raised px-2.5 py-1.5 text-[12px] text-fg-2">
              Only venues that booked <span className="text-fg">{peer}</span>
              <button onClick={() => setPeer(undefined)} className="text-muted hover:text-fg" aria-label="Remove peer filter">
                <X className="size-3" />
              </button>
            </div>
          )}

          <div className={cn("space-y-3 transition-opacity duration-300", status === "thinking" && "pointer-events-none opacity-30")}>
            {results.map((v, i) => (
              <VenueResult key={`${runId}-${v.id}`} venue={v} rank={i + 1} draw={filters.draw} delay={Math.min(i, 6) * 45} />
            ))}
            {results.length === 0 && status !== "thinking" && (
              <div className="rounded-lg border border-dashed border-line-strong p-10 text-center">
                <p className="text-[14px] text-fg">No venues fit all of these criteria.</p>
                <p className="mt-1 text-[13px] text-muted">Try widening the capacity range or removing a country.</p>
                <Button size="sm" className="mt-4" onClick={() => { setFilters(DEFAULT_FILTERS); setPeer(undefined); }}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/70" onClick={() => setShowFilters(false)} aria-label="Close filters" />
          <div className="absolute inset-y-0 right-0 flex w-[min(360px,100vw)] animate-fade-up flex-col border-l border-line bg-bg">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-[14px] font-medium">Filters</span>
              <button onClick={() => setShowFilters(false)} className="rounded-md p-1.5 text-muted hover:bg-hover" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">{filtersAside}</div>
            <div className="border-t border-line p-4">
              <Button variant="primary" className="w-full" onClick={() => setShowFilters(false)}>
                Show {results.length} matches
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
