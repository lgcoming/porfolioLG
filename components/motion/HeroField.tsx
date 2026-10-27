"use client";

import { useEffect, useRef } from "react";

type FieldNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  accent: boolean;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkle: number;
  phase: number;
};

type ShootingStar = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  length: number;
  start: number;
  life: number;
};

type HeroFieldProps = {
  density?: number;
  stars?: boolean;
};

/**
 * Dibuja el campo ambiental Canvas 2D usado por las secciones hero y contacto.
 * Su bucle se pausa fuera del viewport o de la pestaña y limita el DPR para
 * mantener la capa decorativa ligera en dispositivos reales.
 */
export function HeroField({ density = 1, stars = false }: HeroFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;
    const interactionHost = host.parentElement ?? host;
    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;
    const context: CanvasRenderingContext2D = canvasContext;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let nodes: FieldNode[] = [];
    let dpr = 1;
    let starfield: Star[] = [];
    let twinklingStars: Star[] = [];
    let starLayer: HTMLCanvasElement | null = null;
    let shootingStar: ShootingStar | null = null;
    let nextShootingStar = 0;
    const pointer = { x: 0, y: 0, active: false };
    const scrollState = { lastY: window.scrollY, progress: 0 };

    // Menos nodos en móvil aligeran el cálculo de líneas entre pares.
    const createNodes = () => {
      const baseCount = mobile ? 34 : Math.min(112, Math.max(72, Math.round(width / 13)));
      const count = Math.max(mobile ? 24 : 52, Math.round(baseCount * density));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (mobile ? 0.08 : 0.18),
        vy: (Math.random() - 0.5) * (mobile ? 0.08 : 0.18),
        radius: index % 8 === 0 ? 2.25 : Math.random() * 1.15 + 0.58,
        phase: Math.random() * Math.PI * 2,
        accent: index % 3 === 0,
      }));
    };

    function paintStar(target: CanvasRenderingContext2D, star: Star, alpha: number) {
      target.globalAlpha = alpha;
      if (star.radius < 0.7) {
        target.fillRect(star.x, star.y, star.radius * 1.6, star.radius * 1.6);
        return;
      }
      target.beginPath();
      target.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      target.fill();
    }

    // Estrellas diminutas y mayoritariamente tenues; solo una parte parpadea.
    const createStars = () => {
      if (!stars) return;
      const count = Math.round(Math.min(mobile ? 90 : 230, (width * height) / (mobile ? 4200 : 5600)));
      starfield = Array.from({ length: count }, () => {
        const depth = Math.random() ** 2.2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.3 + depth * 0.95,
          alpha: 0.14 + depth * 0.5 + Math.random() * 0.12,
          twinkle: Math.random() < 0.32 ? 0.0006 + Math.random() * 0.0012 : 0,
          phase: Math.random() * Math.PI * 2,
        };
      });
      twinklingStars = starfield.filter((star) => star.twinkle);

      // Las estrellas fijas se pintan una sola vez en un bitmap reutilizado cada frame.
      starLayer ??= document.createElement("canvas");
      starLayer.width = canvas.width;
      starLayer.height = canvas.height;
      const layerContext = starLayer.getContext("2d");
      if (!layerContext) {
        starLayer = null;
        twinklingStars = starfield;
        return;
      }
      layerContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      layerContext.fillStyle = "#fff";
      for (const star of starfield) {
        if (!star.twinkle) paintStar(layerContext, star, star.alpha);
      }
    };

    const scheduleShootingStar = (time: number) => {
      nextShootingStar = time + 6000 + Math.random() * 6000;
    };

    const spawnShootingStar = (time: number) => {
      const fromLeft = Math.random() < 0.5;
      const angle = (0.24 + Math.random() * 0.3) * (fromLeft ? 1 : -1);
      shootingStar = {
        x: width * (fromLeft ? 0.05 + Math.random() * 0.45 : 0.5 + Math.random() * 0.45),
        y: height * (0.04 + Math.random() * 0.38),
        dx: Math.cos(angle) * (fromLeft ? 1 : -1),
        dy: Math.abs(Math.sin(angle)),
        speed: (mobile ? 0.55 : 0.75) + Math.random() * 0.35,
        length: (mobile ? 90 : 130) + Math.random() * 90,
        start: time,
        life: 900 + Math.random() * 500,
      };
    };

    const drawStars = (time: number) => {
      if (!stars) return;
      if (starLayer) context.drawImage(starLayer, 0, 0, width, height);
      context.fillStyle = "#fff";
      for (const star of twinklingStars) {
        const flicker = star.twinkle ? 0.62 + Math.sin(time * star.twinkle + star.phase) * 0.38 : 1;
        paintStar(context, star, star.alpha * flicker);
      }
      context.globalAlpha = 1;
    };

    const drawShootingStar = (time: number) => {
      if (!stars) return;
      if (!shootingStar) {
        if (!nextShootingStar) scheduleShootingStar(time);
        else if (time >= nextShootingStar) spawnShootingStar(time);
        if (!shootingStar) return;
      }

      const elapsed = time - shootingStar.start;
      const progress = elapsed / shootingStar.life;
      if (progress >= 1) {
        shootingStar = null;
        scheduleShootingStar(time);
        return;
      }

      // Envolvente suave: aparece, cruza y se desvanece sin cortes.
      const fade = Math.sin(progress * Math.PI);
      const travel = elapsed * shootingStar.speed;
      const headX = shootingStar.x + shootingStar.dx * travel;
      const headY = shootingStar.y + shootingStar.dy * travel;
      const tail = shootingStar.length * (0.45 + fade * 0.55);
      const tailX = headX - shootingStar.dx * tail;
      const tailY = headY - shootingStar.dy * tail;
      const trail = context.createLinearGradient(headX, headY, tailX, tailY);
      trail.addColorStop(0, `rgba(255, 255, 255, ${0.85 * fade})`);
      trail.addColorStop(0.35, `rgba(210, 245, 255, ${0.28 * fade})`);
      trail.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.strokeStyle = trail;
      context.lineWidth = 1.1;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(headX, headY);
      context.lineTo(tailX, tailY);
      context.stroke();
      context.fillStyle = `rgba(255, 255, 255, ${0.9 * fade})`;
      context.beginPath();
      context.arc(headX, headY, 1.1, 0, Math.PI * 2);
      context.fill();
    };

    // Mantiene cada nodo (incluido su halo) dentro del contenedor y rebota amortiguado.
    const contain = (node: FieldNode) => {
      const margin = node.radius * 3.2;
      const maxX = Math.max(margin, width - margin);
      const maxY = Math.max(margin, height - margin);
      if (node.x < margin) {
        node.x = margin;
        node.vx = Math.abs(node.vx) * 0.82;
      } else if (node.x > maxX) {
        node.x = maxX;
        node.vx = -Math.abs(node.vx) * 0.82;
      }
      if (node.y < margin) {
        node.y = margin;
        node.vy = Math.abs(node.vy) * 0.82;
      } else if (node.y > maxY) {
        node.y = maxY;
        node.vy = -Math.abs(node.vy) * 0.82;
      }
    };

    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.2 : 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
      createNodes();
    };

    const drawOrbit = (time: number) => {
      const pointerOffsetX = pointer.active ? (pointer.x - width * 0.5) * 0.045 : 0;
      const pointerOffsetY = pointer.active ? (pointer.y - height * 0.5) * 0.035 : 0;
      const cx = width * (mobile ? 0.5 : 0.72) + pointerOffsetX;
      const cy = height * 0.47 + pointerOffsetY;
      const base = Math.min(width, height) * (mobile ? 0.31 : 0.39);
      context.save();
      context.translate(cx, cy);
      context.rotate(time * 0.000025 + scrollState.progress * 1.8);
      context.lineWidth = 0.85;
      context.setLineDash([5, 13]);
      context.strokeStyle = "rgba(0, 255, 102, 0.34)";
      context.beginPath();
      context.arc(0, 0, base, -Math.PI * 0.88, Math.PI * 0.62);
      context.stroke();
      context.rotate(-time * 0.000055 - scrollState.progress * 2.6);
      context.setLineDash([3, 19]);
      context.strokeStyle = "rgba(0, 217, 255, 0.31)";
      context.beginPath();
      context.arc(0, 0, base * 0.68, -Math.PI * 0.15, Math.PI * 1.38);
      context.stroke();
      context.restore();
    };

    const drawPointerField = () => {
      if (!pointer.active || !finePointer) return;

      const gradient = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        190,
      );
      gradient.addColorStop(0, "rgba(0, 255, 102, 0.12)");
      gradient.addColorStop(0.38, "rgba(0, 217, 255, 0.055)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = gradient;
      context.fillRect(pointer.x - 190, pointer.y - 190, 380, 380);
    };

    // Todo el movimiento se mantiene en requestAnimationFrame y no en estado de React.
    function draw(time: number) {
      frame = 0;
      context.clearRect(0, 0, width, height);
      // Capa más profunda: se pinta antes que órbitas y constelaciones.
      drawStars(time);
      drawShootingStar(time);
      drawOrbit(time);
      drawPointerField();

      for (const node of nodes) {
        node.vx *= 0.998;
        node.vy *= 0.998;
        node.x += node.vx;
        node.y += node.vy;

        if (pointer.active && finePointer) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < 210) {
            const force = 1 - distance / 210;
            node.vx += (dx / distance) * force * 0.048;
            node.vy += (dy / distance) * force * 0.048;
            node.vx = Math.max(-0.85, Math.min(0.85, node.vx));
            node.vy = Math.max(-0.85, Math.min(0.85, node.vy));
          }
        }

        contain(node);
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const first = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const second = nodes[j];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance < 148) {
            const alpha = (1 - distance / 148) * 0.36;
            context.strokeStyle = first.accent
              ? `rgba(0, 255, 102, ${alpha})`
              : `rgba(0, 217, 255, ${alpha})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }

      for (const node of nodes) {
        if (pointer.active && finePointer) {
          const pointerDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
          if (pointerDistance < 185) {
            const alpha = (1 - pointerDistance / 185) * 0.34;
            context.strokeStyle = node.accent
              ? `rgba(0, 255, 102, ${alpha})`
              : `rgba(0, 217, 255, ${alpha})`;
            context.lineWidth = 0.65;
            context.beginPath();
            context.moveTo(pointer.x, pointer.y);
            context.lineTo(node.x, node.y);
            context.stroke();
          }
        }

        const pulse = 0.68 + Math.sin(time * 0.0011 + node.phase) * 0.28;
        context.fillStyle = node.accent
          ? `rgba(0, 255, 102, ${pulse * 0.23})`
          : `rgba(0, 217, 255, ${pulse * 0.2})`;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * 3.2, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = node.accent
          ? `rgba(0, 255, 102, ${pulse})`
          : `rgba(0, 217, 255, ${pulse * 0.9})`;
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fill();
      }

      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    }

    const start = () => {
      if (visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer) return;
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onScroll = () => {
      const nextY = window.scrollY;
      const delta = nextY - scrollState.lastY;
      scrollState.lastY = nextY;
      const rect = interactionHost.getBoundingClientRect();
      scrollState.progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));

      if (visible && Math.abs(delta) > 0.1) {
        for (const node of nodes) {
          node.x += delta * (node.accent ? 0.075 : -0.045);
          node.y -= delta * (node.accent ? 0.022 : 0.012);
          contain(node);
        }
      }

      start();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    // Detiene el canvas cuando su sección sale del viewport.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    resizeObserver.observe(host);
    intersectionObserver.observe(canvas);
    interactionHost.addEventListener("pointermove", onPointerMove, { passive: true });
    interactionHost.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    onScroll();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      interactionHost.removeEventListener("pointermove", onPointerMove);
      interactionHost.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, stars]);

  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />;
}
