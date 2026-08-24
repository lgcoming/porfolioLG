import { Bot, Code2, Gauge, LifeBuoy } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { Service } from "@/types/content";

const icons = {
  web: Code2,
  ai: Bot,
  growth: Gauge,
  support: LifeBuoy,
} satisfies Record<Service["category"], typeof Code2>;

export function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-heading">
      <div className="container">
        <div>
          <SectionHeading
            headingId="services-heading"
            index="04 / Capacidades"
            title="Servicios"
            description="Desde una web nueva hasta la automatización que la conecta con el resto de tu negocio."
          />
        </div>

        <div className="services-list">
          {services.map((service, index) => {
            const Icon = icons[service.category];
            return (
              <Reveal key={service.title} delay={Math.min(index * 0.025, 0.16)}>
                <a className="service-item" href="#contact" data-cursor="HABLAR">
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="service-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="service-copy">
                    <span className="service-title-row">
                      <h3>{service.title}</h3>
                      {service.status ? <small>{service.status}</small> : null}
                    </span>
                    <span>{service.description}</span>
                  </span>
                  <span className="service-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
