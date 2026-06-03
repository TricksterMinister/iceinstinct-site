# STATE - Ice & Instinct (auto-loaded at session start)

> Single source of truth for "where are we". Updated at the end of each session. Keep it SHORT.

**PROJECT:** Migrating iceinstinct.com (luxury mixology site, strict monochrome + champagne) from vanilla HTML to React. Full design rules: `CLAUDE.md`. Deep detail: `REACT-MIGRATION-HANDOFF.md`.

**BRANCH:** `react-shell` (work here). `main` = live vanilla, do NOT touch/deploy. **Nothing is deployed.**
**RUN:** `cd app && npm run dev` -> http://localhost:5173/  (React app in `app/`, Vite+React19+TS)

**LAST SESSION ENDED (2026-06-03):**
- Phase 0 (React shell, full pixel parity, all 12 routes) = DONE + committed + pushed.
- Phase 1 Duality (homepage chapter 02 split) = PARKED. Temo dislikes the portal interaction; tried several versions + the orbis.restaurant split-worlds port, reverted to commit `c860959`. Do NOT re-touch the portal unprompted - he will re-direct.

**CONTINUE FROM:** Phase 2 = Palate Profiler (spec: `specs/2026-06-02-palate-profiler.md`). Build fallback-first (no Gemini key needed); plan: `plans/` (write one). Then Phase 3 Inquiry->YouCanBook.me, Phase 4 Four Cities, Phase 5 Gallery drawer, then prerender decision + cutover.

**LOCKS:** strict monochrome + single champagne accent; no blur/glass, no neon, no AI-looking imagery (hyperreal only), no em-dashes. (Note: CLAUDE.md commandment #1 still says "silver, no champagne" - that is STALE; champagne is the real accent per DESIGN.md.)
