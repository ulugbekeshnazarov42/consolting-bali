"use client";

import * as React from "react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SECTION_HEADING_ACCENT_CLASS,
  sectionHeadingClassName,
} from "@/lib/section-heading";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

const t = content.testimonials;

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selected, setSelected] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-b border-border/60 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-64 w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <Badge className="mb-5 gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {t.badge}
            </Badge>
            <h2 className={sectionHeadingClassName()}>
              {t.heading.before}{" "}
              <span className={SECTION_HEADING_ACCENT_CLASS}>
                {t.heading.accent}
              </span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t.paragraph}</p>
          </motion.div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Oldingi"
              onClick={() => emblaApi?.scrollPrev()}
              className="size-11 rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Keyingi"
              onClick={() => emblaApi?.scrollNext()}
              className="size-11 rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {t.items.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                className="group relative flex min-w-0 shrink-0 basis-[88%] flex-col gap-5 rounded-3xl border border-border/60 bg-card/60 p-7 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80 md:basis-[48%] lg:basis-[32%]"
              >
                <Quote
                  className="absolute right-6 top-6 size-9 text-primary/15"
                  strokeWidth={1.5}
                />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, r) => (
                    <Star key={r} className="size-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20">
                    {item.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{item.name}</p>
                    <p className="text-xs text-primary/80 font-medium">{item.program}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {t.items.map((_, i) => (
            <button
              key={i}
              aria-label={`Slaydga o'tish ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selected
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
