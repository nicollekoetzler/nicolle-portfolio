"use client";

import { useEffect, useState } from "react";

/** Small icon button that copies `text` to the clipboard and briefly confirms with a check mark */
export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard API unavailable or blocked: fall back to a hidden textarea + execCommand
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      if (ok) setCopied(true);
    }
  };

  return (
    <button type="button" className={copied ? "v2-copy is-copied" : "v2-copy"} onClick={copy} aria-label={copied ? "Copied" : label}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {copied ? (
          <path d="m3.5 8.5 3 3 6-7" />
        ) : (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
          </>
        )}
      </svg>
      <span className="v2-copy__tip" aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
