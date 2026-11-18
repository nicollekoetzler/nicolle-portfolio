"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { artist } from "@/lib/data/artist";
import type { Venue } from "@/lib/types";
import { useAppState } from "../providers/app-state";
import { SimulatedNote } from "../ui/ai";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { ContactPill } from "../ui/pill";

export function ContactDialog({
  open,
  onClose,
  venue,
  draft,
}: {
  open: boolean;
  onClose: () => void;
  venue: Venue;
  draft: { subject: string; body: string } | null;
}) {
  const { setPitch, notify } = useAppState();
  const b = venue.buyer;
  const fallback = {
    subject: `${artist.name} · ${venue.city} date, autumn 2027`,
    body: `Hi ${b.name.split(" ")[0]},\n\nI manage ${artist.name}, an atmospheric black metal band from Berlin. We're routing ${artist.tour.window} and would love to talk about a date at ${venue.name}.\n\nWould you be open to a quick look at our EPK?\n\nBest,\n${artist.manager}`,
  };
  const [subject, setSubject] = useState((draft ?? fallback).subject);
  const [body, setBody] = useState((draft ?? fallback).body);
  const [sending, setSending] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Contact ${b.name}`}
      eyebrow={<span className="label">Talent buyer · {venue.name}</span>}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            size="sm"
            disabled={sending}
            onClick={() => {
              setSending(true);
              setTimeout(() => {
                setSending(false);
                setPitch(venue.id, "sent");
                notify({
                  title: `Pitch marked as sent to ${b.name}`,
                  body: "Prototype only: no email was actually sent. Follow-up reminder set for 7 days.",
                  tone: "success",
                });
                onClose();
              }, 900);
            }}
          >
            <Send className="size-3.5" /> {sending ? "Sending…" : "Send pitch"}
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-bg/50 px-3.5 py-3">
        <div className="min-w-0">
          <p className="text-[13px] text-fg">{b.name} <span className="text-muted">· {b.role}</span></p>
          <p className="font-mono text-[12px] text-fg-2">{b.email}</p>
        </div>
        <ContactPill status={b.status} />
      </div>
      <label className="mt-4 block">
        <span className="label">Subject</span>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5 h-9 w-full rounded-md border border-line bg-bg px-3 text-[13px] text-fg focus:border-accent/40 focus:outline-none"
        />
      </label>
      <label className="mt-4 block">
        <span className="label">Message</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          className="mt-1.5 w-full resize-y rounded-md border border-line bg-bg px-3.5 py-3 text-[13px] leading-relaxed text-fg focus:border-accent/40 focus:outline-none"
        />
      </label>
      <p className="mt-2 text-[12px] text-muted">{b.responseTime}. Attachments: EPK, live footage, rider.</p>
      <SimulatedNote className="mt-1">Prototype: sending is simulated and nothing leaves this page.</SimulatedNote>
    </Dialog>
  );
}
