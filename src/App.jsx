import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';

export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('trantruclogo_lang');
    if (saved) return saved;
    // Default to browser language, fallback other languages to 'en'
    const browserLang = navigator.language.slice(0, 2);
    if (browserLang === 'ja') return 'ja';
    if (browserLang === 'vi') return 'vi';
    return 'en'; // Default for English and all other languages
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('trantruclogo_theme');
    if (saved) return saved;
    // Default to system preference (dark or light)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle theme state changes on root document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    localStorage.setItem('trantruclogo_theme', theme);
  }, [theme]);

  // Handle language persistence
  useEffect(() => {
    localStorage.setItem('trantruclogo_lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // IntersectionObserver for reveal scroll animation
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      {
        threshold: 0.1, // trigger early for mobile
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lang]); // Re-run when language changes since layout shifts occur

  // Handle visibility of "Back to Top" button (only show when scrolled to the end of the page)
  useEffect(() => {
    const handleScrollTopVisibility = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      // Show button only when within 150px from the absolute bottom of the page
      if (totalHeight - scrollPosition < 150) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollTopVisibility);
  }, []);

  // Force scroll to top on page refresh (F5) or initial load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-glow-1" aria-hidden="true"></div>
      <div className="bg-glow-2" aria-hidden="true"></div>
      <div className="bg-glow-3" aria-hidden="true"></div>
      <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Expertise lang={lang} />
        <Timeline lang={lang} />
        <Skills lang={lang} />
        <Contact lang={lang} />
      </main>

      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <HugeiconsIcon icon={ArrowUp01Icon} size={20} strokeWidth={2.2} />
      </button>
    </>
  );
}
