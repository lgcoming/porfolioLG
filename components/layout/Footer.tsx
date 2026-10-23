import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { contactDetails } from "@/data/contact";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <a className="footer-brand" href="#hero" aria-label="Volver al inicio">
        <Image
          src="/logo-lg.png"
          alt="LG"
          width={32}
          height={32}
          sizes="32px"
        />
      </a>

      <p className="footer-copy">© {year} LGCOMIN / Todos los derechos reservados.</p>

      <div className="footer-social">
        <a href={contactDetails.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          LinkedIn <ArrowUpRight aria-hidden="true" size={13} />
        </a>
        <a href={contactDetails.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
          GitHub <ArrowUpRight aria-hidden="true" size={13} />
        </a>
        <a href={`mailto:${contactDetails.email}`} aria-label="Email">
          Email
        </a>
        <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
