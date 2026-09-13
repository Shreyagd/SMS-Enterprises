import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle, Search, HelpCircle, Filter } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ProductsPage({ setActivePage, onOpenQuoteModal, onSelectProduct }) {
  const { products } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Stretch Film',
    'LDPE Shrink Film',
    'Bopp Laminated Roll',
    'Agri Packaging Films',
    'Pharma Garbage Bags'
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page-root">
      {/* Header */}
      <section className="products-header-section">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">OUR PRODUCTS</h1>
            <p className="section-subtitle">
              High performance stretch films for every wrapping need & flexible packaging solutions
            </p>
          </div>
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
                        <span>{cat === 'All' ? 'All Products' : cat}</span>
                        {isActive && <div className="active-dot" />}
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
            <main className="products-main-content">
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
                <div className="products-cards-grid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="card product-item-card">
                      <div className="product-thumb-wrap">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-thumb-img" 
                        />
                        {product.badge && (
                          <span className="product-card-badge">{product.badge}</span>
                        )}
                      </div>

                      <div className="product-card-info">
                        <span className="product-category-tag">{product.category}</span>
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-snippet">{product.subtitle}</p>

                        <div className="product-key-specs">
                          <div className="spec-pill">
                            <span>Micron:</span> <strong>{product.thickness}</strong>
                          </div>
                          <div className="spec-pill">
                            <span>Core:</span> <strong>{product.coreSize}</strong>
                          </div>
                        </div>

                        <div className="product-card-bottom-actions">
                          <button 
                            className="btn-link-details"
                            onClick={() => onSelectProduct(product)}
                          >
                            VIEW DETAILS
                          </button>
                          
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => onOpenQuoteModal(product.name)}
                          >
                            GET A QUOTE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <style>{`
        .products-header-section {
          background-color: #f8fafc;
          padding: 50px 0 30px;
          border-bottom: 1px solid var(--border-light);
        }
        .products-body-section {
          padding: 50px 0 80px;
        }
        .products-layout-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          align-items: flex-start;
        }

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
          height: 190px;
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
        .btn-link-details:hover {
          color: var(--green-hover);
          text-decoration: underline;
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
          .products-layout-grid {
            grid-template-columns: 1fr;
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
