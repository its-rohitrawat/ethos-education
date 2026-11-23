import Image from "next/image";
import type { Img } from "@/content/types";

type Props = {
  image: Img;
  className?: string;
  imgClassName?: string;
  sizes: string;
  /** The page's LCP image: loaded eagerly with high fetch priority. */
  priority?: boolean;
  /** Subtle scroll-linked drift of the image inside its frame (percent), desktop only. 0 disables. */
  parallax?: number;
  /** Apply the archival grade used to unify provisional imagery. */
  archival?: boolean;
  /** Above the fold: a CSS "settle" at first paint instead of the clip reveal. */
  hero?: boolean;
  /** Kept for API compatibility. */
  from?: "bottom" | "top" | "left" | "right";
};

/**
 * Image with a soft clip-path unveil (armed by <MotionController /> only when below the fold) and an
 * optional desktop parallax. Server component — no hydration cost.
 */
export function RevealImage({ image, className = "", imgClassName = "", sizes, priority, parallax = 0, archival = true, hero = false }: Props) {
  const drift = parallax > 0 && !hero ? parallax : 0;
  return (
    <div
      className={`relative overflow-hidden ${hero ? "hero-settle" : ""} ${className}`}
      {...(hero ? {} : { "data-clip": "" })}
      {...(drift ? { "data-parallax": drift } : {})}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={`h-full w-full object-cover ${drift ? "lg:scale-[1.16]" : ""} ${archival && image.provisional ? "archival" : ""} ${imgClassName}`}
      />
    </div>
  );
}
