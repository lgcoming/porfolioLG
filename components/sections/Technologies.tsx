import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TechnologyMarquee } from "@/components/motion/TechnologyMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/data/dictionaries";

export function Technologies({ copy }: { copy: Dictionary["technologies"] }) {
  return (
    <section id="technologies" className="page-section technologies-section" aria-labelledby="technologies-title">
      <div className="section-shell">
        <ScrollReveal variant="mask">
          <div id="technologies-title"><SectionHeading index="02" eyebrow={copy.eyebrow} title={copy.title} /></div>
        </ScrollReveal>
        <ScrollReveal className="technologies-intro" axis="x" variant="slide" delay={0.04}>
          <p>{copy.intro}</p>
        </ScrollReveal>
      </div>
      <TechnologyMarquee rowLabel={copy.rowLabel} />
      <p className="technologies-more">{copy.more}</p>
    </section>
  );
}
