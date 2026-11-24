import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';
import { packagesData } from '../data/packagesData';

export default function PackagesSection({
  showHeading = true,
  title = "Our Packages",
  subtitle = "Choose the right solar power package for your home or business. Explore our Residential Solar and Enterprise solutions."
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'residential' | 'enterprise'

  const allPackages = Object.values(packagesData);
  const displayedPackages = filter === 'all' 
    ? allPackages 
    : allPackages.filter(p => p.category === filter);

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

        {/* Category Tabs: All, Residential Solar, Enterprise */}
        <div className="packages-category-tabs">
          <button
            className={`pkg-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span>All Packages (5)</span>
          </button>
          <button
            className={`pkg-tab-btn ${filter === 'residential' ? 'active' : ''}`}
            onClick={() => setFilter('residential')}
          >
            <Icon name="home" size={15} />
            <span>Residential Solar (2)</span>
          </button>
          <button
            className={`pkg-tab-btn ${filter === 'enterprise' ? 'active' : ''}`}
            onClick={() => setFilter('enterprise')}
          >
            <Icon name="building" size={15} />
            <span>Enterprise (3)</span>
          </button>
        </div>

        <div className="packages-grid packages-grid-multi">
          {displayedPackages.map((pkg) => {
            const isRecommended = pkg.tier === 'Comprehensive' || pkg.id === 'residential-comprehensive';
            const iconName = pkg.category === 'residential' 
              ? (pkg.tier === 'Comprehensive' ? 'star' : 'sun')
              : (pkg.tier === 'Comprehensive' ? 'crown' : (pkg.tier === 'Full' ? 'layers' : 'zap'));

            return (
              <ScrollReveal key={pkg.id}>
                <div 
                  className={`package-card ${pkg.category === 'enterprise' ? 'package-card-enterprise' : 'package-card-residential'} ${isRecommended ? 'package-recommended' : ''}`}
                  id={pkg.id}
                >
                  {isRecommended && (
                    <div className="recommended-badge" aria-label="Recommended Solution">
                      <Icon name="star" size={14} />
                      <span>Recommended Solution</span>
                    </div>
                  )}

                  <div className="package-card-header">
                    <div className={`package-icon-wrap ${pkg.category === 'enterprise' ? 'package-icon-enterprise' : 'package-icon-small'}`} aria-hidden="true">
                      <Icon name={iconName} size={24} />
                    </div>
                    <div className="package-title-group">
                      <span className="package-tier-label">{pkg.categoryLabel} • {pkg.tier}</span>
                      <h3 className="package-title">{pkg.title}</h3>
                    </div>
                  </div>

                  <p className="package-tagline">{pkg.tagline}</p>

                  <div className={`package-pricing-box ${pkg.category === 'enterprise' ? 'enterprise-pricing-box' : ''}`}>
                    <div className="package-price-row">
                      <span className="package-price-amount">{pkg.capacity}</span>
                    </div>
                    <span className="package-price-sub">{pkg.inverter} • {pkg.battery}</span>
                  </div>

                  <div className="package-divider" />

                  <div className="package-features-block">
                    <h4 className="package-features-title">Package Features:</h4>
                    <ul className="package-features-list">
                      {pkg.features.slice(0, 5).map((feat, idx) => (
                        <li key={idx} className="package-feature-item">
                          <span className={`package-check-icon ${pkg.category === 'enterprise' ? 'enterprise-check-icon' : ''}`}>
                            <Icon name="check" size={15} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="package-cta-wrap">
                    <div className="package-cta-buttons">
                      <Link
                        to={`/quote?package=${pkg.quoteSlug}`}
                        className={`button button-package ${pkg.category === 'enterprise' ? 'button-package-enterprise' : 'button-package-small'}`}
                        aria-label={`Get Started with ${pkg.fullTitle}`}
                      >
                        <span>Get Started</span>
                        <Icon name="arrow" size={17} />
                      </Link>
                      <Link
                        to={pkg.path}
                        className={`button button-package-more-info ${pkg.category === 'enterprise' ? 'button-package-more-info-enterprise' : ''}`}
                        aria-label={`More Information about ${pkg.fullTitle}`}
                      >
                        <span>More Information</span>
                        <Icon name="info" size={16} />
                      </Link>
                    </div>
                    <span className="package-guarantee-note">
                      NZ Master Electricians &bull; {pkg.warranty}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Trust Badges Band */}
        <div className="packages-trust-band">
          <div className="trust-item">
            <Icon name="shield" size={20} />
            <div>
              <strong>Certified NZ Components</strong>
              <span>Tier-1 solar panels &amp; commercial inverters</span>
            </div>
          </div>
          <div className="trust-item">
            <Icon name="award" size={20} />
            <div>
              <strong>Master Electricians</strong>
              <span>AS/NZS 3000, 4777, 5033, 5139 compliance</span>
            </div>
          </div>
          <div className="trust-item">
            <Icon name="sun" size={20} />
            <div>
              <strong>25-Year Warranties</strong>
              <span>Guaranteed long-term solar yield</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
