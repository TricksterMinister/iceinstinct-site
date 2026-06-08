import { testimonials } from '../data/testimonials';

export function Proof() {
  // Renders nothing until real testimonials exist. No placeholders, no
  // "coming soon", no fabricated reviews.
  if (testimonials.length === 0) return null;

  return (
    <section className="proof" id="proof">
      <div className="section-bg-word right" aria-hidden="true">TRUST</div>
      <div className="proof-stage">
        <header className="proof-intro">
          <h2 className="proof-headline">
            <span>In their</span>
            <span className="it">own words.</span>
          </h2>
        </header>

        <ul className="proof-list">
          {testimonials.map((t) => (
            <li className="proof-item" key={`${t.name}-${t.date}`}>
              <figure className="proof-card">
                <blockquote className="proof-quote">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="proof-meta">
                  {t.photo ? (
                    <img className="proof-photo" src={t.photo} alt={t.name} loading="lazy" decoding="async" />
                  ) : null}
                  <span className="proof-name">{t.name}</span>
                  <span className="proof-event">
                    {t.event} <span aria-hidden="true">&middot;</span> {t.date}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
