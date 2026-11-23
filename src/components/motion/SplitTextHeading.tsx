import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; headings are no longer animated. */
  trigger?: "load" | "scroll";
  /** Kept for API compatibility. */
  delay?: number;
  id?: string;
};

/** Plain server-rendered heading (the brochure layout has no headline animation). */
export function SplitTextHeading({ as: Tag = "h2", children, className = "", id }: Props) {
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
