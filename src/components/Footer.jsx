import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div>
        <Link className="brand footer-brand" to="/"><span className="brand-mark"><Icon name="sun" size={25}/></span><span>VoltTrack<span>Solar</span> <small>Solutions</small></span></Link>
        <p>Smarter solar energy for New Zealand homes and businesses, from system design through installation and ongoing care.</p>
      </div>
      <div><h3>Quick Links</h3><Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/projects">Projects</Link><Link to="/contact">Contact</Link></div>
      <div><h3>Services</h3><Link to="/services">Residential Solar</Link><Link to="/services">Commercial Solar</Link><Link to="/services">Battery Storage</Link><Link to="/services">Maintenance</Link></div>
      <div><h3>Start a Conversation</h3><p className="contact-line"><Icon name="mail" size={18}/> <span>Use our enquiry form for a direct response</span></p><p className="contact-line"><Icon name="phone" size={18}/> <span>NZ-wide enquiries</span></p><Link className="footer-cta" to="/quote">Request a free quote <Icon name="arrow" size={16}/></Link></div>
    </div>
    <div className="footer-bottom"><div className="container"><span>© {new Date().getFullYear()} VoltTrackSolar Solutions. All rights reserved.</span><span>Designed for Aotearoa New Zealand.</span></div></div>
  </footer>;
}
