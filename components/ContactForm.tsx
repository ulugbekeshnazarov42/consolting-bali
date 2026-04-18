"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { Mail, MapPin, MessageSquare, Phone, Sparkles } from "lucide-react";
import { HiCheckCircle, HiPaperAirplane } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import { motion } from "motion/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { content } from "@/lib/content";
import {
  SECTION_HEADING_ACCENT_CLASS,
  sectionHeadingClassName,
} from "@/lib/section-heading";
import {
  ageLabels,
  contactSchema,
  serviceLabels,
  type ContactInput,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

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

// --- GSAP Magnetic Button Component ---
function MagneticElement({
  children,
  strength = 0.15,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
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
      xTo(x * strength);
      yTo(y * strength);
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
  }, [strength]);

  return (
    <div ref={ref} className="w-full z-10">
      {children}
    </div>
  );
}

// Barcha Input, Select va Textarea uchun aynan bir xil premium stillar
const fieldBaseStyles =
  "rounded-2xl border-border/60 bg-background/50 px-4 text-base text-foreground placeholder:text-muted-foreground transition-all duration-300 hover:bg-background hover:border-border focus-visible:border-primary focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/50 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 shadow-sm";

export default function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [online, setOnline] = React.useState<boolean | null>(null);

  // GSAP Refs
  const sectionRef = React.useRef<HTMLElement>(null);
  const orb1Ref = React.useRef<HTMLDivElement>(null);
  const orb2Ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setOnline(isCurrentlyOnline());
    const id = setInterval(() => setOnline(isCurrentlyOnline()), 60_000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    // Background Ambient GSAP Animation
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        y: "random(-50, 50)",
        x: "random(-50, 50)",
        scale: "random(0.8, 1.2)",
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
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
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden border-b border-border/40 bg-background py-24 md:py-32"
    >
      {/* Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-[0.15] dark:opacity-30 z-0"
        aria-hidden
      />

      {/* Animated GSAP Orbs */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] opacity-40 dark:opacity-60 z-0"
        aria-hidden
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-orange-500/15 blur-[120px] opacity-40 dark:opacity-60 z-0"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        {/* HEADER (Perfectly Centered & Wide) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center"
        >
          <Badge className="mb-6 gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-primary shadow-sm backdrop-blur-md">
            <Sparkles className="size-4" />
            {form.badge}
          </Badge>
          <h2 className={sectionHeadingClassName({ className: "w-full" })}>
            <span className="relative inline-block my-1 group">
              <span className="pointer-events-none absolute inset-[-0.1em_-0.2em] -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-orange-500/20 blur-xl opacity-60 dark:opacity-80" />
              <span
                className={cn(SECTION_HEADING_ACCENT_CLASS, "drop-shadow-sm")}
              >
                {form.heading.accent}
              </span>
            </span>{" "}
            <span className="text-foreground/90">{form.heading.after}</span>
          </h2>
          <p className="mt-6 w-full max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {form.paragraph}
          </p>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* LEFT SIDE: Contact Info */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            {/* Contact Links Box */}
            <div className="rounded-[2rem] border border-border/50 bg-card/60 p-6 backdrop-blur-2xl shadow-xl md:p-8 dark:bg-card/30 dark:border-white/10">
              <h3 className="text-xl font-bold capitalize tracking-tight text-foreground">
                {form.side.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {form.side.paragraph}
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {contacts.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group relative flex items-center gap-4 rounded-2xl border border-border/60 bg-background/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-background hover:shadow-md dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 dark:hover:shadow-[0_10px_30px_-10px_var(--primary)]"
                  >
                    <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-primary/80">
                        {label}
                      </p>
                      <p className="truncate text-sm font-semibold text-foreground mt-0.5">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Working Hours Box */}
            <div className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-card/50 to-orange-500/5 p-6 backdrop-blur-2xl shadow-lg md:p-8 dark:from-primary/20 dark:via-black/40 dark:to-orange-500/10 dark:shadow-[0_0_40px_-15px_var(--primary)]">
              <h3 className="text-xl font-bold capitalize tracking-tight text-foreground">
                {form.side.hoursTitle}
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground flex justify-between border-b border-border/50 pb-2 dark:border-white/10">
                  <span>{content.contact.hours.weekdays.days}</span>
                  <span className="text-foreground">
                    {content.contact.hours.weekdays.time}
                  </span>
                </p>
                <p className="text-sm font-medium text-muted-foreground flex justify-between pt-1">
                  <span>{content.contact.hours.saturday.days}</span>
                  <span className="text-foreground">
                    {content.contact.hours.saturday.time}
                  </span>
                </p>
              </div>

              {online !== null && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-background/60 px-4 py-3 border border-border/50 dark:bg-black/40 dark:border-white/5">
                  <span className="relative flex size-3">
                    {online && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-green-500/60" />
                    )}
                    <span
                      className={`relative size-3 rounded-full ${
                        online
                          ? "bg-green-500 shadow-[0_0_10px_#22c55e]"
                          : "bg-muted-foreground/50"
                      }`}
                    />
                  </span>
                  <span
                    className={`text-sm font-bold tracking-wide ${online ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                  >
                    {online
                      ? content.contact.hours.onlineBadge
                      : content.contact.hours.offlineBadge}
                  </span>
                </div>
              )}
            </div>
          </motion.aside>

          {/* RIGHT SIDE: Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative flex flex-col gap-6 rounded-[2rem] border border-border/50 bg-card/60 p-6 backdrop-blur-2xl shadow-xl md:p-10 lg:col-span-3 dark:bg-card/30 dark:border-white/10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Ism Input */}
              <div className="flex flex-col gap-2.5">
                <Label
                  htmlFor="name"
                  className="text-foreground/90 font-medium ml-1"
                >
                  {form.fields.name.label}{" "}
                  <span className="text-primary">{form.required}</span>
                </Label>
                <Input
                  id="name"
                  placeholder={form.fields.name.placeholder}
                  aria-invalid={!!errors.name}
                  className={cn(
                    "h-14",
                    fieldBaseStyles,
                    errors.name &&
                      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
                  )}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs font-medium text-destructive ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Telefon Input */}
              <div className="flex flex-col gap-2.5">
                <Label
                  htmlFor="phone"
                  className="text-foreground/90 font-medium ml-1"
                >
                  {form.fields.phone.label}{" "}
                  <span className="text-primary">{form.required}</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={form.fields.phone.placeholder}
                  aria-invalid={!!errors.phone}
                  className={cn(
                    "h-14",
                    fieldBaseStyles,
                    errors.phone &&
                      "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
                  )}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs font-medium text-destructive ml-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2.5">
              <Label
                htmlFor="email"
                className="text-foreground/90 font-medium ml-1"
              >
                {form.fields.email.label}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={form.fields.email.placeholder}
                aria-invalid={!!errors.email}
                className={cn(
                  "h-14",
                  fieldBaseStyles,
                  errors.email &&
                    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
                )}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs font-medium text-destructive ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Xizmat turi Select */}
              <div className="flex flex-col gap-2.5">
                <Label className="text-foreground/90 font-medium ml-1">
                  {form.fields.service.label}{" "}
                  <span className="text-primary">{form.required}</span>
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
                    className={cn(
                      "h-14 w-full",
                      fieldBaseStyles,
                      errors.service &&
                        "border-destructive focus:border-destructive focus:ring-destructive/50",
                      !service && "text-muted-foreground font-normal",
                    )}
                  >
                    <SelectValue
                      placeholder={form.fields.service.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-border bg-popover text-popover-foreground shadow-xl dark:border-white/10 dark:bg-black/90 dark:backdrop-blur-xl">
                    {Object.entries(serviceLabels).map(([k, label]) => (
                      <SelectItem
                        key={k}
                        value={k}
                        className="focus:bg-primary/10 focus:text-primary rounded-xl cursor-pointer"
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-xs font-medium text-destructive ml-1">
                    {errors.service.message}
                  </p>
                )}
              </div>

              {/* Yosh oralig'i Select */}
              <div className="flex flex-col gap-2.5">
                <Label className="text-foreground/90 font-medium ml-1">
                  {form.fields.age.label}{" "}
                  <span className="text-primary">{form.required}</span>
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
                    className={cn(
                      "h-14 w-full",
                      fieldBaseStyles,
                      errors.age &&
                        "border-destructive focus:border-destructive focus:ring-destructive/50",
                      !age && "text-muted-foreground font-normal",
                    )}
                  >
                    <SelectValue placeholder={form.fields.age.placeholder} />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-border bg-popover text-popover-foreground shadow-xl dark:border-white/10 dark:bg-black/90 dark:backdrop-blur-xl">
                    {Object.entries(ageLabels).map(([k, label]) => (
                      <SelectItem
                        key={k}
                        value={k}
                        className="focus:bg-primary/10 focus:text-primary rounded-xl cursor-pointer"
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.age && (
                  <p className="text-xs font-medium text-destructive ml-1">
                    {errors.age.message}
                  </p>
                )}
              </div>
            </div>

            {/* Xabar Textarea */}
            <div className="flex flex-col gap-2.5">
              <Label
                htmlFor="message"
                className="text-foreground/90 font-medium ml-1"
              >
                {form.fields.message.label}{" "}
                <span className="text-primary">{form.required}</span>
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder={form.fields.message.placeholder}
                aria-invalid={!!errors.message}
                className={cn(
                  "min-h-[140px] py-4 resize-y",
                  fieldBaseStyles,
                  errors.message &&
                    "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50",
                )}
                {...register("message")}
              />
              {errors.message && (
                <p className="text-xs font-medium text-destructive ml-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="mt-2">
              <MagneticElement strength={0.15}>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="group relative h-16 w-full overflow-hidden rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <ImSpinner2
                          className="size-5 shrink-0 animate-spin"
                          aria-hidden
                        />
                        {form.submit.loading}
                      </>
                    ) : submitted ? (
                      <>
                        <HiCheckCircle
                          className="size-5 shrink-0 text-green-300"
                          aria-hidden
                        />
                        {form.submit.done}
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane
                          className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                          aria-hidden
                        />
                        {form.submit.idle}
                      </>
                    )}
                  </span>
                </Button>
              </MagneticElement>
            </div>

            <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
              {form.consent.before}
              <a
                href={form.consent.linkHref}
                className="text-primary font-medium hover:underline hover:text-primary/80 transition-colors"
              >
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
