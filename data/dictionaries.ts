import type { Locale } from "@/lib/i18n";
import type { RichText } from "@/types/content";

const rich = (...parts: RichText): RichText => parts;

const es = {
  meta: {
    title: "Portfolio | Luis Gómez",
    description:
      "Portfolio de Luis Gomez, desarrollador Full Stack especializado en desarrollo web, inteligencia artificial y automatización.",
    ogTitle: "Luis Gomez — Full Stack Web Developer",
    ogLocale: "es_ES",
  },
  skipLink: "Saltar al contenido principal",
  nav: {
    ariaLabel: "Navegación principal",
    home: "LGCOMIN — inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Idioma",
    languageSwitch: "Ver el porfolio en inglés",
  },
  hero: {
    kicker: "Portfolio",
    role: "Full Stack Web Developer",
    description: rich(
      "Desarrollo impulsado por ",
      { text: "Inteligencia Artificial", tone: "strong" },
      ", pensado para personas y negocios que buscan destacar y mejorar con tecnología de última generación.",
    ),
    primaryCta: "Ver proyectos",
    secondaryCta: "Hablemos",
    scrollCue: "Ir a Sobre mí",
  },
  about: {
    eyebrow: "PERFIL",
    title: "Sobre mí",
    statement: rich(
      "Creo soluciones digitales donde ",
      { text: "código", tone: "code" },
      ", ",
      { text: "inteligencia artificial", tone: "ai" },
      " y ",
      { text: "seguridad", tone: "security" },
      " se combinan para crear productos más eficientes, útiles y preparados para crecer.",
    ),
    tagline: "FULL STACK / IA / AUTOMATIZACIÓN",
    bio: [
      rich(
        "¡Buenas! Me llamo ",
        { text: "Luis Gómez", tone: "strong" },
        " y soy un desarrollador web full stack especializado en crear aplicaciones modernas. Desarrollo utilizando herramientas e integraciones de última generación con ",
        { text: "inteligencia artificial", tone: "strong" },
        " que potencian cada solución digital.",
      ),
      rich(
        "Mi experiencia abarca desde el ",
        { text: "frontend", tone: "strong" },
        " hasta el ",
        { text: "backend", tone: "strong" },
        ", siempre con un enfoque práctico en la optimización de procesos. Cada línea de código busca hacer tu día a día más fácil y eficiente.",
      ),
    ],
    quote:
      "La tecnología es la herramienta necesaria, pero la confianza y la seguridad son el verdadero valor de cada proyecto.",
  },
  technologies: {
    eyebrow: "STACK",
    title: "Tecnologías",
    intro: "Herramientas de última generación para construir productos rápidos, eficientes, seguros y escalables.",
    more: "…y muchas más.",
    rowLabel: "Fila {row} de tecnologías. Arrastra horizontalmente o usa las flechas izquierda y derecha.",
  },
  projects: {
    eyebrow: "TRABAJO",
    title: "Proyectos",
    viewProject: "Ver proyecto",
    cta: "VER PROYECTO ↗",
    stackLabel: "Tecnologías utilizadas",
  },
  services: {
    eyebrow: "CAPACIDADES",
    title: "Servicios",
  },
  contact: {
    eyebrow: "CONTACTO",
    title: "Contacto",
    lead: "¿Tienes una idea o proyecto en mente?",
    body: "Escríbeme y te responderé en menos de 48 horas.",
    whatsapp: "Contactar por WhatsApp",
    form: {
      ariaLabel: "Formulario de contacto",
      honeypot: "Sitio web",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      subject: "Asunto",
      subjectPlaceholder: "Quiero crear...",
      message: "Mensaje",
      messagePlaceholder: "Háblame de tu proyecto, idea o reto.",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      sending: "Enviando mensaje…",
      invalid: "Revisa los campos señalados.",
      success: "Mensaje enviado correctamente.",
      failure: "No se pudo enviar el mensaje.",
    },
  },
  footer: {
    home: "Volver al inicio",
    rights: "Todos los derechos reservados.",
  },
  backToTop: "Volver arriba",
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Portfolio | Luis Gómez",
    description:
      "Portfolio of Luis Gomez, a Full Stack developer specialized in web development, artificial intelligence and automation.",
    ogTitle: "Luis Gomez — Full Stack Web Developer",
    ogLocale: "en_US",
  },
  skipLink: "Skip to main content",
  nav: {
    ariaLabel: "Main navigation",
    home: "LGCOMIN — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    languageSwitch: "View the portfolio in Spanish",
  },
  hero: {
    kicker: "Portfolio",
    role: "Full Stack Web Developer",
    description: rich(
      "Development driven by ",
      { text: "Artificial Intelligence", tone: "strong" },
      ", designed for people and businesses that want to stand out and grow with cutting-edge technology.",
    ),
    primaryCta: "View projects",
    secondaryCta: "Let's talk",
    scrollCue: "Go to About",
  },
  about: {
    eyebrow: "PROFILE",
    title: "About me",
    statement: rich(
      "I build digital solutions where ",
      { text: "code", tone: "code" },
      ", ",
      { text: "artificial intelligence", tone: "ai" },
      " and ",
      { text: "security", tone: "security" },
      " come together to create more efficient, useful products that are ready to grow.",
    ),
    tagline: "FULL STACK / AI / AUTOMATION",
    bio: [
      rich(
        "Hi! My name is ",
        { text: "Luis Gómez", tone: "strong" },
        " and I'm a full stack web developer specialized in building modern applications. I work with cutting-edge tools and integrations powered by ",
        { text: "artificial intelligence", tone: "strong" },
        " that enhance every digital solution.",
      ),
      rich(
        "My experience ranges from the ",
        { text: "frontend", tone: "strong" },
        " to the ",
        { text: "backend", tone: "strong" },
        ", always with a practical focus on process optimization. Every line of code aims to make your day-to-day easier and more efficient.",
      ),
    ],
    quote:
      "Technology is the necessary tool, but trust and security are the true value of every project.",
  },
  technologies: {
    eyebrow: "STACK",
    title: "Technologies",
    intro: "Cutting-edge tools to build fast, efficient, secure and scalable products.",
    more: "…and many more.",
    rowLabel: "Technology row {row}. Drag horizontally or use the left and right arrow keys.",
  },
  projects: {
    eyebrow: "WORK",
    title: "Projects",
    viewProject: "View project",
    cta: "VIEW PROJECT ↗",
    stackLabel: "Technologies used",
  },
  services: {
    eyebrow: "CAPABILITIES",
    title: "Services",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Contact",
    lead: "Do you have an idea or project in mind?",
    body: "Write to me and I'll get back to you in less than 48 hours.",
    whatsapp: "Contact via WhatsApp",
    form: {
      ariaLabel: "Contact form",
      honeypot: "Website",
      email: "Email",
      emailPlaceholder: "you@email.com",
      subject: "Subject",
      subjectPlaceholder: "I want to build...",
      message: "Message",
      messagePlaceholder: "Tell me about your project, idea or challenge.",
      submit: "Send message",
      submitting: "Sending…",
      sending: "Sending message…",
      invalid: "Please check the highlighted fields.",
      success: "Message sent successfully.",
      failure: "The message could not be sent.",
    },
  },
  footer: {
    home: "Back to home",
    rights: "All rights reserved.",
  },
  backToTop: "Back to top",
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
