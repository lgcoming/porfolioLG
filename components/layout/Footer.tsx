import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Logo — izquierda */}
      <a className="footer-brand" href="#hero" aria-label="Volver al inicio">
        <Image
          src="/logo-lg.png"
          alt="LG"
          width={36}
          height={36}
          loading="eager"
          unoptimized
          sizes="36px"
        />
      </a>

      {/* Copyright — centro */}
      <p className="footer-copy">© {year} LGCOMIN / Todos los derechos reservados.</p>

      {/* Links sociales — derecha */}
      <div className="footer-social">
        <a href="https://linkedin.com/in/lgcomin" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          LinkedIn <ArrowUpRight aria-hidden="true" size={13} />
        </a>
        <a href="mailto:luis.gomez.comin@gmail.com" aria-label="Email">
          Email
        </a>
        <a href="https://wa.me/34653878194" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
