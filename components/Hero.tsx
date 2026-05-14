"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

import { content, isExternalHref, resolveHref } from "@/lib/content";

const hero = content.hero;

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
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden border-b border-white/[0.06] bg-zinc-950 pt-20"
    >
      {/* ── Background ───────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {/* Fine grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:52px_52px]" />
        {/* Top arc glow */}
        <div className="absolute -top-[30%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
        {/* Bottom warm glow under panels */}
        <div className="absolute bottom-0 left-1/2 h-[340px] w-[800px] -translate-x-1/2 bg-primary/[0.07] blur-[100px]" />
      </div>

      {/* ── TOP: editorial text block ─────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 py-12 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

        {/* Eyebrow */}
        <motion.div {...up(0.08)} className="mb-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
            <Sparkles className="size-3 shrink-0" />
            {hero.badge}
          </span>
          <span className="h-px w-8 bg-gradient-to-r from-primary/40 to-transparent" />
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:inline">
            2024 · Premium
          </span>
        </motion.div>

        {/* Headline — three stacked lines */}
        <div className="mb-10 select-none">
          <motion.span
            {...up(0.18)}
            className="block font-extrabold leading-[0.9] tracking-[-0.025em] text-white/80"
            style={{ fontSize: "clamp(2.4rem, 6.8vw, 7rem)" }}
          >
            {hero.headline.before}
          </motion.span>

          <motion.span {...up(0.3)} className="relative my-1.5 block">
            <span
              className="text-gradient-orange relative inline-block font-extrabold leading-[0.9] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.4rem, 6.8vw, 7rem)" }}
            >
              {hero.headline.accent}
            </span>
            {/* Animated underline */}
            {!reduceMotion && (
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.95, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1.5 left-0 h-[2.5px] w-full origin-left rounded-full bg-gradient-to-r from-primary via-orange-400 to-transparent"
              />
            )}
          </motion.span>

          <motion.span
            {...up(0.4)}
            className="block font-extrabold leading-[0.9] tracking-[-0.025em] text-white/18"
            style={{ fontSize: "clamp(2.4rem, 6.8vw, 7rem)" }}
          >
            {hero.headline.after}
          </motion.span>
        </div>

        {/* Paragraph + CTAs */}
        <motion.div
          {...up(0.52)}
          className="flex flex-col gap-7 sm:flex-row sm:items-end sm:gap-12 lg:gap-20"
        >
          <p className="max-w-[400px] text-[15px] leading-relaxed text-zinc-400 sm:text-base lg:text-lg">
            {hero.paragraph}
          </p>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {/* Primary */}
            <a
              href={hero.primaryCta.href}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.5),0_8px_28px_-4px_oklch(0.769_0.188_70.08/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.7),0_14px_40px_-4px_oklch(0.769_0.188_70.08/0.75)]"
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
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
            >
              <FaTelegramPlane className="size-4 text-primary transition-transform duration-300 group-hover:scale-110" />
              {hero.secondaryCta.label}
            </a>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          {...up(0.64)}
          className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2.5 border-t border-white/[0.06] pt-7"
        >
          {hero.features.map(({ text }, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_6px_oklch(0.769_0.188_70.08)]" />
              <span className="text-[13px] font-semibold text-zinc-500">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── BOTTOM: Destination portals ────────────────── */}
      <DestinationPanels reduceMotion={!!reduceMotion} />
    </section>
  );
}

function DestinationPanels({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      className="relative z-10 grid grid-rows-2 border-t border-white/[0.06] sm:grid-cols-2 sm:grid-rows-1"
      style={{ minHeight: "clamp(320px, 38vh, 480px)" }}
    >
      {/* ── Singapore ── */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
        className="group relative overflow-hidden border-b border-white/[0.06] sm:border-b-0 sm:border-r"
      >
        <Image
          src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=75"
          alt="Singapur kampuslari"
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
        />
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-zinc-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/[0.04]" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 md:p-10">
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="rounded border border-primary/50 bg-primary/15 px-2 py-px font-mono text-[9px] font-extrabold tracking-widest text-primary">
              SGP
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-primary/70">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              {hero.card.destinations[0].tag}
            </span>
          </div>

          <h3
            className="font-extrabold leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
          >
            Singapur
          </h3>
          <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-zinc-400 sm:max-w-xs">
            {hero.card.destinations[0].note}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["NUS", "NTU", "SMU", "SP", "NYP"].map((u) => (
              <span
                key={u}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400"
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Bali ── */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.88, duration: 1.2, ease: "easeOut" }}
        className="group relative overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=75"
          alt="Bali"
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/65 to-zinc-950/10" />
        <div className="absolute inset-0 bg-gradient-to-l from-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-orange-950/0 transition-all duration-500 group-hover:bg-orange-950/[0.08]" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 md:p-10">
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="rounded border border-orange-400/50 bg-orange-400/10 px-2 py-px font-mono text-[9px] font-extrabold tracking-widest text-orange-400">
              DPS
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-orange-400/70">
              <span className="size-1.5 animate-pulse rounded-full bg-orange-400" />
              {hero.card.destinations[1].tag}
            </span>
          </div>

          <h3
            className="font-extrabold leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
          >
            Bali
          </h3>
          <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-zinc-400 sm:max-w-xs">
            {hero.card.destinations[1].note}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Intensiv Ingliz", "Pathway", "Moslashuv"].map((u) => (
              <span
                key={u}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400"
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center divider badge */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.45, type: "spring", stiffness: 240, damping: 20 }}
        className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:flex"
      >
        <div className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-zinc-950 shadow-[0_0_0_5px_oklch(0.098_0.004_285_/_0.9),0_12px_32px_-4px_rgba(0,0,0,0.8)] md:size-14">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500">
            yo&apos;l
          </span>
        </div>
      </motion.div>
    </div>
  );
}
