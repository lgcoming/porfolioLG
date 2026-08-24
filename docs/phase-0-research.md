# LGCOMIN v2 — Fase 0: research y dirección

Fecha de auditoría: 24 de agosto de 2026.

## Fuente de verdad

La web publicada en `https://lgcomin.com/` es la fuente inicial de contenido. La nueva versión conservará la identidad de Luis Gómez, el posicionamiento **Full Stack Web Developer**, los proyectos, servicios, tecnologías y enlaces reales. No se reutilizará código ni arquitectura del sitio existente.

## Inventario del sitio actual

### Navegación

- Sobre Mi (`#about`)
- Tecnologías (`#technologies`)
- Proyectos (`#projects`)
- Servicios (`#services`)
- Contacto (`#contact`)

### Hero

- Nombre: Luis Gómez
- Rol: Full Stack Web Developer
- Mensaje: “Desarrollo impulsado por Inteligencia Artificial, pensado para personas y negocios que buscan destacar y mejorar con tecnología de última generación.”
- CTA: Ver proyectos

### Sobre mí

> ¡Buenas! Me llamo Luis Gómez y soy un desarrollador web especializado en crear aplicaciones modernas con inteligencia artificial. Desarrollo utilizando herramientas e integraciones IA inteligentes que potencian cada solución digital.

> Mi experiencia abarca desde el frontend hasta el backend, siempre con un enfoque práctico en la optimización de procesos. Cada línea de código busca hacer tu día a día más fácil y eficiente.

> “La tecnología es la herramienta, pero la confianza y la seguridad son el verdadero valor de cada proyecto.”

### Tecnologías

Next.js, React, Angular, Node.js, TypeScript, Tailwind, Gemini, Claude, N8N, Make, WordPress, MySQL, MongoDB, Canva y GitHub.

### Proyectos

1. **Calmell Group** — “Sitio WordPress moderno creado con Elementor para la empresa Calmell Group. Interfaz elegante, totalmente responsiva y optimizada.” Stack: WordPress, Elementor, HTML5, CSS3, JS. URL: `https://calmell.com/`.
2. **Camisetas Mundial** — “Ecommerce de camisetas desarrollado en WordPress con Elementor. Diseño visual atractivo, responsivo y optimizado.” Stack: WordPress, Elementor, HTML5, CSS3, JS. URL: `https://camisetasmundial.com/`.
3. **Metabyts S.L.** — “Web corporativa WordPress diseñada con Elementor para empresa tecnológica Metabyts. Interfaz elegante, totalmente responsiva y optimizada.” Stack: WordPress, Elementor, HTML5, CSS3, JS. URL: `https://metabyts.com/`.
4. **WikipeIA** — “Directorio de las herramientas IA más usadas ordenadas por categorías y filtros, construido con Next.js, Tailwind CSS y animaciones avanzadas.” Stack: Next.js, React, Tailwind CSS, TS. URL: `https://wikipeia.es/`.

Las imágenes originales observadas son `logoCalmell.jpg`, `logoCM_opt.webp`, `logoMetabyts_opt.webp` y `logoWikipeIA_opt.webp`.

### Servicios

1. Desarrollo Web a Medida — Aplicaciones y sitios web modernos, rápidos y escalables adaptados a tus necesidades específicas.
2. Revisión y mejora de webs — Auditoría completa y modernización de tu web existente: diseño actualizado, mejor rendimiento y optimizaciones con IA.
3. Automatizar procesos con IA — Reduce el trabajo manual y aumenta la eficiencia de tu empresa con soluciones inteligentes.
4. GEO (Nuevo SEO), posicionamiento LLMs — Hago que tu empresa sea recomendada por ChatGPT, Gemini, Claude y más LLMs cuando un cliente pregunte por tu sector. (Próximamente)
5. Agentes IA operativos 24/7 — Agentes de IA capaces de realizar cualquier tarea totalmente personalizados que trabajan las 24 horas para tu negocio.
6. Chatbots personalizados — Asistentes con IA completamente adaptados a tu negocio para soporte al cliente y captación de leads 24/7.
7. Integración y Personalización WordPress — Sitios WordPress completamente personalizados con integración de plugins avanzados, optimización de rendimiento y seguridad.
8. Integraciones con APIs y Webhooks — Conecta tu web con herramientas externas (CRM, pagos, newsletter) mediante APIs y webhooks.
9. Optimización SEO y WPO — Mejora el posicionamiento en buscadores y la velocidad de carga de tu web. Implemento estrategias SEO y optimizaciones técnicas.
10. Mantenimiento y Soporte — Actualizaciones regulares, monitorización continua y soporte técnico especializado para tu web.
11. ¿Necesitas algo más? — Puedo ayudarte con muchas más soluciones digitales. Si no ves exactamente lo que buscas, contáctame y te propongo la mejor opción para tu proyecto.

### Contacto y enlaces reales

- CTA: “¿Tienes un proyecto o una idea?”
- Compromiso: “Escríbeme y te responderé en menos de 48 horas.”
- Formulario: email, asunto y mensaje; existe un campo honeypot.
- LinkedIn: `https://linkedin.com/in/lgcomin`
- Email: `luis.gomez.comin@gmail.com`
- Footer: `© 2026 LG / Todos los derechos reservados.`

## ADN visual que se conserva

- Base oscura y alto contraste.
- Acentos verde eléctrico y cian, reducidos a un sistema más sobrio.
- Lenguaje tecnológico y presencia de tipografía monoespaciada como voz secundaria.
- Logo LG, navegación por anclas y contenido de una sola página.
- Movimiento ambiental y transiciones como señal de capacidad técnica.

## Problemas detectados que no deben heredarse

- La jerarquía depende en exceso de glow, bordes neón y tipografía monoespaciada en todo el cuerpo.
- Canvas de partículas a viewport completo con una estética más cercana a “tech demo” que a portfolio premium.
- Muchas transiciones declaradas (89 elementos detectados) y animaciones infinitas sin una jerarquía clara.
- Grandes vacíos verticales y secciones excesivamente altas: ~7.4k px en escritorio y ~11.9k px en móvil.
- Capturas de página completa dejan contenido oculto hasta que entra en viewport: el estado inicial no es robusto para usuarios, capturas ni herramientas de indexación visual.
- Cards repetitivas en proyectos/servicios y densidad insuficiente en el primer viewport de cada sección.
- Duplicación visual observada en texto, chips y botón de formulario durante varias transiciones.
- Imágenes de proyecto solicitadas a anchos superiores a lo necesario antes de estabilizarse el `srcset`.
- Formulario sin endpoint semántico visible y campos principales sin atributo `name` en el DOM inspeccionado.
- Metadata OpenGraph/canonical apunta parcialmente al antiguo dominio `portfolio-lg.vercel.app` y no existe canonical publicado.

## Nuevo logo

- Archivo oficial: `logoBlancoLG.png`.
- Formato: PNG RGBA, 1254 × 1254 px, 702,431 bytes.
- Identidad: monograma circular LG en blanco/plata con relieve sutil y transparencia.
- Se conservará el archivo original como fuente maestra, sin redibujarlo ni reinterpretarlo.
- En producción se generarán derivados optimizados solo para tamaños de entrega, preservando alfa y proporciones.
- La intro utilizará una sola imagen con máscaras y capas CSS; no se fragmentará ni deformará el arte original.

## Dirección visual propuesta

Concepto: **Precision in motion**. Una interfaz editorial oscura y técnica que usa el círculo y los cortes geométricos del logo como sistema compositivo, no como estampado repetido.

- Fondo carbón profundo, superficies apenas elevadas y líneas de precisión.
- Blanco cálido como color principal; verde ácido reservado a estado/acción; cian como profundidad secundaria.
- Display sans contemporánea para titulares y una monoespaciada sobria para metadatos, numeración y stacks.
- Composición asimétrica, anchuras controladas y ritmo alternado entre bloques densos y aire.
- Logo protagonista durante 1.4–1.8 s, después integrado como marca de agua geométrica muy sutil.
- Proyectos tratados como piezas editoriales grandes, no tarjetas estándar.
- Servicios organizados como índice técnico numerado con variaciones de escala y detalle progresivo.
- Tecnologías en dos carriles de movimiento opuesto, con pausa y versión estática accesible.

## Sistema de motion propuesto

- Motion para intro, reveals, navegación, cursor y transforms vinculados a scroll.
- CSS para estados simples y microinteracciones.
- Sin GSAP inicialmente; solo se incorporará si una secuencia pinned concreta no puede resolverse de forma limpia con Motion.
- Sin smooth-scroll artificial ni scroll-jacking.
- Propiedades principales: `transform`, `opacity` y máscaras puntuales.
- Cursor contextual solo en `(pointer: fine)` y con `MotionValue`/RAF, sin `setState` por frame.
- `prefers-reduced-motion` mostrará el contenido inmediatamente, desactivará cursor/parallax y reducirá reveals.

## Arquitectura propuesta

- Next.js App Router, TypeScript strict y Server Components por defecto.
- Contenido real centralizado en módulos tipados de `data/`.
- Islands cliente pequeñas para intro, navegación móvil, cursor, marquee y formulario.
- Design tokens en CSS custom properties; Tailwind para composición y utilidades.
- Route Handler para contacto con Zod, honeypot y límites básicos; proveedor de correo configurable por variables de entorno.
- Metadata API, sitemap, robots y JSON-LD `Person` + `WebSite`.
- Playwright para navegación, menú móvil, anclas, enlaces y formulario.

## Plan de ejecución

1. Preparar reglas del repositorio y skills locales.
2. Inicializar una app limpia y fijar versiones estables verificadas.
3. Crear design tokens, datos tipados y estructura Server-first.
4. Completar toda la composición estática antes del motion avanzado.
5. Añadir intro, cursor, scroll y microinteracciones por capas.
6. Ajustar específicamente móvil/tablet/escritorio.
7. Optimizar imágenes, fuentes, cliente y coste de animación.
8. Ejecutar lint, typecheck, tests, build, revisión visual, accesibilidad y rendimiento.
