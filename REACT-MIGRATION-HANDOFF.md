# React Migration - Handoff

**Date:** 2026-06-03
**Branch:** `react-shell` (pushed to origin). **Live site = `main` (vanilla), UNTOUCHED. Nothing deployed.**
**App lives in:** `app/` (Vite + React 19 + TS). Run: `cd app && npm run dev` -> http://localhost:5173/
**Specs:** `specs/2026-06-02-*.md` (shell, duality, palate-profiler, four-cities, gallery-recipe-drawer)
**Plans:** `plans/2026-06-02-phase0-react-shell.md`, `plans/2026-06-02-phase1-duality.md`

## Done
- **Phase 0 - React shell migration (COMPLETE, parity-verified).** Whole site rebuilt on React, pixel-identical to vanilla, MPA static build, deploys via Hostinger-serves-repo-as-is (build output committed to root at cutover - NOT done yet). All 12 routes (home + 11 deep pages) ported 1:1; CSS byte-identical; GSAP/Lenis cinema scroll ported to hooks; deep-page chrome (cinema-chrome + script.js + my-story.js) in hooks; white-flash fix (inline dark bg). Code-reviewed, GSAP-cleanup fixed, motion dedupe + optimizeDeps fix (react+motion co-bundle).
- **Phase 1 - Duality (PARKED, not final).** Chapter 02 (`#manifesto`) replaced with interactive Ice/Instinct split. Current state = commit `c860959`: centered "ICE & Instinct" wordmark, panels expand 65/35 on hover, restrained diverging title, champagne laser divider, ice/ember hyperreal walls (`assets/photos/duality-ice.jpg`, `duality-fire.jpg`), per-side caption reveal. Funnel store at `app/src/app/funnelStore.ts` (temperament).
  - **Temo is NOT satisfied with the portal interaction.** He wants the orbis.restaurant `split-worlds` feel (he'll re-direct). Reference: https://orbis.restaurant/ bottom section (`.split-worlds`, "Enter Business / Enter Personal") - flex 0.9s easeOutExpo expand, two full editorial worlds. Tried a faithful port (commit `43353a3`) - he rejected, reverted one step. **He said he'll figure out the portal himself; do not re-attempt unprompted.**

## Next (per roadmap)
1. **Phase 2 - Palate Profiler** (spec ready). Build fallback-first (no Gemini key needed); Gemini via external serverless proxy later (Hostinger is static). Wire Duality commit -> Profiler (temperament seed). Includes take-home card (PDF + share image).
2. Phase 3 - Inquiry = branded gateway to existing YouCanBook.me (`https://enter-ritual.youcanbook.me/`), no custom backend.
3. Phase 4 - Four Cities journey (my-story) - port orbis-style horizontal travel + our cities.
4. Phase 5 - Gallery recipe drawer (extensible, data-driven N cocktails).
5. **Pre-launch:** decide prerender/SSG (vite-react-ssg) for body-text SEO/GEO (build currently ships empty SPA root body; heads are static). THEN cutover: build output -> repo root, legacy vanilla -> `_legacy-vanilla/`, merge to main -> Hostinger publishes.

## Brand locks (DESIGN.md)
Strict monochrome + single champagne accent (`/accent.css`). NO blur/glassmorphism, no neon, no AI-looking imagery (hyperreal/photo-art only). Real assets, never stock. Em-dashes forbidden.
