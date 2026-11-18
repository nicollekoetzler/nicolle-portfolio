import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { insights, markets } from "@/lib/data/artist";
import { AIBadge, AIMark, SimulatedNote } from "../ui/ai";

function Column({ title, children, hint }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col bg-surface p-5">
      <div className="label">{title}</div>
      <p className="mt-1 text-[11.5px] text-faint">{hint}</p>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
}

const q = (s: string) => `/discover?q=${encodeURIComponent(s)}`;

export function TouringIntelligence() {
  const overlap = [...markets].sort((a, b) => b.overlap - a.overlap).slice(0, 5);
  return (
    <section className="relative overflow-hidden rounded-lg border border-line bg-surface">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />
      <header className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <AIBadge label="Touring intelligence" />
          <h2 className="text-[14px] font-medium text-fg">Where NØCTURNE should play this autumn</h2>
        </div>
        <SimulatedNote>Generated from simulated listener and booking signals · Updated today</SimulatedNote>
      </header>
      <div className="grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
        <Column title="Top recommended markets" hint="Highest combined fit and demand">
          <ol className="space-y-3.5">
            {insights.topMarkets.map((m, i) => (
              <li key={m.city}>
                <Link href={q(`atmospheric black metal venues in ${m.city}`)} className="group flex gap-3">
                  <span className="tabular w-4 pt-px font-mono text-[11px] text-faint">0{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[13.5px] font-medium text-fg group-hover:text-accent">{m.city}</span>
                      <span className="tabular font-mono text-[12px] text-accent">{m.score}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-snug text-muted">{m.why}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Column>
        <Column title="Audience overlap" hint="Share of local metal listeners in your sound cluster">
          <ul className="space-y-2.5">
            {overlap.map((m) => (
              <li key={m.city} className="grid grid-cols-[72px_1fr_34px] items-center gap-3">
                <span className="truncate text-[12.5px] text-fg-2">{m.city}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-accent/70" style={{ width: `${m.overlap}%` }} />
                </div>
                <span className="tabular text-right font-mono text-[11.5px] text-fg-2">{m.overlap}%</span>
              </li>
            ))}
          </ul>
        </Column>
        <Column title="Emerging opportunities" hint="Fast-moving signals worth acting on">
          <ul className="space-y-3.5">
            {insights.emerging.map((e) => (
              <li key={e.city} className="rounded-md border border-line bg-bg/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-fg">{e.city}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-accent">
                    <TrendingUp className="size-3" />
                    {e.delta}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-muted">{e.why}</p>
              </li>
            ))}
          </ul>
        </Column>
        <Column title="Suggested to explore" hint="Markets you haven't considered yet">
          <ul className="space-y-1">
            {insights.explore.map((e) => (
              <li key={e.city}>
                <Link href={q(`venues in ${e.city}`)} className="group -mx-2 flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-hover">
                  <AIMark size={9} className="mt-1 opacity-70" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[13px] font-medium text-fg">{e.city}</span>
                    <p className="text-[12px] leading-snug text-muted">{e.why}</p>
                  </div>
                  <ArrowRight className="mt-1 size-3.5 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </Column>
      </div>
    </section>
  );
}
