import { cn } from "@/lib/cn";
import type { Availability, ContactStatus } from "@/lib/types";
import type { ReactNode } from "react";

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-line bg-raised px-1.5 py-[3px] text-[11px] leading-none text-fg-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

const dot = (c: string) => <span className={cn("size-1.5 rounded-full", c)} aria-hidden />;

export function ContactPill({ status }: { status: ContactStatus }) {
  const map: Record<ContactStatus, string> = {
    Verified: "bg-accent",
    Responsive: "bg-[#8fc7a6]",
    "On request": "bg-warn",
    Unverified: "bg-faint",
  };
  const text: Record<ContactStatus, string> = {
    Verified: "Contact verified",
    Responsive: "Responsive contact",
    "On request": "Contact on request",
    Unverified: "Unverified contact",
  };
  return (
    <Pill>
      {dot(map[status])}
      {text[status]}
    </Pill>
  );
}

export function AvailabilityPill({ value }: { value: Availability }) {
  const map: Record<Availability, string> = {
    "Open dates": "bg-accent",
    "Limited dates": "bg-warn",
    "Fully booked": "bg-danger",
  };
  return (
    <Pill>
      {dot(map[value])}
      {value}
    </Pill>
  );
}

export function Chip({
  active,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-[12px] transition-colors",
        active
          ? "border-accent/40 bg-accent/[0.08] text-fg"
          : "border-line bg-transparent text-fg-2 hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      {children}
    </button>
  );
}
