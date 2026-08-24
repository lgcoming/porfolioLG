import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lgcomin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-24"),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}/logo-lg.png`],
    },
  ];
}

