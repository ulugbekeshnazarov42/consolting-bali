"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

const socials = [
  {
    label: "Telegram",
    href: content.social.telegram,
    Icon: FaTelegramPlane,
    className: "text-[#229ED9]",
  },
  {
    label: "Instagram",
    href: content.social.instagram,
    Icon: FaInstagram,
    className: "text-[#E4405F]",
  },
  {
    label: "YouTube",
    href: content.social.youtube,
    Icon: FaYoutube,
    className: "text-[#FF0000]",
  },
] as const;

export default function FloatingDock() {
  const [showScroll, setShowScroll] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
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
      className="pointer-events-none fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-60 flex flex-col items-end gap-2 sm:right-5 md:right-6 md:bottom-6"
      aria-label={content.floatingDock.ariaLabel}
    >
      <div className="pointer-events-auto hidden flex-col items-end gap-2 md:flex">
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
      </div>

      <div className="pointer-events-auto flex flex-col items-end gap-2 md:hidden">
        <AnimatePresence initial={false}>
          {expanded &&
            socials.map(({ label, href, Icon, className }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.9 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.22,
                  delay: reduceMotion ? 0 : i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setExpanded(false)}
                className={cn(
                  "grid size-10 place-items-center rounded-full border border-border/60 bg-card/95 text-primary shadow-lg shadow-black/15 backdrop-blur-sm",
                  className
                )}
              >
                <Icon className="size-[17px]" />
              </motion.a>
            ))}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={
            expanded
              ? content.floatingDock.toggleCloseLabel
              : content.floatingDock.toggleOpenLabel
          }
          className={cn(
            "grid size-11 place-items-center rounded-full border shadow-lg backdrop-blur-sm transition-colors",
            expanded
              ? "border-border/60 bg-card/95 text-foreground"
              : "border-primary/30 bg-primary text-primary-foreground shadow-primary/30"
          )}
        >
          {expanded ? (
            <X className="size-[18px]" strokeWidth={2.5} />
          ) : (
            <MessageCircle className="size-[18px]" strokeWidth={2.2} />
          )}
        </button>
      </div>

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
            aria-label={content.floatingDock.scrollTopLabel}
            className="pointer-events-auto grid size-11 place-items-center rounded-full border border-border/60 bg-card/95 text-foreground shadow-lg shadow-black/15 backdrop-blur-sm transition-colors hover:border-primary/40 md:size-12 md:border-primary/30 md:bg-primary md:text-primary-foreground md:shadow-primary/35"
          >
            <ArrowUp className="size-[18px] md:size-5" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
