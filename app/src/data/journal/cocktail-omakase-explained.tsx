import type { JournalArticleContent } from './types';

// /journal/cocktail-omakase-explained/ - the defining article for "cocktail
// omakase" queries. FAQ answers are mirrored 1:1 in the FAQPage JSON-LD inside
// app/journal/cocktail-omakase-explained/index.html. Edit both together.

export const cocktailOmakaseExplained: JournalArticleContent = {
  slug: 'cocktail-omakase-explained',
  ghost: 'OMAKASE',
  eyebrow: 'Journal / No 01',
  title: (
    <>
      Cocktail omakase: the no-menu evening, <span className="it">explained.</span>
    </>
  ),
  standfirst:
    'Omakase left the sushi counter some time ago. Applied to cocktails, it names a precise kind of evening: no menu, no recipe cards, every drink composed in the moment for the person holding the glass. Almost nobody offers it, and almost nobody has written down how it actually works. This is how it works.',
  date: 'June 10, 2026',
  dateISO: '2026-06-10',
  readTime: '6 min read',

  sections: [
    {
      id: 'the-word',
      kicker: 'I',
      title: (
        <>
          The word, and what it <span className="it">asks of you.</span>
        </>
      ),
      paras: [
        <>
          Omakase is Japanese - <em>o-makase</em>, roughly &ldquo;I leave it up to you.&rdquo; At a
          sushi counter it is a quiet contract. The guest gives up the menu; the chef gives up the
          safety of repetition. What arrives is whatever the morning&rsquo;s market, the
          chef&rsquo;s judgment, and the guest&rsquo;s reactions make possible. The food is the
          visible part. The actual product is trust.
        </>,
        <>
          That contract translates to the bar with almost no loss. A cocktail, like a piece of
          nigiri, is small, immediate, and finished in minutes. It can be read mid-course and
          corrected in the next one. The bartender who composes without a menu is making the same
          wager the chef makes: that attention, applied in real time, beats any list written in
          advance.
        </>,
      ],
    },
    {
      id: 'from-counter-to-bar',
      kicker: 'II',
      title: (
        <>
          From the counter <span className="it">to the bar.</span>
        </>
      ),
      paras: [
        <>
          A cocktail omakase is not a tasting menu with the prices hidden. There is no menu at all.
          No predetermined recipes, no printed cards, no &ldquo;tonight&rsquo;s flight.&rdquo; The
          mixologist arrives with technique, with proper clear ice arranged through the
          Concierge, and three decades of rooms read correctly - and builds each drink after
          meeting the person it is for.
        </>,
        <>
          The raw material is the host&rsquo;s own collection. The bottles already on your shelf -
          the vertical of single malts, the mezcal someone carried back from Oaxaca, the amaro
          nobody has opened - become the canvas. Part of the pleasure, hosts tell us, is watching
          bottles they thought they knew turn into drinks they could not have imagined. The
          techniques run to the edge of the craft: smoke infusion, fat washing, rapid infusion,
          temperature layering, molecular garnish - methods reserved for world-class bars,
          executed at a private counter.
        </>,
      ],
    },
    {
      id: 'the-dialogue',
      kicker: 'III',
      title: (
        <>
          How the dialogue with the room <span className="it">actually works.</span>
        </>
      ),
      paras: [
        <>
          The first drink begins with questions, and they are not the ones people expect. Not
          &ldquo;gin or vodka&rdquo; but: what did you drink on the best evening you remember?
          What do you refuse to drink, and why? Coffee black or sweetened? The answers sketch a
          palate - sugar tolerance, bitterness ceiling, texture preferences - faster than any
          order could.
        </>,
        <>
          Then the reading continues without words. A guest who finishes the first cocktail in
          three minutes is asking for something longer and lower-proof next. A guest who keeps
          returning to one aroma gets that thread pulled further. Over a four-to-six-hour evening
          each guest traces an arc - brighter and more aromatic early, deeper and more structured
          late - and no two arcs in the room are the same. This is why the format cannot be
          faked with a long menu. A menu answers a question once. A dialogue keeps answering it
          all night.
        </>,
      ],
    },
    {
      id: 'what-the-host-decides',
      kicker: 'IV',
      title: (
        <>
          What the host decides - <span className="it">and what they do not.</span>
        </>
      ),
      paras: [
        <>
          The host decides the frame: the date, the room, the guest list, the hours, and the
          spirits available. Whether the evening runs on the existing collection or we handle the
          purchase at supplier cost is the host&rsquo;s call - as at every{' '}
          <a href="/offerings/">Ice &amp; Instinct tier</a>, alcohol is never marked up and never
          hidden in the fee.
        </>,
        <>
          The host does not decide the drinks. That is the entire point, and the part that takes a
          certain kind of nerve. There is no tasting beforehand, no approval of recipes, no veto
          over the third course. Dietary lines and hard limits are respected absolutely -
          allergies, spirits someone will not touch, a guest who wants the{' '}
          zero-proof track all evening. Inside those lines, the composition is surrendered. Hosts
          who need to curate every glass are better served by{' '}
          <a href="/offerings/bespoke/">Bespoke Design &amp; Artistry</a>, where the menu is
          designed with you in advance. Omakase is for the host who has done that already and
          wants to see what happens without the net.
        </>,
      ],
    },
    {
      id: 'what-it-costs',
      kicker: 'V',
      title: (
        <>
          What it <span className="it">costs.</span>
        </>
      ),
      paras: [
        <>
          <a href="/offerings/omakase/">Omakase Improvisation</a> is the top tier of our work,
          from $3,000, for up to 25 guests - a hard limit, because spontaneous creation does not
          scale past the point where the mixologist can hold every palate in the room in mind. A
          flat $500 deposit reserves the date: fully refundable until 14 days before the evening,
          transferable for 12 months. Spirits are not included - you provide them, or we purchase
          on your behalf at supplier cost, documented.
        </>,
        <>
          For scale: our tiers begin at $650 for <a href="/offerings/foundation/">The
          Foundation</a> and step through $900 and $1,800 before omakase. The format also travels
          - it has closed <a href="/corporate/">corporate evenings</a> after the dinner plates
          are cleared, and it makes a singular second act after a{' '}
          <a href="/weddings/">wedding</a>, when the reception ends and twenty people remain.
        </>,
      ],
    },
    {
      id: 'who-books-it',
      kicker: 'VI',
      title: (
        <>
          Who books <span className="it">an evening like this.</span>
        </>
      ),
      paras: [
        <>
          The omakase host is usually someone who collects - spirits, experiences, or both. They
          have a home bar that outgrew its cabinet. They have sat at counters in Tokyo or at a
          chef&rsquo;s table in Copenhagen and know the particular pleasure of paying for
          judgment instead of inventory. Often they have hosted a designed-menu evening with us
          first and want the ceiling above it.
        </>,
        <>
          What they are buying is not thirteen drinks. Our{' '}
          <a href="/gallery/">signature collection</a> exists for evenings that want a menu;
          omakase exists for the evening that wants none. They are buying the only luxury that
          cannot be reproduced, photographed in advance, or ordered twice: an evening that exists
          once, for the people in the room, and then is gone.
        </>,
      ],
    },
  ],

  faqs: [
    {
      q: 'Is cocktail omakase the same as a bespoke cocktail menu?',
      a: 'No. A bespoke menu is designed with you in advance - recipes agreed, cards printed, every drink known before the first guest arrives. Omakase has no menu at all: each cocktail is composed in real time for the guest holding the glass. Bespoke Design & Artistry is our designed-menu tier at $1,800; Omakase Improvisation, from $3,000, is the no-menu evening.',
    },
    {
      q: 'How many guests can a cocktail omakase evening serve?',
      a: 'Up to 25, and that is a hard limit, not a soft one. Spontaneous creation depends on the mixologist holding every palate in the room in mind; past 25 that attention breaks, so we decline rather than dilute the format. For larger evenings, the designed-menu tiers scale with a full bar team instead.',
    },
    {
      q: 'Do we need a large home bar to host one?',
      a: 'No. A serious collection makes a rich canvas, but it is not a requirement - we review what you have in advance, and anything needed is purchased on your behalf at supplier cost, with no markup. The evening is built on judgment, not on the size of the shelf.',
    },
  ],

  closing: {
    title: (
      <>
        Leave it <span className="it">up to us.</span>
      </>
    ),
    lead: (
      <>
        Tell us the date, the room, and who will be there.
        <br />A tailored proposal returns within one business day.
      </>
    ),
    ctaHref: '/contact/?occasion=omakase',
    ctaLabel: 'Inquire about omakase',
  },
};
