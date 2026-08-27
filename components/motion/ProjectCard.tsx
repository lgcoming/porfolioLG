"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const imageFit = project.imageFit ?? "cover";
  const imageSurface = project.imageSurface ?? "dark";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 115, damping: 28, mass: 0.55 });
  const cardY = useTransform(progress, [0, 0.28, 0.8, 1], [78, 0, 0, -26]);
  const cardScale = useTransform(progress, [0, 0.28, 0.8, 1], [0.91, 1, 1, 0.975]);
  const cardOpacity = useTransform(progress, [0, 0.2, 0.82, 1], [0.05, 1, 1, 0.76]);
  const cardRotate = useTransform(progress, [0, 0.28, 1], [index % 2 === 0 ? -1.4 : 1.4, 0, 0]);
  const mediaY = useTransform(progress, [0, 0.5, 1], [34, 0, -28]);
  const mediaScale = useTransform(progress, [0, 0.5, 1], [1.09, 1.02, 1.075]);
  const containedMediaScale = useTransform(progress, [0, 0.5, 1], [1.025, 1, 1.018]);
  const contentY = useTransform(progress, [0, 0.5, 1], [18, 0, -12]);

  return (
    <motion.article
      ref={ref}
      className="project-case"
      style={{ y: cardY, scale: cardScale, opacity: cardOpacity, rotate: cardRotate }}
    >
      <a
        className="project-link"
        href={project.href}
        target="_blank"
        rel="noreferrer"
        data-cursor="project"
        aria-label={`Ver proyecto ${project.title}`}
      >
        <div className="project-media" data-surface={imageSurface}>
          <motion.div
            className="project-image-wrap"
            data-fit={imageFit}
            style={{ y: mediaY, scale: imageFit === "contain" ? containedMediaScale : mediaScale }}
          >
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(max-width: 768px) 100vw, 62vw"
              className="project-image"
              data-fit={imageFit}
              data-padding={project.imagePadding ?? "standard"}
              data-surface={imageSurface}
            />
          </motion.div>
          <span className="project-scan" aria-hidden="true" />
        </div>

        <motion.div className="project-copy" style={{ y: contentY }}>
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul aria-label="Tecnologías utilizadas">
            {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <span className="project-cta">VER PROYECTO ↗</span>
        </motion.div>
      </a>
    </motion.article>
  );
}
