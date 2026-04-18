"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Mavzuni almashtirish"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative size-9 rounded-full border-border/60 bg-background/40 backdrop-blur hover:bg-primary/10 hover:border-primary/40"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="size-4 text-primary" />
          ) : (
            <Sun className="size-4 text-primary" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
