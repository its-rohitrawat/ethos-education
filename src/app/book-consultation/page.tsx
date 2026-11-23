import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { BookingForm } from "@/components/consultation/BookingForm";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";
import { Label } from "@/components/ui/primitives";
import { site, whatsappHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Consultation",
  description: "Request a consultation with an Ethos Education counsellor about admissions, mentorship, test preparation or career counselling.",
  path: "/book-consultation/",
});

const expect = [
  { title: "A conversation, not a pitch", text: "We listen first: your goals, your academic background, your timeline and your questions." },
  { title: "Students and parents welcome", text: "Many families join together — decisions are better when everyone hears the same advice." },
  { title: "A clearer picture", text: "You leave knowing your realistic options and which kind of support, if any, would help." },
];

export default function BookConsultationPage() {
  return (
    <section className="pb-28 pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+5rem)]">
      <div className="shell">
        <Breadcrumbs items={[{ name: "Book a consultation", path: "/book-consultation/" }]} />
        {/* Mobile order: heading → form → reassurance. Desktop: heading + reassurance left, form right. */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16">
          <div className="lg:col-span-5">
            <Label>Consultation</Label>
            <SplitTextHeading as="h1" trigger="load" className="t-display mt-3">
              Your next step <em>starts here.</em>
            </SplitTextHeading>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <div className="rounded-[var(--radius-card)] bg-mist p-6 sm:p-10">
              <BookingForm />
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul className="grid gap-3">
              {expect.map((e, i) => (
                <li key={e.title} className="flex gap-4 rounded-[var(--radius-card)] bg-mist p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[0.8125rem] font-semibold text-canvas">{i + 1}</span>
                  <div className="pt-0.5">
                    <h2 className="t-card !text-[1.5rem]">{e.title}</h2>
                    <p className="mt-1 text-[0.95rem] text-ink-soft">{e.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-[0.98rem]">
              <p className="font-semibold">Prefer to talk now?</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <TrackedLink href={`tel:${site.phone.e164}`} event="phone_click" source="booking-page" className="link-line">
                    Call {site.phone.display}
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink href={whatsappHref()} event="whatsapp_click" source="booking-page" external className="link-line">
                    Message us on WhatsApp
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink href={`mailto:${site.email}`} event="email_click" source="booking-page" className="link-line">
                    {site.email}
                  </TrackedLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
