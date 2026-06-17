import { useEffect } from 'react';
import markUrl from '../assets/ii-mark.png';
import { useCinemaChrome } from '../app/useCinemaChrome';
import { useDeepScripts } from '../app/useDeepScripts';
import { SiteFooter } from '../sections/SiteFooter';
import { Closing } from '../sections/Closing';
import { EyebrowMark, TriggerMark } from '../app/EyebrowMark';
import type { JournalArticleContent } from '../data/journal/types';

/**
 * /journal/<slug>/ - ONE article shell for the whole Journal. Article text
 * lives in src/data/journal/<slug>.tsx content modules; this file renders
 * whichever module the entry hands it. Reuses the sitewide chrome, the faq
 * ledger (sections.css), and the closing segment (offering.css/accent.css).
 * Journal-specific layout lives in src/styles/journal.css only.
 */

type ChromeProps = {
  /** Shown after "Ice & Instinct / " in the overlay eyebrow. */
  context: string;
};

/** Sitewide page chrome (cursor, overlay menu, header). Shared by the Journal
 *  index and every article so the shell exists in exactly one place. */
export function JournalChrome({ context }: ChromeProps) {
  return (
    <>
      <div className="cursor" aria-hidden="true">
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
      </div>

      <button className="va-trigger" aria-label="Open menu">
        <span className="va-trigger-ring"></span>
        <TriggerMark />
      </button>

      <div className="va-overlay" aria-hidden="true">
        <button className="va-close" aria-label="Close menu">
          <span></span>
          <span></span>
        </button>
        <div className="va-stage">
          <p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / {context}</p>
          <ul className="va-list">
            <li><a href="/"><i>01</i><b>Home</b><em>The opening view</em></a></li>
            <li><a href="/offerings/"><i>02</i><b>Offerings</b><em>Four levels, one standard</em></a></li>
            <li><a href="/concierge/"><i>03</i><b>Concierge</b><em>Five enhancements</em></a></li>
            <li><a href="/my-story/"><i>04</i><b>My Story</b><em>Teimuraz Benidze</em></a></li>
            <li><a href="/gallery/"><i>05</i><b>The Collection</b><em>Thirteen compositions</em></a></li>
            <li><a href="/contact/"><i>06</i><b>Inquire</b><em>Begin the conversation</em></a></li>
          </ul>
          <footer className="va-foot">
            <span>New York Metropolitan Area / By Appointment</span>
            <span>EST. 2024</span>
          </footer>
        </div>
      </div>

      <header className="header" role="banner">
        <div className="container">
          <nav className="nav" aria-label="Main">
            <a href="/" className="brand">
              <span className="brand-mark">
                <img src={markUrl} alt="" aria-hidden="true" width={34} height={34} draggable={false} />
              </span>
              <span className="brand-name">Ice &amp; Instinct</span>
            </a>
            <div className="nav-links">
              <a href="/offerings/">Offerings</a>
              <a href="/concierge/">Concierge</a>
              <a href="/my-story/">My Story</a>
              <a href="/gallery/">Gallery</a>
            </div>
            <a href="/contact/" className="nav-cta">Inquire</a>
          </nav>
        </div>
      </header>
    </>
  );
}

/** Body class + chrome behaviour shared by the index and the articles. */
export function useJournalPage(): void {
  // Live deep pages set <body class="cinema-chrome">. React mounts into #root,
  // so apply the body class here (and clean it up) to match the original DOM.
  useEffect(() => {
    document.body.classList.add('cinema-chrome');
    return () => document.body.classList.remove('cinema-chrome');
  }, []);

  useCinemaChrome();
  useDeepScripts();
}

type JournalArticleProps = {
  article: JournalArticleContent;
};

export function JournalArticle({ article }: JournalArticleProps) {
  useJournalPage();

  return (
    <>
      <JournalChrome context="Journal" />

      <main>
        {/* HERO - editorial, text only; ghost word behind */}
        <section className="jr-hero">
          <div className="jr-hero-ghost" aria-hidden="true">{article.ghost}</div>
          <div className="jr-hero-stage reveal">
            <p className="jr-eyebrow">
              <a href="/journal/" className="jr-eyebrow-link">{article.eyebrow}</a>
            </p>
            <h1 className="jr-title">{article.title}</h1>
            <p className="jr-standfirst">{article.standfirst}</p>
            <p className="jr-meta">
              <time dateTime={article.dateISO}>{article.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">&middot;</span>
              <span>By Teimuraz Benidze</span>
            </p>
          </div>
        </section>

        {/* BODY - numbered h2 sections in a single reading measure */}
        <article className="jr-body">
          {article.sections.map((s) => (
            <section className="jr-section reveal" id={s.id} key={s.id}>
              <header className="jr-section-head">
                <span className="jr-kicker">{s.kicker}</span>
                <h2 className="jr-h2">{s.title}</h2>
              </header>
              <div className="jr-prose">
                {s.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>

        {/* FAQ - sitewide ledger pattern; mirrored in the stub's FAQPage JSON-LD */}
        <section className="faq jr-faq" id="faq">
          <div className="section-bg-word top right" aria-hidden="true">{article.ghost}</div>
          <div className="faq-stage">
            <header className="faq-intro">
              <h2 className="faq-headline">
                <span>Asked,</span>
                <span className="it">answered.</span>
              </h2>
              <p className="faq-lead">The short version, stated plainly.</p>
            </header>

            <ul className="faq-list">
              {article.faqs.map((item, i) => (
                <li className="faq-item" key={item.q}>
                  <details className="faq-details">
                    <summary className="faq-q" data-cursor="link">
                      <span className="faq-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-q-mark" aria-hidden="true"></span>
                    </summary>
                    <div className="faq-a">
                      <p>{item.a}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>

            <p className="jr-backline">
              <a href="/journal/" className="jr-back" data-cursor="link">
                <span aria-hidden="true">&larr;</span> All journal entries
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* CLOSING - framed CTA + global footer share one viewport */}
      <div className="closing-segment oma-close" id="final-cta">
        <Closing ghost="NEXT" title="Done reading?" titleEm="Start tasting." lead="Bring the craft you just read about to your own evening." />

        <SiteFooter embedded />
      </div>
    </>
  );
}
