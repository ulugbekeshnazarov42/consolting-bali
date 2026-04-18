import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...site.nav
      .filter((n) => n.href.startsWith("#"))
      .map((n) => ({
        url: `${site.url}/${n.href}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
