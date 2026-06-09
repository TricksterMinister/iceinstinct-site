/**
 * The Collection - gastronomic PROFILES for the gallery drawer.
 * Keyed by the exact tile data-title.
 *
 * Signature compositions: we show the experience, not the build. Each entry is
 * a tasting profile - three palate descriptors ("pins") and a short literary
 * note on aroma and flavour. No measurements, no method; the recipes stay at
 * the bar. The "compose your own" builder (Palate Profiler) is the only place a
 * full build is assembled.
 */
export type CocktailProfile = {
  /** Three short sensory descriptors, shown as champagne pins. */
  palate: string[];
  /** The tasting note: aroma and flavour, in polished prose. */
  notes: string;
};

export const COCKTAIL_PROFILES: Record<string, CocktailProfile> = {
  'White Lotus': {
    palate: ['Creamy', 'Tropical', 'Dessert'],
    notes:
      'A tropical dessert with a wink to its namesake. White chocolate and ripe pineapple meet smooth tequila and a whisper of cream, lifted by elderflower and grounded with a thread of sea salt. Lush, milky, and indulgent - sweetness that knows exactly when to stop.',
  },

  'Aviation': {
    palate: ['Floral', 'Citrus', 'Violet'],
    notes:
      'A pre-war classic in full bloom. Violet and maraschino unfold like dusk over a skyline, their perfume held in check by bright lemon and the cool spine of gin. Romantic, faintly nostalgic, and clean as a closing line.',
  },

  'Persimmon Saffron Sour': {
    palate: ['Silky', 'Warm-Spiced', 'Stone Fruit'],
    notes:
      'Bourbon warmth wrapped in silk. Ripe persimmon and a single thread of saffron lend an amber, autumnal sweetness, while lemon keeps the edges bright and a whipped-soft foam carries the whole thing across the palate like velvet.',
  },

  'Belladonna': {
    palate: ['Bright', 'Herbal', 'Effervescent'],
    notes:
      'Beautiful, and just a little dangerous. Pink grapefruit and garden rosemary play above a backbone of gin, lifted by a brut sparkle and tinted with one slow ribbon of grenadine. Crisp, aromatic, alive in the glass.',
  },

  'Black Truffle Martini': {
    palate: ['Savory', 'Truffle', 'Bone-Dry'],
    notes:
      'Vodka infused with real black truffle, stirred bone-dry in the martini tradition. The aroma arrives first - deep, earthy, unmistakably mushroom - then a soft, saline umami settles across the palate. Austere, savory, and quietly luxurious.',
  },

  'Rose Garden Rendezvous': {
    palate: ['Floral', 'Anise', 'Sparkling'],
    notes:
      'A walk through the garden after rain. Rose and a soft breath of anise rise first; prosecco lifts everything skyward; a mist of rose water lets the perfume arrive a moment before the sip. Delicate, dressed-up, faintly illicit.',
  },

  'Aureliano': {
    palate: ['Smoky', 'Spiced', 'Spirit-Forward'],
    notes:
      'A South American Manhattan. Smoky mezcal stands in for the whiskey, wrapped in warm baking spice and a burnished, amber depth. Spirit-forward and brooding, built to be nursed slowly as the room goes gold.',
  },

  'Call Me By Your Name': {
    palate: ['Silky', 'Herbal', 'Refreshing'],
    notes:
      'Cool silk on a warm evening. Gin, cucumber, lime, and basil are shaken with egg white into a soft, billowing foam, then kissed with a mist of absinthe. Velvet-smooth, herbaceous, and quietly sensual - refreshment dressed for a long, slow dusk.',
  },

  '1001 Nights': {
    palate: ['Smoky', 'Spiced', 'Bittersweet'],
    notes:
      'A caravan of smoke and spice. Mezcal smolders beneath saffron and citrus, then bitter herbs and orange deepen the story, all of it dusted with smoked paprika and black salt. Exotic, layered, and quietly hypnotic.',
  },

  'Basil in my mind': {
    palate: ['Herbal', 'Green', 'Spring'],
    notes:
      'Spring, distilled. A vivid rush of fresh-bruised basil over crisp gin and bright citrus, served deep over crushed ice so every sip stays cold and green. Garden-fresh, exhilarating, and almost recklessly delicious.',
  },

  'Calipso Cream': {
    palate: ['Creamy', 'Chocolate', 'Warm-Spiced'],
    notes:
      'Dessert after midnight. Silken cream folds into chocolate and port, warmed by cinnamon and grounded by agave spirit, then finished under a veil of grated chocolate. Decadent, rounded, and unapologetically indulgent.',
  },

  'Bésame': {
    palate: ['Smoky', 'Spicy', 'Tropical'],
    notes:
      'A slow kiss with heat behind it. Smoky mezcal and chile-kissed tequila ride over clarified pineapple and soft vanilla, edged with smoked salt. Tropical and savory at once, and warm exactly where you least expect it.',
  },

  'Negroni Verde': {
    palate: ['Herbaceous', 'Bitter-Dry', 'Alpine'],
    notes:
      'An emerald rewriting of the Negroni. Alpine herbs and green botanicals stand tall over a dry, bittersweet spine, brightened by grapefruit oil and a whisper of basil. Bracing, sophisticated, and cut perfectly clean.',
  },
};
