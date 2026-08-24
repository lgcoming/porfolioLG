"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  readonly project: Project;
  readonly index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const cleanupTimerRef = useRef<number | null>(null);
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 230, damping: 24, mass: 0.55 });
  const rotateY = useSpring(rotateYValue, { stiffness: 230, damping: 24, mass: 0.55 });
  const reduceMotion = useHydratedReducedMotion();

  useEffect(
    () => () => {
      if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current);
    },
    [],
  );

  const onPointerEnter = () => {
    if (reduceMotion || !window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
    boundsRef.current = cardRef.current?.getBoundingClientRect() ?? null;
    if (cardRef.current) cardRef.current.style.willChange = "transform";
  };

  const onPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const bounds = boundsRef.current;
    if (!bounds || reduceMotion) return;
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateXValue.set(vertical * -4);
    rotateYValue.set(horizontal * 4);
  };

  const onPointerLeave = () => {
    boundsRef.current = null;
    rotateXValue.set(0);
    rotateYValue.set(0);
    if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current);
    cleanupTimerRef.current = window.setTimeout(() => {
      if (cardRef.current) cardRef.current.style.willChange = "auto";
    }, 360);
  };

  return (
    <m.a
      ref={cardRef}
      className={`project-card project-card-${index + 1}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="VER"
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        className={`project-image project-image-${project.imageFit ?? "cover"} project-image-surface-${project.imageSurface ?? "light"}`}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
        />
        <span className="project-number mono">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-content">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <ArrowUpRight aria-hidden="true" />
        </div>
        <p>{project.description}</p>
        <ul className="project-stack" role="list" aria-label={`Tecnologías de ${project.name}`}>
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </m.a>
  );
}
