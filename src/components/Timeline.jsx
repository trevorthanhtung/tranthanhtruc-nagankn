import { translations } from '../translations';

export default function Timeline({ lang }) {
  const t = translations[lang].timeline;

  const renderTitle = (title) => {
    const parts = title.split(/(SAREE|Hasegawa|ハセガワ)/g);
    return parts.map((part, index) => {
      if (part === 'SAREE') {
        return (
          <a key={index} href="https://sareeref.vn/" target="_blank" rel="noopener noreferrer">
            SAREE
          </a>
        );
      }
      if (part === 'Hasegawa') {
        return (
          <a key={index} href="https://hasegawa.com.vn/" target="_blank" rel="noopener noreferrer">
            Hasegawa
          </a>
        );
      }
      if (part === 'ハセガワ') {
        return (
          <a key={index} href="https://hasegawa.com.vn/" target="_blank" rel="noopener noreferrer">
            ハセガワ
          </a>
        );
      }
      return part;
    });
  };

  return (
    <section id="timeline" className="container reveal">
      <h2 className="section-title">{t.title}</h2>
      <div className="timeline-container">
        {t.items.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <span className="timeline-dot"></span>
            <div className="timeline-year">{item.year}</div>
            <h3 className="timeline-title">{renderTitle(item.title)}</h3>
            <div className="timeline-sub">{item.sub}</div>
            <p className="timeline-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
