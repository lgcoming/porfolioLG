import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/data/dictionaries";

export function About({ copy }: { copy: Dictionary["about"] }) {
  return (
    <section id="about" className="page-section about-section" aria-labelledby="about-title">
      <ScrollReveal variant="mask">
        <div id="about-title"><SectionHeading index="01" eyebrow={copy.eyebrow} title={copy.title} /></div>
      </ScrollReveal>

      <div className="about-layout">
        <ScrollReveal className="about-statement" axis="x" direction={-1} variant="slide">
          <p>
            <RichText content={copy.statement} />
          </p>
          <span>{copy.tagline}</span>
        </ScrollReveal>

        <div className="about-copy">
          {copy.bio.map((paragraph, index) => (
            <ScrollReveal key={index} variant="scale" delay={0.035 * (index + 1)}>
              <p>
                <RichText content={paragraph} />
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="about-quote" axis="x" variant="slide" delay={0.06}>
          <span>“</span>
          <blockquote>{copy.quote}</blockquote>
        </ScrollReveal>

        <div className="about-mark" aria-hidden="true">
          <span className="about-orbit" />
          <Image src="/logo-lg-blanco.png" alt="" width={240} height={240} sizes="240px" />
        </div>
      </div>
    </section>
  );
}
