"use client";

import { useSyncExternalStore } from "react";
import { getConsent } from "./analytics";

const noopSubscribe = () => () => {};

/** true in the browser after hydration, false during server rendering — without a setState-in-effect. */
export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/** Current URL query string (browser only; empty during server rendering). */
export function useSearchString() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb);
      return () => window.removeEventListener("popstate", cb);
    },
    () => window.location.search,
    () => "",
  );
}

/** Analytics consent, kept in sync across components and tabs. */
export function useConsent() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("ethos:consent", cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener("ethos:consent", cb);
        window.removeEventListener("storage", cb);
      };
    },
    getConsent,
    () => null,
  );
}
