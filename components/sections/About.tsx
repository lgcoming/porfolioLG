import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-heading">
      <div className="container">
        <div>
          <SectionHeading
            headingId="about-heading"
            index="01 / Perfil"
            title="Sobre mí"
            description="Una visión de producto completa: del frontend al backend, con IA aplicada donde aporta una ventaja real."
          />
        </div>

        <div className="about-grid">
          <Reveal className="about-lead">
            <p>
              ¡Buenas! Me llamo <strong>Luis Gómez</strong> y soy un desarrollador web especializado en crear
              aplicaciones modernas con inteligencia artificial.
            </p>
          </Reveal>

          <div className="about-body">
            <Reveal>
              <p>
                Desarrollo utilizando herramientas e integraciones IA inteligentes que potencian cada solución digital.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p>
                Mi experiencia abarca desde el frontend hasta el backend, siempre con un enfoque práctico en la
                optimización de procesos. Cada línea de código busca hacer tu día a día más fácil y eficiente.
              </p>
            </Reveal>
          </div>

          <Reveal className="about-index" delay={0.1}>
            <dl>
              <div>
                <dt>01</dt>
                <dd>Frontend</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Backend</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>IA aplicada</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="about-quote" delay={0.12}>
            <blockquote>
              “La tecnología es la herramienta, pero la <em>confianza</em> y la <em>seguridad</em> son el verdadero
              valor de cada proyecto.”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
