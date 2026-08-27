---
name: lgcomin-motion-system
description: "Diseña, implementa y revisa el sistema de movimiento de LGCOMIN: typing, hero reactivo, scroll, cursor, parallax y reduced motion."
---

# LGCOMIN Motion System

Aplica esta skill a cualquier animación o interacción del portfolio LGCOMIN.

## Jerarquía del movimiento

1. Identidad y legibilidad.
2. Respuesta directa a la interacción.
3. Continuidad vinculada al scroll.
4. Decoración ambiental.

El movimiento nunca controla el scroll nativo ni retrasa el acceso al contenido.

## Entrada y typing

- “Luis Gomez” se construye carácter a carácter y conserva un cursor visible al terminar.
- La secuencia completa dura aproximadamente 1.5–2.5 s: logo breve, typing, profesión, descripción y CTA.
- El typing es exclusivo del nombre; no repetirlo en titulares.
- Con reduced motion, mostrar el nombre completo de inmediato.

## Hero background

- Usar Canvas 2D ligero con pocos nodos, conexiones cercanas y trazos curvos inspirados en el logo.
- Guardar puntero, tamaño y partículas en refs; nunca llamar a `setState` por frame.
- Ejecutar con `requestAnimationFrame`, limitar DPR, usar `ResizeObserver` solo si aporta valor y cancelar todo en cleanup.
- Pausar fuera del viewport y cuando la pestaña no esté visible.
- En `pointer: fine`, aplicar repulsión/atracción suave; en móvil, reducir densidad y omitir interacción.

## Scroll bidireccional

- Derivar las transformaciones de un progreso continuo de scroll para que se inviertan al subir.
- Usar `useScroll`, `useTransform`, `useSpring` y `useVelocity` cuando aporten una relación observable.
- Evitar animaciones `once` en efectos que deban reaccionar de vuelta.
- Reveal recomendado: clip/máscara, desplazamiento corto, blur leve y opacidad; no repetir exactamente el mismo patrón en todas las secciones.

## Velocity y parallax

- La velocidad puede alterar sutilmente marquees, líneas y capas ambientales.
- Suavizarla con spring/damping y limitar el rango para evitar saltos.
- Mantener el parallax corto y basado en `transform`.

## Cursor y magnetic

- Solo en `pointer: fine` y sin reduced motion.
- Cursor discreto: punto/halo; contexto `VER ↗` sobre proyectos.
- Magnetic solo en CTAs e iconos seleccionados, con desplazamiento máximo de 4–8 px.
- No ocultar el cursor nativo hasta confirmar que el cursor custom está activo.

## Rendimiento y accesibilidad

- Priorizar `transform` y `opacity`.
- No provocar lecturas/escrituras de layout intercaladas.
- Desactivar movimiento continuo con `prefers-reduced-motion`.
- En móvil: menos nodos, sin cursor, sin magnetic y parallax mínimo.
- Limpiar frames, observers y listeners en cada desmontaje.
