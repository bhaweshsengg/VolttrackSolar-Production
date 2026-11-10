import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';
import EnquiryForm from '../components/EnquiryForm';

const slides = [
  { image: '/images/img/carousel-1.jpg', title: 'Smarter Solar Energy For New Zealand', text: 'Generate more of your own clean electricity with a solar system designed around your home, business and energy goals.' },
  { image: '/images/img/carousel-2.jpg', title: 'Power Your Day. Store Your Sunshine.', text: 'Pair quality solar panels with battery storage to make more of the energy you generate and reduce your reliance on the grid.' },
  { image: '/images/img/carousel-3.jpg', title: 'Solar Solutions Built For Aotearoa', text: 'From site assessment to installation and maintenance, get practical solar support from a team focused on long-term performance.' },
];
const services = [
  ['home','Residential Solar','Smart rooftop solar solutions for Kiwi homes, designed to fit your roof, household usage and future energy plans.'],
  ['building','Commercial Solar','Reduce operating costs with solar generation tailored to offices, retail, workshops, farms and other commercial sites.'],
  ['sun','Solar Panel Installation','Professional installation with careful system placement, commissioning and handover for dependable generation.'],
  ['battery','Solar Battery Storage','Store surplus solar for later use and increase your energy independence with a battery system sized to your needs.'],
  ['design','Solar System Design','Data-led system sizing, roof assessment and energy planning to help you get the right balance of generation and storage.'],
  ['wrench','Solar Maintenance','Ongoing checks, troubleshooting and maintenance support to help keep your solar investment performing year after year.'],
];
const projects = [
  ['/images/img/img-600x400-1.jpg','Residential Solar','Waikato'],['/images/img/img-600x400-2.jpg','Commercial Solar','Auckland'],['/images/img/img-600x400-3.jpg','Solar + Battery','Canterbury'],['/images/img/img-600x400-4.jpg','Rural Solar','Bay of Plenty']
];
const testimonials = [
  ['Sarah M.','Hamilton, Waikato','The team made the whole process straightforward. We now use more of our own solar power during the day and have a clear plan for adding storage.'],
  ['James R.','Auckland','From the site assessment to commissioning, communication was excellent. The system was installed neatly and the handover was easy to understand.'],
  ['Priya & Daniel','Christchurch','We wanted a practical system rather than the biggest system. VoltTrackSolar explained the options clearly and designed something that fits how we actually use energy.'],
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => { const id = setInterval(() => setSlide(s => (s+1)%slides.length), 6000); return () => clearInterval(id); }, []);
  const current = slides[slide];
  return <>
    <section className="hero">
      {slides.map((s,i) => <img key={s.image} className={`hero-bg ${i===slide ? 'show' : ''}`} src={s.image} alt="Solar panels and renewable energy in New Zealand" />)}
      <div className="hero-overlay" />
      <div className="container hero-content">
        <ScrollReveal><span className="hero-kicker"><Icon name="sun" size={17}/> Clean energy. Local expertise. Smarter choices.</span><h1>{current.title}</h1><p>{current.text}</p><div className="hero-actions"><Link to="/quote" className="button button-primary">Get A Free Quote <Icon name="arrow" size={18}/></Link><Link to="/services" className="button button-light">Explore Solar Services</Link></div></ScrollReveal>
      </div>
      <div className="hero-dots">{slides.map((s,i)=><button key={s.image} className={i===slide?'active':''} onClick={()=>setSlide(i)} aria-label={`Show slide ${i+1}`} />)}</div>
    </section>

    <section className="stats-section"><div className="container stats-grid"><Stat icon="home" number="100%" label="NZ-focused solutions"/><Stat icon="sun" number="6" label="Core solar services"/><Stat icon="battery" number="1" label="End-to-end approach"/><Stat icon="check" number="24/7" label="Energy working for you"/></div></section>

    <section className="section about-preview"><div className="container split-grid"><ScrollReveal><div className="image-card"><img src="/images/img/about.jpg" alt="Solar energy installation in New Zealand"/><div className="image-badge"><strong>Solar made practical</strong><span>Designed around your energy use</span></div></div></ScrollReveal><ScrollReveal><div><SectionHeading eyebrow="About VoltTrackSolar" title="A practical path to cleaner, smarter energy" text="VoltTrackSolar Solutions helps New Zealand homeowners and businesses move towards more affordable, resilient and sustainable energy. We focus on the details that matter: the right system size, quality installation, useful storage and dependable aftercare."/><ul className="check-list"><li><Icon name="check"/> Solar systems designed around real energy usage</li><li><Icon name="check"/> Clear advice without one-size-fits-all packages</li><li><Icon name="check"/> Installation, commissioning and ongoing support</li></ul><Link to="/about" className="text-link">Learn more about VoltTrackSolar <Icon name="arrow" size={17}/></Link></div></ScrollReveal></div></section>

    {/* <section className="section section-light"><div className="container"><SectionHeading align="center" eyebrow="Our Services" title="Solar solutions for the way New Zealand lives and works" text="From your first site assessment to long-term maintenance, we make solar easier to understand and easier to manage."/><div className="service-grid">{services.map(([icon,title,text])=><ScrollReveal key={title}><article className="service-card"><div className="service-icon"><Icon name={icon}/></div><h3>{title}</h3><p>{text}</p><Link to="/services" className="card-link">Learn more <Icon name="arrow" size={16}/></Link></article></ScrollReveal>)}</div></div></section> */}

    
<section class="section-light">
  <div class="container">
 
    <div class="section-heading">
      <span class="eyebrow">Our Services</span>
      <h2>Solar solutions for the way New Zealand lives and works</h2>
      <p>From your first site assessment to long-term maintenance, we make solar easier to understand and easier to manage.</p>
    </div>
 
    <div class="service-grid">
 
      <div>
        <article class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f7d5c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3.2"/>
              <path d="M12 3.5v2.2M12 18.3v2.2M4.8 12H7M17 12h2.2M6.5 6.5l1.5 1.5M16 16l1.5 1.5M17.5 6.5 16 8M8 16l-1.5 1.5" stroke-opacity=".85"/>
            </svg>
          </div>
          <div class="service-card__body">
            <div class="service-card__head">
              <h3>Residential Solar</h3>
              <p class="service-card__label">01</p>
            </div>
            <p>Smart rooftop solar solutions for Kiwi homes, designed to fit your roof, household usage and future energy plans.</p>
              <a class="card-link" href="/services">Learn more
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
          </div>
        </article>
      </div>
 
      <div>
        <article class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f7d5c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 20V9.5L9 5l6 4.5V20"/>
              <path d="M15 20v-7l6-4v11"/>
              <path d="M6 20v-4h6v4" stroke-opacity=".8"/>
            </svg>
          </div>
          <div class="service-card__body">
            <div class="service-card__head">
              <h3>Commercial Solar</h3>
              <p class="service-card__label">02</p>
            </div>
            <p>Reduce operating costs with solar generation tailored to offices, retail, workshops, farms and other commercial sites.</p>
              <a class="card-link" href="/services">Learn more
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
          </div>
        </article>
      </div>
 
      <div>
        <article class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f7d5c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 8l7-4 9 4-9 4-9-4z"/>
              <path d="M4 8v8l7 4M20 8v8l-9 4" stroke-opacity=".8"/>
              <path d="M11 12v8" stroke-opacity=".8"/>
            </svg>
          </div>
          <div class="service-card__body">
            <div class="service-card__head">
              <h3>Solar Panel Installation</h3>
              <p class="service-card__label">03</p>
            </div>
            <p>Professional installation with careful system placement, commissioning and handover for dependable generation.</p>
              <a class="card-link" href="/services">Learn more
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
          </div>
        </article>
      </div>
 
      <div>
        <article class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f7d5c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <rect x="7" y="3.5" width="10" height="17" rx="2"/>
              <path d="M10 3.5V2h4v1.5" stroke-opacity=".8"/>
              <path d="M13.5 9l-3.5 4.6h3L11.5 18l3.7-5H12l1.5-4z" fill="#2f7d5c" fill-opacity=".15"/>
            </svg>
          </div>
          <div class="service-card__body">
            <div class="service-card__head">
              <h3>Solar Battery Storage</h3>
              <p class="service-card__label">04</p>
            </div>
            <p>Store surplus solar for later use and increase your energy independence with a battery system sized to your needs.</p>
              <a class="card-link" href="/services">Learn more
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
          </div>
        </article>
      </div>
 
      <div>
        <article class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f7d5c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3.5 20V6l8-3 8 3v14" stroke-opacity=".8"/>
              <path d="M3.5 20h16"/>
              <path d="M8 20v-5.5h8V20" stroke-opacity=".8"/>
              <path d="M9.5 9h5M9.5 12h5" stroke-opacity=".55"/>
            </svg>
          </div>
          <div class="service-card__body">
            <div class="service-card__head">
              <h3>Solar System Design</h3>
              <p class="service-card__label">05</p>
            </div>
            <p>Data-led system sizing, roof assessment and energy planning to help you get the right balance of generation and storage.</p>
              <a class="card-link" href="/services">Learn more
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
          </div>
        </article>
      </div>
 
      <div>
        <article class="service-card">
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2f7d5c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3l7 3v5.5c0 4.6-3 7.8-7 9.5-4-1.7-7-4.9-7-9.5V6l7-3z" stroke-opacity=".85"/>
              <path d="M9 12l2 2 4-4.5"/>
            </svg>
          </div>
          <div class="service-card__body">
            <div class="service-card__head">
              <h3>Solar Maintenance</h3>
              <p class="service-card__label">06</p>
            </div>
            <p>Ongoing checks, troubleshooting and maintenance support to help keep your solar investment performing year after year.</p>
              <a class="card-link" href="/services">Learn more
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
          </div>
        </article>
      </div>
 
    </div>
  </div>
</section>

    <section className="section why-section"><div className="container split-grid reverse"><ScrollReveal><div><SectionHeading eyebrow="Why Choose Us" title="Solar decisions made clear" text="A good solar system is more than panels on a roof. We look at your energy use, site, future plans and practical installation requirements before recommending a solution."/><div className="mini-features"><Mini icon="design" title="Right-sized design" text="Balanced generation and storage based on your property and usage."/><Mini icon="check" title="Quality installation" text="Careful installation, testing and commissioning from start to finish."/><Mini icon="battery" title="Built for tomorrow" text="Flexible solutions that can grow with changing energy needs."/><Mini icon="wrench" title="Ongoing support" text="Maintenance and troubleshooting when you need a hand."/></div></div></ScrollReveal><ScrollReveal><div className="feature-image"><img src="/images/img/feature.jpg" alt="Solar panels on a modern property"/><div className="floating-card"><span>Make more of your sunshine</span><strong>Generate • Store • Save</strong></div></div></ScrollReveal></div></section>

    <section className="section projects-section"><div className="container"><SectionHeading align="center" eyebrow="Featured Projects" title="Solar projects across Aotearoa" text="Examples of the kinds of residential, commercial and storage-focused solutions we can deliver."/><div className="project-grid">{projects.map(([image,title,location])=><article className="project-card" key={title+location}><img src={image} alt={`${title} solar project in ${location}, New Zealand`}/><div><span>{location}</span><h3>{title}</h3></div></article>)}</div><div className="center-button"><Link to="/projects" className="button button-outline">View Projects <Icon name="arrow" size={17}/></Link></div></div></section>

    <section className="quote-band"><div className="container quote-band-inner"><div><span className="eyebrow">Ready when you are</span><h2>See what solar could look like for your property.</h2><p>Tell us a little about your home or business and we’ll help you understand the next steps.</p></div><Link to="/quote" className="button button-yellow">Get A Free Quote <Icon name="arrow" size={18}/></Link></div></section>

    <section className="section testimonial-section"><div className="container"><SectionHeading align="center" eyebrow="Testimonials" title="What our clients say" text="Clear communication and practical advice are part of every project."/><div className="testimonial-grid">{testimonials.map(([name,location,text])=><article className="testimonial-card" key={name}><div className="quote-mark">“</div><p>{text}</p><strong>{name}</strong><span>{location}</span></article>)}</div></div></section>

    <section className="section form-section"><div className="container form-layout"><div><SectionHeading eyebrow="Start Your Solar Journey" title="Let’s talk about your energy goals" text="Whether you are comparing solar options, planning a new build or ready for a quote, send us your details and our team can help with the next step."/><div className="form-points"><p><Icon name="check"/> No-obligation initial discussion</p><p><Icon name="check"/> Residential and commercial options</p><p><Icon name="check"/> Solar, battery and maintenance support</p></div></div><EnquiryForm type="quote" compact/></div></section>
  </>;
}
function Stat({icon,number,label}){return <div className="stat"><div className="stat-icon"><Icon name={icon}/></div><div><strong>{number}</strong><span>{label}</span></div></div>}
function Mini({icon,title,text}){return <div className="mini"><div className="mini-icon"><Icon name={icon} size={19}/></div><div><h4>{title}</h4><p>{text}</p></div></div>}
