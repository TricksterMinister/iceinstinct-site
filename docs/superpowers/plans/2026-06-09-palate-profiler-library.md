# Palate Profiler Library Matchmaker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Profiler's matrix/Gemini composer with a matchmaker over a curated library of real cocktails - the guest's 3 choices return a genuine, full, hand-curated recipe.

**Architecture:** A data module `cocktailLibrary.ts` holds tagged real cocktails. A pure `matchRecipe(selections, distill)` scores the library against the guest's Identity/Taste/Accord choices and returns the best match (re-distill cycles equally-good matches). The existing result UI renders the returned `Recipe` unchanged. The dead `/api/profiler` Gemini path (fetch + Vite proxy + handler) is removed.

**Tech Stack:** React 19 + TypeScript + Vite. New dev dependency: vitest (matcher unit test only; not in the production bundle).

**Spec:** `docs/superpowers/specs/2026-06-09-palate-profiler-library-design.md`

**Process locks:** No live AI at runtime. Recipe content is real (owner's reworked + reworked classics, renamed, own prose - owner approves batches). No em-dashes/en-dashes (hook blocks them). Build/deploy: `cd app && npm run build`, then dist payload to repo root, push main with owner ok (auto-deploys). Verify on live, never via local browser tabs (owner directive).

---

## File Structure

- Create: `app/src/features/Profiler/cocktailLibrary.ts` - the tagged real-cocktail library + `LibraryCocktail` type + axis types.
- Modify: `app/src/features/Profiler/profilerData.ts` - export axis types; add `matchRecipe`; remove `resolveRecipe` matrix engine.
- Modify: `app/src/features/Profiler/PalateProfiler.tsx` - `composeRecipe` calls `matchRecipe` directly; remove the `/api/profiler` fetch.
- Modify: `app/vite.config.ts` - remove `profilerProxy` plugin + server key read.
- Delete: `app/server/profilerHandler.ts` (and `app/server/` if it becomes empty).
- Create: `app/src/features/Profiler/matchRecipe.test.ts` - vitest unit test for the matcher.
- Create: `app/vitest.config.ts` - minimal vitest config (node env).
- Modify: `app/package.json` - add `vitest` devDependency + `"test": "vitest run"`.

---

## Task 1: Axis types + library module with seed cocktails

**Files:**
- Modify: `app/src/features/Profiler/profilerData.ts` (add exported axis types near the top, after `StepId`)
- Create: `app/src/features/Profiler/cocktailLibrary.ts`

- [ ] **Step 1: Add exported axis types to `profilerData.ts`**

Add these exported types immediately after the existing `export type Glass = ...` line:

```ts
export type Identity = 'Lover' | 'Rebel' | 'Mystic' | 'Hunter';
export type Taste = 'Smoke' | 'Frost' | 'Ember' | 'Bloom';
export type Accord = 'Bitter & Long' | 'Sweet & Short' | 'Spicy & Loud' | 'Dry & Silent';
```

- [ ] **Step 2: Create `cocktailLibrary.ts` with the type and three real seed cocktails**

These three are reworked, renamed modern classics (Oaxaca Old Fashioned, Last Word, Penicillin) with our own narrative - the canonical pattern for every future entry. Write the file exactly:

```ts
import type { Glass, Identity, Taste, Accord } from './profilerData';

export interface LibraryCocktail {
  id: string;
  name: string;
  archetype: string;
  tags: {
    identity: Identity[];
    taste: Taste[];
    accord: Accord[];
    facets?: string[];
  };
  tagline: string;
  ingredients: string[];
  instructions: string[];
  sensoryNarrative: string;
  colorProfile: string;
  tint: string;
  glass: Glass;
  sourceNote?: string;
}

// Real, reworked, renamed cocktails. Ingredient lists + steps are not
// copyrightable; names and prose are ours. Grow this array (Phase 2) - the
// matcher needs no changes.
export const cocktailLibrary: LibraryCocktail[] = [
  {
    id: 'ember-vow',
    name: 'Ember Vow',
    archetype: 'The Hunter',
    tags: { identity: ['Hunter', 'Mystic'], taste: ['Smoke'], accord: ['Dry & Silent'], facets: ['spirit-forward', 'agave'] },
    tagline: 'A smoked agave oath - direct, dry, and unhurried.',
    ingredients: [
      '1.5 oz Mezcal',
      '0.5 oz Reposado Tequila',
      '1 bar spoon Agave nectar',
      '2 dashes Angostura bitters',
    ],
    instructions: [
      'Stir all with ice until cold and silken.',
      'Strain over one large clear cube in a rocks glass.',
      'Express an orange peel over the surface and rest it on the ice.',
    ],
    sensoryNarrative: 'Woodsmoke first, then warm agave and a dry bitter spine. It opens slowly and finishes clean.',
    colorProfile: 'Burnt amber over crystal ice',
    tint: 'oklch(62% 0.09 70)',
    glass: 'rocks',
    sourceNote: 'Reworked from the Oaxaca Old Fashioned',
  },
  {
    id: 'frost-verdict',
    name: 'Frost Verdict',
    archetype: 'The Rebel',
    tags: { identity: ['Rebel', 'Mystic'], taste: ['Frost'], accord: ['Bitter & Long'], facets: ['herbal', 'citrus'] },
    tagline: 'Equal parts, opposite forces - a green, herbal reckoning.',
    ingredients: [
      '0.75 oz Gin',
      '0.75 oz Green Chartreuse',
      '0.75 oz Maraschino liqueur',
      '0.75 oz Fresh lime juice',
    ],
    instructions: [
      'Shake hard with ice until frost forms on the tin.',
      'Double-strain into a chilled coupe.',
      'No garnish - let the green speak.',
    ],
    sensoryNarrative: 'Alpine herbs and bright lime over juniper, bracing and faintly minty, with a long bitter cool.',
    colorProfile: 'Pale chartreuse green',
    tint: 'oklch(82% 0.1 140)',
    glass: 'coupe',
    sourceNote: 'Reworked from the Last Word',
  },
  {
    id: 'ember-remedy',
    name: 'Ember Remedy',
    archetype: 'The Lover',
    tags: { identity: ['Lover', 'Hunter'], taste: ['Ember', 'Smoke'], accord: ['Spicy & Loud'], facets: ['honey', 'ginger'] },
    tagline: 'Honey, ginger and smoke - warmth that answers back.',
    ingredients: [
      '2 oz Blended Scotch',
      '0.75 oz Fresh lemon juice',
      '0.75 oz Honey-ginger syrup',
      '0.25 oz Islay single malt (float)',
    ],
    instructions: [
      'Shake Scotch, lemon and honey-ginger syrup with ice.',
      'Strain over fresh ice in a rocks glass.',
      'Float the Islay malt across the top; garnish with candied ginger.',
    ],
    sensoryNarrative: 'Spiced ginger heat and honey first, then a peat-smoke breath on the finish.',
    colorProfile: 'Golden amber, smoke on the nose',
    tint: 'oklch(74% 0.1 80)',
    glass: 'rocks',
    sourceNote: 'Reworked from the Penicillin',
  },
];
```

- [ ] **Step 3: Type-check the new module compiles**

Run: `cd app && npx tsc --noEmit`
Expected: no errors (the three seed entries satisfy `LibraryCocktail`; axis types resolve).

- [ ] **Step 4: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/eloquent-hawking-d17d2e"
git add app/src/features/Profiler/profilerData.ts app/src/features/Profiler/cocktailLibrary.ts
git commit -m "feat(profiler): cocktail library type + axis types + seed cocktails"
```

---

## Task 2: The matcher (`matchRecipe`) with a vitest test

**Files:**
- Create: `app/vitest.config.ts`
- Modify: `app/package.json`
- Create: `app/src/features/Profiler/matchRecipe.test.ts`
- Modify: `app/src/features/Profiler/profilerData.ts` (add `matchRecipe`, remove `resolveRecipe`)

- [ ] **Step 1: Add vitest config**

Create `app/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 2: Add vitest to package.json**

Run:

```bash
cd app && npm install -D vitest
```

Then add to `package.json` "scripts" (keep existing scripts):

```json
"test": "vitest run"
```

- [ ] **Step 3: Write the failing test**

Create `app/src/features/Profiler/matchRecipe.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { matchRecipe, type Selections, type Identity, type Taste, type Accord } from './profilerData';

const IDENTITIES: Identity[] = ['Lover', 'Rebel', 'Mystic', 'Hunter'];
const TASTES: Taste[] = ['Smoke', 'Frost', 'Ember', 'Bloom'];
const ACCORDS: Accord[] = ['Bitter & Long', 'Sweet & Short', 'Spicy & Loud', 'Dry & Silent'];

describe('matchRecipe', () => {
  it('returns a complete real recipe for every one of the 64 paths', () => {
    for (const identity of IDENTITIES)
      for (const taste of TASTES)
        for (const accord of ACCORDS) {
          const sel: Selections = { identity, taste, accord };
          const r = matchRecipe(sel, 'instinct', 0);
          expect(r.name.length).toBeGreaterThan(0);
          expect(r.ingredients.length).toBeGreaterThan(0);
          expect(r.instructions.length).toBeGreaterThan(0);
          expect(r.sensoryNarrative.length).toBeGreaterThan(0);
        }
  });

  it('is deterministic for the same inputs', () => {
    const sel: Selections = { identity: 'Hunter', taste: 'Smoke', accord: 'Dry & Silent' };
    expect(matchRecipe(sel, 'instinct', 0).name).toBe(matchRecipe(sel, 'instinct', 0).name);
  });

  it('re-distill returns a different match when more than one exists', () => {
    // 'Smoke' tag is shared by at least two seed cocktails -> rotation should differ.
    const sel: Selections = { identity: 'Hunter', taste: 'Smoke', accord: 'Dry & Silent' };
    const first = matchRecipe(sel, 'instinct', 0).name;
    const second = matchRecipe(sel, 'instinct', 1).name;
    // With >=2 candidates these differ; with exactly 1 they are equal. Assert it
    // never throws and always returns a real name.
    expect(second.length).toBeGreaterThan(0);
    if (countCandidates(sel) > 1) expect(second).not.toBe(first);
  });
});

// Local helper mirrors the matcher's candidate count for the assertion guard.
function countCandidates(sel: Selections): number {
  // Imported lazily to avoid coupling the test to internals beyond the public API.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { cocktailLibrary } = require('./cocktailLibrary');
  return cocktailLibrary.filter(
    (c: { tags: { taste: string[] } }) => c.tags.taste.includes(sel.taste as string),
  ).length;
}
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `cd app && npm test`
Expected: FAIL - `matchRecipe` is not exported from `profilerData`.

- [ ] **Step 5: Implement `matchRecipe` and remove `resolveRecipe`**

In `app/src/features/Profiler/profilerData.ts`: delete the `resolveRecipe` function and the matrix helpers it depends on that are now unused (`BASES`, `NAMES`, `MODIFIERS`, `ACCORD_INGREDIENTS`, `ACCORD_GLASS`, `COLOUR`, `GARNISH`, `ALT_GARNISH`, `RITUAL`, `NARRATIVES`, `EDITIONS`, `fallbackOf` - remove only those actually unused after this change; keep `steps`, `labelFor`, `Recipe`, `Selections`, `StepId`, `Glass`, axis types). Add the matcher:

```ts
import { cocktailLibrary, type LibraryCocktail } from './cocktailLibrary';
import type { Temperament } from '../../app/funnelStore';

const W_IDENTITY = 3;
const W_TASTE = 3;
const W_ACCORD = 2;

function score(c: LibraryCocktail, sel: Selections): number {
  let s = 0;
  if (sel.identity && c.tags.identity.includes(sel.identity as Identity)) s += W_IDENTITY;
  if (sel.taste && c.tags.taste.includes(sel.taste as Taste)) s += W_TASTE;
  if (sel.accord && c.tags.accord.includes(sel.accord as Accord)) s += W_ACCORD;
  return s;
}

function toRecipe(c: LibraryCocktail): Recipe {
  return {
    name: c.name,
    tagline: c.tagline,
    ingredients: c.ingredients,
    instructions: c.instructions,
    sensoryNarrative: c.sensoryNarrative,
    colorProfile: c.colorProfile,
    tint: c.tint,
    glass: c.glass,
    archetype: c.archetype,
  };
}

/**
 * Score every library cocktail against the guest's choices and return the best
 * real match. `distill` cycles through the equally-top-scoring band so re-distill
 * offers variety. Always returns a real recipe (never empty); temperament is
 * accepted for signature compatibility and unused in scoring for now.
 */
export function matchRecipe(sel: Selections, _temperament: Temperament, distill = 0): Recipe {
  const ranked = cocktailLibrary
    .map((c) => ({ c, s: score(c, sel) }))
    .sort((a, b) => (b.s - a.s) || a.c.id.localeCompare(b.c.id));

  const topScore = ranked[0].s;
  const band = ranked.filter((r) => r.s === topScore).map((r) => r.c);
  const pick = band[distill % band.length];
  return toRecipe(pick);
}
```

Note: `Selections` fields are strings; the `as Identity`/`as Taste`/`as Accord` casts match them to the tag arrays. `Recipe`, `Selections`, `Identity`, `Taste`, `Accord` are all already exported from this file.

- [ ] **Step 6: Run the test to verify it passes**

Run: `cd app && npm test`
Expected: PASS (3 tests).

- [ ] **Step 7: Type-check**

Run: `cd app && npx tsc --noEmit`
Expected: no errors. If `tsc` reports unused removed helpers still referenced, delete those references too.

- [ ] **Step 8: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/eloquent-hawking-d17d2e"
git add app/vitest.config.ts app/package.json app/package-lock.json app/src/features/Profiler/matchRecipe.test.ts app/src/features/Profiler/profilerData.ts
git commit -m "feat(profiler): scoring matchRecipe over the library + vitest test; drop matrix engine"
```

---

## Task 3: Wire the Profiler to the matcher; remove the `/api/profiler` fetch

**Files:**
- Modify: `app/src/features/Profiler/PalateProfiler.tsx:69-90` (the `composeRecipe` function)

- [ ] **Step 1: Replace `composeRecipe` with a direct matcher call**

Replace the entire `composeRecipe` function (currently lines ~69-90, the one that does `await fetch('/api/profiler', ...)`) with:

```ts
async function composeRecipe(selections: Selections, distill: number): Promise<Recipe> {
  const temperament = funnel.getState().temperament;
  // Curated library matchmaker - no network, no AI at runtime.
  return matchRecipe(selections, temperament, distill);
}
```

- [ ] **Step 2: Update the import**

In `PalateProfiler.tsx`, the import block from `./profilerData` currently includes `resolveRecipe`. Change it to import `matchRecipe` instead. The import should read:

```ts
import {
  steps,
  matchRecipe,
  type Recipe,
  type Selections,
  type StepId,
} from './profilerData';
```

(Remove `resolveRecipe` from that import if present.)

- [ ] **Step 3: Type-check + test**

Run: `cd app && npx tsc --noEmit && npm test`
Expected: no type errors; tests pass.

- [ ] **Step 4: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/eloquent-hawking-d17d2e"
git add app/src/features/Profiler/PalateProfiler.tsx
git commit -m "feat(profiler): compose from the curated library, drop the /api/profiler fetch"
```

---

## Task 4: Remove the dead Gemini serverless path

**Files:**
- Modify: `app/vite.config.ts` (remove `profilerProxy` plugin, `readServerKey`, `composeWithGemini` import)
- Delete: `app/server/profilerHandler.ts`

- [ ] **Step 1: Strip the proxy from `vite.config.ts`**

Remove: the `import { composeWithGemini, type Choices } from './server/profilerHandler';` line; the `readServerKey()` function; the `profilerProxy()` plugin function; and `profilerProxy()` from the `plugins: [react(), profilerProxy()]` array (leave `plugins: [react()]`). Leave the rest of the config (build inputs, dedupe, optimizeDeps) untouched.

- [ ] **Step 2: Delete the handler**

```bash
cd app && git rm server/profilerHandler.ts && rmdir server 2>/dev/null || true
```

- [ ] **Step 3: Type-check + build**

Run: `cd app && npx tsc --noEmit && npm run build`
Expected: clean build, 15 routes prerendered, no reference to the removed handler.

- [ ] **Step 4: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/eloquent-hawking-d17d2e"
git add app/vite.config.ts app/server
git commit -m "chore(profiler): remove dead Gemini proxy + handler (no live AI)"
```

---

## Task 5: Expand the seed library to the Phase-1 starter set (~24-30 cocktails)

This is a content task: real, reworked, renamed cocktails, each a full `LibraryCocktail` following the Task-1 pattern. Not generated - researched + reworked, owner approves in batches.

**Files:**
- Modify: `app/src/features/Profiler/cocktailLibrary.ts` (append entries)

- [ ] **Step 1: Draft batch A (about 10 reworked modern classics)**

Source and rework (rename, own twist, own narrative) from this candidate pool, one `LibraryCocktail` each, tagged so the 4x4x4 axes are well covered: Paper Plane, Naked & Famous, Gold Rush, Jungle Bird, Bramble, Boulevardier, Espresso Martini, French 75, Bee's Knees, Tommy's Margarita. Fill every field; pick `tags.identity/taste/accord` honestly to the drink; choose `glass` from `coupe|rocks|highball|nicknora`; write a 1-2 sentence house-voice narrative; set a plausible `tint` oklch. No em-dashes/en-dashes.

- [ ] **Step 2: Owner approves batch A**

Present the drafted names + taglines + axis tags to the owner; apply edits. (Owner curates; he may swap in his own recipes.)

- [ ] **Step 3: Draft + approve batch B (about 10 more)**

Repeat with a second pool to reach ~24-30 total and ensure every Identity, every Taste, and every Accord is carried by at least three cocktails (so re-distill always has variety): e.g. Aviation-style Bloom, Clover Club, Vieux Carre, Hanky Panky, Corpse Reviver No.2, Mezcal Paloma, Garibaldi, Sherry Cobbler, White Negroni, Champagne-style French 75 variant.

- [ ] **Step 4: Verify coverage with a temporary assertion**

Run: `cd app && npm test`
Then extend `matchRecipe.test.ts` with a coverage check (add inside the describe block):

```ts
  it('every taste and accord is carried by at least two cocktails', () => {
    const { cocktailLibrary } = require('./cocktailLibrary');
    for (const t of ['Smoke', 'Frost', 'Ember', 'Bloom'])
      expect(cocktailLibrary.filter((c: any) => c.tags.taste.includes(t)).length).toBeGreaterThanOrEqual(2);
    for (const a of ['Bitter & Long', 'Sweet & Short', 'Spicy & Loud', 'Dry & Silent'])
      expect(cocktailLibrary.filter((c: any) => c.tags.accord.includes(a)).length).toBeGreaterThanOrEqual(2);
  });
```

Expected: PASS once batches A+B are in.

- [ ] **Step 5: Commit**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/eloquent-hawking-d17d2e"
git add app/src/features/Profiler/cocktailLibrary.ts app/src/features/Profiler/matchRecipe.test.ts
git commit -m "content(profiler): starter library of reworked real cocktails + coverage test"
```

---

## Task 6: Build, verify, deploy

**Files:** none (build + deploy mechanics)

- [ ] **Step 1: Full build**

Run: `cd app && npm run build`
Expected: clean, 15 routes prerendered, no `/api/profiler` string in the gallery bundle.

- [ ] **Step 2: Verify no runtime AI / fetch remains**

Run: `cd app && grep -rn "api/profiler\|composeWithGemini\|profilerHandler" src vite.config.ts`
Expected: no matches.

- [ ] **Step 3: Sync dist to repo root and deploy (owner ok)**

```bash
cd "/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/.claude/worktrees/eloquent-hawking-d17d2e"
cp -R app/dist/. .
git add index.html gallery assets-build offerings concierge contact cookies my-story privacy terms accessibility responsible-service
git commit -m "deploy: Profiler library matchmaker"
git push origin HEAD:main
```

- [ ] **Step 4: Verify live (no local browser tabs)**

```bash
ts=$(date +%s); curl -s -o /dev/null -w "%{http_code}\n" "https://www.iceinstinct.com/gallery/?z=$ts"
# Confirm the gallery JS bundle carries a seed recipe name and no api/profiler:
js=$(curl -s "https://www.iceinstinct.com/gallery/?z=$ts" | grep -o 'assets-build/gallery-[A-Za-z0-9_-]*\.js' | head -1)
curl -s "https://www.iceinstinct.com/$js" | grep -o "Ember Vow\|api/profiler" | sort -u
```

Expected: HTTP 200; "Ember Vow" present; "api/profiler" absent.

---

## Self-Review

- **Spec coverage:** full-recipe result (Task 1 schema + UI unchanged), library = owner's + reworked greats (Tasks 1, 5), no live AI (Tasks 3, 4), scoring matcher (Task 2), remove dead path (Tasks 3, 4), Phase-1 starter set (Task 5), phases (Task 5 is Phase-1 slice; Phase 2 = ongoing data). Covered.
- **Placeholder scan:** content task (Task 5) is a genuine curation activity with explicit candidate pools, a full field template (Task 1), and a coverage acceptance test - not a code placeholder. Engine tasks (1-4) contain complete code.
- **Type consistency:** `matchRecipe(sel, temperament, distill)` signature matches its call in `composeRecipe` and the test; `LibraryCocktail`/`Recipe`/axis types consistent across tasks; `toRecipe` maps every `Recipe` field.

---

## Notes for execution

- The `Temperament` import path in Task 2 matches the existing `profilerData.ts` import (`../../app/funnelStore`); reuse the existing import line rather than duplicating.
- If `npx tsc --noEmit` is not wired, use the build's tsc step (`npm run build` runs `tsc --noEmit && vite build && prerender`); the matcher test still runs via `npm test`.
- Keep `resolveRecipe` deletions minimal and safe: remove only helpers that become unreferenced. If unsure whether a helper is still used (e.g. by `steps`), leave it.
