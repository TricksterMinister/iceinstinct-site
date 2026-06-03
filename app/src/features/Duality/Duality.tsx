import { useEffect, useState } from 'react';
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
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const still = reduced || narrow;

  const target = useMotionValue(50);
  const width = useSpring(target, { damping: 30, stiffness: 180, mass: 0.6 });
  const iceW = useTransform(width, (w) => `${w}%`);
  const instinctW = useTransform(width, (w) => `${100 - w}%`);
  // spread: 0 at rest (wordmark tight & centred) -> ~1 as a side grows (words part)
  const spread = useTransform(width, (w) => Math.min(1, Math.abs(w - 50) / 18));
  const iceX = useTransform(spread, (s) => `${-s * 30}vw`);
  const instinctX = useTransform(spread, (s) => `${s * 30}vw`);
  const ampOpacity = useTransform(spread, (s) => 1 - s);

  const [hovered, setHovered] = useState<Side | null>(null);
  const [committed, setCommitted] = useState<Side | null>(null);

  const enter = (side: Side) => () => {
    if (still || committed) return;
    setHovered(side);
    target.set(side === 'ice' ? 68 : 32);
  };
  const leave = () => {
    if (still || committed) return;
    setHovered(null);
    target.set(50);
  };
  const commit = (side: Side) => () => {
    if (committed) return;
    setCommitted(side);
    funnel.setTemperament(side);
    if (!still) target.set(side === 'ice' ? 100 : 0);
    setTimeout(() => onCommit?.(side), 700);
  };

  const iceActive = hovered === 'ice' || committed === 'ice';
  const instinctActive = hovered === 'instinct' || committed === 'instinct';

  return (
    <section className="duality" id="manifesto" aria-label="Ice and Instinct">
      <motion.div
        className={`duality-side duality-ice${iceActive ? ' is-active' : ''}`}
        style={{ width: still ? undefined : iceW }}
        onPointerEnter={enter('ice')}
        onPointerLeave={leave}
        onClick={commit('ice')}
      >
        <div className="duality-media">
          <img src="/assets/photos/duality-ice.jpg" alt="Ice - a wall of clear ice" loading="lazy" />
        </div>
        <div className="duality-scrim" />
      </motion.div>

      <motion.div
        className={`duality-side duality-instinct${instinctActive ? ' is-active' : ''}`}
        style={{ width: still ? undefined : instinctW }}
        onPointerEnter={enter('instinct')}
        onPointerLeave={leave}
        onClick={commit('instinct')}
      >
        <div className="duality-media">
          <img src="/assets/photos/duality-fire.jpg" alt="Instinct - a wall of embers" loading="lazy" />
        </div>
        <div className="duality-scrim" />
      </motion.div>

      <p className="duality-eyebrow" aria-hidden="true">A private mixology ritual</p>

      <div className="duality-portal" aria-hidden="true">
        <span className="duality-seam" />
      </div>

      <div className="duality-wordmark">
        <motion.span
          className={`dw-word dw-ice${iceActive ? ' is-active' : ''}`}
          style={{ x: still ? 0 : iceX }}
        >
          Ice
          <span className="dw-caption">Discipline. Order. The patience of craft.</span>
        </motion.span>
        <motion.span className="dw-amp" style={{ opacity: still ? 1 : ampOpacity }}>
          &amp;
        </motion.span>
        <motion.span
          className={`dw-word dw-instinct${instinctActive ? ' is-active' : ''}`}
          style={{ x: still ? 0 : instinctX }}
        >
          Instinct
          <span className="dw-caption">Intuition. The pulse. The whisper that changes everything.</span>
        </motion.span>
      </div>

      <div className="duality-cue" aria-hidden="true">Choose your nature</div>
    </section>
  );
}
