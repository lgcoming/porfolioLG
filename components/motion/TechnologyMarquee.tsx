"use client";

import { Palette } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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

const ROW_COUNT = 3;
// Px de cinta por px de scroll en cada fila; el signo fija el sentido.
const ROW_SPEED = [0.95, -0.7, 0.82];
const SCROLL_GAIN = 1.35;
const DRIFT_PX_PER_MS = 0.018;
const SMOOTHING_MS = 260;
// Con los ítems a tamaño reducido cada grupo es más estrecho: seis copias cubren
// pantallas muy anchas sin que se vea el final de la cinta.
const GROUP_COPIES = [0, 1, 2, 3, 4, 5];
const ITEMS_PER_ROW = Math.ceil(technologies.length / ROW_COUNT);
// Dividir la lista una sola vez mantiene estables el orden y los renders de React.
const TECHNOLOGY_ROWS = Array.from({ length: ROW_COUNT }, (_, index) => (
  technologies.slice(index * ITEMS_PER_ROW, (index + 1) * ITEMS_PER_ROW)
));

type MarqueeRowProps = {
  items: Technology[];
  rowIndex: number;
  scrollY: MotionValue<number>;
  label: string;
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

function MarqueeRow({ items, rowIndex, scrollY, label }: MarqueeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const groupWidth = useRef(0);
  const previousScroll = useRef(0);
  // Posición sin envolver: `target` acumula scroll, deriva y teclado; `current` la persigue suavizada.
  const motionState = useRef({ current: 0, target: 0, dragging: false, visible: true });
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const x = useMotionValue(0);
  const speed = ROW_SPEED[rowIndex] ?? 0.5;
  const initialProgress = [1, 0.62, 0.82][rowIndex] ?? 1;

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Varias copias hacen que la cinta parezca infinita y mantienen límites de arrastre finitos.
    const measure = () => {
      const width = group.getBoundingClientRect().width;
      groupWidth.current = width;
      setDragConstraints({ left: -width * 2, right: 0 });
      const start = -width * initialProgress;
      motionState.current.current = start;
      motionState.current.target = start;
      x.set(wrapLoop(start, width));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    previousScroll.current = scrollY.get();
    measure();
    return () => observer.disconnect();
  }, [initialProgress, scrollY, x]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const state = motionState.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick);
      const width = groupWidth.current;
      const dt = last ? Math.min(time - last, 50) : 16;
      last = time;
      if (!width || state.dragging) return;

      // Deriva lenta continua (desactivada con movimiento reducido) en el sentido de la fila.
      if (!reducedMotion.matches) state.target += Math.sign(speed) * DRIFT_PX_PER_MS * dt;
      // Suavizado exponencial independiente del frame rate: inercia sin saltos por golpe de rueda.
      const ease = reducedMotion.matches ? 1 : 1 - Math.exp(-dt / SMOOTHING_MS);
      state.current += (state.target - state.current) * ease;

      // Recentra ambos valores para que no crezcan sin límite.
      if (Math.abs(state.current) > width * 8) {
        const shift = Math.trunc(state.current / width) * width;
        state.current -= shift;
        state.target -= shift;
      }
      x.set(wrapLoop(state.current, width));
    };

    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(row);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [speed, x]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - previousScroll.current;
    previousScroll.current = latest;
    const state = motionState.current;
    // El scroll empuja la cinta en ambos sentidos; fuera de pantalla se aplica sin animar.
    state.target += delta * speed * SCROLL_GAIN;
    if (!state.visible) state.current = state.target;
  });

  const handleDragStart = () => {
    motionState.current.dragging = true;
  };

  const handleDragEnd = () => {
    const state = motionState.current;
    state.dragging = false;
    if (!groupWidth.current) return;
    const position = wrapLoop(x.get(), groupWidth.current);
    state.current = position;
    state.target = position;
    x.set(position);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!groupWidth.current || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;

    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? 1 : -1;
    motionState.current.target += direction * 140;
  };

  return (
    <div
      ref={rowRef}
      className="technology-row"
      role="group"
      tabIndex={0}
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        className="technology-track"
        style={{ x }}
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.06}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {GROUP_COPIES.map((groupIndex) => (
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

/** `rowLabel` admite el marcador `{row}` para numerar cada fila. */
export function TechnologyMarquee({ rowLabel }: { rowLabel: string }) {
  const { scrollY } = useScroll();

  return (
    <div className="technology-marquee">
      {TECHNOLOGY_ROWS.map((row, rowIndex) => (
        <MarqueeRow
          items={row}
          rowIndex={rowIndex}
          scrollY={scrollY}
          label={rowLabel.replace("{row}", String(rowIndex + 1))}
          key={row[0]}
        />
      ))}
    </div>
  );
}
