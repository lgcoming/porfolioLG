import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { AmbientHero } from "@/components/motion/AmbientHero";

export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <AmbientHero />
      <Image
        className="hero-geometry"
        src="/logo-lg-ui.webp"
        alt=""
        width={720}
        height={720}
        loading="eager"
        fetchPriority="high"
        unoptimized
        sizes="(max-width: 640px) 100vw, 55vw"
        aria-hidden="true"
      />

      <div className="container hero-inner">
        <div className="hero-meta hero-enter hero-enter-1" aria-hidden="true">
          <span>LG / 2026</span>
          <span>Barcelona · España</span>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker hero-enter hero-enter-2">Full Stack Web Developer</p>
          <h1 id="hero-title">
            Luis Gómez
            <span>Web, IA y tecnología con intención.</span>
          </h1>
          <p className="hero-description hero-enter hero-enter-4">
            Desarrollo impulsado por <strong>Inteligencia Artificial</strong>, pensado para personas y negocios que
            buscan destacar y mejorar con tecnología de última generación.
          </p>
          <div className="hero-actions hero-enter hero-enter-5">
            <a className="button button-primary" href="#projects" data-cursor="VER">
              Ver proyectos <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            <a className="button button-secondary" href="#contact" data-cursor="HABLAR">
              Cuéntame tu idea
            </a>
          </div>
        </div>

        <div className="hero-foot hero-enter hero-enter-5">
          <p className="mono">Desarrollo web · IA · Automatización</p>
          <a href="#about" aria-label="Explorar: continuar a la sección Sobre mí">
            Explorar <ArrowDown aria-hidden="true" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
