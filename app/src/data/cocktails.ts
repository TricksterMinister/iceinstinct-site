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
    palate: ['Delicate', 'Floral', 'Clean'],
    notes:
      'Opens like first light on still water. A weightless lift of white blossom and ripe pear settles into something cool and composed, and the finish lingers the way a good silence does - quiet, luminous, and entirely sure of itself.',
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
    palate: ['Savory', 'Umami', 'Dry'],
    notes:
      'A martini in a tuxedo. Earthy black truffle drifts through ice-cold, crystalline spirit, lending a savory, almost smoky depth to something otherwise austere and bone-dry. Serious, sensual, and unmistakably grown-up.',
  },

  'Rose Garden Rendezvous': {
    palate: ['Floral', 'Anise', 'Sparkling'],
    notes:
      'A walk through the garden after rain. Rose and a soft breath of anise rise first; prosecco lifts everything skyward; a mist of rose water lets the perfume arrive a moment before the sip. Delicate, dressed-up, faintly illicit.',
  },

  'Aureliano': {
    palate: ['Golden', 'Warm', 'Spirit-Forward'],
    notes:
      'Built for the golden hour. Burnished and spirit-forward, it glows with amber warmth and a slow, contemplative heat - a drink to be nursed rather than chased, as the light goes long and low across the room.',
  },

  'Call Me By Your Name': {
    palate: ['Stone Fruit', 'Sun-Ripe', 'Tender'],
    notes:
      'Summer, remembered. Sun-ripened peach and a tender, honeyed warmth rise like heat off Mediterranean stone - unhurried, a little aching, impossibly easy to fall into. The kind of sweetness that knows it will not last.',
  },

  '1001 Nights': {
    palate: ['Smoky', 'Spiced', 'Bittersweet'],
    notes:
      'A caravan of smoke and spice. Mezcal smolders beneath saffron and citrus, then bitter herbs and orange deepen the story, all of it dusted with smoked paprika and black salt. Exotic, layered, and quietly hypnotic.',
  },

  'Basil in my mind': {
    palate: ['Herbal', 'Green', 'Bright'],
    notes:
      'Green and clear-headed. Fresh basil leads - cool, peppery, aromatic - threaded with bright citrus and a clean herbal snap. It reads like a long breath in a summer garden: vivid, crisp, and wide awake.',
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
