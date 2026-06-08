# Ice & Instinct - Open Tasks Master Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every open workstream carried over from prior sessions - the React-migration backlog (S5-S11, S7, S8), the live work-in-progress placeholders (cocktails, founder, per-page content), and the marketing/lead-gen pivot - in one ordered plan.

**Architecture:** Site is React 19 + Vite + TS in `app/`, prerendered to static HTML at build (`tsc && vite build && node scripts/prerender.mjs`), served from repo ROOT on `main`. `main` is LIVE: a GitHub webhook auto-deploys to Hostinger on every push. Day-to-day work stays on `react-shell`; cutover to live = build dist -> repo root -> push main with owner ok. Design-dependent features go through a brainstorm gate first (owner directive: copy proven patterns, do not invent).

**Tech Stack:** React 19, Vite, TypeScript, GSAP/ScrollTrigger, Lenis, vanilla CSS (per-page files in `app/src/styles/`), build-time prerender (`scripts/prerender.mjs`), Hostinger git-auto-deploy, GA4. Media generation: `~/.claude/skills/video/scripts/` (imagen_gen.py / img_gen.py nano-banana / veo_hero.py).

**Process locks (owner, do not violate):**
- Defer NOTHING. Resolve workstreams in order.
- Do NOT hand-invent feature mechanics. Pull the proven best-in-world pattern (ui-ux-pro / Figma MCP), copy, brand-skin only. Design-first.
- Owner judges only the LIVE render on the real domain, never local. Show on localhost during build; verify on iceinstinct.com after deploy.
- NEVER push to main without owner ok (= instant live).
- Strict monochrome + single champagne accent. No blur/glass, no neon, no AI-looking imagery (hyperreal only). No em-dashes / en-dashes anywhere (hook blocks them).
- No fake reviews, ever (FTC + ban risk).

**Build/run:** `cd app && npm run dev` -> http://localhost:5173/ | `cd app && npm run build` (prerender all 12 routes).

---

## Sequencing Overview

The owner will name the FIRST task at runtime; this plan is the backlog, not a fixed start order. Default order if unspecified:

```
PHASE A - LIVE WIP (each push auto-deploys; smallest blast radius first)
   A1 Per-page content pass (page by page WITH owner)
   A2 5 cocktail recipes + images
   A3 Founder image/video final
PHASE B - MIGRATION FEATURES (brainstorm-gated)
   B1 S5 Media finalization
   B2 S6 Palate Profiler
   B3 S9 Four Cities
   B4 S10 Gallery recipe drawer
   B5 S11 Duality (home ch.02)
PHASE C - HARDENING
   C1 S7 Code review backlog (a-e)
   C2 S8 QA on real devices
PHASE D - MARKETING / LEAD-GEN
   D1 Offer-v2 pricing verify + deploy
   D2 Trust + distribution (off-site, owner side; on-site sameAs wiring my side)
```

GATES: B may proceed per-feature once its brainstorm is owner-approved. C2 (QA) runs after C1 + all visible WIP closed. D runs in parallel where it does not touch in-flight code.

---

## File Structure (what gets touched)

- `app/src/pages/*` - route components (Contact, Concierge, Gallery, MyStory, offerings/*, Privacy, Terms, Home sections).
- `app/src/pages/offerings/{types.ts,omakase,foundation,simplicity,bespoke}.tsx` - data-driven offering content.
- `app/src/styles/*.css` - per-page styles (offering.css, cinema.css, footer.css, cinema-chrome.css, ethereal/EtherealShadow).
- `app/src/components/EtherealShadow.tsx` - the 2 framer-hosted images live here (S5 + S7a overlap).
- `app/public/.htaccess`, `app/public/{robots.txt,sitemap.xml,llms.txt,favicon.svg,404.html}` - crawler/deploy files.
- `scripts/prerender.mjs` - build-time prerender + per-page head/JSON-LD.
- Data files for cocktails (Gallery recipe source) - locate or create under `app/src/data/` or `app/src/pages/offerings/`.
- `~/Desktop/Ice-Instinct-Media/` - all generated media staging (also feeds Instagram).
- `STATE.md`, this plan's PROGRESS LOG, and `docs/superpowers/plans/2026-06-07-migration-master.md` PROGRESS LOG - update as tasks close.

---

## PHASE A - LIVE WORK-IN-PROGRESS

> These are visible on the live site NOW. Each push auto-deploys. Build + push only with owner ok. Verify on real domain after.

### Task A1: Per-page content pass (page by page, WITH owner)

**Files (read first, edit per owner direction):**
- Modify: `app/src/pages/Offerings.tsx` (hub) or equivalent offerings index
- Modify: `app/src/pages/offerings/{omakase,foundation,simplicity,bespoke}.tsx` (4 tiers)
- Modify: `app/src/pages/Concierge.tsx`
- Modify: `app/src/pages/Contact.tsx`
- Modify: `app/src/pages/Privacy.tsx`, `app/src/pages/Terms.tsx`

- [ ] **Step 1: Inventory current copy per page.** For each file above, read it and produce a short copy-map (section -> current text). Source of truth for original wording = `_legacy-vanilla/` HTML + owner live input.
- [ ] **Step 2: Owner walkthrough.** Go page by page with owner; capture exact replacement copy per section. Do NOT invent marketing copy unilaterally.
- [ ] **Step 3: Apply edits one page at a time.** Replace copy verbatim from owner. No em-dashes/en-dashes (hook blocks). Keep prices/specs exact.
- [ ] **Step 4: Verify on localhost.** `cd app && npm run dev`; owner reviews each page render.
- [ ] **Step 5: Build + prerender.** `cd app && npm run build`; confirm 0 errors, route bodies still > 300 chars text.
- [ ] **Step 6: Commit per page or per batch owner approves.**

```bash
git add app/src/pages/<page>.tsx
git commit -m "content: <page> copy pass per owner"
```

- [ ] **Step 7: Deploy (owner ok only).** Put dist at repo root, push main; verify on https://www.iceinstinct.com (clear Hostinger cache if stale).

**Acceptance:** owner signs off each page's copy on the LIVE render.

### Task A2: Five cocktail recipes + images

Cocktails still placeholder: White Lotus, Black Truffle Martini, Aureliano, Basil in my mind, Call Me By Your Name. Note: green-basil image currently = "Call Me By Your Name"; "Basil in my mind" tile shows TEMP peach `call-me-v2.png` needing a real photo + recipe.

**Files:**
- Locate: cocktail data source (Gallery tiles + recipe content). Grep for `call-me-v2`, `White Lotus`, `Aureliano` to find the data file.
- Modify: that data file (recipe name, ingredients, method, image path).
- Add media: `~/Desktop/Ice-Instinct-Media/` -> copy into `app/public/assets/...`.

- [ ] **Step 1: Locate data source.** `grep -rn "Aureliano\|White Lotus\|call-me-v2" app/src` to find the cocktail data + image wiring.
- [ ] **Step 2: Collect real recipes from owner.** 5 recipes: exact name, ingredients, spec, method, story line. Owner-supplied; do not invent.
- [ ] **Step 3: Generate/select images.** House style LOCKED = "NYC Speakeasy / Warm Ember" mega-realism via `img_gen.py --model nano-banana-pro-preview` (NOT Imagen, NOT object-in-void). Category-3 ingredient-allegory, B&W -> color on hover. Standard: `docs/MEDIA-STYLE.md`. Stage in `~/Desktop/Ice-Instinct-Media/`.
- [ ] **Step 4: Fix the mismatch.** Reassign green-basil image to its correct recipe; give "Basil in my mind" its real photo (replace `call-me-v2.png`).
- [ ] **Step 5: Wire data + images into tiles.** Update data file paths; copy final assets into `app/public/`.
- [ ] **Step 6: Verify on localhost** (tile + hover + drawer once A/B10 done; until then tile + image).
- [ ] **Step 7: Build, commit, deploy (owner ok), verify live.**

```bash
git add app/src/data/<cocktails> app/public/assets/<imgs>
git commit -m "content: real recipes + imagery for 5 cocktails"
```

**Acceptance:** all 5 tiles show real recipe + final monochrome-compliant image; no peach placeholder; image-to-name mapping correct on LIVE.

### Task A3: Founder image/video final ("The Hand Behind the Ritual")

Currently temp `founder-v6b.png`. Owner rejected v3..v6 - wants Netflix-real, NOT AI/grain/plastic. Reference composition = `~/Desktop/Ice-Instinct-Media/_ref-alchemist.png` (man waist-up from behind, NJ side, hand on sill, WHITE Mezcal Negroni, looking across Hudson at lower Manhattan). EXACT same composition, better quality, DARK realistic NYC night (not over-lit).

**Files:**
- Modify: Home founder section component (grep `founder-v6b` / `alchemist-loop`).
- Add media: founder still + optional minimal Veo loop into `app/public/assets/video/` or `/assets/`.

- [ ] **Step 1: Locate placement.** `grep -rn "founder-v6b\|alchemist-loop" app/src`.
- [ ] **Step 2: Generate candidates.** `img_gen.py --model nano-banana-pro-preview --ref ~/Desktop/Ice-Instinct-Media/_ref-alchemist.png --prompt "..."`. Hold composition; push realism + dark night. Stage in `~/Desktop/Ice-Instinct-Media/`.
- [ ] **Step 3: Owner picks the still.** Show candidates; iterate until approved (this has been the blocker - do not place until owner says yes).
- [ ] **Step 4: (Optional) animate minimal.** `veo_hero.py i2v --yes --start <still>.png` - only river + sparse lights drift, locked camera, no hands/action. Owner approves.
- [ ] **Step 5: Place into founder section, verify localhost.**
- [ ] **Step 6: Build, commit, deploy (owner ok), verify live.**

```bash
git add app/public/assets/<founder-final> app/src/<founder-section>
git commit -m "media: final founder image for The Hand Behind the Ritual"
```

**Acceptance:** owner approves the founder image (and loop if used) on the LIVE render; no temp asset remains.

---

## PHASE B - MIGRATION FEATURES (brainstorm-gated)

> Each feature: brainstorm FIRST (copy a proven pattern via ui-ux-pro/Figma MCP, owner directs feel), write a sub-plan, then build. No invented mechanics.

### Task B1: S5 - Media finalization

**Files:**
- Modify: `app/src/components/EtherealShadow.tsx` (2 leftover `framerusercontent.com` images).
- Modify: CSP in `app/public/.htaccess` (drop framer img-src once self-hosted).
- Add media: self-hosted replacements in `app/public/assets/`.
- Sweep: any remaining placeholder media on launch routes.

- [ ] **Step 1: Find all placeholder/remote media.** `grep -rn "framerusercontent" app/src app/public` + audit each route's media against final-asset list.
- [ ] **Step 2: Generate/self-host replacements** (house style locked; banana/imagen/veo).
- [ ] **Step 3: Swap references; remove framer from CSP img-src** in `.htaccess`.
- [ ] **Step 4: Verify localhost (no remote loads), build, commit, deploy (owner ok), verify live.**

```bash
git add app/src/components/EtherealShadow.tsx app/public/.htaccess app/public/assets/<imgs>
git commit -m "media(S5): self-host framer images, finalize placeholder media"
```

**Acceptance:** every visible image/video is final, monochrome-compliant, weight-optimized; zero `framerusercontent.com`; CSP no longer allows it.

### Task B2: S6 - Palate Profiler finalization

Currently fallback-only. Decision needed: live Gemini-via-serverless vs polished standalone fallback.

- [ ] **Step 1: Brainstorm (REQUIRED SUB-SKILL superpowers:brainstorming).** Owner decides: live Gemini (needs serverless endpoint - Hostinger constraints) vs a polished deterministic fallback that stands on its own. Pull a proven quiz/profiler interaction pattern (ui-ux-pro).
- [ ] **Step 2: Write sub-plan** `docs/superpowers/plans/2026-06-XX-s6-profiler.md` (TDD where logic exists).
- [ ] **Step 3: Build per sub-plan.**
- [ ] **Step 4: Verify end-to-end on mobile + desktop, build, commit, deploy (owner ok), verify live.**

**Acceptance:** profiler works end-to-end on mobile + desktop; owner approves the result card language.

### Task B3: S9 - Four Cities journey (my-story)

- [ ] **Step 1: Brainstorm (owner directs the journey feel); copy a proven scroll-journey pattern.**
- [ ] **Step 2: Sub-plan** `docs/superpowers/plans/2026-06-XX-s9-four-cities.md`.
- [ ] **Step 3: Build; verify mobile + desktop; brand-compliant.**
- [ ] **Step 4: Build, commit, deploy (owner ok), verify live.**

**Acceptance:** Four Cities journey works on mobile + desktop, brand-compliant, owner-approved.

### Task B4: S10 - Gallery recipe drawer

Click a cocktail tile -> full recipe card. Data-driven, N cocktails. Same card language as the profiler result (B2).

- [ ] **Step 1: Brainstorm; copy a proven drawer/detail pattern.** Reuse profiler result card language for consistency.
- [ ] **Step 2: Sub-plan** `docs/superpowers/plans/2026-06-XX-s10-gallery-drawer.md`. Define the cocktail data shape ONCE (shared with A2).
- [ ] **Step 3: Build (data-driven so adding a cocktail = data only).**
- [ ] **Step 4: Verify every tile opens its recipe; build, commit, deploy (owner ok), verify live.**

**Acceptance:** every tile opens its recipe drawer; same card language as profiler; data-driven.

### Task B5: S11 - Duality (home chapter 02)

Parked home Duality section. Owner directs the portal feel.

- [ ] **Step 1: Brainstorm (owner directs the portal interaction); copy a proven pattern, brand-skin only.**
- [ ] **Step 2: Sub-plan** `docs/superpowers/plans/2026-06-XX-s11-duality.md`.
- [ ] **Step 3: Build; mobile + desktop clean.**
- [ ] **Step 4: Build, commit, deploy (owner ok), verify live.**

**Acceptance:** owner approves the interaction; mobile + desktop clean.

---

## PHASE C - HARDENING

### Task C1: S7 - Code review backlog

Run `/code-review` (+ `/cso` security pass) over whole `react-shell` diff vs `main`; fix all critical/high. Known non-blocking backlog to clear here:

**Files + fixes:**
- (a) `app/src/components/EtherealShadow.tsx` - self-host the 2 framer images + drop from CSP img-src. (OVERLAPS B1 - if B1 done, mark a) closed.)
- (b) Move inline `gtag('config')` into a Vite-bundled file; remove `script-src 'unsafe-inline'` from CSP in `app/public/.htaccess`.
- (c) Remove dead `.footer` CSS rules in `app/src/styles/footer.css` (old Footer.tsx deleted).
- (d) Scope `app/src/styles/cinema-chrome.css` `html{scroll-snap-type:y proximity}` to `body.cinema-chrome.vp-split` (currently global; desktop gallery/contact get unintended proximity snap).
- (e) Re-glance `scripts/prerender.mjs` head-regex hardening.

- [ ] **Step 1: Run `/code-review` over branch diff; triage findings by severity.**
- [ ] **Step 2: Fix (a)-(e) + any new critical/high.** One commit per fix.
- [ ] **Step 3: Run `/cso` security pass; fix critical/high.**
- [ ] **Step 4: Re-review; confirm zero open critical/high. Build clean.**

```bash
git add <files>
git commit -m "fix(S7): <specific finding>"
```

**Acceptance:** zero open critical/high; CSP no longer needs `unsafe-inline`; dead CSS gone; snap scoped.

### Task C2: S8 - QA on real devices

Runs after C1 + all visible WIP (Phase A) closed.

- [ ] **Step 1: Real-device pass.** iPhone + Android + desktop Chrome/Safari/Firefox: click every route, open menu, submit a test inquiry (YouCanBook flow), scroll every section, rotate.
- [ ] **Step 2: Verify items screenshots could not confirm before:** hero tagline legibility over video, footer proportion, menu overlay, offering closing, concierge icons, scroll smoothness (the parked Lenis+ScrollTrigger jank question).
- [ ] **Step 3: Core Web Vitals (LCP/INP/CLS) on throttled mobile profile.** Use chrome-devtools MCP lighthouse + real device.
- [ ] **Step 4: File + fix any blocker; re-verify on LIVE.**

**Acceptance:** no functional/visual blocker on any target; CWV in "good" range; scroll-jank question resolved.

---

## PHASE D - MARKETING / LEAD-GEN

> Pivot decisions LOCKED with owner (2026-06-08): HYBRID positioning (luxury storefront + GBP + reviews + 1-2 marketplaces); FOUNDER+TEAM ("led by one alchemist, carried by a team of trusted NY bartenders"); prices NOT down (fix signal, not level); no fake reviews ever. Root cause of zero leads in a year = TRUST + DISTRIBUTION, not discovery, not price.

### Task D1: Offer-v2 pricing verify + deploy

Offer-v2 pricing was committed prior session (Foundation $650/up-to-15, Simplicity $900, Bespoke $1800/up-to). ACTIVE-STATE note was truncated - confirm whether deployed.

- [ ] **Step 1: Confirm current live pricing** vs offer-v2 on https://www.iceinstinct.com (and in `app/src/pages/offerings/*`).
- [ ] **Step 2: If not live, build + deploy (owner ok); if live, mark closed.**
- [ ] **Step 3: Verify on real domain.**

**Acceptance:** offer-v2 pricing live and consistent across all tier pages + any pricing copy.

### Task D2: Trust + distribution wiring

Off-site authority is owner-side (Temo); on-site wiring is mine.

- [ ] **Step 1: (Owner side) GBP, Google Search Console + Bing Webmaster (submit sitemap), Crunchbase, LinkedIn company, Wikidata, directories, real Google reviews via hosted events.** Track which entity URLs exist.
- [ ] **Step 2: (My side) When entity URLs exist, wire into Organization JSON-LD `sameAs`** in `scripts/prerender.mjs` (home Organization block).
- [ ] **Step 3: Add Review schema only for REAL reviews** (never fabricate).
- [ ] **Step 4: Build, commit, deploy (owner ok), verify live + validate structured data.**

```bash
git add scripts/prerender.mjs
git commit -m "seo: wire real entity URLs into Organization sameAs"
```

**Acceptance:** Organization `sameAs` lists real owned profiles; any Review schema backed by real reviews; structured data validates.

---

## PROGRESS LOG (live - update each session)

- [ ] A1 Per-page content pass
- [ ] A2 Five cocktail recipes + images
- [ ] A3 Founder image/video final
- [ ] B1 S5 Media finalization
- [ ] B2 S6 Palate Profiler
- [ ] B3 S9 Four Cities
- [ ] B4 S10 Gallery recipe drawer
- [ ] B5 S11 Duality
- [ ] C1 S7 Code review backlog (a-e + new)
- [ ] C2 S8 QA on real devices
- [ ] D1 Offer-v2 pricing verify + deploy
- [ ] D2 Trust + distribution wiring

> Mirror closures into `docs/superpowers/plans/2026-06-07-migration-master.md` PROGRESS LOG and `STATE.md`.

---

## Self-Review (done at authoring)

- **Coverage:** every open item from STATE.md WIP (cocktails, founder, per-page content), master-plan PROGRESS LOG (S5,S6,S7,S8,S9,S10,S11, cutover-already-live), and ACTIVE-STATE marketing pivot (pricing, trust/distribution) maps to a task. Cutover (Stage 3) intentionally omitted as a standalone task - it is the per-task "deploy (owner ok)" step since site is already live.
- **Brainstorm gates:** B2/B3/B4/B5 marked brainstorm-first per owner process lock.
- **Overlaps flagged:** S7(a) framer self-host overlaps B1/S5; A2 cocktail data shape shared with B4 drawer.
- **No em-dashes/en-dashes** in this document.
