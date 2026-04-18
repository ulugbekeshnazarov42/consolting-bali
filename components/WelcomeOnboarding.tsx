"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Globe2,
  GraduationCap,
  Heart,
  ListChecks,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Send,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "guzalopa_welcome_onboarding_v1";

const stepHeaderLabels = [
  "Tanishuv",
  "Yo‘nalishlar",
  "Xizmatlar",
  "Jarayon",
  "Ishonch",
  "Tayyorgarlik",
  "Aloqa",
] as const;

const steps = [
  {
    id: "welcome",
    title: "Xush kelibsiz",
    subtitle: `${site.shortName} Education`,
    body:
      "Bu yerda xorijda o‘qish — ayniqsa Singapur, Bali va kelajakda Qatar / Dubay yo‘nalishlari bo‘yicha shaxsiy, shaffof maslahat olasiz. Maqsadingizni tinglaymiz, keyin sizga mos yo‘nalish va realistik qadamlarni birga aniqlaymiz.",
    icon: Heart,
    accent: "from-primary/35 via-orange-500/18 to-transparent",
  },
  {
    id: "directions",
    title: "Qaysi yo‘nalishlar?",
    subtitle: "Singapur · Bali · Qatar / Dubay",
    body:
      "Har bir mamlakatning o‘z talablari, muddatlari va byudjeti bor. Biz sizning holatingizga mos variantlarni solishtirib, qayerda boshlash va qanday rivojlanishni aniqroq ko‘rsatamiz — umumiy gap emas, amaliy yo‘l-xarita.",
    bullets: [
      { icon: MapPin, text: "Singapur — nufuzli universitetlar, qat’iy muddatlar va aniq hujjatlar ro‘yxati" },
      { icon: Globe2, text: "Bali — tayyorgarlik va til dasturlari; keyingi bosqichga o‘tish rejalari" },
      { icon: Sparkles, text: "Qatar / Dubay — o‘qishdan keyingi yo‘nalish va uzoq muddatli reja bo‘yicha maslahat" },
    ],
    icon: Globe2,
    accent: "from-sky-500/18 via-primary/20 to-transparent",
  },
  {
    id: "what",
    title: "Nima qilamiz?",
    subtitle: "Amaliy yordam",
    body: null as string | null,
    bullets: [
      { icon: GraduationCap, text: "Universitet tanlovi, motivatsion xat va ariza tartibi" },
      { icon: MapPin, text: "Dastur va muddatlar bo‘yicha aniq ma’lumot — qayerdan boshlash kerakligi" },
      { icon: Send, text: "Talabalik vizasi hujjatlari va suhbatga tayyorgarlik" },
      { icon: Users, text: "Ota-ona bilan birga qaror — alohida suhbat va tushuntirish" },
      { icon: Sparkles, text: "Byudjet va vaqt chegaralarini hisobga olgan holda reja tuzish" },
    ],
    icon: Sparkles,
    accent: "from-orange-500/22 via-primary/18 to-transparent",
  },
  {
    id: "process",
    title: "Qanday ishlaymiz?",
    subtitle: "Qisqa jarayon",
    body:
      "Avvalo — bepul tanishuv: maqsad, byudjet va vaqt. Keyin — sizga mos yo‘nalish va hujjatlar ro‘yxati. Jarayon davomida muntazam aloqa va yangilanishlar — nimada qayerdasiz, keyingi qadam nima.",
    bullets: [
      { icon: ListChecks, text: "1-bosqich: suhbat va yo‘nalish tanlovi" },
      { icon: ListChecks, text: "2-bosqich: hujjatlar va ariza — qadam-baqadam tekshiruv" },
      { icon: ListChecks, text: "3-bosqich: topshirishdan keyin — kuzatuv va keyingi qadamlar" },
    ],
    icon: ListChecks,
    accent: "from-violet-500/18 via-primary/18 to-transparent",
  },
  {
    id: "trust",
    title: "Ishonch — asos",
    subtitle: "Realistik va'dalar",
    body:
      "Biz kafolatlangan viza yoki kafolatlangan qabul va'da qilmaymiz — yakuniy qaror har doim universitet va davlat organlari qo‘lida. Vazifamiz — hujjatlaringizni kuchaytirish, talablarni tushuntirish va jarayonni shaffof boshqarish.",
    icon: ShieldCheck,
    accent: "from-amber-500/25 via-primary/22 to-transparent",
  },
  {
    id: "prep",
    title: "Tayyorgarlik",
    subtitle: "Nimalarni kutish mumkin",
    body:
      "Hujjatlar, til sertifikati, moliyaviy isbotlar — ro‘yxat har bir yo‘nalishga qarab farq qiladi. Oldindan reja tuzsak, stress kamayadi va vaqt yo‘qotilmaydi.",
    bullets: [
      { icon: BookOpen, text: "Asosiy hujjatlar: pasport, diplomsertifikatlar, tarjimalar — qachon kerakligi" },
      { icon: Clock, text: "Muddatlar: ariza oynalari va vizaga ariza — kechikmasdan boshlash afzal" },
      { icon: Users, text: "Oila bilan kelishuv — kim nima topshiradi, qayerda yordam kerak" },
    ],
    icon: BookOpen,
    accent: "from-emerald-500/16 via-primary/16 to-transparent",
  },
  {
    id: "contact",
    title: "Keyingi qadam",
    subtitle: "Aloqa va qabul",
    body:
      `Bepul tanishuvdan boshlash mumkin. Saytning pastidagi «Bog‘lanish» bo‘limida forma bor — yoki Telegram orqali yozing. Qisqa javob va keyingi uchrashuvni birga kelishamiz.`,
    bullets: [
      { icon: Send, text: `Telegram: ${site.contact.telegram} — tez savol-javob` },
      { icon: Phone, text: `Telefon: ${site.contact.phone} — qo‘ng‘iroq uchun qulay vaqt` },
      { icon: Clock, text: "Dush–juma 9:00–19:00 · Shanba 10:00–15:00" },
      { icon: Calendar, text: `${site.contact.address} — uchrashuv oldindan kelishiladi` },
    ],
    icon: Calendar,
    accent: "from-primary/25 via-orange-500/20 to-transparent",
  },
] as const;

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

function StepBody({
  current,
  reduceMotion,
}: {
  current: (typeof steps)[number];
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
        {"bullets" in current && current.bullets && (
          <ul className="flex flex-col gap-2.5 sm:gap-3 lg:gap-2.5">
            {current.bullets.map((b) => (
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
                  <b.icon className="size-4 sm:size-[18px]" strokeWidth={1.85} />
                </span>
                <span className="min-w-0 flex-1 pt-0.5 text-[13px] leading-relaxed text-foreground/92 sm:text-sm">
                  {b.text}
                </span>
              </li>
            ))}
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
    if (step < steps.length - 1) setStep((s) => s + 1);
    else closeAndRemember();
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const current = steps[step];
  const Icon = current.icon;

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

          {/* Header: scroll qilmaydi */}
          <div
            className={cn(
              "relative shrink-0 px-5 pt-11 pb-1 sm:px-8 sm:pt-12",
              "md:px-9 lg:px-10 lg:pt-11 lg:pb-2"
            )}
          >
            <div className="mb-3 flex justify-center sm:mb-4">
              <span className="inline-flex max-w-[92%] items-center justify-center rounded-full border border-primary/35 bg-primary/12 px-3.5 py-1.5 text-center font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm shadow-primary/10 sm:max-w-none sm:px-5 sm:text-[11px] sm:tracking-[0.24em]">
                {stepHeaderLabels[step]}
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
                "text-center font-heading font-extrabold tracking-[-0.02em] text-balance text-foreground",
                "text-[1.35rem] leading-[1.2] sm:text-[1.65rem] lg:text-[1.7rem] xl:text-[1.8rem]"
              )}
            >
              {current.title}
            </DialogTitle>
            <p className="mt-2 text-center text-sm font-semibold tracking-wide text-primary/95 lg:text-[0.98rem]">
              {current.subtitle}
            </p>
            <DialogDescription className="sr-only">
              Onboarding bosqichi {step + 1} / {steps.length}. {current.title}
            </DialogDescription>
          </div>

          {/* Mobil / planshet: shadcn ScrollArea — desktopda oddiy blok, scroll yo‘q */}
          <div className="relative min-h-0 flex-1 border-t border-border/25 px-5 pt-1 sm:px-8 md:px-9 lg:flex lg:min-h-0 lg:flex-col lg:px-10 lg:pt-2">
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

          {/* Footer: doim ko‘rinadi, scroll emas */}
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
              aria-label="Bosqichlar"
            >
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  aria-label={`${i + 1}-bosqich`}
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
                O‘tkazib yuborish
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
                    Orqaga
                  </Button>
                )}
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    className="h-10 flex-1 rounded-full font-semibold shadow-lg shadow-primary/25 sm:flex-initial sm:min-w-[9.5rem]"
                    onClick={goNext}
                  >
                    Keyingi
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="h-10 flex-1 rounded-full font-semibold shadow-lg shadow-primary/25 sm:flex-initial sm:min-w-[9.5rem]"
                    onClick={closeAndRemember}
                  >
                    Saytga kirish
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
