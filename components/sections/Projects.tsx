import { ProjectCard } from "@/components/motion/ProjectCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/data/dictionaries";
import { projects } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

type ProjectsProps = {
  locale: Locale;
  copy: Dictionary["projects"];
};

export function Projects({ locale, copy }: ProjectsProps) {
  return (
    <section id="projects" className="page-section projects-section" aria-labelledby="projects-title">
      <div className="projects-shell">
        <ScrollReveal variant="mask">
          <div id="projects-title"><SectionHeading index="03" eyebrow={copy.eyebrow} title={copy.title} /></div>
        </ScrollReveal>
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={{
                ...project,
                description: project.description[locale],
                imageAlt: "imageAlt" in project ? project.imageAlt[locale] : undefined,
              }}
              index={index}
              copy={copy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
