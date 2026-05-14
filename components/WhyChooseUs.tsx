"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";
import { getIcon } from "@/lib/icons";

const why = content.whyChooseUs;

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden border-b border-border/40 bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-dot mask-radial-fade opacity-[0.15] dark:opacity-20" />
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[300px] w-[400px] -translate-x-1/4 rounded-full bg-orange-500/[0.05] blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Header: split left title / right paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary/70">
              {why.badge}
            </p>
            <h2
              className="font-extrabold tracking-[-0.025em] text-foreground"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.08 }}
            >
              {why.heading.before}{" "}
              <span className="text-gradient-orange">{why.heading.accent}</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground lg:text-right">
            {why.paragraph}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4"
        >
          {why.items.map(({ icon, title, desc }, i) => {
            const Icon = getIcon(icon);
            return (
              <motion.article
                key={title}
                variants={card}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
              >
                {/* Animated left accent */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-center scale-y-0 rounded-l-2xl bg-gradient-to-b from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover:scale-y-100" />

                {/* Hover radial glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(600px circle at 20% 50%, oklch(0.769 0.188 70.08 / 0.06), transparent 70%)",
                  }}
                  aria-hidden
                />

                <span className="relative grid size-11 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/10 text-primary ring-1 ring-inset ring-primary/20 transition-all duration-300 group-hover:ring-primary/50">
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
                  <Icon className="relative size-5" />
                </span>

                <div>
                  <h3 className="text-[17px] font-bold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>

                {/* Item number bottom right */}
                <span
                  className="pointer-events-none absolute bottom-3 right-4 select-none font-black text-foreground/[0.035]"
                  style={{ fontSize: "3.5rem", lineHeight: 1 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
