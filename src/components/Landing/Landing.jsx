import React from "react";
import "./Landing.css";

/**
 * Landing hero with wave SVG, decorative circles, CTA buttons.
 * Uses semantic tags and accessibility attributes.
 */

export default function Landing() {
  return (
    <main className="landing-root" aria-labelledby="landing-title">
      <section className="hero" role="region" aria-label="Hero">
        <div className="container">
          <div className="hero-content">
            <header>
              <h1 id="landing-title" className="hero-title" data-testid="landing-title">
                Tickify — Manage tickets effortlessly
              </h1>
              <p className="hero-sub" data-testid="landing-sub">
                A simple, consistent ticket management app — login, create, and track support tickets across projects.
              </p>
            </header>

            <div className="hero-cta">
              <a
                href="/auth/login"
                className="btn btn-primary"
                role="button"
                aria-label="Login"
                data-testid="landing-cta-login"
              >
                Login
              </a>

              <a
                href="/auth/signup"
                className="btn btn-outline"
                role="button"
                aria-label="Get Started"
                data-testid="landing-cta-start"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Banner image - Uncommented for visual appeal */}
          <figure className="hero-figure" aria-hidden="false">
            <img
              src="/assets/images/banner.png" // Place your banner in /public/assets/images/
              alt="Illustration of people collaborating on ticket management"
              className="hero-banner"
              data-testid="landing-banner"
            />
          </figure>
        </div>

        {/* Decorative circles */}
        <div className="circle circle-1" aria-hidden="true"></div>
        <div className="circle circle-2" aria-hidden="true"></div>

        {/* Bottom wave SVG */}
        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="var(--bg-light)" d="M0,40 C240,120 480,0 720,40 C960,80 1200,10 1440,60 L1440 0 L0 0 Z"></path>
          </svg>
        </div>
      </section>

      {/* Features section (card-based) */}
      <section className="features" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="sr-only">Core features</h2>

          <div className="cards">
            <article className="card" data-testid="feature-1">
              <h3>Secure Authentication</h3>
              <p>Simulated token-based login and protected routes.</p>
            </article>

            <article className="card" data-testid="feature-2">
              <h3>Dashboard Overview</h3>
              <p>View total, open and resolved tickets at a glance.</p>
            </article>

            <article className="card" data-testid="feature-3">
              <h3>Ticket CRUD</h3>
              <p>Create, view, edit and delete tickets with validation.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Footer - Consistent across pages */}
      <footer className="footer" role="contentinfo" aria-label="Site footer">
        <div className="container">
          <p>&copy; 2025 Tickify. All rights reserved. Built with React for HNG-13.</p>
        </div>
      </footer>
    </main>
  );
}