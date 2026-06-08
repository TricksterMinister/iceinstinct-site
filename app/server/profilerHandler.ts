// ---------------------------------------------------------------------------
// Server-side Palate Profiler handler. Runs ONLY on the server (Vite dev
// middleware locally, a serverless function in prod). The Gemini key is read
// from the server environment here and NEVER reaches the browser bundle.
//
// Contract: POST { atmosphere, palate, texture, temperament } -> { recipe } | 502
// The client treats any non-200 (or network error) as "use local fallback",
// so a missing key / rate-limit / outage is invisible to the guest.
// ---------------------------------------------------------------------------

export interface Choices {
  identity?: string;
  taste?: string;
  accord?: string;
  temperament?: 'ice' | 'instinct' | null;
}

export type Glass = 'coupe' | 'rocks' | 'highball' | 'nicknora';

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

// Human labels so the model gets rich context, not opaque ids.
const LABELS: Record<string, Record<string, { label: string; desc: string }>> = {
  identity: {
    Lover: { label: 'The Lover', desc: 'Sensual, intimate; velvet textures, warmth, lingering sweetness.' },
    Rebel: { label: 'The Rebel', desc: 'Bold, unpredictable; high contrast, citrus smoke, sharp edges.' },
    Mystic: { label: 'The Mystic', desc: 'Enigmatic, deep; dark spirits, complex botanicals, herbal mystery.' },
    Hunter: { label: 'The Hunter', desc: 'Primal, focused; rich wood, peat, high proof, a dry finish.' },
  },
  taste: {
    Smoke: { label: 'Smoke', desc: 'Peat, charred wood, toasted oak, lapsang souchong, dark roast.' },
    Frost: { label: 'Frost', desc: 'Crisp mint, eucalyptus, pine, icy mineral, sub-zero clarity.' },
    Ember: { label: 'Ember', desc: 'Warm chilli, ginger, peppercorn, baked citrus, spiced warmth.' },
    Bloom: { label: 'Bloom', desc: 'Elderflower, rose damascena, jasmine, lavender, stone fruit.' },
  },
  accord: {
    'Bitter & Long': { label: 'Bitter & Long', desc: 'Gentian, amaro, cardamom; a finish that lingers and deepens.' },
    'Sweet & Short': { label: 'Sweet & Short', desc: 'Demerara, orange velvet; round, brief, generous.' },
    'Spicy & Loud': { label: 'Spicy & Loud', desc: "Bird's eye chilli, fresh ginger; bright nerve, a loud close." },
    'Dry & Silent': { label: 'Dry & Silent', desc: 'Sub-zero dry vermouth, lemon bitters; quiet, taut, austere.' },
  },
};

const pick = (step: string, id?: string) =>
  (id && LABELS[step]?.[id]) || Object.values(LABELS[step])[0];

function buildPrompt(c: Choices): string {
  const i = pick('identity', c.identity);
  const t = pick('taste', c.taste);
  const a = pick('accord', c.accord);

  return [
    'You are the alchemist of Ice & Instinct, a by-appointment private mixology house in Manhattan.',
    'Strict house aesthetic: monochrome, restrained, editorial. No cliche luxury (no "24k gold", no neon), no emoji, no em-dashes (use hyphens).',
    'A guest has revealed who they are tonight through three choices. Compose ONE bespoke cocktail for them - real, makeable, poetic but precise. Speak to the archetype.',
    '',
    `Identity (who they are tonight): ${i.label} (${i.desc})`,
    `Anchor (the core flavour): ${t.label} (${t.desc})`,
    `Accord (the finish): ${a.label} (${a.desc})`,
    '',
    'Return strictly the JSON schema. Notes:',
    '- name: 2-4 words, evocative; "The ..." is welcome.',
    '- tagline: one line addressed to this archetype.',
    '- ingredients: 4-6 lines, each "<measure>  <ingredient>", the last line a garnish.',
    '- instructions: 3-5 precise steps for the chosen glass.',
    '- sensoryNarrative: 2-3 sentences weaving identity, anchor and accord together.',
    '- colorProfile: one sentence describing the liquid colour.',
    '- tint: a single CSS oklch() string for that colour, kept low-chroma (e.g. "oklch(62% 0.06 60)").',
    '- glass: exactly one of "coupe" | "rocks" | "highball" | "nicknora".',
    '- archetype: "The <Identity>" (e.g. "The Mystic").',
  ].join('\n');
}

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    name: { type: 'STRING' },
    tagline: { type: 'STRING' },
    ingredients: { type: 'ARRAY', items: { type: 'STRING' } },
    instructions: { type: 'ARRAY', items: { type: 'STRING' } },
    sensoryNarrative: { type: 'STRING' },
    colorProfile: { type: 'STRING' },
    tint: { type: 'STRING' },
    glass: { type: 'STRING', enum: ['coupe', 'rocks', 'highball', 'nicknora'] },
    archetype: { type: 'STRING' },
  },
  required: ['name', 'tagline', 'ingredients', 'instructions', 'sensoryNarrative', 'colorProfile', 'tint', 'glass', 'archetype'],
};

const GLASSES = ['coupe', 'rocks', 'highball', 'nicknora'];

function valid(r: any): r is Recipe {
  return (
    r &&
    typeof r.name === 'string' &&
    typeof r.tagline === 'string' &&
    Array.isArray(r.ingredients) && r.ingredients.length > 0 &&
    Array.isArray(r.instructions) && r.instructions.length > 0 &&
    typeof r.sensoryNarrative === 'string' &&
    typeof r.colorProfile === 'string' &&
    typeof r.tint === 'string' &&
    typeof r.glass === 'string' && GLASSES.includes(r.glass) &&
    typeof r.archetype === 'string'
  );
}

/**
 * Compose a recipe via Gemini. Returns null on ANY failure (no key, bad
 * response, network) so the caller can fall back silently.
 */
export async function composeWithGemini(choices: Choices, apiKey: string): Promise<Recipe | null> {
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_') || apiKey.includes('PLACEHOLDER')) return null;

  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' +
    encodeURIComponent(apiKey);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(choices) }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: RESPONSE_SCHEMA, temperature: 1.0 },
      }),
    });
    if (!res.ok) return null;
    const data: any = await res.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    const parsed = JSON.parse(text.trim());
    return valid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
