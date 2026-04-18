"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { TrendingUp, Users2, Globe2, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 320,
    suffix: "+",
    label: "Muvaffaqiyatli loyihalar",
  },
  {
    icon: Users2,
    value: 150,
    suffix: "+",
    label: "Faol mijozlar",
  },
  {
    icon: Globe2,
    value: 12,
    suffix: "",
    label: "Davlatlarda hamkorlik",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Mijoz qoniqishi",
  },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("uz-UZ"));

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, count, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden border-b border-border/60 py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-primary/[0.04]"
        aria-hidden
      />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/80 md:p-8"
            >
              <div className="mb-4 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <Icon className="size-5" />
              </div>
              <div className="text-4xl font-extrabold tracking-tight md:text-5xl">
                <span className="text-gradient-orange">
                  <Counter to={value} suffix={suffix} />
                </span>
              </div>
              <p className="mt-2 text-sm leading-tight text-muted-foreground">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
