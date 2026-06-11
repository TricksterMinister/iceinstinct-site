import { JournalChrome, useJournalPage } from './JournalArticle';
import { SiteFooter } from '../sections/SiteFooter';
import { journalIndex } from '../data/journal';

/**
 * /journal/ - the Journal index. A ledger of the published articles: number,
 * title, one-line standfirst, date, read time. Layout lives in journal.css;
 * chrome, closing, and footer reuse the sitewide systems.
 */
export function Journal() {
  useJournalPage();

  return (
    <>
      <JournalChrome context="Journal" />

      <main>
        {/* HERO */}
        <section className="jr-hero jr-hero-index">
          <div className="jr-hero-ghost" aria-hidden="true">JOURNAL</div>
          <div className="jr-hero-stage reveal">
            <p className="jr-eyebrow"><span className="jr-eyebrow-link">The Journal</span></p>
            <h1 className="jr-title">
              Notes on <span className="it">the craft.</span>
            </h1>
            <p className="jr-standfirst">
              What we have learned at the bar, written down. Methods, materials, and the thinking
              behind the evenings - published when there is something worth saying, and not before.
            </p>
          </div>
        </section>

        {/* LEDGER - the published entries */}
        <section className="jr-ledger reveal" aria-label="Journal entries">
          <ul className="jr-list">
            {journalIndex.map((entry) => (
              <li className="jr-entry" key={entry.slug}>
                <a className="jr-entry-link" href={`/journal/${entry.slug}/`} data-cursor="link">
                  <span className="jr-entry-n" aria-hidden="true">{entry.n}</span>
                  <span className="jr-entry-main">
                    <span className="jr-entry-title">{entry.title}</span>
                    <span className="jr-entry-stand">{entry.standfirst}</span>
                  </span>
                  <span className="jr-entry-meta">
                    <time dateTime={entry.dateISO}>{entry.date}</time>
                    <span>{entry.readTime}</span>
                    <span className="jr-entry-arr" aria-hidden="true">&rarr;</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* CLOSING - framed CTA + global footer share one viewport */}
      <div className="closing-segment oma-close" id="final-cta">
        <section className="closing">
          <div className="section-bg-word top right" aria-hidden="true">JOURNAL</div>
          <div className="closing-stage">
            <div className="closing-frame">
              <span className="closing-corner tl" aria-hidden="true"></span>
              <span className="closing-corner tr" aria-hidden="true"></span>
              <span className="closing-corner bl" aria-hidden="true"></span>
              <span className="closing-corner br" aria-hidden="true"></span>
              <span className="closing-eyebrow">Ice &amp; Instinct / By appointment</span>
              <h2 className="closing-title">
                Reading done, <span className="it">evening next.</span>
              </h2>
              <p className="closing-lead">
                Tell us the date, the room, and the guest count.
                <br />A tailored proposal returns within one business day.
              </p>
              <div className="closing-cta">
                <a className="btn-primary" href="/contact/" data-cursor="link">
                  <span className="btn-label">Begin the conversation</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </a>
                <a className="btn-ghost" href="tel:+19172927859" data-cursor="link">
                  Call +1 (917) 292-7859
                </a>
              </div>
              <p className="closing-deposit">
                A flat $500 deposit reserves your date - fully refundable until 14 days before the evening.
              </p>
            </div>
            <p className="closing-meta">
              <span>By appointment only</span>
              <span>New York Metropolitan Area &amp; New Jersey</span>
              <span>Est. 2024</span>
            </p>
          </div>
        </section>

        <SiteFooter embedded />
      </div>
    </>
  );
}
