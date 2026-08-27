import { HeroField } from "@/components/motion/HeroField";
import { ProjectCard } from "@/components/motion/ProjectCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="page-section projects-section" aria-labelledby="projects-title">
      <div className="section-constellation" aria-hidden="true">
        <HeroField density={1.35} />
      </div>
      <div className="projects-shell">
        <ScrollReveal variant="mask">
          <div id="projects-title"><SectionHeading index="03" eyebrow="TRABAJO" title="Últimos Proyectos" /></div>
        </ScrollReveal>
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
