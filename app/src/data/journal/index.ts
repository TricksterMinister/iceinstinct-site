// The /journal/ ledger. Order is editorial (newest thinking first), not
// chronological - all three pillars share a publication date. Mirrored by the
// ItemList JSON-LD in app/journal/index.html; edit both together.

import type { JournalIndexEntry } from './types';

export const journalIndex: JournalIndexEntry[] = [
  {
    slug: 'cocktail-omakase-explained',
    n: '01',
    title: 'Cocktail Omakase: the No-Menu Evening, Explained',
    standfirst:
      'No menu, no recipe cards, every drink composed in the moment. What omakase means when it moves from the sushi counter to the bar - and how the evening actually works.',
    date: 'June 10, 2026',
    dateISO: '2026-06-10',
    readTime: '6 min read',
  },
  {
    slug: 'clear-ice-why-it-matters',
    n: '02',
    title: 'Clear Ice: Why It Matters and How We Source It',
    standfirst:
      'Ice is the largest ingredient in most cocktails and the least examined. The simple physics of clarity, the case for dilution control, and why clear ice is standard at every tier.',
    date: 'June 10, 2026',
    dateISO: '2026-06-10',
    readTime: '5 min read',
  },
  {
    slug: 'cigar-and-cocktail-pairing',
    n: '03',
    title: 'Cigar and Cocktail Pairing: a Sommelier’s Method',
    standfirst:
      'Structure, sweetness, strength - the grammar of wine service applied to smoke, by the first certified sommelier in the history of Georgia.',
    date: 'June 10, 2026',
    dateISO: '2026-06-10',
    readTime: '6 min read',
  },
];
