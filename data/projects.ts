import type { Project } from "@/types/content";

export const projects = [
  {
    name: "Calmell Group",
    description:
      "Sitio WordPress moderno creado con Elementor para la empresa Calmell Group. Interfaz elegante, totalmente responsiva y optimizada.",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
    href: "https://calmell.com/",
    image: "/projects/calmell-group.jpg",
    imageAlt: "Identidad visual de Calmell Group",
  },
  {
    name: "Camisetas Mundial",
    description:
      "Ecommerce de camisetas desarrollado en WordPress con Elementor. Diseño visual atractivo, responsivo y optimizado.",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
    href: "https://camisetasmundial.com/",
    image: "/projects/camisetas-mundial.jpg",
    imageAlt: "Identidad visual de Camisetas Mundial",
  },
  {
    name: "Metabyts S.L.",
    description:
      "Web corporativa WordPress diseñada con Elementor para empresa tecnológica Metabyts. Interfaz elegante, totalmente responsiva y optimizada.",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
    href: "https://metabyts.com/",
    image: "/projects/metabyts.jpg",
    imageAlt: "Identidad visual de Metabyts S.L.",
  },
  {
    name: "WikipeIA",
    description:
      "Directorio de las herramientas IA más usadas ordenadas por categorías y filtros, construido con Next.js, Tailwind CSS y animaciones avanzadas.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    href: "https://wikipeia.es/",
    image: "/projects/wikipeia.jpg",
    imageAlt: "Identidad visual de WikipeIA",
  },
] as const satisfies readonly Project[];

