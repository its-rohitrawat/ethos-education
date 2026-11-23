import type { ReactNode } from "react";
import type { EventName } from "@/lib/analytics";

/**
 * Plain anchor (tel:, mailto:, WhatsApp, external) whose click is recorded by the delegated listener in
 * <Analytics />. Renders plain HTML — no hydration cost.
 */
export function TrackedLink({
  href,
  event,
  source,
  external = false,
  className = "",
  children,
  ariaLabel,
}: {
  href: string;
  event: EventName;
  source: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      data-track={event}
      data-track-source={source}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
