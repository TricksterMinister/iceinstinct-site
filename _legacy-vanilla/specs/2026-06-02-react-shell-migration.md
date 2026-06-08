# Spec - React Shell & Migration (Foundation, Phase 0)

**Date:** 2026-06-02
**Status:** Locked for build (pending Temo review)
**Where it lives:** The whole site. This is the foundation every feature spec sits on.
**Depends on nothing. Everything else depends on this.**

---

## Problem Statement

The current iceinstinct.com is hand-written vanilla HTML/CSS/JS (13 pages, GSAP/ScrollTrigger/Lenis cinema scroll). The planned features (Duality, Palate Profiler, Inquiry, Four Cities, Gallery drawer) need component state, overlays, and shared data that vanilla cannot carry cleanly. We must move to React **without changing how the site looks or how it deploys**, then build features on top.

## Goals

1. **Pixel-identical visual parity** - the React site looks and animates exactly like the current one. Nothing visible changes at launch of Phase 0.
2. **Same lightweight deploy** - keep the current flow: push to GitHub -> Hostinger pulls -> publishes, on the existing domain `www.iceinstinct.com`. Static output, no new infra required.
3. **A clean foundation** - providers (scroll/cursor), portals (overlays), and a shared data layer so the 4 feature specs drop in without rework.
4. **No SEO regression** - every page stays crawlable static HTML (luxury + GEO matter).
5. **Zero-risk cutover** - build in parallel; the live site keeps running until the React build reaches parity, then swap.

## Non-Goals

- **No redesign.** Visual, copy, fonts, colours, layout, the cigar/alchemist video segments, the new Closing CTA - all preserved 1:1. (Look is sacred.)
- **No new backend at the host.** Hostinger serves static files; we do not introduce a server there. (Gemini live AI, if added, runs on a separate free function - see Profiler spec.)
- **No booking rebuild.** Booking stays on the existing YouCanBook.me (`enter-ritual.youcanbook.me`); Inquiry is a branded gateway to it, not a custom form/backend.
- **No framework beyond what's needed.** Vite + React + the two animation libs. No Next/Remix server runtime (would break static-on-Hostinger simplicity).

## Approach

### Stack
- **Vite + React 19 + TypeScript.**
- **GSAP + ScrollTrigger + Lenis** for the existing cinema scroll (pin, scrub, ghost-words, tier-rail, reveals) - ported 1:1 from `cinema.js` into React hooks. This is the right tool; not rewritten in Motion.
- **Motion (framer)** for new component interactions (Duality, Profiler, Inquiry, Gallery drawer).
- **CSS ported as-is:** `accent.css`, `cinema/cinema.css`, `styles.css`, `footer.css` move over unchanged; components render the **same DOM and class names** -> guarantees pixel parity.

### Output format (critical for static Hostinger + SEO)
- **Multi-page static build (Vite MPA):** one HTML entry per route (`/`, `/offerings/`, `/offerings/foundation/`, ... `/concierge/`, `/my-story/`, `/gallery/`, `/contact/`, `/privacy/`, `/terms/`, `/thanks/`). Each builds to static HTML + shared JS/CSS chunks.
- Rationale: keeps real crawlable pages (SEO/GEO) and matches the current URL structure exactly; avoids SPA-routing rewrite fragility on static hosting. React hydrates interactivity per page.

### Deploy (RESOLVED)
- **Determined from the existing setup:** the current repo has no `package.json`, no build config, no CI - just static HTML at the repo root - and it is live on the domain. Therefore **Hostinger serves the repo files as-is (no build step).**
- **Decision:** we build React ourselves and commit the **built static output to what Hostinger serves** (repo root / the served branch). Same push-to-GitHub -> Hostinger-publishes flow as today; nothing new on Hostinger, no action required from Temo.
- Implementation: either (a) build locally and commit the static output, or (b) a GitHub Action runs `vite build` and publishes the output to the served location. Lean (b) once stable; (a) is fine to start.
- Keep the React **source** in a `src/` (and `/app/build` tooling) that is NOT what Hostinger serves; only the built static output sits at the served root. Avoids shipping source to production.
- Domain unchanged: `www.iceinstinct.com`.

### Architecture
```
src/
  app/        providers: Lenis + ScrollTrigger, custom cursor, pager, grain; portal root for overlays; shared funnel/store (temperament, created cocktail, chosen gallery item)
  pages/      one entry per route (mirrors current site map)
  sections/   Hero, Manifesto/Duality, Tiers, Concierge, Founder, Gallery, Closing (the homepage chapters) - our visual, 1:1
  features/   PalateProfiler, InquiryGateway, GalleryDrawer, FourCitiesJourney (the ported/new interactives)
  data/       cocktails list (extensible), tiers, copy
  styles/     ported CSS (unchanged)
  lib/        gemini client (fallback now; proxy later), ycbm link builder
```

### Migration strategy (zero-risk)
- Build the React app in parallel (branch/subfolder). Current vanilla files stay as the live reference.
- Port page by page to parity; verify each against the live page (visual diff).
- Cut over only when the homepage + all deep pages match. One swap, on the existing deploy flow.

## Requirements

### Must-Have (P0)
- **R1 Vite + React 19 + TS project** with GSAP/ScrollTrigger/Lenis + Motion installed and a working dev server. AC: `npm run dev` and `npm run build` succeed; `tsc --noEmit` clean.
- **R2 CSS ported 1:1.** AC: all four stylesheets load; computed styles match current site.
- **R3 Cinema scroll ported to hooks** (Lenis + ScrollTrigger provider; pins, scrub, ghost-word parallax, tier-rail, reveals). AC: homepage scroll behaves identically to current (pin/scrub timings, pager active states).
- **R4 All routes as static pages** matching the current sitemap + URLs. AC: each current URL resolves to an equivalent static page; no broken links; sitemap/robots preserved.
- **R5 Pixel parity** homepage + 11 deep pages vs live. AC: side-by-side screenshots match (hero, chapters, tier images, concierge + alchemist video segments, gallery, closing CTA, footer).
- **R6 Overlay portal + shared store** ready for features (temperament, created cocktail, selected gallery cocktail, active overlay). AC: a portal renders above the scroll layer; store is consumable by feature components.
- **R7 Static build deploys on Hostinger** via the existing GitHub flow on `www.iceinstinct.com`. Hostinger serves repo files as-is (confirmed), so the built static output is committed to the served root. AC: a built version serves correctly from Hostinger with working assets, routes, videos, fonts.
- **R8 No SEO regression.** AC: each page keeps its `<title>`, meta, canonical, JSON-LD, og tags; pages are static HTML (view-source shows content, not an empty SPA root).

### Nice-to-Have (P1)
- `useGSAP` hook wrapper + a shared `<Reveal>` component to standardize entrance animations.
- A visual-regression check (screenshot diff) script to guard parity during the port.
- Code-split per route to keep each page light.

### Future (P2)
- Optional CI (GitHub Action) that builds and publishes automatically.
- Shared design-token TS module mirroring `/accent.css`.

## Success Metrics
- **Parity:** 0 visible differences vs current site at cutover (screenshot diff + manual review).
- **Performance:** Lighthouse >= current scores; no scroll jank (60fps; no long frames > 50ms on the cinema scroll).
- **Deploy:** one successful Hostinger publish of the React build on the live domain.
- **Foundation readiness:** Duality can be added touching only `sections/` + `features/` + `data/`, no shell rework.

## Open Questions
- **(Eng, non-blocking)** MPA (Vite multi-page) vs a static-site-generator approach (e.g. vite-react-ssg) for shared layout ergonomics. Lean: plain Vite MPA for v1 simplicity; revisit if layout duplication hurts.

(Deploy mechanism resolved - see Deploy section. No external/Temo action required.)

## Timeline / Phasing
- **This is Phase 0** - must land (parity + deploy) before any feature.
- Then per-feature phases on top: Duality -> Palate Profiler (fallback first) -> Inquiry gateway (YCBM) -> Four Cities -> Gallery drawer. Each its own plan slice, each verifiable.
