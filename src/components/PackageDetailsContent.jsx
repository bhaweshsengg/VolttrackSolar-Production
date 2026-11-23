import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

const hardwareSpecs = [
  {
    number: "01",
    tag: "Solar Generation Array",
    title: "17 × Suntech 510W Solar Panels (or equivalent)",
    capacity: "8.67 kW Array Output",
    warranty: "25-Yr Product / 30-Yr Linear Performance",
    icon: "layers",
    highlight: "Ultra-High Yield Monocrystalline",
    description: "High-performance N-Type TOPCon monocrystalline modules delivering ~8.67 kW total DC capacity. Engineered with half-cut cell technology to maximize energy harvest during low-light Kiwi mornings, overcast afternoons, and partial roof shading.",
    points: [
      "17 high-output 510W modules generating ~11,000–13,000 kWh annually across New Zealand",
      "Anti-reflective, self-cleaning hydrophobic tempered glass resists sea spray & hail",
      "Superior low-temperature coefficient for high output even on hot summer afternoons",
      "Tier-1 BloombergNEF manufacturer with 30-year guaranteed 87.4% linear output"
    ]
  },
  {
    number: "02",
    tag: "Hybrid Inverter",
    title: "1 × Sigenergy EC SP6.0 6kW AC Inverter",
    capacity: "6.0 kW Continuous AC Output",
    warranty: "10-Year Full Manufacturer Warranty",
    icon: "zap",
    highlight: "Sigen Energy Controller Hybrid",
    description: "State-of-the-art hybrid inverter integrating high-efficiency solar conversion, battery energy storage management, and bi-directional EV charging interface into one sleek, fanless aluminium chassis.",
    points: [
      "Dual ultra-fast MPPT trackers with 99.0% peak European efficiency",
      "Built-in DC arc fault circuit interrupter (AFCI) and rapid shutdown protection",
      "Whisper-quiet natural convection cooling with zero fan noise (< 25 dB)",
      "Native bidirectional V2X charging architecture ready for vehicle-to-home power"
    ]
  },
  {
    number: "03",
    tag: "Energy Storage Ready",
    title: "10kWh Battery Ready System with 9.4kWh cycling capacity or 12kW EV Bidirectional capability",
    capacity: "9.4kWh Cycling / 12kW V2X",
    warranty: "10-Year / 6,000+ Cycle Life Warranty",
    icon: "battery",
    highlight: "Modular LiFePO4 Storage Architecture",
    description: "Future-proof power storage architecture. Pre-wired and configured for plug-and-play addition of modular 10kWh LiFePO4 battery modules (providing 9.4kWh true daily cycling depth of discharge) or direct connection to 12kW bi-directional electric vehicle DC charging.",
    points: [
      "9.4 kWh true usable daily cycling capacity with 100% depth-of-discharge tolerance",
      "12 kW bi-directional V2H / V2G power transfer capability using your EV's traction battery",
      "0 ms instantaneous UPS-class backup switchover during utility grid blackouts",
      "Safest LiFePO4 prismatic cell chemistry with integrated multi-layer thermal management"
    ]
  },
  {
    number: "04",
    tag: "Smart Sensor & Telemetry",
    title: "Sigenergy Power Sensor / Gateway",
    capacity: "Class 0.5 Revenue Metering",
    warranty: "Full System Warranty Integration",
    icon: "wifi",
    highlight: "Real-Time Telemetry & Grid Islanding",
    description: "High-precision intelligent telemetry hub and bidirectional current sensor that captures every milliwatt of solar generation, household consumption, and grid export with sub-second accuracy.",
    points: [
      "Certified Class 0.5 revenue-grade electrical metering for precise bill auditing",
      "Automated islanding contactor for safe, seamless microgrid blackout protection",
      "Instantaneous load management and dynamic phase balancing across all circuits",
      "Redundant 4G cellular and high-speed Wi-Fi telemetry to the mySigen cloud platform"
    ]
  },
  {
    number: "05",
    tag: "Roof Interface Hardware",
    title: "Non-penetrating metal tile roof brackets",
    capacity: "Zero Roof Penetrations",
    warranty: "15-Year Weatherproof Guarantee",
    icon: "shield",
    highlight: "Preserves Metal Tile Integrity",
    description: "Custom-engineered marine-grade clamping brackets designed specifically for pressed metal tile roofs (Gerard, Decra, Metrotile, Corona). Securely grips the structural tile battens without drilling holes through the tile surface.",
    points: [
      "100% non-penetrating mechanical clamp design prevents roof leaks and water ingress",
      "Protects and preserves your existing manufacturer roof warranty completely intact",
      "Heavy-duty extruded structural aluminium and 304/316 marine-grade stainless hardware",
      "Engineered specifically for New Zealand tile profiles and high seismic zones"
    ]
  },
  {
    number: "06",
    tag: "Mounting Racking",
    title: "Australian-made Clenergy S6 cyclone-rated mounting system",
    capacity: "AS/NZS 1170.2 Cyclone Rated",
    warranty: "25-Year Clenergy Racking Warranty",
    icon: "grid",
    highlight: "Engineered for Extreme NZ Wind Zones",
    description: "Premium Australian-made Clenergy SolarRoof S6 anodised aluminium racking system. Precision-certified to withstand New Zealand's harshest weather, from sub-tropical coastal gales to Alpine snow loads.",
    points: [
      "Compliant with AS/NZS 1170.2:2021 structural wind and cyclonic load standards",
      "High-grade 6005-T5 architectural anodised aluminium rails with stainless steel fasteners",
      "Engineered for New Zealand Wind Zones from Low and Medium up to Extra High & Specific Design",
      "Integrated grounding and earthing pins for permanent electrical continuity"
    ]
  },
  {
    number: "07",
    tag: "Workmanship & Safety",
    title: "Professional installation compliant with AS/NZS 3000, 4777, 5033 and 5139",
    capacity: "100% NZ Registered Electricians",
    warranty: "VoltTrack 10-Year Workmanship Warranty",
    icon: "award",
    highlight: "Master Standards Compliance",
    description: "Installed exclusively by licensed NZ Registered Electricians and SEANZ / Clean Energy Council accredited solar specialists. Every conduit run, isolator, and termination strictly adheres to all current New Zealand standards.",
    points: [
      "AS/NZS 3000:2018 — Electrical Installations (Wiring Rules) verification",
      "AS/NZS 4777.2:2020 — Grid connection of energy systems via inverters",
      "AS/NZS 5033:2021 — Photovoltaic (PV) arrays safety and installation compliance",
      "AS/NZS 5139:2019 — Electrical installations of battery energy storage systems (BESS)"
    ]
  },
  {
    number: "08",
    tag: "Official Certification",
    title: "COC and ROI certification",
    capacity: "Official NZ Energy Safety Sign-off",
    warranty: "Permanent Government Registry Record",
    icon: "check",
    highlight: "Full Legal Compliance & Peace of Mind",
    description: "Complete formal electrical compliance documentation supplied upon system handover. Includes full testing records, lines company grid connection consent, and official safety sign-offs required by insurers and banks.",
    points: [
      "Certificate of Compliance (COC) detailing all Prescribed Electrical Work (PEW)",
      "High-Risk Record of Inspection (ROI) certified by an independent electrical inspector",
      "Official submission to the New Zealand Energy Safety High-Risk Database",
      "Lines Company import/export consent and smart export meter commissioning documentation"
    ]
  }
];

export default function PackageDetailsContent({ selectedPackage = "small" }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="package-details-content-wrapper" id="package-specs">
      {/* Overview Banner */}
      <div className="package-specs-summary-card">
        <div className="package-specs-summary-header">
          <div className="specs-header-badge">
            <Icon name="sun" size={18} /> Premium Commercial &amp; Residential Hardware
          </div>
          <h2>Full System Specifications &amp; Technical Breakdown</h2>
          <p>
            Every VoltTrack solar system is engineered with Tier-1 components, cyclone-rated mounting systems, 
            and certified electrical workmanship. Below is the complete specification breakdown included in our 
            comprehensive solar packages.
          </p>
        </div>

        {/* Quick Highlights Bar */}
        <div className="package-specs-quick-bar">
          <div className="quick-spec-item">
            <span className="quick-spec-number">8.67 kW</span>
            <span className="quick-spec-label">Total Array Peak Power</span>
          </div>
          <div className="quick-spec-item">
            <span className="quick-spec-number">6.0 kW</span>
            <span className="quick-spec-label">Sigenergy Hybrid Inverter</span>
          </div>
          <div className="quick-spec-item">
            <span className="quick-spec-number">10 kWh</span>
            <span className="quick-spec-label">Battery Ready Architecture</span>
          </div>
          <div className="quick-spec-item">
            <span className="quick-spec-number">100%</span>
            <span className="quick-spec-label">AS/NZS Certified &amp; ROI</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Deep Dive */}
      <div className="package-specs-tabs-nav" role="tablist">
        <button
          className={`specs-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
          role="tab"
          aria-selected={activeTab === 'overview'}
        >
          <Icon name="package" size={17} />
          <span>All 8 Included Specifications</span>
        </button>
        <button
          className={`specs-tab-btn ${activeTab === 'controller' ? 'active' : ''}`}
          onClick={() => setActiveTab('controller')}
          role="tab"
          aria-selected={activeTab === 'controller'}
          id="energy-controller-tab"
        >
          <Icon name="cpu" size={17} />
          <span>Energy Controller Deep Dive</span>
        </button>
        <button
          className={`specs-tab-btn ${activeTab === 'gateway' ? 'active' : ''}`}
          onClick={() => setActiveTab('gateway')}
          role="tab"
          aria-selected={activeTab === 'gateway'}
          id="energy-gateway-tab"
        >
          <Icon name="wifi" size={17} />
          <span>Energy Gateway Deep Dive</span>
        </button>
      </div>

      {/* Tab 1: 8 Hardware & Certification Specifications */}
      {activeTab === 'overview' && (
        <div className="specs-tab-panel" role="tabpanel">
          <div className="specs-grid">
            {hardwareSpecs.map((item, idx) => (
              <ScrollReveal key={idx}>
                <article className="spec-card">
                  <div className="spec-card-top">
                    <span className="spec-item-number">{item.number}</span>
                    <div className="spec-icon-box">
                      <Icon name={item.icon} size={22} />
                    </div>
                  </div>

                  <div className="spec-card-meta">
                    <span className="spec-tag">{item.tag}</span>
                    <span className="spec-highlight-pill">{item.highlight}</span>
                  </div>

                  <h3 className="spec-card-title">{item.title}</h3>
                  <p className="spec-card-description">{item.description}</p>

                  <div className="spec-card-stats">
                    <div className="spec-stat">
                      <span className="stat-label">Capacity / Rating</span>
                      <strong className="stat-value">{item.capacity}</strong>
                    </div>
                    <div className="spec-stat">
                      <span className="stat-label">Warranty / Standard</span>
                      <strong className="stat-value">{item.warranty}</strong>
                    </div>
                  </div>

                  <div className="spec-points-list">
                    <h4>Technical Highlights:</h4>
                    <ul>
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <Icon name="check" size={14} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Energy Controller Deep Dive */}
      {activeTab === 'controller' && (
        <div className="specs-tab-panel" role="tabpanel" id="energy-controller">
          <div className="feature-deep-dive-card">
            <div className="deep-dive-badge">
              <Icon name="cpu" size={18} /> Integrated Package Intelligence
            </div>
            <h2>Sigenergy Energy Controller (Sigen EC)</h2>
            <p className="deep-dive-lead">
              The Sigenergy Energy Controller is the intelligent brain included in your package. 
              It actively controls power flows between your solar array, storage battery, domestic water heater, 
              building circuits, and the national grid — eliminating unnecessary energy waste and maximising return on investment.
            </p>

            <div className="deep-dive-grid">
              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="thermometer" size={24} /></div>
                <h3>Hot Water Solar Diverter</h3>
                <p>
                  Continuously monitors surplus solar generation down to the watt. When your array produces more power than your home or business is currently using, the Energy Controller automatically modulates electricity into your hot water cylinder element. This effectively transforms your standard water cylinder into a free, high-capacity thermal battery.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> Eliminates up to 70% of domestic water heating costs</li>
                  <li><Icon name="check" size={14} /> Dynamic stepless power modulation prevents grid export at low rates</li>
                  <li><Icon name="check" size={14} /> Legally certified legionella protection cycle maintained</li>
                </ul>
              </div>

              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="zap" size={24} /></div>
                <h3>Dynamic Peak Shaving</h3>
                <p>
                  Protects commercial customers from costly peak-demand network tariffs. The controller dynamically dispatches stored battery power or curtails controllable discretionary loads (such as HVAC, chillers, or heavy machinery) during expensive utility peak price periods.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> Drastically reduces electricity line charges and capacity fees</li>
                  <li><Icon name="check" size={14} /> Configurable time-of-use (TOU) schedules aligned with NZ power retailers</li>
                  <li><Icon name="check" size={14} /> Automated load prioritization to keep vital business equipment active</li>
                </ul>
              </div>

              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="rocket" size={24} /></div>
                <h3>Solar EV Charging Synchronization</h3>
                <p>
                  Coordinates with your electric vehicle charging station to charge exclusively with 100% solar surplus. Drive on pure sunshine harvested directly from your rooftop without drawing costly grid power or tripping main building fuses.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> Multiple charging modes: Solar-Only, Solar+Battery, or Fast Boost</li>
                  <li><Icon name="check" size={14} /> Real-time dynamic load balancing protects main supply fuses</li>
                  <li><Icon name="check" size={14} /> Compatible with all Type-2 EV models (Tesla, BYD, Nissan, Hyundai, MG)</li>
                </ul>
              </div>

              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="shield" size={24} /></div>
                <h3>AS/NZS 4777.2 Export Limitation</h3>
                <p>
                  Fully complies with New Zealand Lines Company (Vector, Powerco, Orion, Aurora, etc.) export thresholds with rapid, fail-safe power throttle response, preventing overvoltage trips and regulatory penalties.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> Millisecond-fast closed-loop power export throttling</li>
                  <li><Icon name="check" size={14} /> Zero-export capability for network constrained distribution areas</li>
                  <li><Icon name="check" size={14} /> Fail-safe hardware disconnection if communication links ever drop</li>
                </ul>
              </div>
            </div>

            <div className="deep-dive-action-box">
              <div>
                <h4>Want to see how the Energy Controller cuts your utility bills?</h4>
                <p>Our engineers can model your exact hourly consumption profile and estimate annual solar self-consumption gains.</p>
              </div>
              <Link to="/quote?package=custom&item=energy-controller" className="button button-yellow">
                Request System Modeling <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Energy Gateway Deep Dive */}
      {activeTab === 'gateway' && (
        <div className="specs-tab-panel" role="tabpanel" id="energy-gateway">
          <div className="feature-deep-dive-card">
            <div className="deep-dive-badge">
              <Icon name="wifi" size={18} /> Central Telemetry &amp; Microgrid Hub
            </div>
            <h2>Sigenergy Energy Gateway (Sigen Gateway)</h2>
            <p className="deep-dive-lead">
              The Sigenergy Energy Gateway is the central telemetry and microgrid switching hub that connects your solar, battery storage, 
              EV chargers, and main switchboard to the cloud. It delivers instant blackout protection and comprehensive revenue-grade monitoring.
            </p>

            <div className="deep-dive-grid">
              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="layers" size={24} /></div>
                <h3>Multi-Protocol Telemetry Hub</h3>
                <p>
                  Unifies inverters, battery management systems (BMS), sub-meters, and building management systems into a single encrypted stream via Modbus TCP/RTU, RS485, CAN bus, and Ethernet.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> Full compatibility with SCADA, SunSpec, MQTT &amp; REST APIs</li>
                  <li><Icon name="check" size={14} /> Connects up to 10 cascaded inverters on commercial sites</li>
                  <li><Icon name="check" size={14} /> Real-time mobile app and desktop cloud dashboard access</li>
                </ul>
              </div>

              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="shield" size={24} /></div>
                <h3>Revenue-Grade Class 0.5 Metering</h3>
                <p>
                  Captures true RMS voltage, current, power factor, reactive power, and harmonic distortion with lab-certified ±0.5% metering accuracy. Essential for verifying utility billing and carbon reporting.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> Certified Class 0.5 bidirectional power measurement</li>
                  <li><Icon name="check" size={14} /> High-speed 100Hz sampling rate detects transient load surges</li>
                  <li><Icon name="check" size={14} /> 32GB on-board non-volatile memory stores 12+ months of offline data</li>
                </ul>
              </div>

              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="wifi" size={24} /></div>
                <h3>4G Cellular Redundancy Backup</h3>
                <p>
                  Equipped with an integrated 4G LTE Cat-M1/NB-IoT cellular modem with automated fallback. Even if your premises broadband internet or local Wi-Fi goes down, your system stays 100% online.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> Uninterrupted cloud telemetry and remote fault diagnostics</li>
                  <li><Icon name="check" size={14} /> Instant SMS / push notifications during grid power outages</li>
                  <li><Icon name="check" size={14} /> Encrypted TLS 1.3 / AES-256 secure data transmission</li>
                </ul>
              </div>

              <div className="deep-dive-feature-box">
                <div className="deep-dive-feature-icon"><Icon name="wrench" size={24} /></div>
                <h3>Seamless Microgrid Islanding</h3>
                <p>
                  Integrated heavy-duty motorized contactors isolate your premises from the utility grid in under 10 milliseconds during blackouts, establishing a stable microgrid that powers your critical loads continuously.
                </p>
                <ul className="deep-dive-checklist">
                  <li><Icon name="check" size={14} /> 0 ms uninterruptible power supply (UPS) switchover</li>
                  <li><Icon name="check" size={14} /> Compliant with AS/NZS 4777.2 anti-islanding safety protocols</li>
                  <li><Icon name="check" size={14} /> Black-start capability allows solar recharge during multi-day grid cuts</li>
                </ul>
              </div>
            </div>

            <div className="deep-dive-action-box">
              <div>
                <h4>Explore Telemetry &amp; Gateway Options for Your Facility</h4>
                <p>Connect with a VoltTrack engineer to review monitoring architectures and backup switchboard integration.</p>
              </div>
              <Link to="/quote?package=custom&item=energy-gateway" className="button button-yellow">
                Consult an Engineer <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Standards & Certifications Band */}
      <div className="package-compliance-band">
        <div className="compliance-heading">
          <Icon name="award" size={20} />
          <h3>Certified New Zealand Compliance &amp; Standards Verification</h3>
        </div>
        <div className="compliance-badges-grid">
          <div className="compliance-badge-item">
            <span className="badge-code">AS/NZS 3000</span>
            <span className="badge-name">Wiring Rules</span>
            <span className="badge-desc">Safe electrical installation practice</span>
          </div>
          <div className="compliance-badge-item">
            <span className="badge-code">AS/NZS 4777.2</span>
            <span className="badge-name">Inverter Standard</span>
            <span className="badge-desc">Grid protection &amp; export limitation</span>
          </div>
          <div className="compliance-badge-item">
            <span className="badge-code">AS/NZS 5033</span>
            <span className="badge-name">PV Array Installation</span>
            <span className="badge-desc">Rooftop safety &amp; DC cabling</span>
          </div>
          <div className="compliance-badge-item">
            <span className="badge-code">AS/NZS 5139</span>
            <span className="badge-name">Battery Storage (BESS)</span>
            <span className="badge-desc">Safe LiFePO4 placement &amp; isolation</span>
          </div>
          <div className="compliance-badge-item">
            <span className="badge-code">COC &amp; ROI</span>
            <span className="badge-name">Official Certification</span>
            <span className="badge-desc">Inspector sign-off &amp; High-Risk DB</span>
          </div>
          <div className="compliance-badge-item">
            <span className="badge-code">AS/NZS 1170.2</span>
            <span className="badge-name">Cyclone Rated Racking</span>
            <span className="badge-desc">Extreme wind zone structural rating</span>
          </div>
        </div>
      </div>

      {/* Ready to Get Started Bottom CTA */}
      <div className="package-details-cta-banner">
        <div className="container split-grid">
          <div>
            <span className="eyebrow yellow">Ready to Upgrade to Solar?</span>
            <h2>Take the next step with our turnkey packages.</h2>
            <p>
              Whether you are choosing our Small Package for straightforward small business power, 
              or our Enterprise Package with customized scalability, our team handles everything from 
              lines company approvals to final COC inspection.
            </p>
          </div>
          <div className="package-details-cta-actions">
            <Link to="/quote?package=small" className="button button-light">
              Small Package Quote <Icon name="arrow" size={17} />
            </Link>
            <Link to="/quote?package=enterprise" className="button button-yellow">
              Enterprise Package Quote <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
