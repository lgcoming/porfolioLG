import { TechnologyMarquee } from "@/components/motion/TechnologyMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologyRows } from "@/data/technologies";

export function Technologies() {
  return (
    <section id="technologies" className="section technologies" aria-labelledby="technologies-heading">
      <div className="container">
        <SectionHeading
          headingId="technologies-heading"
          index="02 / Stack"
          title="Tecnologías"
          description="Herramientas reales para construir, integrar y optimizar productos digitales de extremo a extremo."
        />
      </div>

      <TechnologyMarquee rows={technologyRows.map((row) => row.map(({ name }) => name))} />

      <div className="container technologies-note">
        <p>…y muchas más.</p>
        <span>Stack seleccionado según el problema, no por tendencia.</span>
      </div>
    </section>
  );
}
