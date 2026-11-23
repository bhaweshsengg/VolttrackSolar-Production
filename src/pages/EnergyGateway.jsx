import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const gatewayFeatures = [
  {
    icon: 'wifi',
    title: 'Multi-Protocol Telemetry Hub',
    desc: 'Unifies inverters, battery BMS systems, sub-meters, and grid monitors via Modbus TCP/RTU, RS485, and Ethernet into a single encrypted cloud stream.'
  },
  {
    icon: 'design',
    title: 'Revenue-Grade Class 0.5 Metering',
    desc: 'Certified high-precision bi-directional electrical metering captures instantaneous voltage, current, power factor, and harmonic distortion.'
  },
  {
    icon: 'shield',
    title: '4G Cellular Redundancy Backup',
    desc: 'Dual-path connectivity ensures your solar generation data, system alerts, and remote inverter commands stay online even during broadband internet failures.'
  },
  {
    icon: 'wrench',
    title: 'Predictive Diagnostics & OTA Updates',
    desc: 'Continuous cloud telemetry algorithms detect degradation, string dropouts, and grid fluctuations early, dispatching instant maintenance notifications.'
  }
];

const specs = [
  ['Communication Ports', '2x RS485, 1x Ethernet 10/100, 1x CAN Bus'],
  ['Wireless Protocols', '4G LTE Cat-M1 / NB-IoT with 2G fallback, Wi-Fi 2.4GHz'],
  ['Supported Protocols', 'Modbus RTU/TCP, SunSpec, MQTT, OCPP 1.6J, REST API'],
  ['Data Storage Buffer', '32GB non-volatile flash (retains 12+ months offline data)'],
  ['Power Consumption', '< 5W operating power with 12V DC input'],
  ['Security Encryption', 'TLS 1.3, AES-256 data payload encryption, secure boot']
];

export default function EnergyGateway() {
  return (
    <>
      <PageHero
        eyebrow="Main Menu • Telemetry &amp; Cloud Intelligence"
        title="Energy Gateway"
        text="The central communications and telemetry hub that connects, monitors, and optimizes your entire solar, storage, and building electrical assets."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Enterprise Telemetry"
            title="Complete Visibility Over Every Kilowatt"
            text="Gain total operational insight with real-time generation data, consumption analytics, and remote system management from any device, anywhere."
          />

          <div className="service-grid service-grid-large">
            {gatewayFeatures.map((g, i) => (
              <ScrollReveal key={i}>
                <article className="service-card service-card-large">
                  <div className="service-icon"><Icon name={g.icon} /></div>
                  <h3>{g.title}</h3>
                  <p>{g.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture & Specs */}
      <section className="section section-light">
        <div className="container split-grid reverse">
          <ScrollReveal>
            <div>
              <span className="eyebrow">Enterprise Connectivity</span>
              <h2>Engineered for commercial resilience and seamless BMS integration.</h2>
              <p>The VoltTrack Energy Gateway bridges field hardware with modern cloud dashboards. Whether managing a single rooftop or a multi-site portfolio, enjoy seamless API access and automated reporting.</p>

              <div className="table-responsive" style={{ marginTop: '24px' }}>
                <table className="comparison-table">
                  <tbody>
                    {specs.map(([k, v], idx) => (
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

          <ScrollReveal>
            <div className="image-card">
              <img src="/images/img/img-600x400-2.jpg" alt="Commercial solar energy gateway deployment" />
              <div className="image-badge">
                <strong>Real-Time Cloud Telemetry</strong>
                <span>Instant alerts &amp; analytics</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Deploy Telemetry</span>
            <h2>Empower your facility with the VoltTrack Energy Gateway.</h2>
            <p>Speak to our technical solutions team for API integration, commercial gateways, and custom SCADA setups.</p>
          </div>
          <Link to="/quote?item=Energy%20Gateway" className="button button-yellow">
            Enquire About Energy Gateway <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
