/**
 * The Collection - recipe data for the gallery recipe drawer.
 * Keyed by the exact tile data-title. Recipes transcribed verbatim from the
 * owner's bar guide ("CRAFT COCKTAIL RECIPES" + the Belladonna/Besame sheet).
 * Five compositions await the owner's recipes (note shown until provided).
 */
export type Recipe = {
  glass?: string;
  ice?: string;
  ingredients: string[];
  method: string[];
  garnish?: string;
  /** Shown when the full recipe is not yet provided. */
  note?: string;
};

const PENDING = 'The full recipe for this composition is shared in person.';

export const COCKTAIL_RECIPES: Record<string, Recipe> = {
  'White Lotus': { ingredients: [], method: [], note: PENDING },

  'Negroni Verde': {
    glass: 'Rocks',
    ice: 'One large clear cube',
    ingredients: [
      '1 oz The Botanist Gin',
      '1 oz Green Chartreuse',
      '1 oz Lillet Blanc',
    ],
    method: [
      'Stir all ingredients with ice until well chilled.',
      'Strain over one large clear cube in a rocks glass.',
    ],
    garnish: 'Grapefruit twist and a basil leaf',
  },

  'Aviation': {
    glass: 'Martini',
    ingredients: [
      '2 oz Empress Gin',
      '0.5 oz Creme de Violette',
      '0.5 oz Maraschino Liqueur',
      '0.75 oz Lemon Juice',
    ],
    method: ['Stir all ingredients with ice.', 'Strain into a chilled martini glass.'],
    garnish: 'Brandied cherry',
  },

  'Persimmon Saffron Sour': {
    glass: 'Coupe',
    ingredients: [
      '1.5 oz Bourbon',
      '0.5 oz Persimmon Liqueur',
      '0.5 oz Saffron Liqueur',
      '0.75 oz Lemon Juice',
      '0.5 oz Simple Syrup',
      '1 Egg White',
    ],
    method: [
      'Dry shake all ingredients without ice.',
      'Add ice and shake again until chilled.',
      'Strain into a coupe glass.',
    ],
    garnish: 'Saffron threads',
  },

  'Belladonna': {
    glass: 'Large bowl-style wine glass',
    ice: 'One large clear sphere',
    ingredients: [
      '1 oz London Dry Gin',
      '1 oz Fresh Pink Grapefruit Juice',
      '0.5 oz Rosemary Syrup',
      '0.25 oz Fresh Lemon Juice',
      'Splash of Grenadine',
      '2.5 oz Brut Sparkling Wine',
    ],
    method: [
      'Shake all ingredients except sparkling wine with ice for 10 seconds.',
      'Strain into a bowl-style wine glass over a clear ice sphere.',
      'Top with sparkling wine and stir gently.',
    ],
    garnish: 'Edible flower',
  },

  'Black Truffle Martini': { ingredients: [], method: [], note: PENDING },

  'Rose Garden Rendezvous': {
    glass: 'Stemless wine glass',
    ice: 'Cubed',
    ingredients: [
      '1 oz Arak',
      '1 oz Rose Liqueur',
      '1 oz Vodka',
      'Splash Club Soda',
      'Top with Prosecco',
    ],
    method: [
      'Shake arak, rose liqueur, vodka and club soda with ice for 10 seconds.',
      'Dirty pour into a stemless wine glass over cubed ice.',
      'Top with prosecco and stir gently.',
      'Spritz the glass with rose water just before serving.',
    ],
    garnish: 'Edible flower',
  },

  'Aureliano': { ingredients: [], method: [], note: PENDING },

  'Basil in my mind': { ingredients: [], method: [], note: PENDING },

  '1001 Nights': {
    glass: 'Double rocks',
    ice: 'One large cube',
    ingredients: [
      '1.5 oz Mezcal',
      '0.5 oz Saffron Liqueur',
      '0.5 oz Lime Juice',
      '0.5 oz Grapefruit Juice',
      '0.25 oz Agave Syrup',
      '0.25 oz Fernet Branca',
      '0.5 oz Genziano Liqueur',
      '0.5 oz Grand Marnier',
    ],
    method: [
      'Stir all ingredients with ice.',
      'Pour over a large ice cube in a double rocks glass.',
    ],
    garnish: 'Smoked paprika and black lava salt dusted over the ice',
  },

  'Call Me By Your Name': { ingredients: [], method: [], note: PENDING },

  'Calipso Cream': {
    glass: 'Nick & Nora',
    ice: 'Served up',
    ingredients: [
      '1 oz Tequila',
      '1 oz Heavy Cream',
      '1 oz Chocolate Liqueur',
      '1 oz Port Wine',
      '1 oz Cinnamon Liqueur',
    ],
    method: [
      'Shake all ingredients with ice.',
      'Strain into a chilled Nick & Nora glass.',
      'Serve without ice.',
    ],
    garnish: 'Grated chocolate',
  },

  'Bésame': {
    glass: 'Rocks',
    ice: 'One large clear cube',
    ingredients: [
      '1 oz Mezcal',
      '1 oz House-infused Tequila (habanero & cilantro)',
      '1 oz Ancho Reyes',
      '1 oz Clarified Pineapple Juice',
      '0.5 oz Vanilla Syrup',
      '2 drops Fresh Lemon Juice',
    ],
    method: [
      'Add all ingredients to a mixing glass with ice.',
      'Stir gently for 15 to 20 seconds until chilled.',
      'Strain into a rocks glass over one large clear cube.',
    ],
    garnish: 'Smoked salt rim (optional)',
  },
};
