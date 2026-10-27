import type { MetadataRoute } from "next";

const languages = {
  es: "https://lgcomin.com/",
  en: "https://lgcomin.com/en",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(languages).map((url) => ({
    url,
    lastModified: new Date("2026-10-26"),
    changeFrequency: "monthly",
    priority: url === languages.es ? 1 : 0.9,
    alternates: { languages },
  }));
}
