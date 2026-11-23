import { cacheLife } from "next/cache";
import Link from "next/link";
import { EthosMark, Logo } from "@/components/brand/Logo";
import { TrackedLink } from "@/components/layout/TrackedLink";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { exams } from "@/content/exams";
import { site, whatsappHref } from "@/content/site";
import { getOffices } from "@/lib/cms";
import { SHOW_UNVERIFIED } from "@/lib/verification";

const company = [
  { label: "About Ethos", href: "/about/" },
  { label: "Admissions", href: "/admission/" },
  { label: "Ivy Mentors", href: "/ivy-mentors/" },
  { label: "Career Counselling", href: "/career-counselling/" },
  { label: "Study Abroad", href: "/study-abroad/" },
  { label: "Success Stories", href: "/success-stories/" },
];

const useful = [
  { label: "Blogs", href: "/blog/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/term-and-conditions/" },
  { label: "Refund Policy", href: "/refund-policy/" },
];

const socialIcon: Record<string, string> = {
  LinkedIn: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v6.35h-4v-5.63c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.73h-4v-11Z",
  Instagram: "M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1ZM17.98 7.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.05-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.06-.01-4.14-.06c-2.78-.13-4.07-1.45-4.2-4.2C3.61 15.05 3.6 14.73 3.6 12s.01-3.06.06-4.14c.13-2.76 1.43-4.07 4.2-4.2C8.94 3.61 9.27 3.6 12 3.6Z",
  X: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z",
  Facebook: "M13.5 21v-7.6h2.56l.38-2.97H13.5V8.53c0-.86.24-1.45 1.47-1.45h1.57V4.43a21 21 0 0 0-2.29-.12c-2.27 0-3.82 1.39-3.82 3.93v2.19H7.87v2.97h2.56V21h3.07Z",
};

function ColumnTitle({ children }: { children: string }) {
  return (
    <>
      <h2 className="font-display text-[1rem] font-bold text-canvas">{children}</h2>
      <span aria-hidden="true" className="mt-2 block h-[2px] w-10 bg-accent-bright" />
    </>
  );
}

/**
 * Footer on the Ethos logo gradient (midnight navy → crimson → ember → amber), with the original site's
 * columns: contact + social, test prep, company, useful links, then offices. The warm light sits behind
 * the large wordmark (bottom right); text stays on the dark side, and the legal bar is on a dark band.
 */
export async function EditorialFooter() {
  "use cache";
  cacheLife("days");
  const offices = await getOffices();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-dawn relative overflow-hidden text-[0.92rem] text-canvas/80">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-4">
          <Logo onDark />
          <p className="mt-4 max-w-sm">{site.mission}</p>
          <ul className="mt-5 space-y-1.5 text-canvas">
            <li>
              <TrackedLink href={`tel:${site.phone.e164}`} event="phone_click" source="footer" className="font-semibold hover:text-accent-soft">
                {site.phone.display}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href={`mailto:${site.email}`} event="email_click" source="footer" className="hover:text-accent-soft">
                {site.email}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink href={whatsappHref()} event="whatsapp_click" source="footer" external className="hover:text-accent-soft">
                Chat on WhatsApp
              </TrackedLink>
            </li>
          </ul>
          <ul className="mt-5 flex gap-2">
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-canvas/10 text-canvas ring-1 ring-canvas/20 transition-colors hover:bg-accent">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={socialIcon[s.label] ?? ""} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <ConsultationButton source="footer" className="mt-6">
            Book your consultation
          </ConsultationButton>
        </div>

        <nav aria-label="Test preparation" className="lg:col-span-3">
          <ColumnTitle>Test Prep Services</ColumnTitle>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {exams.map((e) => (
              <li key={e.slug}>
                <Link href={e.path} className="hover:text-accent-soft">
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <ColumnTitle>Company</ColumnTitle>
          <ul className="mt-4 space-y-2">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Useful links" className="lg:col-span-3">
          <ColumnTitle>Useful Links</ColumnTitle>
          <ul className="mt-4 space-y-2">
            {useful.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell grid items-end gap-10 border-t border-line-inverse py-10 lg:grid-cols-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
          {offices.map((o) => (
            <div key={o.city} className="flex gap-3">
              <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-accent-soft" fill="currentColor" aria-hidden="true">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              <div>
                <p className="font-semibold text-canvas">{o.city}</p>
                <p className="text-[0.85rem]">
                  {o.role ? `${o.role} · ` : ""}
                  {o.region}
                </p>
                {o.verified || SHOW_UNVERIFIED ? (
                  <address className="mt-1 text-[0.85rem] not-italic">
                    {o.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end justify-start gap-[1.5vw] text-canvas lg:col-span-5 lg:justify-end" aria-hidden="true">
          <EthosMark className="h-[clamp(3.25rem,7vw,6.5rem)] w-auto" />
          <span className="font-display text-[clamp(3.75rem,9vw,8.5rem)] font-bold leading-[0.8] tracking-[-0.03em]">Ethos</span>
        </div>
      </div>

      <div className="bg-[#090a22]/80 text-[0.85rem] text-canvas/85">
        <div className="shell flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {year} {site.legalName}. All rights reserved.
          </p>
          <a href="#main" className="hover:text-canvas">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
