"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { ChevronIcon } from "@/components/ui/primitives";
import type { NavGroup } from "@/content/nav";
import { site, whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

/**
 * Sticky white header in the original site's layout: logo, uppercase menu with simple dropdowns, and
 * one orange call to action. Below 1280px the menu moves into a full-screen <dialog>.
 */
export function SiteHeader({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  // Close the menu on navigation.
  useEffect(() => {
    if (menuRef.current?.open) menuRef.current.close();
  }, [pathname]);

  const openMenu = () => {
    menuRef.current?.showModal();
    setMenuOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-brand focus:px-5 focus:py-3 focus:text-canvas">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/90">
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1 font-display text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-ink">
              {groups.map((g) => (
                <li key={g.href} className={g.links ? "nav-host relative" : undefined}>
                  <Link
                    href={g.href}
                    aria-current={isActive(pathname, g.href) ? "page" : undefined}
                    className="inline-flex h-[var(--header-h)] items-center gap-1 px-2.5 transition-colors hover:text-accent-ink aria-[current=page]:text-accent-ink"
                  >
                    {g.label}
                    {g.links ? <ChevronIcon className="rotate-90 opacity-60" /> : null}
                  </Link>
                  {g.links ? (
                    <div className="nav-drop absolute left-0 top-full z-10 min-w-64 pt-1">
                      <ul className={`card p-2 normal-case tracking-normal ${g.links.length > 6 ? "grid grid-cols-2 gap-x-1 min-w-96" : ""}`}>
                        {g.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="block rounded-md px-3 py-2 font-sans text-[0.92rem] font-medium text-ink transition-colors hover:bg-mist hover:text-accent-ink">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ConsultationButton source="header" className="!min-h-10 !px-4 max-sm:!hidden">
              Book consultation
            </ConsultationButton>
            <button
              type="button"
              onClick={openMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-brand xl:hidden"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={menuRef}
        aria-label="Site menu"
        data-close-on-consult=""
        className="m-0 h-dvh max-h-none w-full max-w-none bg-canvas p-0 text-ink backdrop:bg-transparent"
        onClose={() => {
          setMenuOpen(false);
          document.documentElement.style.overflow = "";
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
            <Logo />
            <button type="button" onClick={() => menuRef.current?.close()} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-brand" aria-label="Close menu">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="shell flex-1 pb-10 pt-2">
            <ul>
              <li className="border-b border-line">
                <Link href="/" className="block py-4 font-display text-[1.05rem] font-semibold uppercase tracking-[0.05em]">
                  Home
                </Link>
              </li>
              {groups.map((g) => (
                <li key={g.href} className="border-b border-line">
                  {g.links ? (
                    <details className="accordion">
                      <summary className="flex items-center justify-between py-4 font-display text-[1.05rem] font-semibold uppercase tracking-[0.05em]">
                        {g.label}
                        <span className="accordion-icon text-[1.4rem] font-light leading-none text-accent-ink" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ul className="pb-4">
                        {g.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="block py-2 pl-3 text-ink-soft hover:text-accent-ink">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={g.href} aria-current={pathname === g.href ? "page" : undefined} className="block py-4 font-display text-[1.05rem] font-semibold uppercase tracking-[0.05em] aria-[current=page]:text-accent-ink">
                      {g.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-4">
              <ConsultationButton source="mobile-menu" className="w-full">
                Book your consultation
              </ConsultationButton>
              <div className="flex flex-col gap-2 text-ink-soft">
                <a href={`tel:${site.phone.e164}`} onClick={() => track("phone_click", { source: "mobile-menu" })} className="hover:text-accent-ink">
                  Call {site.phone.display}
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { source: "mobile-menu" })} className="hover:text-accent-ink">
                  Chat on WhatsApp
                </a>
                <a href={`mailto:${site.email}`} onClick={() => track("email_click", { source: "mobile-menu" })} className="hover:text-accent-ink">
                  {site.email}
                </a>
              </div>
            </div>
          </nav>
        </div>
      </dialog>
    </>
  );
}
