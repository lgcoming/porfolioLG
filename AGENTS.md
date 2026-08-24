# LGCOMIN v2 — Repository Guide

## Product intent

Build `lgcomin.com` as a premium, dark, editorial portfolio for Luis Gómez. It must communicate modern web engineering, AI fluency, creative development and trust without resembling a generic SaaS or developer template. The current public site is the source of truth for initial content; `docs/phase-0-research.md` records the audited baseline.

## Visual philosophy

- Work from the official `logoBlancoLG.png`; preserve its proportions and artwork.
- Use the logo's circle, cuts and alignment as compositional cues, not as repeated decoration.
- Keep the palette narrow: charcoal, warm white, acid green and restrained cyan.
- Prefer editorial scale, strong whitespace and precise dividers over card-heavy layouts.
- Avoid exaggerated neon, heavy glassmorphism, random gradients, oversized glow and game-like UI.

## Stack and architecture

- Next.js App Router, React, TypeScript strict and Tailwind CSS.
- Motion for React is the default animation system. Add GSAP only for a proven interaction that Motion cannot express cleanly.
- `pnpm` is the package manager. Vercel is the deployment target.
- Static content lives in typed modules under `data/`. Shared types live under `types/`.
- Components are organized by layout, section, UI and motion responsibility. Avoid monolithic section files.
- Metadata, sitemap, robots and structured data use native Next.js APIs.

## TypeScript conventions

- Keep `strict` enabled. Do not use `any`, non-null assertions or unsafe casts to silence errors.
- Prefer `satisfies`, discriminated unions, readonly data and inferred return types when clear.
- Validate untrusted input at runtime with Zod; TypeScript types alone are not validation.
- Keep domain data separate from rendering logic.

## React conventions

- Use semantic elements and native browser behavior before custom abstractions.
- Keep components focused; extract repeated behavior, not one-off markup.
- Do not store derived values in state or use effects for render-time computation.
- Continuous pointer/scroll values must use MotionValues, refs or `requestAnimationFrame`, never React state per frame.

## Server and Client Components

- Server Components are the default.
- Add `"use client"` only to the smallest interactive island.
- Do not mark a whole section as client-rendered because one child animates.
- Keep data arrays, copy and metadata on the server unless an interaction genuinely needs them in the browser.

## Performance rules

- Prioritize LCP, INP and CLS. Set explicit media dimensions and correct responsive `sizes`.
- Use `next/image` and `next/font`; avoid third-party scripts and unnecessary dependencies.
- Lazy-load below-the-fold media and optional interactive islands. Treat the hero logo deliberately as an above-the-fold asset.
- Prefer transform and opacity. Avoid continuous layout, paint-heavy filters and large animated shadows.
- Do not read layout repeatedly in scroll handlers. Clean observers, listeners, RAF callbacks and animation controls.
- `will-change` is temporary and local, never a blanket style.

## Animation rules

- Motion hierarchy: hero intro, section headings, important elements, normal content.
- Intro target: 1.4–1.8 seconds, without delaying actual HTML or accessibility.
- Microinteractions should usually finish within 160–320 ms; larger reveals within 400–700 ms.
- No scroll-jacking. Scroll velocity may influence presentation but never navigation physics.
- Cursor effects only apply to `(pointer: fine)` and must disappear for touch or reduced motion.
- Every animated experience needs a complete `prefers-reduced-motion` state with immediately available content.

## Responsive rules

- Design intentionally for mobile, tablet, laptop, desktop and wide screens.
- Do not merely scale desktop down. Recompose grids, reading order and interaction density.
- On touch devices remove cursor behavior, simplify parallax/3D and ensure targets are at least 44 × 44 px.
- Avoid long pinned sequences on mobile and verify there is no horizontal overflow at 320 px.

## Accessibility rules

- Target WCAG 2.2 AA.
- Maintain one logical `h1`, correct heading order, landmarks, skip link and meaningful accessible names.
- All functionality must work by keyboard with visible focus.
- Menus require focus management, Escape handling and restored focus.
- Forms require persistent labels, associated errors, live status and non-color-only feedback.
- External links must be understandable and safe; decorative visuals must be hidden from assistive tech.

## Dependency policy

- Add dependencies only when they reduce meaningful complexity or improve correctness.
- Use stable, security-patched versions. Avoid canary, beta and experimental packages in production.
- Prefer CSS, browser APIs and existing libraries over new packages.
- Do not add Three.js, React Three Fiber, Lenis or GSAP without a documented need.

## Verification commands

Run the commands defined in `package.json`; the expected gate includes:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Also verify the production page at representative mobile and desktop widths, keyboard navigation, reduced motion, console output, image delivery, client-component boundaries and dependency usage.

## Definition of done

A task is complete only when its requested behavior is implemented, the relevant commands pass, no new console errors appear, responsive/reduced-motion states work, accessibility remains intact, and the result still feels recognizably LG rather than a generic template. Never leave fake links, invented content, hardcoded secrets or unresolved TODOs.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
