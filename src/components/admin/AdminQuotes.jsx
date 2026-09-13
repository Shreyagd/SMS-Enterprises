import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Phone, 
  Mail, 
  CheckCircle, 
  Save, 
  X,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminQuotes() {
  const { quotes, updateQuote, deleteQuote } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  const statuses = ['All', 'New', 'In Review', 'Quoted', 'Completed'];

  const filteredQuotes = quotes.filter(q => {
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (q.name && q.name.toLowerCase().includes(term)) ||
      (q.company && q.company.toLowerCase().includes(term)) ||
      (q.email && q.email.toLowerCase().includes(term)) ||
      (q.phone && q.phone.includes(term)) ||
      (q.productType && q.productType.toLowerCase().includes(term)) ||
      (q.destination && q.destination.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetails = (quote) => {
    setSelectedQuote(quote);
    setAdminNotes(quote.adminNotes || '');
  };

  const handleSaveNotes = () => {
    if (selectedQuote) {
      updateQuote(selectedQuote.id, { adminNotes });
      setSelectedQuote(prev => ({ ...prev, adminNotes }));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateQuote(id, { status: newStatus });
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote(prev => ({ ...prev, status: newStatus }));
    }
  };

  const exportQuotesCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Company', 'Phone', 'Email', 'Product', 'Thickness', 'Quantity', 'Destination', 'Status', 'Notes'];
    const rows = filteredQuotes.map(q => [
      q.id,
      q.date ? new Date(q.date).toLocaleDateString() : '',
      `"${q.name || ''}"`,
      `"${q.company || ''}"`,
      `"${q.phone || ''}"`,
      `"${q.email || ''}"`,
      `"${q.productType || ''}"`,
      `"${q.thickness || ''}"`,
      `"${q.quantity || ''}"`,
      `"${q.destination || ''}"`,
      q.status || 'New',
      `"${(q.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sms_quotes_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-quotes-root">
      {/* Top Controls Toolbar */}
      <div className="quotes-toolbar">
        <div className="toolbar-left">
          <h2>RFQ Quote Management</h2>
          <p>Real-time customer stretch film & packaging inquiries submitted via website</p>
        </div>

        <div className="toolbar-right">
          <button className="btn btn-secondary btn-sm" onClick={exportQuotesCSV}>
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="quotes-filter-row">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by client, company, product, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="status-filter-pills">
          <span className="filter-label"><Filter size={14} /> Filter:</span>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`status-btn ${statusFilter === st ? 'status-btn-active' : ''}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
      <div className="quotes-table-card">
        <div className="table-responsive">
          <table className="quotes-table">
            <thead>
              <tr>
                <th>RFQ ID / Date</th>
                <th>Client & Company</th>
                <th>Contact</th>
                <th>Requested Product</th>
                <th>Specs / Qty</th>
                <th>Status</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="td-empty">
                    No quote requests found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map(q => (
                  <tr key={q.id}>
                    <td>
                      <strong className="quote-id">{q.id}</strong>
                      <span className="quote-date">
                        {q.date ? new Date(q.date).toLocaleDateString() : 'Recent'}
                      </span>
                    </td>
                    <td>
                      <div className="client-name">{q.name}</div>
                      <div className="client-company">{q.company || 'Direct Buyer'}</div>
                      {q.destination && (
                        <span className="client-city">📍 {q.destination}</span>
                      )}
                    </td>
                    <td>
                      <a href={`tel:${q.phone}`} className="contact-link">
                        <Phone size={13} /> {q.phone}
                      </a>
                      <a href={`mailto:${q.email}`} className="contact-link">
                        <Mail size={13} /> {q.email}
                      </a>
                    </td>
                    <td>
                      <strong>{q.productType}</strong>
                    </td>
                    <td>
                      <span className="badge badge-navy">{q.thickness}</span>
                      <div className="qty-sub">{q.quantity}</div>
                    </td>
                    <td>
                      <select 
                        value={q.status || 'New'}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`status-select status-${(q.status || 'new').toLowerCase().replace(' ', '-')}`}
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button 
                          className="action-btn view-btn"
                          title="View Full RFQ"
                          onClick={() => handleOpenDetails(q)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-btn del-btn"
                          title="Delete Record"
                          onClick={() => {
                            if (window.confirm(`Delete quote record ${q.id}?`)) {
                              deleteQuote(q.id);
                            }
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Inspection Modal */}
      {selectedQuote && (
        <div className="modal-overlay" onClick={() => setSelectedQuote(null)}>
          <div className="modal-content quote-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge badge-green">{selectedQuote.id}</span>
                <h3 className="modal-title">RFQ Lead Details</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedQuote(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-grid-2">
                <div className="info-block">
                  <span className="block-label">Customer Name</span>
                  <div className="block-val">{selectedQuote.name}</div>
                </div>
                <div className="info-block">
                  <span className="block-label">Company Name</span>
                  <div className="block-val">{selectedQuote.company || 'Not Specified'}</div>
                </div>
                <div className="info-block">
                  <span className="block-label">Phone</span>
                  <div className="block-val">
                    <a href={`tel:${selectedQuote.phone}`} className="val-link">
                      {selectedQuote.phone}
                    </a>
                    <a 
                      href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="wa-link-btn"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
                <div className="info-block">
                  <span className="block-label">Email</span>
                  <div className="block-val">
                    <a href={`mailto:${selectedQuote.email}`} className="val-link">
                      {selectedQuote.email}
                    </a>
                  </div>
                </div>
                <div className="info-block">
                  <span className="block-label">Requested Film Type</span>
                  <div className="block-val font-bold text-green">{selectedQuote.productType}</div>
                </div>
                <div className="info-block">
                  <span className="block-label">Micron / Thickness</span>
                  <div className="block-val">{selectedQuote.thickness}</div>
                </div>
                <div className="info-block">
                  <span className="block-label">Order Volume / Quantity</span>
                  <div className="block-val">{selectedQuote.quantity}</div>
                </div>
                <div className="info-block">
                  <span className="block-label">Destination Location</span>
                  <div className="block-val">{selectedQuote.destination || 'Not Specified'}</div>
                </div>
              </div>

              {selectedQuote.message && (
                <div className="client-notes-box">
                  <span className="block-label">Client Message & Requirements</span>
                  <p>{selectedQuote.message}</p>
                </div>
              )}

              <div className="admin-notes-section">
                <span className="block-label">Internal Admin / Sales Notes</span>
                <textarea 
                  rows="3"
                  placeholder="Add quotation pricing details, follow up schedule, executive assigned..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="form-textarea"
                />
                <div className="notes-save-bar">
                  <button className="btn btn-primary btn-sm" onClick={handleSaveNotes}>
                    <Save size={14} /> Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .quotes-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .toolbar-left h2 {
          font-size: 1.4rem;
          color: #0b1a30;
        }
        .toolbar-left p {
          font-size: 0.85rem;
          color: #64748b;
        }

        .quotes-filter-row {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 14px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .status-filter-pills {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .filter-label {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #64748b;
        }
        .status-btn {
          padding: 5px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: #f8fafc;
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }
        .status-btn:hover {
          background: #edf2f7;
        }
        .status-btn-active {
          background: var(--primary-green) !important;
          color: #ffffff !important;
          border-color: var(--primary-green) !important;
        }

        .quotes-table-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .table-responsive {
          overflow-x: auto;
        }
        .quotes-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
        }
        .quotes-table th {
          text-align: left;
          padding: 14px 16px;
          background: #f8fafc;
          color: #475569;
          font-weight: 700;
          border-bottom: 1px solid var(--border-light);
        }
        .quotes-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #edf2f7;
          vertical-align: middle;
        }
        .quote-id {
          display: block;
          color: #0b1a30;
          font-family: monospace;
          font-size: 0.84rem;
        }
        .quote-date {
          font-size: 0.74rem;
          color: #94a3b8;
        }
        .client-name {
          font-weight: 700;
          color: #0f172a;
        }
        .client-company {
          font-size: 0.78rem;
          color: #64748b;
        }
        .client-city {
          font-size: 0.72rem;
          color: #22c55e;
          font-weight: 600;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #475569;
          font-size: 0.8rem;
          margin-bottom: 4px;
        }
        .contact-link:hover {
          color: var(--primary-green);
        }
        .qty-sub {
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 3px;
        }
        .status-select {
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid var(--border-light);
          cursor: pointer;
        }
        .row-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .view-btn { color: #3b82f6; }
        .view-btn:hover { background: #eff6ff; border-color: #3b82f6; }
        .del-btn { color: #ef4444; }
        .del-btn:hover { background: #fef2f2; border-color: #ef4444; }
        .td-empty {
          text-align: center;
          padding: 40px;
          color: #94a3b8;
        }

        /* Detail Modal */
        .quote-detail-modal {
          max-width: 650px;
          padding: 28px;
        }
        .detail-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: #f8fafc;
          padding: 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          margin-bottom: 18px;
        }
        .block-label {
          display: block;
          font-size: 0.74rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .block-val {
          font-size: 0.92rem;
          font-weight: 600;
          color: #0f172a;
        }
        .val-link {
          color: var(--primary-green);
        }
        .wa-link-btn {
          display: inline-block;
          margin-left: 8px;
          font-size: 0.72rem;
          background: #dcfce7;
          color: #166534;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .client-notes-box {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          padding: 14px;
          border-radius: var(--radius-sm);
          margin-bottom: 18px;
          font-size: 0.88rem;
          color: #92400e;
        }
        .admin-notes-section {
          margin-top: 14px;
        }
        .notes-save-bar {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .quotes-toolbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .quotes-toolbar .btn {
            width: 100%;
          }
          .quotes-filter-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .search-box {
            width: 100%;
          }
          .status-filter-pills {
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .quotes-table {
            min-width: 650px;
          }
        }

        @media (max-width: 600px) {
          .quote-detail-modal {
            padding: 20px 16px;
          }
          .detail-grid-2 {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .notes-save-bar .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
