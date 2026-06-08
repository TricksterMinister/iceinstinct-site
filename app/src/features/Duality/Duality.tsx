import { useState } from 'react';
import { funnel, type Temperament } from '../../app/funnelStore';

// Split-screen "choose your nature" accordion. Mechanic ported 1:1 from Temo's
// approved prototype: two panels, hover expands one and shrinks the other, the
// shrinking panel's word flips from horizontal to vertical, the ampersand fades.
// Skin = our brand: ICE in Geist (white), Instinct in Fraunces italic (champagne).
// The expand/flip is pure CSS (matches the reference); click commits the nature.

const ICE = 'ICE'.split('');
const INSTINCT = 'Instinct'.split('');

export function Duality({ onCommit }: { onCommit?: (t: Temperament) => void }) {
  const [committed, setCommitted] = useState<Temperament>(null);

  const commit = (t: Temperament) => () => {
    if (committed) return;
    setCommitted(t);
    funnel.setTemperament(t);
    onCommit?.(t);
  };

  const cls =
    'duality' +
    (committed === 'ice' ? ' is-ice' : committed === 'instinct' ? ' is-instinct' : '');

  return (
    <section className={cls} id="duality" aria-label="Ice and Instinct - choose your nature">
      <span className="d-tlabel">A Private Mixology Ritual</span>
      <span className="d-blabel">Choose Your Nature</span>

      {/* The connector - large, centred on the seam, binding the two worlds */}
      <span className="d-amp" aria-hidden="true">&amp;</span>

      <button type="button" className="d-panel pi" onClick={commit('ice')} aria-label="Ice - the cold craft">
        <span className="d-media" aria-hidden="true"><img src="/assets/photos/duality-ice.jpg" alt="" loading="lazy" /></span>
        <span className="word-h ice-h">Ice</span>
        <span className="word-v ice-v" aria-hidden="true">
          {ICE.map((c, i) => <span key={i}>{c}</span>)}
        </span>
        <span className="d-sub">
          <span className="d-sub-title">The Cold Craft</span>
          <span className="d-sub-body">Discipline. Order.<br />The patience of craft.</span>
        </span>
      </button>

      <button type="button" className="d-panel pn" onClick={commit('instinct')} aria-label="Instinct - the living fire">
        <span className="d-media" aria-hidden="true"><img src="/assets/photos/duality-fire.jpg" alt="" loading="lazy" /></span>
        <span className="word-h inst-h">Instinct</span>
        <span className="word-v inst-v" aria-hidden="true">
          {INSTINCT.map((c, i) => <span key={i}>{c}</span>)}
        </span>
        <span className="d-sub">
          <span className="d-sub-title">The Living Fire</span>
          <span className="d-sub-body">Intuition. The pulse.<br />The whisper that changes everything.</span>
        </span>
      </button>
    </section>
  );
}
