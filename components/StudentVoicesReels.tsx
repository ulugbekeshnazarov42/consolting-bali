"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { MessagesSquare, Play, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import * as React from "react";
import Marquee from "react-fast-marquee";

const reelsContent = content.reels;

const REEL_FALLBACK_SOURCES = [
  {
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    type: "video/webm" as const,
  },
  {
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    type: "video/mp4" as const,
  },
];

type Reel = (typeof reelsContent.items)[number];

// --- YANGA: PREMIUM VIDEO MODAL BODY ---
function ReelVideoBody({
  item,
  videoRef,
}: {
  item: Reel;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const sources = REEL_FALLBACK_SOURCES;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_80px_-20px_var(--primary)] group">
      {/* Background ambient glow inside modal */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-orange-500/10 opacity-50 z-0" />

      <div className="relative z-10 bg-black">
        <div className="relative mx-auto aspect-9/16 max-h-[min(75vh,680px)] w-full max-w-sm md:max-w-md">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black via-black/60 to-transparent"
            aria-hidden
          />
          <video
            ref={videoRef}
            poster={item.image}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover rounded-t-[2rem]"
          >
            {sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
            {reelsContent.fallbackNotice}
          </video>
        </div>
      </div>

      <div className="relative z-20 overflow-hidden border-t border-white/10 bg-black/40 text-left backdrop-blur-xl">
        <div className="relative px-6 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8">
          <span
            className="pointer-events-none absolute right-4 top-2 font-heading text-[5rem] font-extrabold leading-none text-primary/10 select-none md:right-6 md:text-[6rem]"
            aria-hidden
          >
            &ldquo;
          </span>

          <div className="flex items-center gap-2 mb-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
              <Sparkles className="size-3 text-primary" />
            </span>
            <p className="relative z-10 font-heading text-xl font-extrabold tracking-tight text-white md:text-2xl drop-shadow-md">
              {item.name}
            </p>
          </div>

          <blockquote className="relative z-10 mt-3 border-l-[3px] border-primary pl-4 md:mt-4 md:pl-5">
            <p className="text-pretty font-heading text-base font-medium leading-relaxed text-white/80 md:text-lg">
              {item.quote}
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

// --- YANGA: PREMIUM REEL CARD (Glass & 3D Hover) ---
function ReelCard({
  item,
  className,
  onOpen,
}: {
  item: Reel;
  className?: string;
  onOpen: (item: Reel) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={cn(
        "relative mx-3 block aspect-9/16 w-[min(13rem,calc(100vw-4rem))] shrink-0 cursor-pointer overflow-visible rounded-[2rem] text-left transition-all duration-500 focus-visible:outline-none sm:mx-4 sm:w-56 md:w-64 group",
        className,
      )}
    >
      <span className="sr-only">
        {item.name} — {reelsContent.openAriaSuffix}
      </span>

      {/* Outer Glow Effect on Hover */}
      <div className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-b from-primary/50 to-orange-500/50 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60" />

      {/* Main Glass Container */}
      <div className="relative size-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.03]">
        <img
          src={item.image}
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"
          aria-hidden
        />

        {/* Top Badges */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2 sm:inset-x-4 sm:top-4 z-10">
          <span className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-black/50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
            <span className="inline-block size-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            {reelsContent.liveLabel}
          </span>
        </div>

        {/* Play Button - Centered on hover */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
          <span className="grid size-12 place-items-center rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md transition-all duration-500 group-hover:bg-primary/80 group-hover:border-primary group-hover:scale-125 group-hover:shadow-[0_0_30px_var(--primary)] sm:size-14">
            <Play className="size-5 translate-x-0.5 fill-current" aria-hidden />
          </span>
        </div>

        {/* Bottom Content */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          <p className="text-pretty font-heading text-sm font-bold leading-snug text-white sm:text-base drop-shadow-lg">
            &ldquo;{item.quote}&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
            <p className="text-xs font-bold text-white/70 uppercase tracking-wider sm:text-[11px]">
              {item.name}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function StudentVoicesReels() {
  const reduceMotion = useReducedMotion();
  const reels = reelsContent.items;
  const rowB = React.useMemo(() => [...reels].reverse(), [reels]);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Reel | null>(null);
  const [useDialogShell, setUseDialogShell] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // --- GSAP Refs ---
  const sectionRef = React.useRef<HTMLElement>(null);
  const orb1Ref = React.useRef<HTMLDivElement>(null);
  const orb2Ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduceMotion) return;

    // Background Orbs Floating Animation (GSAP)
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        rotation: "random(-15, 15)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        scale: "random(0.9, 1.1)",
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const openReel = React.useCallback((item: Reel) => {
    setSelected(item);
    setUseDialogShell(window.matchMedia("(min-width: 768px)").matches);
    setOpen(true);
  }, []);

  const handleOpenChange = React.useCallback((next: boolean) => {
    setOpen(next);
    if (!next) setSelected(null);
  }, []);

  React.useEffect(() => {
    if (!open) videoRef.current?.pause();
  }, [open]);

  return (
    <section
      ref={sectionRef}
      id="fikrlar"
      className="relative overflow-hidden border-b border-border/20 bg-background py-24 md:py-32"
      aria-labelledby="fikrlar-heading"
      aria-label={reelsContent.sectionAriaLabel}
    >
      {/* Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-30"
        aria-hidden
      />

      {/* GSAP Animated Glowing Orbs */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute -left-40 top-1/4 size-[500px] rounded-full bg-primary/20 blur-[120px] opacity-60"
        aria-hidden
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute -right-40 bottom-10 size-[550px] rounded-full bg-orange-500/15 blur-[130px] opacity-60"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center md:max-w-3xl"
        >
          <Badge className="mb-6 gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
            <MessagesSquare className="size-4" />
            {reelsContent.badge}
          </Badge>
          <h2
            id="fikrlar-heading"
            className="text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
          >
            {reelsContent.heading.before}{" "}
            <span className="relative inline-block">
              <span className="pointer-events-none absolute inset-[-0.1em_-0.2em] -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-orange-500/20 blur-xl opacity-70" />
              <span className="text-gradient-orange">
                {reelsContent.heading.accent}
              </span>
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/70 md:text-xl max-w-xl mx-auto">
            {reelsContent.paragraph}
          </p>
        </motion.div>

        {/* Marquee Section */}
        <div className="relative mt-16 md:mt-20">
          {/* Side Fades for Marquee */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background via-background/90 to-transparent md:w-32"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background via-background/90 to-transparent md:w-32"
            aria-hidden
          />

          {reduceMotion ? (
            <div
              className="flex flex-wrap justify-center gap-y-10 pb-4 pt-4"
              role="list"
            >
              {reels.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  role="listitem"
                  className="flex justify-center"
                >
                  <ReelCard item={item} onOpen={openReel} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-10 md:gap-14">
              <Marquee
                speed={40}
                pauseOnHover
                gradient={false}
                className="py-4 overflow-visible"
              >
                {reels.map((item) => (
                  <ReelCard
                    key={`a-${item.id}`}
                    item={item}
                    onOpen={openReel}
                  />
                ))}
              </Marquee>
              <Marquee
                speed={30}
                direction="right"
                pauseOnHover
                gradient={false}
                className="py-4 overflow-visible"
              >
                {rowB.map((item) => (
                  <ReelCard
                    key={`b-${item.id}`}
                    item={item}
                    onOpen={openReel}
                  />
                ))}
              </Marquee>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal / Drawer Logic */}
      {selected && open && useDialogShell ? (
        <Dialog open onOpenChange={handleOpenChange}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[min(calc(100vw-1rem),28rem)] gap-0 overflow-visible rounded-[2rem] border-0 bg-transparent p-0"
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription>{selected.program}</DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -right-4 -top-4 z-50 size-12 rounded-full border border-white/20 bg-black/80 text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:bg-red-500 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                aria-label={reelsContent.closeLabel}
              >
                <X className="size-5" />
              </Button>
            </DialogClose>
            <ReelVideoBody
              key={selected.id}
              item={selected}
              videoRef={videoRef}
            />
          </DialogContent>
        </Dialog>
      ) : selected && open && !useDialogShell ? (
        <Drawer open onOpenChange={handleOpenChange} repositionInputs={false}>
          <DrawerContent
            className={cn(
              "max-h-[95vh] overflow-hidden rounded-t-[2rem] border border-white/10 bg-black/90 p-0 shadow-[0_-20px_80px_-20px_var(--primary)] backdrop-blur-2xl",
              "ring-1 ring-inset ring-white/5",
              "[&>div:first-child]:mt-4[&>div:first-child]:bg-white/20",
            )}
          >
            <DrawerHeader className="sr-only">
              <DrawerTitle>{selected.name}</DrawerTitle>
              <DrawerDescription>{selected.program}</DrawerDescription>
            </DrawerHeader>
            <div className="relative max-h-[calc(95vh-1rem)] overflow-y-auto overscroll-contain bg-black/40">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-50 size-10 rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all active:scale-95 hover:bg-red-500/80"
                  aria-label={reelsContent.closeLabel}
                >
                  <X className="size-4" strokeWidth={2.5} />
                </Button>
              </DrawerClose>
              <ReelVideoBody
                key={selected.id}
                item={selected}
                videoRef={videoRef}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : null}
    </section>
  );
}
