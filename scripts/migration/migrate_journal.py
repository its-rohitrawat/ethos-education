"""Migrate the 34 WordPress/Elementor blog posts into the new Ethos Journal content format.

Run from the repo root with a Python that has beautifulsoup4, lxml and markdownify installed:

    python -I scripts/migration/migrate_journal.py <archive_root>

Reads   <archive_root>/api/posts.json and <archive_root>/media/uploads/**
Writes  src/content/journal/articles.json   (article data + markdown body)
        public/journal/*.webp               (article images, max 1600px wide)
        scripts/migration/journal-migration-report.json

Nothing is invented: titles, dates, body text and SEO fields come from the WordPress export.
The only editorial additions are the `topic` assignment (rules below) and the excerpt, which is
the article's own first sentence(s) because every post's WordPress excerpt was theme placeholder text.
"""
import json
import os
import re
import subprocess
import sys
import urllib.parse
from html import unescape

from bs4 import BeautifulSoup, NavigableString
from markdownify import markdownify as md

ARCHIVE = sys.argv[1]
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT_JSON = os.path.join(REPO, "src", "content", "journal", "articles.json")
OUT_IMG = os.path.join(REPO, "public", "journal")
SITE_RE = re.compile(r"^https?://(www\.)?ethoseducation\.world", re.I)

# Old URL -> new URL, so migrated articles link straight to final destinations (no redirect hops).
LINK_MAP = {
    "/blogs/": "/blog/",
    "/book-consultation": "/book-consultation/",
    "/guaranteed-admission-program/": "/admission/guaranteed-admissions/",
    "/dream-school-application/": "/admission/dream-school/",
    "/scholarship-program-2/": "/admission/scholarship-program/",
    "/elite/": "/admission/dream-school/",
    "/elite-preparation-ethos-education-expert-coaching/": "/admission/dream-school/",
    "/usa/": "/study-abroad/usa/",
    "/best-scholarships-for-indian-students-in-2026/":
        "/best-scholarships-for-indian-students-in-2026-the-complete-guide-to-studying-abroad-with-financial-aid/",
    "/success-stories-clone/": "/success-stories/",
    "/book-consultation-old/": "/book-consultation/",
}

# Editorial topics for the new Journal (first matching rule wins; documented in docs/CONTENT-MIGRATION.md).
TOPIC_RULES = [
    ("test-prep", r"(^|-)(esat|ielts|toefl|gre|gmat|sat|act|pte|duolingo)(-|$)"),
    ("destinations", r"study-in-the-|study-abroad-guide|affordable-countries|cost-of-education-in|best-language"),
    ("visas-careers", r"(^|-)(visa|evisa|job-market|employability|emerging-courses|stem|careers?)(-|$)"),
    ("scholarships-funding", r"scholarship|afford|financial|fully-funded|funding"),
    ("admissions", r"harvard|stanford|ivy|admission|shortlisting|16-years|consultant|counsel"),
    ("perspectives", r"."),
]

HEADING_MAP = {"h1": "h2", "h2": "h2", "h3": "h2", "h4": "h3", "h5": "h3", "h6": "h4"}
KEEP_TAGS = {"p", "h2", "h3", "h4", "ul", "ol", "li", "table", "thead", "tbody", "tr", "td", "th",
             "strong", "b", "em", "i", "a", "img", "br", "blockquote"}


def rel_link(href):
    if not href:
        return href
    href = unescape(href.strip())
    if SITE_RE.match(href):
        p = urllib.parse.urlparse(href)
        path = p.path or "/"
        if path.startswith(("/category/", "/tag/", "/author/")):
            path = "/blog/"
        if not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
            path += "/"
        path = LINK_MAP.get(path, LINK_MAP.get(path.rstrip("/"), path))
        return path + (f"#{p.fragment}" if p.fragment else "")
    return href


def original_upload_path(src):
    src = unescape(src).split("?")[0]
    src = re.sub(r"^https?://i\d\.wp\.com/", "https://", src)
    m = re.search(r"/wp-content/uploads/(.+)$", src)
    if not m:
        return None, None
    rel = urllib.parse.unquote(m.group(1))
    base = os.path.join(ARCHIVE, "media", "uploads", *rel.split("/"))
    orig = re.sub(r"-\d{2,5}x\d{2,5}(?=\.[A-Za-z0-9]+$)", "", base).replace("-scaled.", ".")
    for cand in (orig, base):
        if os.path.exists(cand):
            return cand, rel
    return None, rel


def convert_image(local, rel, cache):
    if local in cache:
        return cache[local]
    name = re.sub(r"[^a-z0-9]+", "-", os.path.splitext(rel.lower())[0]).strip("-") + ".webp"
    dest = os.path.join(OUT_IMG, name)
    os.makedirs(OUT_IMG, exist_ok=True)
    if not os.path.exists(dest):
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", local, "-vf", "scale='min(1600,iw)':-2",
                        "-c:v", "libwebp", "-quality", "78", dest], check=True)
    dims = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                           "stream=width,height", "-of", "csv=p=0", dest], capture_output=True, text=True).stdout.strip()
    w, h = (int(x) for x in dims.split(",")[:2])
    cache[local] = {"src": f"/journal/{name}", "width": w, "height": h}
    return cache[local]


def clean_html(html, report, cache):
    soup = BeautifulSoup(html, "lxml")
    body = soup.body or soup
    for el in body.select("script, style, noscript, .px-divider--wrap, .pxl-title--icon, i.fa, i.far, i.fas, i.fab"):
        el.decompose()
    for el in body.find_all("i"):
        if any(c.startswith(("fa", "flaticon", "caseicon")) for c in el.get("class", [])):
            el.decompose()
    images = []
    for img in body.find_all("img"):
        src = img.get("data-src") or img.get("src") or ""
        local, rel = original_upload_path(src)
        if not local:
            report["missing_images"].append(src)
            img.decompose()
            continue
        info = convert_image(local, rel, cache)
        alt = (img.get("alt") or "").strip()
        new = soup.new_tag("img", src=info["src"], alt=alt)
        img.replace_with(new)
        images.append({**info, "alt": alt})
    for a in body.find_all("a"):
        if not a.get_text(strip=True) and not a.find("img"):
            a.decompose()  # empty anchors (Elementor leftovers) have no accessible name
            continue
        a.attrs = {"href": rel_link(a.get("href"))} if a.get("href") else {}
    for tag in list(body.find_all(True)):
        if tag.name in HEADING_MAP:
            tag.name = HEADING_MAP[tag.name]
        if tag.name not in KEEP_TAGS:
            tag.unwrap()
        else:
            keep = {k: v for k, v in tag.attrs.items() if k in ("href", "src", "alt")}
            tag.attrs = keep
    # drop empty paragraphs/headings
    for tag in body.find_all(["p", "h2", "h3", "h4", "li"]):
        if not tag.get_text(strip=True) and not tag.find("img"):
            tag.decompose()
    return str(body), images


TABLE_SEP = re.compile(r"^\|(\s*:?-{3,}:?\s*\|)+\s*$")


def fix_table_headers(text):
    """markdownify emits an empty header row when the source table had no <th>. Promote the first
    data row to the header so every cell has a header (accessibility: td-has-header)."""
    lines = text.split("\n")
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if (line.startswith("|") and i + 2 < len(lines) and TABLE_SEP.match(lines[i + 1])
                and not re.sub(r"[|\s]", "", line) and lines[i + 2].startswith("|")):
            out += [lines[i + 2], lines[i + 1]]
            i += 3
            continue
        out.append(line)
        i += 1
    return "\n".join(out)


def to_markdown(html):
    text = md(html, heading_style="ATX", bullets="-", strip=["span"])
    text = text.replace("\u00a0", " ")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"\*\*\s*\*\*", "", text)
    text = fix_sentence_joins(text)
    text = fix_table_headers(text)
    return text.strip() + "\n"


LINK_TARGET = re.compile(r"(\]\([^)]*\)|https?://\S+)")


def fix_sentence_joins(text):
    """Elementor joined adjacent text runs without a space ("employability.The impact"). Add the
    missing space in prose only; link targets and bare URLs are left untouched."""
    parts = LINK_TARGET.split(text)
    for i, part in enumerate(parts):
        if part and not LINK_TARGET.fullmatch(part):
            parts[i] = re.sub(r"(?<=[a-z\)])([.?!:])(?=[A-Z][a-z])", r"\1 ", part)
    return "".join(parts)


def excerpt_from(markdown, limit=220):
    for block in markdown.split("\n\n"):
        plain = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", block)
        plain = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", plain)
        plain = re.sub(r"[#*_>`|-]", " ", plain)
        plain = re.sub(r"\s+", " ", plain).strip()
        if len(plain) > 80:
            if len(plain) <= limit:
                return plain
            cut = plain[:limit]
            end = max(cut.rfind(". "), cut.rfind("? "), cut.rfind("! "))
            return (cut[: end + 1] if end > 80 else cut.rsplit(" ", 1)[0] + "…").strip()
    return ""


def topic_for(slug):
    for topic, pattern in TOPIC_RULES:
        if re.search(pattern, slug):
            return topic
    return "perspectives"


def main():
    posts = json.load(open(os.path.join(ARCHIVE, "api", "posts.json"), encoding="utf-8"))
    report = {"missing_images": [], "articles": []}
    cache = {}
    articles = []
    for p in posts:
        slug = p["slug"]
        html, images = clean_html(p["content"]["rendered"], report, cache)
        body = to_markdown(html)
        y = p.get("yoast_head_json") or {}
        fm = (p.get("_embedded", {}).get("wp:featuredmedia") or [{}])[0]
        featured = None
        if fm.get("source_url"):
            local, rel = original_upload_path(fm["source_url"])
            if local:
                featured = {**convert_image(local, rel, cache), "alt": (fm.get("alt_text") or "").strip()}
            else:
                report["missing_images"].append(fm["source_url"])
        title = unescape(re.sub(r"<[^>]+>", "", p["title"]["rendered"])).strip()
        words = len(re.sub(r"[#*_>\[\]()!|-]", " ", body).split())
        articles.append({
            "slug": slug,
            "path": f"/{slug}/",
            "title": title,
            "publishedAt": p["date"],
            "updatedAt": p["modified"],
            "author": None,  # WordPress only recorded the generic "admin" account; real authorship is unknown
            "topic": topic_for(slug),
            "legacyCategories": p.get("categories", []),
            "legacyTags": p.get("tags", []),
            "excerpt": excerpt_from(body),
            "seo": {
                "title": unescape(y.get("title") or title),
                "description": unescape(y.get("description") or ""),
            },
            "featuredImage": featured,
            "images": {i["src"]: {"width": i["width"], "height": i["height"]} for i in images},
            "readingMinutes": max(1, round(words / 220)),
            "wordCount": words,
            "body": body,
        })
        report["articles"].append({"slug": slug, "images": len(images), "words": words, "topic": topic_for(slug),
                                   "has_featured": bool(featured)})
    articles.sort(key=lambda a: a["publishedAt"], reverse=True)
    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=1)
    # Slim slug list used by src/proxy.ts to answer unknown URLs with a real 404.
    with open(os.path.join(os.path.dirname(OUT_JSON), "slugs.json"), "w", encoding="utf-8") as f:
        json.dump([a["slug"] for a in articles], f, indent=1)
    with open(os.path.join(os.path.dirname(__file__), "journal-migration-report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=1)
    print(f"articles: {len(articles)}  images: {len(cache)}  missing images: {len(report['missing_images'])}")


if __name__ == "__main__":
    main()
