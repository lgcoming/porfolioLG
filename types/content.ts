export type Project = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  imageSurface?: "dark" | "light" | "warm";
  imagePadding?: "compact" | "standard" | "generous";
  stack: readonly string[];
};

export type Service = {
  title: string;
  description: string;
};
