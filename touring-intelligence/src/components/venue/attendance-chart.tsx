"use client";

import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Venue } from "@/lib/types";

export function AttendanceChart({ venue }: { venue: Venue }) {
  const data = [...venue.events].reverse().map((e) => ({ label: e.date.replace(" 20", " ’"), ...e }));
  return (
    <div className="mt-4 h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barCategoryGap="28%">
          <CartesianGrid vertical={false} stroke="#1f1f23" />
          <XAxis dataKey="label" tickLine={false} axisLine={{ stroke: "#2e2e33" }} tick={{ fill: "#7d7c78", fontSize: 11 }} />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, Math.ceil((venue.capacity * 1.1) / 50) * 50]}
            tick={{ fill: "#55554f", fontSize: 10.5, fontFamily: "var(--font-geist-mono)" }}
          />
          <ReferenceLine y={venue.capacity} stroke="#ecebe6" strokeOpacity={0.35} strokeDasharray="3 4" />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload as (typeof data)[number];
              return (
                <div className="rounded-md border border-line-strong bg-raised px-3 py-2 shadow-xl">
                  <p className="text-[12px] font-medium text-fg">{p.headliner}</p>
                  <p className="text-[11px] text-muted">{p.date} · {p.format}</p>
                  <p className="tabular mt-1 font-mono text-[11.5px] text-fg-2">
                    {p.attendance} / {venue.capacity} · {Math.round((p.attendance / venue.capacity) * 100)}% full
                  </p>
                </div>
              );
            }}
          />
          <Bar dataKey="attendance" fill="#8fb03a" radius={[4, 4, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
