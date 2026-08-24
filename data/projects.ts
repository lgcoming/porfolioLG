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
  {
    name: "Daycar",
    description:
      "Web corporativa para una empresa de reformas integrales en Zaragoza, con una presentación clara de servicios, proyectos y vías de contacto.",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3"],
    href: "https://daycarhomes.com/",
    image: "/projects/daycar.png",
    imageAlt: "Logotipo de Daycar",
    imageFit: "contain",
    imageSurface: "light",
  },
  {
    name: "Colchonfy",
    description:
      "Ecommerce de colchones fabricados en España, con catálogo, test de descanso, contenidos de producto y proceso de compra online.",
    stack: ["WordPress", "WooCommerce", "Elementor", "CSS3"],
    href: "https://colchon-fy.com/",
    image: "/projects/colchonfy.png",
    imageAlt: "Logotipo de Colchonfy",
    imageFit: "contain",
    imageSurface: "warm",
  },
  {
    name: "Clínica Dental Castillo",
    description:
      "Sitio corporativo para una clínica dental de Zaragoza, centrado en sus tratamientos, tecnología y atención al paciente.",
    stack: ["Next.js", "React", "Vercel", "CSS3"],
    href: "https://clinica-dental-castillo.vercel.app/",
    image: "/projects/clinica-dental-castillo.webp",
    imageAlt: "Logotipo de Clínica Dental Castillo",
    imageFit: "contain",
    imageSurface: "dark",
  },
  {
    name: "VonLippe Design",
    description:
      "Tienda online para una marca zaragozana de moda responsable, prendas exclusivas y colecciones de edición limitada.",
    stack: ["WordPress", "WooCommerce", "HTML5", "CSS3"],
    href: "https://www.vonlippe.com/",
    image: "/projects/vonlippe.webp",
    imageAlt: "Logotipo de VonLippe Design",
    imageFit: "contain",
    imageSurface: "light",
  },
] as const satisfies readonly Project[];
