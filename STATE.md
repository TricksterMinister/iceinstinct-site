# STATE - Ice & Instinct (auto-loaded at session start)

> Single source of truth for "where are we". Updated at the end of each session. Keep it SHORT.

**PROJECT:** Migrating iceinstinct.com (luxury mixology site, strict monochrome + champagne) from vanilla HTML to React. Full design rules: `CLAUDE.md`. Deep detail: `REACT-MIGRATION-HANDOFF.md`.

**BRANCH:** `react-shell` (work here). `main` = live vanilla, do NOT touch/deploy. **Nothing is deployed.**
**RUN:** `cd app && npm run dev` -> http://localhost:5173/  (React app in `app/`, Vite+React19+TS)

**LAST SESSION ENDED (2026-06-03):**
- Phase 0 (React shell, full pixel parity, all 12 routes) = DONE + committed + pushed.
- Phase 1 Duality (homepage chapter 02 split) = PARKED. Temo dislikes the portal interaction; tried several versions + the orbis.restaurant split-worlds port, reverted to commit `c860959`. Do NOT re-touch the portal unprompted - he will re-direct.

**CONTINUE FROM:** Phase 2 = Palate Profiler. **PLACE (Temo, locked, do NOT re-guess): the Collection / gallery page (`/gallery/`, GalleryPage.tsx) - NOT home, NOT Duality, NOT Concierge.** It makes the Collection page useful instead of duplicating home: guest composes their own "13th" signature there. Built fallback-first (no Gemini key). Full-screen one-question-per-screen overlay + invitation band (`.pp-band`) between the 12-tile track and final-cta. Files: `features/Profiler/PalateProfiler.tsx`, `profilerData.ts`, `styles/profiler.css` (uses styles.css tokens = the Collection page's system). Commission -> /contact stub (real Inquiry = Phase 3). STILL fallback-only + uncommitted, awaiting Temo review.
PROCESS LOCK (Temo): do NOT hand-invent mechanics - pull the proven best-in-world pattern via design MCPs (ui-ux-pro #27, Figma), copy it, only brand-skin. Design-first.
Then Phase 3 Inquiry->YouCanBook.me, Phase 4 Four Cities, Phase 5 Gallery recipe-drawer (click a tile -> full recipe card, same card language as profiler result), then prerender + cutover.

**LOCKS:** strict monochrome + single champagne accent; no blur/glass, no neon, no AI-looking imagery (hyperreal only), no em-dashes. (Note: CLAUDE.md commandment #1 still says "silver, no champagne" - that is STALE; champagne is the real accent per DESIGN.md.)
