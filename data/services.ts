import type { Service } from "@/types/content";

export const services = [
  {
    title: { es: "Desarrollo Web a medida", en: "Custom Web Development" },
    description: {
      es: "Aplicaciones y sitios web modernos, rápidos y escalables adaptados a tus necesidades específicas.",
      en: "Modern, fast and scalable web applications and websites tailored to your specific needs.",
    },
  },
  {
    title: { es: "Revisión y mejora de webs", en: "Website review and improvement" },
    description: {
      es: "Auditoría completa y modernización de tu web existente: diseño actualizado, mejor rendimiento y optimizaciones con IA.",
      en: "A complete audit and modernization of your existing website: refreshed design, better performance and AI-powered optimizations.",
    },
  },
  {
    title: { es: "Automatizar procesos con IA", en: "AI process automation" },
    description: {
      es: "Reduce el trabajo manual y aumenta la eficiencia de tu empresa con soluciones inteligentes.",
      en: "Reduce manual work and boost your company's efficiency with intelligent solutions.",
    },
  },
  {
    title: { es: "Posicionamiento SEO", en: "SEO" },
    description: {
      es: "Mejora el posicionamiento de tu web en buscadores como Google con estrategias SEO on-page, contenido optimizado y una estructura técnica preparada para crecer.",
      en: "Improve your website's ranking on search engines like Google with on-page SEO strategies, optimized content and a technical structure built to grow.",
    },
  },
  {
    title: { es: "Posicionamiento GEO", en: "GEO (Generative Engine Optimization)" },
    description: {
      es: "Hago que tu empresa sea recomendada por ChatGPT, Gemini, Claude y más LLMs cuando un cliente pregunte por tu sector.",
      en: "I get your company recommended by ChatGPT, Gemini, Claude and other LLMs when a customer asks about your industry.",
    },
  },
  {
    title: { es: "Agentes IA operativos 24/7", en: "AI agents working 24/7" },
    description: {
      es: "Agentes de IA capaces de realizar cualquier tarea totalmente personalizados que trabajan las 24 horas para tu negocio.",
      en: "Fully customized AI agents capable of performing any task, working around the clock for your business.",
    },
  },
  {
    title: { es: "Chatbots personalizados", en: "Custom chatbots" },
    description: {
      es: "Asistentes con IA completamente adaptados a tu negocio para soporte al cliente y captación de leads 24/7.",
      en: "AI assistants fully tailored to your business for 24/7 customer support and lead generation.",
    },
  },
  {
    title: { es: "Personalización WordPress", en: "WordPress customization" },
    description: {
      es: "Sitios WordPress completamente personalizados con integración de plugins avanzados, optimización de rendimiento y seguridad.",
      en: "Fully customized WordPress sites with advanced plugin integration, performance optimization and security.",
    },
  },
  {
    title: { es: "Integraciones con APIs", en: "API integrations" },
    description: {
      es: "Conecta tu web con herramientas externas (CRM, pagos, newsletter) mediante APIs y webhooks.",
      en: "Connect your website with external tools (CRM, payments, newsletter) through APIs and webhooks.",
    },
  },
  {
    title: { es: "Optimización WPO", en: "WPO (Web Performance Optimization)" },
    description: {
      es: "Optimización extrema de la velocidad de carga y de los Core Web Vitals (LCP, INP, CLS), depurando recursos, imágenes y procesos técnicos para alcanzar un 100/100 en rendimiento en Lighthouse y PageSpeed.",
      en: "Extreme optimization of loading speed and Core Web Vitals (LCP, INP, CLS), refining resources, images and technical processes to reach a 100/100 performance score in Lighthouse and PageSpeed.",
    },
  },
  {
    title: { es: "Mantenimiento y Soporte", en: "Maintenance and Support" },
    description: {
      es: "Actualizaciones regulares, monitorización continua y soporte técnico especializado para tu web.",
      en: "Regular updates, continuous monitoring and specialized technical support for your website.",
    },
  },
  {
    title: { es: "¿Necesitas algo más?", en: "Need something else?" },
    description: {
      es: "Puedo ayudarte con muchas más soluciones digitales. Si no ves exactamente lo que buscas, contáctame y te propongo la mejor opción para tu proyecto.",
      en: "I can help you with many more digital solutions. If you don't see exactly what you're looking for, get in touch and I'll propose the best option for your project.",
    },
  },
] as const satisfies readonly Service[];
