import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Ism kamida 2 belgidan iborat bo'lishi kerak" })
    .max(80, { message: "Ism juda uzun" }),
  phone: z
    .string()
    .min(7, { message: "Telefon raqami to'g'ri kiritilmagan" })
    .max(20, { message: "Telefon raqami juda uzun" })
    .regex(/^[+0-9\s()-]+$/, { message: "Faqat raqam va +, -, ( ) belgilari" }),
  email: z.union([
    z.literal(""),
    z.string().email({ message: "Email manzil noto'g'ri" }),
  ]),
  service: z.enum(
    ["singapore", "university", "visa", "bali", "gulf", "other"],
    { message: "Yo'nalishni tanlang" }
  ),
  age: z.enum(["under18", "18-22", "23-27", "28+"], {
    message: "Yoshingizni tanlang",
  }),
  message: z
    .string()
    .min(10, { message: "Xabar kamida 10 belgidan iborat bo'lishi kerak" })
    .max(2000, { message: "Xabar juda uzun (max 2000)" }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const serviceLabels: Record<ContactInput["service"], string> = {
  singapore: "Singapurda o'qish",
  university: "Universitetga kirish",
  visa: "Talabalik vizasi",
  bali: "Bali tayyorgarlik dasturi",
  gulf: "Qatar / Dubay imkoniyatlari",
  other: "Boshqa / aniq bilmayman",
};

export const ageLabels: Record<ContactInput["age"], string> = {
  under18: "18 gacha",
  "18-22": "18 – 22",
  "23-27": "23 – 27",
  "28+": "28+",
};
