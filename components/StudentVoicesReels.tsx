"use client";

import * as React from "react";
import Marquee from "react-fast-marquee";
import { motion, useReducedMotion } from "motion/react";
import { MessagesSquare, Play, X } from "lucide-react";
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
import { cn } from "@/lib/utils";

/** Namuna video (haqiqiy talaba videosi URL qo‘shilganda almashtirish mumkin). */
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

type Reel = {
  id: string;
  name: string;
  program: string;
  quote: string;
  image: string;
  /** Bo‘sh bo‘lsa — `REEL_FALLBACK_SOURCES` ishlatiladi */
  videoSources?: readonly { src: string; type: "video/webm" | "video/mp4" }[];
};

const reels: Reel[] = [
  {
    id: "a",
    name: "Madina K.",
    program: "NUS · bakalavr",
    quote: "Hujjatlar tartibi tushunarli bo‘ldi, intervyuga ham birga tayyorlandik.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=480&h=854&q=80",
  },
  {
    id: "b",
    name: "Jasur T.",
    program: "Polytechnic",
    quote: "Telegramda tez javob — har safar chalkash joyni aniqlab berishardi.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=480&h=854&q=80",
  },
  {
    id: "c",
    name: "Nilufar S.",
    program: "Bali tayyorgarlik",
    quote: "Singapurdan oldin Balida til va muhitga o‘rganib oldim, yengilroq bo‘ldi.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=480&h=854&q=80",
  },
  {
    id: "d",
    name: "Behzod M.",
    program: "Viza bosqichi",
    quote: "Viza uchun ro‘yxat aniq edi, nimani qayerdan olishni bilmasdan qolmadi.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&h=854&q=80",
  },
  {
    id: "e",
    name: "Shahnoza R.",
    program: "SMU",
    quote: "Motivatsion xat va SOP uchun bir necha marta suhbat qildik — natija yaxshi.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=480&h=854&q=80",
  },
  {
    id: "f",
    name: "Timur A.",
    program: "Qatar yo‘nalishi",
    quote: "Kelajak rejasini ochiq ko‘rsatishdi, ortiqcha va’da qilmaydilar.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=480&h=854&q=80",
  },
  {
    id: "g",
    name: "Dilnoza H.",
    program: "Ingliz tili kursi",
    quote: "Test va sertifikatlar bo‘yicha ham yo‘l-yo‘riq berishdi.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&h=854&q=80",
  },
  {
    id: "h",
    name: "Oybek N.",
    program: "Umumiy konsultatsiya",
    quote: "Boshida yo‘nalish tanlashda ikkilanardim, birga tartibga solindi.",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=480&h=854&q=80",
  },
];

function ReelVideoBody({
  item,
  videoRef,
}: {
  item: Reel;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const sources = item.videoSources ?? REEL_FALLBACK_SOURCES;

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="relative mx-auto aspect-9/16 max-h-[min(72vh,620px)] w-full max-w-sm md:max-w-md">
        <video
          ref={videoRef}
          poster={item.image}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
          Brauzeringiz video tegini qo‘llab-quvvatlamaydi.
        </video>
      </div>
      <div className="border-t border-border/60 bg-popover px-4 py-4 text-left md:px-5">
        <p className="font-heading text-base font-semibold text-foreground md:text-lg">
          {item.name}
        </p>
        <p className="text-sm text-muted-foreground">{item.program}</p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

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
        "relative mx-2.5 block aspect-9/16 w-[min(11.5rem,calc(100vw-4rem))] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border/55 bg-card text-left shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--foreground)_22%,transparent)] transition-[transform,box-shadow] hover:z-1 hover:scale-[1.02] hover:shadow-[0_24px_56px_-20px_color-mix(in_oklch,var(--foreground)_28%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] sm:mx-3 sm:w-48 md:w-52 md:rounded-3xl motion-reduce:transition-none motion-reduce:hover:scale-100",
        className
      )}
    >
      <span className="sr-only">
        {item.name} — video sharhni ochish
      </span>
      <img
        src={item.image}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/55 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-foreground/35 via-transparent to-transparent opacity-90"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2 sm:inset-x-3 sm:top-3">
        <span className="rounded-full bg-black/45 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-white/95 ring-1 ring-white/25 backdrop-blur-sm sm:text-[10px]">
          <span className="mr-1 inline-block size-1.5 animate-pulse rounded-full bg-red-500 motion-reduce:animate-none" />
          short
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/35 backdrop-blur-md sm:size-10">
          <Play className="size-4 translate-x-0.5 fill-current sm:size-[1.05rem]" aria-hidden />
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
        <p className="text-pretty font-heading text-sm font-bold leading-snug text-foreground sm:text-[0.95rem]">
          &ldquo;{item.quote}&rdquo;
        </p>
        <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-[13px]">
          <span className="text-foreground/90">{item.name}</span>
          <span className="text-muted-foreground/80"> · {item.program}</span>
        </p>
      </div>
    </button>
  );
}

export default function StudentVoicesReels() {
  const reduceMotion = useReducedMotion();
  const rowB = React.useMemo(() => [...reels].reverse(), []);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Reel | null>(null);
  const [useDialogShell, setUseDialogShell] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

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
      id="fikrlar"
      className="relative overflow-hidden border-b border-border/60 bg-muted/25 py-24 md:py-32 dark:bg-muted/10"
      aria-labelledby="fikrlar-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot mask-radial-fade opacity-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-primary/15 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange-500/10 blur-[110px]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center md:max-w-3xl"
        >
          <Badge className="mb-5 gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <MessagesSquare className="size-3.5" />
            Talabalar fikri
          </Badge>
          <h2
            id="fikrlar-heading"
            className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl lg:text-[2.75rem] lg:leading-tight"
          >
            Reels uslubida{" "}
            <span className="text-gradient-orange">jonli sharhlar</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Video qisqa formatdagi kartalar aylanib turadi — har biri haqiqiy
            yo‘l-yo‘riq tajribasidan parcha.
          </p>
        </motion.div>

        <div className="relative mt-14 md:mt-16">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background via-background/80 to-transparent md:w-20 lg:w-28 dark:from-background"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background via-background/80 to-transparent md:w-20 lg:w-28 dark:from-background"
            aria-hidden
          />

          {reduceMotion ? (
            <div
              className="flex flex-wrap justify-center gap-y-8 pb-2 pt-2"
              role="list"
            >
              {reels.slice(0, 6).map((item) => (
                <div key={item.id} role="listitem" className="flex justify-center">
                  <ReelCard item={item} onOpen={openReel} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8 md:gap-10">
              <Marquee speed={34} pauseOnHover gradient={false} className="py-1">
                {reels.map((item) => (
                  <ReelCard key={`a-${item.id}`} item={item} onOpen={openReel} />
                ))}
              </Marquee>
              <Marquee
                speed={28}
                direction="right"
                pauseOnHover
                gradient={false}
                className="py-1"
              >
                {rowB.map((item) => (
                  <ReelCard key={`b-${item.id}`} item={item} onOpen={openReel} />
                ))}
              </Marquee>
            </div>
          )}
        </div>
      </div>

      {selected && open && useDialogShell ? (
        <Dialog open onOpenChange={handleOpenChange}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[min(calc(100vw-1rem),24rem)] gap-0 overflow-hidden rounded-2xl border-border/60 p-0 sm:max-w-[min(calc(100vw-2rem),28rem)]"
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{selected.name}</DialogTitle>
              <DialogDescription>
                Talaba video sharhi — {selected.program}
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-20 size-10 rounded-full border border-border/50 bg-background/80 text-foreground shadow-sm backdrop-blur-md hover:bg-background"
                aria-label="Yopish"
              >
                <X className="size-4" />
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
          <DrawerContent className="max-h-[92vh] rounded-t-2xl border-border/60 p-0 [&>div:first-child]:mt-3">
            <DrawerHeader className="sr-only">
              <DrawerTitle>{selected.name}</DrawerTitle>
              <DrawerDescription>
                Talaba video sharhi — {selected.program}
              </DrawerDescription>
            </DrawerHeader>
            <div className="relative max-h-[calc(92vh-1rem)] overflow-y-auto">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-3 z-20 size-10 rounded-full border border-border/50 bg-background/85 text-foreground shadow-sm backdrop-blur-md hover:bg-background"
                  aria-label="Yopish"
                >
                  <X className="size-4" />
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
