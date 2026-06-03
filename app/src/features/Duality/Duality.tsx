import { useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { funnel, type Temperament } from '../../app/funnelStore';

type Side = 'ice' | 'instinct';

export function Duality({ onCommit }: { onCommit?: (t: Temperament) => void }) {
  const reduced = useReducedMotion();

  const target = useMotionValue(50);
  const width = useSpring(target, { damping: 30, stiffness: 180, mass: 0.6 });
  const iceW = useTransform(width, (w) => `${w}%`);
  const instinctW = useTransform(width, (w) => `${100 - w}%`);

  const [hovered, setHovered] = useState<Side | null>(null);
  const [committed, setCommitted] = useState<Side | null>(null);

  const enter = (side: Side) => () => {
    if (reduced || committed) return;
    setHovered(side);
    target.set(side === 'ice' ? 68 : 32);
  };

  const leave = () => {
    if (reduced || committed) return;
    setHovered(null);
    target.set(50);
  };

  const commit = (side: Side) => () => {
    if (committed) return;
    setCommitted(side);
    funnel.setTemperament(side);
    target.set(side === 'ice' ? 100 : 0);
    setTimeout(() => onCommit?.(side), 700);
  };

  const iceActive = hovered === 'ice' || committed === 'ice';
  const instinctActive = hovered === 'instinct' || committed === 'instinct';

  return (
    <section className="duality" id="manifesto" aria-label="Ice and Instinct">
      <motion.div
        className={`duality-side duality-ice${iceActive ? ' is-active' : ''}`}
        style={{ width: reduced ? '50%' : iceW }}
        onPointerEnter={enter('ice')}
        onPointerLeave={leave}
        onClick={commit('ice')}
      >
        <div className="duality-media">
          <img
            src="/assets/photos/tier-foundation.jpg"
            alt="Ice - the discipline of craft"
            loading="lazy"
          />
        </div>
        <div className="duality-scrim" />
        <div className="duality-label">
          <div className="duality-word">Ice</div>
          <p className="duality-caption">Discipline. Order. The patience of craft.</p>
        </div>
      </motion.div>

      <motion.div
        className={`duality-side duality-instinct${instinctActive ? ' is-active' : ''}`}
        style={{ width: reduced ? '50%' : instinctW }}
        onPointerEnter={enter('instinct')}
        onPointerLeave={leave}
        onClick={commit('instinct')}
      >
        <div className="duality-media">
          <img
            src="/assets/photos/tier-bespoke.jpg"
            alt="Instinct - the spark of intuition"
            loading="lazy"
          />
        </div>
        <div className="duality-scrim" />
        <div className="duality-label">
          <div className="duality-word">Instinct</div>
          <p className="duality-caption">
            Intuition. The pulse. The whisper that changes everything.
          </p>
        </div>
      </motion.div>

      <div
        className="duality-amp"
        aria-hidden="true"
        style={{ opacity: hovered || committed ? 0 : 1 }}
      >
        &amp;
      </div>
      <div className="duality-cue" aria-hidden="true">
        Choose your nature
      </div>
    </section>
  );
}
