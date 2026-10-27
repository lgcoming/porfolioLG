import Link from "next/link";
import { localePath, locales, type Locale } from "@/lib/i18n";

type LanguageSwitchProps = {
  locale: Locale;
  label: string;
  switchLabel: string;
};

/**
 * Alterna entre idiomas sin perder la posición de lectura: `scroll={false}`
 * conserva el scroll y el segmento `[lang]` reutiliza el mismo árbol.
 */
export function LanguageSwitch({ locale, label, switchLabel }: LanguageSwitchProps) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {locales.map((option) => {
        const active = option === locale;
        return (
          <Link
            key={option}
            href={localePath(option)}
            scroll={false}
            hrefLang={option}
            lang={option}
            data-active={active}
            aria-current={active ? "page" : undefined}
            aria-label={active ? undefined : switchLabel}
          >
            {option.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
