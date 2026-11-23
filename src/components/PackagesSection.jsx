import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function PackagesSection({
  showHeading = true,
  title = "Our Packages",
  subtitle = "Choose the right solar power package for your business. Compare our Small and Enterprise options side by side."
}) {
  const smallFeatures = [
    "Affordable pricing",
    "Essential features",
    "Easy setup",
    "Basic support",
    "Perfect for startups and small businesses"
  ];

  const enterpriseFeatures = [
    "Advanced features",
    "Premium support",
    "Custom solutions",
    "Advanced analytics",
    "Scalable business solutions",
    "Dedicated assistance"
  ];

  return (
    <section className="section packages-section" id="packages">
      <div className="container">
        {showHeading && (
          <SectionHeading
            align="center"
            eyebrow="Our Packages"
            title={title}
            text={subtitle}
          />
        )}

        <div className="packages-intro-badge-container">
          <span className="packages-intro-pill">
            <Icon name="sun" size={16} /> Transparent, Scalable Commercial Solar Packages
          </span>
        </div>

        <div className="packages-grid">
          {/* Package 1: Small */}
          <ScrollReveal>
            <div className="package-card package-card-small" id="small-package">
              <div className="package-card-header">
                <div className="package-icon-wrap package-icon-small" aria-hidden="true">
                  <Icon name="rocket" size={26} />
                </div>
                <div className="package-title-group">
                  <span className="package-tier-label"></span>
                  <h3 className="package-title">Small Package</h3>
                </div>
              </div>

              <p className="package-tagline">
                Perfect for startups and small businesses
              </p>

              <div className="package-pricing-box">
                <div className="package-price-row">
                  <span className="package-price-currency">$</span>
                  <span className="package-price-amount">Affordable</span>
                </div>
                <span className="package-price-sub">Budget-friendly solution with rapid ROI</span>
              </div>

              <div className="package-divider" />

              <div className="package-features-block">
                <h4 className="package-features-title">Package Features:</h4>
                <ul className="package-features-list">
                  {smallFeatures.map((feat, idx) => (
                    <li key={idx} className="package-feature-item">
                      <span className="package-check-icon">
                        <Icon name="check" size={16} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-cta-wrap">
                <div className="package-cta-buttons">
                  <Link
                    to="/quote?package=small"
                    className="button button-package button-package-small"
                    aria-label="Get Started with Small Package"
                  >
                    <span>Get Started</span>
                    <Icon name="arrow" size={17} />
                  </Link>
                  <Link
                    to="/packages/details?package=small#package-specs"
                    className="button button-package-more-info"
                    aria-label="More Information about Small Package"
                  >
                    <span>More Information</span>
                    <Icon name="info" size={16} />
                  </Link>
                </div>
                <span className="package-guarantee-note">
                  Fast setup &bull; Essential tools &amp; support
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Package 2: Enterprise (Recommended) */}
          <ScrollReveal>
            <div className="package-card package-card-enterprise package-recommended" id="enterprise-package">
              {/* Recommended Badge */}
              <div className="recommended-badge" aria-label="Recommended Package">
                <Icon name="star" size={15} />
                <span>Recommended Package</span>
              </div>

              <div className="package-card-header">
                <div className="package-icon-wrap package-icon-enterprise" aria-hidden="true">
                  <Icon name="crown" size={26} />
                </div>
                <div className="package-title-group">
                  <span className="package-tier-label enterprise-tier-label">Large &amp; Growing</span>
                  <h3 className="package-title">Enterprise Package</h3>
                </div>
              </div>

              <p className="package-tagline">
                Best for large businesses &amp; growing companies
              </p>

              <div className="package-pricing-box enterprise-pricing-box">
                <div className="package-price-row">
                  <span className="package-price-currency">⚡</span>
                  <span className="package-price-amount">Custom Scale</span>
                </div>
                <span className="package-price-sub">Custom engineered for high performance &amp; scalability</span>
              </div>

              <div className="package-divider enterprise-divider" />

              <div className="package-features-block">
                <h4 className="package-features-title">Enterprise Features:</h4>
                <ul className="package-features-list">
                  {enterpriseFeatures.map((feat, idx) => (
                    <li key={idx} className="package-feature-item enterprise-feature-item">
                      <span className="package-check-icon enterprise-check-icon">
                        <Icon name="check" size={16} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-cta-wrap">
                <div className="package-cta-buttons">
                  <Link
                    to="/quote?package=enterprise"
                    className="button button-package button-package-enterprise"
                    aria-label="Get Started with Enterprise Package"
                  >
                    <span>Get Started</span>
                    <Icon name="arrow" size={17} />
                  </Link>
                  <Link
                    to="/packages/details?package=enterprise#package-specs"
                    className="button button-package-more-info button-package-more-info-enterprise"
                    aria-label="More Information about Enterprise Package"
                  >
                    <span>More Information</span>
                    <Icon name="info" size={16} />
                  </Link>
                </div>
                <span className="package-guarantee-note">
                  Dedicated assistance &bull; Premium SLA &amp; support
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Value Trust Band */}
        <div className="packages-trust-band">
          <div className="trust-item">
            <Icon name="shield" size={20} />
            <div>
              <strong>Certified NZ Components</strong>
              <span>Tier-1 solar panels &amp; commercial inverters</span>
            </div>
          </div>
          <div className="trust-item">
            <Icon name="wrench" size={20} />
            <div>
              <strong>Expert NZ Installation</strong>
              <span>Master electricians with complete compliance guarantee</span>
            </div>
          </div>
          <div className="trust-item">
            <Icon name="battery" size={20} />
            <div>
              <strong>Scalable Architecture</strong>
              <span>Expand generation and add battery storage anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
