import { ProjectCard } from "@/components/motion/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-heading">
      <div className="container">
        <div>
          <SectionHeading
            headingId="projects-heading"
            index="03 / Trabajo"
            title="Últimos proyectos"
            description="Cuatro proyectos reales con contextos distintos, unidos por una ejecución clara, responsiva y orientada a producto."
          />
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
