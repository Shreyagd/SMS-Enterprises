import React, { useState } from 'react';
import { Mail, Phone, Trash2, CheckCircle, Clock, Reply, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminMessages() {
  const { messages, updateMessage, deleteMessage } = useData();
  const [filter, setFilter] = useState('All');

  const filteredMessages = messages.filter(m => {
    if (filter === 'Unread') return m.status === 'Unread';
    if (filter === 'Read') return m.status === 'Read';
    return true;
  });

  const handleToggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Unread' ? 'Read' : 'Unread';
    updateMessage(id, { status: nextStatus });
  };

  return (
    <div className="admin-messages-root">
      <div className="messages-toolbar">
        <div>
          <h2>Contact Inquiries Inbox</h2>
          <p>Messages received through the Contact Us form on the website</p>
        </div>

        <div className="filter-buttons">
          <button 
            className={`btn btn-sm ${filter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('All')}
          >
            All Messages ({messages.length})
          </button>
          <button 
            className={`btn btn-sm ${filter === 'Unread' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('Unread')}
          >
            Unread ({messages.filter(m => m.status === 'Unread').length})
          </button>
        </div>
      </div>

      <div className="messages-list-container">
        {filteredMessages.length === 0 ? (
          <div className="no-messages-card">
            <Mail size={40} className="text-muted" />
            <h3>No messages in this folder</h3>
            <p>Customer inquiries from the Contact Us page will arrive here in real time.</p>
          </div>
        ) : (
          filteredMessages.map(m => (
            <div 
              key={m.id} 
              className={`message-card ${m.status === 'Unread' ? 'msg-unread' : ''}`}
            >
              <div className="msg-header">
                <div className="msg-sender-info">
                  <div className="sender-avatar">
                    {m.name ? m.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="sender-name">{m.name}</h4>
                    <div className="sender-contacts">
                      <a href={`mailto:${m.email}`} className="contact-link">
                        <Mail size={12} /> {m.email}
                      </a>
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="contact-link">
                          <Phone size={12} /> {m.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="msg-header-right">
                  <span className="msg-timestamp">
                    <Clock size={12} /> {m.date ? new Date(m.date).toLocaleString() : 'Recent'}
                  </span>
                  <button 
                    className={`status-toggle-btn ${m.status === 'Unread' ? 'btn-unread-state' : ''}`}
                    onClick={() => handleToggleStatus(m.id, m.status)}
                  >
                    {m.status === 'Unread' ? 'Mark as Read' : 'Mark as Unread'}
                  </button>
                </div>
              </div>

              <div className="msg-body">
                <div className="msg-subject-line">
                  <strong>Subject:</strong> {m.subject || 'General Inquiry'}
                </div>
                <p className="msg-text-content">{m.message}</p>
              </div>

              <div className="msg-footer">
                <a 
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Inquiry to SMS Enterprises')}`}
                  className="btn btn-secondary btn-sm"
                >
                  <Reply size={14} /> Reply via Email
                </a>

                <button 
                  className="btn-delete-msg"
                  title="Delete message"
                  onClick={() => {
                    if (window.confirm('Delete this message?')) {
                      deleteMessage(m.id);
                    }
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .messages-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .messages-toolbar h2 {
          font-size: 1.4rem;
          color: #0b1a30;
        }
        .messages-toolbar p {
          font-size: 0.85rem;
          color: #64748b;
        }
        .filter-buttons {
          display: flex;
          gap: 10px;
        }

        .messages-list-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .message-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .msg-unread {
          border-left: 4px solid var(--primary-green);
          background: #fafdfa;
        }
        .msg-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }
        .msg-sender-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sender-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #0f243e;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .sender-name {
          font-size: 1.05rem;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .sender-contacts {
          display: flex;
          gap: 12px;
        }
        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          color: #64748b;
        }
        .contact-link:hover {
          color: var(--primary-green);
        }
        .msg-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .msg-timestamp {
          font-size: 0.76rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .status-toggle-btn {
          background: #f1f5f9;
          border: 1px solid var(--border-light);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          cursor: pointer;
          color: #475569;
        }
        .status-toggle-btn:hover {
          background: #e2e8f0;
        }
        .btn-unread-state {
          background: #dcfce7;
          color: #166534;
          border-color: rgba(22, 163, 74, 0.3);
          font-weight: 600;
        }

        .msg-body {
          padding: 12px 0;
          border-top: 1px solid #edf2f7;
          border-bottom: 1px solid #edf2f7;
          margin-bottom: 14px;
        }
        .msg-subject-line {
          font-size: 0.88rem;
          color: #0b1a30;
          margin-bottom: 6px;
        }
        .msg-text-content {
          font-size: 0.9rem;
          color: #334155;
          line-height: 1.6;
        }

        .msg-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-delete-msg {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
        }
        .btn-delete-msg:hover {
          background: #fee2e2;
        }

        .no-messages-card {
          background: #ffffff;
          border: 1px dashed var(--border-light);
          border-radius: var(--radius-md);
          padding: 60px 20px;
          text-align: center;
        }
        .no-messages-card h3 {
          margin: 12px 0 6px;
        }
        .no-messages-card p {
          color: #64748b;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .messages-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .search-box {
            width: 100%;
          }
          .msg-card {
            padding: 16px 12px;
          }
          .msg-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .msg-header-right {
            width: 100%;
            justify-content: space-between;
          }
          .sender-contacts {
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
