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
