# Closing + Footer Standardization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the final closing-CTA + footer segment render and behave IDENTICALLY on every page - one screen, footer whole, static, cleanly snapped - by converging the 3 outlier pages (Gallery, Concierge, Offerings) onto the exact wiring the 13 already-correct pages use, with before/after evidence on the real live render at each gate.

**Architecture:** The "closing + footer pack into one viewport" behaviour is produced by a 3-part wiring the 13 correct pages share: the segment carries class `oma-close` + `id="final-cta"`, and the footer is rendered `<SiteFooter embedded />`. `embedded` outputs the bare `.oma-close-bottom` band as a DIRECT child of `.closing-segment`, which is what fires `footer.css:207` (`.closing-segment:has(> .oma-close-bottom){min-height:100dvh}`) and `footer.css:197` (`> .oma-close-bottom{flex:0 0 auto}`). Gallery/Concierge/Offerings instead use a plain `closing-segment` + standalone `<SiteFooter />`, which renders a `.site-footer` wrapper (NOT `.oma-close-bottom`), so the `:has()` packing never engages and the footer stacks as a second, unsnapped, partly-cut block. **Fix = give those 3 pages the identical trio. JSX only. Zero CSS changes - so the 13 correct pages and home are untouched by construction.**

**Tech Stack:** React 18 + TypeScript, Vite (multi-page), prerender via `app/scripts/prerender.mjs`. CSS is hand-authored (`app/src/styles/*.css`). Deploy = build `app/dist/`, rsync prerendered payload to repo root, `git push origin main` (Hostinger auto-deploys). Owner judges the LIVE render only.

**Non-goals (explicit):** No CSS edits. No copy changes. No touching the 13 working pages, home, MyStory, or Legal. The Bench (`/work-with-us/`) and Contact keep their FORM closings - they are verified in the sweep but only changed if the sweep proves their footer behaviour diverges (separate decision, not assumed here).

---

## Root Cause (evidence-locked, not assumed)

Verified in code this session:

| Fact | Proof |
|---|---|
| The one-viewport flex base is global, every page has it | `footer.css:332-333` (`.closing-segment{min-height:100dvh;display:flex;flex-direction:column}` + `.closing-segment .closing{flex:1 1 auto}`) |
| The pack-into-one-screen rule needs the footer to be a direct `.oma-close-bottom` child | `footer.css:207` `.closing-segment:has(> .oma-close-bottom){height:auto;min-height:100dvh}` and `footer.css:197` |
| `embedded` emits the bare `.oma-close-bottom`; standalone wraps it in `.site-footer` | `SiteFooter.tsx:122-123` |
| The 13 correct pages all use `oma-close` + `id="final-cta"` + `embedded` | e.g. `Gift.tsx:363` + `Gift.tsx:366`, `Manhattan.tsx:364` + `Manhattan.tsx:367` |
| The 3 broken pages use plain `closing-segment` + standalone `<SiteFooter/>` | `GalleryPage.tsx:222,224`; `ConciergePage.tsx:348,350`; `Offerings.tsx:220,222` |
| All 3 broken pages DO set `body.closer` and call `useCinemaChrome` (so it is NOT a missing-hook problem - purely the footer wiring) | `GalleryPage.tsx:37,42`; `ConciergePage.tsx:72,77`; `Offerings.tsx:15,20` |

**Working directory for all tasks:** `/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59`
**Evidence directory (created in Task 0.1):** `docs/superpowers/evidence/2026-06-15-closing/`

---

## Phase 0: Baseline - prove the bug with evidence before touching anything

### Task 0.1: Prepare build + evidence dir

**Files:**
- Create (symlink): `app/node_modules` -> main repo's `app/node_modules`
- Create (dir): `docs/superpowers/evidence/2026-06-15-closing/`

- [ ] **Step 1: Symlink node_modules (worktree has none)**

Run:
```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
[ -e app/node_modules ] || ln -s "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/app/node_modules" app/node_modules
mkdir -p docs/superpowers/evidence/2026-06-15-closing
ls -la app/node_modules >/dev/null && echo "node_modules OK"
```
Expected: `node_modules OK`

- [ ] **Step 2: Build the current (unfixed) site for the baseline**

Run:
```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/app"
npm run build
```
Expected: ends with prerender writing routes (incl. `gallery`, `concierge`, `offerings`, `gift`, `manhattan`), no TS errors. `app/dist/` populated.

- [ ] **Step 3: Serve the built dist headless**

Run (background):
```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/app"
npm run preview -- --port 4319 >/tmp/ii-preview.log 2>&1 &
sleep 2 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4319/gallery/
```
Expected: `200`

### Task 0.2: Capture the BEFORE geometry (the un-fakeable number)

**Files:**
- Create: `docs/superpowers/evidence/2026-06-15-closing/before.json`

This step measures, headless, whether closing+footer fit in ONE viewport and whether the footer is fully visible (not cut). It is the objective pass/fail the whole plan turns on.

- [ ] **Step 1: Run the geometry probe via the browse skill (headless - no desktop tab)**

Use the `browse` skill to load each URL at a fixed 1440x900 viewport and eval this exact snippet, saving results to `before.json`. URLs (all on `http://localhost:4319`): `/gallery/`, `/concierge/`, `/offerings/`, `/gift/`, `/manhattan/`.

Eval snippet (returns the metric per page):
```js
(() => {
  const seg = document.querySelector('.closing-segment');
  const band = document.querySelector('.oma-close-bottom'); // the real footer band, embedded or not
  if (!seg || !band) return { error: 'segment or band not found' };
  const vh = window.innerHeight;
  const segH = Math.round(seg.getBoundingClientRect().height);
  const bandR = band.getBoundingClientRect();
  // direct-child test = the packing contract (footer.css:207)
  const bandIsDirectChild = band.parentElement === seg;
  return {
    viewport: vh,
    segmentHeight: segH,
    segmentFitsOneScreen: segH <= vh + 2,          // true = closing+footer in one screen
    footerBandHeight: Math.round(bandR.height),
    footerFullyWithinSegment: bandR.bottom <= seg.getBoundingClientRect().bottom + 2,
    bandIsDirectChild,                              // false on the 3 broken pages today
  };
})()
```
Expected (documents the bug): `/gallery/`, `/concierge/`, `/offerings/` show `bandIsDirectChild: false` and at least one of `segmentFitsOneScreen:false` / footer cut; `/gift/`, `/manhattan/` show `bandIsDirectChild: true` and fit one screen.

- [ ] **Step 2: Screenshot the BEFORE closing+footer of all 5 pages**

Use the `browse` skill to screenshot each of the 5 URLs scrolled to the closing segment, full-page, saving to `docs/superpowers/evidence/2026-06-15-closing/before-<page>.png`.

- [ ] **Step 3: Commit the baseline evidence**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
git add docs/superpowers/evidence/2026-06-15-closing docs/superpowers/plans/2026-06-15-closing-footer-standardization.md
git commit -m "test(closing): baseline evidence - 3 pages footer not packed (bandIsDirectChild=false)"
```

**GATE:** If the BEFORE probe does NOT show the 3 pages diverging from gift/manhattan, STOP - the root-cause model is wrong; re-investigate before editing.

---

## Phase 1: The fix - 3 identical JSX edits

Each page: add `oma-close` + `id="final-cta"` to the segment wrapper, switch the footer to `embedded`. Verbatim match to `Gift.tsx:363,366`.

### Task 1.1: GalleryPage

**Files:**
- Modify: `app/src/pages/GalleryPage.tsx:222` and `:224`

- [ ] **Step 1: Edit the wrapper + footer**

Before:
```tsx
      <div className="closing-segment">
        <Closing ghost="SEEN" title="You've seen" titleEm="the room." lead="Now picture it as yours - one bar, one night, every detail handled." />
        <SiteFooter />
```
After:
```tsx
      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="SEEN" title="You've seen" titleEm="the room." lead="Now picture it as yours - one bar, one night, every detail handled." />
        <SiteFooter embedded />
```

- [ ] **Step 2: Typecheck**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/app"
npm run typecheck
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
git add app/src/pages/GalleryPage.tsx
git commit -m "fix(closing): Gallery footer embedded + oma-close - one-viewport parity"
```

### Task 1.2: ConciergePage

**Files:**
- Modify: `app/src/pages/ConciergePage.tsx:348` and `:350`

- [ ] **Step 1: Edit the wrapper + footer**

Before:
```tsx
      <div className="closing-segment">
        <Closing ghost="HANDLED" title="Everything else," titleEm="handled." lead="Staffing, glassware, clear ice, the timeline - the Concierge arranges it all so you only host. Tell us what the evening needs." />
        <SiteFooter />
```
After:
```tsx
      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="HANDLED" title="Everything else," titleEm="handled." lead="Staffing, glassware, clear ice, the timeline - the Concierge arranges it all so you only host. Tell us what the evening needs." />
        <SiteFooter embedded />
```

- [ ] **Step 2: Typecheck**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/app"
npm run typecheck
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
git add app/src/pages/ConciergePage.tsx
git commit -m "fix(closing): Concierge footer embedded + oma-close - one-viewport parity"
```

### Task 1.3: Offerings

**Files:**
- Modify: `app/src/pages/Offerings.tsx:220` and `:222`

- [ ] **Step 1: Edit the wrapper + footer**

Before:
```tsx
      <div className="closing-segment">
        <Closing ghost="CHOOSE" title="Find the tier" titleEm="that fits the night." lead="From an intimate table to a full celebration, each tier is a complete evening. Tell us which fits yours." secondaryLabel="Speak with the Concierge" secondaryHref="/concierge/" />
        <SiteFooter />
```
After:
```tsx
      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="CHOOSE" title="Find the tier" titleEm="that fits the night." lead="From an intimate table to a full celebration, each tier is a complete evening. Tell us which fits yours." secondaryLabel="Speak with the Concierge" secondaryHref="/concierge/" />
        <SiteFooter embedded />
```

- [ ] **Step 2: Typecheck**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/app"
npm run typecheck
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
git add app/src/pages/Offerings.tsx
git commit -m "fix(closing): Offerings footer embedded + oma-close - one-viewport parity"
```

---

## Phase 2: Pre-deploy proof (headless) - do NOT ship if this fails

### Task 2.1: Rebuild + re-probe geometry

**Files:**
- Create: `docs/superpowers/evidence/2026-06-15-closing/after.json`

- [ ] **Step 1: Rebuild**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/app"
npm run build
```
Expected: clean build, routes prerendered.

- [ ] **Step 2: Restart preview**

```bash
pkill -f "vite preview" 2>/dev/null; sleep 1
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/app"
npm run preview -- --port 4319 >/tmp/ii-preview.log 2>&1 &
sleep 2 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4319/gallery/
```
Expected: `200`

- [ ] **Step 3: Re-run the EXACT probe from Task 0.2 Step 1 on the same 5 URLs -> `after.json`**

Expected (the fix): `/gallery/`, `/concierge/`, `/offerings/` now report `bandIsDirectChild: true`, `segmentFitsOneScreen: true`, `footerFullyWithinSegment: true` - identical shape to `/gift/` and `/manhattan/`.

**GATE:** If any of the 3 still shows `bandIsDirectChild:false` or footer not fully within the segment, STOP. The fix is incomplete - do not deploy.

### Task 2.2: After screenshots + side-by-side

- [ ] **Step 1: Screenshot AFTER closing+footer of the 5 URLs** -> `after-<page>.png` (same viewport/scroll as before).
- [ ] **Step 2: Eyeball before-vs-after**: the 3 fixed pages must now match gift/manhattan - footer whole, static, one screen. Note any visual regression (overlap, clipped band, doubled meta) in the report.

### Task 2.3: Full-site sweep (catch any other outlier honestly)

- [ ] **Step 1: Probe geometry on EVERY closing+footer route** (headless, same snippet): `/`, `/offerings/`, every tier `/offerings/foundation|simplicity|bespoke|omakase/`, `/concierge/`, `/gallery/`, `/my-story/`, `/journal/` + 1 article, `/press/`, `/weddings/`, `/corporate/`, `/events/`, `/gift/`, `/manhattan/`, `/hamptons/`, `/new-jersey/`, `/westchester-greenwich/`, `/work-with-us/`, `/contact/`, `/privacy/`, `/terms/`, `/cookies/`, `/accessibility/`, `/responsible-service/`. Save to `sweep.json`.
- [ ] **Step 2: Report** every route's `{segmentFitsOneScreen, footerFullyWithinSegment, bandIsDirectChild}`. Flag any route (besides the intentionally-form Contact/Bench) that is not packed. If a non-form page diverges, list it - do NOT silently standardize it; surface it for an owner decision.
- [ ] **Step 3: Commit after-evidence**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
git add docs/superpowers/evidence/2026-06-15-closing
git commit -m "test(closing): after-evidence - 3 pages now packed (bandIsDirectChild=true) + full sweep"
```

**Owner checkpoint:** Present `before-*.png` vs `after-*.png` + the before/after JSON. Get explicit GO before Phase 3 (deploy is the only irreversible step and auto-deploys live).

---

## Phase 3: Deploy + verify on the LIVE domain

### Task 3.1: Sync dist -> root (dry run first)

**Files:**
- Modify: repo-root prerendered payload (`index.html`, `gallery/index.html`, `concierge/index.html`, `offerings/index.html`, `assets/*`, etc.)

- [ ] **Step 1: DRY-RUN the sync and read the diff**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
rsync -av -n --delete \
  --exclude '.git' --exclude '.claude' --exclude 'app' --exclude 'docs' \
  --exclude 'node_modules' --exclude 'STATE.md' --exclude 'CLAUDE.md' --exclude '.close.yml' \
  app/dist/ ./
```
Expected: changes limited to `index.html` + the prerendered route stubs (notably `gallery/`, `concierge/`, `offerings/`) + hashed `assets/`. **If anything outside that scope appears (e.g. `.git`, `app/`, `docs/`), STOP and fix the exclude list.**

- [ ] **Step 2: Real sync (drop `-n`)**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
rsync -av --delete \
  --exclude '.git' --exclude '.claude' --exclude 'app' --exclude 'docs' \
  --exclude 'node_modules' --exclude 'STATE.md' --exclude 'CLAUDE.md' --exclude '.close.yml' \
  app/dist/ ./
```

- [ ] **Step 3: Sanity-check the synced stubs contain the fix**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
for p in gallery concierge offerings; do
  printf "%-12s oma-close-bottom in stub: " "$p"
  grep -c "oma-close-bottom" "$p/index.html"
done
```
Expected: each prints a count >= 1 (the embedded band is now prerendered into the stub).

### Task 3.2: Commit + push (auto-deploy)

- [ ] **Step 1: Commit the deploy payload**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
git add -A
git commit -m "deploy(closing): standardize footer on gallery/concierge/offerings - one-viewport parity"
```

- [ ] **Step 2: Push main (this auto-deploys to Hostinger) - ONLY after owner GO**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
git push origin main
```

### Task 3.3: Verify on the real domain (authoritative)

- [ ] **Step 1: Wait for the new build to be live (poll for the new asset hash)**

```bash
NEWJS=$(grep -oE '/assets/[^"]+\.js' "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59/gallery/index.html" | head -1)
echo "expect: $NEWJS"
until curl -s https://iceinstinct.com/gallery/ | grep -q "$NEWJS"; do echo "waiting for live..."; sleep 15; done
echo "LIVE updated"
```
Expected: eventually `LIVE updated`.

- [ ] **Step 2: Re-run the geometry probe on the LIVE URLs** (`https://iceinstinct.com/gallery/`, `/concierge/`, `/offerings/`, `/gift/`, `/manhattan/`) -> `live.json`. Assert the 3 fixed pages now report `bandIsDirectChild:true`, `segmentFitsOneScreen:true`, `footerFullyWithinSegment:true`.

- [ ] **Step 3: Screenshot the LIVE closing+footer of the 3 fixed pages + gift** -> `live-<page>.png`.

- [ ] **Step 4: Report each page honestly - PASS/FAIL with the metric + screenshot.** No page is "done" until its live metric matches the reference.

### Task 3.4: Rollback path (only if a live page FAILS)

- [ ] **Step 1: Revert the deploy + page commits and re-push**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/elastic-joliot-267b59"
# revert in one range: the deploy commit + the 3 fix commits
git revert --no-edit HEAD~4..HEAD
git push origin main
```
- [ ] **Step 2: Re-verify the 3 pages are back to the prior state on live; report.**

---

## Phase 4: Close out

### Task 4.1: Update STATE + report

**Files:**
- Modify: `STATE.md`

- [ ] **Step 1: Add a dated entry** to `STATE.md` summarizing: root cause (3 pages missing `oma-close`+`id`+`embedded`), the JSX-only fix, the before/after/live metrics, and the rollback commit range.
- [ ] **Step 2: Final report to owner** - per-page live PASS/FAIL table + before/after screenshots. State plainly what changed and what (Contact/Bench forms) was deliberately left, and whether the sweep found any other outlier.

- [ ] **Step 3: Stop the preview server**

```bash
pkill -f "vite preview" 2>/dev/null; echo "preview stopped"
```

---

## Rollback Summary

- Pre-deploy (Phases 0-2): nothing is live; `git revert` the 3 page commits or just `git reset` the worktree.
- Post-deploy (Phase 3): `git revert --no-edit HEAD~4..HEAD && git push origin main` (Task 3.4) returns the live site to the prior footer wiring. The 13 pages and home were never touched, so they cannot regress.

## Self-Review

- **Spec coverage:** the complaint = footers inconsistent (whole/cut/static/janky) across pages -> Phase 0 proves it numerically, Phase 1 fixes the 3 proven outliers, Phase 2 proves parity headless + sweeps for any other, Phase 3 proves it on the live domain owner judges by. Covered.
- **Placeholder scan:** every edit has exact before/after JSX; every command is literal; the probe JS is complete. No TBD/TODO.
- **Consistency:** the same probe snippet and the same metric keys (`bandIsDirectChild`, `segmentFitsOneScreen`, `footerFullyWithinSegment`) are used in 0.2, 2.1, 2.3, 3.3 - before/after/live are directly comparable.
- **Risk:** zero CSS changes; only 3 page components edited; the 13 + home are out of scope by construction; deploy gated by dry-run + owner GO + rollback.
