import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, Lock } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function Navbar({ activePage, setActivePage, onOpenQuoteModal, onOpenAdmin }) {
  const { settings } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'products', label: 'OUR PRODUCTS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'contact', label: 'CONTACT US' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro bar for corporate authenticity */}
      <div className="top-utility-bar">
        <div className="container utility-content">
          <div className="utility-left">
            <span>GSTIN: <strong>{settings.gstin}</strong></span>
            <span className="divider">•</span>
            <span className="tagline-badge">SWASTIK BRAND PACKAGING</span>
          </div>
          <div className="utility-right">
            <a href={`tel:${settings.phone}`} className="utility-link">
              <Phone size={13} /> {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="utility-link">
              <Mail size={13} /> {settings.email}
            </a>
            {onOpenAdmin && (
              <button 
                onClick={onOpenAdmin} 
                className="utility-admin-link"
                title="Open Admin Operations Portal"
              >
                <Lock size={12} /> Admin Portal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className={`main-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo */}
          <div className="navbar-brand" onClick={() => handleNavClick('home')}>
            <img 
              src="/images/sms_logo.jpg" 
              alt="SMS Enterprises Logo" 
              className="brand-logo-img"
            />
            <div className="brand-text">
              <div className="brand-name">{settings.companyName}</div>
              <div className="brand-sub">Packaging Solutions</div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {link.label}
                  {isActive && <span className="nav-active-pill" />}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="nav-actions">
            <button 
              className="btn btn-primary nav-quote-btn"
              onClick={onOpenQuoteModal}
            >
              GET A QUOTE
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown fade-in">
            <div className="mobile-links">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`mobile-nav-link ${activePage === link.id ? 'mobile-active' : ''}`}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} />
                </button>
              ))}
              {onOpenAdmin && (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="mobile-nav-link mobile-admin-link"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={15} /> Admin Operations Portal
                  </span>
                  <ArrowRight size={16} />
                </button>
              )}
              <div className="mobile-quote-wrap">
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                >
                  GET A QUOTE
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <style>{`
        .top-utility-bar {
          background-color: #071221;
          color: #94a3b8;
          font-size: 0.78rem;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .utility-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .utility-left, .utility-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .divider {
          color: #334155;
        }
        .tagline-badge {
          color: #f59e0b;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .utility-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #cbd5e1;
        }
        .utility-link:hover {
          color: #22c55e;
        }
        .utility-admin-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 3px 9px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .utility-admin-link:hover {
          background: var(--primary-green);
          color: #ffffff;
          border-color: var(--primary-green);
        }
        
        /* Navbar Main */
        .main-navbar {
          position: sticky;
          top: 0;
          z-index: 900;
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          transition: all 0.25s ease;
        }
        .navbar-scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }
        .brand-logo-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 2px solid #f8fafc;
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: #0b1a30;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }
        .brand-sub {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Desktop Nav */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .nav-link {
          background: none;
          border: none;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          color: #334155;
          letter-spacing: 0.5px;
          cursor: pointer;
          position: relative;
          padding: 8px 0;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: var(--primary-green);
        }
        .nav-link-active {
          color: var(--primary-green);
        }
        .nav-active-pill {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--primary-green);
          border-radius: 2px;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nav-quote-btn {
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 9px 22px;
          text-transform: uppercase;
        }

        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: #0f172a;
          cursor: pointer;
        }

        /* Mobile Dropdown */
        .mobile-menu-dropdown {
          background-color: #ffffff;
          border-top: 1px solid var(--border-light);
          padding: 20px;
          box-shadow: var(--shadow-lg);
        }
        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mobile-nav-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background-color: #f8fafc;
          font-weight: 600;
          font-size: 0.95rem;
          color: #1e293b;
          cursor: pointer;
        }
        .mobile-active {
          background-color: var(--green-bg);
          border-color: var(--primary-green);
          color: var(--primary-green);
        }
        .btn-block {
          width: 100%;
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: var(--radius-sm);
            background: #f8fafc;
          }
          .top-utility-bar {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .nav-container {
            height: 64px;
          }
          .brand-logo-img {
            width: 38px;
            height: 38px;
          }
          .brand-name {
            font-size: 1.1rem;
          }
          .brand-sub {
            font-size: 0.64rem;
          }
          .nav-quote-btn {
            display: none;
          }
          .mobile-menu-dropdown {
            padding: 16px;
          }
          .mobile-nav-link {
            padding: 14px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
