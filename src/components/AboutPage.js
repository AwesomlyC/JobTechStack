import React from 'react'
import './../styles/AboutPage.css'
function AboutPage() {
    return (
        <div className="about-page">
          {/* Hero Section */}
          <header className="hero">
            <h1 className="hero-title">Job Tech Stack</h1>
            <p className="hero-subtitle">Your Career, Visualized</p>
            <a href="/sign-in" className="hero-button">
              Start Tracking Jobs Now
            </a>
          </header>
    
          {/* Features Section */}
          <section className="features">
            <h2 className="section-title">What Can Job Tech Stack Do?</h2>
            <div className="features-grid">
              <div className="feature">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Analytics Dashboard</h3>
                <p className="feature-text">
                  Visualize your progress with charts and graphs.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">🧠</div>
                <h3 className="feature-title">Keyword Analysis</h3>
                <p className="feature-text">
                  Extract and analyze key skills from job descriptions.
                </p>
              </div>
              <div className="feature">
                <div className="feature-icon">📂</div>
                <h3 className="feature-title">Job Tracking</h3>
                <p className="feature-text">
                  Keep all your applications organized in one place.
                </p>
              </div>
            </div>
          </section>
    
          {/* Vision Section */}
          <section className="vision">
            <h2 className="section-title">Our Vision</h2>
            <p className="vision-text">
              We empower job seekers to stay organized, understand the market, and
              grow their careers with data-driven insights.
            </p>
          </section>
  
          {/* Call to Action */}
          <footer className="cta">
            <p className="cta-text">Ready to transform your job search?</p>
            <a href="/sign-in" className="cta-button">
              Get Started
            </a>
          </footer>
        </div>
      );
}

export default AboutPage