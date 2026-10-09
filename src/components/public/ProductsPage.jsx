import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Search, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Media from '../common/Media';
import { PRODUCT_CATEGORIES, CATEGORY_BLURBS, categorySlug as toSlug } from '../../data/products';

const ProductCard = ({ product, onSelectProduct, onOpenQuoteModal }) => {
  const [imgIndex, setImgIndex] = useState(0);
  
  const [failedImages, setFailedImages] = useState([]);
  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const loadable = allImages.filter(src => src && !failedImages.includes(src));
  const images = loadable.length ? loadable : ['/images/packaging_showroom.jpg'];
  
  const nextImage = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="card product-item-card"
      role="link"
      tabIndex={0}
      onClick={() => onSelectProduct(product)}
      onKeyDown={(e) => e.key === 'Enter' && onSelectProduct(product)}
    >
      <div className="product-thumb-wrap">
        <Media 
          src={images[imgIndex] || images[0]}
          onError={() => {
            const src = images[imgIndex] || images[0];
            setFailedImages(prev => (prev.includes(src) ? prev : [...prev, src]));
            setImgIndex(0);
          }}
          alt={product.name} 
          className="product-thumb-img"
          loading="lazy"
        />
        {images.length > 1 && (
          <div className="carousel-controls">
            <button className="carousel-btn left" onClick={prevImage}>
              <ChevronLeft size={18} />
            </button>
            <button className="carousel-btn right" onClick={nextImage}>
              <ChevronRight size={18} />
            </button>
            <div className="carousel-indicators">
              {images.map((_, idx) => (
                <span key={idx} className={`dot ${idx === imgIndex ? 'active' : ''}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="product-card-info">
        <span className="product-category-tag">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-snippet">{product.subtitle}</p>

        <div className="product-key-specs">
          {product.thickness && (
            <div className="spec-pill">
              <span>Thickness:</span> <strong>{product.thickness}</strong>
            </div>
          )}
        </div>

        <div className="product-card-bottom-actions">
          <span className="btn-link-details">
            View details <ArrowRight size={14} />
          </span>

          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => { e.stopPropagation(); onOpenQuoteModal(product.name); }}
          >
            GET A QUOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage({ categorySlug, onSelectCategory, setActivePage, onOpenQuoteModal, onSelectProduct }) {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const activeProducts = products.filter(p => !p.archived);
  const categoryNames = [...new Set([...PRODUCT_CATEGORIES, ...activeProducts.map(p => p.category)])];
  const categories = ['All', ...categoryNames];
  // The selected category lives in the URL (/products?category=fmcg) so menu links and shared links open it
  const selectedCategory = categoryNames.find(c => toSlug(c) === categorySlug) || 'All';
  const setSelectedCategory = (cat) => onSelectCategory(cat === 'All' ? null : toSlug(cat));

  useEffect(() => {
    if (categorySlug) document.getElementById('products-list')?.scrollIntoView({ behavior: 'smooth' });
  }, [categorySlug]);
  const countFor = (cat) => cat === 'All' ? activeProducts.length : activeProducts.filter(p => p.category === cat).length;

  const term = searchTerm.toLowerCase();
  const filteredProducts = activeProducts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = [p.name, p.subtitle, p.category, p.description]
      .some(v => (v || '').toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page-root">
      {/* Header */}
      <section className="products-header-section">
        <div className="container">
                    <span className="products-eyebrow">Product Catalogue</span>
          <h1 className="products-hero-title">Packaging films &amp; flexible packaging, engineered for your line</h1>
          <p className="products-hero-sub">
            Shrink &amp; stretch films, VCI films and liners, agricultural films and multi-layer laminates. {products.length} product lines, customised to your size, thickness and print.
          </p>
        </div>
      </section>

      {/* Main Layout: Sidebar + Product Grid */}
      <section className="section products-body-section">
        <div className="container">
          <div className="products-layout-grid">
            {/* Left Sidebar */}
            <aside className="products-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">PRODUCT CATEGORIES</h3>
                <div className="sidebar-category-list">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`sidebar-cat-btn ${isActive ? 'cat-btn-active' : ''}`}
                        >
                          <span>{(cat === 'All' ? 'All Products' : cat).toUpperCase()}</span>
                          <span className="cat-count">{countFor(cat)}</span>
                        </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Solution Card (Matching mockup) */}
              <div className="custom-solution-card">
                <div className="custom-card-content">
                  <h4>Need a Custom Solution?</h4>
                  <p>
                    We offer customized sizes, thickness & properties as per your requirement.
                  </p>
                  <button 
                    className="btn btn-primary btn-sm btn-block"
                    onClick={() => {
                      setActivePage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    CONTACT US
                  </button>
                </div>
              </div>

              {/* Quality assurance badge */}
              <div className="sidebar-quality-box">
                <div className="quality-header">
                  <CheckCircle size={18} className="text-green" />
                  <strong>Factory Guaranteed</strong>
                </div>
                <p>100% Virgin polymer granules used. Consistent tensile strength across every roll.</p>
              </div>
            </aside>

            {/* Right Product Grid */}
                        <main className="products-main-content" id="products-list">
              {/* Search and results count */}
              <div className="products-toolbar">
                <div className="results-count">
                  Showing <strong>{filteredProducts.length}</strong> packaging solutions
                  {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
                </div>

                <div className="search-box">
                  <Search size={16} className="search-icon" />
                  <input 
                    type="text"
                    placeholder="Search by film type or micron..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="no-products-box">
                  <HelpCircle size={48} className="text-muted" />
                  <h3>No products found</h3>
                  <p>Try searching with another keyword or select a different category.</p>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                                categoryNames
                  .map(cat => ({ cat, items: filteredProducts.filter(p => p.category === cat) }))
                  .filter(group => group.items.length)
                  .map(({ cat, items }) => (
                    <section key={cat} className="category-section" id={`category-${toSlug(cat)}`}>
                      <div className="category-section-head">
                        <div>
                          <h2 className="category-section-title">{cat}</h2>
                          {CATEGORY_BLURBS[cat] && <p className="category-section-blurb">{CATEGORY_BLURBS[cat]}</p>}
                        </div>
                        <span className="category-section-count">{items.length} {items.length === 1 ? 'product' : 'products'}</span>
                      </div>
                      <div className="products-cards-grid">
                        {items.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onSelectProduct={onSelectProduct}
                            onOpenQuoteModal={onOpenQuoteModal}
                          />
                        ))}
                      </div>
                    </section>
                  ))
              )}
            </main>
          </div>
        </div>
      </section>

      <style>{`
                .products-header-section {
          background: linear-gradient(120deg, var(--primary-navy) 0%, var(--navy-light) 100%);
          padding: 64px 0 56px;
          color: #fff;
        }
        .products-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #4ade80;
          margin-bottom: 12px;
        }
        .products-hero-title {
          color: #fff;
          font-size: 2.6rem;
          font-weight: 800;
          max-width: 760px;
          letter-spacing: -0.5px;
          margin-bottom: 14px;
        }
        .products-hero-sub {
          color: #cbd5e1;
          font-size: 1.05rem;
          max-width: 680px;
          line-height: 1.7;
        }
        .cat-count {
          font-size: 0.75rem;
          font-weight: 700;
          background: #f1f5f9;
          color: #64748b;
          border-radius: var(--radius-full);
          padding: 1px 8px;
        }
        .cat-btn-active .cat-count {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }
        .product-item-card {
          cursor: pointer;
        }
        .product-item-card:focus-visible {
          outline: 2px solid var(--primary-green);
          outline-offset: 2px;
        }
        .products-body-section {
          padding: 50px 0 80px;
        }
        .products-layout-grid {
          display: grid;
                    grid-template-columns: 260px 1fr;
          gap: 40px;
          align-items: flex-start;
        }

        .products-layout-grid > * { min-width: 0; }
        /* Left Sidebar */
        .sidebar-card {
          background-color: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }
        .sidebar-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0b1a30;
          letter-spacing: 0.5px;
          padding: 18px 20px 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .sidebar-category-list {
          display: flex;
          flex-direction: column;
          padding: 10px;
          gap: 6px;
        }
        .sidebar-cat-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: none;
          background: transparent;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
        }
        .sidebar-cat-btn:hover {
          background-color: #f1f5f9;
          color: var(--primary-green);
        }
        .cat-btn-active {
          background-color: var(--primary-green) !important;
          color: #ffffff !important;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(21, 128, 61, 0.3);
        }
        .active-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
        }

        /* Custom Solution Card */
        .custom-solution-card {
          background: #ffffff;
          border: 1.5px dashed var(--border-green);
          border-radius: var(--radius-md);
          padding: 24px 20px;
          margin-bottom: 24px;
        }
        .custom-card-content h4 {
          font-size: 1.1rem;
          color: #0b1a30;
          margin-bottom: 8px;
        }
        .custom-card-content p {
          font-size: 0.86rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        /* Sidebar Quality Box */
        .sidebar-quality-box {
          background-color: #f0fdf4;
          border: 1px solid rgba(22, 163, 74, 0.2);
          border-radius: var(--radius-md);
          padding: 18px 20px;
        }
        .quality-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--primary-green);
          margin-bottom: 6px;
        }
        .sidebar-quality-box p {
          font-size: 0.8rem;
          color: #166534;
          line-height: 1.4;
        }

        /* Right Content Area */
        .products-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }
        .results-count {
          font-size: 0.9rem;
          color: #64748b;
        }
        .search-box {
          position: relative;
          width: 280px;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .search-input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          outline: none;
          transition: var(--transition);
        }
        .search-input:focus {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
        }

                /* Products Grid */
        .products-main-content {
          scroll-margin-top: 90px;
        }
        .category-section + .category-section {
          margin-top: 56px;
        }
        .category-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 22px;
          padding-bottom: 14px;
          border-bottom: 2px solid #edf2f7;
          position: relative;
        }
        .category-section-head::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 64px;
          height: 2px;
          background: var(--primary-green);
        }
        .category-section-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0b1a30;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .category-section-blurb {
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 560px;
        }
        .category-section-count {
          flex-shrink: 0;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--green-bg);
          border-radius: var(--radius-full);
          padding: 4px 12px;
        }
        @media (max-width: 580px) {
          .category-section-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .category-section-title {
            font-size: 1.3rem;
          }
          .category-section + .category-section {
            margin-top: 40px;
          }
        }
        .products-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .product-item-card {
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .product-thumb-wrap {
          position: relative;
                    height: 200px;
          background-color: #f8fafc;
          overflow: hidden;
        }
        .product-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .product-item-card:hover .product-thumb-img {
          transform: scale(1.06);
        }
        .carousel-controls {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }
        .carousel-btn {
          opacity: 0;
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        .product-thumb-wrap:hover .carousel-btn {
          opacity: 1;
        }
        .carousel-btn:hover {
          background: #fff;
          color: var(--primary-green);
          transform: scale(1.1);
        }
        .carousel-indicators {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          pointer-events: none;
          z-index: 2;
        }
        .carousel-indicators .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.2s;
        }
        .carousel-indicators .dot.active {
          background: #fff;
          transform: scale(1.2);
        }
        .product-card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .product-card-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .product-category-tag {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .product-title {
          font-size: 1.18rem;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .product-snippet {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 14px;
          flex-grow: 1;
        }
        .product-key-specs {
          display: flex;
          gap: 8px;
          margin-bottom: 18px;
        }
        .spec-pill {
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.76rem;
          color: #475569;
        }
        .spec-pill strong {
          color: #0f172a;
        }
        .product-card-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #edf2f7;
        }
                .btn-link-details {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--primary-green);
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0;
          transition: var(--transition);
        }
                .product-item-card:hover .btn-link-details {
          color: var(--green-hover);
        }

        .no-products-box {
          text-align: center;
          padding: 60px 20px;
          background: #f8fafc;
          border-radius: var(--radius-lg);
          border: 1px dashed var(--border-light);
        }
        .no-products-box h3 {
          margin: 14px 0 6px;
        }
        .no-products-box p {
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        @media (max-width: 1100px) {
          .products-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
                @media (max-width: 800px) {
          .products-header-section {
            padding: 40px 0 36px;
          }
          .products-hero-title {
            font-size: 1.75rem;
          }
          .products-hero-sub {
            font-size: 0.95rem;
          }
          .products-layout-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
          }
          .sidebar-card {
            padding: 16px;
            margin-bottom: 16px;
          }
          .sidebar-title {
            font-size: 0.82rem;
            margin-bottom: 10px;
          }
          .sidebar-category-list {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            gap: 8px;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .sidebar-cat-btn {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 8px 14px;
            font-size: 0.82rem;
          }
          .custom-solution-card, .sidebar-quality-box {
            display: none;
          }
          .products-toolbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 20px;
          }
          .search-box {
            width: 100%;
          }
        }
        @media (max-width: 580px) {
          .products-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .product-thumb-wrap {
            height: 210px;
          }
          .product-card-info {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
