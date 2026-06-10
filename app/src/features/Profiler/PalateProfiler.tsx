import { useEffect, useReducer, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortalRoot } from '../../app/PortalRoot';
import { funnel } from '../../app/funnelStore';
import {
  steps,
  matchRecipe,
  type Recipe,
  type Selections,
  type StepId,
} from './profilerData';
import { downloadShareImage, printRecipe, shareToInstagram } from './artifact';
import { PalateAmbient } from './PalateAmbient';
import { track } from '../../lib/track';

interface Props {
  open: boolean;
  onClose: () => void;
  /** Hand the created cocktail to the Inquiry funnel (Phase 3). For now -> /contact/. */
  onCommission: (recipeName: string, selections: Selections) => void;
}

type Phase = 'select' | 'alchemy' | 'result';

interface State {
  phase: Phase;
  step: number;
  selections: Selections;
  recipe: Recipe | null;
  distill: number;
}

type Action =
  | { type: 'choose'; stepId: StepId; optionId: string }
  | { type: 'back' }
  | { type: 'compose'; recipe: Recipe }
  | { type: 'redistill'; recipe: Recipe }
  | { type: 'reset' };

const initial: State = { phase: 'select', step: 0, selections: {}, recipe: null, distill: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'choose': {
      const selections = { ...state.selections, [action.stepId]: action.optionId };
      if (state.step < steps.length - 1) return { ...state, selections, step: state.step + 1 };
      return { ...state, selections, phase: 'alchemy' };
    }
    case 'back':
      return state.step > 0 ? { ...state, step: state.step - 1 } : state;
    case 'compose':
      return { ...state, phase: 'result', recipe: action.recipe };
    case 'redistill':
      return { ...state, recipe: action.recipe, distill: state.distill + 1 };
    case 'reset':
      return initial;
    default:
      return state;
  }
}

const ALCHEMY_MS = 2400;
const ROMAN = ['I', 'II', 'III'];

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function composeRecipe(selections: Selections, distill: number): Promise<Recipe> {
  const temperament = funnel.getState().temperament;
  // Curated library matchmaker - no network, no AI at runtime.
  return matchRecipe(selections, temperament, distill);
}

export function PalateProfiler({ open, onClose, onCommission }: Props) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [distilling, setDistilling] = useState(false);
  const [shareNote, setShareNote] = useState('');
  const timer = useRef<number | undefined>(undefined);
  const alive = useRef(true);
  const distillNo = useRef(0); // synchronous counter so rapid re-rolls advance correctly

  // Component liveness - gate any async dispatch so a resolved fetch never
  // touches an unmounted reducer. Set true in the body too: React StrictMode
  // mounts -> unmounts -> remounts in dev, and the unmount cleanup would
  // otherwise leave alive=false forever (card would never appear).
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  // Body-scroll lock + reset shortly after close (avoids a visible state flash on exit).
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
    const t = window.setTimeout(() => { distillNo.current = 0; setDistilling(false); setShareNote(''); dispatch({ type: 'reset' }); }, 450);
    return () => window.clearTimeout(t);
  }, [open]);

  // Esc to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // The guest reached their signature - the single most valuable funnel moment
  // before the inquiry itself.
  useEffect(() => {
    if (state.phase === 'result' && state.recipe) {
      track('profiler_complete', { cocktail: state.recipe.name });
    }
  }, [state.phase, state.recipe]);

  // Staged alchemy beat, then reveal. The AI compose runs in parallel with the
  // dramatic delay; we reveal only after BOTH finish, so the beat always plays
  // (R4) and AI latency hides behind it. Reduced-motion = no delay.
  useEffect(() => {
    if (state.phase !== 'alchemy') return;
    let cancelled = false;
    const minBeat = prefersReduced()
      ? Promise.resolve()
      : new Promise<void>((r) => { timer.current = window.setTimeout(r, ALCHEMY_MS); });
    distillNo.current = 0;
    Promise.all([composeRecipe(state.selections, 0), minBeat]).then(([recipe]) => {
      if (!cancelled && alive.current) dispatch({ type: 'compose', recipe });
    });
    return () => { cancelled = true; window.clearTimeout(timer.current); };
  }, [state.phase, state.selections]);

  const redistill = () => {
    if (distilling) return; // throttle: one re-roll in flight at a time
    setDistilling(true);
    distillNo.current += 1;
    composeRecipe(state.selections, distillNo.current).then((recipe) => {
      if (!alive.current) return;
      dispatch({ type: 'redistill', recipe });
      setDistilling(false);
    });
  };

  const step = steps[state.step];

  // Subtle 3D parallax tilt on the formula card (desktop fine-pointer only).
  const canTilt = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(x * 100 + 50).toFixed(1)}%`);
    el.style.setProperty('--my', `${(y * 100 + 50).toFixed(1)}%`);
  };
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  };

  return (
    <PortalRoot>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Compose your signature"
          >
            <PalateAmbient mode={(state.selections.taste as any) ?? null} />

            {/* Top bar: phase marker + close */}
            <div className="pp-bar">
              <span className="pp-bar-mark">
                {state.phase === 'select' ? (
                  <>
                    <i>{ROMAN[state.step]}</i>
                    <em>{step.eyebrow.split('/').pop()?.trim()}</em>
                  </>
                ) : (
                  <>
                    <i>&#9671;</i>
                    <em>The Composition</em>
                  </>
                )}
              </span>
              <span className="pp-bar-title">Compose your signature</span>
              <button className="pp-close" onClick={onClose} aria-label="Close">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </button>
            </div>

            {/* Progress hairline */}
            {state.phase === 'select' && (
              <div className="pp-rail" aria-hidden="true">
                <motion.span
                  animate={{ scaleX: (state.step + 1) / 3 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}

            <div className="pp-stage">
              <AnimatePresence mode="wait">
                {state.phase === 'select' && (
                  <motion.div
                    key={`step-${state.step}`}
                    className="pp-q"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className="pp-q-title">{step.title}</h2>
                    <p className="pp-q-sub">{step.subtitle}</p>

                    <ul className="pp-choices">
                      {step.options.map((o, i) => (
                        <li key={o.id}>
                          <button
                            className="pp-choice"
                            onClick={() => dispatch({ type: 'choose', stepId: step.id, optionId: o.id })}
                          >
                            <span className="pp-choice-no">{String(i + 1).padStart(2, '0')}</span>
                            <span className="pp-choice-text">
                              <span className="pp-choice-label">{o.label}</span>
                              <span className="pp-choice-desc">{o.desc}</span>
                            </span>
                            <span className="pp-choice-arr" aria-hidden="true">&rarr;</span>
                          </button>
                        </li>
                      ))}
                    </ul>

                    {state.step > 0 && (
                      <button className="pp-back" onClick={() => dispatch({ type: 'back' })}>
                        &larr; Back
                      </button>
                    )}
                  </motion.div>
                )}

                {state.phase === 'alchemy' && (
                  <motion.div
                    key="alchemy"
                    className="pp-alchemy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="pp-pour" aria-hidden="true">
                      <span className="pp-pour-line" />
                      <span className="pp-pour-pool" />
                    </div>
                    <p className="pp-alchemy-title it">Distilling choice into form</p>
                    <p className="pp-alchemy-sub">Composing your signature</p>
                  </motion.div>
                )}

                {state.phase === 'result' && state.recipe && (
                  <motion.div
                    key="result"
                    className="pp-result"
                    style={{ ['--tint' as string]: state.recipe.tint }}
                    initial={{ opacity: 0, x: -70 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="pp-card" onMouseMove={onTilt} onMouseLeave={resetTilt}>
                      <span className="pp-shine" aria-hidden="true" />
                      <span className="pp-corner tl" aria-hidden="true" />
                      <span className="pp-corner tr" aria-hidden="true" />
                      <span className="pp-corner bl" aria-hidden="true" />
                      <span className="pp-corner br" aria-hidden="true" />

                      <header className="pp-card-head">
                        <span className="pp-card-archetype">{state.recipe.archetype}</span>
                        <span className="pp-card-eyebrow">A signature composed for you</span>
                        <h2 className="pp-card-name it">{state.recipe.name}</h2>
                        <p className="pp-card-tag">&ldquo;{state.recipe.tagline}&rdquo;</p>
                        <svg className="pp-cube" viewBox="0 0 100 100" aria-hidden="true" style={{ color: 'var(--tint)' }}>
                          <polygon points="50,18 79.4,35 50,52 20.6,35" fill="currentColor" fillOpacity="0.82" />
                          <polygon points="20.6,35 50,52 50,86 20.6,69" fill="currentColor" fillOpacity="0.55" />
                          <polygon points="79.4,35 79.4,69 50,86 50,52" fill="currentColor" fillOpacity="0.40" />
                          <polygon points="79.4,35 79.4,69 50,86 50,52" fill="#000" fillOpacity="0.18" />
                          <polygon points="50,18 79.4,35 50,52 20.6,35" fill="#fff" fillOpacity="0.12" />
                          <g fill="none" style={{ stroke: 'var(--c-accent)' }} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
                            <polygon points="50,18 79.4,35 79.4,69 50,86 20.6,69 20.6,35" />
                            <path d="M50,52 L79.4,35 M50,52 L20.6,35 M50,52 L50,86" />
                          </g>
                        </svg>
                      </header>

                      <div className="pp-card-body">
                        <div className="pp-card-col">
                          <div className="pp-block">
                            <span className="pp-label">Colour profile</span>
                            <p>{state.recipe.colorProfile}</p>
                          </div>
                          <div className="pp-block">
                            <span className="pp-label">The sensory rationale</span>
                            <p>{state.recipe.sensoryNarrative}</p>
                          </div>
                        </div>

                        <div className="pp-card-col formula">
                          <div className="pp-block">
                            <span className="pp-label accent">The matrix</span>
                            <ul className="pp-ingredients">
                              {state.recipe.ingredients.map((ing, i) => (
                                <li key={i}><span aria-hidden="true">&bull;</span>{ing}</li>
                              ))}
                            </ul>
                          </div>
                          <span className="pp-hr" />
                          <div className="pp-block">
                            <span className="pp-label accent">The ritual</span>
                            <ol className="pp-steps">
                              {state.recipe.instructions.map((ins, i) => (
                                <li key={i}>{ins}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>

                      <footer className="pp-card-foot">
                        <span>By appointment</span>
                        <span>Manhattan</span>
                        <span>iceinstinct.com</span>
                      </footer>
                    </div>

                    {/* Technical controls live OFF the card, on the dark ground. */}
                    <aside className="pp-controls">
                      <div className="pp-controls-top">
                        <button
                          className="pp-btn primary"
                          onClick={() => onCommission(state.recipe!.name, state.selections)}
                        >
                          <span>Commission this serving</span>
                          <span className="arr" aria-hidden="true">&rarr;</span>
                        </button>
                        <button className="pp-btn ghost" onClick={redistill} disabled={distilling}>
                          {distilling ? 'Distilling...' : 'Distill again'}
                        </button>
                      </div>

                      <div className="pp-controls-take">
                        <span className="pp-label accent">Take it with you</span>
                        <button className="pp-btn ghost" onClick={() => { track('keepsake_print', { cocktail: state.recipe!.name }); printRecipe(state.recipe!); }}>Print PDF</button>
                        <button className="pp-btn ghost" onClick={() => { track('keepsake_save', { cocktail: state.recipe!.name }); downloadShareImage(state.recipe!); }}>Save image</button>
                        <button
                          className="pp-btn ghost"
                          onClick={async () => {
                            track('keepsake_share', { cocktail: state.recipe!.name });
                            const r = await shareToInstagram(state.recipe!);
                            setShareNote(
                              r === 'unsupported'
                                ? 'Instagram Stories post from your phone: open iceinstinct.com on mobile, or use Save image.'
                                : '',
                            );
                          }}
                        >
                          Share on Instagram
                        </button>
                        <AnimatePresence>
                          {shareNote && (
                            <motion.p
                              className="pp-share-note"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {shareNote}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </aside>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalRoot>
  );
}
