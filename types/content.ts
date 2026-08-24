export type NavigationItem = {
  readonly label: string;
  readonly href: `#${string}`;
};

export type Technology = {
  readonly name: string;
  readonly group: "web" | "ai" | "tools" | "data";
};

export type Project = {
  readonly name: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly href: `https://${string}`;
  readonly image: `/${string}`;
  readonly imageAlt: string;
};

export type Service = {
  readonly title: string;
  readonly description: string;
  readonly category: "web" | "ai" | "growth" | "support";
  readonly status?: "Próximamente";
};

