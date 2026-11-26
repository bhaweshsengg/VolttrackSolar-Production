import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div>
        <Link className="brand footer-brand" to="/"><span className="brand-mark"><Icon name="sun" size={25} /></span><span>VoltTrack<span>Solar</span> <small>Solutions</small></span></Link>
        <p>Smarter solar and battery storage engineered for the Greater Wellington Region and across New Zealand, from custom system design through cyclone-rated installation and ongoing care.</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <Link to="/about">About Us</Link>
        <Link to="/services">Services</Link>
        <Link to="/product">Products</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/gallery">Project Gallery</Link>
        <Link to="/packages">Our Packages</Link>
        <Link to="/packages/details#package-specs">Package Specifications</Link>
        {/* <Link to="/testimonials">Testimonials</Link> */}
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <h3>Hardware &amp; Services</h3>
        <Link to="/product/solar-panels">Efficient Solar Panels</Link>
        <Link to="/product/hybrid-inverters">Hybrid Inverters</Link>
        <Link to="/product/solar-battery">Modular Solar Battery</Link>
        <Link to="/services/solar-installation">Solar Installation</Link>
        <Link to="/services/electrical">Electrical Services</Link>
        <Link to="/packages/residential/starter">Residential Starter Package</Link>
        <Link to="/packages/residential/comprehensive">Residential Comprehensive</Link>
        <Link to="/packages/enterprise/comprehensive">Enterprise Flagship Solar</Link>
      </div>
      <div>
        <h3>Start a Conversation</h3>
        <p className="contact-line"><Icon name="pin" size={18} /> <span>Greater Wellington Region</span></p>
        <p className="contact-line"><Icon name="phone" size={18} /> <a href="tel:+64224266006" style={{ color: '#BBF7D0' }}>+64 22 426 6006</a></p>
        <p className="contact-line"><Icon name="mail" size={18} /> <span>Direct site assessments &amp; estimates</span></p>
        <Link className="footer-cta" to="/quote">Request a free quote <Icon name="arrow" size={16} /></Link>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <span>© {new Date().getFullYear()} VoltTrackSolar Solutions. All rights reserved.</span>

        <a href="https://bizapps365.co.nz/" target="_blank" rel="noopener noreferrer">
          Designed &amp; Developed by BizApp365.
        </a>
      </div>
    </div>
  </footer>;
}
