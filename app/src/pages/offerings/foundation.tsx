import type { OfferingContent } from './types';

// NOTE (phase 2): hero video + bridge photo reuse Omakase assets as placeholders;
// pricing transcribed from offerings/foundation/index.html, to be confirmed.
export const foundationContent: OfferingContent = {
  slug: 'foundation',
  name: 'Foundation',
  ghost: 'FOUNDATION',

  hero: {
    headline: (
      <>
        The <span className="it">Foundation.</span>
      </>
    ),
    lead: 'For those who understand that elegance lies in simplicity. The accessible entry point to the Ice & Instinct standard - delivered by a trained professional bartender from our collective.',
    price: 'From $400 USD',
    priceMeta: 'Up to 40 guests · 3 hours · New York Metropolitan Area',
    video: {
      poster: '/assets/photos/foundation-hero-poster.png',
      src: '/assets/media/foundation-hero.mp4',
      alt: 'Foundation tier mood',
    },
  },

  overview: {
    title: (
      <>
        Distillation, <span className="it">not compromise.</span>
      </>
    ),
    paras: [
      'For those who understand that elegance lies in simplicity. The Essential delivers the core of what makes a gathering memorable: impeccable drinks, professional presence, and seamless execution.',
      'This is not a compromise. This is distillation - the same philosophy, the same standards, focused into a refined format designed for intimate celebrations.',
      'A trained bartender from the Ice & Instinct collective arrives with the tools, technique, and presence to transform your home bar into something more. Classic cocktails executed with precision. Contemporary favorites crafted with care. Every drink made properly, every guest attended to.',
    ],
    pull: (
      <>
        This is not a staffing service. <span className="it">This is hospitality with intention.</span>
      </>
    ),
    foot: 'Your guests experience the difference from the first pour.',
  },

  bridge: {
    photo: '/assets/photos/foundation-bridge.png',
    photoAlt: 'A classic cocktail, executed with precision',
    selection: {
      title: (
        <>
          Curated <span className="it">simplicity.</span>
        </>
      ),
      lead: 'Prior to your event, we collaborate on a menu of 4-6 signature cocktails. Classics perfected. Crowd favorites refined. Each drink selected to balance variety, flow, and your available spirits.',
    },
    focus: {
      title: (
        <>
          The <span className="it">focus.</span>
        </>
      ),
      lead: 'Flawless technique on timeless recipes. Proper dilution, balanced flavors, appropriate glassware, and garnishes that matter. The fundamentals, executed without shortcuts.',
    },
  },

  scaling: {
    desc: 'Calibrated for intimate gatherings where quality remains uncompromised regardless of guest count. A professional bartender from our trained collective delivers the Ice & Instinct standard; each member is personally mentored and upholds the same commitment to craft.',
    tiers: [
      {
        label: 'A',
        name: 'The Intimate',
        meta: 'Up to 15 guests',
        personnel: '1 Professional Bartender',
        focus: 'Attentive service, consistent quality, personal engagement',
        price: 'From $400',
      },
      {
        label: 'B',
        name: 'The Gathering',
        meta: '16 to 25 guests',
        personnel: '1 Professional Bartender + 1 Bar Support',
        focus: 'Maintained flow, no guest left waiting, seamless replenishment',
        price: 'From $550',
      },
      {
        label: 'C',
        name: 'The Celebration',
        meta: '26 to 40 guests',
        personnel: '2 Professional Bartenders',
        focus: 'Full coverage, dual station capability, event-scale execution',
        price: 'From $750',
      },
    ],
  },

  included: {
    intro: 'The specific elements of your experience.',
    steps: [
      {
        title: 'Pre-Event Consultation',
        body: 'A focused conversation to understand your occasion, guest count, preferences, and available spirits. Menu finalized 5-7 days prior.',
      },
      {
        title: 'Professional Bar Setup',
        body: 'Your bartender arrives with a complete toolkit: shakers, strainers, jiggers, bar spoons, muddlers, and essential garnish prep equipment.',
      },
      {
        title: 'Ice Coordination',
        body: 'Guidance on appropriate ice quantities and formats for your event. Standard ice may be sourced by the host, or premium ice options arranged through Ice & Instinct at additional cost.',
      },
      {
        title: '3 Hours of Professional Service',
        body: 'Arrival 30 minutes prior for setup. Three hours of active service. Additional hours available at $75 per hour.',
      },
      {
        title: 'Station Restoration',
        body: 'Upon conclusion, your bar area is returned to order. Glassware rinsed, surfaces wiped, workspace organized.',
      },
    ],
  },

  standard: {
    intro: 'Every Ice & Instinct experience, regardless of tier, includes the foundation of our craft.',
    items: [
      {
        title: 'Trained Professional',
        body: 'A bartender from the Ice & Instinct collective, trained in proper technique and professional hospitality.',
      },
      {
        title: 'Guest Engagement',
        body: 'Friendly, professional interaction. Drink recommendations tailored to individual preferences. The warmth of genuine hospitality.',
      },
      {
        title: 'Professional Tooling',
        body: 'A complete bar kit with quality tools. No plastic pourers. No shortcuts.',
      },
      {
        title: 'Setup & Breakdown',
        body: 'Complete organization of the working area before and after service.',
      },
    ],
  },

  host: {
    intro: 'To ensure a seamless experience, the host provides the following canvas.',
    steps: [
      {
        title: 'Spirits & Mixers',
        body: 'All alcohol, mixers, juices, and sodas for the agreed menu. A detailed shopping list is provided during consultation.',
      },
      {
        title: 'Glassware',
        body: 'Appropriate glasses for the selected cocktails. Guidance provided. Rental coordination available upon request via The Curator add-on.',
      },
      {
        title: 'Ice',
        body: 'Sufficient ice for the duration of service. Quantity guidance provided based on guest count and menu.',
      },
      {
        title: 'Workspace',
        body: 'A stable surface for bar setup, access to running water, and adequate lighting.',
      },
    ],
  },

  notes: {
    title: (
      <>
        Experience <span className="it">notes.</span>
      </>
    ),
    items: [
      'The Essential experience is designed as an accessible entry point to the Ice & Instinct standard. It is not a reduction of quality - it is a focused application of our principles.',
      <>
        For those seeking deeper customization, signature cocktail development, or the personal involvement of the
        Master Mixologist, we invite you to explore <a href="/offerings/simplicity/">Simplicity</a>,{' '}
        <a href="/offerings/bespoke/">Bespoke</a>, or <a href="/offerings/omakase/">Omakase</a>.
      </>,
      'Every Foundation booking contributes to our mission: proving that professional hospitality belongs in every celebration, not just the grandest ones.',
    ],
  },

  navLabels: ['Overview', 'Menu Protocol', 'Scalability', "What's Included", 'Standard Inclusions', 'Host Provides', 'Notes'],

  closing: {
    title: (
      <>
        Begin at <span className="it">the foundation.</span>
      </>
    ),
    lead: 'Tell us the date, the room, and the headcount. We will return with a tailored quote within one business day.',
  },
};
