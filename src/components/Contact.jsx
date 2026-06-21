import React, { useState, useRef } from 'react';
import { translations } from '../translations';
import { HugeiconsIcon } from '@hugeicons/react';
import { MailIcon, CallIcon, Location01Icon, SentIcon } from '@hugeicons/core-free-icons';

export default function Contact({ lang }) {
  const t = translations[lang].contact;

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Easter egg states for startled/running cat
  const [isScared, setIsScared] = useState(false);
  const [scaredState, setScaredState] = useState(''); // 'startled' | 'running' | 'hidden'
  const [scaredLeft, setScaredLeft] = useState(0);
  const [facingLeft, setFacingLeft] = useState(false);
  const [catDelay, setCatDelay] = useState('0s');

  const catRef = useRef(null);
  const trackRef = useRef(null);

  const handleCatClick = () => {
    if (isScared) return; // Prevent double clicks during animation

    const catEl = catRef.current;
    const trackEl = trackRef.current;
    if (!catEl || !trackEl) return;

    // Get current horizontal position relative to track
    const rect = catEl.getBoundingClientRect();
    const trackRect = trackEl.getBoundingClientRect();
    const currentLeft = rect.left - trackRect.left;

    // Detect direction from CSS transform matrix scaleX
    const style = window.getComputedStyle(catEl);
    const matrix = new DOMMatrix(style.transform);
    const isFacingLeft = matrix.a < 0;

    setScaredLeft(currentLeft);
    setFacingLeft(isFacingLeft);
    setIsScared(true);
    setScaredState('startled');
    setCatDelay(isFacingLeft ? '0s' : '-15s');

    // 1. Shiver in place for 600ms, then run offscreen
    setTimeout(() => {
      setScaredState('running');
      // target off-screen left or right depending on face direction
      const targetLeft = isFacingLeft ? -60 : trackRect.width + 10;
      setScaredLeft(targetLeft);
    }, 600);

    // 2. Hide when off-screen
    setTimeout(() => {
      setScaredState('hidden');
    }, 1400);

    // 3. Reappear and resume normal walking loop after 5 seconds of hiding (6.4s total)
    setTimeout(() => {
      setIsScared(false);
      setScaredState('');
    }, 6400);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    
    fetch("https://formsubmit.co/ajax/trantruc0103@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "Họ & Tên": formState.name,
        "Email": formState.email,
        "Lời Nhắn": formState.message
      })
    })
    .then(response => response.json())
    .then(data => {
      setIsSubmitting(false);
      if (data.success === "true" || data.success === true) {
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        alert("Có lỗi xảy ra khi gửi tin nhắn. Bạn vui lòng thử lại sau hoặc gửi trực tiếp tới email trantruc0103@gmail.com nhé!");
      }
    })
    .catch(error => {
      setIsSubmitting(false);
      alert("Có lỗi xảy ra khi gửi tin nhắn. Bạn vui lòng thử lại sau hoặc gửi trực tiếp tới email trantruc0103@gmail.com nhé!");
      console.error("Error submitting form:", error);
    });
  };

  return (
    <footer id="contact" className="contact-sec container reveal">
      <h2 className="contact-title">{t.title}</h2>

      <div className="contact-grid">
        {/* Left Column: Greeting and Info */}
        <div className="contact-info-col">
          <p className="contact-greet">{t.greeting}</p>
          <div className="contact-closing">{t.closing}</div>

          <div className="contact-info-list">
            {/* Email */}
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <HugeiconsIcon icon={MailIcon} size={20} strokeWidth={1.8} />
              </div>
              <div className="contact-info">
                <span className="contact-label">{t.email}</span>
                <a href="mailto:trantruc0103@gmail.com" className="contact-value">
                  trantruc0103@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <HugeiconsIcon icon={CallIcon} size={20} strokeWidth={1.8} />
              </div>
              <div className="contact-info">
                <span className="contact-label">{t.phone}</span>
                <a href="tel:+84837827026" className="contact-value">
                  +84 837 827 026
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <HugeiconsIcon icon={Location01Icon} size={20} strokeWidth={1.8} />
              </div>
              <div className="contact-info">
                <span className="contact-label">{t.address}</span>
                <span className="contact-value">
                  {t.address_value}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="contact-form-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">{t.form.name_label}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder={t.form.name_placeholder}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">{t.form.email_label}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder={t.form.email_placeholder}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">{t.form.message_label}</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                placeholder={t.form.message_placeholder}
                className="form-textarea"
                rows="4"
                required
              />
            </div>

            <div className="form-actions">
              {submitted && (
                <div className="form-success">
                  {t.form.success_msg}
                </div>
              )}
              <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? '...' : t.form.send_btn}</span>
                <HugeiconsIcon icon={SentIcon} size={16} strokeWidth={2.2} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="copyright">
        &copy; {new Date().getFullYear()} Tran Thanh Truc. {t.copyright_reserved} | {t.copyright_by} <a href="https://tranthanhtung-trevor.vercel.app/" target="_blank" rel="noopener noreferrer">thanhtungg</a>.
      </p>

      {/* Whimsical walking black cat with 1/3 bobtail */}
      <div ref={trackRef} className="cat-track" aria-hidden="true">
        {scaredState === 'startled' && (
          <span className="scared-exclamation" style={{
            left: `${scaredLeft + (facingLeft ? 10 : 32)}px`
          }}>
            !
          </span>
        )}
        <svg 
          ref={catRef}
          onClick={handleCatClick}
          className={`walking-cat ${isScared ? 'scared-run' : ''} ${scaredState === 'startled' ? 'cat-scared-startled' : ''}`}
          viewBox="0 0 24 16" 
          width="48" 
          height="32"
          style={{
            cursor: isScared ? 'default' : 'pointer',
            left: isScared ? `${scaredLeft}px` : undefined,
            opacity: scaredState === 'hidden' ? 0 : 1,
            transition: scaredState === 'running' ? 'left 0.8s cubic-bezier(0.5, 0, 1, 1)' : 'none',
            '--scale-dir': facingLeft ? -1 : 1,
            transform: (isScared && scaredState !== 'startled') ? `scaleX(${facingLeft ? -1 : 1})` : undefined,
            animation: isScared ? 'none' : undefined,
            animationDelay: isScared ? undefined : catDelay
          }}
        >
          {/* Tail Frame A (Fluffy 1/3 bobtail) */}
          <path className="cat-tail tail-frame-a" d="M 6 6 h 1 v 1 h -1 z M 5 4 h 2 v 2 h -2 z" fill="currentColor" />
          {/* Tail Frame B (Wiggled bobtail) */}
          <path className="cat-tail tail-frame-b" d="M 5 6 h 1 v 1 h -1 z M 4 4 h 2 v 2 h -2 z" fill="currentColor" />

          {/* Body, neck, head, ears (Static Pixel Art) */}
          <path d="M 15 2 h 1 v 2 h -1 z M 19 2 h 1 v 2 h -1 z M 15 4 h 5 v 4 h -5 z M 15 5 h 2 v 1 h -2 z M 7 6 h 10 v 5 h -10 z" fill="currentColor" />
          
          {/* Walking legs frame 1 */}
          <path className="pixel-leg leg-frame-1" d="M 14 11 h 1 v 3 h -1 z M 16 11 h 1 v 3 h -1 z M 8 11 h 1 v 3 h -1 z M 10 11 h 1 v 3 h -1 z" fill="currentColor" />
          
          {/* Walking legs frame 2 */}
          <path className="pixel-leg leg-frame-2" d="M 15 11 h 1 v 2 h -1 z M 16 13 h 1 v 1 h -1 z M 13 11 h 1 v 2 h -1 z M 12 13 h 1 v 1 h -1 z M 9 11 h 1 v 2 h -1 z M 10 13 h 1 v 1 h -1 z M 7 11 h 1 v 2 h -1 z M 6 13 h 1 v 1 h -1 z" fill="currentColor" />
          
          {/* Walking legs frame 3 */}
          <path className="pixel-leg leg-frame-3" d="M 14 11 h 1 v 3 h -1 z M 16 11 h 1 v 3 h -1 z M 8 11 h 1 v 3 h -1 z M 10 11 h 1 v 3 h -1 z" fill="currentColor" />
          
          {/* Walking legs frame 4 */}
          <path className="pixel-leg leg-frame-4" d="M 13 11 h 1 v 2 h -1 z M 12 13 h 1 v 1 h -1 z M 15 11 h 1 v 2 h -1 z M 16 13 h 1 v 1 h -1 z M 7 11 h 1 v 2 h -1 z M 6 13 h 1 v 1 h -1 z M 9 11 h 1 v 2 h -1 z M 10 13 h 1 v 1 h -1 z" fill="currentColor" />
          
          {/* Eye (Single pixel glowing green) */}
          <rect className="cat-eye" x="18" y="5" width="1" height="1" />
        </svg>
      </div>
    </footer>
  );
}
