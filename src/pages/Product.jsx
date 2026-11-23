import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const products = [
  {
    badge: "Generation",
    icon: "layers",
    title: "Efficient Solar Panels",
    spec: "440W – 620W N-Type TOPCon & Bifacial",
    desc: "Engineered for maximum power output in New Zealand weather conditions. Featuring anti-reflective glass, PID resistance, and superior low-light performance.",
    link: "/product/solar-panels",
    points: [
      "Up to 22.8% module efficiency",
      "25-year product & 30-year linear performance warranty",
      "High wind & snow load mechanical durability",
      "Salt-mist & ammonia certified for coastal NZ"
    ]
  },
  {
    badge: "Inversion",
    icon: "zap",
    title: "Hybrid Inverters",
    spec: "Single-Phase (3–8kW) & Three-Phase (10–100kW+)",
    desc: "Intelligent inverters that seamlessly convert DC energy into clean AC power with integrated MPPT trackers and fast switchover backup capabilities.",
    link: "/product/hybrid-inverters",
    points: [
      "98.6% peak conversion efficiency",
      "Multiple independent MPPT trackers",
      "Built-in DC isolator & surge protection (Type II)",
      "Smart cloud app & web portal remote diagnostics"
    ]
  },
  {
    badge: "Storage",
    icon: "battery",
    title: "Modular Solar Battery",
    spec: "5.12kWh to 100kWh+ Scalable Lithium Iron Phosphate (LiFePO4)",
    desc: "Store surplus daytime solar electricity to power your home or business during peak evening tariff hours and grid outages with maximum safety.",
    link: "/product/solar-battery",
    points: [
      "Ultra-safe Cobalt-free LiFePO4 chemistry",
      "6,000+ cycle life with 90% depth of discharge",
      "Modular stackable design for easy expansion",
      "Seamless UPS-grade emergency backup transition"
    ]
  },
  {
    badge: "Management",
    icon: "cpu",
    title: "Energy Controller",
    spec: "Automated Hot Water Diversion & Dynamic Peak Shaving",
    desc: "Intelligent load controller that automatically diverts excess daytime solar power into water heating, space heating, and EV chargers before exporting.",
    link: "/energy-controller",
    points: [
      "Dynamic hot water cylinder element modulation",
      "Peak demand shaving to prevent utility penalties",
      "Solar EV charging coordination",
      "AS/NZS 4777.2 export limit compliance"
    ]
  },
  {
    badge: "Telemetry",
    icon: "wifi",
    title: "Energy Gateway",
    spec: "Real-Time Telemetry & SCADA Cloud Integration",
    desc: "Comprehensive energy management hub that provides revenue-grade metering, multi-inverter communication, and encrypted cloud diagnostics.",
    link: "/energy-gateway",
    points: [
      "Class 0.5 revenue-grade electrical metering",
      "4G LTE cellular fallback redundancy",
      "Open API & Modbus connectivity for building management",
      "Instant fault alerts and predictive maintenance"
    ]
  },
  {
    badge: "Mounting",
    icon: "wrench",
    title: "Engineered Racking & Mounting Systems",
    spec: "NZ Building Code Compliant & AS/NZS 1170.2 Certified",
    desc: "Marine-grade anodized aluminium and stainless steel mounting hardware designed to withstand New Zealand's high wind zones and seismic requirements.",
    link: "/services/solar-installation",
    points: [
      "Suitable for corrugated iron, standing seam, tile, and flat roofs",
      "Non-penetrating clamp solutions for commercial roofs",
      "Marine-grade 6005-T5 aluminium & 304 stainless fasteners",
      "Pre-engineered structural documentation provided"
    ]
  }
];

export default function Product() {
  return (
    <>
      <PageHero
        eyebrow="Hardware &amp; Technology"
        title="High-Performance Solar Products"
        text="Discover our industry-certified solar panels, hybrid inverters, modular battery storage, and smart energy controllers engineered for Aotearoa New Zealand."
      />

      <section className="section product-catalog-section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Our Product Line"
            title="Clean Energy Hardware Engineered for Reliability"
            text="Every product we supply and install is sourced from BloombergNEF Tier-1 manufacturers, tested for New Zealand conditions, and backed by local support."
          />

          <div className="products-grid">
            {products.map((p, idx) => (
              <ScrollReveal key={idx}>
                <div className="product-card">
                  <div className="product-card-top">
                    <span className="product-badge">{p.badge}</span>
                    <div className="product-icon-circle">
                      <Icon name={p.icon} size={24} />
                    </div>
                  </div>

                  <h3 className="product-title">{p.title}</h3>
                  <div className="product-spec">{p.spec}</div>
                  <p className="product-desc">{p.desc}</p>

                  <div className="product-points-box">
                    <h4 className="product-points-heading">Highlights:</h4>
                    <ul className="product-points-list">
                      {p.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <span className="product-check-dot"><Icon name="check" size={14} /></span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-card-cta" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Link
                      to={p.link}
                      className="button button-package button-package-small"
                      style={{ flex: '1 1 auto', fontSize: '13px', padding: '10px 14px' }}
                    >
                      Learn More <Icon name="arrow" size={14} />
                    </Link>
                    <Link
                      to={`/quote?product=${encodeURIComponent(p.title)}`}
                      className="button button-primary"
                      style={{ fontSize: '13px', padding: '10px 14px' }}
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quality Standards Band */}
          <div className="product-quality-band">
            <div className="quality-item">
              <Icon name="shield" size={24} />
              <div>
                <strong>Tier-1 Certified Hardware</strong>
                <span>Only internationally certified, Tier-1 clean energy components</span>
              </div>
            </div>
            <div className="quality-item">
              <Icon name="sun" size={24} />
              <div>
                <strong>NZ Climate Proven</strong>
                <span>Tested for high UV, coastal marine salt spray, and alpine conditions</span>
              </div>
            </div>
            <div className="quality-item">
              <Icon name="wrench" size={24} />
              <div>
                <strong>Local Warranty &amp; Spares</strong>
                <span>Direct NZ warranty backing with local spare parts inventory</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Product Inquiries</span>
            <h2>Need technical datasheets or bulk commercial pricing?</h2>
            <p>Our engineering team can help you select the exact hardware specifications for your property or commercial project.</p>
          </div>
          <Link to="/quote" className="button button-yellow">
            Request Product Quotation <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
