"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const scrollRaf = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      if (scrollRaf.current) return;
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = 0;
        const y = window.scrollY;
        setScrolled((prev) => {
          const next = y > 12;
          return next === prev ? prev : next;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "pt-[env(safe-area-inset-top,0px)]",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-14 min-h-14 items-center justify-between gap-3 px-3 sm:h-16 sm:min-h-16 sm:gap-4 sm:px-4 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="icon"
            variant="default"
            className={cn(
              "shrink-0 rounded-full bg-primary font-semibold leading-none text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90",
              "size-11 min-h-11 min-w-11 max-sm:max-h-11 max-sm:max-w-11 p-0",
              "sm:h-auto sm:min-h-0 sm:w-auto sm:max-w-none sm:gap-1.5 sm:px-4 sm:py-2.5 sm:text-sm"
            )}
          >
            <a
              href="#contact"
              aria-label={content.navbar.ctaLabel}
              className="inline-flex max-sm:size-11 max-sm:items-center max-sm:justify-center items-center justify-center gap-0 sm:gap-1.5"
            >
              <span className="hidden sm:inline">{content.navbar.ctaLabel}</span>
              <ArrowUpRight className="size-4 shrink-0 sm:size-3.5" aria-hidden />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={content.navbar.menuLabel}
            className="size-11 min-h-11 min-w-11 rounded-full border-border/60 lg:hidden sm:size-10 sm:min-h-10 sm:min-w-10"
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {content.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 opacity-50" />
                </motion.a>
              ))}
              <Button
                asChild
                className="mt-2 w-full rounded-xl bg-primary text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                <a href="#contact">{content.navbar.mobileCtaLabel}</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
