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

---
## SESSION 2026-06-05 (Omakase page rebuild - PARTIAL, on react-shell, NOT deployed)
Last commit: 5bbbb3f. Page = /offerings/omakase/ (app/src/pages/Omakase.tsx + app/src/styles/omakase.css).

DONE (Omakase only, as the master template for the 4 offering pages):
- Hard rule: EVERY segment = exactly one viewport (100svh), clear champagne-hairline boundary, no overflow. Desktop-first but mobile must stay clean.
- ONE photo on the whole page = the "photo bridge" (no other photos; removed 3 cinematic reels). Hero media TBD (will regenerate).
- HERO: copied the Concierge 50/50 technique 1:1 (class `.concierge*`, tokens scoped in omakase.css). Text left, video fills right half full height. Ghost "OMAKASE" top-left. DO NOT reinvent - copy existing techniques (Concierge / home Founder "The Hand Behind the Ritual").
- II Menu Protocol = "HELD STAGE" pinned photo bridge (GSAP ScrollTrigger pin+scrub in Omakase.tsx). ONE whole photo, never cut (no seam). scrub:1.4 inertia, long dwell. Reduced-motion -> static fallback.
- Light/dark rhythm, each its own viewport: Hero(D) I Overview(D Monument, ghost word + gold shine on pull) II Bridge(D) III Scalability(L Ledger) IV Included(D panel grid) V Standard(D panel grid) VI Host(L panel grid) VII Notes(D Manifesto) CTA(L Свет-1 framed + footer = one viewport).
- ALL eyebrow kicker labels removed site-wide on this page (Temo hates them). Overview ghost removed; hero ghost kept.
- Components in omakase.css: .concierge (hero), .oma-hold (held stage), .oma-fmt3 (Monument), .oma-ledger (light), .oma-panel .dark/.light + .oma-grid, .oma-mani (manifesto), .closing/.closing-segment (Свет-1 CTA, copied from cinema.css).

OPEN / NEXT:
- scroll-snap ("shuffle scroll") = DONE (commit 30ac661, react-shell, NOT deployed). `app/src/app/useOmakaseSnap.ts` = Lenis smooth wheel + PROXIMITY Snap on the 9 viewport segments; suspends snap while `.oma-hold` is pinned (same guard as home over `.tiers`); wide-only, off under reduced-motion; exposes window.lenis. Verified headless: Lenis attaches, 9/9 segments, 0 console errors. AWAITING Temo feel-check at localhost.
- Regenerate real media (the one bridge photo + hero video) via banana/veo. Current media = placeholders.
- Then copy the whole Omakase structure to Foundation / Simplicity / Bespoke (same standard, different copy).
- Temo's mood: wants me to COPY existing proven components, NOT invent. Show live (localhost), he sees only real render.
