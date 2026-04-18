"use client";

import { motion } from "motion/react";
import { FaTelegramPlane } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

import { SectionCtaLink } from "@/components/section-cta-link";
import { content, resolveHref, isExternalHref } from "@/lib/content";
import {
  SECTION_HEADING_ACCENT_CLASS,
  sectionHeadingClassName,
} from "@/lib/section-heading";

const cta = content.cta;

export default function CTA() {
  const secondaryHref = resolveHref(cta.secondaryCta.href);
  const secondaryIsExternal = isExternalHref(cta.secondaryCta.href);

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
              {cta.eyebrow}
            </span>

            <h2 className={sectionHeadingClassName({ className: "mt-6" })}>
              {cta.heading.before}{" "}
              <span className={SECTION_HEADING_ACCENT_CLASS}>
                {cta.heading.accent}
              </span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {cta.paragraph}
            </p>

            <div className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 md:max-w-none md:flex-row md:items-stretch md:gap-3">
              <SectionCtaLink
                href={cta.primaryCta.href}
                label={cta.primaryCta.label}
                variant="primary"
                className="shadow-xl shadow-primary/30 md:flex-1"
                icon={
                  <HiArrowUpRight
                    className="size-5 shrink-0 text-primary-foreground"
                    aria-hidden
                  />
                }
              />

              <SectionCtaLink
                href={secondaryHref}
                label={cta.secondaryCta.label}
                variant="outline"
                className="bg-background/40 md:flex-1"
                target={secondaryIsExternal ? "_blank" : undefined}
                rel={
                  secondaryIsExternal ? "noopener noreferrer" : undefined
                }
                icon={
                  <FaTelegramPlane
                    className="size-5 shrink-0 text-primary"
                    aria-hidden
                  />
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
