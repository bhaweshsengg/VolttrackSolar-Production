import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

const projects = [
  ['/images/img/img-600x400-1.jpg', 'Family Home Solar', 'Waikato', 'Residential solar designed around daytime household usage.'],
  ['/images/img/img-600x400-2.jpg', 'Small Business Solar', 'Auckland', 'Commercial generation designed to support daytime operating loads.'],
  ['/images/img/img-600x400-3.jpg', 'Solar + Battery', 'Canterbury', 'Solar generation paired with storage for more self-consumption.'],
  ['/images/img/img-600x400-4.jpg', 'Rural Property', 'Bay of Plenty', 'A practical system for a property with broader energy requirements.'],
  ['/images/img/img-600x400-5.jpg', 'Rooftop Solar', 'Wellington', 'A compact rooftop solution with an emphasis on efficient generation.'],
  ['/images/img/img-600x400-6.jpg', 'Business Energy Upgrade', 'Otago', 'A solar-focused upgrade designed to complement an existing site.']
];

export default function Projects() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Solar projects made for real properties"
        text="A look at the residential, commercial and storage-focused solutions that reflect our practical approach."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Featured Work"
            title="Designed around the property, not a template"
            text="Every site has different roof space, energy use and priorities. These examples show the range of solutions we can support."
          />

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Link to="/gallery" className="button button-primary">
              <Icon name="image" size={18} /> Browse Full Installation Gallery
            </Link>
          </div>

          <div className="project-grid project-grid-large">
            {projects.map(([image, title, location, text]) => (
              <ScrollReveal key={title}>
                <article className="project-detail">
                  <img src={image} alt={`${title} solar project in ${location}, New Zealand`} />
                  <div>
                    <span>{location}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-band">
        <div className="container quote-band-inner">
          <div>
            <span className="eyebrow">Explore Our Work</span>
            <h2>Want to see more completed installations?</h2>
            <p>Visit our photo gallery to view residential arrays, commercial rooftops, battery banks, and master electrical switchboards.</p>
          </div>
          <Link to="/gallery" className="button button-yellow">
            View Project Gallery <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
