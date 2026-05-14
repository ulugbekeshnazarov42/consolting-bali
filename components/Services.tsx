"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const services = content.services;

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-border/40 bg-background py-24 md:py-32"
    >
      {/* Ambient bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-dot mask-radial-fade opacity-[0.18] dark:opacity-25" />
        <div className="absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mb-16 flex flex-col items-start gap-4"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary/70">
            {services.badge}
          </p>
          <h2
            className="max-w-xl font-extrabold tracking-[-0.025em] text-foreground"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.08 }}
          >
            {services.heading.before}{" "}
            <span className="text-gradient-orange">{services.heading.accent}</span>
          </h2>
          <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            {services.paragraph}
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-3.5"
        >
          {services.items.map(({ icon, title, desc, tags, span }, i) => {
            const Icon = getIcon(icon);
            const isWide = span?.includes("col-span-2");

            return (
              <motion.article
                key={title}
                variants={cardVariant}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:bg-card/70",
                  "dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:bg-white/[0.05]",
                  span,
                )}
              >
                {/* Hover radial glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(500px circle at 30% 0%, oklch(0.769 0.188 70.08 / 0.1), transparent 65%)",
                  }}
                  aria-hidden
                />

                {/* Large faded index */}
                <span
                  className="pointer-events-none absolute right-4 top-0 select-none font-black leading-none text-foreground/[0.04] dark:text-white/[0.04]"
                  style={{ fontSize: "clamp(5rem,14vw,9rem)" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={cn("relative flex flex-col gap-4 p-6 md:p-7", isWide && "md:flex-row md:items-start md:gap-8")}>
                  {/* Icon */}
                  <div className="shrink-0">
                    <span className="relative grid size-12 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-orange-500/10 ring-1 ring-inset ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
                      <Icon className="relative size-5 text-primary" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[17px] font-bold capitalize tracking-tight text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </p>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground before:inline-block before:size-1 before:rounded-full before:bg-primary/40"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href={services.cardHrefTemplate}
                        aria-label={`${title} ${services.srAriaAsk}`}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground dark:bg-black/30 dark:group-hover:bg-primary"
                      >
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
