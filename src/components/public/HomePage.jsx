import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  ShieldAlert, 
  Percent, 
  Recycle, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  Factory, 
  Printer, 
  Users, 
  Award,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function HomePage({ setActivePage, onOpenQuoteModal, onSelectProduct }) {
  const { settings, products } = useData();

  const featuredProducts = (products.some(p => p.featured) ? products.filter(p => p.featured) : products).slice(0, 6);

  const valueBadges = [
    {
      icon: <ShieldCheck size={26} className="feature-icon" />,
      title: 'Superior Strength',
      desc: 'High load holding & tear resistance'
    },
    {
      icon: <Layers size={26} className="feature-icon" />,
      title: 'Maximum Cling',
      desc: 'Keeps load tight & secure'
    },
    {
      icon: <ShieldAlert size={26} className="feature-icon" />,
      title: 'Puncture Resistant',
      desc: 'Protects from damage & dust'
    },
    {
      icon: <Percent size={26} className="feature-icon" />,
      title: 'Cost Effective',
      desc: 'Reduces material usage & waste'
    },
    {
      icon: <Recycle size={26} className="feature-icon" />,
      title: '100% Recyclable',
      desc: 'Environment friendly solution'
    }
  ];

  const stats = [
    { number: settings.experienceYears, label: 'YEARS OF EXPERIENCE', icon: <Award size={24} /> },
    { number: settings.teamMembers, label: 'TEAM MEMBERS', icon: <Users size={24} /> },
    { number: settings.happyCustomers, label: 'HAPPY CUSTOMERS', icon: <CheckCircle size={24} /> },
    { number: settings.vendorPartners, label: 'VENDOR PARTNERS', icon: <Factory size={24} /> }
  ];

  return (
    <div className="home-page-root">
      {/* 1. HERO SECTION (Dark theme matching reference mockup) */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-brand-pill">
              <Sparkles size={14} className="text-gold" />
              <span>SWASTIK BRAND PACKAGING EXCELLENCE</span>
            </div>

            <h1 className="hero-headline">
              STRONGER WRAP.<br />
              SAFER LOAD.<br />
              <span className="hero-highlight">MAXIMUM VALUE.</span>
            </h1>

            <p className="hero-subtext">
              High performance industrial stretch films and polymer flexible packaging solutions manufactured to protect your products during storage and international transportation.
            </p>

            <div className="hero-btn-group">
              <button 
                className="btn btn-primary btn-lg hero-cta"
                onClick={() => {
                  setActivePage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-white btn-lg"
                onClick={() => onOpenQuoteModal()}
              >
                GET A QUOTE
              </button>
            </div>
          </div>

          <div className="hero-media-wrap">
            <div className="hero-image-frame">
              <img 
                src="/images/hero_pallet.jpg" 
                alt="Industrial Stretch Film Pallet Load" 
                className="hero-image"
              />
              <div className="hero-floating-badge">
                <span className="pulse-dot" />
                <span>Cast & Blown 5-Layer Extrusion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5 VALUE PROPOSITION BADGES STRIP (Matching mockup strip) */}
      <section className="features-strip-section">
        <div className="container">
          <div className="features-grid">
            {valueBadges.map((badge, idx) => (
              <div key={idx} className="feature-item">
                <div className="feature-icon-box">
                  {badge.icon}
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">{badge.title}</h4>
                  <p className="feature-desc">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE SMS ENTERPRISES? (Matching mockup section) */}
      <section className="section why-choose-section">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-media">
              <div className="why-img-card">
                <img 
                  src="/images/pallet_machine.jpg" 
                  alt="Automatic Pallet Wrapping Turntable Machine" 
                  className="why-img"
                />
                <div className="why-img-badge">
                  <span>Industrial Turntable Testing</span>
                </div>
              </div>
            </div>

            <div className="why-content">
              <span className="badge badge-green">SUPERIOR MANUFACTURING</span>
              <h2 className="why-title">WHY CHOOSE {settings.companyName}?</h2>
              <p className="why-lead">
                Our industrial stretch films and polymer flexible packaging solutions are manufactured with advanced multi-layer technology and strict quality control to deliver consistent performance you can rely on.
              </p>

              <ul className="why-checklist">
                <li>
                  <div className="check-icon-circle">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <strong>Excellent load stability</strong>
                    <p>High tension recovery prevents shifting during road and container transit.</p>
                  </div>
                </li>
                <li>
                  <div className="check-icon-circle">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <strong>Suitable for all wrapping machines</strong>
                    <p>Engineered for high-speed automated turntable and orbital wrappers.</p>
                  </div>
                </li>
                <li>
                  <div className="check-icon-circle">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <strong>UV resistant options available</strong>
                    <p>Up to 12-month outdoor weathering protection for agricultural and yard storage.</p>
                  </div>
                </li>
                <li>
                  <div className="check-icon-circle">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <strong>Customized sizes & thickness</strong>
                    <p>Tailored micron gauges (8µm to 120µm) and widths engineered to your payload.</p>
                  </div>
                </li>
              </ul>

              <div className="why-action-row">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>LEARN MORE ABOUT US</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS PREVIEW */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-title-wrap">
            <span className="badge badge-green">FLAGSHIP PRODUCTS</span>
            <h2 className="section-title">ENGINEERED PACKAGING FILMS</h2>
            <p className="section-subtitle">
              High performance stretch films, LDPE shrink rolls, and barrier laminates for modern industry.
            </p>
          </div>

          <div className="products-preview-grid">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="card product-preview-card" style={{ cursor: 'pointer' }} onClick={() => onSelectProduct(prod)}>
                <div className="prod-img-wrap">
                  <img src={prod.image} alt={prod.name} className="prod-img" loading="lazy" />
                  {prod.badge && <span className="prod-badge">{prod.badge}</span>}
                </div>
                <div className="prod-card-body">
                  <span className="prod-cat">{prod.category}</span>
                  <h3 className="prod-name">{prod.name}</h3>
                  <p className="prod-sub">{prod.subtitle}</p>

                  <div className="prod-specs-mini">
                    <div className="mini-spec">
                      <span className="label">Thickness:</span>
                      <span className="val">{prod.thickness}</span>
                    </div>
                    <div className="mini-spec">
                      <span className="label">Width:</span>
                      <span className="val">{prod.width}</span>
                    </div>
                  </div>

                  <div className="prod-card-actions">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectProduct(prod)}
                    >
                      VIEW DETAILS
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={(e) => { e.stopPropagation(); onOpenQuoteModal(prod.name); }}
                    >
                      GET QUOTE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-products-wrap">
            <button 
              className="btn btn-outline-green"
              onClick={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>VIEW ALL PRODUCT LINES</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. MANUFACTURING INFRASTRUCTURE STRIP (From PDF page 5 & 6) */}
      <section className="section section-dark infrastructure-strip">
        <div className="container">
          <div className="infra-header">
            <div>
              <span className="badge badge-gold">PRECISION MACHINERY</span>
              <h2 className="infra-title">WORLD-CLASS INFRASTRUCTURE</h2>
            </div>
            <button 
              className="btn btn-white btn-sm"
              onClick={() => {
                setActivePage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              VISIT INFRASTRUCTURE GALLERY
            </button>
          </div>

          <div className="infra-grid">
            <div className="infra-card">
              <div className="infra-media">
                <img src="/images/extrusion_plant.jpg" alt="Multi-Layer Extrusion Plant" />
              </div>
              <div className="infra-body">
                <h4>Multi-Layer Blown Film Extrusion Plant</h4>
                <p>Towering continuous bubble plant delivering micron uniformity, puncture barrier, and optical clarity.</p>
              </div>
            </div>

            <div className="infra-card">
              <div className="infra-media">
                <img src="/images/rotogravure_press.jpg" alt="Rotogravure Printing Machine" />
              </div>
              <div className="infra-body">
                <h4>Rotogravure Printing Machine (600 m/min)</h4>
                <p>Ultra-fast multi-color rotogravure printing unit ensuring vibrant branding and defect-free registration.</p>
              </div>
            </div>

            <div className="infra-card">
              <div className="infra-media">
                <img src="/images/packaging_showroom.jpg" alt="Laminated Rolls and Pouches" />
              </div>
              <div className="infra-body">
                <h4>Laminated Rolls & Pouch Conversion Lines</h4>
                <p>Equipped with Center sealing, Side sealing, and UNITEK 3-side seal pouch machines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED PERFORMANCE STATS (From PDF Page 3) */}
      <section className="section stats-counter-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((st, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon-wrap">
                  {st.icon}
                </div>
                <div className="stat-number">{st.number}</div>
                <div className="stat-label">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA CALLOUT */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-text">
              <h3>Need Customized Packaging or Volume Bulk Supply?</h3>
              <p>We deliver factory-direct customized width, micron gauges, and print options from our Bengaluru unit.</p>
            </div>
            <div className="cta-buttons">
              <button 
                className="btn btn-white btn-lg"
                onClick={() => onOpenQuoteModal()}
              >
                REQUEST FACTORY QUOTE
              </button>
              <button 
                className="btn btn-outline-white btn-lg"
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Hero Section */
        .hero-section {
          background-color: #071221;
          color: #ffffff;
          padding: 80px 0 90px;
          position: relative;
          overflow: hidden;
          background-image: radial-gradient(circle at 80% 20%, rgba(22, 163, 74, 0.15) 0%, transparent 60%);
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 50px;
          align-items: center;
        }
        .hero-brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #f8fafc;
          margin-bottom: 24px;
        }
        .hero-headline {
          font-size: 3.4rem;
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .hero-highlight {
          color: #22c55e;
          text-shadow: 0 0 30px rgba(34, 197, 94, 0.4);
        }
        .hero-subtext {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 34px;
          max-width: 540px;
        }
        .hero-btn-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero-cta {
          box-shadow: 0 6px 25px rgba(22, 163, 74, 0.5);
        }

        .hero-media-wrap {
          position: relative;
        }
        .hero-image-frame {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }
        .hero-image {
          width: 100%;
          height: 420px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .hero-image-frame:hover .hero-image {
          transform: scale(1.03);
        }
        .hero-floating-badge {
          position: absolute;
          bottom: 18px;
          left: 18px;
          background-color: rgba(7, 18, 33, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 8px 16px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #ffffff;
        }

        /* 5 Value Badges Strip */
        .features-strip-section {
          background-color: #0c1c30;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
        }
        .feature-icon-box {
          color: #22c55e;
          flex-shrink: 0;
        }
        .feature-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .feature-desc {
          font-size: 0.76rem;
          color: #94a3b8;
          line-height: 1.3;
        }

        /* Why Choose Section */
        .why-choose-section {
          background-color: #ffffff;
        }
        .why-choose-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 60px;
          align-items: center;
        }
        .why-img-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-light);
        }
        .why-img {
          width: 100%;
          height: 440px;
          object-fit: cover;
        }
        .why-img-badge {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: #ffffff;
          color: #0b1a30;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          box-shadow: var(--shadow-md);
        }

        .why-content .badge {
          margin-bottom: 12px;
        }
        .why-title {
          font-size: 2.2rem;
          color: #0b1a30;
          margin-bottom: 16px;
        }
        .why-lead {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .why-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 34px;
        }
        .why-checklist li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .check-icon-circle {
          background-color: var(--green-light);
          color: var(--primary-green);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .why-checklist strong {
          display: block;
          font-size: 1rem;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .why-checklist p {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.4;
        }

        /* Products Preview */
        .products-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }
        .product-preview-card {
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .prod-img-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #f1f5f9;
        }
        .prod-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .product-preview-card:hover .prod-img {
          transform: scale(1.05);
        }
        .prod-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
        }
        .prod-card-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .prod-cat {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .prod-name {
          font-size: 1.25rem;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .prod-sub {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }
        .prod-specs-mini {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          background: #f8fafc;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          font-size: 0.8rem;
          margin-bottom: 20px;
        }
        .mini-spec .label {
          display: block;
          color: #64748b;
          font-size: 0.72rem;
        }
        .mini-spec .val {
          font-weight: 700;
          color: #0f172a;
        }
        .prod-card-actions {
          display: flex;
          gap: 10px;
        }
        .prod-card-actions .btn {
          flex: 1;
        }
        .view-all-products-wrap {
          text-align: center;
        }

        /* Infrastructure Strip */
        .infrastructure-strip {
          padding: 80px 0;
        }
        .infra-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }
        .infra-title {
          font-size: 2.2rem;
          color: #ffffff;
          margin-top: 8px;
        }
        .infra-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .infra-card {
          background-color: var(--bg-dark-card);
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: var(--transition);
        }
        .infra-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34, 197, 94, 0.4);
        }
        .infra-media {
          height: 200px;
          overflow: hidden;
        }
        .infra-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .infra-card:hover .infra-media img {
          transform: scale(1.05);
        }
        .infra-body {
          padding: 20px;
        }
        .infra-body h4 {
          color: #ffffff;
          font-size: 1.15rem;
          margin-bottom: 8px;
        }
        .infra-body p {
          color: var(--text-light);
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Stats Section */
        .stats-counter-section {
          background-color: #ffffff;
          padding: 60px 0;
          border-bottom: 1px solid var(--border-light);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }
        .stat-card {
          text-align: center;
          padding: 24px;
          border-radius: var(--radius-md);
          background: #f8fafc;
          border: 1px solid var(--border-light);
        }
        .stat-icon-wrap {
          color: var(--primary-green);
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
        }
        .stat-number {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: #0b1a30;
          line-height: 1.1;
        }
        .stat-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.5px;
          margin-top: 6px;
        }

        /* CTA Banner */
        .cta-banner-section {
          padding: 40px 0 70px;
        }
        .cta-banner-card {
          background: linear-gradient(135deg, #0a192f 0%, #15803d 100%);
          border-radius: var(--radius-lg);
          padding: 50px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          color: #ffffff;
          box-shadow: var(--shadow-xl);
        }
        .cta-text h3 {
          color: #ffffff;
          font-size: 1.8rem;
          margin-bottom: 10px;
        }
        .cta-text p {
          color: #e2e8f0;
          font-size: 1rem;
          max-width: 550px;
        }
        .cta-buttons {
          display: flex;
          gap: 16px;
          flex-shrink: 0;
        }
        .btn-outline-white {
          background: transparent;
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }
        .btn-outline-white:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #ffffff;
        }

        @media (max-width: 991px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-headline {
            font-size: 2.5rem;
          }
          .hero-subtext {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-btn-group {
            justify-content: center;
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .why-choose-grid {
            grid-template-columns: 1fr;
          }
          .products-preview-grid, .infra-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cta-banner-card {
            flex-direction: column;
            text-align: center;
            padding: 40px 24px;
          }
          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            padding: 40px 0 50px;
          }
          .hero-headline {
            font-size: 1.85rem;
            line-height: 1.22;
          }
          .hero-subtext {
            font-size: 0.9rem;
            margin-bottom: 24px;
          }
          .hero-btn-group {
            flex-direction: column;
            width: 100%;
            gap: 12px;
          }
          .hero-btn-group .btn {
            width: 100%;
          }
          .hero-image {
            height: 240px;
          }
          .hero-floating-badge {
            font-size: 0.72rem;
            padding: 6px 12px;
            bottom: 12px;
            left: 12px;
          }
          .features-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .feature-item {
            background: rgba(255, 255, 255, 0.03);
            border-radius: var(--radius-sm);
            padding: 10px 14px;
          }
          .why-img {
            height: 240px;
          }
          .why-title {
            font-size: 1.6rem;
          }
          .infra-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 24px;
          }
          .infra-title {
            font-size: 1.6rem;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .stat-card {
            padding: 16px 10px;
          }
          .stat-number {
            font-size: 1.85rem;
          }
          .cta-banner-card {
            padding: 30px 18px;
          }
          .cta-text h3 {
            font-size: 1.45rem;
          }
        }
      `}</style>
    </div>
  );
}
