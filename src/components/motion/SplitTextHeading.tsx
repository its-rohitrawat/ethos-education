import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /**
   * "load": shown as-is (banners and page titles). "scroll" (default): fades up gently when it scrolls
   * into view — armed by MotionController only if it starts below the fold, never with reduced motion.
   */
  trigger?: "load" | "scroll";
  /** Kept for API compatibility. */
  delay?: number;
  id?: string;
};

/** Server-rendered heading with an optional subtle fade-up (no word splitting). */
export function SplitTextHeading({ as: Tag = "h2", children, className = "", trigger = "scroll", id }: Props) {
  return (
    <Tag id={id} className={className} data-reveal-root={trigger === "scroll" ? "" : undefined}>
      {children}
    </Tag>
  );
}
