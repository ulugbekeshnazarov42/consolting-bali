"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePrefersFinePointer } from "@/hooks/use-prefers-fine-pointer";
import { content, isExternalHref, resolveHref } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  ArrowUpRight,
  GraduationCap,
  Plane,
  Route,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react"; // Yoki "framer-motion" agar eski versiya bo'lsa
import { useEffect, useMemo, useRef } from "react";

const hero = content.hero;

// Framer Motion Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const headlineBlock = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// --- YANGA FEATURE: Magnetic Button Wrap (GSAP) ---
function MagneticElement({
  children,
  strength = 0.4,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <div ref={ref} className="inline-block w-full sm:w-auto z-10">
      {children}
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const finePointer = usePrefersFinePointer();

  // GSAP Parallax Refs
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const aurora1Ref = useRef<HTMLDivElement>(null);
  const aurora2Ref = useRef<HTMLDivElement>(null);

  // GSAP 3D Hover & Parallax Logic
  useEffect(() => {
    if (reduceMotion || !finePointer) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = clientX / window.innerWidth - 0.5;
      const yPos = clientY / window.innerHeight - 0.5;

      // Karta uchun 3D aylanish effekti
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          rotationY: xPos * 15,
          rotationX: -yPos * 15,
          ease: "power3.out",
          transformPerspective: 1200,
          duration: 1.5,
        });
      }

      // Orqa fon yorug'liklari uchun sekin parallax
      if (aurora1Ref.current && aurora2Ref.current) {
        gsap.to(aurora1Ref.current, {
          x: xPos * -60,
          y: yPos * -60,
          duration: 2,
          ease: "power2.out",
        });
        gsap.to(aurora2Ref.current, {
          x: xPos * 80,
          y: yPos * 80,
          duration: 2.5,
          ease: "power2.out",
        });
      }

      // Sichqonchaga ergashadigan yorug'lik
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduceMotion, finePointer]);

  const secondaryHref = resolveHref(hero.secondaryCta.href);
  const secondaryIsExternal = isExternalHref(hero.secondaryCta.href);

  // Text Animations
  const headlineBefore = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
      },
    }),
    [],
  );

  const headlineAccentMotion = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9, rotateX: 20 },
      show: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: { type: "spring" as const, stiffness: 90, damping: 15 },
      },
    }),
    [],
  );

  const headlineAfter = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
      },
    }),
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate overflow-hidden min-h-screen flex items-center border-b border-border/20 bg-background"
    >
      {/* GSAP Mouse Follow Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/10 blur-[120px] z-[-1] hidden lg:block"
        aria-hidden
      />

      {/* Grid Pattern with Fade */}
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-30 z-[-2]" />

      {/* Aurora Lights */}
      <div
        ref={aurora1Ref}
        className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full bg-primary/20 blur-[100px] animate-pulse z-[-1]"
        aria-hidden
      />
      <div
        ref={aurora2Ref}
        className="pointer-events-none absolute -bottom-40 right-10 size-[550px] rounded-full bg-orange-500/15 blur-[120px] z-[-1]"
        aria-hidden
      />

      <div className="container relative mx-auto grid w-full gap-12 px-4 py-20 lg:grid-cols-12 lg:gap-16 lg:py-32 xl:max-w-7xl">
        {/* LEFT COLUMN: Texts and CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 overflow-visible lg:col-span-7 z-10 justify-center"
        >
          <motion.div variants={item}>
            <Badge className="gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md hover:bg-primary/20 transition-colors">
              <Sparkles className="size-4" />
              {hero.badge}
            </Badge>
          </motion.div>

          <motion.h1
            variants={headlineBlock}
            className={cn(
              "group/headline relative font-heading text-balance font-extrabold tracking-tight text-foreground",
              "text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] lg:leading-[1.05]",
            )}
          >
            <motion.span variants={headlineBefore} className="block mb-2">
              {hero.headline.before}
            </motion.span>

            <motion.span
              variants={headlineAccentMotion}
              className="relative isolate inline-block my-2 group"
            >
              <span className="pointer-events-none absolute inset-[-0.1em_-0.2em] -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-orange-500/20 blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:opacity-100 opacity-70" />
              <span className="pointer-events-none absolute inset-[-0.05em_-0.15em] -z-10 rounded-xl bg-background/50 border border-primary/30 backdrop-blur-sm" />
              <span className="text-gradient-orange relative z-1 px-2 inline-block drop-shadow-md">
                {hero.headline.accent}
              </span>
            </motion.span>

            <motion.span
              variants={headlineAfter}
              className="block mt-2 text-foreground/90"
            >
              {hero.headline.after}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground/90 md:text-xl"
          >
            {hero.paragraph}
          </motion.p>

          {/* CTAs with GSAP Magnetic Effect */}
          <motion.div
            variants={item}
            className="flex w-full flex-col gap-4 sm:flex-row sm:items-center mt-4"
          >
            <MagneticElement strength={0.3}>
              <Button
                asChild
                size="lg"
                className="group relative h-14 w-full sm:w-auto rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_40px_-10px_var(--primary)] hover:shadow-[0_0_60px_-15px_var(--primary)] transition-all duration-300"
              >
                <a href={hero.primaryCta.href}>
                  <span className="relative z-10 flex items-center gap-2">
                    {hero.primaryCta.label}
                    <span className="flex size-6 items-center justify-center rounded-full bg-background/20 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
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
                className="group h-14 w-full sm:w-auto gap-2 rounded-full border-border/50 bg-background/30 px-8 text-base font-medium backdrop-blur-md hover:bg-muted/50 hover:border-border transition-all duration-300"
              >
                <a
                  href={secondaryHref}
                  target={secondaryIsExternal ? "_blank" : undefined}
                  rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
                >
                  <Send className="size-4 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  {hero.secondaryCta.label}
                </a>
              </Button>
            </MagneticElement>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-border/30 mt-4"
          >
            {hero.features.map(({ icon, text }, i) => {
              const Icon = getIcon(icon);
              return (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground/80 hover:text-foreground transition-colors group"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <span>{text}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Parallax Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative lg:col-span-5 flex items-center justify-center perspective-[1200px]"
        >
          <div ref={cardRef} className="w-full max-w-[480px] transform-gpu">
            <HeroCard card={hero.card} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroCard({ card }: { card: any }) {
  return (
    <div className="relative w-full group">
      {/* Glow Effect behind the card */}
      <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-orange-500/30 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

      {/* Main Glass Card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl",
          "ring-1 ring-inset ring-white/5",
        )}
      >
        {/* Header Area */}
        <div className="relative border-b border-white/10 bg-white/5 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-primary/20 text-primary shadow-[0_0_15px_-3px_var(--primary)]">
                <Route className="size-5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary/80">
                  {card.eyebrow}
                </p>
                <p className="mt-1 font-heading text-xl font-bold tracking-tight text-white">
                  {card.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-white shadow-inner backdrop-blur-md">
              <Plane className="size-4 text-primary animate-pulse" />
              <span>{card.badge}</span>
            </div>
          </div>
        </div>

        {/* Content Area (Destinations Timeline) */}
        <div className="relative px-6 py-8 sm:px-8">
          {/* Animated Timeline Line */}
          <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-orange-500/20 sm:left-[47px]" />

          <ul className="relative flex flex-col gap-0">
            {card.destinations.map((d: any, i: number) => (
              <li
                key={d.city}
                className={cn(
                  "relative flex gap-6 pb-10 pl-14 sm:gap-8 sm:pb-12 sm:pl-16 group/item",
                  i === card.destinations.length - 1 && "pb-2 sm:pb-2",
                )}
              >
                {/* Timeline Dot */}
                <span className="absolute left-0 top-1.5 z-10 flex size-5 items-center justify-center sm:top-1.5 sm:size-6">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-20"></span>
                  <span className="relative inline-flex size-3 rounded-full border-2 border-background bg-primary sm:size-3.5 shadow-[0_0_10px_var(--primary)] group-hover/item:scale-150 transition-transform duration-300"></span>
                </span>

                <div className="min-w-0 flex-1 transform transition-all duration-300 group-hover/item:translate-x-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-primary/10 px-2 py-1 font-mono text-xs font-bold text-primary border border-primary/20">
                        {d.code}
                      </span>
                      <span className="font-heading text-lg font-bold text-white sm:text-xl">
                        {d.city}
                      </span>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur-md">
                      {d.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground/80 leading-relaxed">
                    {d.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Area */}
        <div className="relative border-t border-white/10 bg-black/50 px-6 py-5 sm:px-8 backdrop-blur-xl">
          <p className="text-center text-xs leading-relaxed text-muted-foreground sm:text-left flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-semibold text-white">{card.footer.bold}</span>
            {card.footer.text}
          </p>
        </div>
      </div>

      {/* Floating Stamp / Badge (GSAP bilan sekin harakatlanuvchi qilib qoyilsa ham bo'ladi, hozir CSS float bor) */}
      <div className="absolute -left-6 -top-6 z-20 hidden sm:block animate-float">
        <div className="rotate-[-10deg] rounded-xl border border-white/20 bg-black/80 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 p-2 border border-primary/30">
              <GraduationCap className="size-5 text-primary" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                {card.stamp.eyebrow}
              </p>
              <p className="font-heading text-sm font-bold text-white">
                {card.stamp.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
