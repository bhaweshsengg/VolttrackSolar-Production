import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import logo from '../../img/volttrackLogo.png';


const links = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/projects', 'Projects'], ['/testimonials', 'Testimonials'], ['/contact', 'Contact']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span><Icon name="pin" size={15}/> Serving homes & businesses across New Zealand</span>
          <span><Icon name="phone" size={15}/> NZ solar specialists</span>
        </div>
      </div>
      <header className="navbar">
        <div className="container nav-inner">
          <Link className="brand" to="/" onClick={close} aria-label="VoltTrack Solar Solutions Home">
            <img
              src={logo}
              alt="VoltTrack Solar Solutions"
              className="brand-logo"
            />
          </Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            <Icon name={open ? 'close' : 'menu'} size={24}/>
          </button>
          <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
            {links.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} className={({isActive}) => isActive ? 'active' : ''} onClick={close}>{label}</NavLink>)}
            <Link to="/quote" className="nav-cta" onClick={close}>Get A Free Quote <Icon name="arrow" size={17}/></Link>
          </nav>
          {location.pathname === '/quote' ? null : null}
        </div>
      </header>
    </>
  );
}
