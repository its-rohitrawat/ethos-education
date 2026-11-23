import type { Metadata } from "next";
import { LegalPage, legalDoc } from "@/components/content/LegalPage";
import { pageMetadata } from "@/lib/seo";

const doc = legalDoc("term-and-conditions");

export const metadata: Metadata = pageMetadata({ title: doc.title, description: doc.description, path: "/term-and-conditions/" });

export default function TermsPage() {
  return <LegalPage slug="term-and-conditions" />;
}
