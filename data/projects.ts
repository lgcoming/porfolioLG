import type { Project } from "@/types/content";

export const projects = [
  {
    title: "Calmell Group",
    description:
      "Sitio WordPress moderno creado con Elementor para la empresa Calmell Group. Interfaz elegante, totalmente responsiva y optimizada.",
    href: "https://calmell.com",
    image: "/projects/calmell-group.webp",
    imageFit: "contain",
    imageSurface: "light",
    imagePadding: "compact",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
  },
  {
    title: "Camisetas Mundial",
    description:
      "Ecommerce de camisetas desarrollado en WordPress con Elementor. Diseño visual atractivo, responsivo y optimizado.",
    href: "https://camisetasmundial.com",
    image: "/projects/camisetas-mundial.webp",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
  },
  {
    title: "Metabyts S.L.",
    description:
      "Web corporativa WordPress diseñada con Elementor para empresa tecnológica Metabyts. Interfaz elegante, totalmente responsiva y optimizada.",
    href: "https://metabyts.com",
    image: "/projects/metabyts.webp",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
  },
  {
    title: "WikipeIA",
    description:
      "Directorio de las herramientas IA más usadas ordenadas por categorías y filtros, construido con Next.js, Tailwind CSS y animaciones avanzadas.",
    href: "https://wikipeia.es",
    image: "/projects/wikipeia.webp",
    stack: ["Next.js", "React", "Tailwind CSS", "TS"],
  },
  {
    title: "Clínica Dental Castillo",
    description:
      "Sitio corporativo para una clínica dental de Zaragoza, centrado en sus tratamientos, tecnología y atención al paciente.",
    href: "https://clinica-dental-castillo.vercel.app/",
    image: "/projects/clinica-dental-castillo.webp",
    imageAlt: "Logotipo de Clínica Dental Castillo",
    imageFit: "contain",
    imageSurface: "light",
    imagePadding: "generous",
    stack: ["Next.js", "React", "Vercel", "CSS3"],
  },
  {
    title: "VonLippe Design",
    description:
      "Tienda online para una marca zaragozana de moda responsable, prendas exclusivas y colecciones de edición limitada.",
    href: "https://www.vonlippe.com/",
    image: "/projects/vonlippe.webp",
    imageAlt: "Logotipo de VonLippe Design",
    imageFit: "contain",
    imageSurface: "light",
    stack: ["WordPress", "WooCommerce", "HTML5", "CSS3"],
  },
  {
    title: "Daycar",
    description:
      "Web corporativa para una empresa de reformas integrales en Zaragoza, con una presentación clara de servicios, proyectos y vías de contacto.",
    href: "https://daycarhomes.com/",
    image: "/projects/daycar.png",
    imageAlt: "Logotipo de Daycar",
    imageFit: "contain",
    imageSurface: "light",
    imagePadding: "generous",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3"],
  },
  {
    title: "Colchonfy",
    description:
      "Ecommerce de colchones fabricados en España, con catálogo, test de descanso, contenidos de producto y proceso de compra online.",
    href: "https://colchon-fy.com/",
    image: "/projects/colchonfy.png",
    imageAlt: "Logotipo de Colchonfy",
    imageFit: "contain",
    imageSurface: "light",
    stack: ["WordPress", "WooCommerce", "Elementor", "CSS3"],
  },
] as const satisfies readonly Project[];
