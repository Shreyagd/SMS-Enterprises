import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ContactPage({ setActivePage }) {
  const { settings, submitMessage } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitMessage(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-root">
      {/* Header */}
      <section className="contact-header-section">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">CONTACT US</h1>
            <p className="section-subtitle">
              We are here to help you! Reach out for factory visits, distributor inquiries, or sample orders.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Form (Matching reference mockup layout) */}
      <section className="section contact-body-section">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left Contact Information Card */}
            <div className="contact-info-card">
              <h2 className="info-main-title">GET IN TOUCH</h2>
              <p className="info-intro">
                Have questions about our stretch films, barrier laminates, or custom micron thickness? Our factory representatives are available to assist.
              </p>

              <div className="info-items-stack">
                <div className="info-item">
                  <div className="info-icon-box">
                    <MapPin size={22} className="text-green" />
                  </div>
                  <div className="info-item-content">
                    <span className="item-label">Regd. Office & Production Unit</span>
                    <strong className="item-value">{settings.companyName}</strong>
                    <p className="item-address">{settings.address}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">
                    <Phone size={22} className="text-green" />
                  </div>
                  <div className="info-item-content">
                    <span className="item-label">Phone & WhatsApp</span>
                    <a href={`tel:${settings.phone}`} className="item-value item-link">
                      {settings.phone}
                    </a>
                    <a 
                      href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}?text=Hello%20SMS%20Enterprises,%20I%20am%20interested%20in%20your%20stretch%20film%20packaging%20solutions.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="whatsapp-quick-btn"
                    >
                      <span>Chat on WhatsApp</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">
                    <Mail size={22} className="text-green" />
                  </div>
                  <div className="info-item-content">
                    <span className="item-label">Official Email</span>
                    <a href={`mailto:${settings.email}`} className="item-value item-link">
                      {settings.email}
                    </a>
                    <p className="item-sub">{settings.salesEmail}</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">
                    <Clock size={22} className="text-green" />
                  </div>
                  <div className="info-item-content">
                    <span className="item-label">Working Hours</span>
                    <strong className="item-value">{settings.workingHours}</strong>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">
                    <FileText size={22} className="text-gold" />
                  </div>
                  <div className="info-item-content">
                    <span className="item-label">GSTIN / Tax ID</span>
                    <strong className="item-value gstin-code">{settings.gstin}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form Card */}
            <div className="contact-form-card">
              <h3 className="form-card-title">Send a Direct Message</h3>
              <p className="form-card-sub">Fill out the details below and our team will get back to you promptly.</p>

              {submitted ? (
                <div className="msg-success-box">
                  <CheckCircle2 size={54} className="text-green" />
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for writing to SMS ENTERPRISES. Our technical sales team has received your message and will respond shortly.</p>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="actual-contact-form">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      placeholder="e.g. Distributorship Inquiry / Machine Film Specs"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message *</label>
                    <textarea 
                      name="message"
                      required
                      rows="4"
                      placeholder="Please let us know your requirements, monthly consumption, or questions..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block send-msg-btn"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Location Map View removed */}
        </div>
            </section>

      {/* Careers strip */}
      <section className="contact-careers-strip">
        <div className="container contact-careers-inner">
          <div>
            <span className="contact-careers-eyebrow">WE'RE HIRING</span>
            <h3>Want to build your career with us?</h3>
            <p>See current openings in production, quality and sales — and apply online in a few minutes.</p>
          </div>
          <button className="btn btn-white btn-lg" onClick={() => setActivePage && setActivePage('careers')}>
            VIEW CAREERS
          </button>
        </div>
      </section>

      <style>{`
        .contact-careers-strip {
          background: linear-gradient(120deg, var(--primary-navy) 0%, var(--navy-light) 100%);
          padding: 44px 0;
        }
        .contact-careers-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .contact-careers-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #4ade80;
        }
        .contact-careers-inner h3 {
          color: #fff;
          font-size: 1.5rem;
          margin: 6px 0;
        }
        .contact-careers-inner p {
          color: #cbd5e1;
        }
        @media (max-width: 700px) {
          .contact-careers-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        .contact-header-section {
          background-color: #f8fafc;
          padding: 50px 0 20px;
          border-bottom: 1px solid var(--border-light);
        }
        .contact-body-section {
          padding: 50px 0 80px;
        }
        .contact-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        /* Left Info Card */
        .contact-info-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 36px;
          box-shadow: var(--shadow-sm);
        }
        .info-main-title {
          font-size: 1.6rem;
          color: #0b1a30;
          margin-bottom: 10px;
        }
        .info-intro {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .info-items-stack {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .info-icon-box {
          background-color: #f0fdf4;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(22, 163, 74, 0.15);
        }
        .item-label {
          display: block;
          font-size: 0.76rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .item-value {
          display: block;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
        }
        .item-address {
          font-size: 0.88rem;
          color: #475569;
          margin-top: 2px;
          line-height: 1.4;
        }
        .item-link:hover {
          color: var(--primary-green);
        }
        .item-sub {
          font-size: 0.82rem;
          color: #64748b;
        }
        .gstin-code {
          letter-spacing: 1px;
          color: #d97706;
        }
        .whatsapp-quick-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
          padding: 4px 10px;
          background-color: #dcfce7;
          color: #15803d;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
        }
        .whatsapp-quick-btn:hover {
          background-color: #bbf7d0;
        }

        /* Right Form Card */
        .contact-form-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 36px;
          box-shadow: var(--shadow-sm);
        }
        .form-card-title {
          font-size: 1.5rem;
          color: #0b1a30;
          margin-bottom: 6px;
        }
        .form-card-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .send-msg-btn {
          margin-top: 10px;
          padding: 14px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .msg-success-box {
          text-align: center;
          padding: 40px 20px;
        }
        .msg-success-box h4 {
          font-size: 1.4rem;
          color: #0b1a30;
          margin: 14px 0 8px;
        }
        .msg-success-box p {
          color: var(--text-muted);
          font-size: 0.92rem;
          margin-bottom: 20px;
        }

        /* Map Card */
        .map-view-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .map-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border-light);
        }
        .map-title-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .map-title-info strong {
          display: block;
          color: #0f172a;
          font-size: 0.95rem;
        }
        .map-title-info p {
          font-size: 0.82rem;
          color: #64748b;
        }
        .interactive-map-frame {
          width: 100%;
          line-height: 0;
        }

        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr;
          }
          .map-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
        }
        @media (max-width: 600px) {
          .contact-info-card, .contact-form-card {
            padding: 20px 16px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .map-card-header {
            padding: 14px 16px;
          }
          .send-msg-btn {
            width: 100%;
          }
          .info-main-title, .form-card-title {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </div>
  );
}
