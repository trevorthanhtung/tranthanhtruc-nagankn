import React from 'react';
import { translations } from '../translations';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon } from '@hugeicons/core-free-icons';

export default function About({ lang }) {
  const t = translations[lang].about;

  return (
    <section id="about" className="container reveal">
      <h2 className="section-title">{t.title}</h2>
      <div className="about-grid">
        {/* Profile Photo Card inside a woodwork frame */}
        <div className="profile-photo-card">
          <div className="profile-photo-wrapper">
            <img 
              src="/avatar.jpg" 
              alt="Tran Thanh Truc" 
              className="profile-photo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="profile-photo-placeholder" style={{ display: 'none' }}>
              <HugeiconsIcon icon={UserIcon} size={40} strokeWidth={1.5} />
              <span>{lang === 'vi' ? 'Ảnh chân dung' : lang === 'ja' ? 'プロフィール写真' : 'Profile Photo'}</span>
            </div>
          </div>
        </div>

        <div className="about-text">
          <p>{t.bio1}</p>
          <p>{t.bio2}</p>
        </div>
      </div>
    </section>
  );
}
