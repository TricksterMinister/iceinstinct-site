import type { JournalArticleContent } from './types';

// /journal/cigar-and-cocktail-pairing/ - FAQ answers are mirrored 1:1 in the
// FAQPage JSON-LD inside app/journal/cigar-and-cocktail-pairing/index.html.
// Edit both together.

export const cigarAndCocktailPairing: JournalArticleContent = {
  slug: 'cigar-and-cocktail-pairing',
  ghost: 'PAIRING',
  eyebrow: 'Journal / No 03',
  title: (
    <>
      Cigar and cocktail pairing: <span className="it">a sommelier&rsquo;s method.</span>
    </>
  ),
  standfirst:
    'Most cigar pairings are guesswork dressed as tradition - a big smoke, a big pour, and hope. Wine service solved this problem long ago with a grammar: structure, sweetness, strength. Teimuraz Benidze, the first certified sommelier in the history of Georgia, applies that grammar to smoke. The method translates almost perfectly.',
  date: 'June 10, 2026',
  dateISO: '2026-06-10',
  readTime: '6 min read',

  sections: [
    {
      id: 'a-sommeliers-grammar',
      kicker: 'I',
      title: (
        <>
          A sommelier&rsquo;s <span className="it">grammar.</span>
        </>
      ),
      paras: [
        <>
          Sommeliers do not pair by anecdote. Behind every confident wine match is a small set of
          measurable questions: how much body does each side have, how much sweetness, how much
          bite, and which one will dominate if nothing intervenes. Our founder carries four
          sommelier credentials, earned across France, Italy, and Georgia, and a
          quarter-century of hospitality behind them - and the discipline they teach is not
          about wine at all. It is about balance between two strong personalities at the same
          table.
        </>,
        <>
          A cigar is exactly such a personality. It has body, sweetness, spice, and length, the
          same axes a taster scores in a glass. Which means the pairing question is never
          &ldquo;what goes with cigars&rdquo; - it is &ldquo;what stands in proportion to this
          cigar,&rdquo; and that question has an orderly answer.
        </>,
      ],
    },
    {
      id: 'strength-with-strength',
      kicker: 'II',
      title: (
        <>
          Strength with <span className="it">strength.</span>
        </>
      ),
      paras: [
        <>
          The first rule is the oldest one in wine service: match weight to weight. A full-bodied
          maduro - dark, oily, broad on the palate - will erase a delicate, citrus-led cocktail
          the way a Barolo erases a sole meuni&egrave;re. The drink is not bad; it is simply
          gone. Against a heavy smoke, the glass needs structure of its own: aged spirits,
          stirred and spirit-forward builds, drinks with the density to answer back. An old
          fashioned on a single clear cube. A Manhattan with real backbone.
        </>,
        <>
          The inverse matters just as much and is violated more often. A mild,
          Connecticut-shade cigar - creamy, gentle, almost pastry-like - is crushed by a smoky,
          high-proof pour. It wants brightness and lift: a highball with length, a sour with
          precise acidity, something that refreshes between draws instead of competing with
          them. The strong-with-strong rule is really a fairness rule. Neither side should win.
        </>,
      ],
    },
    {
      id: 'sweetness-against-smoke',
      kicker: 'III',
      title: (
        <>
          Sweetness <span className="it">against smoke.</span>
        </>
      ),
      paras: [
        <>
          The second axis is sweetness, and it is where pairing stops being defense and becomes
          composition. Smoke reads as dry and faintly bitter on the palate. A measured note of
          sweetness in the glass - the caramel of a well-aged rum, the rounded edge of demerara
          in an old fashioned, the dried-fruit depth of a sherry-touched build - does not fight
          the smoke. It upholsters it. This is the same logic that puts Sauternes beside Roquefort:
          sugar and salt, sugar and smoke, each making the other more articulate.
        </>,
        <>
          What the method avoids is the common error of doubling bitterness. An aggressively
          bitter amaro against a peppery, full-strength cigar compounds into harshness; each
          magnifies the other&rsquo;s bite. Bitter elements belong in these pairings the way
          spice belongs in cooking - present, measured, and balanced by sweetness or texture,
          never left to fight the smoke alone.
        </>,
      ],
    },
    {
      id: 'pacing-the-thirds',
      kicker: 'IV',
      title: (
        <>
          Pacing: the <span className="it">three thirds.</span>
        </>
      ),
      paras: [
        <>
          A cigar is not one flavor; it is a forty-to-ninety-minute arc. The first third is the
          mildest, the middle settles into the cigar&rsquo;s true character, and the final third
          is the most intense, concentrated by everything that burned before it. A serious
          pairing respects that arc - either with a drink built to evolve across it, or with a
          deliberate sequence of pours that step up alongside the smoke.
        </>,
        <>
          This is also where ice becomes part of the pairing. A drink that will be sipped for an
          hour cannot be allowed to fall apart in the glass; dense, hand-cut{' '}
          <a href="/journal/clear-ice-why-it-matters/">clear ice</a> holds dilution to a slow,
          even rate, so the cocktail&rsquo;s last act is as composed as its first. Pacing the
          guest matters as much as pacing the glass - water alongside, unhurried service, and a
          rhythm that treats the hour as the luxury, not the volume.
        </>,
      ],
    },
    {
      id: 'the-bespoke-cigar-curator',
      kicker: 'V',
      title: (
        <>
          The Bespoke Cigar <span className="it">Curator.</span>
        </>
      ),
      paras: [
        <>
          At our evenings this method is delivered as a{' '}
          <a href="/concierge/">concierge enhancement</a>: the Bespoke Cigar Curator, at $500. It
          is a fully curated ritual - concept, selection logic, pairing design, pacing, and the
          moment in the evening when cigars appear at all. A dedicated cigar specialist, selected
          and coordinated by the founder, hosts the ritual itself; the founder remains
          responsible for the structure, quality, and coherence of the experience from start to
          finish. You are not hiring a cigar sommelier for the corner of the terrace. You are
          commissioning a ritual that belongs to the evening&rsquo;s architecture.
        </>,
        <>
          The enhancement sits on top of any tier, from an intimate{' '}
          <a href="/offerings/">private evening</a> to a{' '}
          <a href="/corporate/">corporate</a> close or the late hours of a{' '}
          <a href="/weddings/">wedding</a>, when the dance floor thins and a smaller circle
          forms outside. That is, historically, exactly where the best pairings happen.
        </>,
      ],
    },
    {
      id: 'on-restraint',
      kicker: 'VI',
      title: (
        <>
          On <span className="it">restraint.</span>
        </>
      ),
      paras: [
        <>
          A word on framing, because it shapes everything above. The focus of this ritual is not
          consumption; it is intention. Cigars are introduced at the right moment, in the right
          setting - private, ventilated, considerate of every guest who did not choose to smoke -
          and guided with restraint so they deepen the evening rather than dominate it. One
          well-paired cigar, given its full hour, says more than three rushed ones.
        </>,
        <>
          The same restraint governs the glass. Pairings are paced, water is poured without being
          asked, and the zero-proof program stands ready for any guest at any point - the
          structure-and-sweetness grammar works without proof behind it. We hold to{' '}
          <a href="/responsible-service/">responsible service</a> on every evening, and the
          pairing ritual is no exception. The point of the method, in the end, is the same point
          a sommelier serves: not more, but right.
        </>,
      ],
    },
  ],

  faqs: [
    {
      q: 'Do you provide the cigars?',
      a: 'Through the Bespoke Cigar Curator enhancement, at $500, the ritual is fully curated: concept, selection logic, pairing design, and pacing, with a dedicated cigar specialist hosting under the direction of the founder. The curation is designed around your guests and your spirits; selections are arranged as part of the design of the ritual and confirmed with you in advance.',
    },
    {
      q: 'Can a cigar pairing work without alcohol?',
      a: 'Yes. The pairing grammar is structure, sweetness, and strength - none of which require proof. A composed zero-proof drink with real body and a measured sweet note holds up beside a cigar the same way a cocktail does, and our zero-proof program is built with the same clear ice and technique as the main menu.',
    },
    {
      q: 'How is smoking handled responsibly at a private event?',
      a: 'Cigars appear only where the host has chosen - private, ventilated settings, considerate of guests who do not smoke - and the ritual is paced deliberately: introduced at the right moment, guided with restraint, never pushed. The focus is intention rather than consumption, and responsible service governs the entire evening.',
    },
  ],

  closing: {
    title: (
      <>
        Commission <span className="it">the ritual.</span>
      </>
    ),
    lead: (
      <>
        The Bespoke Cigar Curator joins any tier.
        <br />
        Tell us about the evening and we will design the hour around it.
      </>
    ),
    ctaHref: '/contact/?occasion=concierge',
    ctaLabel: 'Inquire about the curator',
  },
};
