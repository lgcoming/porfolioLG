"use client";

import * as m from "motion/react-m";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

type RevealProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useHydratedReducedMotion();

  return (
    <m.div
      className={className}
      initial={false}
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
