"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

import { content, isExternalHref, resolveHref } from "@/lib/content";
import { cn } from "@/lib/utils";

const hero = content.hero;

/* ── Per-destination color themes ─────────────────── */
const themes = [
  {
    codeBorder: "border-primary/50",
    codeBg: "bg-primary/15",
    codeText: "text-primary",
    tagText: "text-primary/70",
    dot: "bg-primary",
    hoverOverlay: "group-hover:bg-primary/[0.04]",
    sideGrad: "bg-gradient-to-r from-zinc-950/40 to-transparent",
  },
  {
    codeBorder: "border-orange-400/50",
    codeBg: "bg-orange-400/10",
    codeText: "text-orange-400",
    tagText: "text-orange-400/70",
    dot: "bg-orange-400",
    hoverOverlay: "group-hover:bg-orange-950/[0.07]",
    sideGrad: "bg-gradient-to-l from-zinc-950/40 to-transparent",
  },
  {
    codeBorder: "border-emerald-400/50",
    codeBg: "bg-emerald-400/10",
    codeText: "text-emerald-400",
    tagText: "text-emerald-400/70",
    dot: "bg-emerald-400",
    hoverOverlay: "group-hover:bg-emerald-950/[0.07]",
    sideGrad: "bg-gradient-to-r from-zinc-950/30 to-transparent",
  },
];

/* ── Single destination panel ─────────────────────── */
type Dest = (typeof hero.card.destinations)[number];

function DestPanel({
  dest,
  index,
  reduceMotion,
  sizes,
  className,
}: {
  dest: Dest;
  index: number;
  reduceMotion: boolean;
  sizes: string;
  className?: string;
}) {
  const th = themes[index % themes.length];
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.65 + index * 0.15, duration: 1.1, ease: "easeOut" }}
      className={cn("group relative overflow-hidden", className)}
    >
      <Image
        src={dest.image}
        alt={dest.city}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/08" />
      <div className={cn("absolute inset-0 to-transparent", th.sideGrad)} />
      <div className={cn("absolute inset-0 transition-colors duration-500", th.hoverOverlay)} />

      {/* content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 xl:p-10">
        <div className="mb-2 flex items-center gap-2">
          <span className={cn("rounded border px-2 py-px font-mono text-[9px] font-extrabold tracking-widest", th.codeBorder, th.codeBg, th.codeText)}>
            {dest.code}
          </span>
          <span className={cn("flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em]", th.tagText)}>
            <span className={cn("size-1.5 animate-pulse rounded-full", th.dot)} />
            {dest.tag}
          </span>
        </div>

        <h3
          className="font-extrabold leading-none tracking-tight text-white"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.4rem)" }}
        >
          {dest.city}
        </h3>
        <p className="mt-1.5 max-w-[220px] text-[11px] leading-relaxed text-zinc-400 sm:max-w-xs sm:text-[12px] md:text-[13px]">
          {dest.note}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {dest.unis.map((u: string) => (
            <span
              key={u}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-400 sm:text-[9px]"
            >
              {u}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Destination panels section ───────────────────── */
function DestinationPanels({ reduceMotion }: { reduceMotion: boolean }) {
  const dests = hero.card.destinations;
  const n = dests.length;

  return (
    <div className="relative z-10 border-t border-white/[0.06]">
      {/* ── Mobile: horizontal scroll strip ── */}
      <div
        className="flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:hidden"
        style={{ height: "clamp(210px, 40vh, 300px)" }}
      >
        {dests.map((dest, i) => (
          <DestPanel
            key={dest.code}
            dest={dest}
            index={i}
            reduceMotion={reduceMotion}
            sizes="78vw"
            className="relative flex-none w-[78vw] border-r border-white/[0.06] last:border-r-0"
          />
        ))}
        {/* Fade hint that more cards exist */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-zinc-950/70 to-transparent sm:hidden" />
      </div>

      {/* ── sm+: grid layout ── */}
      <div
        className={cn(
          "hidden sm:grid",
          n === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        )}
        style={{ height: "clamp(260px, 36vh, 440px)" }}
      >
        {dests.map((dest, i) => (
          <DestPanel
            key={dest.code}
            dest={dest}
            index={i}
            reduceMotion={reduceMotion}
            sizes={`(max-width: 768px) 33vw, ${Math.round(100 / n)}vw`}
            className={cn(
              i < n - 1 && "border-r border-white/[0.06]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Hero ────────────────────────────────────── */
export default function Hero() {
  const reduceMotion = useReducedMotion();

  const up = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const secondaryHref = resolveHref(hero.secondaryCta.href);
  const secondaryIsExternal = isExternalHref(hero.secondaryCta.href);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden border-b border-white/[0.06] bg-zinc-950 pt-16 sm:pt-20"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:52px_52px]" />
        <div className="absolute -top-[30%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 h-[340px] w-[800px] -translate-x-1/2 bg-primary/[0.07] blur-[100px]" />
      </div>

      {/* ── Text block ── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-16 xl:px-24 2xl:px-32">

        {/* Eyebrow */}
        <motion.div {...up(0.08)} className="mb-6 sm:mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary backdrop-blur-sm sm:px-4">
            <Sparkles className="size-3 shrink-0" />
            {hero.badge}
          </span>
          <span className="h-px w-8 bg-gradient-to-r from-primary/40 to-transparent" />
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:inline">
            2024 · Premium
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-7 sm:mb-10 select-none">
          <motion.span
            {...up(0.18)}
            className="block font-extrabold leading-[0.9] tracking-[-0.025em] text-white/80"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 7rem)" }}
          >
            {hero.headline.before}
          </motion.span>

          <motion.span {...up(0.3)} className="relative my-1 sm:my-1.5 block">
            <span
              className="text-gradient-orange relative inline-block font-extrabold leading-[0.9] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.2rem, 6.5vw, 7rem)" }}
            >
              {hero.headline.accent}
            </span>
            {!reduceMotion && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.95, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1 sm:-bottom-1.5 left-0 h-[2px] sm:h-[2.5px] w-full origin-left rounded-full bg-gradient-to-r from-primary via-orange-400 to-transparent"
              />
            )}
          </motion.span>

          <motion.span
            {...up(0.4)}
            className="block font-extrabold leading-[0.9] tracking-[-0.025em] text-white/18"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 7rem)" }}
          >
            {hero.headline.after}
          </motion.span>
        </div>

        {/* Paragraph + CTAs */}
        <motion.div
          {...up(0.52)}
          className="flex flex-col gap-6 sm:gap-7 sm:flex-row sm:items-end sm:gap-12 lg:gap-20"
        >
          <p className="max-w-[380px] text-[14px] leading-relaxed text-zinc-400 sm:text-[15px] lg:text-lg">
            {hero.paragraph}
          </p>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {/* Primary */}
            <a
              href={hero.primaryCta.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-3 text-sm font-bold text-zinc-950 shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.5),0_8px_28px_-4px_oklch(0.769_0.188_70.08/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.7),0_14px_40px_-4px_oklch(0.769_0.188_70.08/0.75)] sm:px-6 sm:py-3.5"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
              <span className="relative">{hero.primaryCta.label}</span>
              <HiArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Secondary */}
            <a
              href={secondaryHref}
              target={secondaryIsExternal ? "_blank" : undefined}
              rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 sm:px-6 sm:py-3.5"
            >
              <FaTelegramPlane className="size-4 text-primary" />
              {hero.secondaryCta.label}
            </a>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          {...up(0.64)}
          className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-6 sm:mt-8 sm:gap-x-7 sm:pt-7"
        >
          {hero.features.map(({ text }, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_6px_oklch(0.769_0.188_70.08)]" />
              <span className="text-[12px] font-semibold text-zinc-500 sm:text-[13px]">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Destination portals ── */}
      <DestinationPanels reduceMotion={!!reduceMotion} />
    </section>
  );
}
