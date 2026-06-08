# Spec - Gallery Recipe Drawer ("The Collection, opened")

**Date:** 2026-06-02
**Status:** Locked for build (pending Temo review)
**Where it lives:** `/gallery/` page - upgrades the existing horizontal cocktail track.
**Part of:** React migration. Idea #4. Ported from ANTIGRAVITY `SignatureLibrary.tsx` (click -> detail drawer with metrics), applied to our real 12 cocktails, rebuilt in brand language.

---

## Problem Statement

`/gallery/` currently shows 12 cocktail tiles; clicking one opens only a larger image. The tiles already promise **"View Ritual"** - but no ritual appears, so the promise is broken. Worse, the page largely **duplicates** the homepage gallery teaser, giving the visitor no reason to be here. A signature collection with no depth is a dead end.

## Goals

1. **Fulfil the "View Ritual" promise** - clicking a cocktail opens its full story: name, narrative, ingredients, serving ritual, and a sensory flavour profile.
2. **Make `/gallery/` a destination, not a duplicate** - depth and usefulness the homepage teaser does not have.
3. **Showcase craft** - each composition reads as a considered, one-of-one creation.
4. **Earn discoverability** - real recipe text gives search engines and AI assistants something to cite.
5. **Hold the brand + rhyme with the Profiler** - the recipe drawer uses the same "formula" language as the Palate Profiler card.

## Non-Goals

- **Not a shop / order button on each card.** A single "Commission a ritual" CTA routes to Inquiry; no per-cocktail checkout. (We are by-appointment.)
- **Not editable by visitors / user-generated.** The collection is curated by Temo only. (Curation = the luxury.) **It is NOT a fixed count** - Temo reserves the right to grow it (12 today, 20 later); see R9.
- **No glass/blur/gold** from the ANTIGRAVITY source; rebuilt monochrome + champagne.
- **Not replacing the homepage gallery teaser** - the teaser stays a teaser; this page is the full archive.
- **No AI generation here** - these are real, authored recipes (unlike the Profiler's generated ones).

## The Experience (happy path)

1. Visitor lands on `/gallery/` - the existing horizontal track of 12 cocktails (B&W, colour on hover, "View Ritual" label) is unchanged.
2. **Click a cocktail** -> a detail **drawer** slides in (side on desktop, full-screen sheet on mobile) over a dark scrim.
3. The drawer shows, in our editorial language:
   - the cocktail **image** (full colour here - product, allowed),
   - **name** + one-line subtitle,
   - **narrative** (short story),
   - **ingredients** list + **serving ritual**,
   - a **sensory profile** - animated champagne metric bars (e.g. sweet / sour / bitter / aromatic / strength).
4. Close returns to the track at the same position. A single **"Commission a ritual"** CTA in/under the drawer routes to Inquiry.

## User Stories

- As a curious visitor, I want to open a cocktail and read its full ritual and ingredients, so the "View Ritual" promise is kept and I understand the craft.
- As a visitor comparing the collection, I want to see each cocktail's flavour profile at a glance, so I can find what appeals to me.
- As an interested guest, I want a clear way to commission from the collection, so I can act on what I liked.
- As a phone visitor, I want the detail to open as a comfortable full-screen sheet, so it is readable on a small screen.
- As a returning visitor, I want closing a cocktail to keep my place in the track, so I can browse several without losing position.

## Requirements

### Must-Have (P0)
- **R1 Click tile -> recipe drawer.** AC: clicking any of the 12 tiles opens its drawer; the drawer is keyed to that cocktail's data.
- **R2 Drawer content** = image, name, subtitle, narrative, ingredients[], ritual, sensory metrics. AC: every cocktail shows all fields; no empty/placeholder sections.
- **R3 Animated sensory metric bars** (champagne fill). AC: bars animate to each value on open; labels + values legible.
- **R4 Brand-language drawer** - monochrome chrome + champagne, corner ticks like the closing CTA; cocktail image may be full colour (product). AC: no blur/glass/gold; matches the Profiler "formula" card family.
- **R5 Close keeps track position.** AC: closing returns to the same scroll spot in the horizontal track.
- **R6 "Commission a ritual" CTA -> Inquiry**, carrying the cocktail name. AC: CTA opens Inquiry pre-filled with the cocktail.
- **R7 Mobile + reduced-motion.** AC: drawer is a full-screen sheet on <=375px; with `prefers-reduced-motion`, bars set instantly, drawer fades without slide.
- **R8 Real recipe data for every cocktail** (content). AC: each cocktail has authored narrative, ingredients, ritual, and metric values - no placeholders.
- **R9 Extensible, data-driven collection (any count).** The gallery renders from a single cocktail data list of arbitrary length; adding one cocktail = adding one entry (image + name + subtitle + narrative + ingredients + ritual + metrics) with **zero code changes**. AC: appending an entry produces its tile + drawer automatically; the position counter and progress are dynamic (`01 / N`, not hardcoded `/12`); removing an entry cleanly removes its tile. Each new card holds full brand parity (drawer + metrics + CTA) identical to existing ones.

### Nice-to-Have (P1)
- 3D mouse-tilt on tiles (the ANTIGRAVITY parallax) for tactility.
- Keyboard + swipe navigation between cocktails inside the drawer (prev/next).
- Deep link per cocktail (`/gallery/#white-lotus`) for sharing.

### Future (P2)
- A "compose something like this" link from a cocktail into the Palate Profiler seeded by its profile.
- Per-cocktail short cinemagraph instead of still.

## Tech Approach

- **Stack:** React 19 + TS + Vite; **Motion** for the drawer (`AnimatePresence`, slide/sheet) + metric-bar animation. Track stays GSAP/existing horizontal mechanic.
- **Data:** a single typed `cocktails` array (id, name, subtitle, image, narrative, ingredients[], ritual, metrics{}) - **extensible, any length** (12 today, grows over time). Track, tiles, drawer, and counter all render from it; adding a cocktail = one new entry, no code surgery. Mirrors the Profiler result shape so the two share visual components where sensible. (Data lives in one editable file; a new cocktail = drop the image + fill its fields.)
- **Port note:** reuse ANTIGRAVITY `SignatureLibrary` drawer/metric structure; discard backdrop-blur, gold, Unsplash; swap to our 12 real cocktails + real images.
- **Inquiry handoff:** CTA lifts cocktail name into the shared Inquiry state (same channel as the Profiler).

## Success Metrics

**Leading (days):**
- Drawer open rate (tile click -> drawer) - target >= 50% of gallery visitors.
- Cocktails opened per session - target >= 3.
- Dwell time on `/gallery/` vs current - target +60%.
- "Commission a ritual" click-through from gallery - target >= 10% of drawer-openers.

**Lagging (weeks):**
- `/gallery/` is no longer a bounce/dead page: scroll-depth + time-on-page lift; reduced exit rate.
- Organic/AI discovery: gallery recipe text surfaced in search / AI answers.
- Inquiries attributed to a gallery cocktail.

## Open Questions
- **(Content, blocking R8)** Source of the 12 recipes - does Temo supply real ingredients/ritual/metrics, or do we draft and he approves? Lean: draft on-brand, Temo approves.
- **(Design, non-blocking)** Which 5 metric axes (sweet/sour/bitter/aromatic/strength vs the Profiler's sweet/sour/bitter/umami/complexity) - align both for consistency. Lean: one shared 5-axis set across Gallery + Profiler.

## Timeline / Phasing
- Depends on the React migration shell + the cocktail data being authored (R8).
- Shares components with the Palate Profiler card (build Profiler card first, reuse here) and the Inquiry modal (R6).
- Phasing: migration shell -> drawer + data (this spec) -> P1 tilt/prev-next/deep-link polish.
