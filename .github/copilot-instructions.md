# Copilot instructions for this repo

This repo is a Next.js (App Router) + TypeScript app using Tailwind CSS v4, GSAP (ScrollTrigger/ScrollSmoother), and Sanity CMS.

## Stack quick facts

- Framework: Next.js App Router (files in `src/app`), TypeScript
- Styling: Tailwind CSS v4 via `@import "tailwindcss"` in `src/app/globals.css`
- Animations: GSAP (ScrollTrigger, ScrollSmoother)
- CMS: Sanity (`src/sanity/sanity-queries.ts`)

## Tailwind v4

- Ensure the CSS that contains `@import "tailwindcss"` is imported by the layout for the active segment (e.g., `src/app/(site)/layout.tsx` imports `./globals.css`).
- This repo uses the zero-config PostCSS plugin `@tailwindcss/postcss` in `postcss.config.mjs`, which auto-loads `tailwind.config.ts`.
- If you need to override the config path, switch to explicit config: `tailwindcss: { config: './tailwind.config.ts' }`.
- `tailwind.config.ts`: include `content` globs for `./src/**` and any custom theme tokens used.
- You may use `@config "../../tailwind.config.ts";` in CSS, but prefer PostCSS config for stability.
- Media queries must be valid CSS (no expressions inside property values). Example: `@media (min-width: 768px) { ... }`.

## GSAP usage

- Always register where used: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)`.
- Clean up on unmount:
   - `ScrollSmoother.get()?.kill()`
   - `ScrollTrigger.killAll()` (or track and `instance.kill()` selectively)
- Horizontal scroll behavior: attach `wheel` listeners only to the panels container, not `window`. Use `{ passive: false }` and remove in cleanup.
- Avoid leaving global styles/listeners on `<body>`/`<html>`.

## Scrolling & routing

- Next preserves scroll by default. Pages that should start at top should do: `const p = usePathname(); useEffect(() => window.scrollTo(0,0), [p]);`
- When using transitions, make sure overlays do not block pointer events. Verify `z-index`, `pointer-events`, and opacity are set to allow interaction.

## Components & patterns

- `ProjectCard` variants: keep a minimum width for `page` variant to avoid collapse in narrow contexts.
- Scrollable asides (project menu): `position: fixed; top: <header>; bottom: 0; width: 150px; overflow-y-auto;` and ensure no overlay sits above it.
- Canvas backgrounds: set canvas width/height to devicePixelRatio-scaled bounding rect; add resize listener; cancel RAF on unmount.

## Sanity

- Reuse the query functions in `src/sanity/sanity-queries.ts`. Treat CMS fields as nullable and guard with `notFound()` as needed.

## Next.js conventions

- Nested segment layouts must not include `<html>`/`<body>`—only the root layout should.
- Dynamic routes that are statically pre-rendered should export `generateStaticParams()` and return plain `{ param: value }` objects.

## Code style & safety

- Prefer precise TypeScript types; avoid `any`.
- Include cleanups for listeners, timeouts, intervals, and animation frames.
- Keep changes small and avoid breaking component APIs without updating all usages.

## Ask Copilot effectively

Include in your prompt:

- What file(s) to modify and why
- Constraints (perf, a11y, bundle size)
- Acceptance criteria (what “done” means)

Expect Copilot to:

- Wire imports/exports and clean up side effects
- Validate Tailwind v4 setup (content globs or PostCSS) when adding classes
- Add minimal tests or runtime checks if feasible

## Do / Don’t

Do:

- Use `overflow-y-auto` and proper fixed bounds for scrollable asides
- Use `useLayoutEffect` for layout-dependent GSAP work
- Kill GSAP instances and remove listeners on unmount

Don’t:

- Attach wheel listeners to `window` for horizontal scrolling
- Leave `opacity: 0` overlays or `pointer-events: none` blocking interaction
- Put media-query-like expressions into CSS property values

## Commit/PR notes

- Keep commit messages concise and imperative. Note any Tailwind config or GSAP lifecycle changes.

If Tailwind classes don’t apply, first verify the correct `globals.css` is imported by the active layout, and that PostCSS loads Tailwind with the expected `tailwind.config.js` path.
