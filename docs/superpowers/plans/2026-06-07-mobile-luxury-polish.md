# Mobile Luxury Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve every issue from the mobile design critique so the React site (branch `react-shell`) has a flawless, luxury mobile experience at 320-430px.

**Architecture:** Static React (Vite) MPA. No test framework. Each task = edit -> verify (production build + live DOM-geometry assertion in a 390px mobile-emulated Chrome) -> commit. Screenshots are unreliable this session, so verification is geometric (heights/positions/computed styles) plus the existing 360px overflow sweep.

**Tech Stack:** React 19 + TypeScript + Vite; plain CSS (cinema.css for home, cinema-chrome.css + styles.css + offering.css for deep pages, footer.css global). Dev server: `cd app && npm run dev` -> http://localhost:5173/. Mobile emulation + geometry checks run through the chrome-devtools MCP.

**Working directory:** `/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site` (the react-shell checkout). All paths below are relative to `app/src/`.

**Brand locks (never break):** strict monochrome + single champagne accent; no blur/glassmorphism; no em/en dashes (hyphens only); region wording standard = "New York Metropolitan Area".

**Standing verification commands (used by several tasks):**
- Build: `cd app && npm run build` -> expect `built in ...`, all 12 routes emitted, no error.
- Dash guard (run before every commit):
  ```bash
  cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site"
  python3 -c "import subprocess;[print('DASH',p) for p in subprocess.check_output(['git','diff','--cached','--name-only']).decode().split() if (lambda s:chr(0x2014) in s or chr(0x2013) in s)(open(p,encoding='utf-8').read())] or print('OK no dashes')"
  ```
- Overflow sweep (run in the mobile-emulated page console via chrome-devtools `evaluate_script`), expect every route `0`:
  ```js
  async () => { const R=['/','/offerings/','/offerings/foundation/','/offerings/simplicity/','/offerings/bespoke/','/offerings/omakase/','/concierge/','/my-story/','/gallery/','/contact/','/privacy/','/terms/'];const o={};for(const r of R){const f=document.createElement('iframe');f.style.cssText='position:fixed;left:-9999px;width:360px;height:780px;border:0';document.body.appendChild(f);await new Promise(x=>{f.onload=x;f.src=r});await new Promise(x=>setTimeout(x,800));try{const d=f.contentDocument.documentElement;o[r]=d.scrollWidth-d.clientWidth}catch(e){o[r]='ERR'}f.remove()}return o; }
  ```

---

## File Structure

| File | Responsibility | Tasks |
|---|---|---|
| `styles/cinema.css` | Home-only styles (hero, tiers, founder, menu, footer trigger) | 1, 4 |
| `styles/footer.css` | Global footer band (marquee + links + base) | 1, 4 |
| `styles/offering.css` | Offering-page template (closing, panels, back link) | 1 |
| `styles/cinema-chrome.css` | Deep-page chrome (menu overlay/trigger, va-foot) | 4 |
| `sections/Closing.tsx` | Home closing CTA meta line | 2 |
| `app/VanishHeader.tsx` | Home menu overlay (va-foot region tag) | 2 |
| `pages/Offerings.tsx`, `pages/ConciergePage.tsx`, `pages/MyStory.tsx`, `pages/GalleryPage.tsx`, `pages/Contact.tsx`, `pages/Privacy.tsx`, `pages/Terms.tsx` | Deep-page menu va-foot region tags + CTA eyebrows + hint copy | 2, 3 |

---

## Task 1: Tap targets to >= ~40px (usability / a11y)

Four interactive elements are below a comfortable touch size on phones: home Tiers "Explore" link (19px), footer nav links (30px), footer signature link (21px), offering back link (31px). Goal: each >= ~40px tall without visually bloating the dense editorial layout.

**Files:**
- Modify: `styles/cinema.css` (home `.tier-link`, inside the `@media (max-width: 720px)` block near line 471)
- Modify: `styles/footer.css` (`@media(max-width:640px)` block, `.oma-close-nav .lnk` ~line 211, `.oma-close-sign` add)
- Modify: `styles/offering.css` (`@media (max-width:720px)` `.concierge-back` ~line 974)

- [ ] **Step 1: Home Tiers "Explore" link** - in `styles/cinema.css`, inside the existing `@media (max-width: 720px) { ... }` block, add:

```css
  /* Tap target for the home tier "Explore" link (was 19px tall) */
  .tier-link { padding-top: 0.75rem; padding-bottom: 0.65rem; }
```

- [ ] **Step 2: Footer nav links** - in `styles/footer.css`, in the `@media(max-width:640px)` block, change the `.oma-close-nav .lnk` rule from `padding:.38rem .1rem` to:

```css
  .oma-close-nav .lnk{padding:.6rem .1rem;display:inline-block}
```

- [ ] **Step 3: Footer signature link** - in the same `@media(max-width:640px)` block in `styles/footer.css`, add:

```css
  .oma-close-sign{padding:.45rem 0}
```

- [ ] **Step 4: Offering back link** - in `styles/offering.css`, change the `@media (max-width:720px) .concierge-back` padding from `.45rem 0` to:

```css
  .concierge-back{ display:inline-block; padding:.6rem 0; }
```

- [ ] **Step 5: Build** - `cd app && npm run build` -> expect success, 12 routes.

- [ ] **Step 6: Verify geometry** - reload http://localhost:5173/ (mobile 390 emulation), then http://localhost:5173/offerings/foundation/, run via evaluate_script and expect each height >= 38:

```js
() => { const h=s=>{const e=document.querySelector(s);return e?Math.round(e.getBoundingClientRect().height):null};
  return { tierLink:h('.tier-link'), footerLnk:h('.oma-close-nav .lnk'), sign:h('.oma-close-sign'), back:h('.concierge-back') }; }
```
Expected: tierLink >= 40, footerLnk >= 40, sign >= 34, back >= 36 (back/sign only present on offering pages).

- [ ] **Step 7: Commit**

```bash
git add app/src/styles/cinema.css app/src/styles/footer.css app/src/styles/offering.css
git commit -m "fix(mobile): enlarge tap targets (tiers, footer nav, signature, back link)"
```

---

## Task 2: Unify region wording + EST (consistency)

Region tag appears in three forms: "Manhattan / By Appointment" (menu/header tags x8), "Manhattan & surrounds" (home closing), and "New York Metropolitan Area" (footer base). Standard = **"New York Metropolitan Area"**. CTA eyebrows say "Private Commission - Manhattan" (x4) -> shorten to "Private Commission - New York". Leave true body copy (Terms legal prose, Profiler result tag) untouched. EST stays in footers (already removed from hero); no EST change.

**Files (exact lines as of audit):**
- Modify: `app/VanishHeader.tsx:106`
- Modify: `sections/Closing.tsx:19`
- Modify menu va-foot region span in: `pages/Offerings.tsx:87`, `pages/ConciergePage.tsx:87`, `pages/MyStory.tsx:87`, `pages/GalleryPage.tsx:101`, `pages/Contact.tsx:127`, `pages/Privacy.tsx:85`, `pages/Terms.tsx:85`
- Modify CTA eyebrow in: `pages/Offerings.tsx:232`, `pages/ConciergePage.tsx:407`, `pages/MyStory.tsx:416`, `pages/GalleryPage.tsx:382`
- DO NOT touch: `pages/Terms.tsx:153` (legal prose "Manhattan and surrounds"), `features/Profiler/PalateProfiler.tsx:342`

- [ ] **Step 1: Menu/header region tags** - in each of the 8 files, replace the span text `Manhattan / By Appointment` with `New York Metropolitan Area`. Exact old/new:

```
old:  <span>Manhattan / By Appointment</span>
new:  <span>New York Metropolitan Area</span>
```
Apply in: VanishHeader.tsx, Offerings.tsx, ConciergePage.tsx, MyStory.tsx, GalleryPage.tsx, Contact.tsx, Privacy.tsx, Terms.tsx.

- [ ] **Step 2: Home closing meta** - in `sections/Closing.tsx:19`, replace:

```
old:  <span>Manhattan &amp; surrounds</span>
new:  <span>New York Metropolitan Area</span>
```

- [ ] **Step 3: CTA eyebrows** - in the 4 deep pages, replace:

```
old:  <p className="cta-eyebrow">Private Commission &middot; Manhattan</p>
new:  <p className="cta-eyebrow">Private Commission &middot; New York</p>
```
Apply in: Offerings.tsx, ConciergePage.tsx, MyStory.tsx, GalleryPage.tsx.

- [ ] **Step 4: Verify no stray menu "Manhattan" remains** (legal prose + profiler are the only allowed):

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site"
grep -rn "Manhattan" app/src --include="*.tsx"
```
Expected: ONLY `pages/Terms.tsx:153` (legal prose) and `features/Profiler/PalateProfiler.tsx` remain.

- [ ] **Step 5: Build** - `cd app && npm run build` -> success.

- [ ] **Step 6: Dash guard** (region edit could introduce nothing, but run the standing dash guard). Expect `OK no dashes`.

- [ ] **Step 7: Commit**

```bash
git add app/src/app/VanishHeader.tsx app/src/sections/Closing.tsx app/src/pages/Offerings.tsx app/src/pages/ConciergePage.tsx app/src/pages/MyStory.tsx app/src/pages/GalleryPage.tsx app/src/pages/Contact.tsx app/src/pages/Privacy.tsx app/src/pages/Terms.tsx
git commit -m "fix(copy): unify region wording to New York Metropolitan Area / New York"
```

---

## Task 3: Device-neutral hint copy (touch correctness)

Two hints assume a mouse: Gallery "Hover any tile to release its colour. Click for the full image." and Offerings "Hover any tier to explore." On touch there is no hover (tiles are already in colour; tiers are a swipe shelf). Replace with device-neutral wording that reads correctly on both.

**Files:**
- Modify: `pages/GalleryPage.tsx:156`
- Modify: `pages/Offerings.tsx:219`

- [ ] **Step 1: Gallery hint** - in `pages/GalleryPage.tsx`, replace the lead text:

```
old:  Twelve signature compositions, each built once. Hover any tile to release its colour. Click for the full
new:  Twelve signature compositions, each built once. Select any tile to view it in full.
```
(Confirm the surrounding `<p>`/line wraps still close correctly after the edit.)

- [ ] **Step 2: Offerings hint** - in `pages/Offerings.tsx:219`, replace:

```
old:  <span>Hover any tier to explore</span>
new:  <span>Explore each tier</span>
```

- [ ] **Step 3: Verify no "Hover" in user-facing copy**:

```bash
grep -rn "Hover" app/src --include="*.tsx" | grep -v "Cursor.tsx"
```
Expected: no results (Cursor.tsx is an internal code comment, allowed).

- [ ] **Step 4: Build** - `cd app && npm run build` -> success.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/GalleryPage.tsx app/src/pages/Offerings.tsx
git commit -m "fix(copy): device-neutral hints (no hover) on gallery + offerings"
```

---

## Task 4: Lift the smallest mono labels to a readable size (readability)

Several mono meta labels render at 9.6-9.9px on phones - too small for a luxury feel. Lift the footer base line and both menu footers to ~11px. Leave the decorative "Scroll" cue and page kickers (>=10.6px) as-is (intentional editorial scale).

**Files:**
- Modify: `styles/footer.css` (`@media(max-width:640px)` `.oma-close-base` ~line 223)
- Modify: `styles/cinema.css` (`@media (max-width: 720px)` `.va-foot` ~line 669)
- Modify: `styles/cinema-chrome.css` (`@media (max-width: 720px)` `.va-foot` ~line 214)

- [ ] **Step 1: Footer base line** - in `styles/footer.css`, change the mobile `.oma-close-base` font-size from `.6rem` to `.7rem`:

```css
  .oma-close-base{flex-direction:column;gap:4px;text-align:center;font-size:.7rem}
```

- [ ] **Step 2: Home menu footer** - in `styles/cinema.css`, change the mobile `.va-foot` rule:

```css
  .va-foot { font-size: 0.72rem; letter-spacing: 0.18em; gap: 0.5rem; flex-wrap: wrap; }
```

- [ ] **Step 3: Deep-page menu footer** - in `styles/cinema-chrome.css`, change the mobile `.va-foot` rule identically:

```css
  .va-foot { font-size: 0.72rem; letter-spacing: 0.18em; gap: 0.5rem; flex-wrap: wrap; }
```

- [ ] **Step 4: Build** - `cd app && npm run build` -> success.

- [ ] **Step 5: Verify smallest font lifted** - reload http://localhost:5173/privacy/ (mobile 390), scroll to bottom, run:

```js
() => { let min=99; document.querySelectorAll('.oma-close-base span, .oma-close-base').forEach(e=>{const fs=parseFloat(getComputedStyle(e).fontSize); if(fs&&fs<min)min=fs}); return {footerBaseMinPx: Math.round(min*10)/10}; }
```
Expected: `footerBaseMinPx >= 11`.

- [ ] **Step 6: Commit**

```bash
git add app/src/styles/footer.css app/src/styles/cinema.css app/src/styles/cinema-chrome.css
git commit -m "fix(mobile): lift smallest footer/menu mono labels to ~11px"
```

---

## Task 5: Full-site regression sweep + sign-off

Confirm nothing regressed and capture the final state for the user's eyes-on review.

**Files:** none (verification only).

- [ ] **Step 1: Overflow sweep** - in the mobile-emulated page, run the standing overflow sweep snippet. Expected: every route `0` at 360px.

- [ ] **Step 2: Tap-target re-check** - on http://localhost:5173/ and `/offerings/foundation/`, run the Task 1 Step 6 snippet. Expected all >= the thresholds.

- [ ] **Step 3: Build** - `cd app && npm run build` -> success, 12 routes.

- [ ] **Step 4: Hand to user** - report the final diff summary and ask the user to eyeball http://localhost:5173/ on a real phone / narrow window: hero tagline legibility, footer proportion, menu cube + compact list, offering closing, concierge icons, the four fixed items above.

---

## Self-Review

- **Spec coverage:** Critique findings -> tasks: tap targets (T1), region/EST consistency (T2), hover copy (T3), small mono labels (T4), regression (T5). Offering-closing proportion, hero tagline legibility, ice-cube nav, concierge icons, footer marquee, overflow were already shipped in prior commits (d03cea9..8f1b013) and are re-verified in T5. No open critique item is unassigned.
- **Placeholder scan:** every code step shows exact CSS/markup; no TBD/TODO.
- **Consistency:** class/selector names (`.tier-link`, `.oma-close-nav .lnk`, `.oma-close-sign`, `.concierge-back`, `.oma-close-base`, `.va-foot`) match the live stylesheets verified during the critique. Region replacement string is identical everywhere ("New York Metropolitan Area"); eyebrow string identical ("Private Commission - New York").
- **Out of scope (needs user copy decision, not bugs):** EST format "EST." vs "Est." (renders uppercased via mono text-transform; left as-is); page kicker labels at 10.6-11.2px (intentional editorial scale); `hello@iceinstinct.com` placeholder email; Formspree/social URLs.
