export default function Landing({ onEnter }) {
  return (
    <div className="lp">
      <nav className="lp-nav">
        <span className="lp-logo"><img src="/logo.svg" alt="" height="24" style={{ marginRight: 6 }} />oktavhealth</span>
        <button className="btn" onClick={onEnter}>Open App</button>
      </nav>

      <section className="lp-hero">
        <h1>Your mental health,<br />tracked privately.</h1>
        <p>Simple mood tracking and journaling that stays on your device. No accounts, no cloud, no judgment.</p>
        <button className="btn lp-hero-btn" onClick={onEnter}>Get Started</button>
      </section>

      <section className="lp-features">
        <h2>Everything you need</h2>
        <div className="lp-features-grid">
          <div className="lp-feature-card">
            <span className="lp-feature-icon">📊</span>
            <h3>Mood Tracking</h3>
            <p>Log how you feel with a single tap. Track patterns over time with charts and insights.</p>
          </div>
          <div className="lp-feature-card">
            <span className="lp-feature-icon">📝</span>
            <h3>Journal</h3>
            <p>Write freely about your day. Your thoughts stay on your device, always.</p>
          </div>
          <div className="lp-feature-card">
            <span className="lp-feature-icon">🔒</span>
            <h3>100% Private</h3>
            <p>No accounts, no servers, no data collection. Everything lives in your browser.</p>
          </div>
        </div>
      </section>

      <section className="lp-cta">
        <h2>Start tracking today</h2>
        <p>Free, private, and open source.</p>
        <button className="btn lp-hero-btn" onClick={onEnter}>Open App</button>
      </section>

      <footer className="lp-footer">
        <p>© 2026 OktavHealth. Built with care.</p>
      </footer>
    </div>
  )
}
