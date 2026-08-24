"use client";

import Image from "next/image";
import { AnimatePresence, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", ...navigation.map(({ href }) => href.slice(1))];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62%", threshold: [0.08, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const panel = menuRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <nav className="nav-shell container" aria-label="Navegación principal">
        <a className="brand-mark" href="#hero" aria-label="LG — ir al inicio" data-cursor="INICIO">
          <Image src="/logo-lg-ui.webp" alt="" width={48} height={48} loading="eager" unoptimized sizes="48px" />
        </a>

        <ul className="nav-links" role="list">
          {navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === id ? "is-active" : undefined}
                  aria-current={activeSection === id ? "location" : undefined}
                  data-cursor="IR"
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={menuButtonRef}
          className="menu-trigger"
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <m.div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-nav"
            initial={{ opacity: 0, transform: "translateY(-12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ol>
              {navigation.map((item, index) => (
                <li key={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <a href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
            <a className="mobile-nav-contact" href="mailto:luis.gomez.comin@gmail.com">
              luis.gomez.comin@gmail.com
            </a>
          </m.div>
        ) : null}
      </AnimatePresence>

      <m.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    </header>
  );
}
