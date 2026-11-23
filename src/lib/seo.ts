import type { Metadata } from "next";
import { site } from "@/content/site";
import type { JournalArticle, Office } from "@/content/types";

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

/** Unique, server-rendered metadata for a page. Titles get the " | Ethos Education" suffix from the root layout template. */
export function pageMetadata({ title, description, path, image, type = "website", publishedTime, modifiedTime, noindex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image.url, width: image.width, height: image.height, alt: image.alt ?? title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      ...(images ? { images } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images: images.map((i) => i.url) } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------ Structured data ------------------------------ */

export function organizationJsonLd(verifiedOffices: Office[]) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/brand/ethos-mark.png"),
    email: site.email,
    telephone: site.phone.e164,
    sameAs: site.social.map((s) => s.href),
    contactPoint: [{ "@type": "ContactPoint", telephone: site.phone.e164, email: site.email, contactType: "admissions enquiries", availableLanguage: ["en", "hi"] }],
  };
  const locations = verifiedOffices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — ${o.city}`,
    parentOrganization: { "@id": `${site.url}/#organization` },
    telephone: site.phone.e164,
    address: { "@type": "PostalAddress", streetAddress: o.address.join(", "), addressLocality: o.city, addressRegion: o.region },
  }));
  return [org, ...locations];
}

export function articleJsonLd(a: JournalArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.seo.description || a.excerpt,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt || a.publishedAt,
    mainEntityOfPage: absoluteUrl(a.path),
    image: a.featuredImage ? [absoluteUrl(a.featuredImage.src)] : undefined,
    author: a.author ? { "@type": "Person", name: a.author } : { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/ethos-mark.png") } },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}
