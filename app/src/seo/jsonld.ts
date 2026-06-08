// schema.org JSON-LD builders for Ice & Instinct.
// Plain JS objects, consumed by seoData.ts. Ported from the legacy vanilla site
// (_legacy-vanilla/*) where real markup existed; gaps filled from project data.

const SITE = "https://www.iceinstinct.com";
const ORG_ID = `${SITE}/#organization`;

export function organization(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Ice & Instinct",
    url: `${SITE}/`,
    sameAs: [],
    description:
      "Private mixology studio in the New York metropolitan area. By appointment only. Signature cocktails, omakase improvisation, and concierge service for the highest-tier private hosts.",
    areaServed: "New York Metropolitan Area",
  };
}

export function cocktailItemList(): object {
  const names = [
    "White Lotus",
    "Aviation",
    "Persimmon Saffron Sour",
    "Belladonna",
    "Black Truffle Martini",
    "Rose Garden Rendezvous",
    "Aureliano",
    "Basil in my mind",
    "1001 Nights",
    "Call Me By Your Name",
    "Calipso Cream",
    "Bésame",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ice & Instinct - The Collection",
    itemListElement: names.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };
}

export type TierKey = "foundation" | "simplicity" | "bespoke" | "omakase";

type TierSpec = {
  name: string;
  price: number;
  guests: string;
  hours: string;
  url: string;
};

const TIERS: Record<TierKey, TierSpec> = {
  foundation: {
    name: "The Foundation",
    price: 400,
    guests: "up to 40 guests",
    hours: "3 hours",
    url: `${SITE}/offerings/foundation/`,
  },
  simplicity: {
    name: "Perfection in Simplicity",
    price: 750,
    guests: "up to 12 guests",
    hours: "4 hours",
    url: `${SITE}/offerings/simplicity/`,
  },
  bespoke: {
    name: "Bespoke Design & Artistry",
    price: 1500,
    guests: "up to 15 guests",
    hours: "4 hours",
    url: `${SITE}/offerings/bespoke/`,
  },
  omakase: {
    name: "Omakase Improvisation",
    price: 3000,
    guests: "up to 25 guests",
    hours: "open-ended",
    url: `${SITE}/offerings/omakase/`,
  },
};

export function tierService(tier: TierKey): object {
  const t = TIERS[tier];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${t.name} - Ice & Instinct`,
    url: t.url,
    description: `Private mixology service in the New York metropolitan area. ${t.guests}, ${t.hours}.`,
    areaServed: "New York Metropolitan Area",
    provider: organization(),
    offers: {
      "@type": "Offer",
      price: t.price,
      priceCurrency: "USD",
    },
  };
}

export function tierItemList(): object {
  const order: TierKey[] = ["foundation", "simplicity", "bespoke", "omakase"];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ice & Instinct - Service Tiers",
    itemListElement: order.map((key, i) => {
      const t = TIERS[key];
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: t.name,
          url: t.url,
          offers: {
            "@type": "Offer",
            price: t.price,
            priceCurrency: "USD",
          },
        },
      };
    }),
  };
}

export function founderPerson(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Teimuraz Benidze",
    jobTitle: "Founder & Flavor Architect",
    worksFor: organization(),
  };
}
