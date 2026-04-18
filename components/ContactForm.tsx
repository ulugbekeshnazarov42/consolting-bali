"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Send,
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  contactSchema,
  type ContactInput,
  serviceLabels,
  ageLabels,
} from "@/lib/schemas";
import { content } from "@/lib/content";

const form = content.contactForm;

const contacts = [
  {
    icon: Phone,
    label: content.contact.phoneLabel,
    value: content.contact.phone,
    href: `tel:${content.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: content.contact.emailLabel,
    value: content.contact.email,
    href: `mailto:${content.contact.email}`,
  },
  {
    icon: MessageSquare,
    label: content.contact.telegramLabel,
    value: content.contact.telegram,
    href: content.social.telegram,
  },
  {
    icon: MapPin,
    label: content.contact.addressLabel,
    value: content.contact.address,
    href: "#",
  },
];

function isCurrentlyOnline(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const { weekdays, saturday, sundayClosed } = content.contact.hours;

  if (day === 0 && sundayClosed) return false;
  if (day === 6) return hour >= saturday.startHour && hour < saturday.endHour;
  return hour >= weekdays.startHour && hour < weekdays.endHour;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [online, setOnline] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setOnline(isCurrentlyOnline());
    const id = setInterval(() => setOnline(isCurrentlyOnline()), 60_000);
    return () => clearInterval(id);
  }, []);

  const hookForm = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: undefined as unknown as ContactInput["service"],
      age: undefined as unknown as ContactInput["age"],
      message: "",
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = hookForm;

  const service = watch("service");
  const age = watch("age");

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || form.toast.errorFallback);
      }

      toast.success(form.toast.successTitle, {
        description: form.toast.successDesc,
      });
      reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      toast.error(form.toast.errorTitle, {
        description:
          err instanceof Error ? err.message : form.toast.errorFallback,
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-border/60 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-80 w-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-[72px]"
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
            {form.badge}
          </Badge>
          <h2 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="text-gradient-orange">{form.heading.accent}</span>{" "}
            {form.heading.after}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {form.paragraph}
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-5">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:p-8">
              <h3 className="text-lg font-bold tracking-tight">
                {form.side.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {form.side.paragraph}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {contacts.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {label}
                      </p>
                      <p className="truncate text-sm font-medium">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-transparent to-orange-500/10 p-6 md:p-8">
              <h3 className="text-lg font-bold tracking-tight">
                {form.side.hoursTitle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {content.contact.hours.weekdays.days} · {content.contact.hours.weekdays.time}
                <br />
                {content.contact.hours.saturday.days} · {content.contact.hours.saturday.time}
              </p>
              {online !== null && (
                <p
                  className={`mt-4 flex items-center gap-2 text-xs font-semibold ${
                    online ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <span className="relative flex size-2">
                    {online && (
                      <span className="absolute inset-0 motion-reduce:animate-none animate-ping rounded-full bg-primary/60" />
                    )}
                    <span
                      className={`relative size-2 rounded-full ${
                        online ? "bg-primary" : "bg-muted-foreground/70"
                      }`}
                    />
                  </span>
                  {online
                    ? content.contact.hours.onlineBadge
                    : content.contact.hours.offlineBadge}
                </p>
              )}
            </div>
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative flex flex-col gap-5 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:p-10 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                  {form.fields.name.label} <span className="text-primary">{form.required}</span>
                </Label>
                <Input
                  id="name"
                  placeholder={form.fields.name.placeholder}
                  aria-invalid={!!errors.name}
                  className="h-11 rounded-xl"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">
                  {form.fields.phone.label} <span className="text-primary">{form.required}</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={form.fields.phone.placeholder}
                  aria-invalid={!!errors.phone}
                  className="h-11 rounded-xl"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{form.fields.email.label}</Label>
              <Input
                id="email"
                type="email"
                placeholder={form.fields.email.placeholder}
                aria-invalid={!!errors.email}
                className="h-11 rounded-xl"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label>
                  {form.fields.service.label} <span className="text-primary">{form.required}</span>
                </Label>
                <Select
                  value={service}
                  onValueChange={(v) =>
                    setValue("service", v as ContactInput["service"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    aria-invalid={!!errors.service}
                    className="h-11 w-full rounded-xl"
                  >
                    <SelectValue placeholder={form.fields.service.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(serviceLabels).map(([k, label]) => (
                      <SelectItem key={k} value={k}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-xs text-destructive">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>
                  {form.fields.age.label} <span className="text-primary">{form.required}</span>
                </Label>
                <Select
                  value={age}
                  onValueChange={(v) =>
                    setValue("age", v as ContactInput["age"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    aria-invalid={!!errors.age}
                    className="h-11 w-full rounded-xl"
                  >
                    <SelectValue placeholder={form.fields.age.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ageLabels).map(([k, label]) => (
                      <SelectItem key={k} value={k}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.age && (
                  <p className="text-xs text-destructive">
                    {errors.age.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="message">
                {form.fields.message.label} <span className="text-primary">{form.required}</span>
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder={form.fields.message.placeholder}
                aria-invalid={!!errors.message}
                className="min-h-32 rounded-xl"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="group h-12 gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {form.submit.loading}
                </>
              ) : submitted ? (
                <>
                  <CheckCircle2 className="size-4" />
                  {form.submit.done}
                </>
              ) : (
                <>
                  <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                  {form.submit.idle}
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              {form.consent.before}
              <a href={form.consent.linkHref} className="text-primary hover:underline">
                {form.consent.link}
              </a>
              {form.consent.after}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
