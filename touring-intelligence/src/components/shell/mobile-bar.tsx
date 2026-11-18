"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ArtistSwitcher, NavList, Wordmark } from "./sidebar";

export function MobileBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-bg/90 px-4 backdrop-blur lg:hidden">
        <Wordmark />
        <button onClick={() => setOpen(true)} className="rounded-md p-2 text-fg-2 hover:bg-hover" aria-label="Open navigation">
          <Menu className="size-4" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} aria-label="Close navigation" />
          <div className="absolute inset-y-0 left-0 flex w-[280px] animate-fade-up flex-col gap-5 border-r border-line bg-bg px-4 py-4">
            <div className="flex items-center justify-between">
              <Wordmark />
              <button onClick={() => setOpen(false)} className="rounded-md p-1.5 text-muted hover:bg-hover" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
            <ArtistSwitcher />
            <div className="pl-3">
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
