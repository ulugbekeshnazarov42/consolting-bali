"use client";

import CountUp from "react-countup";
import { motion } from "motion/react";
import { content } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const stats = content.stats;

const borderMap = [
  "border-r border-b border-white/[0.07] lg:border-b-0",
  "border-b border-white/[0.07] lg:border-b-0 lg:border-r",
  "border-r border-white/[0.07] lg:border-r",
  "",
];

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950 py-24 md:py-32"
    >
      {/* bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 bg-primary/[0.08] blur-[130px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-20 text-center text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary/60"
        >
          {stats.badge}
        </motion.p>

        {/* Numbers grid */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.07]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.items.map(({ icon, value, suffix, label }, i) => {
              const Icon = getIcon(icon);
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: i * 0.09,
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    "group relative flex flex-col items-center gap-5 overflow-hidden px-6 py-12 text-center transition-colors duration-500 hover:bg-white/[0.02]",
                    borderMap[i],
                  )}
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.769_0.188_70.08_/_0.07),transparent)]" />

                  {/* Icon */}
                  <div className="relative grid size-11 place-items-center rounded-2xl bg-primary/10 ring-1 ring-inset ring-primary/25 transition-all duration-300 group-hover:bg-primary/15 group-hover:ring-primary/40">
                    <Icon className="size-5 text-primary" />
                  </div>

                  {/* Big number */}
                  <div>
                    <p
                      className="font-black leading-none tracking-[-0.04em] text-gradient-orange"
                      style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
                    >
                      <CountUp
                        end={value}
                        suffix={suffix}
                        duration={2.2}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-snug text-zinc-500">
                      {label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center text-[13px] font-semibold text-zinc-600"
        >
          {stats.heading.before}{" "}
          <span className="text-gradient-orange">{stats.heading.accent}</span>
        </motion.p>
      </div>
    </section>
  );
}
