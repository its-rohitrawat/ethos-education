import { Fragment, type CSSProperties, type ElementType } from "react";

/**
 * A statement whose words brighten one by one as it scrolls up the screen (CSS scroll-driven
 * animations; see `.scroll-words` in globals.css). Browsers without support, and reduced-motion
 * users, simply see the finished text. Wrap a phrase in *asterisks* to set it in the brand gradient.
 */
export function ScrollWords({ text, as: Tag = "p", className = "" }: { text: string; as?: ElementType; className?: string }) {
  const tokens = text.split(" ").filter(Boolean);
  const last = Math.max(tokens.length - 1, 1);

  // Mark which words sit inside *…*, and their position within that phrase (for one continuous gradient).
  const words: { text: string; em: boolean; emIndex: number }[] = [];
  let inEm = false;
  let emCount = 0;
  for (const raw of tokens) {
    if (raw.startsWith("*")) inEm = true;
    words.push({ text: raw.replace(/^\*|\*$/g, ""), em: inEm, emIndex: inEm ? emCount++ : -1 });
    if (raw.endsWith("*") && raw.length > 1) inEm = false;
  }

  return (
    <Tag className={`scroll-words ${className}`}>
      {words.map((w, i) => {
        const style: Record<string, string | number> = { "--p": (i / last).toFixed(3) };
        if (w.em) {
          style["--i"] = w.emIndex;
          style["--n"] = emCount;
        }
        return (
          <Fragment key={i}>
            <span className={w.em ? "sw sw-em" : "sw"} style={style as CSSProperties}>
              {w.text}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
