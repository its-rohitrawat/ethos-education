import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import type { JournalArticle } from "@/content/types";

/**
 * Renders an article body. Migrated articles are Markdown (no raw HTML is interpreted). Webflow
 * rich-text bodies are HTML and pass through rehype-sanitize, so CMS content can never inject
 * scripts, event handlers or iframes.
 */
export function ArticleBody({ article }: { article: Pick<JournalArticle, "body" | "bodyFormat" | "images"> }) {
  const components: Components = {
    a({ href = "", children }) {
      if (href.startsWith("/") && !href.startsWith("//")) return <Link href={href}>{children}</Link>;
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
    img({ src = "", alt = "" }) {
      const s = typeof src === "string" ? src : "";
      const dims = article.images?.[s];
      return (
        // Inline images are optimised WebP files produced by the migration script.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={s} alt={alt} width={dims?.width} height={dims?.height} loading="lazy" decoding="async" className="my-2 w-full rounded-[2px]" />
      );
    },
    table({ children }) {
      return (
        <div className="table-wrap" role="region" aria-label="Table" tabIndex={0}>
          <table>{children}</table>
        </div>
      );
    },
    h1({ children }) {
      return <h2>{children}</h2>;
    },
  };

  return (
    <div className="prose-ethos">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={article.bodyFormat === "html" ? [rehypeRaw, rehypeSanitize] : []}
        components={components}
      >
        {article.body}
      </ReactMarkdown>
    </div>
  );
}
