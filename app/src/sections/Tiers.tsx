export function Tiers() {
  return (
    <section className="tiers" id="tiers">
      <div className="section-bg-word top left" aria-hidden="true">OFFERINGS</div>
      <div className="tiers-rail" data-tiers-rail="">

        <header className="tiers-intro">
          <h2 className="tiers-headline">
            <span>Four distinct levels</span>
            <span className="it">of service.</span>
          </h2>
          <p className="tiers-lead">
            One uncompromising standard, four ways to begin.
          </p>
        </header>

        <article className="tier" data-tier="i">
          <div className="tier-bg">
            <img src="/assets/photos/foundation-hero-poster.png" alt="The Foundation - a classic cocktail under a brass lamp in a dim speakeasy" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">I</div>
            <span className="tier-name">The Foundation</span>
            <h3 className="tier-title">Impeccable drinks, <span className="it">seamless service.</span></h3>
            <span className="tier-go" aria-hidden="true">Explore <i>&rarr;</i></span>
          </div>
          <a className="tier-stretch" href="/offerings/foundation/" data-cursor="link" aria-label="Explore The Foundation"></a>
        </article>

        <article className="tier" data-tier="ii">
          <div className="tier-bg">
            <img src="/assets/photos/simplicity-hero-poster.png" alt="Perfection in Simplicity - an ice-cold Martini in a dim speakeasy" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">II</div>
            <span className="tier-name">Perfection in Simplicity</span>
            <h3 className="tier-title">Timeless cocktails, <span className="it">quiet precision.</span></h3>
            <span className="tier-go" aria-hidden="true">Explore <i>&rarr;</i></span>
          </div>
          <a className="tier-stretch" href="/offerings/simplicity/" data-cursor="link" aria-label="Explore Perfection in Simplicity"></a>
        </article>

        <article className="tier" data-tier="iii">
          <div className="tier-bg">
            <img src="/assets/photos/bespoke-hero-poster.png" alt="Bespoke Design - a sculptural cocktail with dry-ice fog in a dim speakeasy" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">III</div>
            <span className="tier-name">Bespoke Design &amp; Artistry</span>
            <h3 className="tier-title">Signature cocktails, <span className="it">tailored to your story.</span></h3>
            <span className="tier-go" aria-hidden="true">Explore <i>&rarr;</i></span>
          </div>
          <a className="tier-stretch" href="/offerings/bespoke/" data-cursor="link" aria-label="Explore Bespoke Design and Artistry"></a>
        </article>

        <article className="tier" data-tier="iv">
          <div className="tier-bg">
            <img src="/assets/photos/omakase-hero-poster.png" alt="Omakase Improvisation - a lone cocktail with rising vapor in a dim speakeasy" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">IV</div>
            <span className="tier-name">Omakase Improvisation</span>
            <h3 className="tier-title">No menu. <span className="it">Unrepeatable moments.</span></h3>
            <span className="tier-go" aria-hidden="true">Explore <i>&rarr;</i></span>
          </div>
          <a className="tier-stretch" href="/offerings/omakase/" data-cursor="link" aria-label="Explore Omakase Improvisation"></a>
        </article>

      </div>
    </section>
  );
}
