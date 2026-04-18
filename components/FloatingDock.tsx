"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const socials = [
  {
    label: "Telegram",
    href: site.social.telegram,
    Icon: FaTelegramPlane,
    className: "text-[#229ED9]",
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    Icon: FaInstagram,
    className: "text-[#E4405F]",
  },
  {
    label: "YouTube",
    href: site.social.youtube,
    Icon: FaYoutube,
    className: "text-[#FF0000]",
  },
] as const;

export default function FloatingDock() {
  const [showScroll, setShowScroll] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="pointer-events-none fixed right-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-60 flex flex-col items-end gap-2 sm:right-5 md:right-6 md:bottom-6"
      aria-label="Tezkor aloqa va sahifa boshiga"
    >
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {socials.map(({ label, href, Icon, className }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "grid size-11 place-items-center rounded-full border border-border/60 bg-card/92 text-primary shadow-lg shadow-black/10 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-xl",
              className
            )}
          >
            <Icon className="size-[18px]" />
          </motion.a>
        ))}

        <AnimatePresence>
          {showScroll && (
            <motion.button
              type="button"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.85, y: 24 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={scrollTop}
              aria-label="Sahifa boshiga qaytish"
              className="grid size-12 place-items-center rounded-full border border-primary/30 bg-primary text-primary-foreground shadow-lg shadow-primary/35 transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              <ArrowUp className="size-5" strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
