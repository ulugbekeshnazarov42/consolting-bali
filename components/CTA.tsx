"use client";

import { motion } from "motion/react";
import { FaTelegramPlane } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { content, isExternalHref, resolveHref } from "@/lib/content";

const cta = content.cta;

export default function CTA() {
  const secondaryHref = resolveHref(cta.secondaryCta.href);
  const secondaryIsExternal = isExternalHref(cta.secondaryCta.href);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-28 md:py-40">
      {/* bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:56px_56px]" />
        {/* Center mega glow */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.13] blur-[160px]" />
        <div className="absolute -left-24 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-primary/[0.08] blur-[90px]" />
        <div className="absolute -right-24 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[90px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary/60"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
              <span className="relative size-1.5 rounded-full bg-primary" />
            </span>
            {cta.eyebrow}
          </motion.p>

          {/* Mega headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-extrabold tracking-[-0.032em] text-white"
            style={{ fontSize: "clamp(2.2rem, 7vw, 5.8rem)", lineHeight: 0.95 }}
          >
            {cta.heading.before}{" "}
            <span className="text-gradient-orange">{cta.heading.accent}</span>
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-zinc-400 sm:text-base"
          >
            {cta.paragraph}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {/* Primary */}
            <a
              href={cta.primaryCta.href}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-bold text-zinc-950 shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.5),0_8px_36px_-4px_oklch(0.769_0.188_70.08/0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.7),0_16px_52px_-4px_oklch(0.769_0.188_70.08/0.8)]"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
              <span className="relative">{cta.primaryCta.label}</span>
              <HiArrowUpRight className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Secondary */}
            <a
              href={secondaryHref}
              target={secondaryIsExternal ? "_blank" : undefined}
              rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
            >
              <FaTelegramPlane className="size-4.5 text-primary transition-transform duration-300 group-hover:scale-110" />
              {cta.secondaryCta.label}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
