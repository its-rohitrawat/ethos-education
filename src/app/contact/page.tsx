import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { BookingForm } from "@/components/consultation/BookingForm";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { Label, PendingBadge } from "@/components/ui/primitives";
import { site, whatsappHref } from "@/content/site";
import { getOffices } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { SHOW_UNVERIFIED } from "@/lib/verification";

export const metadata: Metadata = pageMetadata({
  title: "Contact Ethos Education",
  description: "Call, WhatsApp or email Ethos Education, or send us a consultation request. Offices in Gurugram, Noida, Ranchi and Dublin, California.",
  path: "/contact/",
});

export default async function ContactPage() {
  const offices = await getOffices();
  return (
    <>
      <section className="page-banner py-12 sm:py-16 lg:py-20">
        <div className="shell">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact/" }]} />
          <Label className="mt-6 text-accent-soft">Contact</Label>
          <SplitTextHeading as="h1" trigger="load" className="t-hero mt-3">
            Let’s <em>talk.</em>
          </SplitTextHeading>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Call", value: site.phone.display, href: `tel:${site.phone.e164}`, event: "phone_click" as const },
              { label: "WhatsApp", value: "Chat with a counsellor", href: whatsappHref(), event: "whatsapp_click" as const, external: true },
              { label: "Email", value: site.email, href: `mailto:${site.email}`, event: "email_click" as const },
            ].map((c) => (
              <TrackedLink
                key={c.label}
                href={c.href}
                event={c.event}
                source="contact-page"
                external={c.external}
                className="card group p-6 text-ink transition-colors hover:border-accent-bright"
              >
                <span className="block text-[0.9rem] text-ink-soft">{c.label}</span>
                <span className="mt-2 block text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] font-semibold leading-tight tracking-[-0.02em] [overflow-wrap:anywhere] group-hover:text-accent-ink">{c.value}</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="shell editorial-grid gap-y-16">
          <div className="col-span-4 lg:col-span-5">
            <h2 className="t-title">Offices</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {offices.map((o) => (
                <li key={o.city} className="rounded-[var(--radius-card)] bg-mist p-6">
                  <p className="t-card">{o.city}</p>
                  <p className="mt-1 text-[0.9rem] text-ink-soft">{o.role ?? "Office"} · {o.region}</p>
                  {o.verified || SHOW_UNVERIFIED ? (
                    <address className="mt-3 text-[0.92rem] not-italic text-ink-soft">
                      {o.address.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                      {!o.verified ? <span className="mt-2 block"><PendingBadge note="Confirm address before launch" /></span> : null}
                    </address>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 lg:col-span-6 lg:col-start-7">
            <div className="rounded-[var(--radius-card)] bg-mist p-6 sm:p-10">
              <BookingForm source="contact-page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
