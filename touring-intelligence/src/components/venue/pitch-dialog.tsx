"use client";

import { Check, Copy, RefreshCw, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { pitchFor, type PitchTone } from "@/lib/pitch";
import type { Venue } from "@/lib/types";
import { useAppState } from "../providers/app-state";
import { AIBadge, AIMark, SimulatedNote } from "../ui/ai";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";

const TONES: { id: PitchTone; label: string; hint: string }[] = [
  { id: "concise", label: "Concise", hint: "Under a minute to read" },
  { id: "data", label: "Data-led", hint: "Numbers first" },
  { id: "warm", label: "Personal", hint: "Relationship tone" },
];

export function PitchDialog({
  open,
  onClose,
  venue,
  onUse,
}: {
  open: boolean;
  onClose: () => void;
  venue: Venue;
  onUse: (p: { subject: string; body: string }) => void;
}) {
  const { setPitch, notify } = useAppState();
  const [tone, setTone] = useState<PitchTone>("concise");
  const [text, setText] = useState("");
  const [generating, setGenerating] = useState(true);
  const [nonce, setNonce] = useState(0);
  const [copied, setCopied] = useState(false);
  const subject = pitchFor(venue, tone).subject;

  // Streams the draft in, like a model response. Only the interval callback sets state.
  useEffect(() => {
    const full = pitchFor(venue, tone).body;
    let i = 0;
    const id = setInterval(() => {
      i += 9;
      setText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setGenerating(false);
      }
    }, 16);
    return () => clearInterval(id);
  }, [venue, tone, nonce]);

  const generate = (t: PitchTone) => {
    setText("");
    setGenerating(true);
    setTone(t);
    setNonce((n) => n + 1);
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readSec = Math.round((words / 230) * 60);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      eyebrow={<AIBadge label="Pitch assistant" />}
      title={`Booking pitch for ${venue.name}`}
      footer={
        <>
          <span className="mr-auto hidden font-mono text-[10.5px] text-faint sm:inline">
            {words} words · ~{readSec}s read
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={generating}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`${subject}\n\n${text}`);
              } catch {}
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />} Copy
          </Button>
          <Button
            size="sm"
            disabled={generating}
            onClick={() => {
              setPitch(venue.id, "drafted");
              notify({ title: "Pitch draft saved", body: `Saved to ${venue.name}'s opportunity.`, tone: "success" });
              onClose();
            }}
          >
            Save draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={generating}
            onClick={() => {
              setPitch(venue.id, "drafted");
              onUse({ subject, body: text });
            }}
          >
            <Send className="size-3.5" /> Use in email
          </Button>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {TONES.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              generate(t.id);
            }}
            className={cn(
              "rounded-md border px-3 py-2.5 text-left transition-colors",
              tone === t.id ? "border-accent/40 bg-accent/[0.06]" : "border-line hover:border-line-strong",
            )}
          >
            <span className="block text-[13px] text-fg">{t.label}</span>
            <span className="block text-[11.5px] text-muted">{t.hint}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-line bg-bg/50 p-3">
        <div className="flex items-center gap-2 text-[11.5px] text-muted">
          <AIMark size={8} />
          Built from: NØCTURNE profile, {venue.name}&apos;s booking history, peer acts ({venue.similarArtists.slice(0, 2).join(", ")}), buyer preferences.
        </div>
      </div>

      <div className="mt-4">
        <div className="label">Subject</div>
        <p className="mt-1.5 text-[13px] text-fg">{subject}</p>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="label">Message</span>
          <button
            onClick={() => generate(tone)}
            disabled={generating}
            className="inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-fg disabled:opacity-40"
          >
            <RefreshCw className={cn("size-3", generating && "animate-spin")} /> Regenerate
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          readOnly={generating}
          rows={14}
          className="mt-2 w-full resize-y rounded-md border border-line bg-bg px-3.5 py-3 text-[13px] leading-relaxed text-fg focus:border-accent/40 focus:outline-none"
        />
      </div>
      <SimulatedNote className="mt-2">Draft generated locally from mock data. Review before sending.</SimulatedNote>
    </Dialog>
  );
}
