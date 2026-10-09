import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    Home, 
  Info, 
  Briefcase,   
  FileText, 
  Mail, 
  Layers, 
  Settings, 
  LogOut, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import AdminDashboard from './AdminDashboard';
import AdminQuotes from './AdminQuotes';
import AdminMessages from './AdminMessages';
import AdminProducts from './AdminProducts';
import AdminHome from './AdminHome';
import AdminAbout from './AdminAbout';
import AdminCareers from './AdminCareers';
import AdminSettings from './AdminSettings';

export default function AdminLayout({ onExitAdmin }) {
  const { adminUser, logoutAdmin, quotes, messages, settings, applications } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newQuotes = quotes.filter(q => q.status === 'New').length;
  const unreadMessages = messages.filter(m => m.status === 'Unread').length;
  const newApplications = applications.filter(a => a.status === 'New').length;

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'quotes', label: 'RFQ Quotes', icon: <FileText size={18} />, badge: newQuotes },
    { id: 'messages', label: 'Inquiries Inbox', icon: <Mail size={18} />, badge: unreadMessages },
    { id: 'home', label: 'Home Page', icon: <Home size={18} /> },
    { id: 'about', label: 'About Us Page', icon: <Info size={18} /> },
    { id: 'careers', label: 'Careers', icon: <Briefcase size={18} />, badge: newApplications },
    { id: 'products', label: 'Products Catalog', icon: <Layers size={18} /> },
    { id: 'settings', label: 'Settings & Security', icon: <Settings size={18} /> }
  ];

  const handleLogout = () => {
    logoutAdmin();
    onExitAdmin();
  };

  return (
    <div className="admin-layout-root">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <div className="admin-brand">
            <img 
              src="/images/sms_logo.jpg" 
              alt="SMS Enterprises Logo" 
              className="admin-logo-img" 
            />
            <div>
              <h3>{settings.companyName}</h3>
              <span className="admin-badge-label">Secret Operations Portal</span>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav-menu">
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`admin-nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                <div className="item-icon-title">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.badge > 0 && (
                  <span className="admin-pill-count">{tab.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-profile-widget">
            <ShieldCheck size={18} className="text-green" />
            <div className="user-info">
              <strong>{adminUser?.email || 'Admin'}</strong>
              <span>Authenticated Session</span>
            </div>
          </div>

          <div className="sidebar-actions">
            <button className="btn btn-secondary btn-sm btn-block" onClick={onExitAdmin}>
              <Globe size={14} /> Exit to Public Site
            </button>
            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Main Panel */}
      <div className="admin-main-panel">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button className="mobile-menu-trigger" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="header-title-wrap">
              <span className="current-view-tag">Admin Management</span>
              <h1 className="header-active-tab">
                {navTabs.find(t => t.id === activeTab)?.label}
              </h1>
            </div>
          </div>

          <div className="header-right">
            <div className="header-notification-pill">
              <Bell size={16} />
              <span className="notification-text">{newQuotes + unreadMessages} pending</span>
            </div>

            <button className="btn btn-outline-green btn-sm" onClick={onExitAdmin}>
              <Globe size={14} /> <span className="exit-btn-text">View Public Website</span>
            </button>
          </div>
        </header>

        {/* Tab Body */}
        <main className="admin-content-body">
          {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
          {activeTab === 'quotes' && <AdminQuotes />}
          {activeTab === 'messages' && <AdminMessages />}
          {activeTab === 'home' && <AdminHome />}
          {activeTab === 'about' && <AdminAbout />}
          {activeTab === 'careers' && <AdminCareers />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      <style>{`
        .admin-layout-root {
          display: flex;
          min-height: 100vh;
          background-color: #f1f5f9;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 270px;
          background-color: #071221;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 100;
        }
        .sidebar-top {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .admin-logo-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .admin-brand h3 {
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1.2;
        }
        .admin-badge-label {
          font-size: 0.68rem;
          color: #22c55e;
          font-weight: 700;
          text-transform: uppercase;
        }
        .sidebar-close-btn {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
        }

        .admin-nav-menu {
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }
        .admin-nav-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          background: none;
          border: none;
          color: #94a3b8;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }
        .admin-nav-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }
        .nav-item-active {
          background-color: var(--primary-green) !important;
          color: #ffffff !important;
        }
        .item-icon-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .admin-pill-count {
          background-color: #ef4444;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
        }

        .sidebar-bottom {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background-color: #050d18;
        }
        .user-profile-widget {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .user-info strong {
          display: block;
          font-size: 0.8rem;
          color: #ffffff;
          max-width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-info span {
          font-size: 0.7rem;
          color: #22c55e;
        }
        .sidebar-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sidebar-actions .btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.15);
        }
        .sidebar-actions .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.16);
        }
        .btn-logout {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          padding: 6px;
        }
        .btn-logout:hover {
          text-decoration: underline;
        }

        /* Main Panel */
        .admin-main-panel {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .admin-header {
          height: 70px;
          background: #ffffff;
          border-bottom: 1px solid var(--border-light);
          padding: 0 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .mobile-menu-trigger {
          display: none;
          background: none;
          border: none;
          color: #0f172a;
          cursor: pointer;
        }
        .current-view-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .header-active-tab {
          font-size: 1.25rem;
          color: #0b1a30;
          line-height: 1.1;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .header-notification-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: #475569;
        }

        .admin-sidebar-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(7, 18, 33, 0.6);
          backdrop-filter: blur(2px);
          z-index: 99;
        }

        .admin-content-body {
          padding: 30px;
          flex-grow: 1;
        }

        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: -280px;
            transition: left 0.3s ease;
          }
          .sidebar-open {
            left: 0;
          }
          .sidebar-close-btn {
            display: block;
          }
          .mobile-menu-trigger {
            display: block;
          }
          .admin-header {
            padding: 0 16px;
          }
          .admin-content-body {
            padding: 16px;
          }
        }

        @media (max-width: 600px) {
          .admin-header {
            height: 60px;
            padding: 0 12px;
          }
          .header-active-tab {
            font-size: 1.05rem;
          }
          .header-right {
            gap: 8px;
          }
          .header-notification-pill {
            padding: 4px 8px;
            font-size: 0.75rem;
          }
          .notification-text {
            display: none;
          }
          .exit-btn-text {
            display: none;
          }
          .admin-content-body {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}
