/**
 * Suspense fallback for dynamic routes during client-side navigation. Direct visits receive the
 * fully prerendered page (all params are generated at build time), so this is only seen briefly.
 */
export function PageShell() {
  return (
    <div className="shell pt-[calc(var(--header-h)+5rem)]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="h-3 w-40 animate-pulse rounded-full bg-cloud motion-reduce:animate-none" />
      <div className="mt-8 h-20 w-3/4 animate-pulse rounded-sm bg-cloud motion-reduce:animate-none" />
      <div className="mt-4 h-20 w-1/2 animate-pulse rounded-sm bg-cloud motion-reduce:animate-none" />
      <div className="mt-16 h-[40vh]" />
    </div>
  );
}
