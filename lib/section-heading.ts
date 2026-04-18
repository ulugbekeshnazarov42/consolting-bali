import { cn } from "@/lib/utils";

/** Gradient accent span (before / accent / after pattern). */
export const SECTION_HEADING_ACCENT_CLASS = "text-gradient-orange";

const SECTION_HEADING_SCALE =
  "font-heading text-balance font-extrabold uppercase tracking-[0.035em] sm:tracking-[0.04em] " +
  "text-[clamp(1.85rem,4.2vw+0.45rem,2.65rem)] sm:text-[clamp(2.05rem,3.4vw+0.55rem,2.95rem)] " +
  "md:text-[clamp(2.3rem,2.5vw+0.65rem,3.25rem)] lg:text-[clamp(2.65rem,1.7vw+0.85rem,3.55rem)] xl:text-[clamp(2.9rem,1.15vw+1rem,3.95rem)] " +
  "leading-[1.09] sm:leading-[1.07] md:leading-[1.055] lg:leading-[1.045] xl:leading-[1.04]";

/** Qorong‘i fon ustidagi katta sarlavha (#news kabi ikkilamchi ustun). */
const SECTION_HEADING_SCALE_NEWS =
  "font-heading text-balance font-extrabold uppercase tracking-[0.03em] sm:tracking-[0.038em] " +
  "text-[clamp(2.05rem,5.4vw+0.55rem,3rem)] sm:text-[clamp(2.35rem,4.5vw+0.65rem,3.35rem)] " +
  "md:text-[clamp(2.55rem,3.4vw+0.75rem,3.65rem)] lg:text-[clamp(2.85rem,2.4vw+0.95rem,4rem)] xl:text-[clamp(3.1rem,1.6vw+1.15rem,4.35rem)] " +
  "leading-[1.1] sm:leading-[1.08] md:leading-[1.06] lg:leading-[1.05] xl:leading-[1.04]";

/**
 * Unified marketing section <h2> typography (Services, Process, FAQ, …).
 * @param inverse — dark / video-style sections (oq matn).
 * @param variant — `news`: kattaroq shrift, yangiliklar blokiga mos.
 */
export function sectionHeadingClassName(options?: {
  inverse?: boolean;
  className?: string;
  variant?: "default" | "news";
}) {
  const scale =
    options?.variant === "news" ? SECTION_HEADING_SCALE_NEWS : SECTION_HEADING_SCALE;

  return cn(
    scale,
    options?.inverse
      ? "text-white drop-shadow-[0_2px_32px_rgba(0,0,0,0.5)]"
      : "text-foreground",
    options?.className
  );
}
