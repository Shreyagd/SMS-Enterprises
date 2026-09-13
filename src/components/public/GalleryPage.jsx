import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Factory } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function GalleryPage({ setActivePage, onOpenQuoteModal }) {
  const { gallery } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Infrastructure', 'Printing Plant', 'Products', 'Applications', 'Agriculture', 'Headquarters'];

  const filteredItems = gallery.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="gallery-page-root">
      {/* Header */}
      <section className="gallery-header-section">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">GALLERY</h1>
            <p className="section-subtitle">
              Explore our products and packaging solutions, manufacturing plants, and extrusion technology
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="gallery-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`gallery-tab-btn ${selectedCategory === cat ? 'tab-btn-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section gallery-grid-section">
        <div className="container">
          <div className="gallery-items-grid">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="gallery-card"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="gallery-thumb-wrap">
                  <img src={item.image} alt={item.title} className="gallery-img" />
                  <div className="gallery-overlay">
                    <div className="zoom-btn">
                      <ZoomIn size={22} />
                    </div>
                    <span className="overlay-cat">{item.category}</span>
                    <h4 className="overlay-title">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Information CTA Bar (Matching reference mockup) */}
          <div className="gallery-cta-banner">
            <div className="cta-banner-left">
              <div className="cta-icon-box">
                <MessageSquare size={24} className="text-green" />
              </div>
              <div>
                <h4 className="cta-heading">Need More Information?</h4>
                <p className="cta-sub">Contact us today for product samples and customized solutions.</p>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-md"
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <button 
            className="lightbox-close" 
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img 
              src={filteredItems[lightboxIndex].image} 
              alt={filteredItems[lightboxIndex].title} 
              className="lightbox-image" 
            />
            <div className="lightbox-info">
              <span className="badge badge-green">{filteredItems[lightboxIndex].category}</span>
              <h3 className="lightbox-title">{filteredItems[lightboxIndex].title}</h3>
              <p className="lightbox-desc">{filteredItems[lightboxIndex].description}</p>
              <div className="lightbox-actions">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setLightboxIndex(null);
                    onOpenQuoteModal(filteredItems[lightboxIndex].title);
                  }}
                >
                  REQUEST QUOTE FOR THIS SOLUTION
                </button>
              </div>
            </div>
          </div>

          <button 
            className="lightbox-nav lightbox-next" 
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <style>{`
        .gallery-header-section {
          background-color: #f8fafc;
          padding: 50px 0 20px;
          border-bottom: 1px solid var(--border-light);
        }
        .gallery-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .gallery-tab-btn {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: var(--transition);
        }
        .gallery-tab-btn:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }
        .tab-btn-active {
          background-color: var(--primary-green) !important;
          color: #ffffff !important;
          border-color: var(--primary-green) !important;
        }

        .gallery-grid-section {
          padding: 50px 0 80px;
        }
        .gallery-items-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 50px;
        }
        .gallery-card {
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          background: #ffffff;
        }
        .gallery-thumb-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.08);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 25, 47, 0.9) 0%, rgba(10, 25, 47, 0.2) 60%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .zoom-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 38px;
          height: 38px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
        }
        .overlay-cat {
          font-size: 0.72rem;
          font-weight: 700;
          color: #22c55e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .overlay-title {
          font-size: 1.05rem;
          color: #ffffff;
          font-weight: 700;
        }

        /* Bottom Information Bar */
        .gallery-cta-banner {
          background-color: #0c1c30;
          border-radius: var(--radius-md);
          padding: 24px 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          color: #ffffff;
        }
        .cta-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cta-icon-box {
          background-color: rgba(34, 197, 94, 0.15);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cta-heading {
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .cta-sub {
          font-size: 0.88rem;
          color: #94a3b8;
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(5, 12, 24, 0.94);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          animation: fadeIn 0.2s ease;
        }
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.12);
          border: none;
          color: #ffffff;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.25);
        }
        .lightbox-prev { left: 24px; }
        .lightbox-next { right: 24px; }

        .lightbox-content {
          max-width: 860px;
          width: 100%;
          background: #0f1e33;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .lightbox-image {
          width: 100%;
          max-height: 500px;
          object-fit: contain;
          background-color: #08111e;
        }
        .lightbox-info {
          padding: 24px 30px;
          color: #ffffff;
        }
        .lightbox-title {
          font-size: 1.4rem;
          color: #ffffff;
          margin: 8px 0 6px;
        }
        .lightbox-desc {
          font-size: 0.92rem;
          color: #94a3b8;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        @media (max-width: 900px) {
          .gallery-items-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gallery-cta-banner {
            flex-direction: column;
            text-align: center;
          }
          .cta-banner-left {
            flex-direction: column;
          }
        }
        @media (max-width: 600px) {
          .gallery-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
          }
          .gallery-tab-btn {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 7px 14px;
            font-size: 0.8rem;
          }
          .gallery-items-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .gallery-thumb-wrap {
            height: 220px;
          }
          .lightbox-overlay {
            padding: 12px;
          }
          .lightbox-nav {
            width: 40px;
            height: 40px;
          }
          .lightbox-prev { left: 6px; }
          .lightbox-next { right: 6px; }
          .lightbox-info {
            padding: 16px;
          }
          .lightbox-title {
            font-size: 1.15rem;
          }
          .gallery-cta-banner {
            padding: 20px 16px;
          }
        }
      `}</style>
    </div>
  );
}
