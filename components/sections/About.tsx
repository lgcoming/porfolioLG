import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="page-section about-section" aria-labelledby="about-title">
      <ScrollReveal variant="mask">
        <div id="about-title"><SectionHeading index="01" eyebrow="PERFIL" title="Sobre mí" /></div>
      </ScrollReveal>

      <div className="about-layout">
        <ScrollReveal className="about-statement" axis="x" direction={-1} variant="slide">
          <p>
Creo soluciones digitales donde <em>código</em>, inteligencia artificial y confianza se combinan para crear productos más eficientes, útiles y preparados para crecer.
          </p>
          <span>FULL STACK / IA / AUTOMATIZACIÓN</span>
        </ScrollReveal>

        <div className="about-copy">
          <ScrollReveal variant="scale" delay={0.035}>
            <p>
              ¡Buenas! Me llamo <strong>Luis Gómez</strong> y soy un desarrollador web especializado en crear aplicaciones modernas con <strong>inteligencia artificial</strong>. Desarrollo utilizando herramientas e integraciones IA inteligentes que potencian cada solución digital.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={0.07}>
            <p>
              Mi experiencia abarca desde el <strong>frontend</strong> hasta el <strong>backend</strong>, siempre con un enfoque práctico en la optimización de procesos. Cada línea de código busca hacer tu día a día más fácil y eficiente.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="about-quote" axis="x" variant="slide" delay={0.06}>
          <span>“</span>
          <blockquote>
            La tecnología es la herramienta necesaria, pero la confianza y la seguridad son el verdadero valor de cada proyecto.
          </blockquote>
        </ScrollReveal>

        <div className="about-mark" aria-hidden="true">
          <span className="about-orbit" />
          <Image src="/logo-lg.png" alt="" width={240} height={240} sizes="240px" />
        </div>
      </div>
    </section>
  );
}
