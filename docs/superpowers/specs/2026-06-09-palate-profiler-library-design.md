# Palate Profiler -> Curated Library Matchmaker - Design

**Date:** 2026-06-09
**Status:** Approved (owner) - ready for implementation plan
**Feature:** S6 Palate Profiler (the "Compose your own signature" flow on /gallery/)

---

## Problem

The Profiler currently composes a cocktail two ways:
1. **Live Gemini** via `POST /api/profiler` (works only in dev via the Vite proxy).
2. **Deterministic fallback** (`resolveRecipe`) built from a small matrix.

In production (Hostinger static) `/api/profiler` does not exist, so every result
falls back to the matrix. Owner's verdict: the matrix is **cheap/fake** (a thin
combinatoric), and live Gemini would be **plastic** (unpredictable, off-brand).
He wants every result to be a **real, gorgeous, delicious cocktail**.

## Goal

Turn the Profiler into a **matchmaker over a curated library of real cocktails**.
The guest's three sensory choices return a genuine, hand-curated full recipe -
never generated, never faked. Scales by adding data.

## Decisions (locked with owner)

1. **Result = full recipe (a gift):** name + ingredients + measures + method +
   sensory narrative + colour + glass. Guest can download / print / share.
   The library is **NOT** the 13 secret signatures (those stay profile-only in
   the gallery) - it is curated/reworked cocktails that are fine to give away.
2. **Library = owner's ~60 + reworked greats:** owner supplies his ~60 recipes;
   we research modern-classics / signature riffs from renowned bars (Death & Co,
   Attaboy, IBA, etc.), **rework** (own proportions/twist), **rename**, and write
   our own narrative. Owner approves in batches.
   - Legal: ingredient lists + functional steps are not copyrightable; the
     creative name and authored prose/photos are. Rework + new name + our own
     text = clean. "Inspired by" credit optional, not required.
3. **No live AI in production.** Zero Gemini at runtime (no plastic). Gemini may
   be used only as an *authoring aid offline* by us, never user-facing.
4. **Scoring matcher**, not a rigid 1-combo-to-1-recipe table.

---

## Architecture

### Data: the library
New module `app/src/features/Profiler/cocktailLibrary.ts` exporting an array of:

```ts
export interface LibraryCocktail {
  id: string;                 // stable slug
  name: string;
  archetype: string;          // e.g. "The Lover"
  // Matching tags - arrays so one cocktail can satisfy several axes.
  tags: {
    identity: Identity[];     // 'Lover' | 'Rebel' | 'Mystic' | 'Hunter'
    taste: Taste[];           // 'Smoke' | 'Frost' | 'Ember' | 'Bloom'
    accord: Accord[];         // 'Bitter & Long' | 'Sweet & Short' | 'Spicy & Loud' | 'Dry & Silent'
    facets?: string[];        // optional: 'strong','low-abv','summer','winter','citrus','spirit-forward'...
  };
  // The recipe payload (same shape the result UI already renders).
  tagline: string;
  ingredients: string[];      // "2 oz Mezcal", ...
  instructions: string[];
  sensoryNarrative: string;
  colorProfile: string;
  tint: string;               // existing colour token used by the result tint
  glass: Glass;               // 'coupe' | 'rocks' | 'highball' | 'nicknora'
  sourceNote?: string;        // optional "inspired by ..." (internal or shown)
}
```

The axis types (`Identity`, `Taste`, `Accord`) are promoted from the current
string literals in `profilerData.ts` and shared. The existing `Recipe` interface
stays as the result shape; a `LibraryCocktail` maps to a `Recipe` 1:1 (omit
tags/id).

### Engine: the matcher
New `matchRecipe(selections, distill)` in `profilerData.ts` (replaces the
`resolveRecipe` fallback as the single engine):

- Score every library cocktail against the guest's `{identity, taste, accord}`:
  - identity match `+3`, taste match `+3`, accord match `+2` (tunable weights);
  - facet/temperament bonuses small (`+0.5`).
- Sort by score desc; stable secondary sort by `id` for determinism.
- Return the cocktail at index `distill % matches.length` of the top-scoring
  band, so **re-distill cycles** through equally-good matches for variety.
- If nothing scores above a floor, return the best available (never empty).

### Wiring
- `composeRecipe()` in `PalateProfiler.tsx`: **remove the `/api/profiler` fetch**
  entirely (it 404s in prod and adds latency). Call `matchRecipe()` directly.
- Delete the now-dead serverless path: the Vite `profilerProxy` plugin and
  `server/profilerHandler.ts` may be removed (or left unused) - removal preferred
  to keep the build honest. `vite.config.ts` loses the proxy + key read.
- The result UI, alchemy beat, share/print/download (`artifact.ts`), ambient,
  and the 3-step selection flow are **unchanged** - they already render `Recipe`.

### UI
No layout change. The 3 questions (Identity / Taste / Accord) stay. "Re-distill"
keeps its meaning (next match). The composed recipe renders in the existing
result card with download / print / Instagram share.

---

## Sourcing & rework workflow (the bulk of the work)

1. **Owner's ~60:** owner sends in batches (name + ingredients + method). We
   structure into `LibraryCocktail`, tag the three axes + facets, write/borrow
   the narrative in house voice.
2. **Reworked greats:** we research authentic recipes from renowned
   bartenders/classics, rework proportions/twist, **rename**, author our own
   narrative + colour, tag. Owner approves each batch before it ships.
3. Every entry is a pure data addition - no code change to grow the library.

---

## Phases

- **Phase 1 - engine swap (this plan):**
  - Promote axis types; add `cocktailLibrary.ts`; implement `matchRecipe`.
  - Rewrite `composeRecipe` to use the library; remove the `/api/profiler` fetch
    + Vite proxy + `profilerHandler.ts`.
  - Seed the library with a **starter set of ~24-30 real cocktails** (a first
    slice of owner's + reworked classics) so every one of the 64 combos resolves
    to a real recipe via scoring (4 identities x 4 tastes x 4 accords are covered
    by tagging breadth, not by 64 separate entries).
  - Verify: each combo returns a real recipe; re-distill varies; build clean;
    result card unchanged.
- **Phase 2 - grow the library (separate, ongoing):**
  - Add owner's full ~60 + more reworked greats in approved batches to ~100-120.
  - Pure data; no further engine work.

## Acceptance (Phase 1)

- No `/api/profiler` request fires in production (removed).
- Every Identity x Taste x Accord path returns a real library cocktail with full
  recipe; re-distill returns a different real match where one exists.
- Result card, share/print/download all still work; mobile + desktop clean.
- `npm run build` clean; no dead Gemini code shipped.

## Out of scope

- Live AI generation (explicitly rejected).
- Changing the 13 secret signatures (gallery profiles stay as-is).
- The 3-question UX layout (kept).
