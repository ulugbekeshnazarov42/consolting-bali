import { z } from "zod";
import { content } from "@/lib/content";

const errs = content.contactForm.errors;
const serviceKeys = Object.keys(content.contactForm.serviceOptions) as [
  keyof typeof content.contactForm.serviceOptions,
  ...(keyof typeof content.contactForm.serviceOptions)[]
];
const ageKeys = Object.keys(content.contactForm.ageOptions) as [
  keyof typeof content.contactForm.ageOptions,
  ...(keyof typeof content.contactForm.ageOptions)[]
];

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: errs.name.min })
    .max(80, { message: errs.name.max }),
  phone: z
    .string()
    .min(7, { message: errs.phone.min })
    .max(20, { message: errs.phone.max })
    .regex(/^[+0-9\s()-]+$/, { message: errs.phone.regex }),
  email: z.union([
    z.literal(""),
    z.string().email({ message: errs.email }),
  ]),
  service: z.enum(serviceKeys, { message: errs.service }),
  age: z.enum(ageKeys, { message: errs.age }),
  message: z
    .string()
    .min(10, { message: errs.message.min })
    .max(2000, { message: errs.message.max }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const serviceLabels: Record<ContactInput["service"], string> =
  content.contactForm.serviceOptions;

export const ageLabels: Record<ContactInput["age"], string> =
  content.contactForm.ageOptions;
