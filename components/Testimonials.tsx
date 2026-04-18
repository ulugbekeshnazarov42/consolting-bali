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
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "Nexora jamoasi biz bilan 6 oy davomida ishladi va kompaniyamiz daromadini 3.2 barobarga oshirdi. Strategiyalari shaffof va natijaga yo'naltirilgan.",
    name: "Aziz Karimov",
    role: "CEO, TechSoft Uzbekistan",
    rating: 5,
  },
  {
    text: "Raqamli transformatsiya loyihasi kutilganidan tez va aniqlik bilan yakunlandi. CRM va ERP to'liq integratsiya qilindi. Tavsiya qilaman!",
    name: "Malika Yusupova",
    role: "COO, Humans Retail",
    rating: 5,
  },
  {
    text: "M&A bitimimizda due diligence va baholashni yuqori darajada bajarishdi. Professional, ishonchli va hamisha aloqada bo'lgan jamoa.",
    name: "Shoxrux Abdullayev",
    role: "Founder, Alif Capital",
    rating: 5,
  },
  {
    text: "Brend strategiyasi va marketing kampaniyalaridan so'ng yangi mijozlar oqimi 4 barobarga ko'paydi. Nexora haqiqatan ham o'z ishining ustalari.",
    name: "Dilnoza Xolmatova",
    role: "CMO, Artel Group",
    rating: 5,
  },
  {
    text: "Investitsiya jalb qilish uchun to'liq tayyorgarlik va investorlar bilan muzokaralar — hammasi kafolat. Seriya A muvaffaqiyatli yopildi.",
    name: "Rustam Nazarov",
    role: "CFO, FinTech Solutions",
    rating: 5,
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selected, setSelected] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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
              Mijozlar fikri
            </Badge>
            <h2 className={sectionHeadingClassName()}>
              Natijalar{" "}
              <span className={SECTION_HEADING_ACCENT_CLASS}>
                o&apos;z-o&apos;zidan gapiradi
              </span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Biz bilan ishlagan yetakchi kompaniyalarning haqiqiy tajribasi.
            </p>
          </motion.div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Oldingi"
              disabled={!canScrollPrev}
              onClick={() => emblaApi?.scrollPrev()}
              className="size-11 rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Keyingi"
              disabled={!canScrollNext}
              onClick={() => emblaApi?.scrollNext()}
              className="size-11 rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                className="relative flex min-w-0 shrink-0 basis-[85%] flex-col gap-6 rounded-3xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm md:basis-[48%] lg:basis-[32%]"
              >
                <Quote
                  className="absolute right-6 top-6 size-10 text-primary/15"
                  strokeWidth={1.5}
                />
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <Star
                      key={r}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  "{t.text}"
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
                  <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-orange-500 text-sm font-bold text-primary-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Slaydga o'tish ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
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
