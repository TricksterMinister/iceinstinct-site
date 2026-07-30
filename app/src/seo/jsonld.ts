// schema.org JSON-LD builders for Ice & Instinct.
// Plain JS objects, consumed by seoData.ts. Ported from the legacy vanilla site
// (_legacy-vanilla/*) where real markup existed; gaps filled from project data.

import { COCKTAIL_PROFILES } from "../data/cocktails";

const SITE = "https://www.iceinstinct.com";
const ORG_ID = `${SITE}/#organization`;

export function organization(): object {
  return {
    "@context": "https://schema.org",
    // Both types: the brand entity AND a local service-area business, so
    // Google can corroborate the (existing) Business Profile against the site.
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: "Ice & Instinct",
    url: `${SITE}/`,
    logo: `${SITE}/assets/icon-512.png`,
    image: `${SITE}/assets/og/home.png`,
    telephone: "+1-917-292-7859",
    email: "hello@iceinstinct.com",
    priceRange: "$$$$ ($450-$3500)",
    foundingDate: "2024",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.0060,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "28",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Private Host, Manhattan Penthouse" },
        datePublished: "2026-05-14",
        reviewBody: "An extraordinary cocktail omakase experience. Teimuraz created drinks on the spot tailored to each guest with precision and theatre.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
    ],
    founder: { "@id": `${SITE}/#founder` },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@iceinstinct.com",
      contactType: "customer service",
      areaServed: ["US-NY", "US-NJ", "US-CT"],
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://www.instagram.com/iceinstinctnyc/",
      "https://share.google/AKKPuz8ZvIK8uKzfk",
    ],
    description:
      "Private mixology studio serving the New York metropolitan area, New Jersey, the Hamptons, and Greenwich CT. By appointment only. Signature cocktails, omakase improvisation, event bartenders, and concierge service.",
    areaServed: [
      { "@type": "City", name: "New York" },
      { "@type": "Place", name: "Manhattan" },
      { "@type": "Place", name: "Brooklyn" },
      { "@type": "Place", name: "Queens" },
      { "@type": "AdministrativeArea", name: "New Jersey" },
      { "@type": "City", name: "Hoboken" },
      { "@type": "City", name: "Jersey City" },
      { "@type": "City", name: "Montclair" },
      { "@type": "AdministrativeArea", name: "Westchester County" },
      { "@type": "City", name: "Scarsdale" },
      { "@type": "City", name: "Rye" },
      { "@type": "Place", name: "The Hamptons" },
      { "@type": "City", name: "Southampton" },
      { "@type": "City", name: "East Hampton" },
      { "@type": "City", name: "Montauk" },
      { "@type": "City", name: "Greenwich" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Private Mixology & Cocktail Services",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Instinct Master Atelier (Private Mixology Tiers)" },
        { "@type": "OfferCatalog", name: "ICE (Event Bartenders On Call)" },
        { "@type": "OfferCatalog", name: "Concierge & Custom Enhancements" },
      ],
    },
  };
}

export function breadcrumbList(items: Array<{ name: string; item: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.item.startsWith("http") ? crumb.item : `${SITE}${crumb.item}`,
    })),
  };
}

export type GeoRegionKey = "manhattan" | "new-jersey" | "hamptons" | "westchester-greenwich";

const GEO_SPECS: Record<GeoRegionKey, { name: string; url: string; description: string; places: string[] }> = {
  manhattan: {
    name: "Private Bartending in Manhattan",
    url: `${SITE}/manhattan/`,
    description: "Private mixology and cocktail service for Manhattan penthouses, doorman buildings, and luxury terraces. COI & freight elevator handled.",
    places: ["Manhattan", "Upper East Side", "Upper West Side", "Tribeca", "SoHo", "Hudson Yards", "Chelsea", "Greenwich Village"],
  },
  "new-jersey": {
    name: "Private Bartending in New Jersey",
    url: `${SITE}/new-jersey/`,
    description: "Private mixology and event bartender service across New Jersey, Hoboken to Montclair, Alpine and Short Hills.",
    places: ["New Jersey", "Hoboken", "Jersey City", "Montclair", "Alpine", "Short Hills", "Summit", "Englewood", "Princeton"],
  },
  hamptons: {
    name: "Hamptons Private Bartending & Cocktail Service",
    url: `${SITE}/hamptons/`,
    description: "Private mixology and event bar service for Hamptons estates, Southampton to Montauk.",
    places: ["The Hamptons", "Southampton", "East Hampton", "Montauk", "Sag Harbor", "Bridgehampton", "Water Mill"],
  },
  "westchester-greenwich": {
    name: "Private Bartending Westchester & Greenwich",
    url: `${SITE}/westchester-greenwich/`,
    description: "Private mixology and sommelier-led cocktail service for Scarsdale, Rye, Bedford, and Greenwich CT.",
    places: ["Westchester County", "Scarsdale", "Rye", "Bedford", "Pound Ridge", "Greenwich CT"],
  },
};

export function geoService(key: GeoRegionKey): object {
  const g = GEO_SPECS[key];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${g.name} - Ice & Instinct`,
    url: g.url,
    description: g.description,
    provider: { "@id": ORG_ID },
    areaServed: g.places.map((p) => ({ "@type": "Place", name: p })),
    serviceType: "Private Mixology & Cocktail Service",
  };
}

export function website(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: `${SITE}/`,
    name: "Ice & Instinct",
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
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
    "Negroni Verde",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ice & Instinct - The Collection",
    itemListElement: names.map((name, i) => {
      // Same sentence shown on the gallery tile; single source of truth.
      const description = COCKTAIL_PROFILES[name]?.description;
      return {
        "@type": "ListItem",
        position: i + 1,
        name,
        ...(description ? { description } : {}),
      };
    }),
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
    price: 650,
    guests: "up to 15 guests",
    hours: "3 hours",
    url: `${SITE}/offerings/foundation/`,
  },
  simplicity: {
    name: "Perfection in Simplicity",
    price: 900,
    guests: "up to 12 guests",
    hours: "4 hours",
    url: `${SITE}/offerings/simplicity/`,
  },
  bespoke: {
    name: "Bespoke Design & Artistry",
    price: 1800,
    guests: "up to 30 guests",
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
    areaServed: ["New York Metropolitan Area", "New Jersey"],
    provider: { "@id": ORG_ID },
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
    "@id": `${SITE}/#founder`,
    name: "Teimuraz Benidze",
    jobTitle: "Founder & Flavor Architect",
    description:
      "Founder of Ice & Instinct. Three decades of wine and service; the first certified sommelier in Georgia's history.",
    knowsAbout: ["Mixology", "Sommellerie", "Wine pairing", "Clear ice craft", "Cigar and cocktail pairing"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "Certificat - Wine & Sommellerie", recognizedBy: { "@type": "Organization", name: "Lycee interprofessionnel Louis Martin Bret, Chateau-Arnoux, France" } },
      { "@type": "EducationalOccupationalCredential", name: "Leading Qualified Sommelier", recognizedBy: { "@type": "Organization", name: "Georgian Sommelier Association (ASI)" } },
      { "@type": "EducationalOccupationalCredential", name: "Diploma - Wines & Spirits", recognizedBy: { "@type": "Organization", name: "Enotria Wine World, Moscow" } },
      { "@type": "EducationalOccupationalCredential", name: "French Wine Studies", recognizedBy: { "@type": "Organization", name: "O.N.I.VINS - National Bureau of French Wines" } },
    ],
    memberOf: { "@type": "Organization", name: "Georgian Sommelier Association (ASI)" },
    sameAs: [
      "https://www.wikidata.org/wiki/Q139413110",
      "https://www.instagram.com/iceinstinctnyc/",
    ],
    worksFor: { "@id": ORG_ID },
  };
}

// The 12 visible questions on /offerings/ (sections/Faq.tsx), as FAQPage so AI
// engines and rich results can quote the deposit, cancellation and service
// area answers directly. Keep in sync with sections/Faq.tsx.
export function offeringsFaq(): object {
  const qa: Array<[string, string]> = [
    ["What is Ice and Instinct?", "A private mixology studio for the home and the event. Led by one alchemist and carried by a team of trusted New York bartenders, it brings the craft, theatre, and discipline of a world-class bar into your own room."],
    ["What actually happens at an event?", "We arrive, build the bar, and run the evening end to end. Each cocktail is made in real time, with intention. You set the rhythm through one of four tiers, from impeccable classics to off-menu omakase improvisation."],
    ["Is alcohol included in the price?", "No. The tier price covers the craft, service, and expertise. You may provide the spirits and wine yourself, or we handle the entire purchase on your behalf at supplier cost."],
    ["Do you bring everything - bar, tools, ice, glassware?", "Yes. The bar setup, tools, and service are fully handled. Specialty ice from Michelin-level suppliers, curated glassware, and rentals are arranged through the Concierge and billed at supplier cost."],
    ["Where do you serve?", "The New York metropolitan area and New Jersey. Events further out are welcome, and any travel is included in your private quote."],
    ["Can you handle a large event or wedding?", "Yes. One alchemist leads, and a team of trusted New York bartenders scales the service from an intimate solo performance to a full bar team for weddings, galas, and corporate events."],
    ["Which tier should I choose?", "Foundation is for intimate gatherings, Simplicity for a refined solo performance, Bespoke for signature cocktails built around your theme, and Omakase for a no-menu, improvised experience. Tell us the date, guest count, and mood, and we will guide you."],
    ["Can the cocktails be tailored, and do you offer non-alcoholic options?", "Yes to both. Every menu is built around your taste, theme, and any dietary needs, and a full zero-proof program is available so each guest is served with the same care."],
    ["How far ahead should I book?", "Two or more weeks is ideal, and shorter timelines are often possible. Ask, and we will tell you honestly what we can do."],
    ["How does the deposit work?", "A flat $500 deposit reserves your date. The balance is due before the event."],
    ["What is your cancellation policy?", "More than 14 days before the event, your $500 deposit is refunded. Within 14 days, the deposit is non-refundable but transferable to a future date within 12 months, subject to availability. Within 48 hours of the event, the full booking value is due."],
    ["How do I book?", "Send the date, the room, and the guest count through the inquiry form. You will have a private quote within one business day."],
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
