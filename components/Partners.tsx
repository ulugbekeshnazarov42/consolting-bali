"use client";

import Marquee from "react-fast-marquee";
import { motion } from "motion/react";

const partners = [
  "UzCard",
  "Humans",
  "Kapitalbank",
  "Beeline",
  "Uztelecom",
  "Ucell",
  "Artel",
  "Uzum",
  "Anorbank",
  "Alif",
  "EPAM",
  "Deloitte",
];

export default function Partners() {
  return (
    <section
      aria-label="Hamkorlar"
      className="relative border-b border-border/60 bg-background/60 py-12"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground"
        >
          150+ kompaniya ishonch bildirgan
        </motion.p>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent"
            aria-hidden
          />

          <Marquee autoFill pauseOnHover speed={40} className="py-2">
            {partners.map((name) => (
              <div
                key={name}
                className="mx-4 flex h-14 min-w-[160px] items-center justify-center rounded-xl border border-border/50 bg-card/40 px-8 text-base font-semibold tracking-tight text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              >
                {name}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
