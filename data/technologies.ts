import type { Technology } from "@/types/content";

export const technologies = [
  { name: "Next.js", group: "web" },
  { name: "React", group: "web" },
  { name: "Angular", group: "web" },
  { name: "Node.js", group: "web" },
  { name: "TypeScript", group: "web" },
  { name: "Tailwind CSS", group: "web" },
  { name: "Gemini", group: "ai" },
  { name: "Claude", group: "ai" },
  { name: "n8n", group: "tools" },
  { name: "Make", group: "tools" },
  { name: "WordPress", group: "web" },
  { name: "MySQL", group: "data" },
  { name: "MongoDB", group: "data" },
  { name: "Canva", group: "tools" },
  { name: "GitHub", group: "tools" },
] as const satisfies readonly Technology[];

export const technologyRows = [technologies.slice(0, 8), technologies.slice(8)] as const;

