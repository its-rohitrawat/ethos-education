import type { CSSProperties, ElementType, ReactNode } from "react";
import { splitWords } from "./splitWords";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /**
   * "load": above-the-fold title. Words rise at first paint in pure CSS (no JS, no LCP delay).
   * "scroll": words rise when the heading scrolls into view. MotionController arms it only if it starts
   * below the fold, so a heading that is already visible never flashes.
   */
  trigger?: "load" | "scroll";
  /** Seconds before the first word moves. */
  delay?: number;
  id?: string;
};

/** Server-rendered headline with word-by-word masked motion (see splitWords.tsx and globals.css). */
export function SplitTextHeading({ as: Tag = "h2", children, className = "", trigger = "scroll", delay = 0, id }: Props) {
  const style = delay ? ({ "--d": Math.round(delay * 1000) } as CSSProperties) : undefined;
  return (
    <Tag id={id} className={`${trigger === "load" ? "type-load " : ""}${className}`} data-type={trigger === "scroll" ? "" : undefined} style={style}>
      {splitWords(children)}
    </Tag>
  );
}
