# Quality audit — LGCOMIN v2

Fecha: 24 de agosto de 2026  
Entorno: build local de producción (`next build` + `next start`)  
Lighthouse: 13.4.1, Chrome headless

## Resultado

| Perfil | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop | 100 | 100 | 100 | 100 | 0,3 s | 0,6 s | 0 ms | 0 |
| Mobile, throttling simulado | 76 | 100 | 100 | 100 | 1,0 s | 6,8 s | 110 ms | 0 |

La traza móvil registra un LCP observado de **1,27 s**. Lighthouse 13 extrapola ese evento a 6,8 s en su modelo de throttling; el recurso LCP real tarda 18 ms en transferirse y su desglose observado es 42 ms de TTFB, 9 ms de espera, 18 ms de descarga y 1,20 s de render. Se conservan ambos informes sin combinar puntuaciones:

- `lighthouse.json`: perfil desktop.
- `lighthouse-mobile.json`: perfil mobile simulado.

La CLI escribió ambos artefactos correctamente. En este entorno Windows devuelve después un `EPERM` al intentar borrar su carpeta temporal de Chrome; el error ocurre tras guardar el resultado y no invalida la traza.

## Quality gate automatizado

- `pnpm lint`: aprobado.
- `pnpm typecheck`: aprobado.
- `pnpm test --reporter=line`: 10/10 pruebas aprobadas en Chromium desktop y mobile.
- `pnpm build`: aprobado; home, robots y sitemap prerenderizados, API de contacto dinámica.
- `pnpm audit --prod`: sin vulnerabilidades conocidas.

## Auditorías de implementación

### Accesibilidad

- Estructura semántica, navegación por teclado, skip link y foco visible.
- Menú móvil y formulario con nombres accesibles y estados anunciados.
- Errores del formulario asociados a cada campo y foco al primer error.
- Contraste, tamaños táctiles y ausencia de overflow horizontal verificados.
- `prefers-reduced-motion` elimina movimiento continuo, tilt, cursor y reveals.

### Rendimiento

- Server Components por defecto; islas cliente limitadas a interacción y motion.
- `LazyMotion` y carga dinámica de features para reducir el bundle de Motion.
- Fuentes locales, imágenes WebP, dimensiones explícitas y lazy loading bajo el fold.
- Recurso LCP de 40 KB preloaded y servido estáticamente, sin pasar por el optimizador en runtime.
- Animaciones limitadas a transform/opacity; sin scroll-jacking ni librerías duplicadas.

### SEO y buenas prácticas

- Metadata completa, canonical, Open Graph, Twitter card y JSON-LD.
- `robots.txt` y `sitemap.xml` generados por Next.js.
- Cabeceras HSTS, anti-sniffing, anti-framing, referrer policy y permissions policy.
- Formulario con Zod en cliente/servidor, honeypot, tiempo mínimo y rate limit básico.

### Motion

La revisión estática y runtime confirma cleanup de listeners, límites de tilt, pausa del marquee fuera de viewport y soporte de movimiento reducido. Motion MCP quedó configurado a nivel de proyecto, pero la sesión actual no lo expuso hasta reiniciar Codex; por ello no se atribuye una nota MotionScore ni una auditoría Motion+ inexistente.

## Condición de despliegue

Antes de publicar, configurar `CONTACT_WEBHOOK_URL` y `NEXT_PUBLIC_SITE_URL`. Sin webhook, el formulario devuelve deliberadamente un estado 503 claro y mantiene el email directo como alternativa.
