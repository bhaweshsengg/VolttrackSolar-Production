import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PackageDetailsContent from '../components/PackageDetailsContent';
import Icon from '../components/Icon';

export default function PackageDetails({ defaultTab = "overview" }) {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scroll if present
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <PageHero
        eyebrow="Our Packages • Detailed Specifications"
        title="Detailed Package Information"
        text="A comprehensive breakdown of the Tier-1 hardware, cyclone-rated mounting systems, intelligent Sigenergy controllers, and certified electrical compliance included in our commercial solar packages."
      />

      <section className="section package-details-page-section">
        <div className="container">
          <div className="package-details-back-bar">
            <Link to="/packages" className="back-link">
              <span className="back-arrow">&larr;</span> Back to Packages Overview
            </Link>
            <div className="package-details-quick-tags">
              <span className="tag-pill"><Icon name="shield" size={14} /> AS/NZS Certified</span>
              <span className="tag-pill"><Icon name="sun" size={14} /> 8.67 kW Array</span>
              <span className="tag-pill"><Icon name="battery" size={14} /> 10kWh Battery Ready</span>
            </div>
          </div>

          <PackageDetailsContent />
        </div>
      </section>
    </>
  );
}
