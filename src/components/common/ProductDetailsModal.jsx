import React from 'react';
import { X, CheckCircle, Shield, ArrowRight, Layers, Box, Cpu } from 'lucide-react';

export default function ProductDetailsModal({ product, onClose, onOpenQuote }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-green">{product.category}</span>
            <h3 className="modal-title">{product.name}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="product-detail-body">
          <div className="detail-media">
            <img src={product.image} alt={product.name} className="detail-img" />
            <div className="detail-badge-overlay">{product.badge}</div>
          </div>

          <div className="detail-info">
            <p className="detail-desc">{product.description}</p>

            <h4 className="specs-heading">Technical Specifications</h4>
            <div className="specs-table">
              <div className="spec-row">
                <span className="spec-label">Thickness / Gauge:</span>
                <span className="spec-val">{product.thickness}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Standard Width:</span>
                <span className="spec-val">{product.width}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Elongation / Stretch:</span>
                <span className="spec-val">{product.elongation}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Paper Core Size:</span>
                <span className="spec-val">{product.coreSize}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">UV Protection:</span>
                <span className="spec-val">Available up to 12 Months UV resistance</span>
              </div>
            </div>

            {product.applications && (
              <div className="detail-apps">
                <h4 className="specs-heading">Primary Applications</h4>
                <ul className="apps-list">
                  {product.applications.map((app, i) => (
                    <li key={i}>
                      <CheckCircle size={15} className="text-green" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detail-cta-bar">
              <button 
                className="btn btn-primary btn-block"
                onClick={() => {
                  onClose();
                  onOpenQuote(product.name);
                }}
              >
                <span>REQUEST QUOTE FOR THIS PRODUCT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .product-detail-modal {
          max-width: 780px;
          padding: 28px;
        }
        .product-detail-body {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 28px;
          margin-top: 18px;
        }
        .detail-media {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid var(--border-light);
          height: fit-content;
        }
        .detail-img {
          width: 100%;
          height: 280px;
          object-fit: cover;
        }
        .detail-badge-overlay {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background-color: var(--primary-navy);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
        }
        .detail-desc {
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .specs-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0b1a30;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .specs-table {
          background: #f8fafc;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          padding: 6px 14px;
          margin-bottom: 20px;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #edf2f7;
          font-size: 0.85rem;
        }
        .spec-row:last-child {
          border-bottom: none;
        }
        .spec-label {
          color: #64748b;
          font-weight: 500;
        }
        .spec-val {
          font-weight: 700;
          color: #0f172a;
        }
        .apps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }
        .apps-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #334155;
        }
        .detail-cta-bar {
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .product-detail-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .detail-img {
            height: 220px;
          }
        }
        @media (max-width: 600px) {
          .product-detail-modal {
            padding: 20px 16px;
          }
          .modal-title {
            font-size: 1.25rem;
          }
          .detail-img {
            height: 190px;
          }
          .specs-table {
            padding: 4px 10px;
          }
          .spec-row {
            font-size: 0.8rem;
            flex-direction: column;
            gap: 2px;
            padding: 6px 0;
          }
        }
      `}</style>
    </div>
  );
}
