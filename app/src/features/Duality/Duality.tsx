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

  // single driver: panel width of the ICE side (50 rest, 68 ice-active, 32 instinct-active)
  const target = useMotionValue(50);
  const width = useSpring(target, { damping: 32, stiffness: 170, mass: 0.7 });
  const iceW = useTransform(width, (w) => `${w}%`);
  const instinctW = useTransform(width, (w) => `${100 - w}%`);
  const open = useTransform(width, (w) => Math.min(1, Math.abs(w - 50) / 18));

  // words ride the opening AND transform in scale
  const iceX = useTransform(width, [32, 50, 68], ['-34vw', '0vw', '-19vw']);
  const iceScale = useTransform(width, [32, 50, 68], [0.62, 1, 1.16]);
  const instinctX = useTransform(width, [32, 50, 68], ['19vw', '0vw', '34vw']);
  const instinctScale = useTransform(width, [32, 50, 68], [1.16, 1, 0.62]);
  const ampOpacity = useTransform(open, (s) => 1 - s);
  const ampScale = useTransform(open, (s) => 1 - 0.3 * s);
  const seamOpacity = useTransform(open, (s) => 0.55 * s);

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

      {/* champagne light at the opening seam (only visible as the portal parts) */}
      {!still && (
        <motion.span className="duality-lightseam" aria-hidden="true" style={{ left: iceW, opacity: seamOpacity }} />
      )}

      <p className="duality-eyebrow" aria-hidden="true">A private mixology ritual</p>

      <div className="duality-wordmark">
        <motion.span
          className={`dw-word dw-ice${iceActive ? ' is-active' : ''}`}
          style={still ? undefined : { x: iceX, scale: iceScale }}
        >
          <span className="dw-text">Ice</span>
          <span className="dw-caption">Discipline. Order. The patience of craft.</span>
        </motion.span>

        <motion.span className="dw-amp" style={still ? undefined : { opacity: ampOpacity, scale: ampScale }}>
          &amp;
        </motion.span>

        <motion.span
          className={`dw-word dw-instinct${instinctActive ? ' is-active' : ''}`}
          style={still ? undefined : { x: instinctX, scale: instinctScale }}
        >
          <span className="dw-text">Instinct</span>
          <span className="dw-caption">Intuition. The pulse. The whisper that changes everything.</span>
        </motion.span>
      </div>

      <div className="duality-cue" aria-hidden="true">Choose your nature</div>
    </section>
  );
}
