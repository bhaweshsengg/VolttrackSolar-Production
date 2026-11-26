import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ScrollReveal from '../components/ScrollReveal';
import Icon from '../components/Icon';

export default function About() {
    return (
        <>
            <PageHero
                eyebrow="About VoltTrackSolar"
                title="Solar expertise with a Wellington Region focus"
                text="Practical renewable energy solutions for homes, businesses and properties across Aotearoa."
            />

            <section className="section">
                <div className="container split-grid">
                    <ScrollReveal>
                        <img className="rounded-image" src="/images/img/about.jpg" alt="Solar panels and clean energy solution" />
                    </ScrollReveal>
                    <ScrollReveal>
                        <div>
                            <SectionHeading
                                eyebrow="Who We Are"
                                title="Helping New Zealand make better use of the sun"
                                text="VoltTrackSolar Solutions is built around a simple idea: solar should be understandable, well designed and useful in everyday life. We work with homeowners and businesses to turn available roof space and energy data into practical solar solutions."
                            />
                            <p>Our approach brings system design, solar panel installation, battery storage and maintenance together, so customers have one clear path from first enquiry to long-term support.</p>
                            <div className="about-values">
                                <div>
                                    <Icon name="design" />
                                    <strong>Practical design</strong>
                                    <span>Systems matched to the property and energy profile.</span>
                                </div>
                                <div>
                                    <Icon name="check" />
                                    <strong>Quality workmanship</strong>
                                    <span>Careful installation and commissioning.</span>
                                </div>
                                <div>
                                    <Icon name="battery" />
                                    <strong>Future ready</strong>
                                    <span>Options for storage and evolving energy needs.</span>
                                </div>
                                <div>
                                    <Icon name="wind" />
                                    <strong>Wellington engineered</strong>
                                    <span>Cyclone-rated racking &amp; coastal salt-mist protection.</span>
                                </div>
                            </div>
                            <Link className="button button-primary" to="/quote">
                                Talk to our team <Icon name="arrow" size={18} />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Wellington Region Engineering Highlights */}
            <section className="section wellington-about-section" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
                <div className="container">
                    <SectionHeading
                        align="center"
                        eyebrow="Local Wellington Focus"
                        title="Why Wellington Demands Specialized Solar Engineering"
                        text="Wellington’s unique terrain, Cook Strait wind funneling, and coastal microclimates require tailored system engineering rather than one-size-fits-all kits."
                    />

                    <div className="about-values" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: '32px' }}>
                        <div>
                            <Icon name="wind" />
                            <strong>Severe Wind Loading</strong>
                            <span>Engineered to AS/NZS 1170.2 standards with Clenergy S6 cyclone racking for High &amp; Very High wind zones across Wellington hills.</span>
                        </div>
                        <div>
                            <Icon name="shield" />
                            <strong>Marine Coastal Protection</strong>
                            <span>316-grade stainless fasteners and anodized alloy rails resistant to salt-laden spray from Cook Strait and coastal bays.</span>
                        </div>
                        <div>
                            <Icon name="zap" />
                            <strong>Network Lines Approvals</strong>
                            <span>Full Part 6 distributed generation approvals managed directly with Wellington Electricity, Electra, and Powerco.</span>
                        </div>
                        <div>
                            <Icon name="award" />
                            <strong>Certified Master Electricians</strong>
                            <span>All work completed by registered NZ electricians with official COC &amp; ROI documentation submitted for every installation.</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-light">
                <div className="container">
                    <SectionHeading
                        align="center"
                        eyebrow="Our Approach"
                        title="A solar process without the guesswork"
                    />
                    <div className="process-grid">
                        <Step n="01" title="Understand" text="We learn about your property, energy use, goals and constraints." />
                        <Step n="02" title="Design" text="We recommend a right-sized solar and storage approach for your needs." />
                        <Step n="03" title="Install" text="Your system is installed, tested and commissioned with care." />
                        <Step n="04" title="Support" text="We remain available for maintenance, questions and future upgrades." />
                    </div>
                </div>
            </section>
        </>
    );
}

function Step({ n, title, text }) {
    return (
        <ScrollReveal>
            <div className="process-card">
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </ScrollReveal>
    );
}
