import React from 'react';
import { Phone, Mail, MapPin, Award, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
import { useData } from '../../context/DataContext';

const FOOTER_PRODUCTS = ['ldpe-shrink-film', 'industrial-stretch-film', 'vci-film', 'silage-stretch-film', 'agricultural-mulch-film', 'multi-layer-laminated-pouches'];

export default function Footer({ setActivePage, onOpenAdmin, onSelectProduct }) {
  const { settings, products } = useData();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img 
                src="/images/sms_logo.jpg" 
                alt="SMS Enterprises Logo" 
                className="footer-logo-img"
              />
              <div>
                <h3 className="footer-company-name">{settings.companyName}</h3>
                <span className="footer-tagline">Packaging Solutions</span>
              </div>
            </div>

            <p className="footer-bio">
              Manufacturer and global exporter of high-performance stretch films, LDPE shrink packaging, and BOPP multi-layer barrier solutions. Driven by innovation, quality, and sustainable manufacturing practices.
            </p>

            <div className="footer-pill-badge">
              <ShieldCheck size={16} className="text-green" />
              <span>GSTIN: <strong>{settings.gstin}</strong></span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-link-list">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
                  <ChevronRight size={14} /> Home
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('products'); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
                  <ChevronRight size={14} /> Our Products
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
                  <ChevronRight size={14} /> Infrastructure & Gallery
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
                  <ChevronRight size={14} /> About Us (~GD Kishore)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth'}); }}>
                  <ChevronRight size={14} /> Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => { onOpenAdmin && onOpenAdmin(); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="admin-portal-nav-btn">
                  <Lock size={13} style={{ color: '#22c55e' }} /> Staff / Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Packaging Solutions */}
          <div className="footer-col">
            <h4 className="footer-heading">Product Lines</h4>
            <ul className="footer-link-list">
              {FOOTER_PRODUCTS.map(slug => {
                const prod = products.find(p => p.slug === slug);
                if (!prod) return null;
                return (
                  <li key={slug}>
                    <button onClick={() => onSelectProduct(prod)}>
                      <ChevronRight size={14} /> {prod.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact & Factory Unit */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Registered Unit</h4>
            <div className="footer-contact-items">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span>{settings.address}</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
              <div className="contact-item">
                <Award size={18} className="contact-icon text-gold" />
                <span>Working: {settings.workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Access & Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-container">
          <div className="copyright-text">
            © {new Date().getFullYear()} {settings.companyName}. All Rights Reserved.
          </div>

          {/* Admin Access Trigger */}
          <button 
            type="button"
            className="footer-admin-trigger" 
            title="SMS Enterprises Admin Operations Portal"
            onClick={onOpenAdmin}
          >
            <Lock size={13} className="lock-icon" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #071221;
          color: #94a3b8;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 60px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
          gap: 40px;
          margin-bottom: 50px;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .footer-logo-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .footer-company-name {
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.3px;
        }
        .footer-tagline {
          font-size: 0.72rem;
          color: #22c55e;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .footer-bio {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 16px;
        }
        .footer-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: #cbd5e1;
        }
        .text-green {
          color: #22c55e;
        }
        .text-gold {
          color: #f59e0b;
        }

        .footer-heading {
          color: #ffffff;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }
        .footer-link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-link-list button {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 0.88rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: var(--transition);
          padding: 0;
          text-align: left;
        }
        .footer-link-list button:hover {
          color: #22c55e;
          transform: translateX(4px);
        }

        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          line-height: 1.4;
          color: #cbd5e1;
        }
        .contact-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: #22c55e;
        }
        .contact-item a:hover {
          color: #22c55e;
        }

        .admin-portal-nav-btn {
          color: #e2e8f0 !important;
          font-weight: 600;
        }
        .admin-portal-nav-btn:hover {
          color: #22c55e !important;
        }

        /* Bottom bar */
        .footer-bottom-bar {
          background-color: #040913;
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          color: #64748b;
        }
        .footer-admin-trigger {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          padding: 5px 14px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .footer-admin-trigger:hover {
          background: rgba(34, 197, 94, 0.18);
          color: #4ade80;
          border-color: rgba(34, 197, 94, 0.4);
        }
        .lock-icon {
          color: #22c55e;
        }

        @media (max-width: 991px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .bottom-container {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
