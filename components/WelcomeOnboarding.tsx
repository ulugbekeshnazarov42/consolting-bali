"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { content, interpolate } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";

const onboarding = content.onboarding;
const STORAGE_KEY = onboarding.storageKey;

const interpolateValues = {
  telegram: content.contact.telegram,
  phone: content.contact.phone,
  address: content.contact.address,
};

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

type Step = (typeof onboarding.steps)[number];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

function StepBody({
  current,
  reduceMotion,
}: {
  current: Step;
  reduceMotion: boolean | null;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={current.id}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        exit={
          reduceMotion
            ? undefined
            : { opacity: 0, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.2 } }
        }
        variants={staggerContainer}
      >
        {current.body && (
          <motion.p
            variants={reduceMotion ? undefined : staggerItem}
            className={cn(
              "mb-4 text-center text-muted-foreground text-pretty last:mb-0",
              "text-[15px] leading-relaxed sm:mb-5 sm:text-base",
              "lg:mb-4 lg:text-[15px] lg:leading-relaxed xl:text-base"
            )}
          >
            {current.body}
          </motion.p>
        )}
        {current.bullets && current.bullets.length > 0 && (
          <motion.ul variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {current.bullets.map((b) => {
              const BIcon = getIcon(b.icon);
              return (
                <motion.li
                  key={b.text}
                  variants={reduceMotion ? undefined : staggerItem}
                  className={cn(
                    "group flex h-full items-start gap-3.5 rounded-2xl border border-border/40",
                    "bg-gradient-to-br from-background/50 to-background/20 px-4 py-3.5 text-left shadow-sm backdrop-blur-md",
                    "transition-all duration-300 ease-out hover:-translate-y-0.5",
                    "hover:border-primary/40 hover:bg-background/60 hover:shadow-[0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_20%,transparent)]",
                    "sm:px-5 sm:py-4",
                    "lg:rounded-[1.15rem] lg:py-3.5"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl",
                      "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
                      "text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]",
                      "ring-1 ring-inset ring-primary/20",
                      "transition-all duration-300 group-hover:scale-110 group-hover:from-primary/30 group-hover:shadow-[0_0_15px_-3px_var(--primary)]",
                      "sm:size-[2.65rem] lg:size-10"
                    )}
                  >
                    <BIcon className="size-[1.15rem] sm:size-5 lg:size-[1.15rem]" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1 pt-1 text-[13.5px] leading-relaxed text-foreground/90 sm:text-[15px] lg:text-[14px]">
                    {interpolate(b.text, interpolateValues)}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function WelcomeOnboarding() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [hydrated, setHydrated] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceDemo =
      params.get("onboarding") === "1" || params.get("demo") === "1";
    if (forceDemo) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setOpen(true);
      setHydrated(true);
      return;
    }

    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) setOpen(true);
    } catch {
      setOpen(true);
    }
    setHydrated(true);
  }, []);

  const closeAndRemember = React.useCallback(() => {
    markSeen();
    setOpen(false);
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) closeAndRemember();
    else setOpen(next);
  };

  const goNext = () => {
    if (step < onboarding.steps.length - 1) setStep((s) => s + 1);
    else closeAndRemember();
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const current = onboarding.steps[step];
  const Icon = getIcon(current.icon);

  if (!hydrated) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "flex !h-screen !w-screen !max-w-none flex-col gap-0 overflow-hidden !rounded-none !border-none bg-background/95 p-0 backdrop-blur-3xl dark:bg-black/90",
          "shadow-none"
        )}
        onEscapeKeyDown={() => closeAndRemember()}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/95 to-background/80 z-[-1]" />
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -right-20 -top-20 size-[30rem] rounded-full bg-primary/20 blur-[100px] lg:size-[40rem] z-[-1]"
            />
            <motion.div
              animate={{
                x: [0, -40, 30, 0],
                y: [0, 30, -30, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -left-32 size-[30rem] rounded-full bg-orange-500/15 blur-[120px] lg:size-[50rem] z-[-1]"
            />
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.85] transition-colors duration-1000 z-[-1]", current.accent)} />
            <div className="absolute inset-0 bg-grid mask-radial-fade opacity-[0.08] dark:opacity-[0.15] z-[-1]" />
          </div>

          {/* Top Edge Glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-70" aria-hidden />

          {/* Header Content */}
          <div
            className={cn(
              "relative shrink-0 px-5 pt-12 pb-2 sm:px-10 sm:pt-16",
              "md:px-16 lg:px-24 lg:pt-20 lg:pb-6 max-w-5xl mx-auto w-full"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex justify-center sm:mb-6"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/50 to-orange-500/50 blur-sm opacity-50 group-hover:opacity-100 transition duration-500" />
                <span className="relative inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/80 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur-md sm:px-6 sm:text-sm sm:tracking-[0.24em]">
                  <Sparkles className="size-4 text-orange-500" />
                  {onboarding.stepLabels[step]}
                </span>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.icon}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="mb-6 flex justify-center sm:mb-8 lg:mb-8"
              >
                <div className="relative">
                  <span className="absolute -inset-2 animate-pulse rounded-full bg-primary/20 blur-2xl" />
                  <span
                    className={cn(
                      "relative grid place-items-center rounded-3xl bg-gradient-to-br from-primary via-primary to-orange-600 text-white",
                      "shadow-[0_12px_40px_-12px_color-mix(in_oklch,var(--primary)_60%,transparent),inset_0_2px_0_0_rgba(255,255,255,0.2)]",
                      "size-20 ring-1 ring-white/20 sm:size-24 lg:size-28"
                    )}
                  >
                    <Icon className="size-10 drop-shadow-md sm:size-12 lg:size-14" strokeWidth={1.5} />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <DialogTitle
                  className={cn(
                    "text-center font-heading font-extrabold capitalize tracking-tight text-balance text-foreground",
                    "text-3xl leading-[1.2] sm:text-4xl lg:text-5xl"
                  )}
                >
                  {current.title}
                </DialogTitle>
                <p className="mt-4 text-center text-base font-semibold tracking-wide text-primary/90 sm:text-lg lg:text-xl">
                  {current.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <DialogDescription className="sr-only">
              {interpolate(onboarding.progressSrTemplate, {
                step: step + 1,
                total: onboarding.steps.length,
                title: current.title,
              })}
            </DialogDescription>
          </div>

          {/* Scrollable Content */}
          <div className="relative min-h-0 flex-1 px-5 pt-2 sm:px-10 md:px-16 lg:px-24 w-full max-w-5xl mx-auto">
            {/* Subtle Divider */}
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            <ScrollArea className="h-full w-full">
              <div className="pr-4 pb-12 pt-4">
                <StepBody current={current} reduceMotion={reduceMotion} />
              </div>
            </ScrollArea>
          </div>

          {/* Footer Area */}
          <div
            className={cn(
              "relative shrink-0 border-t border-border/20 bg-background/50",
              "px-5 py-5 backdrop-blur-2xl sm:px-10",
              "md:px-12 lg:px-14 lg:py-6"
            )}
          >
            <div
              className="mb-5 flex max-w-full justify-center gap-2 px-1"
              role="tablist"
              aria-label={onboarding.stepsAriaLabel}
            >
              {onboarding.steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  aria-label={interpolate(onboarding.stepAriaTemplate, { n: i + 1 })}
                  onClick={() => setStep(i)}
                  className={cn(
                    "h-2 shrink-0 rounded-full transition-all duration-500 ease-out",
                    i === step
                      ? "w-10 bg-gradient-to-r from-primary to-orange-500 shadow-[0_0_15px_color-mix(in_oklch,var(--primary)_60%,transparent)]"
                      : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="order-2 h-11 text-muted-foreground underline-offset-4 hover:bg-transparent hover:text-foreground hover:underline sm:order-1 font-semibold"
                onClick={closeAndRemember}
              >
                {onboarding.skipLabel}
              </Button>
              <div className="order-1 flex w-full gap-3 sm:order-2 sm:w-auto sm:justify-end">
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 flex-1 rounded-full border-border/40 bg-background/50 shadow-sm hover:bg-background/80 hover:text-primary transition-all sm:flex-initial sm:min-w-[8rem] font-semibold"
                    onClick={goBack}
                  >
                    {onboarding.backLabel}
                  </Button>
                )}
                <Button
                  type="button"
                  className={cn(
                    "group relative h-12 flex-1 overflow-hidden rounded-full font-semibold transition-all sm:flex-initial sm:min-w-[11rem]",
                    "bg-gradient-to-r from-primary to-orange-500 text-white shadow-[0_8px_25px_-5px_color-mix(in_oklch,var(--primary)_50%,transparent)] hover:shadow-[0_10px_30px_-5px_color-mix(in_oklch,var(--primary)_60%,transparent)]"
                  )}
                  onClick={step < onboarding.steps.length - 1 ? goNext : closeAndRemember}
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="relative flex items-center justify-center gap-2">
                    {step < onboarding.steps.length - 1 ? onboarding.nextLabel : onboarding.finishLabel}
                    {step < onboarding.steps.length - 1 && (
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
