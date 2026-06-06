import type { ReactNode } from 'react';

/** One pricing/scaling tier in the section III ledger. */
export interface Tier {
  label: string; // "A" | "B" | "C"
  name: string; // "The Soloist"
  meta: string; // "Up to 15 guests" / "16 to 25 guests - hard limit"
  personnel: string; // "1 Master Mixologist + 1 Logistical Assistant"
  focus: string; // "Deep engagement and complex, individual creation"
  price: string; // "From $3,000" | "Not recommended" | "Custom Quote"
  muted?: boolean; // true => .is-muted styling (e.g. Omakase tier C)
}

/** A numbered/listed item (IV timeline, V grid, VI timeline). */
export interface Item {
  title: string;
  body: string;
  tag?: string; // optional .cell-tag pill, e.g. "mandatory inclusion"
}

/** Everything that differs between the four offering pages. Design is fixed in
 *  OfferingPage.tsx; only this data + media changes per page. */
export interface OfferingContent {
  slug: 'omakase' | 'foundation' | 'simplicity' | 'bespoke';
  name: string; // "Omakase" - used in the menu overlay eyebrow
  ghost: string; // "OMAKASE" - hero + closing background word

  hero: {
    headline: ReactNode;
    lead: string;
    price: string; // "From $3,000 USD"
    priceMeta: string; // "Up to 25 guests - 4-6 hours - New York Metropolitan Area"
    video: { poster: string; src: string; alt: string };
  };

  overview: {
    title: ReactNode;
    paras: string[];
    pull: ReactNode;
    foot: string;
  };

  bridge: {
    photo: string;
    photoAlt: string;
    selection: { title: ReactNode; lead: string };
    focus: { title: ReactNode; lead: string };
  };

  scaling: { desc: string; tiers: Tier[] };
  included: { intro: string; steps: Item[] };
  standard: { intro: string; items: Item[] };
  host: { intro: string; steps: Item[] };

  notes: {
    title: ReactNode; // <>Experience <span className="it">notes.</span></>
    items: ReactNode[]; // each note (may contain a link)
  };

  navLabels: [string, string, string, string, string, string, string]; // I..VII (VII varies)

  closing: { title: ReactNode; lead: string };
}
