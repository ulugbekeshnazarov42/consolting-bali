"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Newspaper, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollableCardStack from "@/components/smoothui/scrollable-card-stack";
import { site } from "@/lib/site";

const newsCards = [
  {
    id: "singapore-intake",
    name: "Singapur qabul oynalari",
    handle: "Universitet · 2026",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    avatar:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=64&h=64&q=80",
    href: "#contact",
  },
  {
    id: "bali-pathway",
    name: "Bali: tayyorgarlik va til",
    handle: "Qisqa muddat · moslashuv",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    avatar:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=64&h=64&q=80",
    href: "#contact",
  },
  {
    id: "visa-docs",
    name: "Talabalik vizasi hujjatlari",
    handle: "Ro'yxat · intervyu",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    avatar:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=64&h=64&q=80",
    href: "#contact",
  },
  {
    id: "gulf-future",
    name: "Qatar va Dubay — keyingi qadam",
    handle: "Karyera · yo'l-yo'riq",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    avatar:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=64&h=64&q=80",
    href: "#contact",
  },
  {
    id: "free-chat",
    name: "Birinchi suhbat — bepul",
    handle: "Telegram · tez javob",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    avatar:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=64&h=64&q=80",
    href: site.social.telegram,
  },
];

function useNewsCardHeight() {
  const [height, setHeight] = React.useState(400);

  React.useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (mqLg.matches) setHeight(520);
      else if (mqMd.matches) setHeight(440);
      else setHeight(400);
    };
    update();
    mqLg.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
    };
  }, []);

  return height;
}

export default function NewsUpdates() {
  const cardHeight = useNewsCardHeight();

  return (
    <section
      id="news"
      className="relative overflow-hidden border-b border-border/60 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot mask-radial-fade opacity-25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/4 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid content-start items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Mobil: matn tepada; lg: kartalar o'ngda */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 flex w-full justify-center self-start lg:order-2 lg:col-span-7 lg:col-start-6 lg:row-start-1"
          >
            <div className="relative w-full max-w-[min(100vw-2rem,700px)] md:max-w-[min(100vw-3rem,840px)] lg:max-w-[min(100vw-4rem,940px)]">
              <div
                className="pointer-events-none absolute -inset-1 rounded-[2.1rem] bg-linear-to-br from-primary/25 via-orange-500/12 to-transparent opacity-80 blur-xl md:-inset-2 md:rounded-[2.25rem]"
                aria-hidden
              />
              <div className="relative overflow-visible rounded-[1.85rem] border border-border/50 bg-card/60 p-1 shadow-[0_20px_60px_-20px_color-mix(in_oklch,var(--foreground)_25%,transparent)] backdrop-blur-md md:rounded-[2rem] md:p-1.5">
                <div className="rounded-[1.65rem] bg-background/40 p-3 pb-12 ring-1 ring-inset ring-white/5 dark:bg-background/25 md:p-5 md:pb-14 md:rounded-[1.75rem]">
                  <ScrollableCardStack
                    cardHeight={cardHeight}
                    items={newsCards}
                    perspective={1300}
                    transitionDuration={200}
                    showArrowNav
                    className="mx-auto min-w-0 w-full max-w-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="order-1 flex w-full min-w-0 max-w-none flex-col items-stretch self-stretch lg:order-1 lg:col-span-5 lg:col-start-1 lg:row-start-1"
          >
            <Badge className="mb-5 w-fit gap-2 rounded-full border border-primary/35 bg-primary/12 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm shadow-primary/10 sm:mb-6">
              <Newspaper className="size-3.5" />
              Yangiliklar
            </Badge>
            <h2 className="text-balance font-heading text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.04] lg:text-6xl lg:leading-[1.05] xl:text-7xl xl:leading-[1.03]">
              Oxirgi{" "}
              <span className="text-gradient-orange">yangiliklar</span> va
              yo'l-yo'riqlar
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg lg:text-xl">
              Qabul muddatlari, hujjatlar va yo'nalishlar bo'yicha qisqa
              eslatmalar.
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 md:mt-8">
              <Button
                asChild
                size="lg"
                className="group h-12 w-full gap-2 rounded-full bg-primary px-7 text-base font-semibold shadow-lg shadow-primary/30 transition-shadow hover:shadow-xl hover:shadow-primary/35 sm:h-14"
              >
                <a href="#contact">
                  Maslahat olish
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-full border-border/70 bg-background/50 px-7 text-base font-medium backdrop-blur-sm hover:border-primary/40 hover:bg-muted/50 sm:h-14"
              >
                <a
                  href={site.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Send className="size-4 text-primary" />
                  Telegram
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
