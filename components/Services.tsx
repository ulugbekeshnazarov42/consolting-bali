"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  School,
  FileCheck2,
  Sprout,
  Globe2,
  MessagesSquare,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: GraduationCap,
    title: "Singapurda o'qish",
    desc: "Singapurning yetakchi universitet va institutlarini tanlash, dastur bo'yicha ma'lumot va arizani to'g'ri tayyorlashda yo'l-yo'riq.",
    tags: ["Universitet", "Polytechnic", "Ingliz tili"],
    span: "lg:col-span-2",
  },
  {
    icon: School,
    title: "Universitetga kirish",
    desc: "Mos dasturni tanlash, motivatsion xat va hujjatlar ro'yxatini tayyorlash, muddatlarni kuzatish.",
    tags: ["Ariza", "SOP", "Test"],
    span: "",
  },
  {
    icon: FileCheck2,
    title: "Talabalik vizasi",
    desc: "Viza hujjatlari ro'yxatini birga tayyorlash, intervyu va shart-sharoitlarni ochiq tushuntirish.",
    tags: ["Hujjatlar", "Intervyu"],
    span: "",
  },
  {
    icon: Sprout,
    title: "Bali tayyorgarlik dasturi",
    desc: "Xorijiy muhitga dastlabki moslashish uchun Balidagi qisqa muddatli til va kasb-hunar tayyorgarligi.",
    tags: ["Til", "Hunar", "Adaptatsiya"],
    span: "lg:col-span-2",
  },
  {
    icon: Globe2,
    title: "Qatar / Dubay imkoniyatlari",
    desc: "O'qish yakunlagandan keyingi kelajak uchun Qatar va Dubayda ish va rivojlanish yo'nalishlari.",
    tags: ["Karyera", "Ish", "Grow"],
    span: "",
  },
  {
    icon: MessagesSquare,
    title: "Umumiy konsultatsiya",
    desc: "Qaysi yo'nalish sizga mos ekanini aniqlay olmaganingizda — birga tanlab olamiz.",
    tags: ["1:1", "Bepul"],
    span: "lg:col-span-2",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-border/60 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot mask-radial-fade opacity-30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge className="mb-5 gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Xizmatlar
          </Badge>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Har bir talaba uchun{" "}
            <span className="text-gradient-orange">aniq yo'l</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Universitet tanlovidan talabalik vizasigacha — maqsadingizga
            mos qadamlarni birga rejalashtiramiz.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4"
        >
          {services.map(({ icon: Icon, title, desc, tags, span }, i) => (
            <motion.article
              key={title}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={cn(
                "group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-7 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card/80",
                span
              )}
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--primary) 18%, transparent), transparent 60%)",
                }}
                aria-hidden
              />

              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-primary/20 to-orange-500/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="size-6" />
                </span>
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  0{i + 1}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  aria-label={`${title} haqida so'rash`}
                  className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
