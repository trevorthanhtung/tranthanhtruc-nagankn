import React, { useState } from 'react';
import { translations } from '../translations';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';

function getNameSegments(name) {
  // If the name has spaces, split by space (and keep spaces between words)
  if (name.includes(' ')) {
    return name.split(' ').map((word, idx, arr) => {
      return {
        text: word,
        isSeparator: false,
        afterSpace: idx < arr.length - 1
      };
    });
  }
  // If Japanese, split by the interpunct '・' and keep it
  if (name.includes('・')) {
    return name.split('・').map((part, idx, arr) => {
      return {
        text: part + (idx < arr.length - 1 ? '・' : ''),
        isSeparator: false,
        afterSpace: false
      };
    });
  }
  // Fallback
  return [{ text: name, isSeparator: false, afterSpace: false }];
}

export default function Hero({ lang }) {
  const t = translations[lang].hero;
  const nameChars = Array.from(t.name);
  const lastCharIndex = nameChars.length - 1;
  const hankoStartDelay = 0.2 + nameChars.length * 0.08 + 0.2;
  const hankoGlowDelay = hankoStartDelay + 0.5;

  const [fallenLeaves, setFallenLeaves] = useState({
    leaf1: false,
    leaf2: false,
    leaf3: false,
    leaf4: false
  });

  const triggerFall = (leafKey) => {
    if (!fallenLeaves[leafKey]) {
      setFallenLeaves(prev => ({ ...prev, [leafKey]: true }));
      // Reset leaf to original position after 4.5s
      setTimeout(() => {
        setFallenLeaves(prev => ({ ...prev, [leafKey]: false }));
      }, 4500);
    }
  };

  const handleScrollToAbout = () => {
    const aboutSec = document.getElementById('about');
    if (aboutSec) {
      aboutSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-sec container">
      {/* Decorative vertical Japanese typography */}
      <div className="vertical-accent" aria-hidden="true">
        <span>
          {Array.from("通訳・翻訳").map((char, index) => (
            <span 
              key={index} 
              className="vertical-calligraphy-char"
              style={{ animationDelay: `${0.8 + index * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </span>
        <span className="dot-divider"></span>
        <span>
          {Array.from("冷熱技術").map((char, index) => (
            <span 
              key={index} 
              className="vertical-calligraphy-char"
              style={{ animationDelay: `${1.8 + index * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>

      {/* Decorative bamboo line art */}
      <div className="bamboo-bg" aria-hidden="true">
        <svg viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
          <path d="M50 200 C47 150 53 100 50 50 C49 35 47 20 45 5" />
          <path d="M48 150 Q50 149 52 150" />
          <path d="M50 100 Q52 99 54 100" />
          <path d="M49 50 Q51 49 53 50" />
          
          {/* Branch 1 */}
          <path d="M50 100 C58 90 65 85 70 88" />
          <path 
            className={`bamboo-leaf ${fallenLeaves.leaf1 ? 'falling' : ''}`}
            onMouseEnter={() => triggerFall('leaf1')}
            d="M70 88 C74 80 82 78 88 82" 
            fill="currentColor" 
            stroke="none" 
          />
          <path 
            className={`bamboo-leaf ${fallenLeaves.leaf2 ? 'falling' : ''}`}
            onMouseEnter={() => triggerFall('leaf2')}
            d="M68 90 C73 94 79 98 82 105" 
            fill="currentColor" 
            stroke="none" 
          />
          
          {/* Branch 2 */}
          <path d="M49 50 C40 40 32 35 25 38" />
          <path 
            className={`bamboo-leaf ${fallenLeaves.leaf3 ? 'falling' : ''}`}
            onMouseEnter={() => triggerFall('leaf3')}
            d="M25 38 C21 30 13 28 7 32" 
            fill="currentColor" 
            stroke="none" 
          />
          <path 
            className={`bamboo-leaf ${fallenLeaves.leaf4 ? 'falling' : ''}`}
            onMouseEnter={() => triggerFall('leaf4')}
            d="M27 40 C22 44 16 48 13 55" 
            fill="currentColor" 
            stroke="none" 
          />
        </svg>
      </div>

      <div className="hero-content">
        <div className="hero-greet">{t.greeting}</div>
        <h1 className="hero-name">
          {(() => {
            const segments = getNameSegments(t.name);
            let charGlobalIdx = 0;
            return segments.map((segment, segIdx) => {
              const chars = Array.from(segment.text);
              return (
                <React.Fragment key={segIdx}>
                  <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {chars.map((char, charIdx) => {
                      const isLast = (segIdx === segments.length - 1) && (charIdx === chars.length - 1);
                      const currentIdx = charGlobalIdx;
                      charGlobalIdx++;

                      if (isLast) {
                        return (
                          <span key={currentIdx} style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
                            <span 
                              className="calligraphy-char" 
                              style={{ animationDelay: `${0.2 + currentIdx * 0.08}s` }}
                            >
                              {char}
                            </span>
                            {/* Custom red hanko stamp (竹 - Take / Bamboo) */}
                            <span 
                              className="hanko-stamp" 
                              title="竹 (Trúc / Bamboo)"
                              style={{ 
                                animation: 'hankoReveal 0.5s ease-out forwards, hankoGlow 2.5s ease-in-out infinite alternate',
                                animationDelay: `${hankoStartDelay}s, ${hankoGlowDelay}s`,
                                opacity: 0
                              }}
                            >
                              <svg viewBox="0 0 40 40" width="36" height="36">
                                <rect x="2" y="2" width="36" height="36" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
                                <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fontFamily="var(--font-display)" fontWeight="900" fill="currentColor">
                                  竹
                                </text>
                              </svg>
                            </span>
                          </span>
                        );
                      }

                      return (
                        <span 
                          key={currentIdx} 
                          className="calligraphy-char" 
                          style={{ animationDelay: `${0.2 + currentIdx * 0.08}s` }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>{segment.afterSpace && ' '}
                </React.Fragment>
              );
            });
          })()}
        </h1>
        <h2 className="hero-sub">{t.subtitle}</h2>
        <p className="hero-tagline">{t.tagline}</p>
        <button className="btn" onClick={handleScrollToAbout}>
          {t.cta}
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={2.5} />
        </button>

        {/* Mobile-only horizontal watermark under CTA button */}
        <div className="mobile-accent-text" aria-hidden="true">
          <span>
            {Array.from("通訳・翻訳").map((char, index) => (
              <span 
                key={index} 
                className="vertical-calligraphy-char"
                style={{ animationDelay: `${0.8 + index * 0.12}s` }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="dot-divider"></span>
          <span>
            {Array.from("冷熱技術").map((char, index) => (
              <span 
                key={index} 
                className="vertical-calligraphy-char"
                style={{ animationDelay: `${1.8 + index * 0.12}s` }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
