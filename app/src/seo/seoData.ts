// Per-route SEO metadata for Ice & Instinct.
// Titles + descriptions ported from the legacy vanilla site (_legacy-vanilla/*);
// the home title was written fresh (legacy home was a cinema prototype).
// canonical = https://www.iceinstinct.com + route key. No trailing index.html.
// ogImage paths point at branded 1200x630 OG cards under /assets/og/.

import {
  organization,
  cocktailItemList,
  tierService,
  tierItemList,
  founderPerson,
  offeringsFaq,
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
    title: "Ice & Instinct - Private Mixology Studio, NYC & New Jersey",
    description:
      "A private mixology studio serving New York City and New Jersey. Signature cocktails, omakase improvisation, and concierge service for the highest-tier private hosts. By appointment only.",
    canonical: `${SITE}/`,
    ogTitle: "Ice & Instinct - Private Mixology Studio, NYC & New Jersey",
    ogDescription:
      "Signature cocktails and omakase improvisation for the highest-tier private hosts. By appointment only.",
    ogImage: "/assets/og/home.png",
    jsonLd: [organization()],
  },

  '/offerings/': {
    title: "Offerings - Ice & Instinct",
    description:
      "Four levels of private mixology service in New York, from intimate solos to omakase improvisation. Plus curated add-ons for the most demanding evenings.",
    canonical: `${SITE}/offerings/`,
    ogTitle: "Offerings - Ice & Instinct",
    ogDescription: "Four levels of private mixology service. Plus curated add-ons.",
    ogImage: "/assets/og/offerings.png",
    jsonLd: [tierItemList(), offeringsFaq()],
  },

  '/offerings/foundation/': {
    title: "The Foundation - Ice & Instinct, from $650",
    description:
      "The Foundation tier from Ice & Instinct. Impeccable drinks, delivered by a bartender from the founder's own circle - hand-picked and trusted. From $650, up to 15 guests, 3 hours. New York.",
    canonical: `${SITE}/offerings/foundation/`,
    ogTitle: "The Foundation - Ice & Instinct, from $650",
    ogDescription:
      "Impeccable drinks, professional presence, seamless execution. The most intimate way to experience the Ice & Instinct standard.",
    ogImage: "/assets/og/foundation.png",
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
    ogImage: "/assets/og/simplicity.png",
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
    ogImage: "/assets/og/bespoke.png",
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
    ogImage: "/assets/og/omakase.png",
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
    ogImage: "/assets/og/concierge.png",
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
    ogImage: "/assets/og/mystory.png",
    jsonLd: [founderPerson()],
  },

  '/weddings/': {
    title: "Wedding Bar & Cocktail Service NYC & NJ - Ice & Instinct",
    description:
      "Wedding bar and cocktail service for NYC and New Jersey. His-and-hers signature cocktails, a full bar team, professional clear ice, and a zero-proof program. From $650.",
    canonical: `${SITE}/weddings/`,
    ogTitle: "Wedding Bar & Cocktail Service NYC & NJ - Ice & Instinct",
    ogDescription:
      "His-and-hers signatures, a scalable bar team, professional clear ice. Wedding bar service for NYC and New Jersey, from $650.",
    ogImage: "/assets/og/weddings.png",
    // Service + FAQPage JSON-LD are hand-authored in the page stub head;
    // prerender preserves shell schema and skips this list.
    jsonLd: [],
  },

  '/corporate/': {
    title: "Corporate Event Bar Service NYC & NJ - Ice & Instinct",
    description:
      "Corporate event bar service in NYC and New Jersey. Brand events, client dinners, offsites, product launches. Invoicing, COI on request, W-9 ready. Four tiers from $650.",
    canonical: `${SITE}/corporate/`,
    ogTitle: "Corporate Event Bar Service NYC & NJ - Ice & Instinct",
    ogDescription:
      "A bar that is part of the program, not the catering line. Four tiers from $650, invoicing available, zero-proof program, NYC metro and New Jersey.",
    ogImage: "/assets/og/corporate.png",
    jsonLd: [],
  },

  '/gift/': {
    title: "Gift an Evening - Private Mixology Gift Certificate, NYC & NJ",
    description:
      "Gift an Ice & Instinct evening: a private mixology experience as a framed certificate. Two options, $650 and $900, valid 12 months, date transferable. NYC metro and New Jersey.",
    canonical: `${SITE}/gift/`,
    ogTitle: "Gift an Evening - Ice & Instinct",
    ogDescription:
      "A private mixology evening as a gift: framed certificate, valid 12 months. From $650.",
    ogImage: "/assets/og/gift.png",
    jsonLd: [],
  },

  '/gallery/': {
    title: "The Collection - Ice & Instinct",
    description:
      "The Collection: signature cocktails from Ice & Instinct. Thirteen compositions, each built once. Touch the glass to awaken the spirit.",
    canonical: `${SITE}/gallery/`,
    ogTitle: "The Collection - Ice & Instinct",
    ogDescription:
      "Thirteen signature compositions. Touch the glass to awaken the spirit.",
    ogImage:
      "/assets/og/gallery.png",
    jsonLd: [cocktailItemList()],
  },

  '/contact/': {
    title: "Inquire - Ice & Instinct",
    description:
      "Tell us about the evening you have in mind. We respond within one business day with a private quote.",
    canonical: `${SITE}/contact/`,
    ogTitle: "Inquire - Ice & Instinct",
    ogDescription: "Begin the conversation. By appointment only.",
    ogImage: "/assets/og/contact.png",
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
    ogImage: "/assets/og/home.png",
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
    ogImage: "/assets/og/home.png",
    jsonLd: [],
  },
  '/cookies/': {
    title: "Cookie Policy - Ice & Instinct",
    description:
      "The cookies used on the Ice & Instinct website, what they do, and how to control or opt out of them.",
    canonical: `${SITE}/cookies/`,
    ogTitle: "Cookie Policy - Ice & Instinct",
    ogDescription:
      "The cookies the Ice & Instinct site uses and how to control them.",
    ogImage: "/assets/og/home.png",
    jsonLd: [],
  },
  '/accessibility/': {
    title: "Accessibility Statement - Ice & Instinct",
    description:
      "How Ice & Instinct works to make its website accessible, the standards we follow, and how to report a barrier.",
    canonical: `${SITE}/accessibility/`,
    ogTitle: "Accessibility Statement - Ice & Instinct",
    ogDescription:
      "Our commitment to an accessible website and how to reach us about it.",
    ogImage: "/assets/og/home.png",
    jsonLd: [],
  },
  '/responsible-service/': {
    title: "Responsible Service & Alcohol Policy - Ice & Instinct",
    description:
      "How Ice & Instinct serves alcohol responsibly: 21-and-over service, refusal of intoxicated guests, and New York dram shop and host responsibilities.",
    canonical: `${SITE}/responsible-service/`,
    ogTitle: "Responsible Service & Alcohol Policy - Ice & Instinct",
    ogDescription:
      "Our 21-and-over, responsible-service standard and the host responsibilities under New York law.",
    ogImage: "/assets/og/home.png",
    jsonLd: [],
  },
};
