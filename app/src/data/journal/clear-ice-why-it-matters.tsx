import type { JournalArticleContent } from './types';

// /journal/clear-ice-why-it-matters/ - FAQ answers are mirrored 1:1 in the
// FAQPage JSON-LD inside app/journal/clear-ice-why-it-matters/index.html.
// Edit both together.

export const clearIceWhyItMatters: JournalArticleContent = {
  slug: 'clear-ice-why-it-matters',
  ghost: 'ICE',
  eyebrow: 'Journal / No 02',
  title: (
    <>
      Clear ice: why it matters, and <span className="it">how we source it.</span>
    </>
  ),
  standfirst:
    'Ice is the largest ingredient in most cocktails and the least examined. It chills, it dilutes, and it decides how the drink tastes ten minutes after it is poured. Here is why we treat it as an ingredient, the simple physics behind clarity, and why hand-cut clear ice is standard at every tier we offer.',
  date: 'June 10, 2026',
  dateISO: '2026-06-10',
  readTime: '5 min read',

  sections: [
    {
      id: 'ice-is-an-ingredient',
      kicker: 'I',
      title: (
        <>
          Ice is <span className="it">an ingredient.</span>
        </>
      ),
      paras: [
        <>
          By the time you finish an old fashioned, a meaningful share of what is in the glass is
          water that entered as ice. That makes ice not a garnish and not a utility but an
          ingredient - frequently the largest one. A bar that obsesses over which rye and which
          bitters, then drops in whatever the freezer made overnight, has specified two
          ingredients precisely and left the biggest one to chance.
        </>,
        <>
          Ice does two jobs at once: it chills, and it dilutes. The two are physically inseparable
          - the melting is what does the cooling. The craft is not preventing dilution; it is
          controlling its rate, so the drink crosses the glass at the strength and temperature
          the recipe intended, from the first sip to the last.
        </>,
      ],
    },
    {
      id: 'why-ordinary-ice-is-cloudy',
      kicker: 'II',
      title: (
        <>
          Why ordinary ice <span className="it">is cloudy.</span>
        </>
      ),
      paras: [
        <>
          Freezer-tray ice freezes from all six sides at once. Water expands as it freezes, and
          the dissolved air and minerals in it cannot fit into the crystal structure - so as the
          walls of ice close in, the impurities are pushed toward the middle with nowhere to go.
          They end up trapped in the core as millions of microscopic bubbles. That white cloud in
          the center of a cube is not frost; it is everything the water was carrying, concentrated.
        </>,
        <>
          Cloudy ice is not just an aesthetic concession. The trapped air makes it less dense, so
          it melts faster and dilutes the drink ahead of schedule. The trapped minerals and the
          freezer&rsquo;s own atmosphere give it a taste - the faintly stale note anyone who has
          used old tray ice will recognize. A cloudy cube is a fast, flavored dilution machine
          sitting in a drink someone composed carefully.
        </>,
      ],
    },
    {
      id: 'directional-freezing',
      kicker: 'III',
      title: (
        <>
          Directional freezing, <span className="it">explained simply.</span>
        </>
      ),
      paras: [
        <>
          Clear ice is made by letting water freeze from one direction only - the way a pond
          freezes in winter. A pond freezes from the top down, and the advancing face of ice
          pushes air and impurities ahead of itself, down into the unfrozen water below. The
          result is a sheet of glass-clear ice above and all the cloudiness concentrated beneath.
        </>,
        <>
          Production clear ice works the same way: an insulated vessel open at the top, so the
          freeze front moves slowly downward in one direction. Stop the freeze before it reaches
          the bottom, and everything the water carried is still in the liquid below the clear
          slab. Cut that cloudy fraction away and what remains is dense, pure, ordered ice -
          harder than tray ice, slower to melt, and tasting of nothing at all. No filtration
          trick, no boiling myth. Just physics, given time.
        </>,
      ],
    },
    {
      id: 'dilution-is-the-argument',
      kicker: 'IV',
      title: (
        <>
          Dilution is <span className="it">the real argument.</span>
        </>
      ),
      paras: [
        <>
          Clarity photographs well, but the working reason for clear ice is dilution control. A
          single large, dense cube has far less surface area for its volume than a scoop of small
          cubes - and surface area is where melting happens. Dense, bubble-free ice also conducts
          its cold more evenly. The combined effect: a drink that reaches its ideal temperature
          and then holds its composition, rather than racing past it into water.
        </>,
        <>
          This matters most exactly where the stakes are highest - a spirit-forward cocktail meant
          to be carried through a long conversation, a <a href="/weddings/">wedding</a> toast
          that sits on the bar for ten minutes before it is raised, the slow third act of a{' '}
          <a href="/journal/cigar-and-cocktail-pairing/">cigar pairing</a>. The guest never
          thinks about the ice. They only notice that the last sip still tastes like the first.
          That is the entire job.
        </>,
      ],
    },
    {
      id: 'how-we-source-it',
      kicker: 'V',
      title: (
        <>
          How we source it, <span className="it">and what it costs you.</span>
        </>
      ),
      paras: [
        <>
          We do not improvise ice on site, and we do not ask a host&rsquo;s freezer to do
          production work. Professional clear ice comes from dedicated directional-freezing
          suppliers, passed to you at supplier cost - the same no-markup rule we apply to
          spirits. It is then hand-cut for the menu: large cubes for stirred drinks, spears for
          highballs, pieces sized to the specific glassware of the evening. Thirteen{' '}
          <a href="/gallery/">signature cocktails</a> in the collection, and not all of them
          sit on the same ice.
        </>,
        <>
          One thing worth stating plainly: clear ice is not an upgrade. It is standard at every{' '}
          <a href="/offerings/">tier</a>, from The Foundation at $650 to Omakase Improvisation -
          and it serves the zero-proof program with the same care as the cocktail list. We treat
          it the way a kitchen treats salt: invisible when right, unmistakable when wrong, and
          never optional.
        </>,
      ],
    },
  ],

  faqs: [
    {
      q: 'Is clear ice purely cosmetic?',
      a: 'No. Clarity is the visible symptom of density: directionally frozen ice carries no trapped air, so it melts more slowly and dilutes a drink at a controlled rate, and it carries no trapped minerals, so it tastes of nothing. The look is a side effect. The dilution control is the point.',
    },
    {
      q: 'Is clear ice included, or is it an upgrade?',
      a: 'It is standard at every Ice & Instinct tier, from The Foundation at $650 upward. We source professional clear ice from dedicated suppliers at supplier cost, with no markup, and hand-cut it to the menu and glassware of the evening.',
    },
    {
      q: 'Can I make clear ice at home?',
      a: 'Yes - a small insulated cooler with the lid off, in a freezer, freezes from the top down and yields a clear slab above a cloudy base you cut away. It works well for a household. Producing consistent, hand-cut clear ice for fifty guests is a different problem, which is why we source from professional suppliers for events.',
    },
  ],

  closing: {
    title: (
      <>
        The details <span className="it">hold the evening.</span>
      </>
    ),
    lead: (
      <>
        Every tier, every glass, the same standard.
        <br />
        Tell us about your evening and we will build the bar around it.
      </>
    ),
    ctaHref: '/contact/',
    ctaLabel: 'Begin the conversation',
  },
};
