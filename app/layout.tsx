import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Quantico } from "next/font/google";
import "./globals.css";

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
const description =
  "Portfolio de Luis Gomez, desarrollador Full Stack especializado en desarrollo web, inteligencia artificial y automatización.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LGComin | Porfolio",
    template: "%s | LGCOMIN",
  },
  description,
  alternates: { canonical: "/" },
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
    locale: "es_ES",
    url: siteUrl,
    siteName: "LGCOMIN",
    title: "Luis Gomez — Full Stack Web Developer",
    description,
    images: [{ url: "/logo-lg.png", width: 1254, height: 1254, alt: "Logo LGCOMIN" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Gomez — Full Stack Web Developer",
    description,
    images: ["/logo-lg.png"],
  },
  icons: { icon: "/logo-lg.png", apple: "/logo-lg.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${mono.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
