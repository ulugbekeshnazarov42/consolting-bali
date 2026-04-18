import { GraduationCap } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={cn("group flex items-center gap-2.5 select-none", className)}
      aria-label={content.logo.ariaLabel}
    >
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary via-orange-500 to-amber-500 shadow-lg shadow-primary/30 transition-transform group-hover:scale-105">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-80" />
        <GraduationCap className="relative size-5 text-primary-foreground" strokeWidth={2.4} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight text-foreground">
          {content.logo.primary}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {content.logo.secondary}
        </span>
      </span>
    </a>
  );
}
