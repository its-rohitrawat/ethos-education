"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import type { ServiceInterest } from "@/lib/leads/options";

// The form's code is fetched the first time the drawer opens, not with every page.
const ConsultationForm = dynamic(() => import("./ConsultationForm").then((m) => m.ConsultationForm), {
  ssr: false,
  loading: () => <p className="t-label py-10 text-ink-soft">Loading…</p>,
});

/**
 * Modal drawer built on the native <dialog> element: focus is trapped and restored, Escape closes it,
 * and the page behind becomes inert — no custom focus-trap code to get wrong.
 */
export function ConsultationDrawer({
  open,
  options,
  onClose,
}: {
  open: boolean;
  options: { source: string; service?: ServiceInterest };
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onDialogClose = () => {
      document.documentElement.style.overflow = "";
      onClose();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => dialog.removeEventListener("close", onDialogClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="consultation-title"
      className="consultation-drawer m-0 ml-auto h-dvh max-h-none w-full max-w-none bg-mist p-0 text-ink backdrop:bg-night/60 sm:w-[min(36rem,100vw)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-mist/95 px-6 py-4 backdrop-blur-sm sm:px-10">
          <p className="t-label text-ink-soft">Consultation request</p>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-canvas"
            aria-label="Close consultation form"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>
        <div className="flex-1 px-6 pb-12 pt-8 sm:px-10">
          {open ? <ConsultationForm key={`${options.source}-${options.service ?? ""}`} source={options.source} defaultService={options.service} titleId="consultation-title" /> : null}
        </div>
      </div>
    </dialog>
  );
}
