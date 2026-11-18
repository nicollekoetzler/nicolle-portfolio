import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/panel";

const ROSTER = [
  { name: "NØCTURNE", genre: "Atmospheric Black Metal", base: "Berlin, DE", draw: "150–250", status: "Planning autumn 2027", active: true },
  { name: "Grey Cathedral", genre: "Post-Metal", base: "Hamburg, DE", draw: "200–350", status: "Off-cycle, writing" },
  { name: "Kolde Øde", genre: "Black Metal", base: "Leipzig, DE", draw: "80–150", status: "Weekend shows only" },
];

export default function ArtistsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Artists" title="Your roster" description="Artists you manage. Each gets its own matching profile, markets and shortlist." />
      <div className="grid gap-4 md:grid-cols-3">
        {ROSTER.map((a) => (
          <Link key={a.name} href={a.active ? "/" : "#"} className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-md border border-line-strong bg-raised text-[12px] font-bold text-fg">
                {a.name.slice(0, 2).toUpperCase()}
              </span>
              {a.active ? <span className="label text-accent">Active</span> : <ArrowUpRight className="size-4 text-faint group-hover:text-fg" />}
            </div>
            <p className="mt-4 text-[15px] font-medium text-fg">{a.name}</p>
            <p className="text-[12.5px] text-muted">{a.genre} · {a.base}</p>
            <div className="mt-4 flex justify-between border-t border-line pt-3 text-[12px]">
              <span className="text-muted">Draw <span className="font-mono text-fg-2">{a.draw}</span></span>
              <span className="text-fg-2">{a.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
