import { useState } from 'react';
import { PalateProfiler } from '../features/Profiler/PalateProfiler';
import type { Selections } from '../features/Profiler/profilerData';
import { setCocktail } from '../lib/leadContext';
import { track } from '../lib/track';
import markUrl from '../assets/ii-mark.png';

export function PalateProfilerSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCommission = (name: string, sel: Selections) => {
    setCocktail(name);
    track('profiler_commission', { cocktail: name });
    const params = new URLSearchParams({ cocktail: name });
    if (sel.identity) params.set('identity', sel.identity);
    if (sel.taste) params.set('taste', sel.taste);
    if (sel.accord) params.set('accord', sel.accord);
    window.location.href = `/contact/?${params.toString()}`;
  };

  return (
    <>
      <section className="pp-section dark" id="profiler">
        <div className="section-bg-word top right" aria-hidden="true">PALATE</div>
        <div className="pp-wrap reveal">
          <div className="pp-grid">
            <div className="pp-left">
              <div className="pp-mark-badge" aria-hidden="true">
                <img src={markUrl} alt="" width={42} height={42} draggable={false} />
              </div>
              <span className="pp-eyebrow">INTERACTIVE PALATE PROFILER &middot; IN REAL TIME</span>
              <h2 className="pp-title">
                Design the flavor of <span className="it">your evening.</span>
              </h2>
              <p className="pp-lead">
                Select your sensory notes—smoky mezcal, botanical gin, bright citrus, or rich cacao. Our Flavor Architect constructs a custom cocktail profile tailored specifically to your room and palate.
              </p>
              <div className="pp-actions">
                <button
                  type="button"
                  className="btn-primary pp-cta-btn"
                  data-cursor="link"
                  onClick={() => {
                    track('profiler_open_home', {});
                    setIsOpen(true);
                  }}
                >
                  <span className="btn-label">Launch Palate Profiler</span>
                  <span className="btn-arr" aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
            <div className="pp-right">
              <div className="pp-card-preview" onClick={() => setIsOpen(true)} data-cursor="link">
                <div className="pp-preview-header">
                  <span className="pp-ph-dot"></span>
                  <span className="pp-ph-title">Taste Profiler &middot; 3 Steps</span>
                </div>
                <div className="pp-preview-tags">
                  <span className="pp-tag active">01 &middot; Identity</span>
                  <span className="pp-tag">02 &middot; Balance</span>
                  <span className="pp-tag">03 &middot; Accord</span>
                </div>
                <div className="pp-preview-palates">
                  <span className="pp-p-pill">Smoky &amp; Mezcal</span>
                  <span className="pp-p-pill">Citrus &amp; Elderflower</span>
                  <span className="pp-p-pill">Botanical &amp; Alpine</span>
                  <span className="pp-p-pill">Cacao &amp; Dark Port</span>
                </div>
                <p className="pp-preview-hint">Tap to launch interactive builder &rarr;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PalateProfiler
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onCommission={handleCommission}
      />
    </>
  );
}
