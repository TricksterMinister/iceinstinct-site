import { useState } from 'react';
import { funnel, type Temperament } from '../../app/funnelStore';

type Side = 'left' | 'right';

export function Duality({ onCommit }: { onCommit?: (t: Temperament) => void }) {
  const [side, setSide] = useState<Side | null>(null);
  const [committed, setCommitted] = useState(false);

  const enter = (s: Side) => () => { if (!committed) setSide(s); };
  const leave = () => { if (!committed) setSide(null); };
  const commit = (t: Temperament, s: Side) => () => {
    if (committed) return;
    setCommitted(true);
    setSide(s);
    funnel.setTemperament(t);
    setTimeout(() => onCommit?.(t), 700);
  };

  const cls =
    'duality' +
    (side === 'left' ? ' hover-left' : side === 'right' ? ' hover-right' : '') +
    (committed ? ' is-committed' : '');

  return (
    <section className={cls} id="manifesto" aria-label="Ice and Instinct">
      <section
        className="d-panel d-left"
        onMouseEnter={enter('left')}
        onMouseLeave={leave}
        onClick={commit('ice', 'left')}
      >
        <div className="d-media"><img src="/assets/photos/duality-ice.jpg" alt="Ice - a wall of clear ice" loading="lazy" /></div>
        <div className="d-scrim" />
        <div className="d-content">
          <span className="d-eyebrow">The cold craft</span>
          <p className="d-sub">Discipline. Order. The patience of craft.</p>
        </div>
      </section>

      <div className="d-divider" aria-hidden="true" />

      <section
        className="d-panel d-right"
        onMouseEnter={enter('right')}
        onMouseLeave={leave}
        onClick={commit('instinct', 'right')}
      >
        <div className="d-media"><img src="/assets/photos/duality-fire.jpg" alt="Instinct - a wall of embers" loading="lazy" /></div>
        <div className="d-scrim" />
        <div className="d-content">
          <span className="d-eyebrow">The living fire</span>
          <p className="d-sub">Intuition. The pulse. The whisper that changes everything.</p>
        </div>
      </section>

      <p className="duality-eyebrow" aria-hidden="true">A private mixology ritual</p>

      <div className="d-title" aria-hidden="true">
        <span className="d-part d-ice">Ice</span>
        <span className="d-amp">&amp;</span>
        <span className="d-part d-instinct">Instinct</span>
      </div>

      <div className="duality-cue" aria-hidden="true">Choose your nature</div>
    </section>
  );
}
