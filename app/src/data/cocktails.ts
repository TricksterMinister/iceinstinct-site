/**
 * The Collection - gastronomic PROFILES for the gallery drawer.
 * Keyed by the exact tile data-title.
 *
 * These are signature compositions: we show the experience, not the build.
 * Each entry is a tasting profile (aroma + flavour) plus the named components,
 * never measurements or method - the recipes stay at the bar. The "compose your
 * own" builder (Palate Profiler) is the only place a full build is assembled.
 */
export type CocktailProfile = {
  /** 2-3 short sensory descriptors shown as tags. */
  palate: string[];
  /** The gastronomic paragraph: aroma and taste. */
  notes: string;
  /** Named components, no measures or method. Omit when not disclosed. */
  accents?: string;
};

export const COCKTAIL_PROFILES: Record<string, CocktailProfile> = {
  'White Lotus': {
    palate: ['Delicate', 'Floral', 'Clean'],
    notes:
      'Serene and luminous - a quiet, floral opening to the evening, soft on the nose and clean across the palate. Its full character is revealed at the bar.',
  },

  'Aviation': {
    palate: ['Floral', 'Citrus', 'Violet'],
    notes:
      'A sky-tinted classic. Violet and maraschino cherry bloom over bright lemon and cool juniper, perfumed and softly romantic from first scent to finish.',
    accents: 'Gin, violet, maraschino, lemon',
  },

  'Persimmon Saffron Sour': {
    palate: ['Silky', 'Warm-Spiced', 'Stone Fruit'],
    notes:
      'A velvet sour. Ripe persimmon and the warmth of saffron wrap around bourbon, lifted by a citrus brightness and carried on a cloud-soft foam.',
    accents: 'Bourbon, persimmon, saffron, lemon, silken foam',
  },

  'Belladonna': {
    palate: ['Bright', 'Herbal', 'Effervescent'],
    notes:
      'Blush-pink and alive. Pink grapefruit and garden rosemary play over gin, laced with a sparkle of brut and a single ribbon of grenadine.',
    accents: 'Gin, pink grapefruit, rosemary, lemon, sparkling wine',
  },

  'Black Truffle Martini': {
    palate: ['Savory', 'Umami', 'Dry'],
    notes:
      'A martini in a tuxedo. Earthy black truffle wound through a cold, crystalline spirit - savory, dry, and unmistakably grown-up. Built only at the bar.',
  },

  'Rose Garden Rendezvous': {
    palate: ['Floral', 'Anise', 'Sparkling'],
    notes:
      'A garden in a glass. Rose and a soft breath of anise are lifted by prosecco and misted with rose water, so the perfume arrives a moment before the sip.',
    accents: 'Arak, rose, vodka, prosecco, rose water',
  },

  'Aureliano': {
    palate: ['Golden', 'Warm', 'Spirit-Forward'],
    notes:
      'Named for a slow golden hour. Burnished and spirit-forward, built to be sipped and not hurried. The composition is revealed in person.',
  },

  'Call Me By Your Name': {
    palate: ['Stone Fruit', 'Sun-Ripe', 'Tender'],
    notes:
      'Summer held in a glass. Ripe peach and a tender, sun-warmed sweetness - nostalgic, unhurried, and quietly intoxicating. Composed at the bar.',
  },

  '1001 Nights': {
    palate: ['Smoky', 'Spiced', 'Bittersweet'],
    notes:
      'A spice-route journey. Smoked agave and saffron meet citrus and a whisper of agave sweetness, deepened by bitter herbs and orange, then dusted with smoked paprika and black salt.',
    accents: 'Mezcal, saffron, grapefruit, lime, bitter herbs, orange',
  },

  'Basil in my mind': {
    palate: ['Herbal', 'Green', 'Bright'],
    notes:
      'Garden-fresh and cooling. Basil at the center, green and aromatic, a clear-eyed sip made for warm nights. The full build stays at the bar.',
  },

  'Calipso Cream': {
    palate: ['Creamy', 'Chocolate', 'Warm-Spiced'],
    notes:
      'A nightcap dessert. Silken cream and chocolate are folded into agave spirit and port, warmed with cinnamon and finished with a veil of grated chocolate.',
    accents: 'Tequila, cream, chocolate, port, cinnamon',
  },

  'Bésame': {
    palate: ['Smoky', 'Spicy', 'Tropical'],
    notes:
      'A slow kiss with heat. Smoky mezcal and chile-kissed tequila ride over clarified pineapple and vanilla, edged with smoked salt - tropical, savory, and a little dangerous.',
    accents: 'Mezcal, chile-infused tequila, ancho, pineapple, vanilla',
  },

  'Negroni Verde': {
    palate: ['Herbaceous', 'Bitter-Dry', 'Alpine'],
    notes:
      'An emerald reading of the Negroni. Alpine herbs and garden botanicals stand over a dry, bittersweet spine, lifted by grapefruit oils and a whisper of basil.',
    accents: 'Botanical gin, green Chartreuse, Lillet Blanc, grapefruit, basil',
  },
};
