"use client";

import ScrollableCardStack from "@/components/smoothui/scrollable-card-stack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { content, isExternalHref, resolveHref } from "@/lib/content";
import {
  SECTION_HEADING_ACCENT_CLASS,
  sectionHeadingClassName,
} from "@/lib/section-heading";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowUpRight, Send, Sparkles } from "lucide-react";
import { motion } from "motion/react"; // Yoki framer-motion
import * as React from "react";

const news = content.news;
const resolvedCards = news.cards.map((c) => ({
  ...c,
  href: resolveHref(c.href),
}));

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

// --- GSAP Magnetic Button Component ---
function MagneticElement({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block w-full z-10">
      {children}
    </div>
  );
}

export default function NewsUpdates() {
  const cardHeight = useNewsCardHeight();
  const secondaryHref = resolveHref(news.secondaryCta.href);
  const secondaryIsExternal = isExternalHref(news.secondaryCta.href);

  // GSAP Refs
  const sectionRef = React.useRef<HTMLElement>(null);
  const orb1Ref = React.useRef<HTMLDivElement>(null);
  const orb2Ref = React.useRef<HTMLDivElement>(null);
  const rightColRef = React.useRef<HTMLDivElement>(null);

  // GSAP Animations (Orbs + 3D Hover Tilt)
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Floating Orbs
      gsap.to(orb1Ref.current, {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        scale: "random(0.9, 1.2)",
        duration: "random(5, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    // 2. 3D Tilt for Right Column
    const handleMouseMove = (e: MouseEvent) => {
      if (!rightColRef.current) return;
      const { clientX, clientY } = e;
      const xPos = clientX / window.innerWidth - 0.5;
      const yPos = clientY / window.innerHeight - 0.5;

      gsap.to(rightColRef.current, {
        rotationY: xPos * 8, // Subtle tilt so it doesn't break cards UX
        rotationX: -yPos * 8,
        ease: "power3.out",
        transformPerspective: 1200,
        duration: 1.5,
      });
    };

    const handleMouseLeave = () => {
      if (!rightColRef.current) return;
      gsap.to(rightColRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    };

    const section = sectionRef.current;
    if (section) {
      window.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      ctx.revert();
      if (section) {
        window.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="relative overflow-hidden border-b border-border/20 bg-background py-24 md:py-32"
    >
      {/* Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-30"
        aria-hidden
      />

      {/* Animated GSAP Orbs */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] opacity-60"
        aria-hidden
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute right-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 translate-x-1/4 rounded-full bg-orange-500/15 blur-[120px] opacity-60"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="grid content-start items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* LEFT COLUMN: Texts and Actions */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 flex w-full min-w-0 max-w-none flex-col items-center self-center text-center lg:order-1 lg:col-span-6 lg:col-start-1"
          >
            <Badge className="mb-6 w-fit gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium tracking-wide text-primary shadow-sm backdrop-blur-md hover:bg-primary/20 transition-colors">
              <Sparkles className="size-4" />
              {news.badge}
            </Badge>

            <h2
              className={sectionHeadingClassName({
                inverse: true,
                variant: "news",
                className: "relative w-full text-balance text-center",
              })}
            >
              <span className="mx-auto flex w-full max-w-4xl flex-col items-center px-1 sm:px-2">
                <span
                  className="mb-4 h-1 w-14 shrink-0 rounded-full bg-linear-to-r from-primary via-orange-400 to-primary/30 sm:mb-5 sm:w-16"
                  aria-hidden
                />
                <span className="inline-block max-w-full">
                  <span className="text-white/94">
                    {news.heading.before}
                  </span>{" "}
                  <span className="relative inline-block group align-baseline">
                    <span
                      className="pointer-events-none absolute inset-[-0.12em_-0.25em] -z-10 rounded-2xl bg-linear-to-r from-primary/35 via-orange-500/25 to-transparent blur-2xl opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden
                    />
                    <span
                      className={cn(
                        SECTION_HEADING_ACCENT_CLASS,
                        "relative drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]"
                      )}
                    >
                      {news.heading.accent}
                    </span>
                  </span>
                  <span className="mt-3 block text-[0.78em] font-semibold leading-snug tracking-[-0.02em] text-white/72 md:mt-3.5 md:text-[0.76em]">
                    {news.heading.after}
                  </span>
                </span>
              </span>
            </h2>

            <p className="mt-6 w-full max-w-2xl text-lg leading-relaxed text-white/70 md:mt-8 md:text-xl">
              {news.paragraph}
            </p>

            <div className="mt-10 flex w-full max-w-xl flex-col items-stretch justify-center gap-4 lg:max-w-none lg:flex-row lg:flex-wrap lg:items-center lg:justify-center">
              <MagneticElement strength={0.3}>
                <Button
                  asChild
                  size="lg"
                  className="group relative h-14 w-full min-w-0 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_30px_-10px_var(--primary)] hover:shadow-[0_0_50px_-15px_var(--primary)] transition-all duration-300 lg:w-auto lg:min-w-0"
                >
                  <a
                    href={news.primaryCta.href}
                    className="flex w-full items-center justify-center gap-2 lg:inline-flex lg:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {news.primaryCta.label}
                      <span className="flex size-6 items-center justify-center rounded-full bg-black/20 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </span>
                  </a>
                </Button>
              </MagneticElement>

              <MagneticElement strength={0.2}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group h-14 w-full min-w-0 rounded-full border-white/20 bg-white/5 px-8 text-base font-medium backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 lg:w-auto lg:min-w-0"
                >
                  <a
                    href={secondaryHref}
                    target={secondaryIsExternal ? "_blank" : undefined}
                    rel={
                      secondaryIsExternal ? "noopener noreferrer" : undefined
                    }
                    className="flex w-full items-center justify-center gap-2 lg:inline-flex lg:w-auto"
                  >
                    <Send className="size-4 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    {news.secondaryCta.label}
                  </a>
                </Button>
              </MagneticElement>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 3D Scrollable Card Stack container */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="order-2 flex w-full justify-center lg:order-2 lg:col-span-6 lg:col-start-7 perspective-[1200px]"
          >
            <div
              ref={rightColRef}
              className="relative w-full max-w-[min(100vw-2rem,550px)] transform-gpu"
            >
              {/* Outer Glow of the box */}
              <div
                className="pointer-events-none absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-orange-500/10 to-transparent opacity-50 blur-2xl transition-opacity duration-500 hover:opacity-80"
                aria-hidden
              />

              {/* Main Premium Glass Container */}
              <div className="relative overflow-visible rounded-[2.2rem] border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl transition-all duration-500">
                {/* Inner darker container for contrast */}
                <div className="rounded-[1.9rem] bg-black/60 p-4 pb-14 border border-white/5 relative z-10 md:p-6 md:pb-16">
                  {/* Subtle inner grid inside the box */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] rounded-[1.9rem]" />

                  <ScrollableCardStack
                    cardHeight={cardHeight}
                    items={resolvedCards}
                    perspective={1300}
                    transitionDuration={200}
                    showArrowNav
                    className="mx-auto min-w-0 w-full max-w-full relative z-20"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
