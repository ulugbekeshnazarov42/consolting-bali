"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { content, interpolate } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

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
        initial={
          reduceMotion ? false : { opacity: 0, x: 14, filter: "blur(4px)" }
        }
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={
          reduceMotion ? undefined : { opacity: 0, x: -10, filter: "blur(4px)" }
        }
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {current.body && (
          <p
            className={cn(
              "mb-3 text-center text-muted-foreground text-pretty last:mb-0",
              "text-[15px] leading-relaxed sm:mb-4 sm:text-base",
              "lg:mb-3 lg:text-[15px] lg:leading-relaxed xl:text-base"
            )}
          >
            {current.body}
          </p>
        )}
        {current.bullets && current.bullets.length > 0 && (
          <ul className="flex flex-col gap-2.5 sm:gap-3 lg:gap-2.5">
            {current.bullets.map((b) => {
              const BIcon = getIcon(b.icon);
              return (
                <li
                  key={b.text}
                  className={cn(
                    "group flex items-start gap-3 rounded-2xl border border-border/50",
                    "bg-background/35 px-3.5 py-3 text-left shadow-sm backdrop-blur-md",
                    "transition-[border-color,box-shadow,background-color] duration-200",
                    "hover:border-primary/35 hover:bg-background/50 hover:shadow-md",
                    "sm:px-4 sm:py-3.5",
                    "lg:rounded-xl lg:py-3"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl",
                      "bg-gradient-to-br from-primary/25 via-primary/12 to-primary/5",
                      "text-primary shadow-inner shadow-primary/10",
                      "ring-1 ring-inset ring-white/10 dark:ring-white/5",
                      "transition-transform duration-200 group-hover:scale-[1.02]",
                      "sm:size-10 lg:size-9"
                    )}
                  >
                    <BIcon className="size-4 sm:size-[18px]" strokeWidth={1.85} />
                  </span>
                  <span className="min-w-0 flex-1 pt-0.5 text-[13px] leading-relaxed text-foreground/92 sm:text-sm">
                    {interpolate(b.text, interpolateValues)}
                  </span>
                </li>
              );
            })}
          </ul>
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
          "flex max-h-[min(94dvh,720px)] flex-col gap-0 overflow-hidden rounded-2xl border-border/40 bg-card p-0",
          "shadow-[0_0_0_1px_color-mix(in_oklch,var(--border)_50%,transparent),0_25px_80px_-20px_color-mix(in_oklch,var(--primary)_22%,transparent)]",
          "w-[calc(100vw-1.25rem)] max-w-[calc(100vw-1.25rem)] sm:max-w-lg sm:rounded-[1.35rem]",
          "md:max-w-xl md:rounded-[1.85rem]",
          "lg:max-h-[min(640px,88vh)] lg:max-w-2xl lg:rounded-[2rem]",
          "xl:max-w-2xl"
        )}
        onEscapeKeyDown={() => closeAndRemember()}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90",
              current.accent
            )}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-dot opacity-[0.07] mask-radial-fade"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/35"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-12 size-48 rounded-full bg-primary/18 blur-3xl lg:size-56"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 size-40 rounded-full bg-orange-500/15 blur-3xl lg:size-48"
            aria-hidden
          />

          <div
            className={cn(
              "relative shrink-0 px-5 pt-11 pb-1 sm:px-8 sm:pt-12",
              "md:px-9 lg:px-10 lg:pt-11 lg:pb-2"
            )}
          >
            <div className="mb-3 flex justify-center sm:mb-4">
              <span className="inline-flex max-w-[92%] items-center justify-center rounded-full border border-primary/35 bg-primary/12 px-3.5 py-1.5 text-center font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm shadow-primary/10 sm:max-w-none sm:px-5 sm:text-[11px] sm:tracking-[0.24em]">
                {onboarding.stepLabels[step]}
              </span>
            </div>

            <div className="mb-4 flex justify-center sm:mb-5 lg:mb-4">
              <span
                className={cn(
                  "relative grid place-items-center rounded-[1.15rem] bg-gradient-to-br from-primary via-primary to-orange-600 text-primary-foreground",
                  "shadow-[0_12px_40px_-12px_color-mix(in_oklch,var(--primary)_55%,transparent),0_2px_0_0_color-mix(in_oklch,var(--primary)_40%,transparent)_inset]",
                  "size-[3.65rem] ring-2 ring-white/15 ring-offset-2 ring-offset-transparent sm:size-16 lg:size-[4.35rem]"
                )}
              >
                <span className="absolute inset-0 rounded-[1.15rem] bg-gradient-to-b from-white/30 to-transparent" />
                <Icon className="relative size-[1.65rem] drop-shadow-sm sm:size-8 lg:size-9" strokeWidth={1.65} />
              </span>
            </div>

            <DialogTitle
              className={cn(
                "text-center font-heading font-extrabold uppercase tracking-[0.04em] text-balance text-foreground",
                "text-[1.35rem] leading-[1.2] sm:text-[1.65rem] lg:text-[1.7rem] xl:text-[1.8rem]"
              )}
            >
              {current.title}
            </DialogTitle>
            <p className="mt-2 text-center text-sm font-semibold tracking-wide text-primary/95 lg:text-[0.98rem]">
              {current.subtitle}
            </p>
            <DialogDescription className="sr-only">
              {interpolate(onboarding.progressSrTemplate, {
                step: step + 1,
                total: onboarding.steps.length,
                title: current.title,
              })}
            </DialogDescription>
          </div>

          <div className="relative min-h-0 flex-1 border-t border-border/25 px-5 pt-1 sm:px-8 md:px-9 lg:flex lg:min-h-[305px] lg:flex-col lg:px-10 lg:pt-2">
            <ScrollArea
              className={cn(
                "w-full lg:hidden",
                "h-[min(42vh,304px)] sm:h-[min(40vh,328px)]"
              )}
            >
              <div className="pr-3 pb-3 pt-2">
                <StepBody current={current} reduceMotion={reduceMotion} />
              </div>
            </ScrollArea>

            <div className="hidden min-h-0 flex-1 flex-col lg:flex lg:overflow-visible">
              <div className="pb-3 pt-2">
                <StepBody current={current} reduceMotion={reduceMotion} />
              </div>
            </div>
          </div>

          <div
            className={cn(
              "relative shrink-0 border-t border-border/35 bg-gradient-to-t from-card/95 via-card/88 to-card/75",
              "px-5 py-4 backdrop-blur-xl sm:px-8",
              "md:px-9 lg:px-10 lg:py-5"
            )}
          >
            <div
              className="mb-4 flex max-w-full justify-center gap-1.5 px-1 sm:gap-2"
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
                    "h-2 shrink-0 rounded-full transition-all duration-300 ease-out",
                    i === step
                      ? "w-8 bg-primary shadow-[0_0_14px_-2px_color-mix(in_oklch,var(--primary)_65%,transparent)] sm:w-9"
                      : "w-1.5 bg-muted-foreground/28 hover:bg-muted-foreground/48"
                  )}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="order-2 h-9 text-muted-foreground underline-offset-4 hover:bg-transparent hover:text-foreground hover:underline sm:order-1"
                onClick={closeAndRemember}
              >
                {onboarding.skipLabel}
              </Button>
              <div className="order-1 flex w-full gap-2.5 sm:order-2 sm:w-auto sm:justify-end">
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    className="h-10 flex-1 rounded-full border-border/60 bg-background/40 shadow-sm sm:h-10 sm:flex-initial sm:min-w-[7.25rem]"
                    onClick={goBack}
                  >
                    {onboarding.backLabel}
                  </Button>
                )}
                {step < onboarding.steps.length - 1 ? (
                  <Button
                    type="button"
                    className="h-10 flex-1 rounded-full font-semibold shadow-lg shadow-primary/25 sm:flex-initial sm:min-w-[9.5rem]"
                    onClick={goNext}
                  >
                    {onboarding.nextLabel}
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="h-10 flex-1 rounded-full font-semibold shadow-lg shadow-primary/25 sm:flex-initial sm:min-w-[9.5rem]"
                    onClick={closeAndRemember}
                  >
                    {onboarding.finishLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
