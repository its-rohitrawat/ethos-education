"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import type { ServiceInterest } from "@/lib/leads/options";
import { ConsultationDrawer } from "./ConsultationDrawer";

type OpenOptions = { source: string; service?: ServiceInterest };
type Ctx = { open: (o: OpenOptions) => void; close: () => void; isOpen: boolean };

const ConsultationContext = createContext<Ctx | null>(null);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; options: OpenOptions }>({ open: false, options: { source: "unknown" } });

  const open = useCallback((options: OpenOptions) => {
    track("consultation_open", { source: options.source, service: options.service });
    setState({ open: true, options });
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  // Every consultation CTA is a plain <a data-consult> link (see ConsultationButton). One delegated
  // listener opens the drawer, so the buttons themselves need no JavaScript.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-consult]");
      if (!link) return;
      e.preventDefault();
      document.querySelectorAll<HTMLDialogElement>("dialog[open][data-close-on-consult]").forEach((d) => d.close());
      const source = link.dataset.consult || "unknown";
      const service = (link.dataset.service || undefined) as ServiceInterest | undefined;
      track("cta_click", { source, service, label: link.dataset.label });
      open({ source, service });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const value = useMemo(() => ({ open, close, isOpen: state.open }), [open, close, state.open]);

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationDrawer open={state.open} options={state.options} onClose={close} />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) throw new Error("useConsultation must be used inside <ConsultationProvider>");
  return ctx;
}
