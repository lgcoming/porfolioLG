"use client";

import { Palette } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import {
  siAngular,
  siClaude,
  siGithub,
  siGooglegemini,
  siMake,
  siMongodb,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siWordpress,
} from "simple-icons";
import { technologies } from "@/data/technologies";

type Technology = (typeof technologies)[number];

const technologyIcons: Partial<Record<Technology, { path: string }>> = {
  "Next.js": siNextdotjs,
  React: siReact,
  Angular: siAngular,
  "Node.js": siNodedotjs,
  TypeScript: siTypescript,
  Tailwind: siTailwindcss,
  Gemini: siGooglegemini,
  Claude: siClaude,
  N8N: siN8n,
  Make: siMake,
  WordPress: siWordpress,
  MySQL: siMysql,
  MongoDB: siMongodb,
  GitHub: siGithub,
};

type MarqueeRowProps = {
  items: Technology[];
  rowIndex: number;
  scrollY: MotionValue<number>;
};

function wrapLoop(value: number, width: number) {
  if (!width) return value;
  return ((value + width) % width + width) % width - width;
}

function TechnologyIcon({ technology }: { technology: Technology }) {
  const icon = technologyIcons[technology];

  if (!icon) {
    return <Palette className="technology-icon" aria-hidden="true" strokeWidth={1.65} />;
  }

  return (
    <svg className="technology-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function MarqueeRow({ items, rowIndex, scrollY }: MarqueeRowProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const groupWidth = useRef(0);
  const previousScroll = useRef(0);
  const x = useMotionValue(0);
  const speed = [0.72, -0.46, 0.58][rowIndex] ?? 0.5;
  const initialProgress = [1, 0.62, 0.82][rowIndex] ?? 1;

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const measure = () => {
      groupWidth.current = group.getBoundingClientRect().width;
      x.set(-groupWidth.current * initialProgress);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    previousScroll.current = scrollY.get();
    measure();
    return () => observer.disconnect();
  }, [initialProgress, scrollY, x]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!groupWidth.current) return;
    const delta = latest - previousScroll.current;
    previousScroll.current = latest;
    x.set(wrapLoop(x.get() + delta * speed, groupWidth.current));
  });

  return (
    <div className="technology-row">
      <motion.div className="technology-track" style={{ x }}>
        {[0, 1, 2].map((groupIndex) => (
          <div
            ref={groupIndex === 0 ? groupRef : undefined}
            className="technology-group"
            data-duplicate={groupIndex > 0}
            aria-hidden={groupIndex > 0 ? "true" : undefined}
            key={groupIndex}
          >
            {items.map((technology) => (
              <span className="technology-item" key={technology}>
                <TechnologyIcon technology={technology} />
                <span className="technology-label">{technology}</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TechnologyMarquee() {
  const { scrollY } = useScroll();
  const rowCount = 3;
  const itemsPerRow = Math.ceil(technologies.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, index) => (
    technologies.slice(index * itemsPerRow, (index + 1) * itemsPerRow)
  ));

  return (
    <div className="technology-marquee">
      {rows.map((row, rowIndex) => (
        <MarqueeRow items={row} rowIndex={rowIndex} scrollY={scrollY} key={row[0]} />
      ))}
    </div>
  );
}
