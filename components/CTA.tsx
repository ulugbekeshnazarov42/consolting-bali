"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/15 via-card/80 to-orange-500/10 p-10 text-center shadow-2xl shadow-primary/10 backdrop-blur-sm md:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-30"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-primary/28 blur-[64px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-orange-500/18 blur-[64px]"
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 motion-reduce:animate-none animate-ping rounded-full bg-primary/60" />
                <span className="relative size-1.5 rounded-full bg-primary" />
              </span>
              Keyingi qadam
            </span>

            <h2 className="mt-6 text-balance text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Ta'lim yo'lingizni{" "}
              <span className="text-gradient-orange">birga rejalashtiramiz</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Qisqa suhbatda maqsadingizni tinglaymiz va keyingi qadamlarni
              tushunarli qilib beramiz. Hech qanday majburiyat yo'q — faqat
              ochiq maslahat.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group h-12 gap-2 rounded-full bg-primary px-7 text-base font-semibold shadow-xl shadow-primary/30 hover:bg-primary/90"
              >
                <a href="#contact">
                  Bepul konsultatsiya
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 gap-2 rounded-full border-border/60 bg-background/40 px-7 text-base font-medium backdrop-blur hover:bg-muted/60"
              >
                <a href={site.social.telegram} target="_blank" rel="noopener noreferrer">
                  <Send className="size-4 text-primary" />
                  Telegramda yozish
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
