import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Lock, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PRODUCT_CATEGORIES, categorySlug } from '../../data/products';

export default function Navbar({ activePage, setActivePage, onOpenQuoteModal, onOpenAdmin, onSelectProduct, onSelectCategory }) {
  const { settings, products } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaCloseTimer = useRef(null);

  // Small close delay so the pointer can travel from the menu label into the panel
  const showMega = () => {
    clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  };
  const hideMega = () => {
    clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 200);
  };

  // Products grouped under the doc's main headings (FMCG / Industrial / Agri), plus any custom admin categories
  const activeProducts = products.filter(p => !p.archived);
  const productGroups = [...new Set([...PRODUCT_CATEGORIES, ...activeProducts.map(p => p.category)])]
    .map(category => ({ category, items: activeProducts.filter(p => p.category === category) }))
    .filter(g => g.items.length);

    const openCategory = (category) => {
    clearTimeout(megaCloseTimer.current);
    setMegaOpen(false);
    setMobileMenuOpen(false);
    onSelectCategory(categorySlug(category));
  };

  const openProduct = (product) => {
    clearTimeout(megaCloseTimer.current);
    setMegaOpen(false);
    setMobileMenuOpen(false);
    onSelectProduct(product);
  };

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
    { id: 'about', label: 'ABOUT US' },
    { id: 'careers', label: 'CAREERS' },
    { id: 'contact', label: 'CONTACT US' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    setMegaOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>


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
              if (link.id === 'products') {
                return (
                  <div
                    key={link.id}
                    className="nav-mega-wrap"
                    onMouseEnter={showMega}
                    onMouseLeave={hideMega}
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      onFocus={showMega}
                      className={`nav-link ${isActive || megaOpen ? 'nav-link-active' : ''}`}
                      aria-expanded={megaOpen}
                    >
                      {link.label}
                      {isActive && <span className="nav-active-pill" />}
                    </button>

                    {megaOpen && (
                      <div className="mega-menu">
                        <div className="container mega-inner">
                          <div className="mega-columns">
                            {productGroups.map(group => (
                              <div key={group.category} className="mega-col">
                                <h4><button className="mega-heading" onClick={() => openCategory(group.category)}>{group.category}</button></h4>
                                <ul>
                                  {group.items.map(p => (
                                    <li key={p.id}>
                                      <button className="mega-link" onClick={() => openProduct(p)}>{p.name}</button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="mega-actions">
                            <button className="mega-btn mega-btn-gold" onClick={() => handleNavClick('products')}>ALL PRODUCTS</button>
                            <button className="mega-btn mega-btn-navy" onClick={() => { setMegaOpen(false); onOpenQuoteModal(); }}>GET A QUOTE</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
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
              {navLinks.map((link) => link.id === 'products' ? (
                <div key={link.id} className="mobile-products">
                  <button
                    onClick={() => setMobileProductsOpen(o => !o)}
                    className={`mobile-nav-link ${activePage === link.id ? 'mobile-active' : ''}`}
                    aria-expanded={mobileProductsOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={16} className={`nav-caret ${mobileProductsOpen ? 'nav-caret-open' : ''}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="mobile-mega">
                      {productGroups.map(group => (
                        <div key={group.category} className="mobile-mega-group">
                          <h4><button className="mega-heading" onClick={() => openCategory(group.category)}>{group.category}</button></h4>
                          {group.items.map(p => (
                            <button key={p.id} className="mega-link" onClick={() => openProduct(p)}>{p.name}</button>
                          ))}
                        </div>
                      ))}
                      <button className="mega-btn mega-btn-gold" onClick={() => handleNavClick('products')}>ALL PRODUCTS</button>
                    </div>
                  )}
                </div>
              ) : (
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
          align-self: stretch;
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

        /* Products mega menu */
        .nav-mega-wrap {
          display: flex;
          align-items: center;
          align-self: stretch;
        }
        .nav-mega-wrap > .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .nav-caret {
          transition: transform 0.2s ease;
        }
        .nav-caret-open {
          transform: rotate(180deg);
        }
        .mega-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #f8fafc;
          border-top: 1px solid var(--border-light);
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.12);
          animation: fadeIn 0.18s ease-out;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }
        .mega-inner {
          padding-top: 36px;
          padding-bottom: 32px;
        }
        .mega-columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px 48px;
          max-width: 1000px;
          margin: 0 auto;
        }
                .mega-heading {
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
          transition: color 0.15s ease;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #0b1a30;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 2px solid var(--primary-green);
          display: inline-block;
        }
                .mega-heading:hover {
          color: var(--primary-green);
        }
        .mega-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mega-link {
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #475569;
          padding: 6px 0;
          cursor: pointer;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .mega-link:hover {
          color: var(--primary-green);
          transform: translateX(3px);
        }
        .mega-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 32px;
        }
        .mega-btn {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.6px;
          padding: 11px 24px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .mega-btn:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }
        .mega-btn-gold {
          background: #e0aa4a;
          color: #1f2937;
        }
        .mega-btn-navy {
          background: var(--primary-navy);
          color: #fff;
        }
        .mobile-mega {
          padding: 12px 4px 4px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mobile-mega-group {
          display: flex;
          flex-direction: column;
        }
        .mobile-mega-group .mega-heading {
          font-size: 0.85rem;
          margin-bottom: 4px;
          align-self: flex-start;
        }
        .mobile-mega .mega-link {
          padding: 8px 4px;
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
          max-height: calc(100vh - 64px);
          overflow-y: auto;
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
