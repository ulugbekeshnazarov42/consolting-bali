"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles, GraduationCap, Send, Plane, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { content, resolveHref, isExternalHref } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { usePrefersFinePointer } from "@/hooks/use-prefers-fine-pointer";

const hero = content.hero;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const headlineBlock = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
      when: "beforeChildren" as const,
    },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const finePointer = usePrefersFinePointer();

  const headlineLine = useMemo(
    () => ({
      hidden: reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 20, filter: "blur(7px)" as const },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: reduceMotion ? 0.2 : 0.62,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    }),
    [reduceMotion]
  );

  const headlineAccentMotion = useMemo(
    () => ({
      hidden: reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 26, filter: "blur(8px)" as const, scale: 0.98 },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: {
          duration: reduceMotion ? 0.2 : 0.68,
          ease: [0.14, 1, 0.28, 1] as const,
        },
      },
    }),
    [reduceMotion]
  );

  const headlineHover =
    !reduceMotion && finePointer
      ? {
          y: -3,
          transition: {
            type: "spring" as const,
            stiffness: 420,
            damping: 34,
            mass: 0.78,
          },
        }
      : undefined;

  const accentHover =
    !reduceMotion && finePointer
      ? {
          y: -1,
          scale: 1.025,
          transition: {
            type: "spring" as const,
            stiffness: 460,
            damping: 28,
          },
        }
      : undefined;

  const secondaryHref = resolveHref(hero.secondaryCta.href);
  const secondaryIsExternal = isExternalHref(hero.secondaryCta.href);

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-border/60"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-40" />
      <div
        className="pointer-events-none absolute -top-32 -left-32 size-[420px] rounded-full bg-primary/22 blur-[72px] motion-reduce:animate-none animate-aurora"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 size-[440px] rounded-full bg-orange-500/18 blur-[80px] motion-reduce:animate-none animate-aurora"
        style={{ animationDelay: "-4s" }}
        aria-hidden
      />

      <div className="container relative mx-auto grid max-w-[min(100%,100rem)] gap-10 px-3 pb-14 pt-14 sm:gap-12 sm:px-4 sm:pb-16 sm:pt-16 md:px-6 md:pb-24 md:pt-24 lg:grid-cols-12 lg:gap-14 lg:pt-28 xl:max-w-[min(100%,90rem)] 2xl:max-w-[min(100%,100rem)] 2xl:gap-16 2xl:pt-32 min-[1920px]:max-w-[min(100%,110rem)]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-7 overflow-visible lg:col-span-7"
        >
          <motion.div variants={item}>
            <Badge className="gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/15">
              <Sparkles className="size-3.5" />
              {hero.badge}
            </Badge>
          </motion.div>

          <motion.h1
            variants={headlineBlock}
            className={cn(
              "group/headline font-heading text-balance font-extrabold tracking-[-0.02em]",
              finePointer ? "cursor-default" : "cursor-text",
              "text-[clamp(1.75rem,6vw+0.35rem,2.45rem)] leading-[1.08]",
              "min-[375px]:text-[clamp(1.9rem,5.5vw+0.5rem,2.75rem)] min-[375px]:leading-[1.06]",
              "sm:text-[clamp(2.1rem,4.2vw+0.75rem,3.25rem)] sm:leading-[1.04]",
              "md:text-6xl md:leading-[1.02]",
              "lg:text-7xl lg:leading-[0.99] lg:tracking-[-0.03em]",
              "xl:text-8xl xl:leading-[0.98]",
              "2xl:max-w-[min(100%,52rem)] 2xl:text-[clamp(3.5rem,2.8vw+2rem,5.75rem)] 2xl:leading-[0.96]",
              "min-[1920px]:max-w-[min(100%,58rem)] min-[1920px]:text-[clamp(4rem,2.2vw+2.5rem,6.25rem)]",
              "[text-shadow:0_1px_0_color-mix(in_oklch,var(--background)_88%,transparent),0_18px_48px_-28px_color-mix(in_oklch,var(--foreground)_22%,transparent)]",
              "dark:[text-shadow:0_1px_0_color-mix(in_oklch,var(--background)_35%,transparent),0_22px_56px_-24px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
            )}
            style={{ transformOrigin: "0% 52%" }}
            whileHover={headlineHover}
          >
            <motion.span variants={headlineLine} className="inline-block">
              {hero.headline.before}
            </motion.span>{" "}
            <motion.span
              variants={headlineAccentMotion}
              whileHover={accentHover}
              className={cn(
                "relative inline-block pb-0.5",
                "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:rounded-full",
                "after:bg-gradient-to-r after:from-transparent after:via-primary/55 after:to-transparent",
                "after:opacity-0 after:transition-opacity after:duration-500 after:ease-out",
                finePointer && "after:group-hover/headline:opacity-100",
                "motion-reduce:after:opacity-0"
              )}
            >
              <span
                className={cn(
                  "text-gradient-orange relative z-1 inline-block",
                  "drop-shadow-[0_2px_14px_color-mix(in_oklch,var(--primary)_28%,transparent)]",
                  "transition-[filter] duration-300 ease-out",
                  finePointer && "group-hover/headline:brightness-[1.08]",
                  "motion-reduce:transition-none motion-reduce:group-hover/headline:brightness-100"
                )}
              >
                {hero.headline.accent}
              </span>
            </motion.span>{" "}
            <motion.span variants={headlineLine} className="inline-block">
              {hero.headline.after}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.paragraph}
          </motion.p>

          <motion.div
            variants={item}
            className="flex w-full max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="group h-12 w-full gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 sm:w-auto"
            >
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group h-12 w-full gap-2 rounded-full border-border/60 bg-background/40 px-6 text-base font-medium backdrop-blur hover:bg-muted/60 sm:w-auto"
            >
              <a
                href={secondaryHref}
                target={secondaryIsExternal ? "_blank" : undefined}
                rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
              >
                <Send className="size-4 text-primary" />
                {hero.secondaryCta.label}
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2"
          >
            {hero.features.map(({ icon, text }) => {
              const Icon = getIcon(icon);
              return (
                <div
                  key={text}
                  className="flex w-full min-w-0 items-center gap-2 text-sm text-muted-foreground sm:w-auto"
                >
                  <Icon className="size-4 shrink-0 text-primary" />
                  <span className="min-w-0">{text}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  const card = hero.card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, rotateX: -6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative lg:col-span-5"
      style={{ perspective: 1100 }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.65rem] border border-border/50 bg-card/90 shadow-[0_24px_80px_-24px_color-mix(in_oklch,var(--primary)_28%,transparent)]",
          "ring-1 ring-inset ring-white/5 dark:ring-white/10"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_100%_-10%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay [background-image:repeating-linear-gradient(-12deg,transparent,transparent_3px,color-mix(in_oklch,var(--foreground)_6%,transparent)_3px,color-mix(in_oklch,var(--foreground)_6%,transparent)_4px)]"
          aria-hidden
        />

        <div className="relative border-b border-dashed border-border/50 bg-gradient-to-r from-primary/12 via-primary/5 to-transparent px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-inner shadow-primary/10">
                <Route className="size-[18px]" strokeWidth={2} />
              </span>
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                  {card.eyebrow}
                </p>
                <p className="mt-1 font-heading text-lg font-extrabold leading-tight tracking-tight text-balance sm:text-xl">
                  {card.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm sm:self-auto">
              <Plane className="size-3.5 shrink-0 text-primary" aria-hidden />
              <span className="tabular-nums tracking-tight">{card.badge}</span>
            </div>
          </div>
        </div>

        <div className="relative px-5 pb-2 pt-6 sm:px-6 sm:pt-7">
          <div className="relative">
            <div
              className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-primary/45 to-orange-500/50 sm:left-[17px]"
              aria-hidden
            />

            <ul className="relative flex flex-col gap-0">
              {card.destinations.map((d, i) => (
                <motion.li
                  key={d.city}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.48 + i * 0.1,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    "relative flex gap-4 pb-8 pl-10 sm:gap-5 sm:pb-9 sm:pl-11",
                    i === card.destinations.length - 1 && "pb-2 sm:pb-2"
                  )}
                >
                  <span
                    className="absolute left-2 top-2.5 z-[1] grid size-4 place-items-center rounded-full border-2 border-background bg-primary shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_35%,transparent)] sm:left-[11px] sm:top-2.5 sm:size-[18px]"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 gap-y-1">
                      <div className="flex min-w-0 items-baseline gap-2">
                        <span className="font-mono text-[11px] font-bold tabular-nums tracking-[0.2em] text-primary sm:text-xs">
                          {d.code}
                        </span>
                        <span className="font-heading text-base font-bold tracking-tight sm:text-lg">
                          {d.city}
                        </span>
                      </div>
                      <span className="max-w-full rounded-md border border-border/50 bg-muted/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {d.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {d.note}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-dashed border-border/55 bg-muted/15 px-5 py-4 sm:px-6">
          <p className="text-center text-[12px] leading-relaxed text-muted-foreground sm:text-left">
            <span className="font-semibold text-foreground">{card.footer.bold}</span>
            {card.footer.text}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -12, y: 14 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.05, duration: 0.55 }}
        className="absolute -left-3 -top-3 z-[2] hidden sm:block"
      >
        <div className="motion-reduce:animate-none rotate-[-8deg] rounded-lg border-2 border-primary/40 bg-background/95 px-2.5 py-1.5 shadow-lg shadow-primary/15 ring-2 ring-background animate-float">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-primary" aria-hidden />
            <div className="leading-tight">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {card.stamp.eyebrow}
              </p>
              <p className="font-heading text-xs font-bold">{card.stamp.text}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
