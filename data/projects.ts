import type { LocalizedProject } from "@/types/content";

export const projects = [
  {
    title: "Calmell Group",
    description: {
      es: "Sitio WordPress moderno creado con Elementor para la empresa Calmell Group. Interfaz elegante, totalmente responsiva y optimizada.",
      en: "Modern WordPress site built with Elementor for Calmell Group. An elegant, fully responsive and optimized interface.",
    },
    href: "https://calmell.com",
    image: "/projects/calmell-group.webp",
    imageFit: "contain",
    imageSurface: "light",
    imagePadding: "compact",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
  },
  {
    title: "Camisetas Mundial",
    description: {
      es: "Ecommerce de camisetas desarrollado en WordPress con Elementor. Diseño visual atractivo, responsivo y optimizado.",
      en: "Jersey ecommerce developed in WordPress with Elementor. Attractive, responsive and optimized visual design.",
    },
    href: "https://camisetasmundial.com",
    image: "/projects/camisetas-mundial.webp",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
  },
  {
    title: "Metabyts S.L.",
    description: {
      es: "Web corporativa WordPress diseñada con Elementor para empresa tecnológica Metabyts. Interfaz elegante, totalmente responsiva y optimizada.",
      en: "Corporate WordPress website designed with Elementor for the tech company Metabyts. An elegant, fully responsive and optimized interface.",
    },
    href: "https://metabyts.com",
    image: "/projects/metabyts.webp",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3", "JS"],
  },
  {
    title: "WikipeIA",
    description: {
      es: "Directorio de las herramientas IA más usadas ordenadas por categorías y filtros, construido con Next.js, Tailwind CSS y animaciones avanzadas.",
      en: "Directory of the most used AI tools, sorted by categories and filters, built with Next.js, Tailwind CSS and advanced animations.",
    },
    href: "https://wikipeia.es",
    image: "/projects/wikipeia.webp",
    stack: ["Next.js", "React", "Tailwind CSS", "TS"],
  },
  {
    title: "Clínica Dental Castillo",
    description: {
      es: "Sitio corporativo para una clínica dental de Zaragoza, centrado en sus tratamientos, tecnología y atención al paciente.",
      en: "Corporate website for a dental clinic in Zaragoza, focused on its treatments, technology and patient care.",
    },
    href: "https://clinica-dental-castillo.vercel.app/",
    image: "/projects/clinica-dental-castillo.webp",
    imageAlt: { es: "Logotipo de Clínica Dental Castillo", en: "Clínica Dental Castillo logo" },
    imageFit: "contain",
    imageSurface: "light",
    imagePadding: "generous",
    stack: ["Next.js", "React", "Vercel", "CSS3"],
  },
  {
    title: "VonLippe Design",
    description: {
      es: "Tienda online para una marca zaragozana de moda responsable, prendas exclusivas y colecciones de edición limitada.",
      en: "Online store for a Zaragoza-based responsible fashion brand, with exclusive garments and limited-edition collections.",
    },
    href: "https://www.vonlippe.com/",
    image: "/projects/vonlippe.webp",
    imageAlt: { es: "Logotipo de VonLippe Design", en: "VonLippe Design logo" },
    imageFit: "contain",
    imageSurface: "light",
    stack: ["WordPress", "WooCommerce", "HTML5", "CSS3"],
  },
  {
    title: "Daycar Homes",
    description: {
      es: "Web corporativa para una empresa de reformas integrales en Zaragoza, con una presentación clara de servicios, proyectos y vías de contacto.",
      en: "Corporate website for a full-scale renovation company in Zaragoza, clearly presenting its services, projects and contact channels.",
    },
    href: "https://daycarhomes.com/",
    image: "/projects/daycar.png",
    imageAlt: { es: "Logotipo de Daycar Homes", en: "Daycar Homes logo" },
    imageFit: "contain",
    imageSurface: "light",
    imagePadding: "generous",
    stack: ["WordPress", "Elementor", "HTML5", "CSS3"],
  },
  {
    title: "Colchonfy",
    description: {
      es: "Ecommerce de colchones fabricados en España, con catálogo, test de descanso, contenidos de producto y proceso de compra online.",
      en: "Ecommerce for mattresses made in Spain, with a catalog, sleep test, product content and an online checkout process.",
    },
    href: "https://colchon-fy.com/",
    image: "/projects/colchonfy.png",
    imageAlt: { es: "Logotipo de Colchonfy", en: "Colchonfy logo" },
    imageFit: "contain",
    imageSurface: "light",
    stack: ["WordPress", "WooCommerce", "Elementor", "CSS3"],
  },
] as const satisfies readonly LocalizedProject[];
