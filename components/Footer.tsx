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
    <footer className="relative border-t border-border/60 bg-background max-lg:pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden
      />

      <div className="container mx-auto px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-6 md:col-span-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {content.brand.description}
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border/60 bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {siteCol.title}
            </h4>
            <ul className="space-y-2.5">
              {siteCol.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {servicesCol.title}
            </h4>
            <ul className="space-y-2.5">
              {servicesCol.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {contactCol.title}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{content.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {content.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {content.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="size-4 shrink-0 text-primary" />
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {content.brand.name}. {content.footer.legal.copyright}
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            {content.footer.legal.links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-primary">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
