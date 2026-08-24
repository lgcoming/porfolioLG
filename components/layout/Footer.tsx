import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <a className="footer-brand" href="#hero" aria-label="Volver al inicio">
          <Image src="/logo-lg-ui.webp" alt="" width={48} height={48} loading="eager" unoptimized sizes="48px" />
        </a>

        <nav aria-label="Navegación del pie">
          <ul role="list">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-links">
          <a href="https://linkedin.com/in/lgcomin" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight aria-hidden="true" size={15} />
          </a>
          <a href="mailto:luis.gomez.comin@gmail.com">Email</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {year} LG / Todos los derechos reservados.</p>
        <a href="#hero">Volver arriba ↑</a>
      </div>
    </footer>
  );
}
