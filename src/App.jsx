import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SolarInstallation from './pages/SolarInstallation';
import ElectricalServices from './pages/ElectricalServices';
import Product from './pages/Product';
import SolarPanels from './pages/SolarPanels';
import HybridInverters from './pages/HybridInverters';
import SolarBattery from './pages/SolarBattery';
import PackageDetails from './pages/PackageDetails';
import PackageDetailPage from './pages/PackageDetailPage';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Packages from './pages/Packages';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Quote from './pages/Quote';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Services & Submenus */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/solar-installation" element={<SolarInstallation />} />
          <Route path="/services/electrical" element={<ElectricalServices />} />

          {/* Product & Submenus */}
          <Route path="/product" element={<Product />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/solar-panels" element={<SolarPanels />} />
          <Route path="/product/efficient-solar-panels" element={<SolarPanels />} />
          <Route path="/product/hybrid-inverters" element={<HybridInverters />} />
          <Route path="/product/solar-battery" element={<SolarBattery />} />
          <Route path="/product/modular-solar-battery" element={<SolarBattery />} />

          {/* Projects & Gallery Submenu */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/gallery" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* Packages & Detailed Specifications */}
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/details" element={<PackageDetails />} />
          <Route path="/packages/residential/starter" element={<PackageDetailPage packageKey="residential-starter" />} />
          <Route path="/packages/residential-starter" element={<PackageDetailPage packageKey="residential-starter" />} />
          <Route path="/packages/residential/comprehensive" element={<PackageDetailPage packageKey="residential-comprehensive" />} />
          <Route path="/packages/residential-comprehensive" element={<PackageDetailPage packageKey="residential-comprehensive" />} />
          <Route path="/packages/enterprise/starter" element={<PackageDetailPage packageKey="enterprise-starter" />} />
          <Route path="/packages/enterprise-starter" element={<PackageDetailPage packageKey="enterprise-starter" />} />
          <Route path="/packages/enterprise/full" element={<PackageDetailPage packageKey="enterprise-full" />} />
          <Route path="/packages/enterprise-full" element={<PackageDetailPage packageKey="enterprise-full" />} />
          <Route path="/packages/enterprise/comprehensive" element={<PackageDetailPage packageKey="enterprise-comprehensive" />} />
          <Route path="/packages/enterprise-comprehensive" element={<PackageDetailPage packageKey="enterprise-comprehensive" />} />
          <Route path="/energy-controller" element={<PackageDetails defaultTab="controller" />} />
          <Route path="/energy-gateway" element={<PackageDetails defaultTab="gateway" />} />

          {/* Testimonials, Contact & Quote */}
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
