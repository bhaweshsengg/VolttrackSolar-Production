export const packagesData = {
  'residential-starter': {
    id: 'residential-starter',
    path: '/packages/residential/starter',
    category: 'residential',
    categoryLabel: 'Residential Solar',
    categorySubtitle: 'Kiwi Homes & Properties',
    tier: 'Starter',
    title: 'Starter Package',
    fullTitle: 'Residential Starter Solar Package',
    badge: 'Affordable Entry-Level Solar',
    tagline: 'Clean, reliable rooftop solar designed to reduce everyday household power bills without complexity.',
    capacity: '4.5kW – 5.0kW DC',
    inverter: '5.0kW Hybrid Single-Phase',
    battery: 'Storage Upgrade Ready',
    warranty: '25-Yr Panel / 10-Yr Inverter',
    estGeneration: '~6,000 – 7,200 kWh / year',
    targetAudience: 'Small to medium-sized Kiwi homes, townhouses, and homeowners wanting straightforward solar savings.',
    features: [
      'High-efficiency Tier-1 N-Type TOPCon monocrystalline panels',
      '5.0kW intelligent single-phase hybrid inverter with 98.4% efficiency',
      'Real-time Wi-Fi generation tracking via mobile app',
      'Clenergy S6 cyclone-rated roof racking (AS/NZS 1170.2)',
      'Non-penetrating tile or corrugated iron mounting brackets',
      'Lines company connection consent & smart net-metering setup',
      'Master Electricians installation with full COC & ESC certification'
    ],
    hardware: [
      {
        icon: 'layers',
        title: '10 × Tier-1 500W+ Solar Panels',
        detail: 'High-yield monocrystalline N-Type TOPCon modules with anti-reflective glass, engineered for New Zealand high UV and low-light mornings.'
      },
      {
        icon: 'zap',
        title: '5.0kW Hybrid Smart Inverter',
        detail: 'Dual MPPT trackers, silent natural cooling, integrated DC arc-fault circuit interrupter (AFCI), and battery-ready expansion capability.'
      },
      {
        icon: 'grid',
        title: 'Clenergy S6 Cyclone-Rated Racking',
        detail: 'Australian-made structural anodised aluminium mounting system certified for New Zealand wind zones Low to Extra High.'
      },
      {
        icon: 'shield',
        title: 'Marine-Grade Roof Brackets',
        detail: 'Weatherproof non-penetrating clamping brackets preserving existing roof manufacturer warranties and preventing leaks.'
      },
      {
        icon: 'award',
        title: 'COC & ROI Electrical Compliance',
        detail: 'Installed strictly to AS/NZS 3000 & 4777.2 with official Certificate of Compliance lodged with the energy safety registry.'
      }
    ],
    benefits: [
      'Saves up to $1,800 – $2,400+ per year on average household electricity bills',
      'Payback period typically 4 to 6 years across New Zealand regions',
      'Full mobile app visibility over real-time solar production and home energy usage',
      'Modular design allows seamless addition of a battery storage module anytime in the future'
    ],
    specs: [
      ['Nominal Array Size', '4.5kW – 5.1kW DC'],
      ['Inverter Capacity', '5.0kW AC Continuous'],
      ['Annual Generation', '~6,000 – 7,200 kWh'],
      ['Mounting Standards', 'AS/NZS 1170.2 Cyclone Rated'],
      ['Electrical Standards', 'AS/NZS 3000 & 4777.2'],
      ['Panel Warranty', '25-Year Product / 25-Year Performance'],
      ['Workmanship', 'VoltTrack 10-Year Installation Guarantee']
    ],
    quoteSlug: 'residential-starter'
  },

  'residential-comprehensive': {
    id: 'residential-comprehensive',
    path: '/packages/residential/comprehensive',
    category: 'residential',
    categoryLabel: 'Residential Solar',
    categorySubtitle: 'Kiwi Homes & Properties',
    tier: 'Comprehensive',
    title: 'Comprehensive Package',
    fullTitle: 'Residential Comprehensive Solar & Battery Ready Package',
    badge: 'Recommended Whole-Home Solution',
    tagline: 'The ultimate whole-home solar, storage-ready, and smart hot water management ecosystem for maximum self-consumption.',
    capacity: '8.67kW Array Output',
    inverter: '6.0kW Sigenergy EC SP6.0',
    battery: '10kWh Storage Ready (9.4kWh usable) / 12kW V2X',
    warranty: '25-30 Year Panel / 10-Yr Sigenergy',
    estGeneration: '~11,500 – 13,000 kWh / year',
    targetAudience: 'Growing families, high-energy households, EV drivers, and homeowners demanding complete energy resilience.',
    features: [
      '17 × Suntech 510W Solar Panels (or equivalent high-output N-Type)',
      '1 × Sigenergy EC SP6.0 6kW AC Hybrid Inverter with native V2X EV architecture',
      '10kWh Battery Ready System with 9.4kWh true cycling or 12kW bidirectional EV discharge',
      'Sigenergy Power Sensor / Gateway with Class 0.5 revenue-grade metering',
      'Integrated Hot Water Solar Diverter for thermal water heating storage',
      'Australian-made Clenergy S6 cyclone-rated mounting system',
      'Non-penetrating metal tile roof brackets preserving roof integrity',
      'Professional installation compliant with AS/NZS 3000, 4777, 5033, 5139',
      'Full COC and independent High-Risk ROI certification'
    ],
    hardware: [
      {
        icon: 'layers',
        title: '17 × Suntech 510W Monocrystalline Panels',
        detail: '8.67kW DC array output with N-Type TOPCon half-cut cells, 87.4% linear power retention after 30 years, and hail/corrosion resistance.'
      },
      {
        icon: 'zap',
        title: 'Sigenergy EC SP6.0 Hybrid Inverter',
        detail: '6.0kW continuous AC power, 99.0% peak conversion efficiency, whisper-quiet fanless cooling (<25dB), and built-in AFCI safety.'
      },
      {
        icon: 'battery',
        title: '10kWh Battery Ready / 12kW V2X System',
        detail: 'Pre-wired architecture ready for modular LiFePO4 batteries with 0ms UPS blackout switchover or 12kW bidirectional vehicle-to-home charging.'
      },
      {
        icon: 'wifi',
        title: 'Sigenergy Power Sensor & Telemetry Gateway',
        detail: 'High-precision Class 0.5 bidirectional current sensor, 4G cellular redundancy backup, and cloud-linked automated islanding.'
      },
      {
        icon: 'thermometer',
        title: 'Hot Water Solar Diverter',
        detail: 'Automatically modulates excess solar surplus into your water cylinder, transforming it into a high-capacity thermal battery for free.'
      },
      {
        icon: 'grid',
        title: 'Clenergy S6 Cyclone Racking & Non-Penetrating Clamps',
        detail: 'Australian-made anodised structural aluminium certified to AS/NZS 1170.2, paired with zero-penetration tile clamps.'
      }
    ],
    benefits: [
      'Slashes home electricity bills by up to 70% – 85% through maximum daytime self-consumption',
      'Powers hot water for free by diverting surplus solar before grid export',
      'Future-proofed for instant LiFePO4 plug-and-play battery expansion or bidirectional EV power',
      'Full legal protection with official COC & High-Risk ROI inspection certificates'
    ],
    specs: [
      ['Nominal Array Size', '8.67 kW DC Array'],
      ['Inverter Model', 'Sigenergy EC SP6.0 (6.0 kW AC)'],
      ['Usable Cycling Depth', '9.4 kWh daily storage / 12kW V2X'],
      ['Smart Gateway', 'Class 0.5 Revenue Sensor + 4G Redundancy'],
      ['Racking System', 'Clenergy S6 Cyclone-Rated AS/NZS 1170.2'],
      ['Compliance', 'AS/NZS 3000, 4777, 5033, 5139 + COC & ROI'],
      ['Warranty Coverage', '30-Yr Panel / 10-Yr Sigenergy / 10-Yr Labor']
    ],
    quoteSlug: 'residential-comprehensive'
  },

  'enterprise-starter': {
    id: 'enterprise-starter',
    path: '/packages/enterprise/starter',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    categorySubtitle: 'Commercial & Industrial Solar',
    tier: 'Starter',
    title: 'Starter Package',
    fullTitle: 'Enterprise Starter Commercial Solar Package',
    badge: 'Small Business & Office Solar',
    tagline: 'Targeted commercial solar generation engineered to offset daytime business operating loads and peak-tariff charges.',
    capacity: '10kW – 15kW DC Array',
    inverter: '10kW – 15kW Three-Phase Commercial',
    battery: 'Commercial Storage Ready',
    warranty: '25-Yr Performance / 10-Yr Inverter',
    estGeneration: '~14,000 – 21,000 kWh / year',
    targetAudience: 'Small businesses, boutique offices, retail stores, medical clinics, and daytime commercial workshops.',
    features: [
      '10kW – 15kW commercial solar array tailored to daytime operating loads',
      'Three-phase commercial inverter with high-efficiency MPPT tracking',
      'Dynamic peak-demand limitation to reduce capacity network charges',
      'Commercial roof mounting system engineered for trapezoidal / corrugated roofs',
      'Three-phase smart energy meter with web portal dashboard access',
      'Commercial lines company approval (Vector, Powerco, Orion, etc.)',
      'Turnkey installation by Licensed NZ Commercial Electricians with COC & ROI'
    ],
    hardware: [
      {
        icon: 'layers',
        title: '20–30 × Commercial Tier-1 Panels',
        detail: 'High-output 500W+ commercial modules engineered for commercial roof structural limits and high midday irradiance capture.'
      },
      {
        icon: 'zap',
        title: 'Three-Phase Commercial Inverter',
        detail: 'Balanced three-phase power delivery, wide voltage operating range, integrated DC isolation, and network protection.'
      },
      {
        icon: 'grid',
        title: 'Industrial Racking & Roof Clamps',
        detail: 'High-grade structural aluminium rails with seismic and cyclone ratings suited for commercial building codes.'
      },
      {
        icon: 'award',
        title: 'Lines Company Import/Export Setup',
        detail: 'Full engineering submission and connection consent with local lines network, including export limitation compliance.'
      }
    ],
    benefits: [
      'Offsets daytime commercial power usage at the highest retail and network tariff hours',
      'Substantially reduces monthly lines charges and peak capacity demand penalties',
      'Accelerated business capital depreciation and tax deductions on commercial solar assets',
      'Enhances company sustainability credentials with verified carbon emission reductions'
    ],
    specs: [
      ['System Capacity', '10kW – 15kW Three-Phase DC'],
      ['Inverter Type', 'Three-Phase High-Efficiency Inverter'],
      ['Estimated Output', '~14,000 – 21,000 kWh annually'],
      ['Export Limitation', 'AS/NZS 4777.2 Network Compliant'],
      ['Certifications', 'Full COC & Independent High-Risk ROI'],
      ['Warranty', '25-Year Performance / 10-Year Commercial']
    ],
    quoteSlug: 'enterprise-starter'
  },

  'enterprise-full': {
    id: 'enterprise-full',
    path: '/packages/enterprise/full',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    categorySubtitle: 'Commercial & Industrial Solar',
    tier: 'Full',
    title: 'Full Package',
    fullTitle: 'Enterprise Full Commercial Solar Package',
    badge: 'Medium-to-Large Commercial',
    tagline: 'High-output commercial solar generation engineered for manufacturing sites, distribution warehouses, and agricultural packhouses.',
    capacity: '30kW – 50kW DC Array',
    inverter: 'Multi-MPPT Three-Phase 30–50kW',
    battery: 'Modular Commercial BESS Ready',
    warranty: '25-Yr Performance / 10-Yr Inverter',
    estGeneration: '~42,000 – 70,000 kWh / year',
    targetAudience: 'Medium-to-large businesses, logistics facilities, supermarkets, cold stores, and commercial landlords.',
    features: [
      '30kW – 50kW commercial photovoltaic array with high-density N-Type modules',
      'Multi-MPPT commercial three-phase inverters with 99% conversion efficiency',
      'Dynamic peak-shaving control to flatten expensive daily demand spikes',
      'Sigenergy Gateway integration with Modbus/SCADA telemetry and 4G backup',
      'Power factor correction compatibility and harmonic suppression',
      'Dedicated VoltTrack Commercial Project Manager from design to handover',
      'Official high-risk inspection, COC, lines connection agreement, and asset warranty documentation'
    ],
    hardware: [
      {
        icon: 'layers',
        title: '60–100 × 510W+ Bifacial Commercial Panels',
        detail: 'Dual-surface photon absorption captures reflected rooftop albedo, increasing real-world energy output by up to 15%.'
      },
      {
        icon: 'zap',
        title: 'Multi-MPPT Commercial Inverter Bank',
        detail: 'Handles complex multi-angle commercial roofs, shade profiles, and string-level monitoring with rapid shutdown capability.'
      },
      {
        icon: 'wifi',
        title: 'Commercial Telemetry & SCADA Gateway',
        detail: 'High-speed Modbus TCP/RTU, 4G cellular failover, and minute-by-minute energy auditing for financial reporting.'
      },
      {
        icon: 'shield',
        title: 'Engineered Commercial Mounting Systems',
        detail: 'Structural calculation reports provided for building consent, cyclone-rated up to Extra High wind zones.'
      }
    ],
    benefits: [
      'Directly slashes operational overheads across refrigeration, machinery, and lighting',
      'Guards against rising commercial electricity tariffs and network demand penalties',
      'Real-time automated ESG and carbon reduction reporting for corporate disclosures',
      'Engineered for 25+ years of continuous high-load commercial generation'
    ],
    specs: [
      ['System Capacity', '30kW – 50kW Three-Phase Array'],
      ['Inverter Architecture', 'Multi-MPPT Commercial Hybrid Inverter'],
      ['Estimated Output', '~42,000 – 70,000 kWh annually'],
      ['Monitoring', 'SCADA / Modbus Gateway + 4G Redundancy'],
      ['Safety & Standards', 'AS/NZS 3000, 4777.2, 5033 + Full ROI'],
      ['Account Management', 'Dedicated Commercial Project Engineer']
    ],
    quoteSlug: 'enterprise-full'
  },

  'enterprise-comprehensive': {
    id: 'enterprise-comprehensive',
    path: '/packages/enterprise/comprehensive',
    category: 'enterprise',
    categoryLabel: 'Enterprise',
    categorySubtitle: 'Commercial & Industrial Solar',
    tier: 'Comprehensive',
    title: 'Comprehensive Package',
    fullTitle: 'Enterprise Comprehensive Solar, BESS Microgrid & EV Fleet Package',
    badge: 'Enterprise Flagship Microgrid',
    tagline: 'High-capacity commercial solar, modular LiFePO4 battery energy storage (BESS), 0ms UPS resilience, and EV fleet infrastructure.',
    capacity: '50kW – 100kW+ Solar + 50–200kWh BESS',
    inverter: 'Industrial Microgrid Inverter Hub',
    battery: 'Commercial LiFePO4 BESS (0ms UPS)',
    warranty: '25-Yr Performance / 10-Yr BESS / Priority SLA',
    estGeneration: '~75,000 – 150,000+ kWh / year',
    targetAudience: 'Industrial factories, food processing plants, high-demand commercial headquarters, and mission-critical facilities.',
    features: [
      '50kW – 100kW+ custom-engineered commercial solar photovoltaic generation',
      'Modular commercial LiFePO4 Battery Energy Storage (50kWh to 200kWh+ capacity)',
      '0ms UPS-class automated islanding microgrid for blackout-free business continuity',
      'Integrated Level 2 AC and rapid DC commercial EV fleet charging stations',
      'Class 0.5 revenue-grade power quality monitoring and active power factor management',
      'Dual-path telemetry with 4G LTE cellular redundancy and SCADA cloud integration',
      '24/7 priority enterprise support SLA and dedicated lead engineer'
    ],
    hardware: [
      {
        icon: 'layers',
        title: '100kW+ High-Yield PV Array',
        detail: 'Custom-configured commercial solar array maximizing available roof or ground space with Tier-1 bifacial technology.'
      },
      {
        icon: 'battery',
        title: 'Commercial LiFePO4 Battery Bank (BESS)',
        detail: 'Heavy-duty prismatic lithium iron phosphate storage scalable to 200kWh+, capable of full peak-shaving and backup.'
      },
      {
        icon: 'shield',
        title: '0ms Instant Microgrid Islanding Switchgear',
        detail: 'Motorized transfer switches keep essential refrigeration, servers, and production lines running during grid cuts.'
      },
      {
        icon: 'rocket',
        title: 'EV Fleet Charging Hub',
        detail: 'Smart OCPP 1.6/2.0 chargers with solar surplus diversion and dynamic main-fuse overload protection.'
      },
      {
        icon: 'wifi',
        title: 'Sigenergy Central Gateway & SCADA',
        detail: 'Enterprise revenue-grade metering, power factor correction, and multi-tenant billing sub-metering.'
      }
    ],
    benefits: [
      'Protects business operations with seamless 0ms blackout protection — zero downtime',
      'Maximizes energy arbitrage: charges batteries during low off-peak rates, powers loads during peak windows',
      'Powers company electric fleet on free on-site solar generation',
      'Guarantees corporate compliance with comprehensive AS/NZS 5139 and high-risk electrical inspections'
    ],
    specs: [
      ['Solar PV Sizing', '50kW – 100kW+ Custom Engineered'],
      ['Storage Sizing', '50kWh – 200kWh+ Modular LiFePO4 BESS'],
      ['Microgrid Switchover', '< 10ms (True 0ms UPS Class)'],
      ['EV Fleet Integration', '7.4kW – 22kW AC / 60kW DC Fast Charge'],
      ['Monitoring & Security', 'Class 0.5 Revenue Metering + SCADA / 4G'],
      ['Compliance', 'AS/NZS 3000, 4777, 5033, 5139 + Full ROI'],
      ['Support & SLA', '24/7 Priority SLA & Dedicated Account Engineer']
    ],
    quoteSlug: 'enterprise-comprehensive'
  }
};
