import contentJson from "@/content/site.uz.json";

export const content = contentJson;
export type Content = typeof contentJson;

export const site = {
  name: content.brand.name,
  shortName: content.brand.shortName,
  url: content.brand.url,
  tagline: content.brand.tagline,
  description: content.brand.description,
  author: content.brand.author,
  locale: content.brand.locale,
  twitter: content.brand.twitter,
  keywords: content.brand.keywords,
  contact: content.contact,
  social: content.social,
  nav: content.nav,
} as const;

export function resolveHref(href: string): string {
  if (href === "telegram") return content.social.telegram;
  if (href === "instagram") return content.social.instagram;
  if (href === "youtube") return content.social.youtube;
  return href;
}

export function isExternalHref(href: string): boolean {
  const resolved = resolveHref(href);
  return resolved.startsWith("http://") || resolved.startsWith("https://");
}

export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in values ? String(values[key]) : `{${key}}`
  );
}
