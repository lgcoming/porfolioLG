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
import { RichText } from "@/components/ui/RichText";
import type { Dictionary } from "@/data/dictionaries";

// El contenedor coordina la entrada escalonada y comparte la curva de animación.
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

export function Hero({ copy }: { copy: Dictionary["hero"] }) {
  const sectionRef = useRef<HTMLElement>(null);
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
        style={{ y: fieldY, scale: fieldScale }}
      >
        <HeroField stars />
      </motion.div>
      <motion.div
        className="hero-grid"
        style={{ y: gridY, scale: gridScale }}
        aria-hidden="true"
      />
      <div className="hero-vignette" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={stageVariants}
        initial="hidden"
        animate="visible"
        style={{ y: stageY, scale: stageScale, opacity: stageOpacity }}
      >
        <motion.p className="hero-kicker" variants={elementVariants}><span>00</span> {copy.kicker}</motion.p>
        <h1 id="hero-title"><TypewriterName /></h1>
        <motion.h2 variants={elementVariants}>{copy.role}</motion.h2>
        <motion.p className="hero-description" variants={elementVariants}>
          <RichText content={copy.description} />
        </motion.p>
        <motion.div className="hero-actions" variants={elementVariants}>
          <Magnetic>
            <motion.a
              className="primary-cta"
              href="#projects"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 460, damping: 28 }}
            >
              <span>{copy.primaryCta}</span>
              <span className="primary-cta-icon" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={1.6} />
              </span>
            </motion.a>
          </Magnetic>
          <a className="text-link" href="#contact">{copy.secondaryCta} <span>↗</span></a>
        </motion.div>
      </motion.div>

      <motion.a
        className="scroll-cue"
        href="#about"
        aria-label={copy.scrollCue}
        style={{ opacity: peripheralOpacity }}
      >
        <span>SCROLL</span>
        <ArrowDown aria-hidden="true" size={17} />
      </motion.a>
      <motion.span className="hero-coordinate hero-coordinate-left" style={{ opacity: peripheralOpacity }} aria-hidden="true">41.3874° N</motion.span>
      <motion.span className="hero-coordinate hero-coordinate-right" style={{ opacity: peripheralOpacity }} aria-hidden="true">02.1686° E</motion.span>
    </motion.section>
  );
}
