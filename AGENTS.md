# LGCOMIN V2 — reglas del repositorio

## Identidad visual

Este proyecto NO debe alejarse de la estética original de lgcomin.com. La base es negro AMOLED real, blanco de alto contraste, verde neón y cian, tipografía técnica y una atmósfera de tecnología e IA. El resultado debe sentirse como una evolución directa de LGCOMIN, nunca como una plantilla SaaS, una landing corporativa o una estética clara/pastel.

- El negro puro es espacio visual activo; no rellenar cada área con efectos.
- Usar glow fino, localizado y con baja opacidad.
- Evitar glassmorphism abundante, tarjetas enormes redondeadas, morados genéricos y fondos grisáceos.
- Usar `logoBlancoLG.png` sin redibujarlo ni alterar su geometría.

## Motion

- La entrada de “Luis Gomez” conserva el concepto de escritura carácter a carácter.
- Las transformaciones de sección deben depender del progreso de scroll y responder al bajar y al subir.
- Motion for React es la herramienta principal. Canvas 2D se reserva para el fondo ambiental del hero.
- No implementar scroll-jacking ni bloquear el desplazamiento nativo.
- Los efectos magnéticos no superan 8 px y solo aparecen con `pointer: fine`.

## Performance

- Objetivo: 60 fps en hardware razonable.
- Animar `transform` y `opacity`; evitar propiedades que provoquen layout.
- No actualizar estado React en cada `pointermove` o `scroll`; usar refs, MotionValues o `requestAnimationFrame`.
- Limitar el DPR del canvas, pausarlo fuera del viewport y limpiar listeners/frames.
- Mantener pequeño el bundle y evitar Three.js/GSAP salvo ventaja demostrable.

## Content

- No inventar proyectos, servicios, tecnologías, enlaces ni afirmaciones.
- `data/` es la fuente centralizada del contenido obtenido de lgcomin.com.
- Mantener los textos originales; solo corregir ortografía menor cuando no cambie el significado.

## Architecture

- Server Components por defecto.
- Añadir `"use client"` únicamente donde haya interacción, animación o browser APIs.
- Mantener componentes pequeños por responsabilidad y evitar barrels innecesarios.
- TypeScript debe permanecer en modo estricto.

## Mobile y accesibilidad

- En móvil, simplificar el canvas, eliminar cursor personalizado y efectos magnéticos, y reducir parallax.
- Respetar `prefers-reduced-motion`: contenido inmediato, sin cursor custom y sin movimiento continuo.
- Conservar navegación por teclado, foco visible, landmarks semánticos y enlaces de salto.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
