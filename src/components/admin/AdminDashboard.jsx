import React from 'react';
import { 
  FileText, 
  Mail, 
  Layers, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminDashboard({ onNavigateTab }) {
  const { quotes, messages, products, gallery } = useData();

  const newQuotesCount = quotes.filter(q => q.status === 'New').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;

  const exportQuotesCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Company', 'Phone', 'Email', 'Product', 'Thickness', 'Quantity', 'Destination', 'Status', 'Notes'];
    const rows = quotes.map(q => [
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
    link.setAttribute('download', `sms_enterprises_quotes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-dashboard-root">
      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card" onClick={() => onNavigateTab('quotes')}>
          <div className="metric-header">
            <span className="metric-title">Total RFQ Quotes</span>
            <div className="metric-icon-box bg-green-light">
              <FileText size={20} className="text-green" />
            </div>
          </div>
          <div className="metric-val">{quotes.length}</div>
          <div className="metric-sub">
            {newQuotesCount > 0 ? (
              <span className="text-green font-bold">● {newQuotesCount} New Inquiries</span>
            ) : (
              <span>All inquiries reviewed</span>
            )}
          </div>
        </div>

        <div className="metric-card" onClick={() => onNavigateTab('messages')}>
          <div className="metric-header">
            <span className="metric-title">Contact Messages</span>
            <div className="metric-icon-box bg-blue-light">
              <Mail size={20} className="text-blue" />
            </div>
          </div>
          <div className="metric-val">{messages.length}</div>
          <div className="metric-sub">
            {unreadMessagesCount > 0 ? (
              <span className="text-amber font-bold">● {unreadMessagesCount} Unread Messages</span>
            ) : (
              <span>Inbox up to date</span>
            )}
          </div>
        </div>

        <div className="metric-card" onClick={() => onNavigateTab('products')}>
          <div className="metric-header">
            <span className="metric-title">Catalog Products</span>
            <div className="metric-icon-box bg-purple-light">
              <Layers size={20} className="text-purple" />
            </div>
          </div>
          <div className="metric-val">{products.length}</div>
          <div className="metric-sub">
            <span>High performance films</span>
          </div>
        </div>

        <div className="metric-card" onClick={() => onNavigateTab('gallery')}>
          <div className="metric-header">
            <span className="metric-title">Plant & Gallery</span>
            <div className="metric-icon-box bg-gold-light">
              <TrendingUp size={20} className="text-gold" />
            </div>
          </div>
          <div className="metric-val">{gallery.length}</div>
          <div className="metric-sub">
            <span>Manufacturing assets</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="quick-actions-bar">
        <span className="bar-label">Quick Actions:</span>
        <button className="btn btn-secondary btn-sm" onClick={exportQuotesCSV}>
          <Download size={14} /> Export Quotes (CSV)
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigateTab('products')}>
          + Add New Product
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigateTab('settings')}>
          Update Contact Info
        </button>
      </div>

      {/* Two Column Grid: Recent Quotes & Recent Messages */}
      <div className="dashboard-sections-grid">
        {/* Recent Quotes */}
        <div className="dash-section-card">
          <div className="dash-section-header">
            <h3>Recent RFQ Quotes</h3>
            <button className="btn-link" onClick={() => onNavigateTab('quotes')}>
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.slice(0, 5).map(q => (
                  <tr key={q.id}>
                    <td>
                      <strong>{q.name}</strong>
                      <span className="table-sub">{q.company}</span>
                    </td>
                    <td>{q.productType}</td>
                    <td>{q.quantity}</td>
                    <td>
                      <span className={`status-pill status-${(q.status || 'new').toLowerCase().replace(' ', '-')}`}>
                        {q.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="dash-section-card">
          <div className="dash-section-header">
            <h3>Recent Contact Inquiries</h3>
            <button className="btn-link" onClick={() => onNavigateTab('messages')}>
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="recent-messages-list">
            {messages.slice(0, 4).map(m => (
              <div key={m.id} className="mini-msg-item">
                <div className="mini-msg-header">
                  <strong>{m.name}</strong>
                  <span className="msg-date">
                    {m.date ? new Date(m.date).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <div className="mini-msg-subject">{m.subject || 'General Inquiry'}</div>
                <p className="mini-msg-body">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }
        .metric-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 22px;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }
        .metric-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--primary-green);
        }
        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .metric-title {
          font-size: 0.84rem;
          font-weight: 600;
          color: #64748b;
        }
        .metric-icon-box {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-green-light { background: #dcfce7; }
        .bg-blue-light { background: #e0e7ff; }
        .bg-purple-light { background: #f3e8ff; }
        .bg-gold-light { background: #fef3c7; }
        .text-blue { color: #4338ca; }
        .text-purple { color: #7e22ce; }
        .text-amber { color: #d97706; }

        .metric-val {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
        }
        .metric-sub {
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 6px;
        }

        /* Quick Actions Bar */
        .quick-actions-bar {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .bar-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
        }

        /* Dashboard Grid */
        .dashboard-sections-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 24px;
        }
        .dash-section-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        .dash-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid #edf2f7;
        }
        .dash-section-header h3 {
          font-size: 1.1rem;
          color: #0b1a30;
        }
        .btn-link {
          background: none;
          border: none;
          color: var(--primary-green);
          font-size: 0.82rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        /* Dash Table */
        .dash-table-wrap {
          overflow-x: auto;
        }
        .dash-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .dash-table th {
          text-align: left;
          padding: 10px 12px;
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          border-bottom: 1px solid var(--border-light);
        }
        .dash-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .table-sub {
          display: block;
          font-size: 0.74rem;
          color: #64748b;
        }

        /* Status Pills */
        .status-pill {
          display: inline-block;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .status-new { background: #dbeafe; color: #1e40af; }
        .status-in-review { background: #fef3c7; color: #92400e; }
        .status-quoted { background: #dcfce7; color: #166534; }
        .status-completed { background: #f1f5f9; color: #475569; }

        /* Recent Messages */
        .recent-messages-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .mini-msg-item {
          padding: 12px 14px;
          background: #f8fafc;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
        }
        .mini-msg-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
          margin-bottom: 4px;
        }
        .msg-date {
          font-size: 0.74rem;
          color: #94a3b8;
        }
        .mini-msg-subject {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-green);
          margin-bottom: 4px;
        }
        .mini-msg-body {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 1050px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .dashboard-sections-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .metric-card {
            padding: 14px 12px;
          }
          .metric-val {
            font-size: 1.6rem;
          }
          .quick-actions-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            padding: 14px 12px;
          }
          .quick-actions-bar .btn {
            width: 100%;
          }
          .dash-section-card {
            padding: 16px 12px;
          }
          .dash-table {
            min-width: 480px;
          }
        }
        @media (max-width: 400px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
