"use client";

import { BadgeCheck, Bookmark, ChevronRight, ExternalLink, Mail, MapPin, PenLine, Plus, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { artist } from "@/lib/data/artist";
import { getVenue } from "@/lib/data/venues";
import { factorExplanations } from "@/lib/explain";
import { DEFAULT_DRAW, FACTORS, matchTier, totalScore } from "@/lib/match";
import { recommendationFor } from "@/lib/pitch";
import { cn } from "@/lib/cn";
import { useAppState } from "../providers/app-state";
import { AIBadge, AIMark, SimulatedNote } from "../ui/ai";
import { Button } from "../ui/button";
import { Panel } from "../ui/panel";
import { Pill } from "../ui/pill";
import { Meter, ScoreRing } from "../ui/score";
import { VenueVisual } from "../ui/venue-visual";
import { AttendanceChart } from "./attendance-chart";
import { BookingContact } from "./booking-contact";
import { PitchDialog } from "./pitch-dialog";
import { ContactDialog } from "./contact-dialog";

export function VenueReport({ id }: { id: string }) {
  const v = getVenue(id)!;
  const { isSaved, toggleSaved, addToTour, tourPlan } = useAppState();
  const [pitchOpen, setPitchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [pitchBody, setPitchBody] = useState<{ subject: string; body: string } | null>(null);

  const b = v.breakdown;
  const score = totalScore(b);
  const why = factorExplanations(v, DEFAULT_DRAW);
  const saved = isSaved(v.id);
  const inTour = tourPlan.includes(v.id);
  const avgFill = Math.round((v.events.reduce((s, e) => s + e.attendance, 0) / v.events.length / v.capacity) * 100);

  const meta: [string, React.ReactNode][] = [
    ["Capacity", <span key="c" className="tabular">{v.capacity}</span>],
    ["Venue type", v.type],
    ["District", v.district],
    ["Operating since", v.founded],
    [
      "Website",
      <a key="w" href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-fg hover:text-accent" title="Fictional website">
        {v.website} <ExternalLink className="size-3" />
      </a>,
    ],
    ["Booking contact", `${v.buyer.name}, ${v.buyer.role}`],
  ];

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
        <Link href="/discover" className="hover:text-fg">Venue Discovery</Link>
        <ChevronRight className="size-3" />
        <span className="text-fg-2">{v.name}</span>
        <span className="ml-auto hidden font-mono text-[10.5px] text-faint sm:inline">Report generated Nov 18, 2026 · simulated</span>
      </nav>

      {/* A. Overview */}
      <section className="grid gap-6 rounded-lg border border-line bg-surface p-5 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:p-6">
        <VenueVisual venue={v} detailed className="aspect-[16/10] w-full md:aspect-auto md:h-full md:min-h-[260px]" />
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label">Venue intelligence report</span>
            {v.verified ? (
              <span className="inline-flex items-center gap-1 rounded-sm border border-accent/25 bg-accent/[0.06] px-1.5 py-[3px] text-[11px] text-accent">
                <BadgeCheck className="size-3" /> Verified venue
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-sm border border-warn/25 bg-warn/[0.06] px-1.5 py-[3px] text-[11px] text-warn">
                <ShieldAlert className="size-3" /> Unverified listing
              </span>
            )}
          </div>
          <h1 className="mt-3 text-[32px] font-semibold leading-none tracking-[-0.03em] text-fg md:text-[40px]">{v.name}</h1>
          <p className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13.5px] text-fg-2">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-muted" />{v.city}, {v.country}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="size-3.5 text-muted" />{v.capacity} capacity</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {v.genres.map((g) => (
              <Pill key={g}>{g}</Pill>
            ))}
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-line pt-5 sm:grid-cols-3">
            {meta.map(([k, val]) => (
              <div key={k} className="min-w-0">
                <dt className="label">{k}</dt>
                <dd className="mt-1 truncate text-[13px] text-fg">{val}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <Button variant="primary" onClick={() => setPitchOpen(true)}>
              <PenLine className="size-3.5" /> Prepare booking pitch
            </Button>
            <Button onClick={() => setContactOpen(true)}>
              <Mail className="size-3.5" /> Contact talent buyer
            </Button>
            <Button onClick={() => toggleSaved(v.id, v.name)} aria-pressed={saved} className={cn(saved && "border-accent/40 text-accent")}>
              <Bookmark className="size-3.5" fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save opportunity"}
            </Button>
            <Button variant="ghost" onClick={() => addToTour(v.id, v.name)} className={cn(inTour && "text-accent")}>
              <Plus className="size-3.5" /> {inTour ? "In tour plan" : "Add to tour plan"}
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          {/* B. Compatibility */}
          <Panel ai eyebrow={<AIBadge label="Compatibility analysis" />} title={`How well ${v.name} fits ${artist.name}`} bodyClassName="p-0">
            <div className="grid gap-px bg-line md:grid-cols-[260px_minmax(0,1fr)]">
              <div className="flex flex-col items-center justify-center bg-surface px-6 py-8 text-center">
                <ScoreRing value={score} size={132} stroke={5}>
                  <span className="tabular text-[38px] font-semibold leading-none tracking-[-0.04em] text-fg">
                    {score}
                    <span className="text-[16px] font-normal text-muted">%</span>
                  </span>
                </ScoreRing>
                <p className="mt-4 text-[14px] font-medium text-fg">{matchTier(score)}</p>
                <p className="mt-1 text-[12px] text-muted">Top {score >= 90 ? "3%" : score >= 85 ? "10%" : "25%"} of venues for your profile</p>
              </div>
              <div className="space-y-4 bg-surface p-5">
                {FACTORS.map((f) => (
                  <div key={f.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] text-fg">{f.label}</span>
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-[10.5px] text-faint">weight {Math.round(f.weight * 100)}%</span>
                        <span className="tabular w-9 text-right font-mono text-[13px] text-fg">{b[f.key]}%</span>
                      </span>
                    </div>
                    <Meter value={b[f.key]} className="mt-2" />
                    <p className="mt-1.5 text-[12px] leading-snug text-muted">{why[f.key]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-line px-5 py-3">
              <SimulatedNote>These values are illustrative mock data, not real predictions.</SimulatedNote>
            </div>
          </Panel>

          {/* D. Recommendation */}
          <section className="relative overflow-hidden rounded-lg border border-accent/20 bg-[linear-gradient(180deg,rgba(196,238,79,0.045),rgba(196,238,79,0)_70%)] p-5 lg:p-6">
            <div className="flex items-center justify-between gap-3">
              <AIBadge label="AI recommendation" />
              <span className="font-mono text-[10.5px] text-faint">Confidence: high · simulated</span>
            </div>
            <p className="mt-4 max-w-3xl text-[16px] leading-[1.65] tracking-[-0.005em] text-fg md:text-[17px]">{recommendationFor(v)}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Suggested slot", v.capacity > 300 ? "Co-headline" : "Headline"],
                ["Best window", v.availabilityNote],
                ["Pitch angle", "Lead with Berlin draw and peer acts"],
              ].map(([k, val]) => (
                <div key={k} className="rounded-md border border-line bg-bg/50 px-3.5 py-3">
                  <div className="label">{k}</div>
                  <p className="mt-1 text-[13px] text-fg">{val}</p>
                </div>
              ))}
            </div>
          </section>

          {/* C. Booking intelligence */}
          <Panel title="Booking intelligence" eyebrow={<span className="label">Programming history · last 12 months</span>} bodyClassName="p-0">
            <div className="grid gap-px bg-line sm:grid-cols-3">
              {[
                ["Typical attendance", `${v.typicalAttendance[0]}–${v.typicalAttendance[1]}`],
                ["Average fill", `${avgFill}%`],
                ["Peer acts booked", `${v.similarArtists.filter((a) => artist.peers.includes(a)).length} of ${artist.peers.length}`],
              ].map(([k, val]) => (
                <div key={k} className="bg-surface px-5 py-4">
                  <div className="label">{k}</div>
                  <p className="tabular mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-fg">{val}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-line p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-medium text-fg">Attendance vs. capacity</h3>
                <span className="font-mono text-[10.5px] text-faint">Dashed line = capacity {v.capacity}</span>
              </div>
              <AttendanceChart venue={v} />
            </div>

            <div className="border-t border-line">
              <div className="px-5 pt-5">
                <h3 className="text-[13px] font-medium text-fg">Historical events</h3>
              </div>
              <div className="overflow-x-auto px-5 pb-2">
                <table className="mt-3 w-full min-w-[560px] text-left text-[12.5px]">
                  <thead>
                    <tr className="border-b border-line text-muted">
                      <th className="py-2 pr-4 font-normal">Date</th>
                      <th className="py-2 pr-4 font-normal">Headliner</th>
                      <th className="py-2 pr-4 font-normal">Format</th>
                      <th className="py-2 pr-4 font-normal">Genre</th>
                      <th className="py-2 text-right font-normal">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {v.events.map((e) => (
                      <tr key={e.date + e.headliner} className="border-b border-line/60 last:border-0">
                        <td className="py-2.5 pr-4 font-mono text-[11.5px] text-muted">{e.date}</td>
                        <td className="py-2.5 pr-4">
                          <span className="text-fg">{e.headliner}</span>
                          {e.support.length > 0 && <span className="block text-[11.5px] text-faint">w/ {e.support.join(", ")}</span>}
                        </td>
                        <td className="py-2.5 pr-4 text-fg-2">{e.format}</td>
                        <td className="py-2.5 pr-4 text-fg-2">{e.genre}</td>
                        <td className="tabular py-2.5 text-right font-mono text-fg">
                          {e.attendance}
                          <span className="text-faint"> / {v.capacity}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-px border-t border-line bg-line md:grid-cols-2">
              <div className="bg-surface p-5">
                <h3 className="text-[13px] font-medium text-fg">Similar artists booked</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {v.similarArtists.map((a) => (
                    <li key={a}>
                      <Pill className={cn(artist.peers.includes(a) && "border-accent/25 text-fg")}>
                        {artist.peers.includes(a) && <AIMark size={7} />}
                        {a}
                      </Pill>
                    </li>
                  ))}
                </ul>
                <p className="mt-2.5 text-[11.5px] text-faint">
                  <AIMark size={7} className="mr-1 inline" /> marks acts in NØCTURNE&apos;s peer group
                </p>
              </div>
              <div className="bg-surface p-5">
                <h3 className="text-[13px] font-medium text-fg">Booking preferences</h3>
                <ul className="mt-3 space-y-2">
                  {v.preferences.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[12.5px] leading-snug text-fg-2">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-line p-5">
              <div className="flex items-start gap-3">
                <AIMark size={10} className="mt-1" />
                <div>
                  <h3 className="text-[13px] font-medium text-fg">Potential audience fit</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-fg-2">{v.audienceFit}</p>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* E. Contact */}
        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <BookingContact venue={v} onPitch={() => setPitchOpen(true)} onContact={() => setContactOpen(true)} />
          <div className="rounded-lg border border-line bg-surface p-4">
            <div className="label">Data provenance</div>
            <ul className="mt-3 space-y-2 text-[12px] text-fg-2">
              <li className="flex justify-between gap-3"><span>Programming history</span><span className="font-mono text-muted">{v.events.length} events</span></li>
              <li className="flex justify-between gap-3"><span>Contact last verified</span><span className="font-mono text-muted">{v.buyer.lastVerified}</span></li>
              <li className="flex justify-between gap-3"><span>Listener signals</span><span className="font-mono text-muted">Simulated</span></li>
            </ul>
            <SimulatedNote className="mt-3">
              Prototype report. No real-time booking data is used; venue, people and figures are fictional.
            </SimulatedNote>
          </div>
        </aside>
      </div>

      {pitchOpen && (
      <PitchDialog
        open
        onClose={() => setPitchOpen(false)}
        venue={v}
        onUse={(p) => {
          setPitchBody(p);
          setPitchOpen(false);
          setContactOpen(true);
        }}
      />
      )}
      {contactOpen && <ContactDialog open onClose={() => setContactOpen(false)} venue={v} draft={pitchBody} />}
    </div>
  );
}
