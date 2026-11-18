"use client";

import { ArrowUp, CornerDownLeft, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { SUGGESTED_PROMPTS } from "@/lib/search";
import type { Interpretation } from "@/lib/search";
import { AIMark } from "../ui/ai";

export const THINKING_STEPS = [
  "Interpreting your request",
  "Scanning 1,284 venues across 6 countries",
  "Comparing programming history with NØCTURNE's sound",
  "Weighing room sizes against your draw",
  "Ranking by overall fit",
];

export function SearchBox({
  value,
  onChange,
  onSubmit,
  status,
  step,
  interpretation,
  onReset,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v?: string) => void;
  status: "idle" | "thinking" | "done";
  step: number;
  interpretation: Interpretation[] | null;
  onReset: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const thinking = status === "thinking";

  return (
    <div className="relative">
      <div
        className={cn(
          "relative rounded-lg border bg-surface transition-colors",
          thinking ? "border-accent/40" : "border-line-strong focus-within:border-accent/40",
        )}
      >
        <div className="flex items-start gap-3 px-4 pt-4 sm:px-5">
          <AIMark size={13} className={cn("mt-[5px]", thinking && "animate-pulse-dot")} />
          <label htmlFor="ai-prompt" className="sr-only">Describe the venues you are looking for</label>
          <textarea
            id="ai-prompt"
            ref={ref}
            rows={1}
            value={value}
            disabled={thinking}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Describe the venues you're looking for…"
            className="min-h-[28px] flex-1 resize-none bg-transparent text-[15.5px] leading-relaxed text-fg placeholder:text-faint focus:outline-none disabled:opacity-70 sm:text-[16.5px]"
          />
        </div>
        <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 font-mono text-[10.5px] text-faint">
            <span className="hidden sm:inline">Searching as</span>
            <span className="rounded-sm border border-line px-1.5 py-0.5 text-fg-2">NØCTURNE</span>
            <span className="hidden truncate md:inline">· profile, draw and peer acts included automatically</span>
          </div>
          <div className="flex items-center gap-2">
            {status === "done" && (
              <button onClick={onReset} className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[12px] text-muted hover:bg-hover hover:text-fg">
                <RotateCcw className="size-3.5" /> Reset
              </button>
            )}
            <span className="hidden items-center gap-1 font-mono text-[10.5px] text-faint sm:inline-flex">
              <CornerDownLeft className="size-3" /> to run
            </span>
            <button
              onClick={() => onSubmit()}
              disabled={thinking || !value.trim()}
              className="grid size-8 place-items-center rounded-md bg-accent text-accent-ink transition-colors hover:bg-[#d3f86a] disabled:opacity-40"
              aria-label="Run AI discovery"
            >
              <ArrowUp className="size-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>
        {thinking && (
          <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
            <div className="h-full w-1/3 animate-[shimmer_1.2s_linear_infinite] bg-gradient-to-r from-transparent via-accent to-transparent" style={{ backgroundSize: "100% 100%" }} />
          </div>
        )}
      </div>

      <div className="mt-3 min-h-[30px]">
        {thinking ? (
          <ol className="flex flex-wrap items-center gap-x-4 gap-y-1.5" aria-live="polite">
            {THINKING_STEPS.map((s, i) => (
              <li
                key={s}
                className={cn(
                  "flex items-center gap-2 font-mono text-[11px] transition-opacity",
                  i < step ? "text-fg-2" : i === step ? "opacity-100" : "opacity-25 text-faint",
                )}
              >
                <span className={cn("size-1.5 rounded-full", i < step ? "bg-accent" : i === step ? "animate-pulse-dot bg-accent" : "bg-faint")} />
                <span className={i === step ? "shimmer-text" : undefined}>{s}</span>
              </li>
            ))}
          </ol>
        ) : interpretation ? (
          <div className="flex flex-wrap items-center gap-2 animate-fade-up">
            <span className="label mr-1">Understood as</span>
            {interpretation.map((i) => (
              <span key={i.label} className="inline-flex h-7 items-center gap-1.5 rounded-md border border-accent/20 bg-accent/[0.05] px-2.5 text-[12px]">
                <span className="text-muted">{i.label}</span>
                <span className="text-fg">{i.value}</span>
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="label mr-1">Try</span>
            {SUGGESTED_PROMPTS.slice(1).map((p) => (
              <button
                key={p}
                onClick={() => {
                  onChange(p);
                  onSubmit(p);
                }}
                className="min-h-7 rounded-md border border-line px-2.5 py-1 text-left text-[12px] text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
