"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { markets } from "@/lib/data/artist";
import { Chip } from "../ui/pill";
import { SimulatedNote } from "../ui/ai";

type Mode = "interest" | "overlap";

export function AudienceInterestChart() {
  const [mode, setMode] = useState<Mode>("interest");
  const data = markets.map((m) => ({ city: m.city, value: m[mode], country: m.country }));
  const max = Math.max(...data.map((d) => d.value));

  return (
    <section className="flex flex-col rounded-lg border border-line bg-surface">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <div className="label">Touring analytics</div>
          <h2 className="mt-1.5 text-[14px] font-medium text-fg">
            {mode === "interest" ? "Estimated audience interest by city" : "Audience overlap by city"}
          </h2>
        </div>
        <div className="flex gap-1.5" role="tablist">
          <Chip active={mode === "interest"} onClick={() => setMode("interest")}>Interest index</Chip>
          <Chip active={mode === "overlap"} onClick={() => setMode("overlap")}>Overlap %</Chip>
        </div>
      </header>
      <div className="h-[300px] px-2 pt-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 12, left: -18, bottom: 0 }} barCategoryGap="22%">
            <CartesianGrid vertical={false} stroke="#1f1f23" />
            <XAxis
              dataKey="city"
              tickLine={false}
              axisLine={{ stroke: "#2e2e33" }}
              tick={{ fill: "#7d7c78", fontSize: 11 }}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={52}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#55554f", fontSize: 10.5, fontFamily: "var(--font-geist-mono)" }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0].payload as (typeof data)[number];
                return (
                  <div className="rounded-md border border-line-strong bg-raised px-3 py-2 shadow-xl">
                    <p className="text-[12px] font-medium text-fg">{p.city}<span className="text-muted">, {p.country}</span></p>
                    <p className="tabular mt-0.5 font-mono text-[11.5px] text-fg-2">
                      {mode === "interest" ? `Interest index ${p.value}` : `${p.value}% overlap`}
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={30} isAnimationActive animationDuration={600}>
              {data.map((d) => (
                <Cell key={d.city} fill={d.value === max ? "#c4ee4f" : "#4f5a35"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="border-t border-line px-5 py-3">
        <SimulatedNote>Index 0–100 combining simulated listener density, peer-act attendance and venue supply.</SimulatedNote>
      </div>
    </section>
  );
}
