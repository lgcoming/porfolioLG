import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="container contact-grid">
        <div className="contact-copy">
          <Reveal>
            <p className="eyebrow">05 / Contacto</p>
            <h2 id="contact-heading">¿Tienes un proyecto o una idea?</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p>Escríbeme y te responderé en menos de 48 horas.</p>
          </Reveal>

          <Reveal className="contact-direct" delay={0.1}>
            <span>Contacto directo</span>
            <a href="mailto:luis.gomez.comin@gmail.com" data-cursor="EMAIL">
              luis.gomez.comin@gmail.com <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="https://linkedin.com/in/lgcomin" target="_blank" rel="noreferrer" data-cursor="VER">
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

