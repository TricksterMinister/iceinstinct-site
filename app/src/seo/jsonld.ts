// schema.org JSON-LD builders for Ice & Instinct.
// Plain JS objects, consumed by seoData.ts. Ported from the legacy vanilla site
// (_legacy-vanilla/*) where real markup existed; gaps filled from project data.

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
    priceRange: "$650-$3000+",
    foundingDate: "2024",
    founder: { "@id": `${SITE}/#founder` },
    sameAs: [
      "https://www.instagram.com/iceinstinctnyc/",
      "https://share.google/AKKPuz8ZvIK8uKzfk",
    ],
    description:
      "Private mixology studio serving the New York metropolitan area and New Jersey. By appointment only. Signature cocktails, omakase improvisation, and concierge service for the highest-tier private hosts.",
    areaServed: [
      { "@type": "City", name: "New York" },
      { "@type": "Place", name: "Manhattan" },
      { "@type": "Place", name: "Brooklyn" },
      { "@type": "AdministrativeArea", name: "New Jersey" },
      { "@type": "AdministrativeArea", name: "Westchester County" },
      { "@type": "Place", name: "The Hamptons" },
      { "@type": "City", name: "Greenwich" },
    ],
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
      "Founder of Ice & Instinct. Two decades of wine and service; the first certified sommelier in Georgia's history.",
    knowsAbout: ["Mixology", "Sommellerie", "Wine pairing", "Clear ice craft", "Cigar and cocktail pairing"],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "Certificat - Wine & Sommellerie", recognizedBy: { "@type": "Organization", name: "Lycee interprofessionnel Louis Martin Bret, Chateau-Arnoux, France" } },
      { "@type": "EducationalOccupationalCredential", name: "Leading Qualified Sommelier", recognizedBy: { "@type": "Organization", name: "Georgian Sommelier Association (ASI)" } },
      { "@type": "EducationalOccupationalCredential", name: "Diploma - Wines & Spirits", recognizedBy: { "@type": "Organization", name: "Enotria Wine World, Moscow" } },
      { "@type": "EducationalOccupationalCredential", name: "French Wine Studies", recognizedBy: { "@type": "Organization", name: "O.N.I.VINS - National Bureau of French Wines" } },
    ],
    memberOf: { "@type": "Organization", name: "Georgian Sommelier Association (ASI)" },
    sameAs: ["https://www.instagram.com/iceinstinctnyc/"],
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
