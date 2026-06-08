export function GalleryTeaser() {
  return (
    <section className="gallery" id="gallery">
      <div className="section-bg-word top left" aria-hidden="true">COLLECTION</div>
      <header className="gallery-intro">
        <h2 className="gallery-title">Touch the glass <span className="it">to awaken the spirit.</span></h2>
        <p className="gallery-lead">Thirteen signature compositions. Each built once.</p>
      </header>

      <div className="gallery-track" data-gallery-track="">
        <a className="gallery-tile" href="/gallery/" data-cursor="view"><img src="/assets/photos/belladonna-v2.png" alt="Belladonna" loading="lazy" /><figcaption><span>II</span> Belladonna, 2025</figcaption></a>
        <a className="gallery-tile" href="/gallery/" data-cursor="view"><img src="/assets/photos/rose-garden-v2.png" alt="Rose Garden Rendezvous" loading="lazy" /><figcaption><span>VI</span> Rose Garden, 2025</figcaption></a>
        <a className="gallery-tile" href="/gallery/" data-cursor="view"><img src="/assets/photos/persimmon-saffron-v2.png" alt="Persimmon Saffron Sour" loading="lazy" /><figcaption><span>III</span> Persimmon Saffron, 2025</figcaption></a>
        <a className="gallery-tile" href="/gallery/" data-cursor="view"><img src="/assets/photos/besame-v2.png" alt="Besame" loading="lazy" /><figcaption><span>XII</span> Bésame, 2025</figcaption></a>
        <a className="gallery-tile" href="/gallery/" data-cursor="view"><img src="/assets/photos/white-lotus-v2.png" alt="White Lotus" loading="lazy" /><figcaption><span>I</span> White Lotus, 2025</figcaption></a>
      </div>

      <a className="gallery-cta" href="/gallery/" data-cursor="link">View The Collection <span aria-hidden="true">&rarr;</span></a>
    </section>
  );
}
