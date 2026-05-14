"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { content } from "@/lib/content";

const faq = content.faq;

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-white/[0.06] bg-zinc-950 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[500px] translate-y-1/3 rounded-full bg-primary/[0.07] blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">

          {/* Left: sticky heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 lg:col-span-2 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary/60">
              {faq.badge}
            </p>
            <h2
              className="font-extrabold tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1.1 }}
            >
              {faq.heading.before}{" "}
              <span className="text-gradient-orange">{faq.heading.accent}</span>
            </h2>
            <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            <p className="text-[15px] leading-relaxed text-zinc-400">
              {faq.paragraph}
            </p>
            <a
              href="#contact"
              className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary/80 transition-colors hover:text-primary"
            >
              Boshqa savol bormi? →
            </a>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="lg:col-span-3"
          >
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {faq.items.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.025] px-5 transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/[0.04] hover:border-white/[0.12]"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left text-[15px] font-semibold tracking-tight text-zinc-200 hover:no-underline hover:text-white data-[state=open]:text-primary [&>svg]:text-zinc-600 [&>svg]:data-[state=open]:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[14px] leading-relaxed text-zinc-400">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
