"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { artist } from "@/lib/data/artist";
import { useAppState } from "../providers/app-state";
import { AIMark } from "../ui/ai";
import { NAV } from "./nav";

export function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid size-6 place-items-center rounded-[4px] border border-line-strong bg-raised">
        <AIMark size={11} />
      </span>
      <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-fg">
        Touring<span className="text-muted">/</span>Intelligence
      </span>
    </Link>
  );
}

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/discover") return pathname.startsWith("/discover") || pathname.startsWith("/venues");
  return pathname.startsWith(href);
}

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { saved } = useAppState();
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Main">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;
        if (item.soon) {
          return (
            <div
              key={item.href}
              className="flex h-8 cursor-not-allowed items-center gap-2.5 rounded-md px-2.5 text-[13px] text-faint"
              title="Tour Planner is coming soon"
            >
              <Icon className="size-[15px]" strokeWidth={1.75} />
              <span className="flex-1">{item.label}</span>
              <span className="rounded-sm border border-line px-1 py-px font-mono text-[9px] uppercase tracking-wider">Soon</span>
            </div>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex h-8 items-center gap-2.5 rounded-md px-2.5 text-[13px] transition-colors",
              active ? "bg-hover text-fg" : "text-fg-2 hover:bg-hover/60 hover:text-fg",
              item.primary && !active && "text-fg",
            )}
          >
            {active && <span className="absolute -left-3 top-1.5 bottom-1.5 w-[2px] rounded-full bg-accent" aria-hidden />}
            <Icon className={cn("size-[15px]", item.primary ? "text-accent" : active ? "text-fg" : "text-muted group-hover:text-fg-2")} strokeWidth={1.75} />
            <span className="flex-1">{item.label}</span>
            {item.primary && (
              <span className="inline-flex items-center gap-1 rounded-sm bg-accent/10 px-1 py-px font-mono text-[9px] uppercase tracking-wider text-accent">
                <AIMark size={7} /> AI
              </span>
            )}
            {item.countKey === "saved" && saved.length > 0 && (
              <span className="tabular font-mono text-[11px] text-muted">{saved.length}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function ArtistSwitcher() {
  return (
    <button className="flex w-full items-center gap-3 rounded-md border border-line bg-raised/60 px-2.5 py-2 text-left transition-colors hover:border-line-strong">
      <span className="grid size-7 place-items-center rounded-[4px] bg-fg text-[11px] font-bold tracking-tight text-bg">NØ</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-medium text-fg">{artist.name}</span>
        <span className="block truncate text-[11px] text-muted">{artist.genre}</span>
      </span>
      <ChevronsUpDown className="size-3.5 text-muted" />
    </button>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-line bg-bg px-3 py-4 lg:flex">
      <div className="px-2.5 pb-5">
        <Wordmark />
      </div>
      <div className="px-0.5 pb-5">
        <ArtistSwitcher />
      </div>
      <div className="label px-2.5 pb-2">Workspace</div>
      <div className="pl-0.5">
        <NavList />
      </div>
      <div className="mt-auto space-y-3 px-2.5">
        <div className="rounded-md border border-line bg-surface p-3">
          <div className="flex items-center gap-2 text-[12px] font-medium text-fg">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
            Prototype
          </div>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
            All venues, contacts and scores are fictional and simulated. No live booking data.
          </p>
        </div>
        <div className="flex items-center gap-2.5 pt-1">
          <span className="grid size-6 place-items-center rounded-full bg-raised text-[10px] font-medium text-fg-2">L</span>
          <span className="text-[12px] text-fg-2">{artist.manager} · Tour manager</span>
        </div>
      </div>
    </aside>
  );
}
