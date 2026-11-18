import { cn } from "@/lib/cn";

export function ScoreRing({
  value,
  size = 44,
  stroke = 3,
  className,
  label = true,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  label?: boolean;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tone = value >= 84 ? "text-accent" : value >= 76 ? "text-[#a7b98a]" : "text-muted";
  return (
    <div className={cn("relative inline-grid shrink-0 place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-line-strong" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className={cn(tone, "transition-[stroke-dashoffset] duration-700 ease-out")}
        />
      </svg>
      {children && <span className="absolute inset-0 grid place-items-center">{children}</span>}
      {label && !children && (
        <span
          className="tabular absolute font-mono font-medium text-fg"
          style={{ fontSize: Math.max(10, size * 0.27) }}
          aria-label={`${value}% match`}
        >
          {value}
        </span>
      )}
    </div>
  );
}

export function Meter({ value, className, tone = "accent" }: { value: number; className?: string; tone?: "accent" | "neutral" }) {
  return (
    <div className={cn("h-1 w-full overflow-hidden rounded-full bg-line", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", tone === "accent" ? "bg-accent" : "bg-fg-2/60")}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
