"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";
import { getIcon } from "@/lib/icons";

const process = content.process;

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-primary/[0.07] blur-[130px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary/60">
              {process.badge}
            </p>
            <h2
              className="font-extrabold tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.08 }}
            >
              <span className="text-gradient-orange">{process.heading.accent}</span>{" "}
              <span className="text-white/70">{process.heading.after}</span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-zinc-500">
            {process.paragraph}
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {/* Connecting line (desktop) */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[3.5rem] hidden h-px lg:block"
            aria-hidden
          >
            <div className="mx-auto h-px max-w-full bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
          </div>

          {process.steps.map(({ icon, title, desc, duration }, i) => {
            const Icon = getIcon(icon);
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-colors duration-300 hover:border-primary/25 hover:bg-white/[0.04] lg:p-7"
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.769 0.188 70.08 / 0.09), transparent)",
                  }}
                  aria-hidden
                />

                {/* Icon + Step number */}
                <div className="relative mb-7 flex items-start justify-between">
                  <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-orange-600 shadow-[0_8px_24px_-6px_oklch(0.769_0.188_70.08_/_0.65)] ring-1 ring-white/15">
                    <Icon className="size-6 text-white" strokeWidth={1.5} />
                  </div>
                  {/* Connector dot (desktop) */}
                  <span className="absolute -top-6 left-7 hidden size-2 rounded-full bg-primary shadow-[0_0_8px_oklch(0.769_0.188_70.08)] lg:block" />
                  <span
                    className="select-none font-black leading-none text-white/[0.055]"
                    style={{ fontSize: "clamp(4rem,10vw,6.5rem)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-white lg:text-xl">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 lg:text-[15px]">
                  {desc}
                </p>

                {/* Duration */}
                <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {duration}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
