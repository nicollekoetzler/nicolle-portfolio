"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { markets } from "@/lib/data/artist";
import { AIMark } from "../ui/ai";
import { Meter } from "../ui/score";

export function MarketTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full min-w-[760px] text-left text-[13px]">
        <thead>
          <tr className="border-b border-line">
            {["Market", "Interest index", "Audience overlap", "Fitting venues", "12-month trend", "Signal", ""].map((h) => (
              <th key={h} className="label px-5 py-3 font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => {
            const growth = Math.round(((m.trend.at(-1)! - m.trend[0]) / m.trend[0]) * 100);
            return (
              <tr key={m.city} className="group border-b border-line/60 transition-colors last:border-0 hover:bg-raised/50">
                <td className="px-5 py-3.5">
                  <span className="text-fg">{m.city}</span>
                  <span className="ml-2 font-mono text-[11px] text-faint">{m.countryCode}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="tabular w-6 font-mono text-fg">{m.interest}</span>
                    <Meter value={m.interest} className="w-24" />
                  </div>
                </td>
                <td className="tabular px-5 py-3.5 font-mono text-fg-2">{m.overlap}%</td>
                <td className="tabular px-5 py-3.5 font-mono text-fg-2">{m.venues}</td>
                <td className="px-5 py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={m.trend.map((v, i) => ({ i, v }))}>
                          <Line type="monotone" dataKey="v" stroke="#c4ee4f" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <span className="tabular font-mono text-[11.5px] text-accent">+{growth}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[12.5px] text-fg-2">
                  <span className="inline-flex items-center gap-2"><AIMark size={8} />{m.note}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link
                    href={`/discover?q=${encodeURIComponent(`atmospheric black metal venues in ${m.city}`)}`}
                    className="inline-flex items-center gap-1 text-[12px] text-muted hover:text-accent"
                  >
                    Venues <ArrowUpRight className="size-3.5" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
