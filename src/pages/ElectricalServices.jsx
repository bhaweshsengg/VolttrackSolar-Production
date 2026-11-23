import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const electricalServices = [
  {
    icon: 'wrench',
    title: 'Switchboard Upgrades & Modernisation',
    desc: 'Replace outdated ceramic fuses with modern RCBO circuit breakers, surge arrestors, and clean distribution boards configured for solar and battery storage.'
  },
  {
    icon: 'building',
    title: 'Commercial 3-Phase Power Upgrades',
    desc: 'Phase balancing, sub-main sizing, and capacity enhancements for commercial workshops, retail facilities, and industrial warehouses across New Zealand.'
  },
  {
    icon: 'rocket',
    title: 'Dedicated EV Charger Installations',
    desc: 'Safe, high-amperage dedicated electrical circuits for Type 2 AC wallboxes and fast DC chargers for residential driveways and commercial fleet parking.'
  },
  {
    icon: 'shield',
    title: 'Backup Generator & ATS Switching',
    desc: 'Automatic and manual Transfer Switches (ATS) allowing your building to run seamlessly off emergency generators or battery backup during extended grid outages.'
  },
  {
    icon: 'design',
    title: 'Sub-Metering & Power Factor Correction',
    desc: 'Granular sub-circuit metering for tenant billing and commercial power factor correction capacitors to eliminate utility network penalty charges.'
  },
  {
    icon: 'check',
    title: 'Certificates of Verification (COV)',
    desc: 'Full regulatory testing, safety compliance inspection, and official Electrical Safety Certificates (ESC) issued by registered NZ master electricians.'
  }
];

export default function ElectricalServices() {
  return (
    <>
      <PageHero
        eyebrow="Services • Master Electricians"
        title="Electrical Services"
        text="Comprehensive residential and commercial electrical contracting, switchboard modernization, and infrastructure upgrades tailored for clean energy systems."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Full-Spectrum Electrical"
            title="Safe, Certified Electrical Solutions"
            text="Whether preparing your switchboard for a new solar array or upgrading commercial power capacity, our licensed electricians ensure impeccable safety."
          />

          <div className="service-grid service-grid-large">
            {electricalServices.map((es, i) => (
              <ScrollReveal key={i}>
                <article className="service-card service-card-large">
                  <div className="service-icon"><Icon name={es.icon} /></div>
                  <h3>{es.title}</h3>
                  <p>{es.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Compliance Section */}
      <section className="section section-light">
        <div className="container split-grid reverse">
          <ScrollReveal>
            <div>
              <span className="eyebrow">Professional Workmanship</span>
              <h2>Registered Master Electricians for Kiwi Properties</h2>
              <p>Modern clean energy systems require robust, compliant electrical foundations. We inspect and upgrade wiring, earthing systems, and switchboards to meet current AS/NZS 3000 standards.</p>
              
              <ul className="check-list" style={{ marginTop: '24px' }}>
                <li><Icon name="check" /> Full compliance with Electrical (Safety) Regulations</li>
                <li><Icon name="check" /> All work certified with Electrical Safety Certificates (ESC)</li>
                <li><Icon name="check" /> Seamless integration with solar, storage, and EV hardware</li>
                <li><Icon name="check" /> Clean, tidy, and minimally disruptive installations</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="image-card">
              <img src="/images/img/img-600x400-3.jpg" alt="Commercial electrical installation and switchboard upgrade" />
              <div className="image-badge">
                <strong>Certified Electrical Safety</strong>
                <span>Registered NZ Practitioners</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Electrical Consultation</span>
            <h2>Need an electrical upgrade or switchboard check?</h2>
            <p>Contact our licensed electrical team to discuss your project requirements today.</p>
          </div>
          <Link to="/quote?service=Electrical" className="button button-yellow">
            Enquire About Electrical Services <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
