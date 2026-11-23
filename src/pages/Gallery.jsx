import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const galleryItems = [
  {
    image: '/images/img/img-600x400-1.jpg',
    title: 'Modern Suburban Rooftop Array',
    category: 'residential',
    categoryLabel: 'Residential Solar',
    location: 'Hamilton, Waikato',
    specs: '8.4 kW PV • Monocrystalline Panels'
  },
  {
    image: '/images/img/img-600x400-2.jpg',
    title: 'Commercial Distribution Centre',
    category: 'commercial',
    categoryLabel: 'Commercial Solar',
    location: 'Mount Wellington, Auckland',
    specs: '65 kW Commercial PV • Three-Phase Inverter'
  },
  {
    image: '/images/img/img-600x400-3.jpg',
    title: 'Solar & Modular Storage Integration',
    category: 'batteries',
    categoryLabel: 'Battery Storage',
    location: 'Christchurch, Canterbury',
    specs: '10 kW Solar + 15.36 kWh LiFePO4 Storage'
  },
  {
    image: '/images/img/img-600x400-4.jpg',
    title: 'Orchard & Packhouse Array',
    category: 'commercial',
    categoryLabel: 'Commercial Solar',
    location: 'Tauranga, Bay of Plenty',
    specs: '42 kW Agribusiness Solar System'
  },
  {
    image: '/images/img/img-600x400-5.jpg',
    title: 'High-Wind Coastal Installation',
    category: 'installation',
    categoryLabel: 'Electrical & Installation',
    location: 'Wellington Coastal Hills',
    specs: 'Engineered Clamps & Cyclone-Rated Racking'
  },
  {
    image: '/images/img/img-600x400-6.jpg',
    title: 'Manufacturing Facility Solar Retrofit',
    category: 'commercial',
    categoryLabel: 'Commercial Solar',
    location: 'Dunedin, Otago',
    specs: '88 kW Commercial Array + SCADA Gateway'
  },
  {
    image: '/images/img/feature.jpg',
    title: 'Architectural Home & Energy Controller',
    category: 'residential',
    categoryLabel: 'Residential Solar',
    location: 'Queenstown, Lakes District',
    specs: '12 kW All-Black Panels + Smart Water Diverter'
  },
  {
    image: '/images/img/about.jpg',
    title: 'Precision Rooftop Commissioning',
    category: 'installation',
    categoryLabel: 'Electrical & Installation',
    location: 'Palmerston North, Manawatū',
    specs: 'Master Electricians Final Inspection & COV'
  },
  {
    image: '/images/img/carousel-2.jpg',
    title: 'Off-Grid Rural Battery Reserve',
    category: 'batteries',
    categoryLabel: 'Battery Storage',
    location: 'Rotorua, Bay of Plenty',
    specs: '20.48 kWh Battery Bank + Emergency ATS'
  }
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Projects • Gallery"
        title="Project Gallery"
        text="A visual showcase of our residential, commercial, battery storage, and custom electrical solar installations across Aotearoa New Zealand."
      />

      <section className="section gallery-section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Portfolio &amp; Workmanship"
            title="Real Installations Built to Perform"
            text="Explore photographs of completed projects demonstrating our neat cable management, robust mounting, and clean aesthetic standards."
          />

          {/* Filter Pills */}
          <div className="gallery-filter-bar">
            {[
              ['all', 'All Projects'],
              ['residential', 'Residential Solar'],
              ['commercial', 'Commercial Solar'],
              ['batteries', 'Battery Storage'],
              ['installation', 'Electrical & Installation']
            ].map(([cat, label]) => (
              <button
                key={cat}
                type="button"
                className={`gallery-filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item, idx) => (
              <ScrollReveal key={idx}>
                <div
                  className="gallery-card"
                  onClick={() => setSelectedImage(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo of ${item.title}`}
                >
                  <div className="gallery-img-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="gallery-card-overlay">
                      <span className="gallery-zoom-icon">
                        <Icon name="image" size={24} />
                      </span>
                      <span className="gallery-view-text">Click to preview</span>
                    </div>
                  </div>
                  <div className="gallery-info">
                    <span className="gallery-cat-badge">{item.categoryLabel}</span>
                    <h3 className="gallery-title">{item.title}</h3>
                    <div className="gallery-meta">
                      <span><Icon name="pin" size={14} /> {item.location}</span>
                      <span><Icon name="sun" size={14} /> {item.specs}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedImage && (
            <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
              <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close modal"
                >
                  <Icon name="close" size={24} />
                </button>
                <img src={selectedImage.image} alt={selectedImage.title} className="lightbox-img" />
                <div className="lightbox-details">
                  <span className="gallery-cat-badge">{selectedImage.categoryLabel}</span>
                  <h3>{selectedImage.title}</h3>
                  <p><Icon name="pin" size={15} /> {selectedImage.location} &bull; {selectedImage.specs}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Start Your Project</span>
            <h2>Want a clean, high-performance solar installation like these?</h2>
            <p>Tell us about your property and our engineering team will provide a tailored quote and layout proposal.</p>
          </div>
          <Link to="/quote" className="button button-yellow">
            Get A Free Solar Quote <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
