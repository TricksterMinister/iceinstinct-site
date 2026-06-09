import type { Temperament } from '../../app/funnelStore';
import { cocktailLibrary, type LibraryCocktail } from './cocktailLibrary';

// ---------------------------------------------------------------------------
// Palate Profiler data + library matchmaker.
// Concept ported from the Antigravity prototype (Identity -> Anchor -> Accord,
// 4x4x4 = 64 combinations); rebuilt in TS and in the Ice & Instinct voice.
// Visuals are OURS (strict monochrome + champagne). The matchmaker scores the
// curated cocktail library against the guest's three choices - no live AI.
// ---------------------------------------------------------------------------

export type StepId = 'identity' | 'taste' | 'accord';
export type Glass = 'coupe' | 'rocks' | 'highball' | 'nicknora';
export type Identity = 'Lover' | 'Rebel' | 'Mystic' | 'Hunter';
export type Taste = 'Smoke' | 'Frost' | 'Ember' | 'Bloom';
export type Accord = 'Bitter & Long' | 'Sweet & Short' | 'Spicy & Loud' | 'Dry & Silent';

export interface StepOption {
  id: string;
  label: string;
  desc: string;
}

export interface Step {
  id: StepId;
  eyebrow: string;
  title: string;
  subtitle: string;
  options: StepOption[];
}

export interface Recipe {
  name: string;
  tagline: string;
  ingredients: string[];
  instructions: string[];
  sensoryNarrative: string;
  colorProfile: string;
  tint: string;
  glass: Glass;
  archetype: string;
}

export const steps: Step[] = [
  {
    id: 'identity',
    eyebrow: 'I / Identity',
    title: 'You arrive as',
    subtitle: 'The archetype that mirrors your tonight.',
    options: [
      { id: 'Lover', label: 'The Lover', desc: 'Sensual, intimate, seeking connection. Velvet textures, warmth, a lingering sweetness.' },
      { id: 'Rebel', label: 'The Rebel', desc: 'Bold, unpredictable, breaking convention. High contrast, citrus smoke, sharp edges.' },
      { id: 'Mystic', label: 'The Mystic', desc: 'Enigmatic, deep, searching the unseen. Dark spirits, complex botanicals, herbal mysteries.' },
      { id: 'Hunter', label: 'The Hunter', desc: 'Focused, primal, seeking pure essence. Rich wood, peat, high proof, a direct dry finish.' },
    ],
  },
  {
    id: 'taste',
    eyebrow: 'II / Anchor',
    title: 'Tonight tastes like',
    subtitle: 'The elemental anchor at the cocktail\'s core.',
    options: [
      { id: 'Smoke', label: 'Smoke', desc: 'Peat, charred wood, toasted oak, lapsang souchong, dark roast.' },
      { id: 'Frost', label: 'Frost', desc: 'Crisp mint, eucalyptus, pine needle, icy mineral, sub-zero clarity.' },
      { id: 'Ember', label: 'Ember', desc: 'Warm chilli, ginger root, peppercorn, baked citrus, spiced warmth.' },
      { id: 'Bloom', label: 'Bloom', desc: 'Elderflower, rose damascena, jasmine, lavender, bright stone fruit.' },
    ],
  },
  {
    id: 'accord',
    eyebrow: 'III / Accord',
    title: 'Leave the night',
    subtitle: 'How the last sip should hold you.',
    options: [
      { id: 'Bitter & Long', label: 'Bitter & Long', desc: 'Gentian, amaro, cardamom. A finish that lingers and deepens.' },
      { id: 'Sweet & Short', label: 'Sweet & Short', desc: 'Demerara, orange velvet. Round, brief, generous.' },
      { id: 'Spicy & Loud', label: 'Spicy & Loud', desc: 'Bird\'s eye chilli, fresh ginger. Bright nerve, a loud close.' },
      { id: 'Dry & Silent', label: 'Dry & Silent', desc: 'Sub-zero dry vermouth, lemon bitters. Quiet, taut, austere.' },
    ],
  },
];

export const labelFor = (stepId: StepId, optionId: string): string =>
  steps.find((s) => s.id === stepId)?.options.find((o) => o.id === optionId)?.label ?? '';

export interface Selections {
  identity?: string;
  taste?: string;
  accord?: string;
}

// ---- Library matchmaker ---------------------------------------------------

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
