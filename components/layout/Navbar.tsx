"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";

export function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const compactRef = useRef(false);

  useEffect(() => {
    // Evita programar una actualización de React en cada scroll si el estado no cambia.
    const onScroll = () => {
      const nextCompact = window.scrollY > 40;
      if (compactRef.current === nextCompact) return;
      compactRef.current = nextCompact;
      setCompact(nextCompact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = ["hero", ...navigation.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header" data-compact={compact}>
      <nav className="navbar" aria-label="Navegación principal">
        <a className="brand" href="#hero" aria-label="LGCOMIN — inicio">
          <Image src="/logo-lg.png" alt="" width={64} height={64} preload sizes="64px" />
        </a>

        <ul className="nav-links">
          {navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <li key={item.href}>
                <a href={item.href} data-active={active === id} aria-current={active === id ? "location" : undefined}>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle-glyph" aria-hidden="true">
            <span className="menu-toggle-line menu-toggle-line-top" />
            <span className="menu-toggle-line menu-toggle-line-middle" />
            <span className="menu-toggle-line menu-toggle-line-bottom" />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
