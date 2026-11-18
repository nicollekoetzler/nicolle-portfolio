"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Dialog({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  eyebrow?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" onClick={onClose} aria-label="Close dialog" />
      <div
        className={cn(
          "relative flex max-h-[92vh] w-full animate-fade-up flex-col overflow-hidden rounded-t-lg border border-line-strong bg-surface shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)] sm:max-w-2xl sm:rounded-lg",
          className,
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
          <div>
            {eyebrow && <div className="mb-1.5">{eyebrow}</div>}
            <h2 className="text-[15px] font-medium text-fg">{title}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted hover:bg-hover hover:text-fg" aria-label="Close">
            <X className="size-4" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-line px-6 py-4">{footer}</footer>}
      </div>
    </div>
  );
}
