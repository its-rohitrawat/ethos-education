import type { Metadata } from "next";
import { LegalPage, legalDoc } from "@/components/content/LegalPage";
import { pageMetadata } from "@/lib/seo";

const doc = legalDoc("privacy-policy");

export const metadata: Metadata = pageMetadata({ title: doc.title, description: doc.description, path: "/privacy-policy/" });

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" />;
}
