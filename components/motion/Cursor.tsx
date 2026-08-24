"use client";

import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useState } from "react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

export function Cursor() {
  const reduceMotion = useHydratedReducedMotion();
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 720, damping: 48, mass: 0.25 });
  const y = useSpring(pointerY, { stiffness: 720, damping: 48, mass: 0.25 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");

    const sync = () => {
      const shouldEnable = query.matches && !reduceMotion;
      setEnabled(shouldEnable);
      document.body.classList.toggle("has-custom-cursor", shouldEnable);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };

    sync();
    query.addEventListener("change", sync);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });

    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [pointerX, pointerY, reduceMotion]);

  if (!enabled) return null;

  return (
    <m.div
      className={`custom-cursor${label ? " is-contextual" : ""}`}
      style={{ x, y }}
      aria-hidden="true"
    >
      <span>{label}</span>
    </m.div>
  );
}
