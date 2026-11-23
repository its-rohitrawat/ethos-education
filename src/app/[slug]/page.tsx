import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/journal/ArticleView";
import { ExamView } from "@/components/sections/ExamView";
import { exams as localExams } from "@/content/exams";
import { articles as localArticles } from "@/content/journal";
import { getArticle, getArticles, getExam } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

/**
 * Root-level slugs keep the existing WordPress URLs: the ten exam pages (/sat/, /gre/ …) and the
 * Journal articles (/how-to-get-into-stanford-…/). Static routes such as /about/ take precedence.
 */
export function generateStaticParams() {
  return [...localExams.map((e) => ({ slug: e.slug })), ...localArticles.map((a) => ({ slug: a.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExam(slug);
  if (exam) return pageMetadata({ title: exam.seo.title, description: exam.seo.description, path: exam.path });
  const article = await getArticle(slug);
  if (article) {
    return pageMetadata({
      title: article.seo.title || article.title,
      description: article.seo.description || article.excerpt,
      path: article.path,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      image: article.featuredImage
        ? { url: article.featuredImage.src, width: article.featuredImage.width, height: article.featuredImage.height, alt: article.featuredImage.alt || article.title }
        : undefined,
    });
  }
  return {};
}

/**
 * params are awaited directly (no Suspense wrapper) so that unknown URLs — including legacy spam
 * URLs — return a real HTTP 404 rather than a streamed "soft 404". Every valid slug is prerendered.
 */
export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const exam = await getExam(slug);
  if (exam) return <ExamView exam={exam} />;
  const article = await getArticle(slug);
  if (!article) notFound();
  const all = await getArticles();
  return <ArticleView article={article} related={all.filter((a) => a.slug !== article.slug && a.topic === article.topic).slice(0, 3)} />;
}
