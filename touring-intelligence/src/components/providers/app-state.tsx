"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export type ToastTone = "default" | "success" | "ai";

export interface Toast {
  id: number;
  title: string;
  body?: string;
  tone: ToastTone;
}

export type PitchStatus = "drafted" | "sent";

interface AppState {
  saved: string[];
  tourPlan: string[];
  pitches: Record<string, PitchStatus>;
  toasts: Toast[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string, name?: string) => void;
  addToTour: (id: string, name: string) => void;
  setPitch: (id: string, status: PitchStatus) => void;
  notify: (t: Omit<Toast, "id" | "tone"> & { tone?: ToastTone }) => void;
  dismiss: (id: number) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(["kellerhalle", "podzemi-13"]);
  const [tourPlan, setTourPlan] = useState<string[]>([]);
  const [pitches, setPitches] = useState<Record<string, PitchStatus>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const notify = useCallback<AppState["notify"]>(
    ({ tone = "default", ...rest }) => {
      const id = nextId.current++;
      setToasts((t) => [...t.slice(-2), { id, tone, ...rest }]);
      setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const toggleSaved = useCallback<AppState["toggleSaved"]>(
    (id, name) => {
      const has = saved.includes(id);
      setSaved((s) => (has ? s.filter((x) => x !== id) : s.includes(id) ? s : [...s, id]));
      notify(
        has
          ? { title: "Removed from saved", body: name }
          : { title: "Opportunity saved", body: name ? `${name} is in Saved Opportunities.` : undefined, tone: "success" },
      );
    },
    [saved, notify],
  );

  const addToTour = useCallback<AppState["addToTour"]>(
    (id, name) => {
      if (tourPlan.includes(id)) {
        notify({ title: "Already in your tour plan", body: name });
        return;
      }
      setTourPlan((p) => (p.includes(id) ? p : [...p, id]));
      notify({
        title: "Added to Autumn Tour 2027 draft",
        body: `${name} is pencilled in. Routing tools arrive with Tour Planner.`,
        tone: "success",
      });
    },
    [tourPlan, notify],
  );

  const setPitch = useCallback((id: string, status: PitchStatus) => setPitches((p) => ({ ...p, [id]: status })), []);

  const value = useMemo<AppState>(
    () => ({
      saved,
      tourPlan,
      pitches,
      toasts,
      isSaved: (id) => saved.includes(id),
      toggleSaved,
      addToTour,
      setPitch,
      notify,
      dismiss,
    }),
    [saved, tourPlan, pitches, toasts, toggleSaved, addToTour, setPitch, notify, dismiss],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
