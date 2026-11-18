"use client";

import { Check, X } from "lucide-react";
import { useAppState } from "../providers/app-state";
import { AIMark } from "./ai";

export function Toaster() {
  const { toasts, dismiss } = useAppState();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[min(360px,calc(100vw-2.5rem))] flex-col gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex animate-fade-up items-start gap-3 rounded-lg border border-line-strong bg-raised/95 px-4 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur"
        >
          <span className="mt-0.5 grid size-4 shrink-0 place-items-center">
            {t.tone === "ai" ? <AIMark size={11} /> : t.tone === "success" ? <Check className="size-3.5 text-accent" /> : <span className="size-1.5 rounded-full bg-fg-2" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-fg">{t.title}</p>
            {t.body && <p className="mt-0.5 text-[12px] leading-snug text-fg-2">{t.body}</p>}
          </div>
          <button onClick={() => dismiss(t.id)} className="text-muted hover:text-fg" aria-label="Dismiss">
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
