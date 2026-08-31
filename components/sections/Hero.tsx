"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef } from "react";
import { HeroField } from "@/components/motion/HeroField";
import { Magnetic } from "@/components/motion/Magnetic";
import { TypewriterName } from "@/components/motion/TypewriterName";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

const stageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.13,
    },
  },
};

const elementVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.55 });
  const stageY = useTransform(progress, [0, 1], [0, -82]);
  const stageScale = useTransform(progress, [0, 1], [1, 0.955]);
  const stageOpacity = useTransform(progress, [0, 0.78, 1], [1, 0.9, 0]);
  const fieldY = useTransform(progress, [0, 1], [0, 126]);
  const fieldScale = useTransform(progress, [0, 1], [1, 1.17]);
  const gridY = useTransform(progress, [0, 1], [0, 82]);
  const gridScale = useTransform(progress, [0, 1], [1, 1.08]);
  const peripheralOpacity = useTransform(progress, [0, 0.72, 1], [1, 0.72, 0]);

  return (
    <motion.section ref={sectionRef} id="hero" className="hero-section" aria-labelledby="hero-title">
      <motion.div
        className="hero-field-layer"
        style={prefersReducedMotion ? undefined : { y: fieldY, scale: fieldScale }}
      >
        <HeroField />
      </motion.div>
      <motion.div
        className="hero-grid"
        style={prefersReducedMotion ? undefined : { y: gridY, scale: gridScale }}
        aria-hidden="true"
      />
      <div className="hero-vignette" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={stageVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        style={prefersReducedMotion ? undefined : { y: stageY, scale: stageScale, opacity: stageOpacity }}
      >
        <motion.p className="hero-kicker" variants={elementVariants}><span>00</span> Portfolio</motion.p>
        <h1 id="hero-title"><TypewriterName /></h1>
        <motion.h2 variants={elementVariants}>Full Stack Web Developer</motion.h2>
        <motion.p className="hero-description" variants={elementVariants}>
          Desarrollo impulsado por <strong>Inteligencia Artificial</strong>, pensado para personas y negocios que buscan destacar y mejorar con tecnología de última generación.
        </motion.p>
        <motion.div className="hero-actions" variants={elementVariants}>
          <Magnetic>
            <motion.a
              className="primary-cta"
              href="#projects"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 460, damping: 28 }}
            >
              <span>Ver proyectos</span>
              <span className="primary-cta-icon" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={1.6} />
              </span>
            </motion.a>
          </Magnetic>
          <a className="text-link" href="#contact">Hablemos <span>↗</span></a>
        </motion.div>
      </motion.div>

      <motion.a
        className="scroll-cue"
        href="#about"
        aria-label="Ir a Sobre mí"
        style={prefersReducedMotion ? undefined : { opacity: peripheralOpacity }}
      >
        <span>SCROLL</span>
        <ArrowDown aria-hidden="true" size={17} />
      </motion.a>
      <motion.span className="hero-coordinate hero-coordinate-left" style={prefersReducedMotion ? undefined : { opacity: peripheralOpacity }} aria-hidden="true">41.3874° N</motion.span>
      <motion.span className="hero-coordinate hero-coordinate-right" style={prefersReducedMotion ? undefined : { opacity: peripheralOpacity }} aria-hidden="true">02.1686° E</motion.span>
    </motion.section>
  );
}
