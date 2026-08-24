import type { NavigationItem } from "@/types/content";

export const navigation = [
  { label: "Sobre mí", href: "#about" },
  { label: "Tecnologías", href: "#technologies" },
  { label: "Proyectos", href: "#projects" },
  { label: "Servicios", href: "#services" },
  { label: "Contacto", href: "#contact" },
] as const satisfies readonly NavigationItem[];

