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
            One uncompromising standard. Drag, scroll, swipe.
          </p>
        </header>

        <article className="tier" data-tier="i">
          <div className="tier-bg">
            <img src="/assets/photos/tier-foundation.jpg" alt="Bartender's hands stirring a crystal mixing glass, Manhattan night beyond" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">I</div>
            <span className="tier-name">The Foundation</span>
            <h3 className="tier-title">Impeccable drinks, <span className="it">seamless service.</span></h3>
            <p className="tier-blurb">No shortcuts, only intention. The standard from which every other level departs.</p>
            <ul className="tier-spec">
              <li><span>From</span><b>$400</b></li>
              <li><span>Up to</span><b>40 guests</b></li>
              <li><span>Duration</span><b>3 hours</b></li>
            </ul>
            <a className="tier-link" href="/offerings/foundation/" data-cursor="link">Read the chapter <span aria-hidden="true">&rarr;</span></a>
          </div>
        </article>

        <article className="tier" data-tier="ii">
          <div className="tier-bg">
            <img src="/assets/photos/tier-simplicity.jpg" alt="A lone bartender in profile, a single cocktail lit on a sparse bar" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">II</div>
            <span className="tier-name">Perfection in Simplicity</span>
            <h3 className="tier-title">Timeless cocktails, <span className="it">quiet precision.</span></h3>
            <p className="tier-blurb">A masterful solo performance for those who value craft over theatre.</p>
            <ul className="tier-spec">
              <li><span>From</span><b>$750</b></li>
              <li><span>Up to</span><b>12 guests</b></li>
              <li><span>Duration</span><b>4 hours</b></li>
            </ul>
            <a className="tier-link" href="/offerings/simplicity/" data-cursor="link">Read the chapter <span aria-hidden="true">&rarr;</span></a>
          </div>
        </article>

        <article className="tier" data-tier="iii">
          <div className="tier-bg">
            <img src="/assets/photos/tier-bespoke.jpg" alt="A flamed citrus peel sparking over a sculptural signature cocktail" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">III</div>
            <span className="tier-name">Bespoke Design &amp; Artistry</span>
            <h3 className="tier-title">Signature cocktails, <span className="it">tailored to your story.</span></h3>
            <p className="tier-blurb">Your event's theme and vision, crafted into every glass.</p>
            <ul className="tier-spec">
              <li><span>From</span><b>$1,500</b></li>
              <li><span>Up to</span><b>15 guests</b></li>
              <li><span>Duration</span><b>4 hours</b></li>
            </ul>
            <a className="tier-link" href="/offerings/bespoke/" data-cursor="link">Read the chapter <span aria-hidden="true">&rarr;</span></a>
          </div>
        </article>

        <article className="tier" data-tier="iv">
          <div className="tier-bg">
            <img src="/assets/photos/tier-omakase.jpg" alt="A bartender improvising in smoke, a guest watching across the bar" loading="lazy" decoding="async" />
            <div className="tier-bg-scrim"></div>
          </div>
          <div className="tier-body">
            <div className="tier-rank">IV</div>
            <span className="tier-name">Omakase Improvisation</span>
            <h3 className="tier-title">No menu. <span className="it">Unrepeatable moments.</span></h3>
            <p className="tier-blurb">Real-time creation in dialogue with the room. Complete trust.</p>
            <ul className="tier-spec">
              <li><span>From</span><b>$3,000</b></li>
              <li><span>Up to</span><b>25 guests</b></li>
              <li><span>Duration</span><b>Open</b></li>
            </ul>
            <a className="tier-link" href="/offerings/omakase/" data-cursor="link">Read the chapter <span aria-hidden="true">&rarr;</span></a>
          </div>
        </article>

      </div>
    </section>
  );
}
