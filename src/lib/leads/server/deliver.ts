import "server-only";
import { allSinks, devFileSink, type LeadSink } from "./sinks";
import type { LeadRecord } from "./validate";

export type DeliveryResult = { delivered: boolean; sinks: { name: string; ok: boolean }[] };

export class NoDeliveryConfiguredError extends Error {
  constructor() {
    super("No lead destination is configured (CRM_PROVIDER / RESEND_API_KEY).");
  }
}

/**
 * Sends a lead to every configured destination in parallel. A lead counts as delivered when at
 * least one destination accepted it. The attempt is logged BEFORE any external call (no personal
 * data in logs — only the submission ID and destination names), so a crash mid-flight leaves a trace.
 */
export async function deliverLead(id: string, lead: LeadRecord): Promise<DeliveryResult> {
  const configured: LeadSink[] = allSinks.filter((s) => s.enabled());
  const sinks = configured.length ? configured : devFileSink.enabled() ? [devFileSink] : [];
  if (!sinks.length) throw new NoDeliveryConfiguredError();

  console.info(`[lead] attempt id=${id} sinks=${sinks.map((s) => s.name).join(",")}`);
  const settled = await Promise.allSettled(sinks.map((s) => s.send(lead)));
  const results = settled.map((r, i) => ({ name: sinks[i].name, ok: r.status === "fulfilled" }));
  settled.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] sink=${sinks[i].name} id=${id} failed: ${r.reason instanceof Error ? r.reason.message : "unknown"}`);
  });
  const delivered = results.some((r) => r.ok);
  console.info(`[lead] result id=${id} delivered=${delivered} ${results.map((r) => `${r.name}:${r.ok ? "ok" : "fail"}`).join(" ")}`);
  return { delivered, sinks: results };
}
