import type { OfferingContent } from './types';

// NOTE (phase 2): hero video + bridge photo reuse Omakase assets as placeholders;
// pricing transcribed from offerings/simplicity/index.html, to be confirmed.
export const simplicityContent: OfferingContent = {
  slug: 'simplicity',
  name: 'Simplicity',
  ghost: 'SIMPLICITY',

  hero: {
    headline: (
      <>
        Perfection in <span className="it">Simplicity.</span>
      </>
    ),
    lead: "For the host who values heritage over hype. The world's most iconic cocktails executed with surgical precision - by the Master Mixologist personally.",
    price: 'From $900 USD',
    priceMeta: 'Up to 12 guests · 4 hours · New York Metropolitan Area',
    video: {
      poster: '/assets/photos/simplicity-hero-poster.png',
      src: '/assets/media/simplicity-hero.mp4',
      alt: 'Simplicity tier mood',
    },
  },

  overview: {
    title: (
      <>
        Heritage <span className="it">over hype.</span>
      </>
    ),
    paras: [
      'For the host who values heritage over hype. Your gathering deserves cocktails balanced to absolute perfection - no flourish, no theater, only pure mastery.',
      'This is the Executive Standard: a service designed for those who understand that true luxury whispers. Whether for an intimate board dinner, a family celebration, or a high-level reception, we deliver the world’s most iconic cocktails with surgical precision. We do not invent here; we execute the legends.',
      'Your private mixologist arrives with a compact case of professional tools and a quarter-century of global hospitality experience distilled into seamless service. You enjoy the company of your guests; we ensure the glass in their hand is flawless.',
    ],
    pull: (
      <>
        True luxury <span className="it">whispers.</span>
      </>
    ),
    foot: 'We do not invent. We execute the legends.',
  },

  bridge: {
    photo: '/assets/photos/simplicity-bridge.png',
    photoAlt: 'A timeless classic, perfectly executed',
    subhead: 'Classics Only. Strictly defined. Flawlessly executed.',
    selection: {
      title: (
        <>
          The <span className="it">selection.</span>
        </>
      ),
      lead: 'Prior to the event, we curate a menu of 3-4 timeless classics (e.g., The Martini, The Old Fashioned, The Negroni, The Daiquiri).',
    },
    focus: {
      title: (
        <>
          The <span className="it">focus.</span>
        </>
      ),
      lead: 'This package does not include signature cocktail design or experimental mixology. We agree on the classics, and we perfect them using superior spirits, precise dilution, and temperature control.',
    },
  },

  scaling: {
    desc: 'Service capacity is strictly calibrated to ensure the Purist standard of execution is never compromised, regardless of guest count.',
    tiers: [
      {
        label: 'A',
        name: 'The Intimate',
        meta: 'Up to 12 guests',
        personnel: '1 Master Mixologist (solo performance)',
        focus: 'Quiet, attentive precision. Direct guest interaction.',
        price: 'From $900',
      },
      {
        label: 'B',
        name: 'The Social',
        meta: '13 to 25 guests',
        personnel: '1 Master Mixologist + 1 Shadow (bar support)',
        focus: 'Seamless flow. The Shadow handles logistics so the Master never breaks rhythm.',
        price: 'From $1,100',
      },
      {
        label: 'C',
        name: 'The Grand',
        meta: '26 to 40 guests',
        personnel: '1 Master Mixologist + 2 Shadows',
        focus: 'High-volume elegance. Zero wait time.',
        price: 'From $1,450',
      },
    ],
  },

  included: {
    intro: 'The specific milestones of your experience.',
    steps: [
      {
        title: 'The Classics Consultation',
        body: 'One week prior, we finalize your selection of classics and set the tone for the evening.',
      },
      {
        title: 'The Procurement Specification',
        body: 'You receive a precise, architectural list of spirits, botanicals, and ice formats tailored to your menu. We provide the blueprint; you retain control of purchasing.',
      },
      {
        title: 'Four Hours of Execution',
        body: 'We arrive 30 minutes early for setup. Service is continuous, quiet, and unobtrusive.',
      },
      {
        title: 'Station Restoration',
        body: 'Upon conclusion, the bar station is returned to its pristine condition. We manage all bar-specific waste (citrus, herbs, melting ice) within the service perimeter.',
      },
    ],
  },

  standard: {
    intro: 'Every Ice & Instinct experience, regardless of tier, includes the foundation of our craft.',
    items: [
      {
        title: 'Private Master Mixologist',
        body: 'A dedicated professional with a quarter-century of global hospitality expertise.',
      },
      {
        title: 'Professional Tooling',
        body: 'A compact, aesthetic case of gold-standard mixology tools (shakers, jiggers, strainers). No bulky equipment, no portable bars.',
      },
      {
        title: 'On-Site Ritual Performance',
        body: 'The visual elegance of proper stirring, shaking, and pouring.',
      },
      {
        title: 'Setup & Breakdown',
        body: 'Complete organization of the immediate working area.',
      },
    ],
  },

  host: {
    intro: 'To ensure the integrity of the service, the host provides the following canvas.',
    steps: [
      {
        title: 'Spirits, Mixers & Garnishes',
        body: 'All alcohol and fresh ingredients must be on-site prior to arrival, based on the provided Specification.',
      },
      {
        title: 'Glassware',
        body: 'Proper vessels for the selected cocktails (or rental via The Curator add-on).',
      },
      {
        title: 'Infrastructure',
        body: 'A dedicated work surface (kitchen counter, dining table, or existing bar), access to running water, and electricity.',
      },
      {
        title: 'Ice Supply',
        body: 'Quantity and formats (cubes, spheres, spears) as specified in the consultation.',
      },
      {
        title: 'Floor Service Boundary',
        body: 'Ice & Instinct focuses exclusively on production within the bar perimeter. For passing drinks, clearing glassware from the room, or general venue tidying, separate floor staff is required.',
      },
    ],
  },

  notes: {
    title: (
      <>
        Experience <span className="it">extensions.</span>
      </>
    ),
    items: [
      'The Executive Standard is designed as a complete and self-contained experience. In certain cases, the scope of service may be thoughtfully adjusted to meet the specific needs of the gathering.',
      <>
        A selection of additional services - including logistical coordination, glassware sourcing, specialty ice, and
        presentation support - is available on the <a href="/concierge/">Concierge</a> page.
      </>,
      "When the flow of the evening naturally calls for it, the Master Mixologist's presence may continue beyond the initial service window. Such considerations are addressed discreetly and without interrupting the integrity of the experience.",
    ],
  },

  pauses: [
    <>Heritage over <em>hype.</em></>,
    <>We do not invent.<br />We execute the <em>legends.</em></>,
    <>True luxury <em>whispers.</em></>,
  ],

  navLabels: ['Overview', 'Menu Protocol', 'Scalability', "What's Included", 'Standard Inclusions', 'Host Provides', 'Extensions'],

  closing: {
    title: (
      <>
        Strip away <span className="it">the unnecessary.</span>
      </>
    ),
    lead: 'Tell us the date, the room, and the headcount. We will return with a tailored quote within one business day.',
  },
};
