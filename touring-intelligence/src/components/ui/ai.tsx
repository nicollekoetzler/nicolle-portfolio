import { cn } from "@/lib/cn";

/** Small four-point glyph that marks anything machine-generated. */
export function AIMark({ className, size = 10 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden className={cn("shrink-0 text-accent", className)}>
      <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" fill="currentColor" />
    </svg>
  );
}

export function AIBadge({ label = "AI insight", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-accent/20 bg-accent/[0.06] px-1.5 py-[3px] font-mono text-[10px] uppercase tracking-[0.08em] text-accent",
        className,
      )}
    >
      <AIMark size={8} />
      {label}
    </span>
  );
}

export function SimulatedNote({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <p className={cn("font-mono text-[10.5px] leading-relaxed text-faint", className)}>
      {children ?? "Simulated prototype data. Not a real prediction or live booking data."}
    </p>
  );
}
