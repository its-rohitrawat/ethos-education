"use client";

import { useSearchString } from "@/lib/hooks";
import { services, type ServiceInterest } from "@/lib/leads/options";
import { ConsultationForm } from "./ConsultationForm";

/**
 * Inline form for /book-consultation/ and /contact/. Reads an optional ?service= preselection in the
 * browser, so the page itself stays fully static.
 */
export function BookingForm({ source = "booking-page" }: { source?: string }) {
  const param = new URLSearchParams(useSearchString()).get("service");
  const service = param && services.some((s) => s.value === param) ? (param as ServiceInterest) : undefined;
  return <ConsultationForm key={service ?? "none"} source={source} defaultService={service} heading="Tell us a little about you." />;
}
