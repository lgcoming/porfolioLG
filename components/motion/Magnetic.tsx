"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
};

export function Magnetic({ children, className }: MagneticProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 320, damping: 24, mass: 0.45 });
  const y = useSpring(useMotionValue(0), { stiffness: 320, damping: 24, mass: 0.45 });
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
