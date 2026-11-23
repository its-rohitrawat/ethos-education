import type { Metadata } from "next";
import { LegalPage, legalDoc } from "@/components/content/LegalPage";
import { pageMetadata } from "@/lib/seo";

const doc = legalDoc("refund-policy");

export const metadata: Metadata = pageMetadata({ title: doc.title, description: doc.description, path: "/refund-policy/" });

export default function RefundPolicyPage() {
  return <LegalPage slug="refund-policy" />;
}
