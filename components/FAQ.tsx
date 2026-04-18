"use client";

import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { content } from "@/lib/content";
import {
  SECTION_HEADING_ACCENT_CLASS,
  sectionHeadingClassName,
} from "@/lib/section-heading";

const faq = content.faq;

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-border/60 bg-background/60 py-24 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge className="mb-5 gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <HelpCircle className="size-3.5" />
            {faq.badge}
          </Badge>
          <h2 className={sectionHeadingClassName()}>
            {faq.heading.before}{" "}
            <span className={SECTION_HEADING_ACCENT_CLASS}>{faq.heading.accent}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {faq.paragraph}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border/60 bg-card/60 p-2 backdrop-blur-sm md:p-4"
        >
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="px-4 not-last:border-b border-border/60"
              >
                <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold tracking-tight hover:no-underline hover:text-primary md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
