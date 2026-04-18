@AGENTS.md

# Guzal Opa Education — Project Context

Brand: **Guzal Opa Education** — yosh talabalarga xorijda (Singapur va Bali) ta'lim bo'yicha shaxsiy maslahatchi. Xizmatlar: universitetga kirish, hujjatlarni tayyorlash (ariza, motivatsion xat, tarjima), talabalik vizasi, Bali tayyorgarlik dasturi.

## Stack

- **Next.js 16.2.4** (App Router) + **React 19.2**
- **TypeScript** (strict) — JSON modules enabled via `resolveJsonModule`
- **Tailwind CSS v4** — `@theme inline` in `app/globals.css`, no `tailwind.config.*`
- **shadcn/ui** (radix-nova style, neutral base) — components in `components/ui/`
- **motion/react** for animations
- **next-themes** (class strategy, default `dark`)
- **react-hook-form + zod + @hookform/resolvers** for forms
- **Google Fonts: Sora** via `next/font/google`
- **Lucide icons**

## Visual language

- **Theme:** dark-first, orange accent on zinc neutrals
- **Accent:** `oklch` orange (primary ≈ `oklch(0.769 0.188 70.08)`)
- **Neutrals:** zinc scale
- **Radius:** `0.75rem` base
- **Typography:** Sora (extrabold for headlines, medium for body)
- **Motion:** `motion/react` — `whileInView` reveals, staggered children, springs

## Content system — single source of truth

**All user-facing text lives in `content/site.uz.json`.** Components never hardcode strings.

- `lib/content.ts` — typed loader; exports `content`, `site`, `resolveHref()`, `interpolate()`
- `lib/icons.ts` — maps icon name strings from JSON to Lucide components (`getIcon(name)`)
- `lib/schemas.ts` — reads error messages and service/age labels from JSON
- `lib/telegram.ts` — reads lead labels and title from JSON

Adding or changing copy = edit JSON only. Adding a new icon = add to `iconMap` in `lib/icons.ts`. `href` values in JSON support symbolic strings like `"telegram"` which resolve via `resolveHref()` to `content.social.telegram`.

## Structure

```
app/
  layout.tsx              — Sora font, ThemeProvider, Navbar/Footer, metadata
  page.tsx                — Home: WelcomeOnboarding → Hero → Services → NewsUpdates → Process → StudentVoicesReels → WhyChooseUs → FAQ → ContactForm → CTA
  globals.css             — Tailwind v4 @theme with orange/zinc tokens
  api/contact/route.ts    — POST → Telegram Bot sendMessage
  sitemap.ts, robots.ts
content/
  site.uz.json            — ALL copy lives here (brand, nav, every section)
lib/
  content.ts              — typed JSON loader + href helpers
  icons.ts                — string → Lucide component map
  site.ts                 — re-exports `content`'s site fields for compat
  schemas.ts              — Zod schema for contact form (reads messages from JSON)
  telegram.ts             — sendTelegramLead (server-only, reads labels from JSON)
  utils.ts                — cn()
components/
  Hero, Services, NewsUpdates, Process, StudentVoicesReels,
  WhyChooseUs, FAQ, ContactForm, CTA, Navbar, Footer,
  Logo, ThemeToggle, ThemeProvider, FloatingDock, JsonLd,
  WelcomeOnboarding
  ui/                     — shadcn primitives
  smoothui/               — scrollable-card-stack
hooks/
  use-mobile, use-prefers-fine-pointer
```

## Environment variables

- `TELEGRAM_BOT_TOKEN` — Bot token from @BotFather
- `TELEGRAM_CHAT_ID` — Destination chat id

Set in `.env.local` (gitignored). Never hardcode.

## Conventions

- **Server Components by default.** Add `"use client"` only for state, effects, or `motion/react`.
- **Copy → JSON.** Never hardcode user-facing strings in components.
- **Icons:** JSON references icons by name; components resolve via `getIcon(name)`.
- **Hrefs:** JSON may use `"telegram" | "instagram" | "youtube"` symbols; call `resolveHref()` before rendering.
- **Language:** UI copy is **Uzbek** (latin); brand names stay English.
- **Validation:** Zod schema shared between client form and server route via `lib/schemas.ts`.
- **Telegram API:** Called only from the route handler — bot token never leaves the server.
- **Online/offline badge** in `ContactForm` is time-based using `content.contact.hours`.
