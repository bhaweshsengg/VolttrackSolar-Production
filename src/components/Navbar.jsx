import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import logo from '../../img/volttrackLogo.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  const close = () => {
    setOpen(false);
    setActiveDropdown(null);
    setActiveNestedSubmenu(null);
  };

  const toggleDropdown = (name, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveDropdown(prev => (prev === name ? null : name));
  };

  const toggleNestedSubmenu = (category, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveNestedSubmenu(prev => (prev === category ? null : category));
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    close();
  }, [location.pathname]);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <Icon name="pin" size={15} /> Serving homes &amp; businesses across New Zealand
          </span>
          <span className="contact-actions">
            <span className="specialist-text">
              <Icon name="phone" size={15} />
              <a href="tel:+64224266006" className="topbar-phone">
                NZ solar specialists
              </a>
            </span>
            <a
              href="https://wa.me/64224266006?text=Hi%20VoltTrack%2C%20I%27d%20like%20a%20free%20solar%20quote."
              target="_blank"
              rel="noreferrer"
            >
              +64 22 426 6006
            </a>
          </span>
        </div>
      </div>

      <header className="navbar" ref={navRef}>
        <div className="container nav-inner">
          <Link
            className="brand"
            to="/"
            onClick={close}
            aria-label="VoltTrack Solar Solutions Home"
          >
            <img
              src={logo}
              alt="VoltTrack Solar Solutions"
              className="brand-logo"
            />
          </Link>

          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>

          <nav
            className={`nav-links ${open ? 'nav-open' : ''}`}
            aria-label="Main Navigation"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={close}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={close}
            >
              About
            </NavLink>

            {/* Services with 2 submenus: Solar Installation, Electrical */}
            <div
              className={`nav-dropdown ${activeDropdown === 'services' ? 'dropdown-active' : ''}`}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="nav-dropdown-trigger-row">
                <NavLink
                  to="/services"
                  className={({ isActive }) => `nav-dropdown-link ${isActive ? 'active' : ''}`}
                  onClick={close}
                >
                  Services
                </NavLink>
                <button
                  type="button"
                  className="dropdown-chevron-btn"
                  onClick={(e) => toggleDropdown('services', e)}
                  aria-label="Toggle Services submenu"
                  aria-expanded={activeDropdown === 'services'}
                >
                  <Icon name="chevron-down" size={13} />
                </button>
              </div>

              <div className={`nav-submenu ${activeDropdown === 'services' ? 'nav-submenu-open' : ''}`} role="menu">
                <div className="submenu-header">
                  <span className="submenu-header-title">Services</span>
                  <span className="submenu-header-badge">Core Solutions</span>
                </div>
                <Link
                  to="/services/solar-installation"
                  className="submenu-item"
                  onClick={close}
                  role="menuitem"
                >
                  <div className="submenu-icon-wrap submenu-icon-small">
                    <Icon name="sun" size={18} />
                  </div>
                  <div className="submenu-item-text">
                    <span className="submenu-item-title">Solar Installation</span>
                    <span className="submenu-item-desc">Rooftop arrays &amp; turnkey installation</span>
                  </div>
                </Link>

                <Link
                  to="/services/electrical"
                  className="submenu-item"
                  onClick={close}
                  role="menuitem"
                >
                  <div className="submenu-icon-wrap submenu-icon-small">
                    <Icon name="wrench" size={18} />
                  </div>
                  <div className="submenu-item-text">
                    <span className="submenu-item-title">Electrical</span>
                    <span className="submenu-item-desc">Switchboards, EV circuits &amp; COV</span>
                  </div>
                </Link>

                <div className="submenu-footer">
                  <Link to="/services" className="submenu-footer-link" onClick={close}>
                    <span>View All Services</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Product with 3 submenus: Efficient Solar Panels, Hybrid Inverters, Modular Solar Battery */}
            <div
              className={`nav-dropdown ${activeDropdown === 'product' ? 'dropdown-active' : ''}`}
              onMouseEnter={() => setActiveDropdown('product')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="nav-dropdown-trigger-row">
                <NavLink
                  to="/product"
                  className={({ isActive }) => `nav-dropdown-link ${isActive ? 'active' : ''}`}
                  onClick={close}
                >
                  Product
                </NavLink>
                <button
                  type="button"
                  className="dropdown-chevron-btn"
                  onClick={(e) => toggleDropdown('product', e)}
                  aria-label="Toggle Product submenu"
                  aria-expanded={activeDropdown === 'product'}
                >
                  <Icon name="chevron-down" size={13} />
                </button>
              </div>

              <div className={`nav-submenu ${activeDropdown === 'product' ? 'nav-submenu-open' : ''}`} role="menu">
                <div className="submenu-header">
                  <span className="submenu-header-title">Product Line</span>
                  {/*    <span className="submenu-header-badge"></span> */}
                </div>

                <Link
                  to="/product/solar-panels"
                  className="submenu-item"
                  onClick={close}
                  role="menuitem"
                >
                  <div className="submenu-icon-wrap submenu-icon-small">
                    <Icon name="layers" size={18} />
                  </div>
                  <div className="submenu-item-text">
                    <span className="submenu-item-title">Efficient Solar Panels</span>
                    <span className="submenu-item-desc">N-Type TOPCon &amp; Bifacial technology</span>
                  </div>
                </Link>

                <Link
                  to="/product/hybrid-inverters"
                  className="submenu-item"
                  onClick={close}
                  role="menuitem"
                >
                  <div className="submenu-icon-wrap submenu-icon-small">
                    <Icon name="zap" size={18} />
                  </div>
                  <div className="submenu-item-text">
                    <span className="submenu-item-title">Hybrid Inverters</span>
                    <span className="submenu-item-desc">Single &amp; three-phase intelligent power</span>
                  </div>
                </Link>

                <Link
                  to="/product/solar-battery"
                  className="submenu-item"
                  onClick={close}
                  role="menuitem"
                >
                  <div className="submenu-icon-wrap submenu-icon-small">
                    <Icon name="battery" size={18} />
                  </div>
                  <div className="submenu-item-text">
                    <span className="submenu-item-title">Modular Solar Battery</span>
                    <span className="submenu-item-desc">Scalable LiFePO4 storage &amp; blackout power</span>
                  </div>
                </Link>

                <div className="submenu-footer">
                  <Link to="/product" className="submenu-footer-link" onClick={close}>
                    <span>View Full Product Catalog</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Project with Gallery submenu */}
            <div
              className={`nav-dropdown ${activeDropdown === 'projects' ? 'dropdown-active' : ''}`}
              onMouseEnter={() => setActiveDropdown('projects')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="nav-dropdown-trigger-row">
                <NavLink
                  to="/projects"
                  className={({ isActive }) => `nav-dropdown-link ${isActive ? 'active' : ''}`}
                  onClick={close}
                >
                  Projects
                </NavLink>
                <button
                  type="button"
                  className="dropdown-chevron-btn"
                  onClick={(e) => toggleDropdown('projects', e)}
                  aria-label="Toggle Projects submenu"
                  aria-expanded={activeDropdown === 'projects'}
                >
                  <Icon name="chevron-down" size={13} />
                </button>
              </div>

              <div className={`nav-submenu ${activeDropdown === 'projects' ? 'nav-submenu-open' : ''}`} role="menu">
                <div className="submenu-header">
                  <span className="submenu-header-title">Our Work</span>
                  <span className="submenu-header-badge">NZ Portfolio</span>
                </div>

                <Link
                  to="/gallery"
                  className="submenu-item"
                  onClick={close}
                  role="menuitem"
                >
                  <div className="submenu-icon-wrap submenu-icon-small">
                    <Icon name="image" size={18} />
                  </div>
                  <div className="submenu-item-text">
                    <span className="submenu-item-title">Gallery</span>
                    <span className="submenu-item-desc">Browse installation photo showcase</span>
                  </div>
                </Link>

                <div className="submenu-footer">
                  <Link to="/projects" className="submenu-footer-link" onClick={close}>
                    <span>View All Featured Projects</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Our Packages with 2 main submenu categories: Residential Solar, Enterprise */}
            <div
              className={`nav-dropdown nav-dropdown-packages ${activeDropdown === 'packages' ? 'dropdown-active' : ''}`}
              onMouseEnter={() => setActiveDropdown('packages')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="nav-dropdown-trigger-row">
                <NavLink
                  to="/packages"
                  className={({ isActive }) => `nav-dropdown-link ${isActive ? 'active' : ''}`}
                  onClick={close}
                >
                  Our Packages
                </NavLink>
                <button
                  type="button"
                  className="dropdown-chevron-btn"
                  onClick={(e) => toggleDropdown('packages', e)}
                  aria-label="Toggle Our Packages submenu"
                  aria-expanded={activeDropdown === 'packages'}
                >
                  <Icon name="chevron-down" size={13} />
                </button>
              </div>

              <div
                className={`nav-submenu nav-submenu-packages ${activeDropdown === 'packages' ? 'nav-submenu-open' : ''}`}
                role="menu"
              >
                <div className="packages-submenu-grid">
                  {/* Category 1: Residential Solar */}
                  <div className="packages-submenu-category">
                    <div
                      className="category-header-row"
                      onClick={(e) => toggleNestedSubmenu('residential', e)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={activeNestedSubmenu !== 'enterprise'}
                    >
                      <div className="category-header-info">
                        <span className="category-header-icon category-icon-residential">
                          <Icon name="home" size={15} />
                        </span>
                        <div className="category-header-text">
                          <span className="category-title">Residential Solar</span>
                          <span className="category-subtitle">Kiwi Homes</span>
                        </div>
                      </div>
                      <span className="category-badge">2 Packages</span>
                    </div>

                    <div className={`category-items-list ${activeNestedSubmenu === 'enterprise' ? 'category-hidden-mobile' : ''}`}>
                      <Link
                        to="/packages/residential/starter"
                        className="submenu-item nested-submenu-item"
                        onClick={close}
                        role="menuitem"
                      >
                        <div className="submenu-icon-wrap submenu-icon-small">
                          <Icon name="sun" size={16} />
                        </div>
                        <div className="submenu-item-text">
                          <span className="submenu-item-title">Starter Package</span>
                          <span className="submenu-item-desc">4.5kW – 5kW clean rooftop energy</span>
                        </div>
                      </Link>

                      <Link
                        to="/packages/residential/comprehensive"
                        className="submenu-item nested-submenu-item"
                        onClick={close}
                        role="menuitem"
                      >
                        <div className="submenu-icon-wrap submenu-icon-small">
                          <Icon name="star" size={16} />
                        </div>
                        <div className="submenu-item-text">
                          <span className="submenu-item-title">Comprehensive Package</span>
                          <span className="submenu-item-desc">8.67kW + 10kWh battery-ready</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Category 2: Enterprise */}
                  <div className="packages-submenu-category">
                    <div
                      className="category-header-row"
                      onClick={(e) => toggleNestedSubmenu('enterprise', e)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={activeNestedSubmenu !== 'residential'}
                    >
                      <div className="category-header-info">
                        <span className="category-header-icon category-icon-enterprise">
                          <Icon name="building" size={15} />
                        </span>
                        <div className="category-header-text">
                          <span className="category-title">Enterprise</span>
                          <span className="category-subtitle">Commercial &amp; Industrial</span>
                        </div>
                      </div>
                      <span className="category-badge enterprise-badge">3 Packages</span>
                    </div>

                    <div className={`category-items-list ${activeNestedSubmenu === 'residential' ? 'category-hidden-mobile' : ''}`}>
                      <Link
                        to="/packages/enterprise/starter"
                        className="submenu-item nested-submenu-item"
                        onClick={close}
                        role="menuitem"
                      >
                        <div className="submenu-icon-wrap submenu-icon-small">
                          <Icon name="zap" size={16} />
                        </div>
                        <div className="submenu-item-text">
                          <span className="submenu-item-title">Starter Package</span>
                          <span className="submenu-item-desc">10kW – 15kW small business</span>
                        </div>
                      </Link>

                      <Link
                        to="/packages/enterprise/full"
                        className="submenu-item nested-submenu-item"
                        onClick={close}
                        role="menuitem"
                      >
                        <div className="submenu-icon-wrap submenu-icon-small">
                          <Icon name="layers" size={16} />
                        </div>
                        <div className="submenu-item-text">
                          <span className="submenu-item-title">Full Package</span>
                          <span className="submenu-item-desc">30kW – 50kW commercial power</span>
                        </div>
                      </Link>

                      <Link
                        to="/packages/enterprise/comprehensive"
                        className="submenu-item nested-submenu-item"
                        onClick={close}
                        role="menuitem"
                      >
                        <div className="submenu-icon-wrap submenu-icon-small">
                          <Icon name="crown" size={16} />
                        </div>
                        <div className="submenu-item-text">
                          <span className="submenu-item-title">Comprehensive Package</span>
                          <span className="submenu-item-desc">50kW+ BESS microgrid &amp; EV</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="submenu-footer">
                  <Link to="/packages" className="submenu-footer-link" onClick={close}>
                    <span>View All Packages &amp; Compare Options</span>
                    <Icon name="arrow" size={13} />
                  </Link>
                </div>
              </div>
            </div>

            <NavLink
              to="/testimonials"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={close}
            >
              Testimonials
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={close}
            >
              Contact
            </NavLink>

            <Link to="/quote" className="nav-cta" onClick={close}>
              Get A Free Quote <Icon name="arrow" size={17} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
