"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "@/components/brand/Logo";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { ChevronIcon, RollText } from "@/components/ui/primitives";
import type { NavGroup } from "@/content/nav";
import { site, whatsappHref } from "@/content/site";
import { track } from "@/lib/analytics";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

/**
 * Header: transparent over the top of the page; scrolling down tucks it away and scrolling up brings
 * it back as a floating cream bar. State lives in two data attributes set from one passive,
 * rAF-throttled scroll handler with 24px hysteresis, so trackpad jitter can't make it bounce, React
 * never re-renders on scroll, and only transform/colours animate.
 */
export function SiteHeader({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const tone = pathname === "/" ? "light" : "dark";

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = window.scrollY;
    let travel = 0;
    let queued = false;
    const apply = () => {
      queued = false;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (y < 80) {
        header.removeAttribute("data-hidden");
        header.removeAttribute("data-floating");
        travel = 0;
        return;
      }
      travel = Math.sign(dy) === Math.sign(travel) ? travel + dy : dy;
      if (travel > 24) header.setAttribute("data-hidden", "");
      else if (travel < -24) {
        header.removeAttribute("data-hidden");
        header.setAttribute("data-floating", "");
      }
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-canvas">
        Skip to content
      </a>
      <header ref={headerRef} data-tone={tone} className="site-header fixed inset-x-0 top-0 z-50 px-[max(0.5rem,calc(var(--gutter)-1rem))] pt-3">
        <div className="bar relative mx-auto flex h-16 max-w-[calc(var(--shell-max)-2*var(--gutter)+2rem)] items-center justify-between gap-6 rounded-2xl px-4 text-ink lg:h-[4.5rem]">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-[clamp(0.25rem,1.6vw,2.25rem)] font-display text-[clamp(0.95rem,0.8rem+0.35vw,1.1rem)] font-semibold [font-variation-settings:'opsz'_24]">
              {groups.map((g) => (
                <li key={g.href} className={g.links ? "mega-host" : undefined}>
                  <Link
                    href={g.href}
                    aria-current={isActive(pathname, g.href) ? "page" : undefined}
                    className="relative inline-flex h-11 items-center px-2 after:absolute after:inset-x-2 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[var(--ease-editorial)] hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                  >
                    <RollText>{g.label}</RollText>
                  </Link>
                  {g.links ? (
                    <div className="mega absolute inset-x-0 top-full pt-3">
                      <div className="grid grid-cols-12 gap-8 rounded-2xl bg-canvas p-8 text-ink shadow-[0_0_0_1px_rgb(26_26_26/0.05),0_30px_60px_-30px_rgb(26_26_26/0.45)]">
                        <div className="col-span-4 flex flex-col">
                          <p className="t-title">{g.label}</p>
                          <p className="mt-3 font-sans text-[0.95rem] font-normal text-ink-soft">{g.blurb}</p>
                          <Link href={g.href} className="mt-auto inline-flex items-center gap-1.5 pt-6">
                            <span className="link-line">View all</span>
                            <ChevronIcon />
                          </Link>
                        </div>
                        <ul className={`col-span-4 ${g.links.length > 6 ? "columns-2 gap-6" : ""}`}>
                          {g.links.map((l) => (
                            <li key={l.href} className="break-inside-avoid">
                              <Link href={l.href} className="group/ml flex items-center justify-between gap-3 border-b border-line py-2.5">
                                <span>{l.label}</span>
                                <ChevronIcon className="opacity-0 transition-all duration-300 group-hover/ml:translate-x-0.5 group-hover/ml:opacity-100" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {g.image ? (
                          <div className="relative col-span-4 aspect-[4/3] overflow-hidden rounded-xl bg-mist">
                            <Image src={g.image.src} alt={g.image.alt} fill sizes="25vw" className="object-cover" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ConsultationButton source="header" variant="solid" className="inquire !min-h-10 max-sm:!hidden">
              Book a consultation
            </ConsultationButton>
            <button
              type="button"
              onClick={openMenu}
              className="inline-flex h-10 items-center gap-2.5 rounded-full px-3 font-display text-[1rem] font-semibold [font-variation-settings:'opsz'_24] lg:hidden"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              Menu
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-[1.5px] w-full bg-current" />
                <span className="h-[1.5px] w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={menuRef}
        aria-label="Site menu"
        data-close-on-consult=""
        className="site-menu m-0 h-dvh max-h-none w-full max-w-none bg-canvas p-0 text-ink backdrop:bg-transparent"
        onClose={() => {
          setMenuOpen(false);
          document.documentElement.style.overflow = "";
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="shell flex h-[4.75rem] shrink-0 items-center justify-between pt-3">
            <Logo />
            <button type="button" onClick={() => menuRef.current?.close()} className="inline-flex h-10 items-center gap-2 rounded-full px-3 font-display text-[1rem] font-semibold [font-variation-settings:'opsz'_24]">
              Close
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="shell flex-1 pb-12 pt-6">
            <ul className="border-b border-line">
              {[{ label: "Home", href: "/" } as NavGroup, ...groups].map((g, k) => (
                <li key={g.href} className="overflow-hidden border-t border-line">
                  {g.links ? (
                    <details className="accordion" data-menu-item style={{ "--k": k } as CSSProperties}>
                      <summary className="flex items-center justify-between py-3.5 t-title">
                        {g.label}
                        <span className="accordion-icon text-[1.5rem] font-light leading-none" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ul className="pb-5 pl-1">
                        <li>
                          <Link href={g.href} className="block py-1.5 font-display font-semibold [font-variation-settings:'opsz'_24]">
                            {g.label === "About" ? "About Ethos" : `All ${g.label.toLowerCase()}`}
                          </Link>
                        </li>
                        {g.links.filter((l) => l.href !== g.href).map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="block py-1.5 text-ink-soft">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={g.href} data-menu-item style={{ "--k": k } as CSSProperties} aria-current={pathname === g.href ? "page" : undefined} className="block py-3.5 t-title">
                      {g.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-10 grid gap-6 sm:grid-cols-2" data-menu-item style={{ "--k": groups.length + 1 } as CSSProperties}>
              <ConsultationButton source="mobile-menu" variant="solid" className="w-full">
                Book a consultation
              </ConsultationButton>
              <div className="flex flex-col gap-2 text-ink-soft">
                <a href={`tel:${site.phone.e164}`} onClick={() => track("phone_click", { source: "mobile-menu" })} className="link-line w-fit">
                  {site.phone.display}
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { source: "mobile-menu" })} className="link-line w-fit">
                  WhatsApp us
                </a>
                <a href={`mailto:${site.email}`} onClick={() => track("email_click", { source: "mobile-menu" })} className="link-line w-fit">
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
