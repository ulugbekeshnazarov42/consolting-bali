"use client";

import { motion } from "motion/react";
import {
  Heart,
  Eye,
  Send,
  Languages,
  Handshake,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const reasons = [
  {
    icon: Heart,
    title: "Shaxsiy yondashuv",
    desc: "Har bir talaba — alohida voqea. Konveyer usulida emas, haqiqiy suhbat bilan ishlaymiz.",
  },
  {
    icon: Eye,
    title: "Shaffoflik",
    desc: "Narx, muddat va imkoniyatlarni boshidanoq ochiq aytamiz. Yashirin to'lovlar yo'q.",
  },
  {
    icon: UserCheck,
    title: "Realistik va'dalar",
    desc: "Kafolatlangan viza yoki kirish va'da qilmaymiz — faqat haqiqiy imkoniyatni ko'rsatamiz.",
  },
  {
    icon: Send,
    title: "Telegramda tez javob",
    desc: "Asosiy aloqa — Telegram. Ish vaqtida savollaringizga bir necha soat ichida javob.",
  },
  {
    icon: Languages,
    title: "O'zbek va rus tilida",
    desc: "Murakkab hujjat va shartlarni o'zingizga tanish tilda sodda qilib tushuntiramiz.",
  },
  {
    icon: Handshake,
    title: "Ketgandan keyin ham",
    desc: "Siz borganingizdan keyin ham savollaringiz bo'lsa — aloqadamiz, tashlab ketmaymiz.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why"
      className="relative overflow-hidden border-b border-border/60 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-96 w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge className="mb-5 gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Nega biz
          </Badge>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Ishonch —{" "}
            <span className="text-gradient-orange">eng muhim qadam</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Xorijda ta'lim — katta qaror. Shuning uchun shaffof, halol va
            insonga yaqin muloqot bilan ishlaymiz.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map(({ icon: Icon, title, desc }) => (
            <motion.article
              key={title}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card/80"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-orange-500/10 text-primary ring-1 ring-inset ring-primary/20">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
