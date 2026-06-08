# STATE - Ice & Instinct (auto-loaded at session start)

> Single source of truth for "where are we". Updated at the end of each session. Keep it SHORT.

**PROJECT:** Migrating iceinstinct.com (luxury mixology site, strict monochrome + champagne) from vanilla HTML to React. Full design rules: `CLAUDE.md`. Deep detail: `REACT-MIGRATION-HANDOFF.md`.

**BRANCH:** `react-shell` (work here). `main` = live vanilla, do NOT touch/deploy. **Nothing is deployed.**
**RUN:** `cd app && npm run dev` -> http://localhost:5173/  (React app in `app/`, Vite+React19+TS)

**MASTER PLAN = SOURCE OF TRUTH FOR WHAT IS LEFT:** `docs/superpowers/plans/2026-06-07-migration-master.md` -> read its **PROGRESS LOG** section FIRST. Owner rule (locked): defer NOTHING; resolve every workstream in order before cutover; execute via the subagent-driven-development skill; never push to main without owner ok.

**LAST SESSION ENDED (2026-06-07):** large session.
- Mobile luxury pass: 0 horizontal overflow at 320/360/390 (all routes); giant footer marquee; grand hero wordmark + tagline moved to bottom-right corner; ICE-CUBE nav mark site-wide (replaced hamburger/Index); founder photo/text gap fixed; ghost section-words become a marquee on phones; concierge photo icons (cigar/gloves/jigger/coupe); bigger tap targets; compact mobile nav menu; "Read in full" removed.
- MIGRATION (master plan) DONE so far: **S1 SEO/GEO** (build-time prerender of all 12 routes + per-page head/JSON-LD + robots/sitemap/llms/favicon/404), **S2 Inquiry** (dead Formspree form -> YouCanBook gateway https://enter-ritual.youcanbook.me/ ; real Instagram https://www.instagram.com/iceinstinctnyc/ ; public email REMOVED), **S3 deploy prep** (production `app/public/.htaccess` + CSP; GA4 `G-KBVETWTVVH` on all 12 - owner-confirmed his; deploy = Hostinger auto-pulls repo ROOT from GitHub), **S4 content fidelity** (copy matches old site, prices/specs exact; restored tier pull-quotes + Menu-Protocol sub-headlines; Privacy/Terms corrected to YouCanBook). Build is now `tsc && vite build && node scripts/prerender.mjs`.

**CONTINUE FROM (next session):** Owner wants a DETAILED content pass across the WHOLE site first (deeper than S4 fidelity - go page by page with him). THEN, per master-plan PROGRESS LOG: S5 media (replace placeholder media + the 2 leftover `framerusercontent.com` images; can generate via banana/imagen), S6 Palate Profiler finish, S9 Four Cities (my-story), S10 Gallery recipe drawer, S11 Duality (owner directs the portal), S7 full code review, S8 QA on a REAL device (browser tooling was flaky this session - do a real-device pass), then Stage 3 cutover (build dist -> repo root -> commit main with owner ok -> Hostinger pulls; rollback via `_legacy-vanilla/`).
PROCESS LOCK (Temo): do NOT hand-invent feature mechanics - pull the proven best-in-world pattern (design MCPs ui-ux-pro/Figma), copy it, brand-skin only. Design-first. Show on localhost; he judges only the real render.

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
- MEDIA (phase 2, IN PROGRESS, react-shell, NOT deployed). House style LOCKED = "NYC Speakeasy / Warm Ember" mega-realism via `img_gen.py --model nano-banana-pro-preview` (NOT Imagen, NOT "object in black void"). Full standard: docs/MEDIA-STYLE.md + memory project_ii_media_style. ALL generated media staged in `~/Desktop/Ice-Instinct-Media/` (also feeds Instagram; keep everything there).
  - DONE + on pages (committed): all 4 offering HERO = minimal cinemagraph videos (Veo i2v from loop-ready stills, ONE element drifts - vapor/mist/dry-ice, no hands; 9:16 cover). All 4 BRIDGE = atmospheric speakeasy stills. Homepage Tiers cards now use the 4 hero-loop stills, luxe B&W -> color on hover.
  - Cinemagraph rule (Temo): start from a STILL finished scene (no hands/action) so Veo only drifts the one element; absolute minimum motion, no time-lapse, locked camera.
  - STAGED, not placed: NYC-elite "at-home service" library (penthouse party / dinner / interior / coupes / homebar / accessories / Gotham-minimal / guest) in elite event-photo quality - destination TBD (BRIDGE per tier vs a new "The Experience" section vs gallery). Ingredient-allegory layer locked for Category-3 cocktail tiles (regenerate the "plastic" cocktails next).
  - STOPPED HERE: regenerating the HOME Founder image ("The Hand Behind the Ritual", section Founder, currently /assets/video/alchemist-loop). Reference frame = `~/Desktop/Ice-Instinct-Media/_ref-alchemist.png` (man waist-up from behind, NJ side, looking across Hudson at lower Manhattan, hand on sill with a WHITE Mezcal Negroni). Must be EXACT same composition (NOT full-body), just better quality + DARK realistic NYC night (not over-lit). Latest = `founder-real-v2.png` (dark) - awaiting Temo final approval; then animate minimal (only river + sparse lights) and place into section Founder. Earlier wrong takes: founder-loop.png (invented full-body), founder-real.png (too bright).
- PHASE-2 TAIL: confirm pricing/guests/hours vs originals; regenerate Temo's real cocktails as Category-3 tiles (ingredient allegory, B&W->color); then prerender + cutover.
- OFFERING PAGES STANDARDIZED (phase 1 DONE, commits up to 854c3e3, react-shell, NOT deployed). All 4 (omakase/foundation/simplicity/bespoke) now render the ONE approved design via a data-driven template:
  - `app/src/pages/OfferingPage.tsx` = template (hero cursor-light ghost, held-stage shimmer bridge, ledger tiers, IV/VI numbered timelines, V grid + champagne wave, VII notes, 70/30 closing marquee, rail + snap).
  - `app/src/pages/offerings/{types.ts,omakase,foundation,simplicity,bespoke}.tsx` = per-page content (full verbatim live copy). `Omakase/Foundation/Simplicity/Bespoke.tsx` = thin wrappers.
  - `app/src/styles/omakase.css` renamed -> `offering.css`, imported by all 4 main-*.tsx. `#included` + `#host-provides` carry viewport-compaction (5-step pages fit).
  - Verified: all sections fit one viewport, lenis/ether/marquee present, correct ghost per page, 0 console errors, `npm run build` emits all 4.
  - PHASE 2 (deferred per Temo): real per-page hero video + bridge photo (currently reuse Omakase placeholders); confirm pricing/guests/hours vs originals. Then prerender + cutover.
- scroll-snap = DONE (30ac661). useOmakaseSnap.ts = Lenis proximity Snap on 9 segments, pin-guard over .oma-hold, wide-only, RM off.
- closing segment = DONE (Temo approved): direction B "Kinetic Marquee". Top 70% = ORIGINAL Свет-1 framed CTA (restored 1:1), bottom 30% = champagne marquee 60% + centered footer links 40%. Eyebrows stay REMOVED. "New York Metropolitan Area" KEPT (not Manhattan). Mockups compare page at app/public/footer-redesign.html (A/C kept for history; remove before cutover).
- CONTENT FIDELITY = DONE (56aa5e5): full original live copy poured back into the new design (III tier Personnel/Focus, IV Ice Ritual verbatim + tag, V/VI full, VII 4 paragraphs). Source of truth for original copy = repo root offerings/omakase/index.html (live www URL 404'd this session; apex serves home). Some sections now grow past one viewport (min-height, no clip) - acceptable, content > strict 100svh.
- LOCKED decisions (Temo, this session): eyebrows removed; NY Metropolitan Area; closing B approved; champagne-gold haze (hue 84) on Standard Inclusions kept; tasting-spine rail (no tablets) kept.
- Regenerate real media (the one bridge photo + hero video) via banana/veo. Current media = placeholders.
- Then copy the whole Omakase structure to Foundation / Simplicity / Bespoke (same standard, different copy) - AND port real content per page (don't repeat the trim mistake).
- Temo's mood: wants me to COPY existing proven components, NOT invent. Show live (localhost), he sees only real render.
