# Portfolio LGCOMIN

Portfolio personal de Luis Gómez. Es una aplicación de una sola página construida con Next.js, centrada en desarrollo web, inteligencia artificial y automatización. Mantiene la identidad visual de LGCOMIN: negro AMOLED, tipografía técnica y acentos verde neón/cian.

## Tecnologías

- Next.js 16 con App Router y TypeScript estricto.
- React 19 y Motion para las interacciones y las transiciones ligadas al scroll.
- Canvas 2D nativo para el fondo ambiental del hero.
- Resend y Zod para el formulario de contacto.
- Playwright, ESLint y TypeScript para las comprobaciones automatizadas.

## Puesta en marcha

Requiere Node.js 20.9 o superior y pnpm 11.

~~~bash
pnpm install
Copy-Item .env.example .env.local
pnpm dev
~~~

La web queda disponible en http://localhost:3000.

## Variables de entorno

Define estas variables en .env.local y en el proveedor de despliegue:

| Variable | Uso |
| --- | --- |
| RESEND_API_KEY | Clave privada para enviar los mensajes. |
| CONTACT_TO_EMAIL | Dirección que recibe los mensajes. Si falta, se usa el correo definido en data/contact.ts. |
| CONTACT_FROM_EMAIL | Remitente verificado en Resend. Durante pruebas se puede usar onboarding@resend.dev. |
| NEXT_PUBLIC_SITE_URL | URL pública para metadatos, sitemap y enlaces canónicos. |

No incluyas secretos en el repositorio. Consulta [.env.example](./.env.example) para los valores de muestra.

## Scripts

~~~bash
pnpm dev        # Desarrollo con Turbopack
pnpm lint       # Reglas de ESLint
pnpm typecheck  # Tipado estricto
pnpm test       # Pruebas end-to-end de Playwright
pnpm build      # Build de producción
~~~

Antes de desplegar, ejecuta:

~~~bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
~~~

## Estructura

~~~text
app/              Rutas, metadatos, estilos globales y API de contacto
components/
  sections/       Secciones de contenido de la página
  motion/         Canvas, typing, reveal, cinta y parallax
  ui/             Formulario, acciones y navegación auxiliar
data/             Fuente única de proyectos, servicios, tecnologías y contacto
  lib/              Validación y cliente de Resend
public/projects/  Imágenes reales de cada proyecto
tests/e2e/        Cobertura de navegación, motion, formulario y responsive
docs/             Investigación y dirección visual del portfolio
~~~

El contenido editable vive en data/. Añade proyectos, servicios o enlaces allí; las secciones los renderizan automáticamente.

## Animaciones

Las animaciones se ejecutan desde la primera carga en escritorio y móvil, sin botones de activación ni preferencias guardadas en el navegador. El canvas se pausa cuando su sección no está visible o la pestaña queda en segundo plano para mantener el rendimiento.

## Formulario de contacto

POST /api/contact valida el contenido con Zod, limita los intentos, rechaza bots mediante honeypot y tiempo mínimo de interacción, escapa el HTML del email y usa una clave de idempotencia para evitar duplicados. La API se ejecuta en Node.js para poder usar Resend.

## Despliegue

El proyecto está preparado para Vercel:

1. Importa el repositorio en Vercel.
2. Añade las variables de entorno de producción.
3. Verifica el dominio remitente en Resend antes de usar CONTACT_FROM_EMAIL.
4. Publica el despliegue.

El build genera la página principal de forma estática y deja /api/contact como función dinámica.
