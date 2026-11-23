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
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { navGroups } from "@/content/nav";
import { site } from "@/content/site";
import { getOffices } from "@/lib/cms";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Client's type choices (23 Nov 2026), all SIL Open Font License, self-hosted from app/fonts/ (variable
 * Latin WOFF2 files from Google Fonts — no network needed at build time):
 * Bricolage Grotesque for headings / navigation / labels / buttons, DM Sans for paragraphs,
 * Dancing Script (bold) for card titles.
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
  src: [{ path: "./fonts/DancingScript-Variable.woff2", weight: "400 700", style: "normal" }],
  display: "swap",
  variable: "--font-cards",
  fallback: ["Brush Script MT", "cursive"],
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
  themeColor: "#f9f9f0",
  width: "device-width",
  initialScale: 1,
};

/**
 * Opening screen gate (runs before first paint). The intro plays only on a full load of the home page,
 * once per browser session, and never with reduced motion; otherwise html gets .intro-seen and the
 * overlay is display:none. The page is never scroll-locked: the first wheel / touch / key / click fades
 * the intro out at once (.intro-skip). Static string — no user input is interpolated.
 */
const INTRO_GATE = `(function(){var d=document.documentElement;try{if(location.pathname!=="/"||sessionStorage.getItem("ethos-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-seen");return}sessionStorage.setItem("ethos-intro","1");d.classList.add("intro-playing");var ev=["wheel","touchstart","keydown","pointerdown"],done=false;function fin(){d.classList.add("intro-seen");d.classList.remove("intro-playing","intro-skip");ev.forEach(function(e){removeEventListener(e,skip)})}function skip(){if(done)return;done=true;d.classList.add("intro-skip");setTimeout(fin,350)}ev.forEach(function(e){addEventListener(e,skip,{passive:true})});setTimeout(function(){if(!done){done=true;fin()}},4000)}catch(e){d.classList.add("intro-seen")}})();`;

async function SiteJsonLd() {
  "use cache";
  cacheLife("days");
  const offices = await getOffices();
  return <JsonLd data={organizationJsonLd(offices.filter((o) => o.verified))} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable} ${cards.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
      </head>
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
          <SmoothScroll />
        </ConsultationProvider>
        <SiteJsonLd />
      </body>
    </html>
  );
}
