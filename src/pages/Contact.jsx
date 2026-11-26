import React from 'react';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import EnquiryForm from '../components/EnquiryForm';
import Icon from '../components/Icon';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us • Greater Wellington Specialists"
        title="Let’s talk solar for your Wellington property"
        text="Have a question, planning a new installation, or want to understand your solar and battery options? Send us a message for quick, local advice."
      />

      <section className="section">
        <div className="container form-layout contact-layout">
          <div>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Tell us what you need"
              text="Fill out the form with your location, property type, and energy goals. Our Wellington engineering team will assess your site and get back to you promptly."
            />

            <div className="contact-cards">
              <div>
                <Icon name="mail" />
                <h3>Direct Online Enquiry</h3>
                <p>Use the form for an expedited site review and solar estimate</p>
              </div>

              <div>
                <Icon name="pin" />
                <h3>Regional Coverage</h3>
                <p>Greater Wellington Region: Wellington City, Lower Hutt, Upper Hutt, Porirua, Kapiti Coast &amp; Wairarapa</p>
              </div>

              <div>
                <Icon name="phone" />
                <h3>Phone &amp; WhatsApp</h3>
                <p>
                  <a href="tel:+64224266006" style={{ color: 'var(--primary)', fontWeight: '700' }}>+64 22 426 6006</a> (NZ Solar Specialists)
                </p>
              </div>

              <div>
                <Icon name="sun" />
                <h3>Complete Capabilities</h3>
                <p>Rooftop solar, battery storage, heat pumps, EV chargers &amp; Master Electrician certification</p>
              </div>
            </div>
          </div>

          <EnquiryForm type="contact" />
        </div>
      </section>
    </>
  );
}

