import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const steps = [
  {
    step: '01',
    title: 'Site & Structural Assessment',
    desc: 'Our engineers evaluate roof condition, structural rafter load capacities, orientation, and local wind zones across New Zealand.'
  },
  {
    step: '02',
    title: 'Network Consenting & Approvals',
    desc: 'We manage full compliance with your local Lines Company (Vector, Powerco, Orion, etc.) and council requirements before commencing work.'
  },
  {
    step: '03',
    title: 'Certified Master Installation',
    desc: 'Registered electricians and solar installers mount arrays with marine-grade fasteners, watertight flashings, and precision wiring.'
  },
  {
    step: '04',
    title: 'Commissioning & COV Certification',
    desc: 'System testing, live grid synchronization, safety verification, and full handover documentation with Certificate of Verification (COV).'
  }
];

const standards = [
  'AS/NZS 5033: Installation and safety requirements for photovoltaic (PV) arrays',
  'AS/NZS 4777.2: Grid connection of energy systems via inverters',
  'AS/NZS 3000: Electrical Installations (Wiring Rules)',
  'NZ Building Code Compliant & high wind zone engineering certified'
];

export default function SolarInstallation() {
  return (
    <>
      <PageHero
        eyebrow="Services • Installation"
        title="Solar Installation"
        text="Turnkey solar installation services for New Zealand homes and businesses by registered electricians and certified solar engineers."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Our Installation Process"
            title="Dependable Craftsmanship From Assessment to Handover"
            text="We manage every phase of your solar installation so you enjoy a hassle-free transition to clean, affordable solar energy."
          />

          <div className="process-grid">
            {steps.map((s, i) => (
              <ScrollReveal key={i}>
                <article className="process-card">
                  <span>{s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Standards Section */}
      <section className="section section-light">
        <div className="container split-grid">
          <ScrollReveal>
            <div className="image-card">
              <img src="/images/img/about.jpg" alt="Solar panel installation team in New Zealand" />
              <div className="image-badge">
                <strong>Certified Master Electricians</strong>
                <span>Safety &amp; workmanship guaranteed</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="eyebrow">Strict Compliance Standards</span>
              <h2>Installed strictly to New Zealand safety &amp; electrical codes.</h2>
              <p>We do not take shortcuts. Every VoltTrack installation adheres to rigorous electrical safety standards, weather-tightness warranties, and structural load calculations.</p>
              
              <ul className="check-list" style={{ marginTop: '24px' }}>
                {standards.map((std, idx) => (
                  <li key={idx}><Icon name="check" /> {std}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Book An Installation</span>
            <h2>Ready to install solar on your home or commercial site?</h2>
            <p>Get in touch for a comprehensive site assessment and clear, transparent pricing.</p>
          </div>
          <Link to="/quote?service=Solar%20Installation" className="button button-yellow">
            Book Site Assessment <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
