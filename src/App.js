import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [currentText, setCurrentText] = useState('');
  const fullText = 'ButteredBothSides';
  const [textIndex, setTextIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', motivation: '', website: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBase = process.env.REACT_APP_API_URL || '';

  const shapes = useMemo(
    () =>
      [...Array(24)].map((_, i) => ({
        left: `${(i * 17 + 7) % 100}%`,
        delay: `${(i * 0.7) % 4}s`,
        duration: `${4 + (i % 5)}s`,
      })),
    []
  );

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + fullText[textIndex]);
        setTextIndex((prev) => prev + 1);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [textIndex, fullText]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formStatus) setFormStatus(null);
    if (formError) setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setFormStatus(null);

    try {
      const response = await fetch(`${apiBase}/api/pitch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setFormStatus('sent');
      setFormData({ name: '', email: '', motivation: '', website: '' });
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div className="grid-overlay" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <div className="background-animation" aria-hidden="true">
        <div className="floating-shapes">
          {shapes.map((shape, i) => (
            <div
              key={i}
              className={`shape shape-${i % 4}`}
              style={{
                left: shape.left,
                animationDelay: shape.delay,
                animationDuration: shape.duration,
              }}
            />
          ))}
        </div>
      </div>

      <main className="page">
        <header className="hero">
          <div className="brand-mark">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-icon">◈</span>
            <span className="brand-bracket">/&gt;</span>
          </div>

          <p className="tagline">web &amp; software development</p>

          <h1 className="domain-title">
            {currentText}
            <span className="cursor">▌</span>
          </h1>

          <div className="status-badge">
            <span className="status-dot" />
            <span className="status-label">status:</span>
            <span className="status-value">fully committed — internal ops only</span>
          </div>
        </header>

        <section className="message-card">
          <h2 className="message-heading">Hey there, fellow builder.</h2>

          <p>
            First off — thanks for stopping by. It genuinely means a lot that you thought of
            Buttered Both Sides when you were looking for a team to bring your idea to life.
          </p>

          <p>
            Here&apos;s the honest truth: we&apos;re not taking on new client projects at the
            moment. And honestly? That&apos;s a good problem to have. We&apos;re fully occupied
            building our own products — the ambitious, slightly chaotic kind of software that
            reminds us why we got into this in the first place. Our roadmaps are packed, our
            whiteboards are overflowing, and our focus is locked on shipping what we&apos;re
            building in-house.
          </p>

          <p>
            We&apos;re fortunate enough to be busy with work we&apos;re passionate about, and
            right now every bit of our bandwidth goes there. We wish we could say yes to everyone
            who reaches out, but adding another project would mean doing a disservice to the
            commitments we&apos;ve already made — including the ones we&apos;ve made to ourselves.
          </p>

          <p className="message-closing">
            We hope you understand, and we truly hope your project thrives — whether that&apos;s
            with us down the line, or with another great team today.
          </p>
        </section>

        <div className="tech-strip">
          <div className="tech-item">
            <span className="tech-key">stack</span>
            <span className="tech-val">react · node · cloud</span>
          </div>
          <div className="tech-item">
            <span className="tech-key">mode</span>
            <span className="tech-val">build mode: ON</span>
          </div>
          <div className="tech-item">
            <span className="tech-key">uptime</span>
            <span className="tech-val">100% caffeinated</span>
          </div>
        </div>

        <section className="form-section">
          <div className="form-header">
            <span className="form-prompt">&gt;_</span>
            <h2>Still think we might be interested?</h2>
          </div>

          <p className="form-intro">
            We&apos;d love to be wrong. If your project is so compelling it might change our
            minds, tell us about it below. No promises — but we read every message that lands
            in our inbox.
          </p>

          <form className="pitch-form" onSubmit={handleSubmit}>
            <div className="form-row honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ada Lovelace"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-row">
              <label htmlFor="motivation">Motivate us — why should we care?</label>
              <textarea
                id="motivation"
                name="motivation"
                placeholder="What's the idea? What makes it special? Why Buttered Both Sides?"
                value={formData.motivation}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              <span className="submit-icon">{isSubmitting ? '…' : '→'}</span>
              {isSubmitting ? 'Sending…' : 'Send your pitch'}
            </button>

            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}

            {formStatus === 'sent' && (
              <p className="form-success" role="status">
                Message sent — thanks for reaching out. We&apos;ll read it soon.
              </p>
            )}
          </form>
        </section>

        <footer className="footer">
          <a href="mailto:hello@butteredbothsides.com" className="footer-link">
            hello@butteredbothsides.com
          </a>
          <span className="footer-divider">·</span>
          <span className="footer-copy">© {new Date().getFullYear()} Buttered Both Sides</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
