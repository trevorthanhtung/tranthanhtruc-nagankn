import React, { useState } from 'react';
import { translations } from '../translations';
import { HugeiconsIcon } from '@hugeicons/react';
import { MailIcon, CallIcon, Location01Icon, SentIcon } from '@hugeicons/core-free-icons';

export default function Contact({ lang }) {
  const t = translations[lang].contact;

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      {/* Whimsical walking black cat with 1/3 bobtail */}
      <div className="cat-track" aria-hidden="true">
        <svg className="walking-cat" viewBox="0 0 48 30" width="48" height="30">
          {/* Tail (1/3 length bobtail, wiggling) */}
          <path className="cat-tail" d="M16 18 Q13 15 15 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Back Leg 1 */}
          <line className="cat-leg leg-back-1" x1="18" y1="21" x2="16" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {/* Back Leg 2 */}
          <line className="cat-leg leg-back-2" x1="21" y1="21" x2="23" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Body */}
          <ellipse cx="26" cy="18" rx="10" ry="6" fill="currentColor" />
          
          {/* Front Leg 1 */}
          <line className="cat-leg leg-front-1" x1="30" y1="21" x2="28" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          {/* Front Leg 2 */}
          <line className="cat-leg leg-front-2" x1="33" y1="21" x2="35" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Head */}
          <circle cx="35" cy="12" r="5" fill="currentColor" />
          {/* Ears */}
          <polygon points="31,9 33,4 35,8" fill="currentColor" />
          <polygon points="39,9 37,4 35,8" fill="currentColor" />
          
          {/* Eye (glowing bamboo green) */}
          <circle cx="37" cy="11" r="0.75" fill="var(--accent-color)" />
        </svg>
      </div>

      <p className="copyright">
        &copy; {new Date().getFullYear()} Tran Thanh Truc. {t.copyright_reserved} | {t.copyright_by} <a href="https://tranthanhtung-trevor.vercel.app/" target="_blank" rel="noopener noreferrer">thanhtungg</a>.
      </p>
    </footer>
  );
}
