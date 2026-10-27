import type { Localized } from "@/types/content";

export const navigation = [
  { label: { es: "Sobre mí", en: "About" }, href: "#about" },
  { label: { es: "Tecnologías", en: "Technologies" }, href: "#technologies" },
  { label: { es: "Proyectos", en: "Projects" }, href: "#projects" },
  { label: { es: "Servicios", en: "Services" }, href: "#services" },
  { label: { es: "Contacto", en: "Contact" }, href: "#contact" },
] as const satisfies readonly { label: Localized; href: string }[];
