"use client";

import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

const SHOW_AT_PROGRESS = 0.3;

export function BackToTop({ label }: { label: string }) {
  const { scrollYProgress } = useScroll();
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
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.button
          className="back-to-top"
          type="button"
          aria-label={label}
          title={label}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 14, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          whileTap={{ scale: 0.93 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowUp aria-hidden="true" strokeWidth={1.7} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
