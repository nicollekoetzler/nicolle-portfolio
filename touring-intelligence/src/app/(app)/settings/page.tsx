import { artist } from "@/lib/data/artist";
import { PageHeader, Panel } from "@/components/ui/panel";
import { Meter } from "@/components/ui/score";

export default function SettingsPage() {
  const p = artist.profile;
  const fields: [string, string][] = [
    ["Artist name", artist.name],
    ["Primary genre", artist.genre],
    ["Secondary genres", artist.secondaryGenres.join(", ")],
    ["Home base", artist.base],
    ["Estimated draw", artist.draw],
    ["Peer acts", artist.peers.join(", ")],
  ];
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Matching profile" description="What the platform knows about NØCTURNE. Richer profiles produce sharper matches and stronger pitches." />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="Profile">
          <dl className="divide-y divide-line">
            {fields.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                <dt className="text-[12.5px] text-muted">{k}</dt>
                <dd className="text-[13px] text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel title="Profile completeness">
          <p className="tabular text-[30px] font-semibold tracking-tight">{p.completeness}%</p>
          <Meter value={p.completeness} className="mt-2" />
          <p className="label mt-5">Missing</p>
          <ul className="mt-2 space-y-2 text-[13px] text-fg-2">
            {p.missing.map((m) => (
              <li key={m} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-warn" />{m}</li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
