---
name: lgcomin-quality-gate
description: Run the required completion audit for LGCOMIN changes, releases, or requests to verify, finish, optimize, or prepare the portfolio for production.
---

# LGCOMIN quality gate

Scale checks to the change, but a production-ready release requires every category below.

## Automated gate

1. Clean dependency install from the lockfile.
2. Lint and strict typecheck.
3. Relevant unit/component tests.
4. Critical Playwright flows: initial render, anchors, desktop navigation, mobile menu, project links, contact validation/status and core responsive behavior.
5. Production build.

## Browser gate

- Check at 320, 390, 768, 1024, 1440 and a wide desktop viewport.
- Inspect console errors and warnings.
- Traverse all controls by keyboard, including menu focus/Escape and form errors.
- Test `prefers-reduced-motion`, touch/coarse pointer and fine pointer behavior.
- Confirm no horizontal overflow, clipped focus ring, layout shift or content hidden after animation.

## Quality audits

- Lighthouse targets: Performance ≥ 90 mobile, Accessibility near 100, Best Practices ≥ 95, SEO ≥ 95.
- CWV targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- Review against Vercel React Best Practices and Web Interface Guidelines.
- Run a Motion-specific source/runtime audit for expensive properties, endless offscreen work and cleanup leaks.
- Search for unoptimized images, missing sizes, unnecessary Client Components, unused dependencies, secrets, fake links and TODOs.

## Completion report

Report commands and audits with actual outcomes. Distinguish measured results from targets and state any environment limitation. Do not claim completion while a required check fails; fix it or identify the concrete blocker.
