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
          <h2 className="d-word d-ice">Ice</h2>
          <p className="d-line">Order, clarity, the patience of the stir.</p>
          <p className="d-body">The classics, built without shortcuts. Measured, exact, quietly perfect.</p>
          <span className="d-enter">Begin in stillness <span aria-hidden="true">&rarr;</span></span>
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
          <h2 className="d-word d-instinct">Instinct</h2>
          <p className="d-line">The spark that changes everything.</p>
          <p className="d-body">No menu, no net. Created in the moment, in dialogue with the room. Unrepeatable.</p>
          <span className="d-enter">Enter the fire <span aria-hidden="true">&rarr;</span></span>
        </div>
      </section>

      <p className="duality-eyebrow" aria-hidden="true">Ice &amp; Instinct - a private mixology ritual</p>
    </section>
  );
}
