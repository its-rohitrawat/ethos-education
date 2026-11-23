import { cacheLife } from "next/cache";
import Link from "next/link";
import { EthosMark } from "@/components/brand/Logo";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { ChevronIcon } from "@/components/ui/primitives";
import { site, whatsappHref } from "@/content/site";
import { getOffices } from "@/lib/cms";
import { SHOW_UNVERIFIED } from "@/lib/verification";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About Ethos", href: "/about/" },
      { label: "Admissions", href: "/admission/" },
      { label: "Ivy Mentors", href: "/ivy-mentors/" },
      { label: "Test Prep", href: "/test-prep/" },
      { label: "Career Counselling", href: "/career-counselling/" },
      { label: "Study Abroad", href: "/study-abroad/" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Success Stories", href: "/success-stories/" },
      { label: "Journal", href: "/blog/" },
      { label: "FAQs", href: "/faq/" },
      { label: "Book a consultation", href: "/book-consultation/" },
    ],
  },
  {
    title: "Connect",
    links: [{ label: "Contact", href: "/contact/" }, ...site.social.map((s) => ({ label: s.label, href: s.href, external: true }))],
  },
] as const;

/** Navy footer: talk-to-us block, three link columns, offices, and a giant Ethos wordmark. */
export async function EditorialFooter() {
  "use cache";
  cacheLife("days");
  const offices = await getOffices();
  const head = offices[0];
  const others = offices.slice(1).map((o) => o.city);
  const year = new Date().getFullYear();

  const contactRows = [
    { label: "Call", value: site.phone.display, href: `tel:${site.phone.e164}`, event: "phone_click" as const },
    { label: "Email", value: site.email, href: `mailto:${site.email}`, event: "email_click" as const },
    { label: "WhatsApp", value: "Chat with a counsellor", href: whatsappHref(), event: "whatsapp_click" as const, external: true },
  ];

  return (
    <footer className="footer-dawn relative overflow-hidden">
      <div className="shell pt-20 lg:pt-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="t-title max-w-md">Talk to a counsellor about your plans.</h2>
            <ul className="mt-8 max-w-md border-b border-line-inverse">
              {contactRows.map((c) => (
                <li key={c.label} className="border-t border-line-inverse">
                  <TrackedLink href={c.href} event={c.event} source="footer" external={c.external} className="group flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block text-[0.8rem] text-canvas/60">{c.label}</span>
                      <span className="block font-display font-semibold [font-variation-settings:'opsz'_24] [overflow-wrap:anywhere]">{c.value}</span>
                    </span>
                    <ChevronIcon className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </TrackedLink>
                </li>
              ))}
            </ul>
            <ConsultationButton source="footer" variant="light" className="mt-8">
              Book a consultation
            </ConsultationButton>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-[0.85rem] text-canvas/55">{col.title}</h2>
                <ul className="mt-4 space-y-2.5 font-display font-semibold [font-variation-settings:'opsz'_24]">
                  {col.links.map((l) =>
                    "external" in l ? (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-line">
                          {l.label}
                        </a>
                      </li>
                    ) : (
                      <li key={l.href}>
                        <Link href={l.href} className="link-line">
                          {l.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 grid items-end gap-10 lg:mt-28 lg:grid-cols-12">
          <div className="text-[0.9rem] text-canvas/75 lg:col-span-4">
            {head ? (
              <>
                <p className="font-display font-semibold text-canvas [font-variation-settings:'opsz'_24]">{site.legalName}</p>
                {head.verified || SHOW_UNVERIFIED ? (
                  <address className="mt-1 not-italic">
                    {head.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : (
                  <p className="mt-1">{head.city}, {head.region}</p>
                )}
                {others.length ? <p className="mt-3">Also in {others.join(", ").replace(/, ([^,]*)$/, " and $1")}.</p> : null}
              </>
            ) : null}
          </div>
          <div className="flex items-end justify-start gap-[2vw] text-canvas lg:col-span-8 lg:justify-end" aria-hidden="true">
            <EthosMark className="h-[clamp(4rem,11vw,10rem)] w-auto" />
            <span className="font-display text-[clamp(5rem,17vw,16rem)] font-normal leading-[0.78] tracking-[-0.02em] [font-variation-settings:'opsz'_144]">Ethos</span>
          </div>
        </div>

      </div>
      <div className="mt-12 bg-[#090a22]/80">
        <div className="shell flex flex-col gap-4 py-5 text-[0.8rem] text-canvas/80 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy-policy/" className="hover:text-canvas">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/term-and-conditions/" className="hover:text-canvas">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy/" className="hover:text-canvas">
                Refund Policy
              </Link>
            </li>
          </ul>
          <p>
            Copyright © {year} {site.legalName}
          </p>
          <a href="#main" className="inline-flex items-center gap-1.5 font-display font-semibold text-canvas [font-variation-settings:'opsz'_24]">
            Back to top
            <ChevronIcon className="-rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  );
}
