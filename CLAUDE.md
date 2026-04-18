@AGENTS.md

# Consulting Firm Website — Project Context

Premium consulting firm marketing site. The brand is **Nexora Consulting** — strategic business, finance, and digital transformation consulting.

## Stack

- **Next.js 16.2.4** (App Router) + **React 19.2**
- **TypeScript** (strict)
- **Tailwind CSS v4** — `@theme inline` in `app/globals.css`, no `tailwind.config.*`
- **shadcn/ui** (radix-nova style, neutral base) — components live under `components/ui/`
- **motion/react** (formerly framer-motion) for animations
- **next-themes** for dark/light with `class` strategy, default `dark`
- **react-hook-form + zod + @hookform/resolvers** for forms
- **Google Fonts: Sora** via `next/font/google` — primary display + body font
- **Lucide icons**

## Visual language

- **Theme:** dark-first, orange accent on zinc neutrals
  - Accent: `oklch` orange (primary = ~`oklch(0.72 0.18 50)`)
  - Neutrals: zinc scale (`oklch(0.14 0 0)` → `oklch(0.98 0 0)`)
- **Radius:** `0.75rem` base — generous rounding
- **Typography:** Sora for everything; extrabold for headlines, medium for body
- **Motion:** `motion/react` — `whileInView` reveals, staggered children, spring transitions
- All interactive surfaces should have hover states, focus rings, and smooth transitions

## Structure

```
app/
  layout.tsx              — Sora font, ThemeProvider, Navbar/Footer, metadata
  page.tsx                — Home: Hero → Partners → Services → Process → Stats → Testimonials → FAQ → Contact → CTA
  globals.css             — Tailwind v4 @theme with orange/zinc tokens
  api/contact/route.ts    — POST → Telegram Bot sendMessage
components/
  Navbar.tsx, Footer.tsx, ThemeToggle.tsx, ThemeProvider.tsx
  Hero.tsx, Partners.tsx, Services.tsx, Process.tsx, Stats.tsx,
  Testimonials.tsx, FAQ.tsx, ContactForm.tsx, CTA.tsx
  ui/                     — shadcn primitives (already installed)
lib/
  utils.ts                — cn() helper
  telegram.ts             — sendTelegramMessage()
hooks/
```

## Environment variables

- `TELEGRAM_BOT_TOKEN` — Bot token from @BotFather
- `TELEGRAM_CHAT_ID` — Destination chat id

Set in `.env.local` (gitignored). Never hardcode.

## Conventions

- **Server Components by default.** Only add `"use client"` on components that use state, effects, or `motion/react`.
- **Metadata:** Full SEO in root `layout.tsx` — title template, description, OG, Twitter, robots, keywords, icons.
- **Language:** UI copy is **Uzbek** (main user language), with English brand names retained.
- **Validation:** Zod schema shared between client form and server route via a single file.
- **Telegram API:** Call from the route handler only — never expose the bot token to client code.

<!-- CLAUDE will read this file on every session. Keep concise; update when architecture changes. -->
