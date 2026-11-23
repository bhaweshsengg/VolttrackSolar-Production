import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const features = [
  {
    icon: 'zap',
    title: 'Dual Solar & Battery Conversion',
    desc: 'Combines solar array management and battery inverter/charger into one compact, high-efficiency unit, reducing installation complexity and electrical losses.'
  },
  {
    icon: 'battery',
    title: 'Millisecond Emergency UPS Backup',
    desc: 'Seamlessly powers critical circuits during grid power cuts in under 10ms, keeping your computers, refrigeration, internet, and security active.'
  },
  {
    icon: 'design',
    title: 'Multiple Independent MPPT Trackers',
    desc: 'Optimizes generation across multiple roof pitches and orientations, ensuring maximum output even if partial shade affects one section of panels.'
  },
  {
    icon: 'shield',
    title: 'IP65 Rated for Outdoor Durability',
    desc: 'Fanless natural convection cooling, whisper-quiet operation (<25dB), and sealed all-weather casing designed for direct outdoor mounting in NZ.'
  }
];

const inverterModels = [
  ['Residential Single-Phase', '3.6kW – 8.0kW', '2 MPPTs', '5.12–20kWh Battery Ready', 'Ideal for Kiwi suburban homes'],
  ['Commercial Three-Phase', '10kW – 30kW', '3–4 MPPTs', 'High-Voltage Battery Ready', 'Perfect for workshops, retail & small businesses'],
  ['Industrial Three-Phase', '50kW – 100kW+', '6+ MPPTs', 'Commercial Scalable ESS', 'High-capacity industrial operations & factories']
];

export default function HybridInverters() {
  return (
    <>
      <PageHero
        eyebrow="Product • Inversion"
        title="Hybrid Inverters"
        text="Intelligent single-phase and three-phase hybrid inverters that unite solar generation, battery storage, and smart grid interaction into a unified power centre."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Smart Power Conversion"
            title="The Brain of Your Solar & Storage System"
            text="Designed with advanced silicon and intelligent firmware to convert DC power with 98.6% peak efficiency while coordinating your home or business power flows."
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

      {/* Model Overview Section */}
      <section className="section section-light">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Product Range"
            title="Sized For Homes, Commercial Sites & Rural Properties"
            text="Choose between single-phase and heavy-duty three-phase models with integrated DC disconnects and rapid-shutdown compliance."
          />

          <ScrollReveal>
            <div className="table-responsive">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Inverter Model</th>
                    <th>Continuous AC Output</th>
                    <th>MPPT Channels</th>
                    <th>Battery Compatibility</th>
                    <th>Best Suited Application</th>
                  </tr>
                </thead>
                <tbody>
                  {inverterModels.map(([model, power, mppt, bat, app], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td><strong>{model}</strong></td>
                      <td style={{ color: 'var(--primary)', fontWeight: '700' }}>{power}</td>
                      <td>{mppt}</td>
                      <td>{bat}</td>
                      <td>{app}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Smart System Sizing</span>
            <h2>Need help choosing the right hybrid inverter capacity?</h2>
            <p>Our engineers calculate your exact peak electrical demands and future storage goals to specify the ideal inverter model.</p>
          </div>
          <Link to="/quote?product=Hybrid%20Inverters" className="button button-yellow">
            Consult Inverter Specialists <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
