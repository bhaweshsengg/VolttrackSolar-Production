import React, { useState } from 'react';
import FormStatus from './FormStatus';

const initial = { name: '', email: '', phone: '', propertyType: '', location: '', message: '', b_hp_field: '' };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nzPhoneRe = /^(?:\+64\s?\(?0?\)?|\(?0)[2346798][\d\s().-]{6,14}$/;
const fieldLimits = { name: 100, email: 254, phone: 30, propertyType: 50, location: 120, message: 2000 };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  else if (values.name.trim().length > fieldLimits.name) errors.name = 'Name is too long.';
  if (!emailRe.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!nzPhoneRe.test(values.phone.trim())) errors.phone = 'Enter a valid New Zealand phone number.';
  if (!values.propertyType) errors.propertyType = 'Please select a property type.';
  if (!values.location.trim()) errors.location = 'Location is required.';
  if (!values.message.trim()) errors.message = 'Message is required.';
  else if (values.message.trim().length > fieldLimits.message) errors.message = 'Message must be 2,000 characters or fewer.';
  return errors;
}

export default function EnquiryForm({ type = 'quote', compact = false }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const title = type === 'quote' ? 'Request your free solar quote' : 'Send us an enquiry';

  const update = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    setErrors(current => ({ ...current, [name]: '' }));
  };

  const submit = async e => {
    e.preventDefault();
    if (submitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      propertyType: values.propertyType,
      location: values.location,
      message: values.message,
      formType: type,
      b_hp_field: values.b_hp_field
    };

    const fingerprint = JSON.stringify({
      name: values.name,
      email: values.email,
      phone: values.phone,
      propertyType: values.propertyType,
      location: values.location,
      message: values.message,
      formType: type
    });

    if (sessionStorage.getItem('lastEnquiry') === fingerprint) {
      setStatus({ type: 'error', message: 'This enquiry has already been submitted.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: 'loading', message: 'Sending your enquiry…' });

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors && typeof data.errors === 'object') {
          setErrors(data.errors);
        }
        throw new Error(data.message || 'Unable to send your enquiry.');
      }

      sessionStorage.setItem('lastEnquiry', fingerprint);
      setValues(initial);
      setStatus({
        type: 'success',
        message: data.message || 'Thanks — your enquiry has been sent. Our team will be in touch soon.'
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={`enquiry-form ${compact ? 'compact' : ''}`} onSubmit={submit} noValidate>
      {/* Honeypot field for anti-spam bots */}
      <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="b_hp_field">Leave this field blank</label>
        <input
          id="b_hp_field"
          type="text"
          name="b_hp_field"
          value={values.b_hp_field}
          onChange={update}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className="form-heading">
        <span className="eyebrow">{type === 'quote' ? 'Free, no-obligation quote' : 'Talk to our team'}</span>
        <h3>{title}</h3>
      </div>
      <div className="form-grid">
        <Field label="Full name" name="name" value={values.name} onChange={update} error={errors.name} placeholder="Your name" maxLength={fieldLimits.name} required />
        <Field label="Email address" name="email" value={values.email} onChange={update} error={errors.email} placeholder="you@example.com" type="email" maxLength={fieldLimits.email} required />
        <Field label="NZ phone number" name="phone" value={values.phone} onChange={update} error={errors.phone} placeholder="021 123 4567" maxLength={fieldLimits.phone} required />
        <div className="field">
          <label htmlFor="propertyType">Property type <span>*</span></label>
          <select id="propertyType" name="propertyType" value={values.propertyType} onChange={update} aria-invalid={!!errors.propertyType} aria-describedby={errors.propertyType ? 'propertyType-error' : undefined} required>
            <option value="">Select property type</option>
            <option>Residential home</option>
            <option>Commercial property</option>
            <option>Rural property</option>
            <option>New build</option>
            <option>Other</option>
          </select>
          {errors.propertyType && <small id="propertyType-error" className="error">{errors.propertyType}</small>}
        </div>
        <Field label="Location / suburb" name="location" value={values.location} onChange={update} error={errors.location} placeholder="e.g. Hamilton, Waikato" maxLength={fieldLimits.location} required />
        <div className="field field-full">
          <label htmlFor="message">How can we help? <span>*</span></label>
          <textarea id="message" name="message" rows="5" maxLength={fieldLimits.message} value={values.message} onChange={update} placeholder="Tell us about your property, energy goals or solar requirements…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} required/>
          {errors.message && <small id="message-error" className="error">{errors.message}</small>}
        </div>
      </div>
      <FormStatus status={status}/>
      <button type="submit" className="button button-primary" disabled={submitting}>
        {submitting ? 'Sending…' : type === 'quote' ? 'Get A Free Quote' : 'Send Enquiry'} <span>→</span>
      </button>
      <p className="privacy-note">Your details are used only to respond to your solar enquiry.</p>
    </form>
  );
}

function Field({ label, name, value, onChange, error, placeholder, type = 'text', required = false, maxLength }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label} {required && <span>*</span>}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <small id={`${name}-error`} className="error">{error}</small>}
    </div>
  );
}
