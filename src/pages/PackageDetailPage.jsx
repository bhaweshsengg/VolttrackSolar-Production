import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';
import { packagesData } from '../data/packagesData';

export default function PackageDetailPage({ packageKey }) {
  const location = useLocation();
  const pkg = packagesData[packageKey] || packagesData['residential-starter'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Find related packages
  const allPackages = Object.values(packagesData);
  const sameCategory = allPackages.filter(p => p.category === pkg.category && p.id !== pkg.id);
  const otherCategory = allPackages.filter(p => p.category !== pkg.category);

  return (
    <>
      <PageHero
        eyebrow={`Our Packages • ${pkg.categoryLabel}`}
        title={pkg.fullTitle}
        text={pkg.tagline}
      />

      <section className="section package-page-detail-section">
        <div className="container">
          {/* Top Bar with Breadcrumb and Badges */}
          <div className="package-page-top-bar">
            <Link to="/packages" className="back-link">
              <span className="back-arrow">&larr;</span> Back to All Packages
            </Link>
            <div className="package-page-quick-tags">
              <span className="tag-pill category-tag-pill">
                <Icon name={pkg.category === 'residential' ? 'home' : 'building'} size={14} />
                {pkg.categoryLabel}
              </span>
              <span className="tag-pill tier-tag-pill">
                <Icon name="star" size={14} />
                {pkg.tier} Tier
              </span>
              <span className="tag-pill warranty-tag-pill">
                <Icon name="shield" size={14} />
                {pkg.warranty}
              </span>
            </div>
          </div>

          {/* Key Metrics Highlight Card */}
          <div className="package-hero-metrics-card">
            <div className="package-metrics-header">
              <span className="package-metrics-badge">{pkg.badge}</span>
              <h2>Key System Highlights</h2>
              <p>{pkg.targetAudience}</p>
            </div>

            <div className="package-metrics-grid">
              <div className="metric-box">
                <span className="metric-val">{pkg.capacity}</span>
                <span className="metric-lbl">Array Sizing</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">{pkg.inverter}</span>
                <span className="metric-lbl">Inverter Architecture</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">{pkg.battery}</span>
                <span className="metric-lbl">Energy Storage Ready</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">{pkg.estGeneration}</span>
                <span className="metric-lbl">Estimated Annual Output</span>
              </div>
            </div>

            <div className="package-metrics-cta">
              <Link to={`/quote?package=${pkg.quoteSlug}`} className="button button-yellow">
                Request Free Package Quote <Icon name="arrow" size={17} />
              </Link>
              <Link to="/packages#packages-comparison" className="button button-light">
                Compare All Packages
              </Link>
            </div>
          </div>

          {/* Included Hardware Grid */}
          <div className="package-hardware-section">
            <SectionHeading
              align="left"
              eyebrow="Hardware &amp; Equipment"
              title="What is Included in This Package"
              text="Engineered with Tier-1 components, cyclone-rated mounting systems, and master electrical installation."
            />

            <div className="package-hardware-grid">
              {pkg.hardware.map((item, idx) => (
                <ScrollReveal key={idx}>
                  <div className="hardware-card">
                    <div className="hardware-icon-wrap">
                      <Icon name={item.icon || 'sun'} size={24} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Key Features & Benefits Split */}
          <div className="package-benefits-section">
            <div className="split-grid">
              <div className="package-features-card">
                <h3 className="section-sub-title">
                  <Icon name="check" size={20} /> Package Inclusions
                </h3>
                <ul className="package-inclusions-list">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feature-check"><Icon name="check" size={15} /></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-outcomes-card">
                <h3 className="section-sub-title">
                  <Icon name="rocket" size={20} /> Why Choose This Package
                </h3>
                <ul className="package-outcomes-list">
                  {pkg.benefits.map((ben, idx) => (
                    <li key={idx}>
                      <span className="outcome-icon"><Icon name="star" size={15} /></span>
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-roi-box">
                  <Icon name="sun" size={20} />
                  <div>
                    <strong>Designed for New Zealand Conditions</strong>
                    <span>Complies fully with AS/NZS 3000 &amp; 4777.2 wiring rules. Official COC &amp; ROI provided on handover.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="package-specs-table-section">
            <SectionHeading
              align="center"
              eyebrow="Technical Data"
              title="Detailed Specifications Breakdown"
              text="Full technical attributes, compliance standards, and warranty assurances."
            />

            <div className="table-responsive">
              <table className="package-data-table">
                <tbody>
                  {pkg.specs.map(([label, val], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td className="data-table-label"><strong>{label}</strong></td>
                      <td className="data-table-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Related / Alternative Packages */}
          <div className="package-related-section">
            <div className="package-related-header">
              <h3>Explore Other {pkg.categoryLabel} Packages</h3>
              <p>Compare alternative capacities or discuss customized scaling with our solar team.</p>
            </div>

            <div className="package-related-grid">
              {sameCategory.map((rel) => (
                <Link to={rel.path} key={rel.id} className="related-pkg-card">
                  <div className="related-pkg-header">
                    <span className="related-tier">{rel.tier}</span>
                    <h4>{rel.title}</h4>
                  </div>
                  <p>{rel.tagline}</p>
                  <div className="related-pkg-footer">
                    <span>{rel.capacity}</span>
                    <span className="related-arrow">&rarr;</span>
                  </div>
                </Link>
              ))}
              {otherCategory.slice(0, 1).map((oth) => (
                <Link to={oth.path} key={oth.id} className="related-pkg-card related-other-category">
                  <div className="related-pkg-header">
                    <span className="related-tier">{oth.categoryLabel}</span>
                    <h4>{oth.fullTitle}</h4>
                  </div>
                  <p>{oth.tagline}</p>
                  <div className="related-pkg-footer">
                    <span>{oth.capacity}</span>
                    <span className="related-arrow">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="package-bottom-cta-banner">
            <div className="container split-grid">
              <div>
                <span className="eyebrow yellow">Ready for Solar?</span>
                <h2>Get a tailored quote for the {pkg.title}.</h2>
                <p>
                  Our engineers assess your roof pitch, shading, and local network lines company requirements 
                  to ensure maximum clean energy harvest and rapid financial return.
                </p>
              </div>
              <div className="package-bottom-cta-actions">
                <Link to={`/quote?package=${pkg.quoteSlug}`} className="button button-yellow">
                  Request Free Quote <Icon name="arrow" size={17} />
                </Link>
                <Link to="/contact" className="button button-light">
                  Speak With An Engineer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
