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
  Award
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import Media, { useMediaSrc } from '../common/Media';

export default function HomePage({ setActivePage, onOpenQuoteModal, onSelectProduct }) {
    const { products, homeContent } = useData();

  const activeProducts = products.filter(p => !p.archived);
    const featuredProducts = (activeProducts.some(p => p.featured) ? activeProducts.filter(p => p.featured) : activeProducts)
    .slice(0, homeContent.featured.count || 6);

  const { hero, features, why, featured, infra, stats, cta } = homeContent;
  const featureIcons = [ShieldCheck, Layers, ShieldAlert, Percent, Recycle];
  const statIcons = [Award, Users, CheckCircle, Factory];
  const shown = (section) => section.visible !== false;
  const heroVideoUrl = useMediaSrc(hero.video);

  return (
    <div className="home-page-root">
      {/* 1. HERO SECTION (Dark theme matching reference mockup) */}
            {shown(hero) && (
      <section className="hero-section">
        {/* Background video covering the whole banner */}
        <video
          className="hero-bg-video"
                    key={hero.video}
          src={heroVideoUrl || undefined}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero-bg-overlay" />

        <div className="container hero-container">
          <div className="hero-content">
            {/* hero-brand-pill removed */}

            <h1 className="hero-headline">
                            {hero.line1}{hero.line1 && <br />}
              {hero.line2}{hero.line2 && <br />}
              <span className="hero-highlight">{hero.highlight}</span>
            </h1>

            <p className="hero-subtext">
                            {hero.subtext}
            </p>

            <div className="hero-btn-group">
              <button 
                className="btn btn-primary btn-lg hero-cta"
                onClick={() => {
                  setActivePage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                                <span>{hero.primaryButton}</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn btn-white btn-lg"
                                onClick={() => onOpenQuoteModal()}
              >
                {hero.secondaryButton}
              </button>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* 2. 5 VALUE PROPOSITION BADGES STRIP (Matching mockup strip) */}
            {shown(features) && (
      <section className="features-strip-section">
        <div className="container">
          <div className="features-grid">
                        {features.items.map((badge, idx) => {
              const Icon = featureIcons[idx % featureIcons.length];
              return (
              <div key={idx} className="feature-item">
                <div className="feature-icon-box">
                  <Icon size={26} className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">{badge.title}</h4>
                                    <p className="feature-desc">{badge.desc}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* 3. WHY CHOOSE SMS ENTERPRISES? (Matching mockup section) */}
            {shown(why) && (
      <section className="section why-choose-section">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-media">
              <div className="why-img-card">
                <Media 
                                    src={why.image}
                  alt={why.imageBadge || why.title} 
                  className="why-img"
                />
                {/* why.imageBadge removed */}
              </div>
            </div>

            <div className="why-content">
              {/* why.badge removed */}
              <h2 className="why-title">{why.title}</h2>
              <p className="why-lead">
                                {why.lead}
              </p>

              <ul className="why-checklist">
                {why.points.map((pt, i) => (
                  <li key={i}>
                    <div className="check-icon-circle">
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <strong>{pt.title}</strong>
                      {pt.desc && <p>{pt.desc}</p>}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="why-action-row">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                                    <span>{why.button}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 4. FEATURED PRODUCTS PREVIEW */}
            {shown(featured) && (
      <section className="section section-alt">
        <div className="container">
          <div className="section-title-wrap">
                        {/* featured.badge removed */}
            <h2 className="section-title">{featured.title}</h2>
            <p className="section-subtitle">
              {featured.subtitle}
            </p>
          </div>

          <div className="products-preview-grid">
            {featuredProducts.map((prod) => (
              <div key={prod.id} className="card product-preview-card" style={{ cursor: 'pointer' }} onClick={() => onSelectProduct(prod)}>
                <div className="prod-img-wrap">
                  <Media src={prod.image} alt={prod.name} className="prod-img" loading="lazy" />
                  {/* prod.badge removed */}
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
                            <span>{featured.button}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
      )}

      {/* 5. MANUFACTURING INFRASTRUCTURE STRIP (From PDF page 5 & 6) */}
            {shown(infra) && (
      <section className="section section-dark infrastructure-strip">
        <div className="container">
          <div className="infra-header">
            <div>
                            {/* infra.badge removed */}
              <h2 className="infra-title">{infra.title}</h2>
            </div>
            <button 
              className="btn btn-white btn-sm"
              onClick={() => {
                setActivePage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
                            {infra.button}
            </button>
          </div>

          <div className="infra-grid">
            {infra.cards.map((card, i) => (
              <div key={i} className="infra-card">
                <div className="infra-media">
                  {card.image && <Media src={card.image} alt={card.title} loading="lazy" />}
                </div>
                <div className="infra-body">
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 6. VERIFIED PERFORMANCE STATS (From PDF Page 3) */}
            {shown(stats) && (
      <section className="section stats-counter-section">
        <div className="container">
          <div className="stats-grid">
                        {stats.items.map((st, i) => {
              const Icon = statIcons[i % statIcons.length];
              return (
              <div key={i} className="stat-card">
                <div className="stat-icon-wrap">
                  <Icon size={24} />
                </div>
                <div className="stat-number">{st.number}</div>
                                <div className="stat-label">{st.label}</div>
              </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* 7. BOTTOM CTA CALLOUT */}
            {shown(cta) && (
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-text">
                            <h3>{cta.title}</h3>
              <p>{cta.text}</p>
            </div>
            <div className="cta-buttons">
              <button 
                className="btn btn-white btn-lg"
                onClick={() => onOpenQuoteModal()}
              >
                                {cta.primaryButton}
              </button>
              <button 
                className="btn btn-outline-white btn-lg"
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                                {cta.secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </section>
      )}

      <style>{`
        /* Hero Section */
        .hero-section {
          background-color: #071221;
          color: #ffffff;
          padding: 100px 0 110px;
          min-height: 78vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(90deg, rgba(7, 18, 33, 0.88) 0%, rgba(7, 18, 33, 0.65) 50%, rgba(7, 18, 33, 0.35) 100%);
        }
        .hero-container {
          position: relative;
          z-index: 2;
        }
        .hero-content {
          max-width: 680px;
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
          color: #cbd5e1;
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
        .infra-media img, .infra-media video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .infra-card:hover .infra-media img, .infra-card:hover .infra-media video {
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
            text-align: center;
          }
          .hero-content {
            margin: 0 auto;
          }
          .hero-bg-overlay {
            background: rgba(7, 18, 33, 0.72);
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
            padding: 56px 0 64px;
            min-height: 70vh;
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
