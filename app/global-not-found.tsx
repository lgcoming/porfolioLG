import type { Metadata } from "next";
import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 | Luis Gómez",
};

// El layout raíz depende de `[lang]`, así que las URLs sin ruta usan esta página propia.
export default function GlobalNotFound() {
  return (
    <html lang="es" className={mono.variable}>
      <body>
        <main className="not-found">
          <p>404</p>
          <h1>Página no encontrada / Page not found</h1>
          <Link href="/">Volver al inicio ↗</Link>
        </main>
      </body>
    </html>
  );
}
