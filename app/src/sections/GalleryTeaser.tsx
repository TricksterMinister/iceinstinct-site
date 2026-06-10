export function GalleryTeaser() {
  return (
    <section className="gallery" id="gallery">
      <div className="section-bg-word top left" aria-hidden="true">COLLECTION</div>
      <header className="gallery-intro">
        {/* "Touch the glass..." lives ONLY on /gallery/, where the photos truly
            open. Here the tiles merely awaken from monochrome on hover - so the
            preview carries its own, honest headline. */}
        <h2 className="gallery-title">Thirteen signature compositions, <span className="it">each built once.</span></h2>
      </header>

      {/* Preview only: the tiles are NOT links. The single button below is the
          one and only doorway into The Collection (owner rule 2026-06-10). */}
      <div className="gallery-track" data-gallery-track="">
        <figure className="gallery-tile"><img src="/assets/photos/belladonna-v2.png" alt="Belladonna" loading="lazy" /><figcaption><span>II</span> Belladonna, 2025</figcaption></figure>
        <figure className="gallery-tile"><img src="/assets/photos/rose-garden-v2.png" alt="Rose Garden Rendezvous" loading="lazy" /><figcaption><span>VI</span> Rose Garden, 2025</figcaption></figure>
        <figure className="gallery-tile"><img src="/assets/photos/persimmon-saffron-v2.png" alt="Persimmon Saffron Sour" loading="lazy" /><figcaption><span>III</span> Persimmon Saffron, 2025</figcaption></figure>
        <figure className="gallery-tile"><img src="/assets/photos/besame-v2.png" alt="Besame" loading="lazy" /><figcaption><span>XII</span> Bésame, 2025</figcaption></figure>
        <figure className="gallery-tile"><img src="/assets/photos/white-lotus-v2.png" alt="White Lotus" loading="lazy" /><figcaption><span>I</span> White Lotus, 2025</figcaption></figure>
      </div>

      <a className="gallery-cta" href="/gallery/" data-cursor="link">View The Collection <span aria-hidden="true">&rarr;</span></a>
    </section>
  );
}
