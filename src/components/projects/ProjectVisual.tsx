import Image from "next/image";
import type { ImageAsset, Locale } from "@/types/content";

type Props = {
  image?: ImageAsset;
  locale: Locale;
  /** Shown on the placeholder plate when no image exists yet. */
  title: string;
  figure: string;
  pendingLabel: string;
  /** CSS aspect-ratio, e.g. "16/9". */
  ratio: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Project imagery. Real images get a slow hover scale; missing images get
 * an honest drafting-table plate instead of a fake screenshot.
 */
export function ProjectVisual({
  image,
  locale,
  title,
  figure,
  pendingLabel,
  ratio,
  sizes,
  priority,
  className = "",
}: Props) {
  return (
    <div
      className={`bg-plate relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0 transition-transform duration-[1.4s] ease-(--ease-editorial) group-hover:scale-[1.035]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt[locale]}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="plate absolute inset-0">
            <span
              aria-hidden
              className="display text-ink/[0.07] absolute -bottom-[0.12em] left-[0.04em] text-[clamp(4rem,14vw,16rem)] leading-none whitespace-nowrap select-none"
            >
              {title}
            </span>
          </div>
        )}
      </div>
      {!image && (
        <>
          <span className="meta text-wine absolute top-4 left-4 md:top-5 md:left-5">{figure}</span>
          <span className="meta text-ink-muted absolute top-4 right-4 md:top-5 md:right-5">
            {pendingLabel}
          </span>
        </>
      )}
    </div>
  );
}
