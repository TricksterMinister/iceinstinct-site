import '../styles/offering.css';

/**
 * ProcessSteps — Segment 3 for the INSTINCT / Master Atelier page.
 *
 * Two sub-panels, rendered as a single semantic block:
 *   II · How does it work?  — five steps from inquiry to last pour.
 *                             Step 03 (Concierge) is mandatory for all INSTINCT tiers:
 *                             we coordinate ice quality and event details ourselves.
 *   III · Who shows up?     — Teimuraz Benidze + barback, brief + characterful.
 *                             CTAs: View the Gallery · Open Concierge
 */

const STEPS = [
  {
    n: '01',
    title: 'Choose your tier',
    body: 'Review the four programs above — Seasonal, Signature, Bespoke, or Omakase. Each one is a complete evening, not a menu item.',
  },
  {
    n: '02',
    title: 'Send the brief',
    body: 'Date, space, guest count, and any notes on tone. A private quote arrives within one business day. $500 holds the date.',
  },
  {
    n: '03',
    title: 'Concierge coordinates',
    body: 'This is not optional. For every INSTINCT booking, specialty ice is sourced and delivered through us — Michelin-level suppliers, billed at cost. We also align on glassware, bar placement, and the rhythm of the evening.',
    isMandatory: true,
  },
  {
    n: '04',
    title: 'We arrive first',
    body: 'The team is on site 45 minutes before guests. Bar is built, tools are staged, ice is in. By the time your first guest walks in, the room is ready.',
  },
  {
    n: '05',
    title: 'The evening runs',
    body: 'Every cocktail is made to order, in real time, in front of the room. We close the bar clean and leave nothing behind but the impression.',
  },
];

const CREW = [
  {
    n: '01',
    role: 'Teimuraz Benidze',
    title: 'Founder · Flavor Architect',
    body: 'Every INSTINCT booking is led by Teimuraz personally. Not a representative. Not a substitute. The same person who designed the tier, who sources the ice, who reads the room.',
  },
  {
    n: '02',
    role: 'The Barback',
    title: 'Preparation · Precision Support',
    body: 'A trusted barback runs mise en place and keeps the station clean so nothing breaks the rhythm of the evening. Invisible to guests, essential to the craft.',
  },
];

export function ProcessSteps() {
  return (
    <>
      {/* II — HOW DOES IT WORK */}
      <section className="oma-panel dark process-how" id="how-it-works">
        <div className="oma-panel-wrap reveal">
          <header className="oma-panel-head">
            <div className="oma-panel-rule" aria-hidden="true"></div>
            <span className="oma-panel-eye">II &middot; The Sequence</span>
            <h2 className="oma-panel-h">
              How does it <span className="it">work.</span>
            </h2>
            <p className="oma-panel-intro">
              Five steps from your first message to the last pour of the night.
            </p>
          </header>

          <ol className="oma-steps process-steps">
            {STEPS.map((s) => (
              <li
                className={`oma-step process-step${s.isMandatory ? ' process-step--concierge' : ''}`}
                key={s.n}
              >
                <span className="oma-step-n">{s.n}</span>
                <div className="oma-step-body">
                  <h3>
                    {s.title}
                    {s.isMandatory && (
                      <span className="process-step-badge" aria-label="Required for all INSTINCT tiers">
                        Required
                      </span>
                    )}
                  </h3>
                  <p>{s.body}</p>
                  {s.isMandatory && (
                    <a
                      href="/concierge/"
                      className="process-step-cta"
                      data-cursor="link"
                    >
                      Open Concierge <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* III — WHO SHOWS UP */}
      <section className="oma-panel light process-who" id="who-shows-up">
        <div className="oma-panel-wrap reveal">
          <header className="oma-panel-head">
            <div className="oma-panel-rule" aria-hidden="true"></div>
            <span className="oma-panel-eye">III &middot; The Team</span>
            <h2 className="oma-panel-h">
              Who shows <span className="it">up.</span>
            </h2>
            <p className="oma-panel-intro">
              Not a staffing agency. Not a substitute. Two people who have done this a hundred times and will do it the same way for you.
            </p>
          </header>

          <div className="oma-grid process-crew-grid">
            {CREW.map((c) => (
              <div className="cell" key={c.n}>
                <span className="n">{c.n}</span>
                <h3>
                  {c.role}
                  <em className="process-crew-title">{c.title}</em>
                </h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>

          {/* Dual CTA row */}
          <div className="process-who-cta">
            <a href="/gallery/" className="btn-ghost" data-cursor="link">
              View the Gallery <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="/concierge/" className="btn-primary" data-cursor="link">
              <span className="btn-label">Open Concierge</span>
              <span className="btn-arr" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
