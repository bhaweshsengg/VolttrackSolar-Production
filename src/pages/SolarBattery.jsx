import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const features = [
  {
    icon: 'shield',
    title: 'Cobalt-Free LiFePO4 Chemistry',
    desc: 'Lithium Iron Phosphate cells offer the highest thermal stability and chemical safety on the market, eliminating thermal runaway risks.'
  },
  {
    icon: 'battery',
    title: 'Modular Plug-and-Play Expansion',
    desc: 'Start with a 5.12kWh battery module and expand in increments up to 100kWh+ as your energy demands, EV charging, or facility grows.'
  },
  {
    icon: 'sun',
    title: '6,000+ Cycles at 90% DoD',
    desc: 'Engineered for over 15 years of daily cycling with high 90% Depth of Discharge, maximizing usable capacity and ROI.'
  },
  {
    icon: 'zap',
    title: 'Automatic Blackout Islanding',
    desc: 'Detects grid outages instantly and continues powering your essential loads seamlessly, completely independent of the utility network.'
  }
];

const batterySpecs = [
  ['Cell Chemistry', 'Lithium Iron Phosphate (LiFePO4)'],
  ['Base Module Capacity', '5.12 kWh / 100Ah per module'],
  ['System Scalability', 'Stackable up to 16 modules in parallel (81.9 kWh+)'],
  ['Round-Trip Efficiency', '≥ 95.5%'],
  ['Cycle Life Expectancy', '6,000+ cycles @ 90% DoD (approx. 16+ years)'],
  ['Operating Temperature', '-10°C to +55°C (integrated intelligent BMS heating)'],
  ['Certifications', 'IEC 62619, UL 1973, UN 38.3, AS/NZS 5139 compliant']
];

export default function SolarBattery() {
  return (
    <>
      <PageHero
        eyebrow="Product • Storage"
        title="Modular Solar Battery"
        text="High-safety, stackable Lithium Iron Phosphate (LiFePO4) solar battery storage systems designed to store your sunshine and protect against power outages."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Energy Independence"
            title="Power Your Property Day &amp; Night"
            text="Store surplus daytime solar electricity rather than exporting it for pennies. Use your stored clean power when power companies charge peak evening tariffs."
          />

          <div className="service-grid service-grid-large">
            {features.map((f, i) => (
              <ScrollReveal key={i}>
                <article className="service-card service-card-large">
                  <div className="service-icon"><Icon name={f.icon} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Battery Technology Section */}
      <section className="section section-light">
        <div className="container split-grid">
          <ScrollReveal>
            <div className="image-card">
              <img src="/images/img/carousel-2.jpg" alt="Modular solar battery storage installation" />
              <div className="image-badge">
                <strong>Modular Scalability</strong>
                <span>5.12kWh to 100kWh+</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="eyebrow">Technical Architecture</span>
              <h2>Intelligent Battery Management for Kiwi Properties</h2>
              <p>Each module features an active Battery Management System (BMS) that monitors cell voltages, temperatures, and state-of-charge, ensuring safe, balanced, and durable performance.</p>

              <div className="table-responsive" style={{ marginTop: '24px' }}>
                <table className="comparison-table">
                  <tbody>
                    {batterySpecs.map(([k, v], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td style={{ fontWeight: '700', width: '45%' }}>{k}</td>
                        <td style={{ color: 'var(--primary)', fontWeight: '600' }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Calculate Battery ROI</span>
            <h2>Find out how much you can save with solar battery storage.</h2>
            <p>Our team models your historical power bills and solar potential to provide a clear battery payback breakdown.</p>
          </div>
          <Link to="/quote?product=Modular%20Solar%20Battery" className="button button-yellow">
            Request Battery Proposal <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
