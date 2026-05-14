"use client";

import ScrollableCardStack from "@/components/smoothui/scrollable-card-stack";
import { content, isExternalHref, resolveHref } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { FaTelegramPlane } from "react-icons/fa";

const news = content.news;

const resolvedCards = news.cards.map((c) => ({
  ...c,
  href: resolveHref(c.href),
}));

function useCardHeight() {
  const [h, setH] = React.useState(420);
  React.useEffect(() => {
    const upd = () =>
      setH(window.innerWidth >= 1024 ? 520 : window.innerWidth >= 768 ? 460 : 420);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);
  return h;
}

export default function NewsUpdates() {
  const cardHeight = useCardHeight();
  const secondaryHref = resolveHref(news.secondaryCta.href);
  const secondaryIsExternal = isExternalHref(news.secondaryCta.href);

  return (
    <section
      id="news"
      className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950 py-24 md:py-32"
    >
      {/* bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/[0.1] blur-[130px]" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-orange-500/[0.07] blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">

          {/* ── LEFT: text ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Section number accent */}
            <p className="mb-6 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary/60">
              {news.badge}
            </p>

            {/* Headline */}
            <h2
              className="font-extrabold leading-[1.04] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
            >
              <span className="text-white/80">{news.heading.before} </span>
              <span className="text-gradient-orange">{news.heading.accent}</span>
              {news.heading.after && (
                <span className="block mt-1 text-white/35" style={{ fontSize: "0.7em" }}>
                  {news.heading.after}
                </span>
              )}
            </h2>

            {/* Divider */}
            <div className="my-8 h-px w-16 bg-gradient-to-r from-primary to-transparent" />

            {/* Paragraph */}
            <p className="max-w-md text-[15px] leading-relaxed text-zinc-400 sm:text-base">
              {news.paragraph}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary */}
              <a
                href={news.primaryCta.href}
                className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.5),0_8px_28px_-4px_oklch(0.769_0.188_70.08/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.7),0_14px_40px_-4px_oklch(0.769_0.188_70.08/0.7)]"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
                <span className="relative">{news.primaryCta.label}</span>
                <ArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              {/* Secondary */}
              <a
                href={secondaryHref}
                target={secondaryIsExternal ? "_blank" : undefined}
                rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
              >
                <FaTelegramPlane className="size-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                {news.secondaryCta.label}
              </a>
            </div>

            {/* Small feature dots */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.06] pt-8">
              {["Tasdiqlangan ma'lumotlar", "Haftalik yangilanadi", "Ekspert tahlili"].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_oklch(0.769_0.188_70.08)]" />
                  <span className="text-[12px] font-semibold text-zinc-600">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: card stack ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="flex w-full justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[min(100vw-2rem,520px)]">
              {/* Outer glow */}
              <div
                className="pointer-events-none absolute -inset-3 rounded-[2.5rem] blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, oklch(0.769 0.188 70.08 / 0.2), transparent 70%)",
                }}
                aria-hidden
              />

              {/* Card container */}
              <div className="relative overflow-visible rounded-[2rem] border border-white/[0.08] bg-black/50 p-2 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.7rem] border border-white/[0.04] bg-zinc-900/60 p-4 pb-14 md:p-6 md:pb-16">
                  <ScrollableCardStack
                    cardHeight={cardHeight}
                    items={resolvedCards}
                    perspective={1300}
                    transitionDuration={200}
                    showArrowNav
                    className="relative z-20 mx-auto w-full max-w-full min-w-0"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
