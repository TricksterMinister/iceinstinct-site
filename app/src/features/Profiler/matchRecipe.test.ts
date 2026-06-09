import { describe, it, expect } from 'vitest';
import { matchRecipe, type Selections, type Identity, type Taste, type Accord } from './profilerData';
import { cocktailLibrary } from './cocktailLibrary';

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

// Local helper mirrors the matcher's top-scoring band size for the assertion guard.
function countCandidates(sel: Selections): number {
  const W_IDENTITY = 3;
  const W_TASTE = 3;
  const W_ACCORD = 2;
  const scores = cocktailLibrary.map((c) => {
    let s = 0;
    if (sel.identity && c.tags.identity.includes(sel.identity as Identity)) s += W_IDENTITY;
    if (sel.taste && c.tags.taste.includes(sel.taste as Taste)) s += W_TASTE;
    if (sel.accord && c.tags.accord.includes(sel.accord as Accord)) s += W_ACCORD;
    return s;
  });
  const topScore = Math.max(...scores);
  return scores.filter((s) => s === topScore).length;
}
