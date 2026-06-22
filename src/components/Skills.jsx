import { translations } from '../translations';

export default function Skills({ lang }) {
  const t = translations[lang].skills;

  const langSkills = [t.items.ja, t.items.en, t.items.vi];
  const techSkills = [t.items.hvac_terms, t.items.cycle, t.items.office];
  const softSkills = [t.items.comms, t.items.adapt, t.items.detail];

  return (
    <section id="skills" className="container reveal">
      <h2 className="section-title">{t.title}</h2>
      <div className="skills-grid">
        {/* Languages */}
        <div>
          <h3 className="skills-sec-title">{t.languages}</h3>
          <div className="skills-badges">
            {langSkills.map((skill, idx) => (
              <span key={idx} className="badge">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Technical */}
        <div>
          <h3 className="skills-sec-title">{t.technical}</h3>
          <div className="skills-badges">
            {techSkills.map((skill, idx) => (
              <span key={idx} className="badge">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="skills-sec-title">{t.soft}</h3>
          <div className="skills-badges">
            {softSkills.map((skill, idx) => (
              <span key={idx} className="badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
