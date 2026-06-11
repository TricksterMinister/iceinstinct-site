import { useEffect, useRef, useState } from 'react';
import { funnel, type Temperament } from '../../app/funnelStore';
import { track } from '../../lib/track';

// Split-screen "choose your nature" accordion. Mechanic ported 1:1 from Temo's
// approved prototype: two panels, hover expands one and shrinks the other, the
// shrinking panel's word flips from horizontal to vertical, the ampersand fades.
// Skin = our brand: ICE in Geist (white), Instinct in Fraunces italic (champagne).
// The expand/flip is pure CSS (matches the reference); click commits the nature.
//
// The portal now leads somewhere: each nature is a FLOOR of the business.
// ICE = event bartenders on call (/events/), INSTINCT = the founder's private
// mixology (/offerings/). After commit, a floor card fades in inside the
// committed panel with the offer line and a real CTA link.
//
// Valid-HTML note: an <a> may not live inside a <button>, so the panels are
// <div role="button" tabIndex={0}> with Enter/Space key handlers while the
// choice is open. After commit the role and tabIndex are removed (the panels
// stop being controls), so the revealed CTA anchor is the only interactive
// element inside - no nested-interactive violation.

const ICE = 'ICE'.split('');
const INSTINCT = 'Instinct'.split('');

type Floor = Exclude<Temperament, null>;

const FLOORS: Record<Floor, { line: string; meta: string; cta: string; href: string }> = {
  ice: {
    line: 'The bench is on call',
    meta: 'Event bartenders for birthdays, weddings, corporate nights - flat packages from $450',
    cta: 'Book a bartender',
    href: '/events/',
  },
  instinct: {
    line: 'The founder composes your evening',
    meta: "Bespoke menus, omakase improvisation, the sommelier's hand - from $650",
    cta: 'Enter the studio',
    href: '/offerings/',
  },
};

export function Duality({ onCommit }: { onCommit?: (t: Temperament) => void }) {
  const [committed, setCommitted] = useState<Temperament>(null);
  const rootRef = useRef<HTMLElement>(null);
  const wantsCtaFocus = useRef(false);

  const commit = (t: Temperament) => () => {
    if (committed) return;
    setCommitted(t);
    funnel.setTemperament(t);
    onCommit?.(t);
  };

  const keyCommit = (t: Temperament) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      commit(t)();
    }
  };

  // "or the other door" - one quiet line so a misclick never traps anyone.
  const switchTo = (t: Floor) => () => {
    wantsCtaFocus.current = true;
    setCommitted(t);
    funnel.setTemperament(t);
    onCommit?.(t);
  };

  // The switch button unmounts with the old card; hand focus to the new CTA so
  // keyboard users are not dropped back to the top of the document.
  useEffect(() => {
    if (!wantsCtaFocus.current) return;
    wantsCtaFocus.current = false;
    rootRef.current
      ?.querySelector<HTMLAnchorElement>('.d-floor-cta')
      ?.focus({ preventScroll: true });
  }, [committed]);

  const open = committed === null;

  const floorCard = (t: Floor, other: Floor) =>
    committed === t ? (
      <span className="d-floor">
        <span className="d-floor-line">{FLOORS[t].line}</span>
        <span className="d-floor-meta">{FLOORS[t].meta}</span>
        <a
          className="btn-ghost d-floor-cta"
          href={FLOORS[t].href}
          data-cursor="link"
          onClick={() => track('two_floors_click', { door: t })}
        >
          {FLOORS[t].cta}
        </a>
        <button type="button" className="d-floor-switch" onClick={switchTo(other)}>
          or the other door
        </button>
      </span>
    ) : null;

  const cls =
    'duality' +
    (committed === 'ice' ? ' is-ice' : committed === 'instinct' ? ' is-instinct' : '');

  return (
    <section className={cls} id="duality" aria-label="Ice and Instinct - choose your nature" ref={rootRef}>
      <span className="d-tlabel">A Private Mixology Ritual</span>
      <span className="d-blabel">Choose Your Nature</span>

      {/* The connector - large, centred on the seam, binding the two worlds */}
      <span className="d-amp" aria-hidden="true">&amp;</span>

      <div
        className="d-panel pi"
        role={open ? 'button' : undefined}
        tabIndex={open ? 0 : undefined}
        aria-label={open ? 'Ice - the cold craft' : undefined}
        onClick={commit('ice')}
        onKeyDown={open ? keyCommit('ice') : undefined}
      >
        <span className="d-media" aria-hidden="true"><img src="/assets/photos/duality-ice.jpg" alt="" loading="lazy" /></span>
        <span className="word-h ice-h">Ice</span>
        <span className="word-v ice-v" aria-hidden="true">
          {ICE.map((c, i) => <span key={i}>{c}</span>)}
        </span>
        <span className="d-sub" aria-live="polite">
          <span className="d-sub-title">The Cold Craft</span>
          <span className="d-sub-body">Discipline. Order.<br />The patience of craft.</span>
          {floorCard('ice', 'instinct')}
        </span>
      </div>

      <div
        className="d-panel pn"
        role={open ? 'button' : undefined}
        tabIndex={open ? 0 : undefined}
        aria-label={open ? 'Instinct - the living fire' : undefined}
        onClick={commit('instinct')}
        onKeyDown={open ? keyCommit('instinct') : undefined}
      >
        <span className="d-media" aria-hidden="true"><img src="/assets/photos/duality-fire.jpg" alt="" loading="lazy" /></span>
        <span className="word-h inst-h">Instinct</span>
        <span className="word-v inst-v" aria-hidden="true">
          {INSTINCT.map((c, i) => <span key={i}>{c}</span>)}
        </span>
        <span className="d-sub" aria-live="polite">
          <span className="d-sub-title">The Living Fire</span>
          <span className="d-sub-body">Intuition. The pulse.<br />The whisper that changes everything.</span>
          {floorCard('instinct', 'ice')}
        </span>
      </div>
    </section>
  );
}
