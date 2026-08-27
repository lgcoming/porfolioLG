import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TechnologyMarquee } from "@/components/motion/TechnologyMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Technologies() {
  return (
    <section id="technologies" className="page-section technologies-section" aria-labelledby="technologies-title">
      <div className="section-shell">
        <ScrollReveal variant="mask">
          <div id="technologies-title"><SectionHeading index="02" eyebrow="STACK" title="Tecnologías" /></div>
        </ScrollReveal>
        <ScrollReveal className="technologies-intro" axis="x" variant="slide" delay={0.04}>
          <p>Herramientas de última generación para construir productos rápidos, eficientes, seguros y escalables.</p>
        </ScrollReveal>
      </div>
      <TechnologyMarquee />
      <p className="technologies-more">…y muchas más.</p>
    </section>
  );
}
