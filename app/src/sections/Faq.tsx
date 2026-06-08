type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: 'Is alcohol included in the price?',
    a: 'No. The tier price covers the craft, service, and expertise. You may provide the spirits and wine yourself, or we handle the entire purchase on your behalf at supplier cost.',
  },
  {
    q: 'Do you bring everything - tools, bar, ice, glassware?',
    a: 'Yes. The bar setup, tools, and service are fully handled. Specialty ice from Michelin-level suppliers, curated glassware, and rentals are available through the Concierge and billed at supplier cost.',
  },
  {
    q: 'Where do you serve?',
    a: 'The New York metropolitan area and New Jersey. Events further out are welcome; any travel beyond the immediate metro is included in your private quote.',
  },
  {
    q: 'Can you handle a large event or wedding?',
    a: 'Yes. Teimuraz leads a team of trusted New York bartenders. Service scales from an intimate solo performance to a full bar team for weddings, galas, and corporate events.',
  },
  {
    q: 'How far ahead should I book?',
    a: 'Two or more weeks is ideal, and shorter timelines are often possible. Ask and we will tell you honestly what we can do.',
  },
  {
    q: 'Is there a minimum?',
    a: 'Each tier lists a starting price. Your final quote depends on guest count, format, and any Concierge enhancements.',
  },
  {
    q: 'How do deposits and cancellations work?',
    a: 'A deposit reserves your date; the balance is due before the event.',
  },
];

export function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="section-bg-word right" aria-hidden="true">ANSWERS</div>
      <div className="faq-stage">
        <header className="faq-intro">
          <h2 className="faq-headline">
            <span>Before</span>
            <span className="it">you ask.</span>
          </h2>
          <p className="faq-lead">The honest answers, plainly given.</p>
        </header>

        <ul className="faq-list">
          {FAQS.map((item) => (
            <li className="faq-item" key={item.q}>
              <details className="faq-details">
                <summary className="faq-q" data-cursor="link">
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-q-mark" aria-hidden="true"></span>
                </summary>
                <div className="faq-a">
                  <p>{item.a}</p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
