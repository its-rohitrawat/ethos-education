import type { Metadata } from "next";
import { JournalIndex } from "@/components/journal/JournalIndex";
import { getArticles } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The Ethos Journal — Study Abroad Guides & Admissions Insight",
  description:
    "Guides on Ivy League and top-university admissions, scholarships, study costs, visas and test preparation for Indian students planning to study abroad.",
  path: "/blog/",
});

export default async function BlogPage() {
  const articles = await getArticles();
  return (
    <JournalIndex
      articles={articles}
      title={
        <>
          Ideas for the <em>journey ahead.</em>
        </>
      }
      intro="Admissions strategy, scholarships, destinations and the realities of studying abroad — written for students and the families who support them."
      crumbs={[{ name: "Journal", path: "/blog/" }]}
    />
  );
}
