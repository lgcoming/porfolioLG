import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="page-section services-section" aria-labelledby="services-title">
      <ScrollReveal variant="mask">
        <div id="services-title"><SectionHeading index="04" eyebrow="CAPACIDADES" title="Servicios" /></div>
      </ScrollReveal>
      <div className="services-list">
        {services.map((service, index) => (
          <ScrollReveal
            key={service.title}
            axis="x"
            direction={index % 2 === 0 ? -1 : 1}
            variant="slide"
            delay={(index % 3) * 0.018}
          >
            <a className="service-row" href="#contact">
              <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ArrowUpRight aria-hidden="true" size={23} strokeWidth={1.35} />
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
