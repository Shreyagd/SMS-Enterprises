import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';

export default function QuoteModal({ isOpen, onClose, initialProduct = '' }) {
  const { submitQuote, products } = useData();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productType: initialProduct || 'Custom Packaging Solution',
    thickness: '23 Micron',
    quantity: '500 Rolls',
    destination: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitQuote(formData);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2400);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content quote-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="badge badge-green">QUICK RFQ QUOTATION</span>
            <h3 className="modal-title">Request Industrial Packaging Quote</h3>
            <p className="modal-sub">Direct factory pricing & fast dispatch from SMS ENTERPRISES Bengaluru unit.</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="submission-success-box">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="text-green" />
            </div>
            <h4>Quotation Request Received!</h4>
            <p>Our industrial packaging technical team is reviewing your specifications. An official quotation will be sent to <strong>{formData.email || formData.phone}</strong> promptly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="quote-form">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Contact Person Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Business Name *</label>
                <input 
                  type="text" 
                  name="company"
                  required
                  placeholder="e.g. Apex Logistics Ltd"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="procurement@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone / WhatsApp Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Select Product Line *</label>
                <select 
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="form-select"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Custom Packaging Solution">Custom Packaging Solution</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Thickness / Micron Gauge</label>
                <select 
                  name="thickness"
                  value={formData.thickness}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="12 Micron (Light)">12 Micron (Light Yield)</option>
                  <option value="15 Micron (Standard)">15 Micron (Standard Manual)</option>
                  <option value="20 Micron (Medium Heavy)">20 Micron (Medium Heavy)</option>
                  <option value="23 Micron (Industrial Machine)">23 Micron (Industrial Machine Pallet)</option>
                  <option value="29 Micron (Heavy Duty)">29 Micron (Heavy Duty)</option>
                  <option value="35 - 50 Micron (Extreme Transit)">35 - 50 Micron (Extreme Transit)</option>
                  <option value="60 - 120 Micron (Heavy Shrink)">60 - 120 Micron (Heavy Shrink)</option>
                  <option value="Custom Thickness">Custom / Recommended by SMS</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Required Quantity *</label>
                <input 
                  type="text" 
                  name="quantity"
                  required
                  placeholder="e.g. 500 Rolls, 2 Metric Tons, 20 Pallets"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Destination / City</label>
                <input 
                  type="text" 
                  name="destination"
                  placeholder="e.g. Bengaluru, Hosur, Chennai, Export"
                  value={formData.destination}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Specific Requirements / Technical Details</label>
              <textarea 
                name="message"
                rows="3"
                placeholder="Specify core diameter, UV stabilization, color preference, machine model, or delivery timeline..."
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="modal-footer">
              <div className="security-notice">
                <ShieldAlert size={14} /> Factory direct supply with ISO certified quality
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    <span>SUBMIT RFQ QUOTE</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .quote-modal {
          padding: 30px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }
        .modal-title {
          font-size: 1.45rem;
          color: #0b1a30;
          margin-top: 6px;
          margin-bottom: 4px;
        }
        .modal-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .modal-close-btn {
          background: #f1f5f9;
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #475569;
          transition: var(--transition);
        }
        .modal-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-light);
        }
        .security-notice {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #64748b;
        }
        .submission-success-box {
          text-align: center;
          padding: 40px 20px;
        }
        .success-icon-wrap {
          margin-bottom: 16px;
        }
        .submission-success-box h4 {
          font-size: 1.5rem;
          color: #0b1a30;
          margin-bottom: 10px;
        }
        .submission-success-box p {
          color: var(--text-muted);
          font-size: 0.95rem;
          max-width: 440px;
          margin: 0 auto;
        }

        @media (max-width: 600px) {
          .quote-modal {
            padding: 20px 16px;
          }
          .modal-title {
            font-size: 1.25rem;
          }
          .modal-sub {
            font-size: 0.8rem;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .modal-footer {
            flex-direction: column-reverse;
            gap: 14px;
            align-items: stretch;
          }
          .modal-footer .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
