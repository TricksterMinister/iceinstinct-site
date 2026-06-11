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
  /**
   * One to two self-contained sentences: key spirits, flavour profile, and
   * the evening it was built for. Shown as quiet text on the gallery tile
   * and mirrored into the ItemList schema on /gallery/.
   */
  description: string;
};

export const COCKTAIL_PROFILES: Record<string, CocktailProfile> = {
  'White Lotus': {
    palate: ['Creamy', 'Tropical', 'Dessert'],
    notes:
      'A tropical dessert with a wink to its namesake. White chocolate and ripe pineapple meet smooth tequila and a whisper of cream, lifted by elderflower and grounded with a thread of sea salt. Lush, milky, and indulgent - sweetness that knows exactly when to stop.',
    description:
      'Smooth tequila folded into white chocolate, ripe pineapple, and cream, lifted by elderflower and grounded with a thread of sea salt. A lush tropical dessert built for the unhurried last hour of a dinner party.',
  },

  'Aviation': {
    palate: ['Floral', 'Citrus', 'Violet'],
    notes:
      'A pre-war classic in full bloom. Violet and maraschino unfold like dusk over a skyline, their perfume held in check by bright lemon and the cool spine of gin. Romantic, faintly nostalgic, and clean as a closing line.',
    description:
      'Gin, violet, and maraschino held in check by bright lemon - a pre-war classic, floral and clean. Poured for evenings of quiet, old-world romance.',
  },

  'Persimmon Saffron Sour': {
    palate: ['Silky', 'Warm-Spiced', 'Stone Fruit'],
    notes:
      'Bourbon warmth wrapped in silk. Ripe persimmon and a single thread of saffron lend an amber, autumnal sweetness, while lemon keeps the edges bright and a whipped-soft foam carries the whole thing across the palate like velvet.',
    description:
      'Bourbon warmed with ripe persimmon and a single thread of saffron, kept bright with lemon beneath a whipped-soft foam. An amber, autumnal sour for slow evenings by the fire.',
  },

  'Belladonna': {
    palate: ['Bright', 'Herbal', 'Effervescent'],
    notes:
      'Beautiful, and just a little dangerous. Pink grapefruit and garden rosemary play above a backbone of gin, lifted by a brut sparkle and tinted with one slow ribbon of grenadine. Crisp, aromatic, alive in the glass.',
    description:
      'Gin beneath pink grapefruit and garden rosemary, lifted by a brut sparkle and one slow ribbon of grenadine. Crisp and aromatic - made for the opening hour, while the room is still arriving.',
  },

  'Black Truffle Martini': {
    palate: ['Savory', 'Truffle', 'Bone-Dry'],
    notes:
      'Vodka infused with real black truffle, stirred bone-dry in the martini tradition. The aroma arrives first - deep, earthy, unmistakably mushroom - then a soft, saline umami settles across the palate. Austere, savory, and quietly luxurious.',
    description:
      'Vodka infused with real black truffle, stirred bone-dry in the martini tradition, earthy on the nose with a soft saline umami beneath. Reserved for late hours and serious conversation.',
  },

  'Rose Garden Rendezvous': {
    palate: ['Floral', 'Anise', 'Sparkling'],
    notes:
      'A walk through the garden after rain. Rose and a soft breath of anise rise first; prosecco lifts everything skyward; a mist of rose water lets the perfume arrive a moment before the sip. Delicate, dressed-up, faintly illicit.',
    description:
      'Rose and a soft breath of anise lifted by prosecco, finished with a mist of rose water so the perfume arrives before the sip. A delicate sparkler for garden parties and golden-hour toasts.',
  },

  'Aureliano': {
    palate: ['Smoky', 'Spiced', 'Spirit-Forward'],
    notes:
      'A South American Manhattan. Smoky mezcal stands in for the whiskey, wrapped in warm baking spice and a burnished, amber depth. Spirit-forward and brooding, built to be nursed slowly as the room goes gold.',
    description:
      'A South American Manhattan: smoky mezcal in place of the whiskey, wrapped in warm baking spice and a burnished amber depth. Spirit-forward and brooding, made to be nursed slowly as the evening deepens.',
  },

  'Call Me By Your Name': {
    palate: ['Silky', 'Herbal', 'Refreshing'],
    notes:
      'Cool silk on a warm evening. Gin, cucumber, lime, and basil are shaken with egg white into a soft, billowing foam, then kissed with a mist of absinthe. Velvet-smooth, herbaceous, and quietly sensual - refreshment dressed for a long, slow dusk.',
    description:
      'Gin shaken with cucumber, lime, basil, and egg white into a soft, billowing foam, then kissed with a mist of absinthe. Velvet-smooth refreshment composed for a long, warm dusk.',
  },

  '1001 Nights': {
    palate: ['Smoky', 'Spiced', 'Bittersweet'],
    notes:
      'A caravan of smoke and spice. Mezcal smolders beneath saffron and citrus, then bitter herbs and orange deepen the story, all of it dusted with smoked paprika and black salt. Exotic, layered, and quietly hypnotic.',
    description:
      'Mezcal smoldering beneath saffron, citrus, and bitter orange, dusted with smoked paprika and black salt. Layered and quietly hypnotic - for evenings that drift well past midnight.',
  },

  'Basil in my mind': {
    palate: ['Herbal', 'Green', 'Spring'],
    notes:
      'Spring, distilled. A vivid rush of fresh-bruised basil over crisp gin and bright citrus, served deep over crushed ice so every sip stays cold and green. Garden-fresh, exhilarating, and almost recklessly delicious.',
    description:
      'Fresh-bruised basil over crisp gin and bright citrus, served deep over crushed ice so every sip stays cold and green. Spring distilled, for terraces and the first warm nights of the year.',
  },

  'Calipso Cream': {
    palate: ['Creamy', 'Chocolate', 'Warm-Spiced'],
    notes:
      'Dessert after midnight. Silken cream folds into chocolate and port, warmed by cinnamon and grounded by agave spirit, then finished under a veil of grated chocolate. Decadent, rounded, and unapologetically indulgent.',
    description:
      'Silken cream folded into chocolate and port, warmed by cinnamon over an agave spirit and finished under a veil of grated chocolate. Dessert after midnight, for the evening that refuses to end.',
  },

  'Bésame': {
    palate: ['Smoky', 'Spicy', 'Tropical'],
    notes:
      'A slow kiss with heat behind it. Smoky mezcal and chile-kissed tequila ride over clarified pineapple and soft vanilla, edged with smoked salt. Tropical and savory at once, and warm exactly where you least expect it.',
    description:
      'Smoky mezcal and chile-kissed tequila over clarified pineapple and soft vanilla, edged with smoked salt. Tropical and savory at once - a slow kiss with warmth behind it, for the boldest hour of the night.',
  },

  'Negroni Verde': {
    palate: ['Herbaceous', 'Bitter-Dry', 'Alpine'],
    notes:
      'An emerald rewriting of the Negroni. Alpine herbs and green botanicals stand tall over a dry, bittersweet spine, brightened by grapefruit oil and a whisper of basil. Bracing, sophisticated, and cut perfectly clean.',
    description:
      'An emerald rewriting of the Negroni: alpine herbs and green botanicals over a dry, bittersweet spine, brightened by grapefruit oil and a whisper of basil. A bracing aperitivo for the hour before dinner.',
  },
};
