---
name: lgcomin-motion-system
description: Implement or audit animation, pointer, scroll, SVG, transition, and reduced-motion behavior for the LGCOMIN portfolio.
---

# LGCOMIN motion system

Motion demonstrates craft while preserving reading, input responsiveness and native scroll.

## Tool choice

- Use CSS for simple hover, focus and state transitions.
- Use Motion for coordinated React animation, presence, springs, MotionValues and scroll transforms.
- Use GSAP + ScrollTrigger only when a specific pinned/timeline behavior remains substantially clearer than a Motion solution. Document the reason before adding it.
- Do not add smooth-scroll libraries unless user testing proves a benefit.

## Timing and feel

- Intro: 1.4–1.8 s total, content present in HTML from first render.
- Microinteractions: 160–320 ms. Section reveals: 400–700 ms.
- Default ease: `[0.22, 1, 0.36, 1]`; use springs for tracked cursor/velocity values, not every entrance.
- Stagger only meaningful peers, usually 35–80 ms, and cap long lists.
- Pointer response stays subtle: roughly 2–4° rotation and 5–15 px translation.

## Performance invariants

- Animate transform and opacity first; use clip-path only for bounded reveals.
- Never update React state on every pointermove or scroll event.
- Use MotionValues or a single RAF loop. Read layout outside hot loops where possible.
- Pause offscreen marquee/ambient work with visibility/intersection signals.
- Clean every listener, observer, RAF, timer and animation control.
- Avoid continuous filter, large blur, box-shadow, width, height, top, left and margin animation.
- Apply `will-change` only during an active transition.

## Cursor and scroll

- Enable custom cursor only for `(pointer: fine) and (hover: hover)`.
- Keep the native cursor semantics understandable; contextual labels such as `VER` are brief and small.
- Do not intercept or reshape wheel/trackpad physics.
- Velocity may modulate marquee or parallax within strict clamps and should settle via damping.

## Reduced motion

When `prefers-reduced-motion: reduce` is active: skip the intro sequence, hide custom cursor, remove parallax/3D/pinned behavior, stop marquees, shorten reveals to a near-immediate fade and expose all content without waiting for intersection.

## Audit

Search Motion/CSS/GSAP usage, identify layout/paint-heavy animation, verify listeners and RAF cleanup, test reduced motion, check that offscreen loops pause, and inspect the browser for long tasks or console warnings.

