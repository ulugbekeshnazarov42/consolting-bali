"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type SectionCtaLinkProps = {
  href: string;
  label: React.ReactNode;
  variant: "primary" | "outline";
  tone?: "default" | "onDark";
  buttonSize?: "lg" | "md";
  icon: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<"a">, "href" | "className" | "children">;

/** Shadcn Button Slot bilan px/h merge buzilmasin — barcha o‘lcham `<a>` da. */
const focusRing =
  "outline-none select-none transition-[box-shadow,colors,transform] duration-200 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-px";

const primaryLg = cn(
  focusRing,
  "border border-transparent bg-primary text-primary-foreground shadow-[0_0_30px_-10px_var(--primary)] hover:bg-primary/95 hover:shadow-[0_0_50px_-10px_var(--primary)]",
);

const primaryMd = cn(
  focusRing,
  "border border-primary/50 bg-primary text-primary-foreground shadow-[0_0_20px_-5px_var(--primary)] hover:bg-primary/95 hover:shadow-[0_0_30px_-5px_var(--primary)]",
);

const outlineLgDefault = cn(
  focusRing,
  "border border-border/80 bg-background/90 text-foreground backdrop-blur-md hover:bg-muted hover:border-primary/50 dark:border-white/25 dark:bg-white/12 dark:text-white dark:hover:bg-white/18",
);

const outlineLgOnDark = cn(
  focusRing,
  "border border-white/30 bg-white/12 text-white backdrop-blur-md hover:border-white/45 hover:bg-white/18",
);

const outlineMdDefault = cn(
  focusRing,
  "border border-border/80 bg-background/90 text-foreground backdrop-blur-md hover:bg-muted dark:border-white/25 dark:bg-white/12 dark:text-white",
);

const iconPrimaryLg =
  "grid size-10 shrink-0 place-items-center rounded-full bg-black/25 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-105";

const iconPrimaryMd =
  "grid size-8 shrink-0 place-items-center rounded-full bg-black/30 transition-colors group-hover:bg-black/45";

const iconOutlineLgDefault =
  "grid size-10 shrink-0 place-items-center rounded-full border border-black/15 bg-black/8 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:border-white/25 dark:bg-white/12";

const iconOutlineLgOnDark =
  "grid size-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

const iconOutlineMdDefault =
  "grid size-8 shrink-0 place-items-center rounded-full border border-black/15 bg-black/8 dark:border-white/25 dark:bg-white/12";

/**
 * Marketing CTA — `<a>` to‘g‘ridan-to‘g‘ri: padding/width merge muammosi yo‘q.
 */
export function SectionCtaLink({
  href,
  label,
  variant,
  tone = "default",
  buttonSize = "lg",
  icon,
  className,
  ...anchorProps
}: SectionCtaLinkProps) {
  const onDark = tone === "onDark";
  const lg = buttonSize === "lg";

  const variantClasses =
    variant === "primary"
      ? lg
        ? primaryLg
        : primaryMd
      : lg
        ? onDark
          ? outlineLgOnDark
          : outlineLgDefault
        : outlineMdDefault;

  const iconWrap =
    variant === "primary"
      ? lg
        ? iconPrimaryLg
        : iconPrimaryMd
      : lg
        ? onDark
          ? iconOutlineLgOnDark
          : iconOutlineLgDefault
        : iconOutlineMdDefault;

  const layoutLg =
    "box-border inline-flex min-h-14 w-full max-w-full min-w-0 flex-nowrap items-center justify-between gap-3 rounded-full px-6 py-2.5 pl-7 pr-4 text-left text-base font-semibold leading-snug sm:gap-4 sm:px-8 sm:py-3 sm:pl-9 sm:pr-5";

  const layoutMd =
    "box-border inline-flex min-h-12 w-full max-w-full min-w-0 flex-nowrap items-center justify-between gap-2.5 rounded-full px-5 py-2 pl-6 pr-3 text-left text-sm font-semibold leading-snug sm:px-6 sm:pl-7 sm:pr-4";

  return (
    <a
      href={href}
      className={cn(
        "group no-underline whitespace-normal",
        lg ? layoutLg : layoutMd,
        variantClasses,
        className,
      )}
      {...anchorProps}
    >
      <span className="min-w-0 flex-1 pr-1 text-left break-words">{label}</span>
      <span className={cn(iconWrap, "[&_svg]:block")} aria-hidden>
        {icon}
      </span>
    </a>
  );
}
