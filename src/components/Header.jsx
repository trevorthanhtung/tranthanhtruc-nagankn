import { useState, useEffect } from 'react';
import { translations } from '../translations';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sun01Icon, Moon01Icon } from '@hugeicons/core-free-icons';

export default function Header({ lang, setLang, theme, toggleTheme }) {
  const t = translations[lang].nav;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top of the page
      if (currentScrollY <= 50) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Check scroll difference to prevent overly sensitive toggling
      const diff = currentScrollY - lastScrollY;
      if (Math.abs(diff) < 10) {
        return;
      }

      if (diff > 0) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`navbar ${isVisible ? '' : 'hidden'}`}>
      <div className="container nav-container">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {t.logo}
        </div>

        <div className="nav-controls">
          <div className="lang-switcher" role="group" aria-label="Language selection">
            <button
              className={`lang-btn ${lang === 'vi' ? 'active' : ''}`}
              onClick={() => setLang('vi')}
              title="Tiếng Việt"
            >
              VI
            </button>
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              title="English"
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === 'ja' ? 'active' : ''}`}
              onClick={() => setLang('ja')}
              title="日本語"
            >
              JP
            </button>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? (
              <HugeiconsIcon icon={Sun01Icon} size={18} strokeWidth={1.8} />
            ) : (
              <HugeiconsIcon icon={Moon01Icon} size={18} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
