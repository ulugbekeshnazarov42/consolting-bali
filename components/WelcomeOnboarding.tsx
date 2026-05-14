"use client";

import Image from "next/image";
import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { content, interpolate } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const ob = content.onboarding;
const STORAGE_KEY = ob.storageKey;

const ivals = {
  telegram: content.contact.telegram,
  phone: content.contact.phone,
  address: content.contact.address,
};

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {}
}

type Step = (typeof ob.steps)[number];

/* ── Bullet item ─────────────────────────────────────── */
function Bullet({
  b,
  index,
  reduceMotion,
}: {
  b: Step["bullets"][number];
  index: number;
  reduceMotion: boolean | null;
}) {
  const BIcon = getIcon(b.icon);
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.07 + 0.15,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04]"
    >
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/10 text-primary ring-1 ring-inset ring-primary/25 transition-all duration-300 group-hover:ring-primary/50">
        <BIcon className="size-4" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 pt-0.5 text-[14px] leading-relaxed text-zinc-300 sm:text-[15px]">
        {interpolate(b.text, ivals)}
      </span>
    </motion.li>
  );
}

/* ── Step content area ───────────────────────────────── */
function StepContent({
  current,
  direction,
  reduceMotion,
}: {
  current: Step;
  direction: number;
  reduceMotion: boolean | null;
}) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={current.id}
        custom={direction}
        initial={
          reduceMotion ? false : { opacity: 0, x: direction * 56, filter: "blur(4px)" }
        }
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={
          reduceMotion
            ? undefined
            : {
                opacity: 0,
                x: direction * -40,
                filter: "blur(4px)",
                transition: { duration: 0.22 },
              }
        }
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 pb-10"
      >
        {/* Title block */}
        <div className="space-y-2">
          <DialogTitle
            className="font-extrabold leading-[1.08] tracking-[-0.028em] text-white"
            style={{ fontSize: "clamp(1.65rem, 3.5vw, 2.5rem)" }}
          >
            {current.title}
          </DialogTitle>
          <p className="text-sm font-semibold tracking-wide text-primary/80 sm:text-[15px]">
            {current.subtitle}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
          <span className="h-px flex-1 bg-white/[0.05]" />
        </div>

        {/* Body text */}
        {current.body && (
          <p className="text-[15px] leading-[1.72] text-zinc-400">
            {current.body}
          </p>
        )}

        {/* Bullets */}
        {current.bullets.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {current.bullets.map((b, i) => (
              <Bullet
                key={b.text}
                b={b}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Left image panel (desktop) ─────────────────────── */
function ImagePanel({
  current,
  step,
  total,
  progress,
  reduceMotion,
}: {
  current: Step;
  step: number;
  total: number;
  progress: number;
  reduceMotion: boolean | null;
}) {
  const Icon = getIcon(current.icon);
  return (
    <div className="relative hidden overflow-hidden md:flex md:w-[40%] lg:w-[42%] xl:w-[44%] 2xl:w-[46%]">
      {/* Crossfading image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + "-img"}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            priority
            sizes="46vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-zinc-950/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-black/20" />

      {/* Vertical progress bar — left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/[0.06]">
        <motion.div
          className="w-full origin-top rounded-b-full bg-gradient-to-b from-primary to-orange-400"
          animate={{ scaleY: progress / 100 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>

      {/* Large faded step number */}
      <div
        className="pointer-events-none absolute right-3 top-6 select-none font-black leading-none text-white/[0.06]"
        style={{ fontSize: "clamp(8rem, 20vw, 16rem)" }}
        aria-hidden
      >
        {String(step + 1).padStart(2, "0")}
      </div>

      {/* Brand top-left */}
      <div className="absolute left-8 top-8">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/40">
          VisaWithJanet
        </p>
      </div>

      {/* Bottom info */}
      <div className="relative mt-auto p-8 xl:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-panel-info"}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* Step counter */}
            <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary/70">
              {step + 1} / {total} · {ob.stepLabels[step]}
            </p>

            {/* Icon badge */}
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-600 shadow-[0_12px_32px_-6px_oklch(0.769_0.188_70.08_/_0.7)] ring-1 ring-white/15">
              <Icon className="size-7 text-white" strokeWidth={1.5} />
            </div>

            {/* Title preview */}
            <p className="text-xl font-bold leading-snug tracking-tight text-white xl:text-2xl">
              {current.title}
            </p>
            <p className="text-[13px] font-semibold text-primary/70">
              {current.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────── */
export default function WelcomeOnboarding() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [hydrated, setHydrated] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("onboarding") === "1" || params.get("demo") === "1";
    if (demo) {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
      setOpen(true);
      setHydrated(true);
      return;
    }
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
    setHydrated(true);
  }, []);

  const closeAndRemember = React.useCallback(() => {
    markSeen();
    setOpen(false);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setStep((s) => Math.max(0, Math.min(ob.steps.length - 1, s + dir)));
  };

  const goNext = () => {
    if (step < ob.steps.length - 1) navigate(1);
    else closeAndRemember();
  };

  const goBack = () => navigate(-1);

  const current = ob.steps[step];
  const Icon = getIcon(current.icon);
  const total = ob.steps.length;
  const progress = ((step + 1) / total) * 100;

  if (!hydrated) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) closeAndRemember(); }}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "!h-[100dvh] !w-screen !max-w-none !rounded-none !border-none bg-zinc-950 p-0 shadow-none",
          "flex overflow-hidden",
        )}
        onEscapeKeyDown={closeAndRemember}
      >
        <DialogDescription className="sr-only">
          {interpolate(ob.progressSrTemplate, {
            step: step + 1,
            total,
            title: current.title,
          })}
        </DialogDescription>

        {/* ── Desktop left: image panel ── */}
        <ImagePanel
          current={current}
          step={step}
          total={total}
          progress={progress}
          reduceMotion={reduceMotion}
        />

        {/* ── Right / mobile: content panel ── */}
        <div className="flex min-h-0 flex-1 flex-col bg-zinc-950">

          {/* Mobile: image strip */}
          <div className="relative shrink-0 md:hidden" style={{ height: "38vh" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-mob"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-zinc-950/20 to-zinc-950" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
              {/* Mobile step badge */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-orange-600 shadow-[0_4px_16px_-4px_oklch(0.769_0.188_70.08_/_0.65)]">
                    <Icon className="size-4 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-primary/80">
                    {ob.stepLabels[step]}
                  </span>
                </div>
                <span className="text-[11px] font-bold tabular-nums text-zinc-400">
                  {step + 1}/{total}
                </span>
              </div>
              {/* Mobile progress bar */}
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Top bar — desktop only */}
          <div className="hidden shrink-0 items-center justify-between border-b border-white/[0.06] px-8 py-4 md:flex lg:px-10">
            {/* Step dots */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label={ob.stepsAriaLabel}
            >
              {ob.steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  aria-label={interpolate(ob.stepAriaTemplate, { n: i + 1 })}
                  onClick={() => {
                    setDirection(i > step ? 1 : -1);
                    setStep(i);
                  }}
                  className={cn(
                    "h-[5px] rounded-full transition-all duration-400",
                    i === step
                      ? "w-8 bg-gradient-to-r from-primary to-orange-400 shadow-[0_0_10px_oklch(0.769_0.188_70.08_/_0.55)]"
                      : "w-[5px] bg-zinc-700 hover:bg-zinc-500",
                  )}
                />
              ))}
            </div>

            {/* Close X */}
            <DialogClose asChild>
              <button
                onClick={markSeen}
                className="flex size-9 items-center justify-center rounded-full border border-white/[0.08] text-zinc-500 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                aria-label="Yopish"
              >
                <X className="size-4" />
              </button>
            </DialogClose>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="min-h-0 flex-1">
            <div className="px-5 pt-7 pb-4 sm:px-8 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
              <StepContent
                current={current}
                direction={direction}
                reduceMotion={reduceMotion}
              />
            </div>
          </ScrollArea>

          {/* Footer navigation */}
          <div className="shrink-0 border-t border-white/[0.06] bg-zinc-950/80 px-5 py-4 backdrop-blur-xl sm:px-8 md:px-8 lg:px-12 xl:px-14 2xl:px-16">
            {/* Mobile dots */}
            <div
              className="mb-4 flex items-center justify-center gap-2 md:hidden"
              role="tablist"
              aria-label={ob.stepsAriaLabel}
            >
              {ob.steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  aria-label={interpolate(ob.stepAriaTemplate, { n: i + 1 })}
                  onClick={() => {
                    setDirection(i > step ? 1 : -1);
                    setStep(i);
                  }}
                  className={cn(
                    "h-[5px] rounded-full transition-all duration-300",
                    i === step
                      ? "w-7 bg-gradient-to-r from-primary to-orange-400 shadow-[0_0_8px_oklch(0.769_0.188_70.08_/_0.5)]"
                      : "w-[5px] bg-zinc-700 hover:bg-zinc-500",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* Skip */}
              <button
                type="button"
                onClick={closeAndRemember}
                className="shrink-0 text-[13px] font-semibold text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-300 hover:underline"
              >
                {ob.skipLabel}
              </button>

              {/* Back + Next */}
              <div className="flex items-center gap-2.5">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex h-11 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-sm font-bold text-zinc-400 backdrop-blur-sm transition-all hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white sm:px-5"
                  >
                    <ArrowLeft className="size-4 shrink-0" />
                    <span className="hidden sm:inline">{ob.backLabel}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={step < total - 1 ? goNext : closeAndRemember}
                  className="group relative h-11 overflow-hidden rounded-full bg-primary px-5 text-sm font-bold text-zinc-950 shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.45),0_8px_28px_-4px_oklch(0.769_0.188_70.08/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_oklch(0.769_0.188_70.08/0.65),0_12px_36px_-4px_oklch(0.769_0.188_70.08/0.7)] sm:px-7"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/22 to-transparent" />
                  <span className="relative flex items-center gap-2">
                    {step < total - 1 ? ob.nextLabel : ob.finishLabel}
                    {step < total - 1 && (
                      <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
