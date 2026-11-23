import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cacheLife } from "next/cache";
import { JsonLd } from "@/components/content/JsonLd";
import { ConsultationProvider } from "@/components/consultation/ConsultationProvider";
import { Analytics } from "@/components/layout/Analytics";
import { ContactDock } from "@/components/layout/ContactDock";
import { EditorialFooter } from "@/components/layout/EditorialFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionController } from "@/components/motion/MotionController";
import { navGroups } from "@/content/nav";
import { site } from "@/content/site";
import { getOffices } from "@/lib/cms";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Client's type choices (23 Nov 2026), all SIL Open Font License, self-hosted from app/fonts/ (variable
 * Latin WOFF2 files from Google Fonts — no network needed at build time):
 * Bricolage Grotesque for headings / navigation / labels / buttons, DM Sans for paragraphs,
 * Fraunces (semibold, soft) for card titles — the same family as the Worldwide word.
 */
const heading = localFont({
  src: [{ path: "./fonts/BricolageGrotesque-Variable.woff2", weight: "200 800", style: "normal" }],
  display: "swap",
  variable: "--font-heading",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});
const body = localFont({
  src: [{ path: "./fonts/DMSans-Variable.woff2", weight: "100 1000", style: "normal" }],
  display: "swap",
  variable: "--font-body",
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});
const cards = localFont({
  src: [{ path: "./fonts/Fraunces-Variable.woff2", weight: "100 900", style: "normal" }],
  display: "swap",
  variable: "--font-cards",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ethos Education — Admissions Counselling for the World’s Leading Universities",
    template: "%s | Ethos Education",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image", site: "@education_ethos" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

async function SiteJsonLd() {
  "use cache";
  cacheLife("days");
  const offices = await getOffices();
  return <JsonLd data={organizationJsonLd(offices.filter((o) => o.verified))} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable} ${cards.variable}`} suppressHydrationWarning>
      <body>
        <ConsultationProvider>
          <SiteHeader groups={navGroups} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <EditorialFooter />
          <ContactDock />
          <Analytics />
          <MotionController />
        </ConsultationProvider>
        <SiteJsonLd />
      </body>
    </html>
  );
}
