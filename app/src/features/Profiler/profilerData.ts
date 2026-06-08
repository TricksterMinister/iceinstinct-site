import type { Temperament } from '../../app/funnelStore';

// ---------------------------------------------------------------------------
// Palate Profiler data + 64-path recipe engine.
// Concept ported from the Antigravity prototype (Identity -> Anchor -> Accord,
// 4x4x4 = 64 combinations); rebuilt in TS and in the Ice & Instinct voice.
// Visuals are OURS (strict monochrome + champagne) - none of the prototype's
// glass/gold/glow. Fallback-first: this engine always returns a complete recipe;
// live Gemini overrides it when a key is present (see profilerHandler.ts).
// ---------------------------------------------------------------------------

export type StepId = 'identity' | 'taste' | 'accord';
export type Glass = 'coupe' | 'rocks' | 'highball' | 'nicknora';

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
    subtitle: 'The elemental anchor at the cocktail’s core.',
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
      { id: 'Spicy & Loud', label: 'Spicy & Loud', desc: 'Bird’s eye chilli, fresh ginger. Bright nerve, a loud close.' },
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

// ---- 64-path engine ------------------------------------------------------

const BASES: Record<string, { name: string; qty: string; glass: Glass }> = {
  Lover: { name: "Aged Calvados Pays d'Auge", qty: '2.0 oz', glass: 'coupe' },
  Rebel: { name: 'Mezcal Artesanal Espadín', qty: '2.0 oz', glass: 'highball' },
  Mystic: { name: 'Oak-Aged Botanical Dark Gin', qty: '2.0 oz', glass: 'nicknora' },
  Hunter: { name: 'High-Proof Peated Single Malt', qty: '2.0 oz', glass: 'rocks' },
};

const ACCORD_GLASS: Record<string, Glass> = {
  'Bitter & Long': 'rocks',
  'Sweet & Short': 'coupe',
  'Spicy & Loud': 'highball',
  'Dry & Silent': 'nicknora',
};

const MODIFIERS: Record<string, string[]> = {
  Smoke: ['0.75 oz  Lapsang Souchong smoked vermouth', '2 dashes  charred cedar tincture'],
  Frost: ['0.50 oz  crystalline white crème de menthe', '3 drops  eucalyptus essence tincture'],
  Ember: ['0.50 oz  ancho chilli liqueur', '2 dashes  spiced ginger bitters'],
  Bloom: ['0.75 oz  wild elderflower cordial', '2 drops  damascena rose water'],
};

const ACCORD_INGREDIENTS: Record<string, string[]> = {
  'Bitter & Long': ['0.50 oz  gentian amaro', '2 dashes  cardamom bitters'],
  'Sweet & Short': ['0.25 oz  rich demerara syrup (2:1)', '0.25 oz  orange liqueur'],
  'Spicy & Loud': ["2 drops  bird's eye chilli tincture", '0.25 oz  fresh ginger press'],
  'Dry & Silent': ['0.75 oz  sub-zero dry vermouth', '1 dash  lemon bitters'],
};

const GARNISH: Record<Glass, string> = {
  rocks: 'Garnish: a dehydrated orange wheel over one clear ice sphere',
  coupe: 'Garnish: lemon oils expressed over the stem',
  highball: 'Garnish: a long spear of candied ginger',
  nicknora: 'Garnish: a single drop of botanical oil',
};

const NAMES: Record<string, Record<string, string>> = {
  Lover: { Smoke: 'The Smouldering Heart', Frost: 'The Frozen Embrace', Ember: 'The Velvet Hearth', Bloom: 'The Rose & Peat' },
  Rebel: { Smoke: 'The Pyre of Midtown', Frost: 'Cold Anarchy', Ember: 'The Shattered Spice', Bloom: 'The Citrus Flower' },
  Mystic: { Smoke: 'The Altar Accord', Frost: 'The Astral Breeze', Ember: "The Alchemist's Flame", Bloom: 'The Botanical Vision' },
  Hunter: { Smoke: 'The Peat Chase', Frost: 'The Arctic Forest', Ember: 'The Embers of Rye', Bloom: 'The Golden Meadow' },
};

const NARRATIVES: Record<string, (taste: string, accord: string) => string> = {
  Lover: (t) => `Built for the intimate connection of the night. It binds velvet apple depth with the sensory weight of ${t.toLowerCase()}, a presence that stays long after the glass is empty.`,
  Rebel: (t, a) => `A rejection of orthodoxy. Heavy mezcal collides with the anchor of ${t.toLowerCase()}, then is sliced through by a ${a.toLowerCase()} finish. Not for the faint of heart.`,
  Mystic: (t) => `An elixir of herbal shadow and quiet alchemy. Dark botanicals fuse with ${t.toLowerCase()} into a puzzle that shifts with every sip. For the searchers of Manhattan.`,
  Hunter: (t) => `A primal return to fire, oak and peat. By layering ${t.toLowerCase()} over a raw proof, it delivers a hard, uncompromising structure that honours the old ritual.`,
};

const RITUAL: Record<Glass, string[]> = {
  rocks: [
    'Build in a mixing glass over large, hand-cut clear ice.',
    'Stir to chill and dilute.',
    'Strain into a heavy rocks glass over a single crystalline sphere.',
  ],
  coupe: [
    'Combine in a mixing glass with cracked sub-zero ice.',
    'Stir precisely thirty times.',
    'Double-strain into a frosted vintage coupe.',
  ],
  highball: [
    'Build directly in a chilled highball packed with block ice.',
    'Pour spirits over, top with aromatic tonic.',
    'Stir once from the bottom.',
  ],
  nicknora: [
    'Combine in an oak-rinsed mixing glass with ice.',
    'Stir gently, keeping the liquid silent.',
    'Strain into a chilled Nick & Nora.',
  ],
};

const COLOUR: Record<string, { profile: string; tint: string }> = {
  Smoke: { profile: 'Smouldering charcoal, lit low from within.', tint: 'oklch(60% 0.03 70)' },
  Frost: { profile: 'Near-colourless platinum with a cold sheen.', tint: 'oklch(82% 0.02 220)' },
  Ember: { profile: 'Burnished amber-russet, warm at the core.', tint: 'oklch(64% 0.10 55)' },
  Bloom: { profile: 'Pale blush dusk, soft and translucent.', tint: 'oklch(80% 0.04 20)' },
};

// Small, on-brand variation so "Distill again" visibly differs without a key.
const EDITIONS = ['First Pour', 'Second Distillation', 'Midnight Reserve', 'Cask Variation'];
const ALT_GARNISH = [
  'Garnish: a single bay leaf, lightly burned',
  'Garnish: a twist of grapefruit, oils expressed',
  'Garnish: a sprig of smoked rosemary',
  'Garnish: a thin shard of clear ice, nothing more',
];

const fallbackOf = (sel: Selections): Required<Selections> => ({
  identity: sel.identity && BASES[sel.identity] ? sel.identity : 'Mystic',
  taste: sel.taste && MODIFIERS[sel.taste] ? sel.taste : 'Smoke',
  accord: sel.accord && ACCORD_INGREDIENTS[sel.accord] ? sel.accord : 'Bitter & Long',
});

/**
 * Deterministic 64-path recipe. `distill` adds a light on-brand variation
 * (edition word + swapped garnish) so re-rolling returns a different signature.
 */
export function resolveRecipe(sel: Selections, _temperament: Temperament, distill = 0): Recipe {
  const { identity, taste, accord } = fallbackOf(sel);
  const base = BASES[identity];
  const glass = ACCORD_GLASS[accord] || base.glass;
  const colour = COLOUR[taste];

  const v = distill % EDITIONS.length;
  const baseName = NAMES[identity][taste] || 'The Instinct Accord';
  const name = distill === 0 ? baseName : `${baseName} · ${EDITIONS[v]}`;

  const ingredients = [
    `${base.qty}  ${base.name}`,
    ...MODIFIERS[taste],
    ...ACCORD_INGREDIENTS[accord],
    distill === 0 ? GARNISH[glass] : ALT_GARNISH[v],
  ];

  return {
    name,
    tagline: `For the ${identity.toLowerCase()} seeking a ${taste.toLowerCase()} anchor with a ${accord.toLowerCase()} finish.`,
    ingredients,
    instructions: RITUAL[glass],
    sensoryNarrative: NARRATIVES[identity](taste, accord),
    colorProfile: colour.profile,
    tint: colour.tint,
    glass,
    archetype: `The ${identity}`,
  };
}
