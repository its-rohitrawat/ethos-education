import Link from "next/link";
import { ButtonLink, ChevronIcon, Label } from "@/components/ui/primitives";
import { SplitTextHeading } from "@/components/motion/SplitTextHeading";

export const metadata = { title: "Page not found", robots: { index: false } };

const suggestions = [
  { label: "Admissions programmes", href: "/admission/" },
  { label: "Test preparation", href: "/test-prep/" },
  { label: "Study destinations", href: "/study-abroad/" },
  { label: "The Ethos Journal", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export default function NotFound() {
  return (
    <section className="pb-28 pt-[calc(var(--header-h)+4rem)] lg:pt-[calc(var(--header-h)+7rem)]">
      <div className="shell mx-auto max-w-3xl text-center">
        <Label>Error 404</Label>
        <SplitTextHeading as="h1" trigger="load" className="t-hero mt-3 !text-[clamp(2.1rem,1.2rem+3.3vw,3.9rem)]">
          This page has <em>moved on.</em>
        </SplitTextHeading>
        <p className="t-lead mx-auto mt-6 max-w-xl text-ink-soft">
          The address may have changed when we redesigned the site. Try one of these — or start from the homepage.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
        </div>
        <ul className="mt-14 flex flex-wrap justify-center gap-3">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group inline-flex items-center gap-1.5 rounded-full bg-mist px-5 py-3 font-medium transition-colors hover:bg-cloud">
                {s.label}
                <ChevronIcon className="text-brand-bright transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
