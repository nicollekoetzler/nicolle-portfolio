import { ArrowUpRight, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { artist } from "@/lib/data/artist";
import { venues } from "@/lib/data/venues";
import { scoreFor } from "@/lib/match";
import { Meter } from "../ui/score";

export function ArtistCard() {
  const t = artist.tour;
  const open = t.targetDates - t.confirmed - t.holds;
  return (
    <section className="rounded-lg border border-line bg-surface p-5">
      <div className="flex items-start gap-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-md border border-line-strong bg-[#121214] text-[17px] font-bold tracking-tight text-fg">
          NØ
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[18px] font-semibold tracking-[0.04em] text-fg">{artist.name}</h2>
            <span className="rounded-sm border border-line px-1.5 py-px font-mono text-[10px] uppercase tracking-wider text-muted">Since {artist.formed}</span>
          </div>
          <p className="mt-1 text-[13px] text-fg-2">{artist.genre}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" />{artist.base}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="size-3.5" />Est. draw {artist.draw}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-line bg-bg/40 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="label">Upcoming tour</div>
            <p className="mt-1 text-[13.5px] font-medium text-fg">{t.name}</p>
            <p className="mt-0.5 font-mono text-[11.5px] text-muted">{t.window}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-warn/25 bg-warn/[0.07] px-2 py-1 text-[11px] text-warn">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-warn" />
            {t.status}
          </span>
        </div>
        <div className="mt-4 flex h-1.5 gap-[2px] overflow-hidden rounded-full">
          <div className="bg-accent" style={{ flex: t.confirmed }} />
          <div className="bg-accent/40" style={{ flex: t.holds }} />
          <div className="bg-line-strong" style={{ flex: open }} />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-fg-2">
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-accent" />{t.confirmed} confirmed</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-accent/40" />{t.holds} on hold</span>
          <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-line-strong" />{open} dates open</span>
        </div>
      </div>
    </section>
  );
}

export function KpiTiles() {
  const recommended = venues.filter((v) => scoreFor(v) >= 76).length;
  const opportunities = venues.filter((v) => scoreFor(v) >= 84 && v.availability !== "Fully booked").length;
  const p = artist.profile;
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Link href="/discover" className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong">
        <div className="flex items-center justify-between">
          <span className="label">Recommended venues</span>
          <ArrowUpRight className="size-3.5 text-faint transition-colors group-hover:text-accent" />
        </div>
        <p className="tabular mt-4 text-[34px] font-semibold leading-none tracking-[-0.03em] text-fg">{recommended}</p>
        <p className="mt-2 text-[12px] text-muted">
          <span className="text-accent">+4</span> since last week across 6 countries
        </p>
      </Link>
      <Link href="/discover?q=open%20dates" className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong">
        <div className="flex items-center justify-between">
          <span className="label">Booking opportunities</span>
          <ArrowUpRight className="size-3.5 text-faint transition-colors group-hover:text-accent" />
        </div>
        <p className="tabular mt-4 text-[34px] font-semibold leading-none tracking-[-0.03em] text-fg">{opportunities}</p>
        <p className="mt-2 text-[12px] text-muted">Strong fit with open dates in your tour window</p>
      </Link>
      <Link href="/settings" className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong">
        <div className="flex items-center justify-between">
          <span className="label">Profile completeness</span>
          <ArrowUpRight className="size-3.5 text-faint transition-colors group-hover:text-accent" />
        </div>
        <p className="tabular mt-4 text-[34px] font-semibold leading-none tracking-[-0.03em] text-fg">
          {p.completeness}<span className="text-[18px] text-muted">%</span>
        </p>
        <Meter value={p.completeness} className="mt-3" />
        <p className="mt-2 text-[12px] text-muted">Add {p.missing[0].toLowerCase()} to sharpen matches</p>
      </Link>
    </div>
  );
}
