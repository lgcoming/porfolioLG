import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lgcomin.com/",
      lastModified: new Date("2026-08-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

