export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// El español conserva la raíz del dominio; el resto de idiomas cuelga de su prefijo.
export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);
