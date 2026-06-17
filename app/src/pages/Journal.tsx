import { JournalChrome, useJournalPage } from './JournalArticle';
import { SiteFooter } from '../sections/SiteFooter';
import { Closing } from '../sections/Closing';
import { journalIndex } from '../data/journal';
import { useSegmentSnap } from '../app/useSegmentSnap';

/**
 * /journal/ - the Journal index. A ledger of the published articles: number,
 * title, one-line standfirst, date, read time. Layout lives in journal.css;
 * chrome, closing, and footer reuse the sitewide systems.
 */
export function Journal() {
  useJournalPage();
  useSegmentSnap(['.jr-hero', '.jr-ledger', '.closing-segment']);

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
        <Closing ghost="TASTE" title="Words are nice." titleEm="Tasting is better." lead="Every pour in the journal began at a real table. Bring the craft to yours." />

        <SiteFooter embedded />
      </div>
    </>
  );
}
