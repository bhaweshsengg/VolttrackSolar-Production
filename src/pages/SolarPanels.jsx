import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const features = [
  {
    icon: 'sun',
    title: 'N-Type TOPCon Cell Architecture',
    desc: 'Higher power output per square metre with superior temperature coefficients that maintain high yield on hot summer afternoons across New Zealand.'
  },
  {
    icon: 'layers',
    title: 'Dual-Glass Bifacial Generation',
    desc: 'Captures direct sunlight from the front and reflected ambient light from the rear, increasing overall energy generation by up to 15–25%.'
  },
  {
    icon: 'shield',
    title: 'NZ Marine & Salt-Mist Certified (IEC 61701)',
    desc: 'Certified to withstand coastal Cook Strait salt spray, maritime humidity, and intense UV radiation across Greater Wellington.'
  },
  {
    icon: 'check',
    title: '25-Year Product & 30-Year Performance',
    desc: 'Guaranteed minimum 87.4% linear power generation at year 30, supported by local New Zealand warranty backing.'
  }
];

const specs = [
  ['Rated Module Wattage', '440W – 620W+ Tier-1 Modules'],
  ['Peak Conversion Efficiency', '22.8% TOPCon Efficiency'],
  ['Cell Technology', 'Mono-crystalline N-Type TOPCon / Bifacial'],
  ['Mechanical Wind Load', 'Up to 5400 Pa Front / 2400 Pa Rear (Wellington Extra High Wind Zones)'],
  ['Corrosion Resistance', 'IEC 61701 Salt Mist (Severity 6) & IEC 62716 Ammonia'],
  ['Degradation Rate', '≤ 1.0% First Year, ≤ 0.4% Annual Degradation'],
  ['Frame Construction', 'Anodized Marine-Grade Aluminium (All-Black or Silver)']
];

export default function SolarPanels() {
  return (
    <>
      <PageHero
        eyebrow="Product • Generation"
        title="Efficient Solar Panels"
        text="Tier-1 high-efficiency monocrystalline and bifacial solar panels engineered for maximum generation in New Zealand climate conditions."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Cutting-Edge PV Technology"
            title="Smarter Generation From Every Sunbeam"
            text="Our panels are selected from BloombergNEF Tier-1 certified global leaders, delivering industry-leading reliability, aesthetic appeal, and long-term yield."
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

      {/* Specifications Table Section */}
      <section className="section section-light">
        <div className="container split-grid">
          <ScrollReveal>
            <div>
              <span className="eyebrow">Engineering Specifications</span>
              <h2>Built to endure the Greater Wellington Region’s toughest environments.</h2>
              <p>Whether you require sleek all-black rooftop panels for a modern home or heavy-duty bifacial arrays for commercial properties across Wellington, our panels deliver dependable output in all weather conditions.</p>

              <div className="table-responsive" style={{ marginTop: '24px' }}>
                <table className="comparison-table">
                  <tbody>
                    {specs.map(([label, val], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td style={{ fontWeight: '700', width: '45%' }}>{label}</td>
                        <td style={{ color: 'var(--primary)', fontWeight: '600' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="image-card">
              <img src="/images/img/carousel-1.jpg" alt="Efficient solar panels installed on modern roof" />
              <div className="image-badge">
                <strong>Up to 22.8% Efficiency</strong>
                <span>Maximum energy harvest</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Upgrade Your Energy</span>
            <h2>Ready to see how many panels fit your roof?</h2>
            <p>Get a customized satellite roof assessment, generation forecast, and pricing estimate today.</p>
          </div>
          <Link to="/quote?product=Efficient%20Solar%20Panels" className="button button-yellow">
            Request Panel Quotation <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
