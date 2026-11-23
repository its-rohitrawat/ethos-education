import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalIndex } from "@/components/journal/JournalIndex";
import { journalTopics } from "@/content/journal";
import { getArticles } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return journalTopics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/topic/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const t = journalTopics.find((x) => x.slug === topic);
  return t ? pageMetadata({ title: `${t.label} — The Ethos Journal`, description: t.description, path: `/blog/topic/${t.slug}/` }) : {};
}

// params are awaited directly so unknown values return a real HTTP 404 (see docs/KNOWN-LIMITATIONS.md).
export default async function TopicPage({ params }: PageProps<"/blog/topic/[topic]">) {
  const { topic } = await params;
  const t = journalTopics.find((x) => x.slug === topic);
  if (!t) notFound();
  const articles = (await getArticles()).filter((a) => a.topic === t.slug);
  return (
    <JournalIndex
      articles={articles}
      activeTopic={t.slug}
      title={<em>{t.label}</em>}
      intro={t.description}
      crumbs={[
        { name: "Journal", path: "/blog/" },
        { name: t.label, path: `/blog/topic/${t.slug}/` },
      ]}
    />
  );
}
