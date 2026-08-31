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

type HeroFieldProps = {
  density?: number;
};

export function HeroField({ density = 1 }: HeroFieldProps) {
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let nodes: FieldNode[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const scrollState = { lastY: window.scrollY, progress: 0 };

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

    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.2 : 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
      if (reducedMotion) draw(0);
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

    function draw(time: number) {
      frame = 0;
      context.clearRect(0, 0, width, height);
      drawOrbit(time);
      drawPointerField();

      for (const node of nodes) {
        if (!reducedMotion) {
          node.vx *= 0.998;
          node.vy *= 0.998;
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -10) node.x = width + 10;
          if (node.x > width + 10) node.x = -10;
          if (node.y < -10) node.y = height + 10;
          if (node.y > height + 10) node.y = -10;

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
        }
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

      if (!reducedMotion && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }

    const start = () => {
      if (!reducedMotion && visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
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
      if (reducedMotion) draw(performance.now());
    };
    const onPointerLeave = () => {
      pointer.active = false;
      if (reducedMotion) draw(performance.now());
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
          if (node.x < -12) node.x = width + 12;
          if (node.x > width + 12) node.x = -12;
          if (node.y < -12) node.y = height + 12;
          if (node.y > height + 12) node.y = -12;
        }
      }

      if (reducedMotion && visible) draw(performance.now());
      else start();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (reducedMotion) draw(performance.now());
        else start();
      }
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
  }, [density]);

  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />;
}
