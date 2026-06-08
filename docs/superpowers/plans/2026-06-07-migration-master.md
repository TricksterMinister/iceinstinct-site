# Ice & Instinct - Migration Readiness & Cutover MASTER Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement each sub-plan task-by-task. This is a MASTER plan (a plan of plans): it sequences focused sub-plans behind hard gates. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Take the React rebuild (`react-shell`) from "looks right" to "safe to replace the live vanilla site", then perform the cutover with a rollback path.

**Architecture:** One master plan orchestrates several focused sub-plans (one per workstream). Work flows through three stages separated by HARD GATES: **STAGE 1 BUILD** (make every launch-required factor real) -> **STAGE 2 REVIEW** (full code review + QA on a real device) -> **STAGE 3 MIGRATE** (cutover + verify live + rollback ready). Nothing in a later stage starts until the prior stage's gate passes. Design-dependent features get a brainstorm before their sub-plan is written (just-in-time planning, so plans are accurate, not speculative).

**Tech Stack:** React 19 + TS + Vite (MPA, `app/`), plain CSS, Hostinger static hosting (serves repo as-is), Formspree, YouCanBook.me. Deploy = git push -> Hostinger serves repo root.

**Working dir:** `/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site` (branch `react-shell`). Live prod = `main` (vanilla), untouched until Stage 3.

**Can one plan hold several plans?** Yes - this file. It defines the order, the gates, and the cutover runbook. Each WORKSTREAM below links to its own sub-plan file (written with the writing-plans skill just before we execute it). Mechanical workstreams are detailed here directly; design-dependent ones are marked "brainstorm -> sub-plan".

---

## Audit Findings (2026-06-07, ground truth)

| Area | State | Verdict |
|---|---|---|
| Rendered body (SEO) | Built `<body>` = 0 visible text (SPA shell) | 🔴 blocker |
| Head meta | title only; NO description, OG, canonical, JSON-LD | 🔴 blocker |
| Crawler files | robots.txt / sitemap.xml / llms.txt absent from build | 🔴 blocker |
| Inquiry form | Formspree action = `REPLACE_WITH_FORMSPREE_ID` (dead) | 🔴 blocker |
| Deploy/cutover | react-shell not published; cutover mechanics unwired | 🔴 blocker |
| 404 page | none | 🟡 |
| Analytics | none | 🟡 (decide if wanted) |
| Favicon/manifest | unconfirmed in build | 🟡 |
| Placeholders | `hello@iceinstinct.com`, social `href="#"` | 🟡 |
| Phase 2 Palate Profiler | fallback-only, unfinished | 🟡 feature |
| Phase 3 Inquiry->YouCanBook | not done | 🟡 feature |
| Phase 4 Four Cities | not done | 🟢 post-launch ok |
| Phase 5 Gallery recipe drawer | not done | 🟢 post-launch ok |
| Duality (home ch.02) | parked, disliked | 🟢 post-launch ok |
| Media | some placeholder (tier hero loops, founder image) | 🟡 |
| Content fidelity | several pages not yet from owner's original HTML | 🟡 |
| QA / cross-browser / device | none performed | 🔴 blocker (review gate) |
| 12 route URLs | all build, parity with vanilla | ✅ |
| 320/360/390 mobile overflow | 0 across all routes | ✅ |
| Mobile polish (hero, footer, menu cube, tap, icons) | shipped this session | ✅ |

---

## PROGRESS LOG (live - the single source of truth for "what is left")

> Guarantee: nothing here is dropped. Every line is closed before cutover. Updated each work session.

- [x] **S1 SEO/GEO** - DONE (prerender all 12 routes, per-page head + JSON-LD, robots/sitemap/llms/favicon/404). Commits 1ef3482, e9210bd, f2abbf6, 7a6b8eb, c1c4ad9.
- [x] **S2 Inquiry** - DONE (YouCanBook gateway, real Instagram, public email removed + dead form handler deleted). Commits ff48979, 9fe6785, 03e1059.
- [x] **S3 Deploy prep** - DONE (production .htaccess + CSP, GA4 on all 12, deploy mechanism = Hostinger git-auto-pull of repo root; cutover runbook locked). Commits e541783, a618775.
- [x] **S4 Content fidelity** - DONE. Copy matches old site (prices/specs/cocktails exact). Restored tier pull-quotes + Menu-Protocol sub-headlines (owner: "restore all"); corrected Privacy/Terms to YouCanBook reality + Terms region wording. Diff report: docs/superpowers/content-fidelity-S4.md. Commit f2a5571. (Open visual re-check deferred to S8 QA on device; browser tooling was unavailable this session.)
- [ ] **S5 Media** - replace placeholder media; replace the 2 leftover `framerusercontent.com` images with real assets.
- [ ] **S6 Palate Profiler** - finish (brainstorm: live Gemini vs polished fallback) then build.
- [ ] **S9 Four Cities** (my-story) - brainstorm then build.
- [ ] **S10 Gallery recipe drawer** - brainstorm then build.
- [ ] **S11 Duality** (home chapter 02) - brainstorm (owner directs) then build.
- [ ] **S7 Code review** - whole branch, fix all critical/high. KNOWN BACKLOG from the 2026-06-07 review (non-blocking, address here): (a) self-host the 2 `framerusercontent.com` images used by `EtherealShadow.tsx` (also drop them from CSP img-src) - overlaps S5; (b) harden CSP: move the inline `gtag('config')` into a Vite-bundled file and remove `script-src 'unsafe-inline'`; (c) remove dead `.footer` CSS rules in `footer.css` (old Footer.tsx was deleted); (d) scope `cinema-chrome.css` `html{scroll-snap-type:y proximity}` to `body.cinema-chrome.vp-split` (currently global - desktop gallery/contact get unintended proximity snap); (e) re-glance prerender.mjs head-regex hardening. (Already FIXED in 89b2127: JSON-LD region wording, radial->linear hero scrim, overflow-x clip on html, modal focus.)
- [ ] **S8 QA on real device** - owner tests phone + desktop; scroll-jank question resolved.
- [ ] **Stage 3 Cutover** - backup, build, dist -> repo root, staging verify, merge to main (owner ok), live verify, rollback ready.

## Stage map & gates

```
STAGE 1: BUILD  (sub-plans S1..S6, do S1-S3 first)
   GATE 1 = launch-readiness checklist all green
STAGE 2: REVIEW (sub-plan S7 code review + S8 QA on device)
   GATE 2 = zero open critical/high findings, QA pass on real phone+desktop
STAGE 3: MIGRATE (this file, Cutover Runbook)
   GATE 3 = live domain verified + rollback proven
```

A workstream may only enter Stage 2 when ALL Stage-1 launch-required items pass. Cutover (Stage 3) may only run after Gate 2.

---

## STAGE 1 - BUILD (workstreams)

### S1 - SEO/GEO foundation (prerender + head + crawler files)  🔴 launch-required
**Goal:** Every route ships real, crawlable HTML body + complete per-page head + crawler files, matching or beating vanilla's SEO/GEO.
**Why first:** Biggest regression; affects all routes; other content work should land before the final prerender pass.
**Sub-plan:** `docs/superpowers/plans/2026-06-08-s1-prerender-seo.md` (write next; mechanical, no brainstorm needed).
**Scope:**
- Add `vite-react-ssg` (or equivalent static prerender) so each of the 12 routes emits its rendered body HTML at build.
- Per-route `<head>`: unique `<title>`, meta description, canonical, Open Graph (title/description/image/url/type), Twitter card.
- Port the vanilla JSON-LD: Organization (home), ItemList of the 12 cocktails (gallery), Service/Offer per tier (offering pages), Person (my-story). Source = `_legacy-vanilla/` HTML.
- Ship `robots.txt` (re-allow the 15 AI crawlers), `sitemap.xml` (12 URLs), `llms.txt`, `favicon.svg` into `app/public/` so they land in `dist/`.
- Add `404.html`.
**Acceptance (gate items):**
- `dist/<route>/index.html` body has > 300 chars visible text for every route.
- Each route head has title + description + canonical + og:title + >=1 JSON-LD block.
- `dist/robots.txt`, `dist/sitemap.xml`, `dist/llms.txt`, `dist/404.html`, favicon present.
- `npm run build` clean; 0 mobile overflow re-verified.

### S2 - Inquiry pipeline (form + email + YouCanBook gateway = Phase 3)  🔴 launch-required
**Goal:** A guest can actually reach you; no dead endpoints.
**Sub-plan:** `docs/superpowers/plans/2026-06-08-s2-inquiry.md` (needs ONE decision from owner: real Formspree form ID + the canonical contact email + whether inquiry routes to YouCanBook.me or the form). Light brainstorm, then plan.
**Scope:**
- Replace `formspree.io/f/REPLACE_WITH_FORMSPREE_ID` with the real ID in `app/src/pages/Contact.tsx`.
- Replace `hello@iceinstinct.com` with the confirmed address (Contact, Privacy, Terms, any script copy).
- Wire the Inquiry CTA to the existing YouCanBook.me (`https://enter-ritual.youcanbook.me/`) per the migration handoff (branded gateway), or keep the Formspree form - owner decides.
- Real social URLs (replace `href="#"`).
**Acceptance:** submit a test inquiry end-to-end and receive it; all CTAs resolve to a working destination; no `href="#"` in footer/social.

### S3 - Deploy + cutover wiring  🔴 launch-required
**Goal:** A repeatable publish path for the React build, plus the `.htaccess` the new site needs.
**Sub-plan:** detailed in this file's **Cutover Runbook** (below) + a small `2026-06-08-s3-deploy.md` for the build-output-to-root mechanics.
**Scope:**
- Decide deploy mechanism on Hostinger (git auto-deploy of `dist/` to public_html, or commit built output to repo root at cutover).
- Author root `.htaccess` for the new site: HTTPS force, www-canonical, security headers, caching, SPA/MPA fallback, and **preserve every existing vanilla URL** (the 12 paths already match; verify trailing-slash behavior).
- Confirm `_legacy-vanilla/` retains the old site for rollback.
**Acceptance:** a staging deploy of `dist/` serves all 12 routes over HTTPS with correct canonical host; `.htaccess` validated.

### S4 - Content fidelity  🟡 launch-preferred
**Goal:** Live copy = owner's real wording, not my placeholder base.
**Sub-plan:** `2026-06-09-s4-content.md`. Per the HTML-import table in `CLAUDE.md`, pull exact copy from `_legacy-vanilla/` / owner-supplied HTML for any page still on "my base".
**Acceptance:** owner signs off each page's copy.

### S5 - Media finalization  🟡 launch-preferred
**Goal:** No placeholder media on launch routes.
**Sub-plan:** `2026-06-09-s5-media.md`. Replace placeholder tier hero loops + founder image per `STATE.md` media notes (banana/veo, house style locked in `docs/MEDIA-STYLE.md`).
**Acceptance:** every visible image/video is final, monochrome-compliant, weight-optimized.

### S6 - Palate Profiler finalization (Phase 2)  🔴 launch-required
**Goal:** Ship the profiler as a finished, working feature.
**Sub-plan:** brainstorm -> `2026-06-10-s6-profiler.md`. Currently fallback-only; finish it (Gemini-via-serverless or a polished fallback that stands on its own).
**Acceptance:** feature works end-to-end on mobile + desktop.

### S9 - Four Cities journey (Phase 4)  🔴 launch-required
**Goal:** Finish the my-story Four Cities journey.
**Sub-plan:** brainstorm -> `2026-06-11-s9-four-cities.md`.
**Acceptance:** works on mobile + desktop, brand-compliant.

### S10 - Gallery recipe drawer (Phase 5)  🔴 launch-required
**Goal:** Click a cocktail tile -> full recipe card (data-driven, N cocktails).
**Sub-plan:** brainstorm -> `2026-06-11-s10-gallery-drawer.md`.
**Acceptance:** every tile opens its recipe; same card language as profiler result.

### S11 - Duality (home chapter 02)  🔴 launch-required
**Goal:** Resolve the parked home Duality section to the owner's satisfaction.
**Sub-plan:** brainstorm (owner directs the portal feel) -> `2026-06-12-s11-duality.md`.
**Acceptance:** owner approves the interaction; mobile + desktop clean.

> **Nothing is deferred.** Per owner directive (2026-06-07) every workstream S1-S11 is launch-required and resolved in order before cutover. Design-dependent ones still get a brainstorm first - that is sequencing, not deferral.

---

## STAGE 2 - REVIEW (gate 2)

### S7 - Full code review  🔴
- Run `/code-review` (and `/cso` security pass) over the whole `react-shell` diff vs `main`.
- Fix all critical/high findings; re-review.
**Acceptance:** zero open critical/high.

### S8 - QA on real devices  🔴
- Real iPhone + Android + desktop Chrome/Safari/Firefox: click every route, open menu, submit a test inquiry, scroll every section, rotate.
- Verify the items screenshots could not confirm this session: hero tagline legibility over video, footer proportion, menu overlay, offering closing, concierge icons, scroll smoothness (the parked Lenis+ScrollTrigger jank question).
- Core Web Vitals (LCP/INP/CLS) on a throttled mobile profile.
**Acceptance:** no functional or visual blocker on any target; CWV in "good" range.

---

## STAGE 3 - MIGRATE (Cutover Runbook)

Only after Gate 2. Performed by the owner's go-ahead; main auto-deploys, so this is irreversible-facing - confirm before each push.

- [ ] **R1 - Freeze & backup:** snapshot current live (export Hostinger public_html / the vanilla `main`), tag `pre-cutover-vanilla`.
- [ ] **R2 - Final build:** `cd app && npm run build`; run the launch-readiness checklist one last time (all green).
- [ ] **R3 - Assemble release:** CONFIRMED MECHANISM: Hostinger auto-pulls the GitHub repo and serves the repo ROOT (same as the live vanilla today). So the React `app/dist/` output must BECOME the repo root on `main` at cutover. Steps: `cd app && npm run build`; copy `dist/*` (including `.htaccess`, `robots.txt`, `sitemap.xml`, `llms.txt`, `404.html`, `favicon.svg`, and `assets/`) to the repo root, replacing the vanilla files; keep `_legacy-vanilla/` for rollback. Verify the built `assets/` (images/video) are real files at root, not broken symlinks (Vite resolves `app/public/assets` during build). Do NOT ship `app/`, `node_modules`, `docs/`, `specs/`, `plans/` to the serving root if they would be web-exposed (they are static text and `.htaccess` denies dotfiles; acceptable, but prefer a clean root = the dist payload + `_legacy-vanilla/`).
- [ ] **R4 - Staging verify:** serve the assembled release on a staging URL (or a Hostinger staging/subdomain); click all 12 routes over HTTPS; check the browser console for CSP violations (fonts, GA4, Pexels video, Framer images must all load); confirm the YouCanBook CTA opens; view-source shows real body + head SEO.
- [ ] **R5 - Cutover:** commit the root payload to `main` (merge or direct), with explicit owner approval -> Hostinger auto-pulls and publishes. (Per project rule: never push to `main` without the owner's ok.)
- [ ] **R6 - Live verify (prod):** on `https://www.iceinstinct.com` - all routes 200, HTTPS + www canonical, real body text, head SEO present, robots/sitemap/llms reachable, inquiry submits, mobile render correct. Re-run Lighthouse on the live URL.
- [ ] **R7 - Rollback ready:** if any R6 check fails, restore `pre-cutover-vanilla` (revert merge / re-point hosting). Document the trigger.
- [ ] **R8 - Post-cutover:** submit sitemap to Search Console; monitor 404s/logs 48h; update `STATE.md` + `CLAUDE.md` (migration complete).

---

## GATE 1 - Launch-readiness checklist (must be all ✅ to enter Stage 2)

- [ ] Every route: rendered body text present (prerender) [S1]
- [ ] Every route: title + description + canonical + OG + JSON-LD [S1]
- [ ] robots.txt + sitemap.xml + llms.txt + favicon + 404 in build [S1]
- [ ] Inquiry form submits to a real endpoint; email correct [S2]
- [ ] All CTAs + social links resolve (no `href="#"`, no dead Formspree) [S2]
- [ ] Deploy path + root `.htaccess` (HTTPS/www/headers/URL preservation) ready [S3]
- [ ] Content owner-approved on launch routes [S4]
- [ ] No placeholder media on launch routes [S5]
- [ ] Profiler finished [S6]
- [ ] Four Cities journey finished [S9]
- [ ] Gallery recipe drawer finished [S10]
- [ ] Duality resolved + owner-approved [S11]
- [ ] `npm run build` clean; 0 mobile overflow at 320/360/390 (re-verify)

---

## Self-Review

- **Spec coverage:** owner asked for (a) full audit of everything needed for a successful site - done (Audit Findings + checklist), (b) a migration plan - Stage 3 Cutover Runbook, (c) a plan of the tasks needed before migration - Stage 1 workstreams S1-S6, (d) execute, (e) code review - Stage 2 S7, (f) migrate only after all stages - enforced by Gates 1-2. (g) "several plans in one" - this master sequences sub-plans. All covered.
- **No fake detail:** mechanical workstreams (S1/S2/S3) carry concrete acceptance criteria; design-dependent ones (S6 + post-launch features) are explicitly "brainstorm -> sub-plan" rather than speculative task steps - this is intentional orchestration, not a placeholder.
- **Order rationale:** S1 SEO last-mile depends on final content (S4) + media (S5), so within Stage 1 do S2/S3 wiring early, land S4/S5 content/media, then S1's final prerender pass captures finished pages. S6 optional.
- **Decisions needed from owner before S2:** real Formspree form ID, canonical email, inquiry destination (form vs YouCanBook), real social URLs.
