# LGCOMIN v2

Portfolio profesional de Luis Gómez, reconstruido desde cero como una experiencia editorial oscura, rápida y accesible. Mantiene el contenido y la identidad de `lgcomin.com`, pero sustituye la antigua estructura por una arquitectura Server-first con un sistema visual y de motion propio.

## Stack

- Next.js 16.3.2 con App Router y Turbopack
- React 19.2.8
- TypeScript 6.0.3 en modo strict (última versión compatible con el toolchain ESLint de Next.js 16.3)
- Tailwind CSS 4.3.3 + CSS custom properties
- Motion 13.1.1
- Zod 4.4.3
- Lucide React 1.34.0
- Playwright 1.62.1
- pnpm 11.19.0

## Arquitectura

```text
app/                    rutas, metadata, estilos y API de contacto
components/layout/      navegación y footer
components/sections/    secciones Server Components
components/ui/          UI reutilizable y formulario
components/motion/      islas cliente de animación e interacción
data/                   contenido real tipado
lib/                    validación y utilidades compartidas
public/                 logo oficial e imágenes reales de proyectos
tests/e2e/              recorridos críticos de Playwright
types/                  contratos de contenido
docs/                   research y decisiones de la fase 0
.agents/skills/          skills oficiales y específicas del proyecto
.codex/config.toml       MCP de Motion, limitado al proyecto
```

Server Components son el valor por defecto. El JavaScript cliente queda limitado a navegación móvil/activa, intro, cursor, marquee, tilt, reveals y formulario.

## Instalación y ejecución

Requisitos: Node.js 24 o superior y pnpm 11.

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:3000`.

## Verificación

```bash
pnpm lint
pnpm typecheck
pnpm test:e2e
pnpm build
```

Playwright levanta `next dev` automáticamente si no existe un servidor en el puerto 3000.

Último quality gate local: build aprobada, 10/10 pruebas E2E, auditoría de producción sin vulnerabilidades conocidas y Lighthouse desktop 100/100/100/100. La muestra móvil mantiene 100 en accesibilidad, buenas prácticas y SEO; su LCP observado es 1,27 s. Los resultados y la diferencia con el throttling simulado están documentados en `reports/quality-audit.md`.

## Variables de entorno

Copia `.env.example` a `.env.local`.

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Producción | URL canónica, sitemap y metadata. |
| `CONTACT_WEBHOOK_URL` | Para enviar formularios | Endpoint HTTPS que recibirá el payload JSON. |
| `CONTACT_WEBHOOK_TOKEN` | No | Bearer token opcional para autenticar el webhook. |

El formulario valida en cliente y servidor, incluye honeypot, tiempo mínimo de envío y rate limit básico. Sin `CONTACT_WEBHOOK_URL` devuelve un estado claro y mantiene visible el email directo; no se simulan envíos ni se incluyen credenciales.

Payload enviado al webhook:

```json
{
  "email": "persona@example.com",
  "subject": "Proyecto web",
  "message": "…",
  "source": "lgcomin.com",
  "receivedAt": "2026-08-24T00:00:00.000Z"
}
```

## Sistema visual

Los tokens globales viven en `app/globals.css`: fondos carbón, blanco cálido, verde ácido, cian, superficies, radios, sombras, contenedores, espaciado y curvas de animación. La geometría del logo guía círculos, cortes y alineaciones sin convertirlo en un patrón repetitivo.

## Sistema de animaciones

- Identidad cinética distribuida entre el hero, la navegación, los reveals y las tarjetas, sin pantalla de carga que retrase el LCP.
- Entradas principales en CSS y reveals puntuales con Motion.
- Cursor contextual solo para puntero fino, alimentado por MotionValues.
- Marquees vinculados a velocidad de scroll, pausados fuera de viewport.
- Tilt de proyectos limitado a ±4°, simplificado en touch.
- Sin GSAP, Lenis, Three.js ni scroll-jacking.
- `prefers-reduced-motion` elimina intro, cursor, parallax, tilt y movimiento continuo.

## Skills instaladas

- Vercel: `react-best-practices`, `web-design-guidelines`
- Next.js: `next-dev-loop`
- Motion AI Kit: `motion`
- Web Quality Skills: `web-quality-audit`, `performance`, `core-web-vitals`, `accessibility`, `seo`, `best-practices`
- Locales: `lgcomin-art-direction`, `lgcomin-motion-system`, `lgcomin-content-integrity`, `lgcomin-quality-gate`

## Despliegue en Vercel

1. Importa el repositorio en Vercel.
2. Usa `pnpm install` y `pnpm build` (detección automática de Next.js).
3. Configura las variables de entorno de producción.
4. Verifica el dominio `lgcomin.com` y establece `NEXT_PUBLIC_SITE_URL=https://lgcomin.com`.
5. Ejecuta el quality gate contra la URL de producción antes de promover el despliegue.

No se requieren adaptadores ni configuración experimental de Next.js.
