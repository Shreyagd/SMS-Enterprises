import React from 'react';
import { 
  CheckCircle, 
  Award, 
  Users, 
  Factory, 
  Globe, 
  Target, 
  Compass, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  Handshake, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AboutPage({ setActivePage, onOpenQuoteModal }) {
  const { settings } = useData();

  const stats = [
    { number: settings.experienceYears, label: 'Years of Experience', icon: <Award size={28} className="text-green" /> },
    { number: settings.happyCustomers, label: 'Happy Customers', icon: <Users size={28} className="text-green" /> },
    { number: settings.teamMembers, label: 'Team Members', icon: <Factory size={28} className="text-green" /> },
    { number: '100%', label: 'Quality Assurance', icon: <ShieldCheck size={28} className="text-green" /> }
  ];

  const pillars = [
    {
      title: '360° COMMITMENT',
      desc: 'End-to-end responsibility from virgin polymer resin sourcing to precision extrusion, spooling, and dispatch.',
      icon: <Target size={24} className="text-gold" />
    },
    {
      title: 'PARTNERING BEYOND PRODUCTS',
      desc: 'We assist clients in optimizing wrap tension, reducing plastic gauge consumption, and cutting shipping damages.',
      icon: <Handshake size={24} className="text-gold" />
    },
    {
      title: 'CERTIFIED QUALITY',
      desc: 'Standardized testing for elongation, tensile strength, dart impact resistance, and puncture barrier.',
      icon: <ShieldCheck size={24} className="text-gold" />
    },
    {
      title: 'SMART LOGISTICS',
      desc: 'Fast regional dispatches across South India & streamlined container packaging for global export markets.',
      icon: <Truck size={24} className="text-gold" />
    }
  ];

  return (
    <div className="about-page-root">
      {/* Header */}
      <section className="about-header-section">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">ABOUT US</h1>
            <p className="section-subtitle">
              Delivering Quality, Building Trust — Revolutionizing Package & Defining the Brand SWASTIK
            </p>
          </div>
        </div>
      </section>

      {/* Main Story: Founder & Factory (Matching reference mockup layout) */}
      <section className="section about-main-section">
        <div className="container">
          <div className="about-story-grid">
            {/* Left Content */}
            <div className="about-text-col">
              <span className="badge badge-green">LEADERSHIP & VISION</span>
              <h2 className="about-story-title">ENGINEERING PACKAGING EXCELLENCE</h2>

              <p className="about-paragraph">
                <strong>{settings.companyName}</strong> is a leading manufacturer and supplier of high-performance industrial stretch films, LDPE heavy shrink films, and BOPP multi-layer barrier solutions. We are committed to providing innovative packaging solutions that ensure product safety, reduce material waste, and improve operational efficiency.
              </p>

              <blockquote className="founder-quote-card">
                <p>
                  "Me as an Entrepreneur with a strong passion for Innovation and Manufacturing, I am committed to build a globally recognized Business in the Polymer and Flexible Packaging Industry. Our journey is driven by a Vision to develop high-performance, Sustainable, & value-driven polymer solutions that meet the evolving needs of industries worldwide."
                </p>
                <div className="founder-signature">
                  <strong>{settings.founder}</strong>
                  <span>Founder & Managing Entrepreneur</span>
                </div>
              </blockquote>

              <p className="about-paragraph-sub">
                We believe that Indian manufacturing has the potential to compete with the best in the world. Our mission is to become a trusted global exporter of polymer packaging solutions, proudly representing the quality, precision, and manufacturing capabilities of <strong>Made in India</strong>.
              </p>

              {/* 4 Checkmark Bullets (Matching mockup) */}
              <div className="about-checkmarks-grid">
                <div className="about-check-item">
                  <CheckCircle size={20} className="text-green" />
                  <span>Advanced Manufacturing Technology</span>
                </div>
                <div className="about-check-item">
                  <CheckCircle size={20} className="text-green" />
                  <span>Strict Quality Control & Testing</span>
                </div>
                <div className="about-check-item">
                  <CheckCircle size={20} className="text-green" />
                  <span>Customer Focused Approach</span>
                </div>
                <div className="about-check-item">
                  <CheckCircle size={20} className="text-green" />
                  <span>Sustainable & Recyclable Solutions</span>
                </div>
              </div>
            </div>

            {/* Right Media */}
            <div className="about-media-col">
              <div className="factory-image-card">
                <img 
                  src="/images/factory_building.jpg" 
                  alt="SMS Enterprises Manufacturing Facility Bengaluru" 
                  className="factory-img" 
                />
                <div className="factory-badge-floating">
                  <Factory size={16} className="text-green" />
                  <div>
                    <strong>Production Unit</strong>
                    <span>Chamundeshwari Layout, Bengaluru</span>
                  </div>
                </div>
              </div>

              <div className="experience-highlight-card">
                <div className="exp-icon-wrap">
                  <Globe size={28} className="text-green" />
                </div>
                <div>
                  <h4>Global Exporter Standards</h4>
                  <p>Equipped with 600 m/min Rotogravure and multi-layer blown film extrusion plants.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Stat Boxes (Matching reference mockup layout) */}
      <section className="section-alt about-stats-section">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((st, i) => (
              <div key={i} className="about-stat-card">
                <div className="about-stat-icon">{st.icon}</div>
                <div className="about-stat-num">{st.number}</div>
                <div className="about-stat-txt">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Strategic Pillars (From PDF Page 3) */}
      <section className="section pillars-section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="badge badge-green">OUR CORE PILLARS</span>
            <h2 className="section-title">THE SWASTIK ADVANTAGE</h2>
            <p className="section-subtitle">
              How we partner with logistics companies, FMCG brands, and agricultural producers across India.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((p, idx) => (
              <div key={idx} className="card pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-box">{p.icon}</div>
                  <h3 className="pillar-title">{p.title}</h3>
                </div>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Dark Callout Banner (Matching reference mockup) */}
      <section className="section section-dark mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            {/* Vision */}
            <div className="mission-card">
              <div className="mission-icon-wrap">
                <Compass size={32} className="text-green" />
              </div>
              <div className="mission-content">
                <span className="badge badge-gold">OUR VISION</span>
                <h3>Global Packaging Leader</h3>
                <p>
                  "To be a globally respected manufacturer and exporter of polymer and flexible packaging solutions through continuous innovation, certified quality, and sustainable business practices."
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="mission-card">
              <div className="mission-icon-wrap">
                <Target size={32} className="text-green" />
              </div>
              <div className="mission-content">
                <span className="badge badge-green">OUR MISSION</span>
                <h3>World-Class Customer Value</h3>
                <p>
                  "To deliver world-class polymer products that exceed customer expectations, embrace continuous technological advancement, and build enduring relationships with partners across Indian and International markets."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Trigger CTA */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-inner">
            <div>
              <h3>Ready to Upgrade Your Packaging Strength?</h3>
              <p>Speak with our technical engineering team for roll samples or factory visits.</p>
            </div>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => onOpenQuoteModal()}
            >
              <span>REQUEST PRODUCT SAMPLES</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .about-header-section {
          background-color: #f8fafc;
          padding: 50px 0 20px;
          border-bottom: 1px solid var(--border-light);
        }
        .about-main-section {
          padding: 60px 0;
        }
        .about-story-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 50px;
          align-items: center;
        }
        .about-story-title {
          font-size: 2.2rem;
          color: #0b1a30;
          margin: 12px 0 16px;
        }
        .about-paragraph {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #334155;
          margin-bottom: 20px;
        }
        .about-paragraph-sub {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 24px;
        }

        /* Founder Quote Card */
        .founder-quote-card {
          background-color: #f8fafc;
          border-left: 4px solid var(--primary-green);
          padding: 20px 24px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin-bottom: 20px;
          border-top: 1px solid var(--border-light);
          border-right: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .founder-quote-card p {
          font-style: italic;
          font-size: 0.92rem;
          line-height: 1.6;
          color: #1e293b;
          margin-bottom: 12px;
        }
        .founder-signature strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1rem;
          color: #0f172a;
        }
        .founder-signature span {
          font-size: 0.78rem;
          color: var(--primary-green);
          font-weight: 700;
          text-transform: uppercase;
        }

        /* 4 Checkmark Items */
        .about-checkmarks-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .about-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #0f172a;
          background: #f8fafc;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }

        /* Factory Media */
        .factory-image-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-light);
          margin-bottom: 20px;
        }
        .factory-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
        }
        .factory-badge-floating {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(6px);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow-md);
        }
        .factory-badge-floating strong {
          display: block;
          font-size: 0.84rem;
          color: #0f172a;
        }
        .factory-badge-floating span {
          font-size: 0.74rem;
          color: #64748b;
        }

        .experience-highlight-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }
        .experience-highlight-card h4 {
          font-size: 1rem;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .experience-highlight-card p {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.4;
        }

        /* Stats Section */
        .about-stats-section {
          padding: 50px 0;
        }
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .about-stat-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 24px 20px;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        .about-stat-icon {
          margin-bottom: 8px;
          display: flex;
          justify-content: center;
        }
        .about-stat-num {
          font-family: var(--font-heading);
          font-size: 2.4rem;
          font-weight: 800;
          color: #0b1a30;
          line-height: 1.1;
        }
        .about-stat-txt {
          font-size: 0.82rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }

        /* Pillars Section */
        .pillars-section {
          padding: 70px 0;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .pillar-card {
          padding: 24px;
          background: #ffffff;
        }
        .pillar-header {
          margin-bottom: 14px;
        }
        .pillar-icon-box {
          background: #fef3c7;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        .pillar-title {
          font-size: 1.05rem;
          color: #0b1a30;
        }
        .pillar-desc {
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
        }

        /* Mission Vision Section */
        .mission-vision-section {
          padding: 70px 0;
        }
        .mission-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .mission-card {
          background-color: var(--bg-dark-card);
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          display: flex;
          gap: 20px;
        }
        .mission-icon-wrap {
          flex-shrink: 0;
        }
        .mission-content .badge {
          margin-bottom: 10px;
        }
        .mission-content h3 {
          color: #ffffff;
          font-size: 1.4rem;
          margin-bottom: 12px;
        }
        .mission-content p {
          color: #cbd5e1;
          font-size: 0.95rem;
          line-height: 1.6;
          font-style: italic;
        }

        /* About CTA */
        .about-cta-section {
          padding: 50px 0;
        }
        .about-cta-inner {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }
        .about-cta-inner h3 {
          font-size: 1.6rem;
          color: #0b1a30;
          margin-bottom: 6px;
        }
        .about-cta-inner p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        @media (max-width: 991px) {
          .about-story-grid {
            grid-template-columns: 1fr;
          }
          .about-stats-grid, .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .mission-vision-grid {
            grid-template-columns: 1fr;
          }
          .about-cta-inner {
            flex-direction: column;
            text-align: center;
          }
        }
        @media (max-width: 600px) {
          .about-checkmarks-grid {
            grid-template-columns: 1fr;
          }
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .about-stat-card {
            padding: 16px 12px;
          }
          .about-stat-num {
            font-size: 1.85rem;
          }
          .mission-card {
            padding: 24px 18px;
            flex-direction: column;
            gap: 14px;
          }
          .about-cta-inner {
            padding: 24px 16px;
          }
          .about-cta-inner .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
