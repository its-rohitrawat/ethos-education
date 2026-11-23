import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

/**
 * Wraps every word of a headline in a mask + inner span so CSS can animate words individually:
 *   <span class="w"><span class="wi" style="--wi:3">word</span></span>
 *
 * - Works on plain strings and nested host elements (<em>, <span id>, <br>), and keeps the original
 *   spaces as text, so copy/paste, wrapping and screen readers behave as for normal text.
 * - Words inside an <em> also get --i / --n (index and count within the <em>) so the brand gradient
 *   flows continuously across the phrase (see `em.em-split` in globals.css).
 * - Only spaces split words; non-breaking spaces are kept inside the word.
 * - Pure function (no hooks), so it renders on the server and costs no JavaScript.
 */
type Counter = { value: number };
type EmContext = { index: Counter; total: number };

const SPACES = /([ \t\n\r]+)/;

function countWords(node: ReactNode): number {
  let n = 0;
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      n += String(child)
        .split(SPACES)
        .filter((part) => part && !SPACES.test(part)).length;
    } else if (isValidElement<{ children?: ReactNode }>(child) && typeof child.type === "string") {
      n += countWords(child.props.children);
    }
  });
  return n;
}

function walk(node: ReactNode, words: Counter, em?: EmContext): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child)
        .split(SPACES)
        .map((part, k) => {
          if (!part) return null;
          if (SPACES.test(part)) return part;
          const style: Record<string, number> = { "--wi": words.value++ };
          if (em) {
            style["--i"] = em.index.value++;
            style["--n"] = em.total;
          }
          return (
            <span key={k} className="w">
              <span className="wi" style={style as CSSProperties}>
                {part}
              </span>
            </span>
          );
        });
    }
    // Recurse into host elements only; components (and <br>) are left untouched.
    if (isValidElement<{ children?: ReactNode; className?: string }>(child) && typeof child.type === "string" && child.type !== "br") {
      const el = child as ReactElement<{ children?: ReactNode; className?: string }>;
      const isEm = el.type === "em";
      const nextEm = isEm ? { index: { value: 0 }, total: countWords(el.props.children) } : em;
      const props = isEm ? { className: `${el.props.className ?? ""} em-split`.trim() } : {};
      return cloneElement(el, props, walk(el.props.children, words, nextEm));
    }
    return child;
  });
}

export function splitWords(children: ReactNode, startIndex = 0): ReactNode {
  return walk(children, { value: startIndex });
}
