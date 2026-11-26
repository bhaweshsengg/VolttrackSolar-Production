import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const whatWeDoSections = [
  {
    id: "solar-pv",
    number: "01",
    tag: "Photovoltaic Generation",
    title: "Solar PV Systems",
    lead: "Precision-engineered residential and commercial rooftop solar installations designed for New Zealand's unique climate and maximum solar self-consumption.",
    icon: "sun",
    badge: "8.67kW+ Array • Tier-1 N-Type • 25-Yr Warranty",
    description: "Our grid-tied and hybrid solar PV systems combine high-efficiency Tier-1 monocrystalline panels with advanced multi-MPPT inverters. Engineered to perform exceptionally under New Zealand's high UV index, variable cloud cover, and coastal conditions, our solar arrays deliver immediate power bill savings and rapid capital payback.",
    points: [
      "Custom rooftop string and hybrid design tailored to your roof pitch, azimuth, and shade profiles",
      "Tier-1 N-Type TOPCon and bifacial modules with anti-reflective, marine-grade tempered glass",
      "Full lines company connection approvals (Wellington Electricity, Electra, Powerco, etc.) and net metering",
      "Commercial peak-demand reduction and agricultural dairy shed / packhouse solar optimization",
      "Real-time mobile app generation monitoring with kilowatt-level production telemetry"
    ],
    specs: [
      ["Panel Efficiency", "Up to 22.8% N-Type TOPCon"],
      ["Inverter Topology", "Single & Three-Phase Hybrid"],
      ["Typical Payback", "4 to 7 Years in NZ"],
      ["Grid Standards", "AS/NZS 4777.2 Certified"]
    ],
    primaryCta: { text: "Quote for Solar PV", link: "/quote?service=Solar%20PV%20Systems" },
    secondaryCta: { text: "Explore Panels", link: "/product/solar-panels" }
  },
  {
    id: "co2-heat-pumps",
    number: "02",
    tag: "Eco-Thermal Water Heating",
    title: "CO₂ Hot Water Heat Pumps",
    lead: "Clean, ultra-efficient water heating powered by natural CO₂ (R744) refrigerant, cutting domestic and commercial water heating electricity bills by up to 75%.",
    icon: "droplet",
    badge: "COP 4.5+ Efficiency • -20°C Operation • Zero GWP",
    description: "Water heating accounts for roughly 30% of an average Kiwi home or commercial facility's power bill. Our natural CO₂ (R744) heat pumps extract heat from ambient outdoor air down to -20°C without requiring an inefficient electric booster element. When paired with your solar PV array, your hot water cylinder becomes a free, high-capacity thermal battery.",
    points: [
      "Delivers high-temperature hot water up to 70°C even during freezing sub-zero winter temperatures",
      "Seasonal Coefficient of Performance (COP) up to 4.5+ — generating 4.5kW of heat for 1kW of power",
      "Natural R744 refrigerant with ultra-low Global Warming Potential (GWP = 1) and zero ozone depletion",
      "Smart solar diverter coordination: runs during solar generation peaks to heat water for free",
      "Corrosion-resistant marine-grade outdoor evaporator coils suited for New Zealand coastal air"
    ],
    specs: [
      ["Refrigerant Type", "Natural R744 (CO₂) Eco-Friendly"],
      ["Operating Range", "-20°C to +43°C Ambient"],
      ["Hot Water Temp", "Up to 70°C without element booster"],
      ["Energy Reduction", "Up to 75% vs electric element"]
    ],
    primaryCta: { text: "Quote for CO₂ Heat Pump", link: "/quote?service=CO2%20Hot%20Water%20Heat%20Pumps" },
    secondaryCta: { text: "Packages Information", link: "/packages/details#package-specs" }
  },
  {
    id: "climate-heat-pumps",
    number: "03",
    tag: "Whole-Building HVAC",
    title: "Climate Control Heat Pumps",
    lead: "High-efficiency inverter heating and cooling systems engineered for Kiwi climates, providing year-round thermal comfort, clean air filtration, and smart zoning.",
    icon: "wind",
    badge: "Inverter Technology • Multi-Zone Smart Controls • Ultra Quiet",
    description: "From single high-wall split systems in living areas to whole-home ducted central heating and multi-zone commercial VRF systems, we design and install high-performance climate control. Integrated with solar dispatch algorithms, your system can pre-heat or pre-cool your building using free daytime solar energy before expensive evening peak rates begin.",
    points: [
      "High-efficiency inverter compressors that continuously modulate output to minimize power draw",
      "Ducted central heating and cooling systems with discreet ceiling diffusers and custom zone dampers",
      "Smart Wi-Fi thermostats and mobile app scheduling with room-by-room temperature sensors",
      "Built-in advanced filtration systems trapping dust, allergens, pollen, and winter moisture",
      "Whisper-quiet indoor units engineered for bedrooms, home offices, and corporate boardrooms"
    ],
    specs: [
      ["Efficiency Rating", "Energy Star NZ Certified 6-Star"],
      ["System Types", "High-Wall, Floor, Ducted & Multi-Split"],
      ["Noise Level", "Whisper-Quiet (< 20 dB sleep mode)"],
      ["Smart Integration", "Wi-Fi & Solar Pre-Conditioning"]
    ],
    primaryCta: { text: "Quote for Climate Control", link: "/quote?service=Climate%20Control%20Heat%20Pumps" },
    secondaryCta: { text: "Electrical Services", link: "/services/electrical" }
  },
  {
    id: "battery-storage",
    number: "04",
    tag: "Resilience & Autonomy",
    title: "Battery & Off-Grid Storage",
    lead: "Modular LiFePO4 battery storage and stand-alone off-grid power systems providing instant blackout protection, peak shaving, and complete power independence.",
    icon: "battery",
    badge: "0 ms UPS Backup • LiFePO4 Safety • 6,000+ Cycles",
    description: "Store the surplus power your solar panels generate during the day and use it whenever you need it most. Our battery storage solutions provide seamless 0ms blackout protection, allowing your critical lights, refrigerators, medical equipment, and computers to keep running when the utility grid goes down. For rural locations, we engineer full off-grid stand-alone power plants.",
    points: [
      "Safest Lithium Iron Phosphate (LiFePO4) chemistry with multi-tiered BMS thermal protection",
      "Instantaneous UPS-speed automatic backup transfer keeping sensitive electronics online",
      "Time-of-Use (TOU) tariff optimization: charges at low rates, discharges during peak tariff spikes",
      "Turnkey rural off-grid power systems (SAPS) with automated diesel generator backup synchronization",
      "Modular scalability from 5kWh residential units up to 100kWh+ commercial energy storage banks"
    ],
    specs: [
      ["Battery Chemistry", "Lithium Iron Phosphate (LiFePO4)"],
      ["Depth of Discharge", "90% to 100% Usable Capacity"],
      ["Cycle Life", "6,000+ Full Cycles to 80% Capacity"],
      ["Switchover Time", "< 10ms UPS-Class Automatic Backup"]
    ],
    primaryCta: { text: "Quote for Battery Storage", link: "/quote?service=Battery%20and%20Off-Grid%20Storage" },
    secondaryCta: { text: "View Modular Batteries", link: "/product/solar-battery" }
  },
  {
    id: "ev-charging",
    number: "05",
    tag: "E-Mobility Infrastructure",
    title: "EV Charging Stations",
    lead: "Certified Level 2 AC and bi-directional DC electric vehicle chargers for homes, commercial fleets, and car parks, powered by pure solar surplus.",
    icon: "zap",
    badge: "7.4kW–22kW Fast AC / DC • Solar Match • Dynamic Balancing",
    description: "Power your electric vehicle directly from your rooftop solar panels. Our certified EV charging systems feature intelligent solar tracking that automatically ramps up charging when the sun is shining and dials it down when domestic power demand rises. Dynamic load balancing prevents main switchboard overload, ensuring safe and rapid charging.",
    points: [
      "Solar Surplus Eco-Mode: charges your EV exclusively on free excess solar generation",
      "Dynamic building load management continuously monitors main fuses to prevent tripping",
      "Commercial fleet management with RFID swipe cards, OCPP 1.6/2.0 protocols, and automated billing",
      "Bi-directional V2H / V2G readiness: use your EV battery to power your property during emergencies",
      "Weatherproof IP65 enclosures with Type-2 tethered or socketed cables compatible with all EV makes"
    ],
    specs: [
      ["Charging Speeds", "7.4kW Single Phase / 22kW Three Phase"],
      ["Vehicle Connector", "Type 2 Mennekes (Standard NZ)"],
      ["Safety Compliance", "WorkSafe NZ Electric Vehicle Guidelines"],
      ["Smart Network", "Wi-Fi, 4G, OCPP 1.6J Cloud Management"]
    ],
    primaryCta: { text: "Quote for EV Charging", link: "/quote?service=EV%20Charging%20Stations" },
    secondaryCta: { text: "Inverter Hardware", link: "/product/hybrid-inverters" }
  },
  {
    id: "electrical-solutions",
    number: "06",
    tag: "Master Electrical Contracting",
    title: "General Electrical Solutions",
    lead: "Comprehensive residential, commercial, and industrial electrical contracting executed exclusively by licensed NZ Registered Electricians with full COC & ROI certification.",
    icon: "wrench",
    badge: "Master Electricians • AS/NZS 3000 • COC & ROI Certified",
    description: "Every solar and battery installation rests on a solid electrical foundation. Our team of licensed Master Electricians handles complete switchboard modernizations, mains supply upgrades, single-phase to three-phase conversions, and commercial electrical fit-outs. We guarantee strict adherence to AS/NZS 3000 wiring rules, backed by official compliance certificates.",
    points: [
      "Main switchboard upgrades with modern RCBO residual current breakers and surge arrestors",
      "Mains service cable upgrades and single-to-three phase power supply network conversions",
      "Commercial fit-outs, industrial automation, machinery wiring, and power factor correction",
      "Certificate of Compliance (COC) and High-Risk Record of Inspection (ROI) lodgement",
      "Electrical safety audits, thermal imaging switchboard inspections, and emergency fault finding"
    ],
    specs: [
      ["Accreditation", "NZ Registered & Licensed Electricians"],
      ["Standards", "AS/NZS 3000:2018 Wiring Rules"],
      ["Documentation", "Formal COC & High-Risk ROI Certification"],
      ["Warranty", "VoltTrack 10-Year Workmanship Guarantee"]
    ],
    primaryCta: { text: "Quote for Electrical Work", link: "/quote?service=General%20Electrical%20Solutions" },
    secondaryCta: { text: "Learn More on Electrical", link: "/services/electrical" }
  }
];

export default function Services() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const filteredSections = activeFilter === "all"
    ? whatWeDoSections
    : whatWeDoSections.filter(s => s.id === activeFilter);

  return (
    <>
      <PageHero
        eyebrow="What We Do • Solar &amp; Electrical Services"
        title="Complete Solar, Thermal &amp; Electrical Solutions"
        text="From high-efficiency rooftop solar arrays and CO₂ hot water heat pumps to commercial battery storage, EV charging networks, and master electrical engineering."
      />

      {/* Services Sub-Navigation Bar */}
      <section className="section services-nav-bar-section">
        <div className="container">
          <div className="services-jump-header">
            <span className="eyebrow green">Our 6 Core Capabilities</span>
            <h2>What We Do for Wellington Region Homes &amp; Businesses</h2>
            <p>Select any category below to jump directly to detailed specifications and custom quote options.</p>
          </div>

          <div className="services-filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All 6 Services
            </button>
            {whatWeDoSections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`filter-tab ${activeFilter === s.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveFilter('all');
                  const el = document.getElementById(s.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Icon name={s.icon} size={15} />
                <span>{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6 What We Do Sections */}
      <section className="section what-we-do-main-section">
        <div className="container">
          <div className="what-we-do-list">
            {filteredSections.map((sec, idx) => (
              <ScrollReveal key={sec.id}>
                <article className="what-we-do-card" id={sec.id}>
                  <div className="what-we-do-card-header">
                    <div className="what-we-do-meta">
                      <span className="what-we-do-number">{sec.number}</span>
                      <div className="what-we-do-icon-wrap">
                        <Icon name={sec.icon} size={26} />
                      </div>
                      <div className="what-we-do-title-group">
                        <span className="what-we-do-tag">{sec.tag}</span>
                        <h3 className="what-we-do-title">{sec.title}</h3>
                      </div>
                    </div>
                    <span className="what-we-do-badge">{sec.badge}</span>
                  </div>

                  <p className="what-we-do-lead">{sec.lead}</p>
                  <p className="what-we-do-description">{sec.description}</p>

                  <div className="what-we-do-body-grid">
                    {/* Points list */}
                    <div className="what-we-do-features">
                      <h4>Key Service Features:</h4>
                      <ul className="what-we-do-points">
                        {sec.points.map((pt, pIdx) => (
                          <li key={pIdx}>
                            <span className="pt-check"><Icon name="check" size={15} /></span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specs Box */}
                    <div className="what-we-do-specs-box">
                      <h4>Technical Highlights:</h4>
                      <div className="what-we-do-specs-grid">
                        {sec.specs.map(([label, val], sIdx) => (
                          <div key={sIdx} className="spec-row-item">
                            <span className="spec-label">{label}</span>
                            <strong className="spec-val">{val}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="what-we-do-card-actions">
                        <Link to={sec.primaryCta.link} className="button button-yellow">
                          <span>{sec.primaryCta.text}</span>
                          <Icon name="arrow" size={16} />
                        </Link>
                        <Link to={sec.secondaryCta.link} className="button button-light">
                          <span>{sec.secondaryCta.text}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Accreditations Banner */}
      <section className="section section-light">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Why Choose VoltTrack"
            title="Engineered for Performance. Built for New Zealand."
            text="We combine world-class clean energy hardware with certified local installation standards."
          />
          <div className="services-trust-grid">
            <div className="trust-card">
              <div className="trust-card-icon"><Icon name="shield" size={24} /></div>
              <h4>AS/NZS Certified</h4>
              <p>Strict compliance with AS/NZS 3000, 4777, 5033, and 5139 on every installation.</p>
            </div>
            <div className="trust-card">
              <div className="trust-card-icon"><Icon name="award" size={24} /></div>
              <h4>Master Electricians</h4>
              <p>Every system is wired, tested, and certified by licensed NZ Registered Electricians.</p>
            </div>
            <div className="trust-card">
              <div className="trust-card-icon"><Icon name="check" size={24} /></div>
              <h4>COC &amp; ROI Included</h4>
              <p>Official High-Risk inspection sign-off and network consents provided upon handover.</p>
            </div>
            <div className="trust-card">
              <div className="trust-card-icon"><Icon name="sun" size={24} /></div>
              <h4>25-Year Performance</h4>
              <p>Long-term warranties on solar panels, mounting racking, and inverter electronics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="section section-dark">
        <div className="container split-grid">
          <div>
            <span className="eyebrow yellow">Ready for an Energy Upgrade?</span>
            <h2>Let’s design the right solar &amp; electrical solution for you.</h2>
            <p>Tell us a few details about your property, current power bills, or future plans. Our solar engineers will provide a clear, tailored recommendation.</p>
          </div>
          <Link className="button button-yellow" to="/quote">
            Request A Free Quote <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
