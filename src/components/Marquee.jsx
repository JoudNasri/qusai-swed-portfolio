/** Endless brand ribbon */
export default function Marquee({ items, reverse = false }) {
  const row = (
    <div className="marquee__row" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <i className="marquee__gem">◆</i>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${reverse ? 'is-reverse' : ''}`}>
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
