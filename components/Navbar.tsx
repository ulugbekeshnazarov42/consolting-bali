"use client";

import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

// --- GSAP Magnetic Button Component ---
function MagneticNavElement({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3); // Magnit kuchi
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className="relative flex items-center justify-center z-50">
      {children}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const scrollRaf = React.useRef(0);

  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (scrollRaf.current) return;
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = 0;
        const y = window.scrollY;
        setScrolled((prev) => {
          const next = y > 20;
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

  // Header har doim menyu ochilganda yoki scroll bo'lganda qorayib turishi uchun
  const isSolid = scrolled || open;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        "pt-[env(safe-area-inset-top,0px)]",
        isSolid
          ? "border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-sm py-2 dark:border-white/10 dark:bg-black/80"
          : "border-b border-transparent bg-transparent py-4",
      )}
    >
      <div className="container relative mx-auto flex items-center justify-between gap-3 px-4 md:px-6 z-10">
        {/* LOGO */}
        <div className="relative z-50" onClick={() => setOpen(false)}>
          <Logo />
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden items-center gap-1 lg:flex bg-muted/50 border border-border/50 rounded-full px-2 py-1.5 backdrop-blur-md dark:bg-white/5 dark:border-white/10">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredPath(item.href)}
              onMouseLeave={() => setHoveredPath(null)}
              className="relative px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground dark:hover:text-white"
            >
              {hoveredPath === item.href && (
                <motion.div
                  layoutId="navbar-hover-pill"
                  className="absolute inset-0 z-0 rounded-full bg-background shadow-md dark:bg-white/10 dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 relative z-50">
          <ThemeToggle />

          {/* GSAP Magnetic Desktop CTA */}
          <div className="hidden sm:block">
            <MagneticNavElement>
              <Button
                asChild
                className="group relative rounded-full bg-primary px-6 py-5 font-semibold text-primary-foreground overflow-hidden border border-primary/50 shadow-[0_0_20px_-5px_var(--primary)] transition-all hover:shadow-[0_0_30px_-5px_var(--primary)] hover:scale-105"
              >
                <a href="#contact" aria-label={content.navbar.ctaLabel}>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <span className="relative z-10 flex items-center gap-2">
                    {content.navbar.ctaLabel}
                    <span className="flex size-6 items-center justify-center rounded-full bg-black/20 group-hover:bg-black/40 transition-colors">
                      <ArrowUpRight
                        className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </span>
                </a>
              </Button>
            </MagneticNavElement>
          </div>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            aria-label={content.navbar.menuLabel}
            className="size-11 shrink-0 rounded-full border-border/50 bg-background/50 backdrop-blur-md hover:bg-muted text-foreground dark:border-white/20 dark:bg-white/5 lg:hidden relative overflow-hidden transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN MENU (v2.2 Clean Design) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            // Light modeda fonga 98% rang beriladi, shunda orqadagi yozuvlar umuman xalaqit qilmaydi
            className="fixed inset-x-0 bottom-0 top-[60px] z-40 bg-background/98 backdrop-blur-xl dark:bg-black/90 lg:hidden overflow-y-auto"
          >
            {/* Dark mode uchun mayin nurlar */}
            <div className="absolute top-10 left-10 size-40 rounded-full bg-primary/10 blur-[60px] hidden dark:block pointer-events-none" />
            <div className="absolute bottom-40 right-10 size-40 rounded-full bg-orange-500/10 blur-[60px] hidden dark:block pointer-events-none" />

            <div className="relative container mx-auto px-4 py-8 flex flex-col min-h-full">
              <nav className="flex flex-col gap-3">
                {content.nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    // Linklar endi toza card ko'rinishida
                    className="group relative flex items-center justify-between rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/40 hover:bg-muted/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <span className="relative z-10 flex items-center gap-3 text-[1.05rem] font-bold text-foreground dark:text-white/90">
                      <Sparkles className="size-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      {item.label}
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-white/30" />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: content.nav.length * 0.05 + 0.1 }}
                className="mt-10 mb-8"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl bg-primary h-14 text-lg font-bold text-primary-foreground shadow-[0_0_30px_-5px_var(--primary)] border border-primary/50 relative overflow-hidden group"
                  onClick={() => setOpen(false)}
                >
                  <a href="#contact">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2">
                      {content.navbar.mobileCtaLabel}
                      <ArrowUpRight className="size-5" />
                    </span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
