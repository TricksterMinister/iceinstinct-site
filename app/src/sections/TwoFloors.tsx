import { track } from '../lib/track';

/**
 * "Two floors, one studio" - the quiet junction between the two offers.
 * INSTINCT (private mixology by the founder, /offerings/) and ICE (event
 * bartenders on call, /events/) as two ledger doors in the same editorial
 * Swiss dialect as the TiersNote band. Static by design: no gsap of its own,
 * the sitewide ghost-word parallax picks up .section-bg-word automatically.
 */
export function TwoFloors() {
  return (
    <section className="two-floors" id="two-floors" aria-label="Two floors, one studio">
      <div className="section-bg-word top right" aria-hidden="true">FLOORS</div>
      <div className="tf-stage">
        <header className="tf-head">
          <p className="tf-eyebrow">Two floors, one studio</p>
          <span className="tf-index" aria-hidden="true">01 / 02</span>
        </header>

        <div className="tf-doors">
          <article className="tf-door">
            <span className="tf-num" aria-hidden="true">01</span>
            <h3 className="tf-title">INSTINCT</h3>
            <p className="tf-line">
              Private mixology by the founder. Bespoke menus, omakase improvisation,
              the sommelier's hand.
            </p>
            <div className="tf-foot">
              <span className="tf-meta">From $650</span>
              <span className="tf-go" aria-hidden="true">Enter the studio <i>&rarr;</i></span>
            </div>
            <a
              className="tf-stretch"
              href="/offerings/"
              data-cursor="link"
              aria-label="INSTINCT - enter the studio"
              onClick={() => track('two_floors_click', { door: 'instinct' })}
            ></a>
          </article>

          <article className="tf-door">
            <span className="tf-num" aria-hidden="true">02</span>
            <h3 className="tf-title">ICE</h3>
            <p className="tf-line">
              Event bartenders, on call. A vetted bench for birthdays, weddings
              and corporate nights.
            </p>
            <div className="tf-foot">
              <span className="tf-meta">From $450</span>
              <span className="tf-go" aria-hidden="true">Book a bartender <i>&rarr;</i></span>
            </div>
            <a
              className="tf-stretch"
              href="/events/"
              data-cursor="link"
              aria-label="ICE - book a bartender"
              onClick={() => track('two_floors_click', { door: 'ice' })}
            ></a>
          </article>
        </div>
      </div>
    </section>
  );
}
