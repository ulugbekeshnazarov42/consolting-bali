"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { content } from "@/lib/content";
import { getIcon } from "@/lib/icons";

const process = content.process;

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-border/60 bg-background/60 py-24 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center md:max-w-3xl xl:max-w-4xl"
        >
          <Badge className="mb-5 gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {process.badge}
          </Badge>
          <h2 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl md:leading-[1.04] lg:text-6xl lg:leading-[1.05] xl:text-7xl xl:leading-[1.03]">
            <span className="text-gradient-orange">{process.heading.accent}</span>{" "}
            {process.heading.after}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {process.paragraph}
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl lg:max-w-6xl xl:max-w-7xl">
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-10">
            <div
              className="pointer-events-none absolute inset-x-4 top-8 hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent lg:inset-x-6 lg:top-12 xl:inset-x-8 xl:top-14 lg:block"
              aria-hidden
            />
            {process.steps.map(({ icon, title, desc, duration }, i) => {
              const Icon = getIcon(icon);
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="relative flex min-h-0 min-w-0 flex-col rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm lg:min-h-[320px] lg:rounded-3xl lg:p-8 xl:min-h-[340px] xl:p-10"
                >
                  <div className="flex items-center justify-between gap-3 lg:gap-4">
                    <span className="relative grid size-16 place-items-center rounded-2xl bg-linear-to-br from-primary to-orange-500 text-primary-foreground shadow-lg shadow-primary/30 lg:size-20 lg:rounded-3xl lg:shadow-xl xl:size-21">
                      <span className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/30 to-transparent lg:rounded-3xl" />
                      <Icon className="relative size-7 lg:size-8 xl:size-9" />
                    </span>
                    <span className="text-4xl font-extrabold tabular-nums text-transparent [-webkit-text-stroke:1px_color-mix(in_oklch,var(--muted-foreground)_40%,transparent)] lg:text-5xl xl:text-6xl">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight lg:mt-6 lg:text-xl xl:mt-7 xl:text-2xl xl:leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 min-w-0 flex-1 text-pretty text-sm leading-relaxed wrap-break-word text-muted-foreground lg:mt-3 lg:text-base lg:leading-relaxed xl:text-[1.0625rem] xl:leading-relaxed">
                    {desc}
                  </p>
                  <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary lg:mt-6 lg:gap-2 lg:px-3.5 lg:py-1.5 lg:text-sm xl:mt-7">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary lg:size-2" />
                    {duration}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
