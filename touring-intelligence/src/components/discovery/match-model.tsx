import { FACTORS } from "@/lib/match";
import { AIBadge, SimulatedNote } from "../ui/ai";

export function MatchModelCard() {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <AIBadge label="Match model" />
      <h3 className="mt-3 text-[13px] font-medium text-fg">How the match score works</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-muted">
        Every venue is scored against NØCTURNE on five weighted signals, not keywords.
      </p>
      <ul className="mt-4 space-y-3">
        {FACTORS.map((f) => (
          <li key={f.key}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-fg-2">{f.label}</span>
              <span className="tabular font-mono text-[11px] text-muted">{Math.round(f.weight * 100)}%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-fg-2/50" style={{ width: `${f.weight * 400}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <SimulatedNote className="mt-4">Weights and scores are illustrative prototype values.</SimulatedNote>
    </div>
  );
}
