import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`t-label text-xs ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 opacity-70">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i < all.length - 1 ? (
                <>
                  <Link href={c.path} className="link-line">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
