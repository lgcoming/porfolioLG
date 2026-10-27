import type { Locale } from "@/lib/i18n";

export type Localized<T = string> = Record<Locale, T>;

type ProjectBase = {
  title: string;
  href: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageSurface?: "dark" | "light" | "warm";
  imagePadding?: "compact" | "standard" | "generous";
  stack: readonly string[];
};

/** Proyecto tal como se guarda en `data/`, con textos por idioma. */
export type LocalizedProject = ProjectBase & {
  description: Localized;
  imageAlt?: Localized;
};

/** Proyecto ya resuelto para un idioma, listo para la tarjeta. */
export type Project = ProjectBase & {
  description: string;
  imageAlt?: string;
};

export type Service = {
  title: Localized;
  description: Localized;
};

/** Texto con fragmentos destacados; cada tono tiene su propio estilo. */
export type RichText = readonly (string | { text: string; tone: "strong" | "code" | "ai" | "security" })[];
