# Hero Standardization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every standardized page's hero match the westchester-greenwich hero (the owner's reference / эталон), by moving the divergent per-page hero-photo law into one shared rule and aligning Group B page titles to the hero headline typography.

**Architecture:** The geo + occasion pages already share the westchester hero STRUCTURE (`.concierge` 50/50 stage, `.concierge-headline` at `--t-h1`, ghost word, image + scrim). The only real divergence is the hero PHOTO law: each page re-declared `.<page>-hero .concierge-image` rules that drifted apart (different timing, easing, brightness, missing hover-reveal, missing focus, missing reduced-motion guard; weddings/press have no rule at all so their photo is colour at rest). Fix = one canonical `.std-hero` rule (exact westchester values) in the already-shared offering.css, applied to every standardized hero, with the per-page duplicates deleted. westchester itself is NOT touched (it is the reference). Group B pages (Contact form, Legal, Journal) keep their functional tops; only their title typography is aligned.

**Tech Stack:** React (multi-page, one `main-*.tsx` entry per route) + Vite + plain CSS (per-page sheets layered over accent.css / styles.css / offering.css / sections.css). Hero headline auto-fit lives in `app/src/app/useCinemaChrome.ts` and already works; it is not changed.

---

## Scope (locked with owner 2026-06-16)

**EXCEPTIONS - never touched (own bespoke hero):** Home (landing), My Story, Offerings + children (bespoke / foundation / omakase / simplicity + standalone Omakase), Concierge, Gallery.

**westchester-greenwich = the reference.** It already carries the correct law. Do NOT edit `WestchesterGreenwich.tsx` or `geo-westchester-greenwich.css`.

**Group A - standardize the hero photo law (the real bug):** Manhattan, Hamptons, New Jersey, Events, Weddings, Corporate, Gift, Press, Work-with-us.

**Group B - align title typography only (no photo hero forced):** Legal x5 (Privacy, Terms, Cookies, Accessibility, Responsible-service), Journal (index + articles). Contact is a no-op (see Task 5).

**Out of scope (deferred, owner gate word "якори кнопку"):** the hero CTA pixel-anchor (events button top=855 vs westchester 870). There is no element literally named "feedback" in the code; the hero CTA is `.concierge-link`. Do not move it in this plan.

---

## Standard reference (source of truth = westchester)

From `app/src/styles/geo-westchester-greenwich.css:10-20`. Every standardized hero photo must end up byte-identical to this:

```css
/* monochrome at rest -> full colour on hover/focus, 0.8s ease, reduced-motion safe */
filter: grayscale(100%) contrast(1.06) brightness(0.92);   /* rest */
transition: filter 0.8s ease;
/* on :hover, :focus-within -> */
filter: grayscale(0%) contrast(1.02) brightness(1);
/* @media (prefers-reduced-motion: reduce) -> transition: none; */
```

Current divergence (what is being removed):

| Page | modifier class | rest | transition | hover reveal | focus-within | rm guard |
|---|---|---|---|---|---|---|
| westchester (REF) | `wg-hero` | grayscale .92 | 0.8s ease | yes | yes | yes |
| Manhattan | `geo-hero` | grayscale .92 | 0.6s cubic | yes | yes | NO; hover brightness .96 |
| Hamptons | `ham-hero` | grayscale .92 | 0.6s ease | yes | yes | NO |
| New Jersey | `njg-hero` | grayscale .92 | 0.6s cubic | yes | NO | NO |
| Events | `events-hero` | grayscale .92 | NONE | NO | NO | NO |
| Corporate | `corp-hero` | grayscale .92 | NONE | NO | NO | NO |
| Gift | `gift-hero` | grayscale .92 | NONE | NO | NO | NO |
| Work-with-us | `ww-hero` | grayscale .92 | NONE | NO | NO | NO |
| Weddings | (none) | COLOUR (offering default) | - | - | - | - |
| Press | (none) | COLOUR (offering default) | - | - | - | - |

---

## Phase 1 - Group A: unify the hero photo law

### Task 1: Add the canonical `.std-hero` rule to the shared sheet

**Files:**
- Modify: `app/src/styles/offering.css` (append after the `.concierge-image` block, around line 861)

- [ ] **Step 1: Confirm offering.css is loaded by every Group A page**

Run:
```bash
cd "app/src" && for p in manhattan hamptons newjersey events corporate gift weddings press workwithus; do printf "%-12s " "$p"; grep -c "offering.css" main-$p.tsx; done
```
Expected: every line prints `1`. (Verified 2026-06-16.) This is why the rule belongs in offering.css: one edit covers all nine, and because it is class-scoped to `.std-hero`, the exception pages that also load offering.css (OfferingPage, Concierge) are NOT affected.

- [ ] **Step 2: Append the canonical rule**

After the `.concierge-image-scrim` / `.concierge-image img` rules in `app/src/styles/offering.css` (around line 861), add:

```css
/* ============================================================
   STANDARD HERO PHOTO LAW - canonical, mirrors westchester (эталон).
   One source of truth for every standardized .concierge hero.
   Monochrome at rest -> full colour on hover/focus. Exceptions
   (Home, My Story, Offerings, Concierge, Gallery) never carry
   .std-hero, so they stay untouched. westchester keeps its own
   identical wg-hero rule and is the live reference.
   ============================================================ */
.std-hero .concierge-image img {
  filter: grayscale(100%) contrast(1.06) brightness(0.92);
  transition: filter 0.8s ease;
}
.std-hero .concierge-image:hover img,
.std-hero .concierge-image:focus-within img {
  filter: grayscale(0%) contrast(1.02) brightness(1);
}
@media (prefers-reduced-motion: reduce) {
  .std-hero .concierge-image img { transition: none; }
}
```

- [ ] **Step 3: Verify the rule landed (lightweight - full build is deferred to Task 6)**

Run: `grep -n "std-hero" app/src/styles/offering.css`
Expected: the three `.std-hero ...` selectors are present and the block is well-formed (balanced braces). The heavy `npm run build` (tsc + vite + prerender + llms) runs once at the end in Task 6; do not run it per task.

- [ ] **Step 4: Commit**

```bash
git add app/src/styles/offering.css
git commit -m "feat(hero): add canonical .std-hero photo law (mirrors westchester)"
```

---

### Task 2: Switch every Group A hero to `.std-hero` and delete the per-page duplicate

**Files (TSX class swap + CSS rule deletion):**
- `app/src/pages/Manhattan.tsx:138` + `app/src/styles/geo-manhattan.css:13-20`
- `app/src/pages/Hamptons.tsx:135` + `app/src/styles/geo-hamptons.css:9-16`
- `app/src/pages/NewJersey.tsx:137` + `app/src/styles/geo-new-jersey.css:13-19`
- `app/src/pages/Events.tsx:154` + `app/src/styles/events.css:9-11`
- `app/src/pages/Corporate.tsx:137` + `app/src/styles/corporate.css:9-11`
- `app/src/pages/Gift.tsx:191` + `app/src/styles/gift.css:9-11`
- `app/src/pages/WorkWithUs.tsx:218` + `app/src/styles/workwithus.css:11-13`
- `app/src/pages/Weddings.tsx:157` (no CSS rule to delete)
- `app/src/pages/Press.tsx:181` (no CSS rule to delete)

- [ ] **Step 1: Manhattan** - in `Manhattan.tsx` change `<section className="concierge geo-hero">` to `<section className="concierge std-hero">`. In `geo-manhattan.css` delete lines 13-20 (the `.geo-hero .concierge-image img { ... }` rest rule AND the `.geo-hero .concierge-image:hover img, .geo-hero .concierge-image:focus-within img { ... }` reveal rule). Leave the rest of the file (ledger / prose links) intact.

- [ ] **Step 2: Hamptons** - in `Hamptons.tsx` change `<section className="concierge ham-hero">` to `<section className="concierge std-hero">`. In `geo-hamptons.css` delete lines 9-16 (`.ham-hero .concierge-image img {...}` + `.ham-hero .concierge-image:hover img, .ham-hero .concierge-image:focus-within img {...}`).

- [ ] **Step 3: New Jersey** - in `NewJersey.tsx` change `<section className="concierge njg-hero">` to `<section className="concierge std-hero">`. In `geo-new-jersey.css` delete lines 13-19 (`.njg-hero .concierge-image img {...}` + `.njg-hero .concierge-image:hover img {...}`). Note: this page was missing `:focus-within` entirely - `.std-hero` restores it.

- [ ] **Step 4: Events** - in `Events.tsx` change `<section className="concierge events-hero">` to `<section className="concierge std-hero">`. In `events.css` delete lines 9-11 (`.events-hero .concierge-image img {...}`). Note: this page had NO hover-reveal - `.std-hero` adds it.

- [ ] **Step 5: Corporate** - in `Corporate.tsx` change `<section className="concierge corp-hero">` to `<section className="concierge std-hero">`. In `corporate.css` delete lines 9-11 (`.corp-hero .concierge-image img {...}`).

- [ ] **Step 6: Gift** - in `Gift.tsx` change `<section className="concierge gift-hero">` to `<section className="concierge std-hero">`. In `gift.css` delete lines 9-11 (`.gift-hero .concierge-image img {...}`).

- [ ] **Step 7: Work-with-us** - in `WorkWithUs.tsx` change `<section className="concierge ww-hero">` to `<section className="concierge std-hero">`. In `workwithus.css` delete lines 11-13 (`.ww-hero .concierge-image img {...}`).

- [ ] **Step 8: Weddings** - in `Weddings.tsx` change `<section className="concierge">` (the hero `<section>` immediately followed by `<span className="hg-base">WEDDINGS</span>`) to `<section className="concierge std-hero">`. No CSS deletion (weddings has no per-page hero rule; this is the page that was showing a COLOUR photo at rest, now fixed).

- [ ] **Step 9: Press** - in `Press.tsx` change `<section className="concierge">` (the hero `<section>` immediately followed by `<span className="hg-base">PRESS</span>`) to `<section className="concierge std-hero">`. No CSS deletion (same colour-at-rest fix as weddings).

- [ ] **Step 10: Confirm no orphaned modifier rules remain**

Run:
```bash
cd "app/src" && grep -rn "geo-hero\|ham-hero\|njg-hero\|events-hero\|corp-hero\|gift-hero\|ww-hero" styles/ pages/
```
Expected: NO matches (every bespoke hero modifier is gone). `wg-hero` (westchester reference) is intentionally still present and must NOT appear in this list because we only grepped the removed ones.

- [ ] **Step 11: Type-check (lightweight - full build is deferred to Task 6)**

Run: `cd app && npx tsc --noEmit`
Expected: no type errors (the nine TSX className edits are valid JSX). Full `npm run build` runs once in Task 6.

- [ ] **Step 12: Commit**

```bash
git add app/src/pages/Manhattan.tsx app/src/pages/Hamptons.tsx app/src/pages/NewJersey.tsx app/src/pages/Events.tsx app/src/pages/Corporate.tsx app/src/pages/Gift.tsx app/src/pages/WorkWithUs.tsx app/src/pages/Weddings.tsx app/src/pages/Press.tsx app/src/styles/geo-manhattan.css app/src/styles/geo-hamptons.css app/src/styles/geo-new-jersey.css app/src/styles/events.css app/src/styles/corporate.css app/src/styles/gift.css app/src/styles/workwithus.css
git commit -m "feat(hero): all Group A heroes use .std-hero, drop per-page photo rules"
```

---

## Phase 2 - Group B: align title typography to the hero standard

The hero headline standard (from `offering.css:873`) is: `font-family: var(--font-display); font-weight: 700; font-size: var(--t-h1); line-height: 0.92; letter-spacing: -0.05em;` with the `.it` accent in italic champagne. Group B keeps its functional top; only the title is brought to this scale/voice.

### Task 3: Legal title -> hero headline typography

**Files:**
- Modify: `app/src/styles/styles.css:2782` (`.legal-head h1`)

- [ ] **Step 1: Read the current rule to confirm tokens**

Run: `grep -n "legal-head h1\|--font-display\|--t-h1" app/src/styles/styles.css app/src/styles/accent.css | head`
Expected: `.legal-head h1 { font-size: var(--t-h2); ... }`, plus `--font-display` defined in styles.css and `--t-h1` defined in accent.css (both loaded on legal pages).

- [ ] **Step 2: Replace the rule**

Change `app/src/styles/styles.css:2782` from:
```css
.legal-head h1 { font-size: var(--t-h2); margin-bottom: var(--s-xs); }
```
to:
```css
.legal-head h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--t-h1);
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin-bottom: var(--s-xs);
}
```

- [ ] **Step 3: Verify (lightweight)**

Run: `grep -n "legal-head h1" app/src/styles/styles.css`
Expected: the rule now uses `var(--t-h1)` + display font. Full build is deferred to Task 6.

- [ ] **Step 4: Commit**

```bash
git add app/src/styles/styles.css
git commit -m "feat(hero): legal page titles match hero headline typography (--t-h1)"
```

### Task 4: Journal title -> hero headline scale

**Files:**
- Modify: `app/src/styles/journal.css:61-70` (`.jr-title`) - covers Journal index AND articles (shared `.jr-hero`).

- [ ] **Step 1: Update the size to the hero token**

In `app/src/styles/journal.css`, in the `.jr-title` rule change:
```css
  font-size: clamp(2.4rem, 1.4rem + 4vmin, 4.8rem);
  line-height: 1.02;
```
to:
```css
  font-size: var(--t-h1);
  line-height: 0.95;
```
Leave `font-family: var(--sec-display)`, `font-weight: 700`, `letter-spacing: -0.04em`, `text-wrap: balance`, and the `.jr-title .it` italic accent unchanged (they already match the hero voice).

- [ ] **Step 2: Verify (lightweight)**

Run: `grep -n "font-size: var(--t-h1)" app/src/styles/journal.css`
Expected: `.jr-title` now uses `var(--t-h1)`. Full build is deferred to Task 6.

- [ ] **Step 3: Commit**

```bash
git add app/src/styles/journal.css
git commit -m "feat(hero): journal title matches hero headline scale (--t-h1)"
```

### Task 5: Contact - verify no-op

**Files:** none expected.

- [ ] **Step 1: Confirm Contact has no hero title to change**

Run: `grep -n "concierge-headline\|closing-title\|inquire-" app/src/pages/Contact.tsx | head`
Expected: Contact has NO `.concierge-headline`; its only title is `.closing-title` ("Begin the conversation.") inside `.closing-segment.inquire-close`, which already follows the sitewide closing standard (shipped last session). Therefore Contact needs no typography change. Record this in the session notes and move on. If the owner later wants the Contact card title rescaled, that is a closing-segment change, not a hero change.

---

## Phase 3 - verify and deploy

### Task 6: Full build, visual matrix, deploy, live verify

- [ ] **Step 1: Clean build**

Run: `cd app && npm run build`
Expected: tsc passes, vite build + prerender + llms succeed, no errors.

- [ ] **Step 2: Local visual matrix (dev server)**

Run: `cd app && npm run dev`, then for each Group A route confirm: hero photo is MONOCHROME at rest, transitions to FULL COLOUR on hover/focus over ~0.8s, identical feel to /westchester-greenwich/.
Routes: `/manhattan/ /hamptons/ /new-jersey/ /events/ /weddings/ /corporate/ /gift/ /press/ /work-with-us/`.
Group B: `/journal/` + one `/journal/<slug>/` and one legal route (e.g. `/privacy/`) show the title at hero scale.
Special attention: Weddings and Press must now be monochrome-at-rest (they were colour before).

- [ ] **Step 3: Confirm exceptions are untouched**

Spot-check `/` (Home), `/my-story/`, `/offerings/` + a child (e.g. `/offerings/omakase/`), `/concierge/`, `/gallery/`: their heroes look exactly as before (none carry `.std-hero`).

- [ ] **Step 4: Deploy (owner-gated)**

Per project rule, push to `main` auto-deploys LIVE to Hostinger. Do NOT push without the owner's explicit OK. When approved:
```bash
git push origin main
```

- [ ] **Step 5: Live verification (the only verdict that counts)**

After deploy, on the real domain confirm each Group A hero photo reveals colour on hover and matches westchester, and Group B titles render at hero scale. The owner judges the LIVE render only.

---

## Self-Review notes

- **Spec coverage:** Group A photo-law unification (Tasks 1-2) = the reported "heroes not identical to westchester" bug. Group B typography (Tasks 3-5) = the owner's chosen "typography only" treatment. Exceptions explicitly excluded. Deferred button-anchor explicitly out of scope.
- **No exception bleed:** `.std-hero` is opt-in per section; OfferingPage / Concierge load offering.css but never carry `.std-hero`, so the canonical rule cannot touch them. Verified the grep guard in Task 2 Step 10.
- **westchester untouched:** no task edits `WestchesterGreenwich.tsx` or `geo-westchester-greenwich.css`; it stays the live reference.
- **Type/selector consistency:** one class name `std-hero` used in every Task 2 substep and in the offering.css rule. Tokens `--t-h1`, `--font-display`, `--sec-display` confirmed loaded on the relevant pages.
- **No em-dashes/en-dashes** anywhere in this file (project hook requirement).
