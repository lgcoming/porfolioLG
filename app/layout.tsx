import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PreloadResources } from "./preload-resources";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lgcomin.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Luis Gómez — Full Stack Web Developer",
  description:
    "Portfolio profesional de Luis Gómez, desarrollador web especializado en experiencias modernas, inteligencia artificial y optimización digital.",
  alternates: { canonical: "/" },
  authors: [{ name: "Luis Gómez", url: siteUrl }],
  creator: "Luis Gómez",
  keywords: [
    "Luis Gómez",
    "Full Stack Web Developer",
    "desarrollo web",
    "Next.js",
    "inteligencia artificial",
    "automatización IA",
  ],
  icons: {
    icon: "/logo-lg.png",
    shortcut: "/logo-lg.png",
    apple: "/logo-lg.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "LG / Luis Gómez",
    title: "Luis Gómez — Full Stack Web Developer",
    description:
      "Desarrollo web, inteligencia artificial y tecnología pensada para personas y empresas.",
    images: [{ url: "/logo-lg.png", width: 1254, height: 1254, alt: "Logo LG" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Gómez — Full Stack Web Developer",
    description:
      "Desarrollo web, inteligencia artificial y tecnología pensada para personas y empresas.",
    images: ["/logo-lg.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070a09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <body>
        <PreloadResources />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
