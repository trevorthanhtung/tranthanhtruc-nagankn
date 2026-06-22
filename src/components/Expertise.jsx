import { translations } from '../translations';
import { HugeiconsIcon } from '@hugeicons/react';
import { TranslateIcon, FactoryIcon } from '@hugeicons/core-free-icons';

export default function Expertise({ lang }) {
  const t = translations[lang].expertise;

  return (
    <section id="expertise" className="container reveal">
      <h2 className="section-title">{t.title}</h2>
      <div className="expertise-grid">
        {/* Japanese Translation Card */}
        <div className="exp-card">
          <div className="exp-icon">
            <HugeiconsIcon icon={TranslateIcon} size={28} strokeWidth={1.8} />
          </div>
          <h3>{t.translation.title}</h3>
          <p>{t.translation.desc}</p>
        </div>

        {/* HVAC Technical Support Card */}
        <div className="exp-card">
          <div className="exp-icon">
            <HugeiconsIcon icon={FactoryIcon} size={28} strokeWidth={1.8} />
          </div>
          <h3>{t.hvac.title}</h3>
          <p>{t.hvac.desc}</p>
        </div>
      </div>
    </section>
  );
}
