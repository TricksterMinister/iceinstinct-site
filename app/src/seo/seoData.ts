// Per-route SEO metadata for Ice & Instinct.
// Titles + descriptions ported from the legacy vanilla site (_legacy-vanilla/*);
// the home title was written fresh (legacy home was a cinema prototype).
// canonical = https://www.iceinstinct.com + route key. No trailing index.html.
// ogImage paths all point at real files under /assets/photos/.

import {
  organization,
  cocktailItemList,
  tierService,
  tierItemList,
  founderPerson,
} from "./jsonld";

export type RouteSeo = {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  jsonLd: object[];
};

const SITE = "https://www.iceinstinct.com";

export const SEO_BY_ROUTE: Record<string, RouteSeo> = {
  '/': {
    title: "Ice & Instinct - Private Mixology Studio, New York",
    description:
      "A private mixology studio in New York. Signature cocktails, omakase improvisation, and concierge service for the highest-tier private hosts. By appointment only.",
    canonical: `${SITE}/`,
    ogTitle: "Ice & Instinct - Private Mixology Studio, New York",
    ogDescription:
      "Signature cocktails and omakase improvisation for the highest-tier private hosts. By appointment only.",
    ogImage: "/assets/photos/hero-cocktails.png",
    jsonLd: [organization()],
  },

  '/offerings/': {
    title: "Offerings - Ice & Instinct",
    description:
      "Four levels of private mixology service in New York, from intimate solos to omakase improvisation. Plus curated add-ons for the most demanding evenings.",
    canonical: `${SITE}/offerings/`,
    ogTitle: "Offerings - Ice & Instinct",
    ogDescription: "Four levels of private mixology service. Plus curated add-ons.",
    ogImage: "/assets/photos/hero-cocktails.png",
    jsonLd: [tierItemList()],
  },

  '/offerings/foundation/': {
    title: "The Foundation - Ice & Instinct, from $650",
    description:
      "The Essential service tier from Ice & Instinct. Impeccable drinks, professional bartender from our trained collective. From $650, up to 15 guests, 3 hours. New York.",
    canonical: `${SITE}/offerings/foundation/`,
    ogTitle: "The Foundation - Ice & Instinct, from $650",
    ogDescription:
      "Impeccable drinks, professional presence, seamless execution. The accessible entry point to the Ice & Instinct standard.",
    ogImage: "/assets/photos/tier-foundation.jpg",
    jsonLd: [tierService("foundation")],
  },

  '/offerings/simplicity/': {
    title: "Perfection in Simplicity - Ice & Instinct, from $900",
    description:
      "The Executive Standard from Ice & Instinct. Timeless classics executed with surgical precision by the Master Mixologist personally. From $900, up to 12 guests, 4 hours.",
    canonical: `${SITE}/offerings/simplicity/`,
    ogTitle: "Perfection in Simplicity - Ice & Instinct, from $900",
    ogDescription:
      "Heritage over hype. The world's most iconic cocktails executed with quiet precision by the Master Mixologist himself.",
    ogImage: "/assets/photos/tier-simplicity.jpg",
    jsonLd: [tierService("simplicity")],
  },

  '/offerings/bespoke/': {
    title: "Bespoke Design & Artistry - Ice & Instinct, from $1,800",
    description:
      "The Architect tier from Ice & Instinct. Signature cocktails designed around your event's theme, color palette, and story. From $1,800, up to 30 guests, 4 hours.",
    canonical: `${SITE}/offerings/bespoke/`,
    ogTitle: "Bespoke Design & Artistry - Ice & Instinct, from $1,800",
    ogDescription:
      "Your vision, crafted into every glass. Storytelling. Visual impact. Mixology as creative collaboration.",
    ogImage: "/assets/photos/tier-bespoke.jpg",
    jsonLd: [tierService("bespoke")],
  },

  '/offerings/omakase/': {
    title: "Omakase Improvisation - Ice & Instinct, from $3,000",
    description:
      "The Alchemist tier from Ice & Instinct. No menu. No repetition. Real-time spontaneous creation by the Master Mixologist. From $3,000, up to 25 guests, 4-6 hours.",
    canonical: `${SITE}/offerings/omakase/`,
    ogTitle: "Omakase Improvisation - Ice & Instinct, from $3,000",
    ogDescription:
      "Pure creation. No menu. Unrepeatable moments. Complete trust. Performance art for cocktails.",
    ogImage: "/assets/photos/tier-omakase.jpg",
    jsonLd: [tierService("omakase")],
  },

  '/concierge/': {
    title: "Concierge & Enhancements - Ice & Instinct",
    description:
      "Five curated enhancements that augment any Ice & Instinct service tier: cigar curator, additional bar staff, the curator (creative oversight), glassware sourcing, ice and temperature management.",
    canonical: `${SITE}/concierge/`,
    ogTitle: "Concierge & Enhancements - Ice & Instinct",
    ogDescription:
      "Five curated enhancements that augment any service tier: cigars, staff, curation, glassware, ice.",
    ogImage: "/assets/photos/concierge-still.jpg",
    jsonLd: [],
  },

  '/my-story/': {
    title: "My Story - Ice & Instinct, by Teimuraz Benidze",
    description:
      "Teimuraz Benidze, founder and flavor architect of Ice & Instinct. From Georgia to New York City: where ritual meets instinct, high above the city.",
    canonical: `${SITE}/my-story/`,
    ogTitle: "My Story - Teimuraz Benidze, Ice & Instinct",
    ogDescription:
      "Founder and flavor architect of Ice & Instinct. Where ritual meets instinct.",
    ogImage: "/assets/photos/founder-temo.jpg",
    jsonLd: [founderPerson()],
  },

  '/gallery/': {
    title: "The Collection - Ice & Instinct",
    description:
      "The Collection: signature cocktails from Ice & Instinct. Twelve compositions, each built once. Touch the glass to awaken the spirit.",
    canonical: `${SITE}/gallery/`,
    ogTitle: "The Collection - Ice & Instinct",
    ogDescription:
      "Twelve signature compositions. Touch the glass to awaken the spirit.",
    ogImage:
      "/assets/photos/whisk_846abe364a79561875e4301e4babf857dr-L6nLZkkNeVKxuDwj.jpeg",
    jsonLd: [cocktailItemList()],
  },

  '/contact/': {
    title: "Inquire - Ice & Instinct",
    description:
      "Tell us about the evening you have in mind. We respond within one business day with a private quote.",
    canonical: `${SITE}/contact/`,
    ogTitle: "Inquire - Ice & Instinct",
    ogDescription: "Begin the conversation. By appointment only.",
    ogImage: "/assets/photos/hero-cocktails.png",
    jsonLd: [],
  },

  '/privacy/': {
    title: "Privacy Policy - Ice & Instinct",
    description:
      "How Ice & Instinct collects, uses, and protects information you share through this site and inquiry form.",
    canonical: `${SITE}/privacy/`,
    ogTitle: "Privacy Policy - Ice & Instinct",
    ogDescription:
      "How Ice & Instinct collects, uses, and protects the information you share.",
    ogImage: "/assets/photos/hero-cocktails.png",
    jsonLd: [],
  },

  '/terms/': {
    title: "Terms of Service - Ice & Instinct",
    description:
      "Terms governing the use of the Ice & Instinct website and the engagement between Ice & Instinct and clients.",
    canonical: `${SITE}/terms/`,
    ogTitle: "Terms of Service - Ice & Instinct",
    ogDescription:
      "Terms governing the use of the Ice & Instinct website and client engagements.",
    ogImage: "/assets/photos/hero-cocktails.png",
    jsonLd: [],
  },
};
