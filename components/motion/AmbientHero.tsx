"use client";

import { useMotionValue, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useEffect } from "react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

export function AmbientHero() {
  const reduceMotion = useHydratedReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.8 });
  const x = useTransform(smoothX, [0, 1], [-10, 10]);
  const y = useTransform(smoothY, [0, 1], [-7, 7]);
  const rotate = useTransform(smoothX, [0, 1], [-2, 2]);

  useEffect(() => {
    if (reduceMotion) return;
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!query.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <m.div className="hero-ambient" style={{ x, y, rotate }} aria-hidden="true">
      <span />
      <span />
      <span />
    </m.div>
  );
}
