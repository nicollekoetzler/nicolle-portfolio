"use client";

import { Check, Copy, Mail, PenLine } from "lucide-react";
import { useState } from "react";
import type { Venue } from "@/lib/types";
import { useAppState } from "../providers/app-state";
import { Button } from "../ui/button";
import { ContactPill } from "../ui/pill";

export function BookingContact({ venue, onPitch, onContact }: { venue: Venue; onPitch: () => void; onContact: () => void }) {
  const { pitches, notify } = useAppState();
  const [copied, setCopied] = useState(false);
  const b = venue.buyer;
  const pitch = pitches[venue.id];
  const initials = b.name.split(" ").map((p) => p[0]).join("");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(b.email);
    } catch {
      /* clipboard may be unavailable; feedback still shown */
    }
    setCopied(true);
    notify({ title: "Email copied", body: b.email });
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="rounded-lg border border-line bg-surface">
      <header className="border-b border-line px-4 py-3.5">
        <div className="label">Booking contact</div>
      </header>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-line-strong bg-raised text-[13px] font-medium text-fg">{initials}</span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium text-fg">{b.name}</p>
            <p className="truncate text-[12px] text-muted">{b.role} · {venue.name}</p>
          </div>
        </div>
        <button
          onClick={copy}
          className="mt-4 flex w-full items-center justify-between gap-2 rounded-md border border-line bg-bg/50 px-3 py-2 text-left font-mono text-[12px] text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
          aria-label={`Copy ${b.email}`}
        >
          <span className="truncate">{b.email}</span>
          {copied ? <Check className="size-3.5 shrink-0 text-accent" /> : <Copy className="size-3.5 shrink-0 text-muted" />}
        </button>
        <dl className="mt-4 space-y-2.5 text-[12px]">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Status</dt>
            <dd><ContactPill status={b.status} /></dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Last verified</dt>
            <dd className="font-mono text-fg-2">{b.lastVerified}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Response</dt>
            <dd className="text-right text-fg-2">{b.responseTime}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted">Your outreach</dt>
            <dd className="text-fg-2">
              {pitch === "sent" ? (
                <span className="inline-flex items-center gap-1.5 text-accent"><Check className="size-3" />Pitch sent today</span>
              ) : pitch === "drafted" ? (
                "Pitch drafted"
              ) : (
                <span className="text-faint">No contact yet</span>
              )}
            </dd>
          </div>
        </dl>
        <div className="mt-5 grid gap-2">
          <Button variant="outline-accent" onClick={onPitch}>
            <PenLine className="size-3.5" /> Prepare booking pitch
          </Button>
          <Button onClick={onContact}>
            <Mail className="size-3.5" /> {pitch === "sent" ? "Follow up" : "Contact talent buyer"}
          </Button>
        </div>
      </div>
    </section>
  );
}
