"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  axis?: "x" | "y";
  direction?: 1 | -1;
  variant?: "lift" | "mask" | "slide" | "scale";
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  axis = "y",
  direction = 1,
  variant = "lift",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 94%", "end 8%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 145,
    damping: 30,
    mass: 0.52,
  });
  const entryEnd = Math.min(0.34, 0.2 + delay);
  const distance = variant === "slide" ? 82 : variant === "mask" ? 48 : 60;
  const exitDistance = variant === "slide" ? 22 : 14;
  const entryScale = variant === "scale" ? 0.9 : 0.975;
  const entryRotation = variant === "slide" ? direction * 1.25 : 0;

  const x = useTransform(
    progress,
    [0, entryEnd, 0.8, 1],
    axis === "x"
      ? [distance * direction, 0, 0, -exitDistance * direction]
      : [0, 0, 0, 0],
  );
  const y = useTransform(
    progress,
    [0, entryEnd, 0.8, 1],
    axis === "y"
      ? [distance * direction, 0, 0, -exitDistance * direction]
      : [0, 0, 0, 0],
  );
  const opacity = useTransform(progress, [0, entryEnd * 0.78, 0.86, 1], [0, 1, 1, 0.78]);
  const scale = useTransform(progress, [0, entryEnd, 0.82, 1], [entryScale, 1, 1, 0.985]);
  const rotate = useTransform(progress, [0, entryEnd, 1], [entryRotation, 0, 0]);
  const blur = useTransform(progress, [0, entryEnd * 0.72, entryEnd], [8, 2, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const classes = ["scroll-reveal", className].filter(Boolean).join(" ");
  return (
    <motion.div
      ref={ref}
      className={classes}
      data-reveal-variant={variant}
      style={{ x, y, opacity, scale, rotate, filter }}
    >
      {children}
    </motion.div>
  );
}
