import Logo from "@/components/Logo";
import { content } from "@/lib/content";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaTelegramPlane, FaYoutube } from "react-icons/fa";

const socials = [
  { label: "Telegram", href: content.social.telegram, Icon: FaTelegramPlane },
  { label: "Instagram", href: content.social.instagram, Icon: FaInstagram },
  { label: "YouTube", href: content.social.youtube, Icon: FaYoutube },
];

export default function Footer() {
  const { site: siteCol, services: servicesCol, contact: contactCol } =
    content.footer.columns;

  return (
    <footer className="relative w-full min-w-0 bg-zinc-950 max-lg:pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
      {/* Top gradient divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden
      />
      {/* Subtle bg grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:56px_56px]"
        aria-hidden
      />

      <div className="container relative mx-auto w-full min-w-0 px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-12">
          {/* Brand col */}
          <div className="col-span-2 space-y-6 md:col-span-4">
            <Logo />
            <p className="max-w-sm text-[13px] leading-relaxed text-zinc-500">
              {content.brand.description}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Site links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-600">
              {siteCol.title}
            </h4>
            <ul className="space-y-3">
              {siteCol.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13px] text-zinc-500 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-600">
              {servicesCol.title}
            </h4>
            <ul className="space-y-3">
              {servicesCol.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[13px] text-zinc-500 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="col-span-2 md:col-span-3">
            <h4 className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-600">
              {contactCol.title}
            </h4>
            <ul className="space-y-3 text-[13px] text-zinc-500">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary/60" />
                <span>{content.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary/60" />
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {content.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary/60" />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {content.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="size-4 shrink-0 text-primary/60" />
                <a
                  href={content.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {content.contact.telegram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} {content.brand.name}.{" "}
            {content.footer.legal.copyright}
          </p>
          <div className="flex items-center gap-6">
            {content.footer.legal.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs text-zinc-600 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
