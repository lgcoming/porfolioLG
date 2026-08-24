"use client";

import {
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useVelocity,
} from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

type TechnologyMarqueeProps = {
  readonly rows: readonly (readonly string[])[];
};

type MarqueeRowProps = {
  readonly items: readonly string[];
  readonly direction: -1 | 1;
};

function MarqueeRow({ items, direction }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  const visibleRef = useRef(true);
  const velocityRef = useRef(0);
  const initializedRef = useRef(false);
  const x = useMotionValue(0);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 80, damping: 24, mass: 0.35 });

  useMotionValueEvent(smoothVelocity, "change", (latest) => {
    velocityRef.current = latest;
  });

  useEffect(() => {
    const row = rowRef.current;
    const group = groupRef.current;
    if (!row || !group) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      widthRef.current = entry?.contentRect.width ?? 0;
      if (!initializedRef.current && direction === 1) x.set(-widthRef.current);
      initializedRef.current = true;
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry?.isIntersecting ?? false;
    });

    resizeObserver.observe(group);
    intersectionObserver.observe(row);
    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [direction, x]);

  useAnimationFrame((_time, delta) => {
    if (reduceMotion || !visibleRef.current || widthRef.current === 0) return;

    const boost = Math.min(72, Math.abs(velocityRef.current) * 0.018);
    const distance = direction * (24 + boost) * (delta / 1000);
    let next = x.get() + distance;

    if (direction === -1 && next <= -widthRef.current) next += widthRef.current;
    if (direction === 1 && next >= 0) next -= widthRef.current;
    x.set(next);
  });

  return (
    <div ref={rowRef} className="marquee-row">
      <m.div className="marquee-track" style={reduceMotion ? undefined : { x }}>
        {[0, 1].map((copy) => (
          <div ref={copy === 0 ? groupRef : undefined} className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {items.map((item, index) => (
              <span className="technology-chip" key={`${copy}-${item}`} data-cursor="STACK">
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item}
              </span>
            ))}
          </div>
        ))}
      </m.div>
    </div>
  );
}

export function TechnologyMarquee({ rows }: TechnologyMarqueeProps) {
  return (
    <div className="technology-marquee" role="group" aria-label="Tecnologías utilizadas">
      {rows.map((row, index) => (
        <MarqueeRow key={index} items={row} direction={index % 2 === 0 ? -1 : 1} />
      ))}
    </div>
  );
}
