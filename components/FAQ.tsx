"use client";

import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    q: "Birinchi konsultatsiya bepulmi?",
    a: "Ha — tanishuv va dastlabki yo'nalish suhbati odatda bepul. Keyingi bosqichlarda (hujjat tayyorlash, kuzatuv) xizmat hajmi va vaqt bo'yicha oldindan kelishamiz.",
  },
  {
    q: "Singapurda o'qish uchun nimadan boshlash kerak?",
    a: "Avvalo maqsad va fan yo'nalishingizni aniqlaymiz, keyin mos dasturlar va kirish talablarini ko'rib chiqamiz. IELTS/TOEFL va akademik hujjatlar ro'yxati har bir universitet bo'yicha farq qiladi — bularni birga tartibga solamiz.",
  },
  {
    q: "Talabalik vizasini kafolat qilasizmi?",
    a: "Yo'q — hech kim vizani kafolatlay olmaydi. Biz hujjatlarni to'g'ri tartibda tayyorlash, talablarni tushuntirish va jarayonni rejalashtirishda yordam beramiz. Yakuniy qaror har doim viza organlari qo'lida.",
  },
  {
    q: "Universitetga kirishni kafolat qilasizmi?",
    a: "Yo'q. Qabul qilishni universitet va dastur hal qiladi. Biz arizani kuchaytirish, motivatsion xat va strategiyani yaxshilashda yordam beramiz.",
  },
  {
    q: "Bali dasturi nima uchun kerak?",
    a: "Bu qisqa muddatli tayyorgarlik va xorijiy muhitga moslashish uchun variant bo'lishi mumkin — til, intizom va keyingi bosqich (masalan, Singapur yoki boshqa mamlakat) uchun poydevor.",
  },
  {
    q: "Qatar yoki Dubay haqida maslahat berasizmi?",
    a: "Ha — o'qishdan keyingi yo'nalish va ish imkoniyatlari bo'yicha umumiy yo'l-yo'riq beramiz. Aniq vakansiya yoki ish taklifini kafolatlamaymiz, lekin realistik reja tuzishga yordam beramiz.",
  },
  {
    q: "Hujjatlar va shaxsiy ma'lumotlar xavfsizligi qanday?",
    a: "Ma'lumotlaringiz faqat konsultatsiya maqsadida ishlatiladi va uchinchi shaxslarga sotilmaydi. Kelajakda sayt kontenti CMS (masalan, Strapi) orqali boshqarilsa ham, shaxsiy ma'lumotlar server tomonda qoladi.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-border/60 bg-background/60 py-24 md:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge className="mb-5 gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <HelpCircle className="size-3.5" />
            Savol-javoblar
          </Badge>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            Ko'p so'raladigan{" "}
            <span className="text-gradient-orange">savollar</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Quyida eng ko'p uchraydigan savollarga javoblar. Javob topmasangiz —
            biz bilan bog'laning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border/60 bg-card/60 p-2 backdrop-blur-sm md:p-4"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="px-4 not-last:border-b border-border/60"
              >
                <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold tracking-tight hover:no-underline hover:text-primary md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
