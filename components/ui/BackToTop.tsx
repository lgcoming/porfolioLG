"use client";

import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

const SHOW_AT_PROGRESS = 0.3;

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useHydratedReducedMotion();
  const visibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextVisible = progress >= SHOW_AT_PROGRESS;
    if (visibleRef.current === nextVisible) return;

    visibleRef.current = nextVisible;
    setIsVisible(nextVisible);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.button
          className="back-to-top"
          type="button"
          aria-label="Volver arriba"
          title="Volver arriba"
          onClick={scrollToTop}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.9 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.93 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowUp aria-hidden="true" strokeWidth={1.7} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
