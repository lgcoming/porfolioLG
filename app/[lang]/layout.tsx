import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Quantico } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/data/dictionaries";
import { hasLocale, localePath, locales } from "@/lib/i18n";
import "../globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lgcomin.com";

// Solo existen los idiomas declarados; cualquier otro segmento devuelve 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  const url = new URL(localePath(lang), siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: "%s | Luis Gómez",
    },
    description: meta.description,
    alternates: {
      canonical: localePath(lang),
      languages: {
        es: localePath("es"),
        en: localePath("en"),
        "x-default": localePath("es"),
      },
    },
    keywords: [
      "Luis Gomez",
      "Full Stack Developer",
      "desarrollo web",
      "inteligencia artificial",
      "automatización",
      "portfolio",
    ],
    authors: [{ name: "Luis Gomez", url: siteUrl }],
    creator: "Luis Gomez",
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url,
      siteName: "LgComin",
      title: meta.ogTitle,
      description: meta.description,
      images: [{ url: "/og-logo-lg.png", width: 1476, height: 1476, alt: "Logo LGCOMIN" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.description,
      images: ["/og-logo-lg.png"],
    },
    // favicon.ico, icon.png y apple-icon.png en app/ generan los <link> de iconos.
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default async function RootLayout({ children, params }: Readonly<LayoutProps>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${mono.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
