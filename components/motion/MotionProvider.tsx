"use client";

import { LazyMotion } from "motion/react";

const loadMotionFeatures = () => import("@/lib/motion-features").then((module) => module.default);

export function MotionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  );
}
