import Image from "next/image";
import Link from "next/link";
import type { JournalArticle } from "@/content/types";
import { topicLabel } from "@/content/journal";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export function JournalCard({ article, size = "default", priority = false }: { article: JournalArticle; size?: "default" | "large" | "compact"; priority?: boolean }) {
  const large = size === "large";
  return (
    <article className="group relative flex h-full flex-col">
      {article.featuredImage && size !== "compact" ? (
        <div className={`relative overflow-hidden rounded-[var(--radius-card)] bg-mist ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <Image
            src={article.featuredImage.src}
            alt=""
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            sizes={large ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"}
            className="archival object-cover transition-transform duration-[1.4s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
      <div className={`flex flex-1 flex-col ${size === "compact" ? "" : "pt-6"}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-ink-soft">
          <span className="text-ink">{topicLabel(article.topic)}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{fmt(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingMinutes} min read</span>
        </p>
        <h3 className={`mt-3 font-display leading-snug ${large ? "t-title" : "t-subtitle"}`}>
          <Link href={article.path} className="after:absolute after:inset-0">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-editorial)] group-hover:bg-[length:100%_1px]">
              {article.title}
            </span>
          </Link>
        </h3>
        {size !== "compact" && article.excerpt ? <p className="t-small mt-4 line-clamp-3 text-ink-soft">{article.excerpt}</p> : null}
      </div>
    </article>
  );
}
