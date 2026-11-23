import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import PackagesSection from '../components/PackagesSection';
import PackageDetailsContent from '../components/PackageDetailsContent';
import Icon from '../components/Icon';

const comparisonRows = [
  {
    feature: "Target Business",
    small: "Startups, small businesses & local offices",
    enterprise: "Large businesses, commercial facilities & growing companies"
  },
  {
    feature: "Pricing Model",
    small: "Affordable, transparent upfront or monthly",
    enterprise: "Custom solutions according to business needs"
  },
  {
    feature: "Setup & Onboarding",
    small: "Easy setup & streamlined grid connection",
    enterprise: "Custom engineering, load balancing & full commissioning"
  },
  {
    feature: "Customer Support",
    small: "Basic customer support & helpdesk",
    enterprise: "Premium priority support & dedicated assistance"
  },
  {
    feature: "Features & Tools",
    small: "Essential features & core solar monitoring tools",
    enterprise: "Advanced features, premium services & SCADA integrations"
  },
  {
    feature: "Analytics & Reporting",
    small: "Standard daily/monthly generation tracking",
    enterprise: "Advanced analytics, peak-shaving & customized reporting"
  },
  {
    feature: "Scalability",
    small: "Flexible modular expansions as needed",
    enterprise: "High performance & enterprise-grade scalability"
  }
];

const faqs = [
  {
    q: "How do I choose between the Small Package and the Enterprise Package?",
    a: "The Small Package is ideal for startups, boutique shops, and smaller commercial premises looking for an affordable, straightforward solar setup. The Enterprise Package is tailored for high-energy operations, industrial buildings, or multi-location businesses requiring advanced analytics, dedicated engineering, and customized scalability."
  },
  {
    q: "Can our company start with the Small Package and upgrade later?",
    a: "Yes. All VoltTrackSolar packages are engineered with modular scalability. You can start with the Small Package and easily expand your capacity, upgrade inverters, or integrate enterprise storage solutions as your energy needs expand."
  },
  {
    q: "Are the Get Started requests free and non-binding?",
    a: "Yes, clicking 'Get Started' on either package allows you to submit your site details for a free, zero-obligation assessment and preliminary system sizing by our solar engineers."
  },
  {
    q: "What warranties are included with each package?",
    a: "Both packages include 25-year panel performance warranties, 10–15 year inverter warranties, and our comprehensive workmanship guarantee."
  }
];

export default function Packages() {
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      <PageHero
        eyebrow="Our Packages"
        title="Our Packages"
        text="Explore our Small and Enterprise commercial solar packages. Designed to provide transparent pricing, dependable performance, and maximum value for New Zealand businesses."
      />

      {/* Side-by-side Small and Enterprise packages on one standalone page */}
      <PackagesSection
        showHeading={true}
        title="Compare Our Packages"
        subtitle="Small and Enterprise solar solutions displayed side by side to help you make an informed decision."
      />

      {/* Comparison Section */}
      <section className="section section-light comparison-section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Feature Comparison"
            title="Side-by-Side Breakdown"
            text="Compare each package's key specifications, support levels, and technical features."
          />

          <ScrollReveal>
            <div className="table-responsive">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col" className="table-col-feature">Feature</th>
                    <th scope="col" className="table-col-small">
                      <div className="table-head-badge">Small</div>
                      <span className="table-head-title">Small Package</span>
                      <small>Startups &amp; Small Businesses</small>
                    </th>
                    <th scope="col" className="table-col-enterprise">
                      <div className="table-head-badge recommended-head-badge">Recommended</div>
                      <span className="table-head-title">Enterprise Package</span>
                      <small>Large Businesses &amp; Growing Companies</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td className="table-feature-name">
                        <strong>{row.feature}</strong>
                      </td>
                      <td className="table-small-val">
                        <div className="table-cell-content">
                          <span className="cell-check small-check"><Icon name="check" size={15}/></span>
                          <span>{row.small}</span>
                        </div>
                      </td>
                      <td className="table-enterprise-val">
                        <div className="table-cell-content">
                          <span className="cell-check enterprise-check"><Icon name="check" size={15}/></span>
                          <span>{row.enterprise}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td className="table-foot-cta">
                      <Link to="/quote?package=small" className="button button-package button-package-small">
                        Get Started <Icon name="arrow" size={16}/>
                      </Link>
                    </td>
                    <td className="table-foot-cta">
                      <Link to="/quote?package=enterprise" className="button button-package button-package-enterprise">
                        Get Started <Icon name="arrow" size={16}/>
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Detailed Package Information & Hardware Specifications Section */}
      <section className="section package-details-section" id="package-specs">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Detailed Package Information"
            title="Engineered With Premium Hardware &amp; Full NZ Compliance"
            text="Every VoltTrack package is built with Tier-1 components, cyclone-rated mounting systems, intelligent Sigenergy controllers, and certified electrical compliance."
          />
          <PackageDetailsContent />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="FAQs"
            title="Frequently Asked Questions"
            text="Answers to common questions about our Small and Enterprise packages."
          />

          <div className="faq-grid">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className={`faq-card ${openFaq === idx ? 'faq-card-open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <button
                  className="faq-question-btn"
                  aria-expanded={openFaq === idx}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className={`faq-toggle-icon ${openFaq === idx ? 'rotate' : ''}`}>
                    <Icon name="chevron-down" size={18} />
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="faq-answer-body">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Quote Band */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Ready to start?</span>
            <h2>Let’s find the right solar package for your property.</h2>
            <p>Speak with our New Zealand solar specialists for clear, straightforward guidance with zero obligation.</p>
          </div>
          <Link to="/quote" className="button button-yellow">
            Request A Free Quote <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
