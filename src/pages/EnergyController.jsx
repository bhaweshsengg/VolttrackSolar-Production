import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const capabilities = [
  {
    icon: 'cpu',
    title: 'Hot Water Solar Diverter',
    desc: 'Continuously monitors excess solar generation and automatically modulates power into your hot water cylinder element, turning your water heater into a thermal thermal battery for free.'
  },
  {
    icon: 'zap',
    title: 'Dynamic Peak Shaving',
    desc: 'Prevents commercial demand charges and domestic tariff spikes by intelligently controlling heavy loads like machinery, HVAC, and pumps during peak utility price windows.'
  },
  {
    icon: 'rocket',
    title: 'Solar EV Charging Synchronization',
    desc: 'Coordinates your EV charging station to absorb 100% green solar surplus, ensuring you drive on pure sunshine without drawing costly power from the utility grid.'
  },
  {
    icon: 'shield',
    title: 'NZ Grid Export Limitation',
    desc: 'Fulfils strict local electricity network (Lines Company) export limits with rapid, fail-safe power throttle response, preventing network overvoltage penalties.'
  }
];

const technicalDetails = [
  ['Control Topology', 'High-frequency solid-state TRIAC / PWM modulation'],
  ['Sampling Frequency', '100 Hz high-speed CT current sensor monitoring'],
  ['Load Channels', 'Up to 3 prioritized relay/resistive output circuits'],
  ['Grid Compliance', 'AS/NZS 4777.2 export limitation & zero-injection certified'],
  ['Wireless Connectivity', 'Wi-Fi 802.11 b/g/n, Zigbee 3.0 & Bluetooth 5.0'],
  ['Response Time', '< 50ms dynamic surplus power tracking']
];

export default function EnergyController() {
  return (
    <>
      <PageHero
        eyebrow="Main Menu • Smart Power Management"
        title="Energy Controller"
        text="Intelligent power dispatch that directs every surplus watt of solar electricity into your hot water, heating, and vehicle charging before sending it to the grid."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Maximum Self-Consumption"
            title="Smarter Energy Dispatch for Kiwi Properties"
            text="Why sell your solar energy to retailers at low buyback rates when you can redirect it to eliminate your highest power expenses automatically?"
          />

          <div className="service-grid service-grid-large">
            {capabilities.map((c, i) => (
              <ScrollReveal key={i}>
                <article className="service-card service-card-large">
                  <div className="service-icon"><Icon name={c.icon} /></div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="section section-light">
        <div className="container split-grid">
          <ScrollReveal>
            <div>
              <span className="eyebrow">Load Management Technology</span>
              <h2>Automated efficiency without altering your lifestyle.</h2>
              <p>The VoltTrack Energy Controller works quietly in the background. It samples your grid connection hundreds of times every second, adjusting resistive loads in real-time to match fluctuating solar generation.</p>
              
              <div className="table-responsive" style={{ marginTop: '24px' }}>
                <table className="comparison-table">
                  <tbody>
                    {technicalDetails.map(([spec, detail], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td style={{ fontWeight: '700', width: '45%' }}>{spec}</td>
                        <td style={{ color: 'var(--primary)', fontWeight: '600' }}>{detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="image-card">
              <img src="/images/img/feature.jpg" alt="Smart solar energy controller installed in building" />
              <div className="image-badge">
                <strong>Up to 40% Extra Savings</strong>
                <span>By redirecting surplus solar</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Smart Energy Control</span>
            <h2>Optimize your solar self-consumption today.</h2>
            <p>Our specialists can retrofit an intelligent Energy Controller to your existing or new solar power installation.</p>
          </div>
          <Link to="/quote?item=Energy%20Controller" className="button button-yellow">
            Enquire About Energy Controller <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
