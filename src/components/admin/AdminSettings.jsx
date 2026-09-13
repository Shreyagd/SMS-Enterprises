import React, { useState } from 'react';
import { Save, Lock, Building, Phone, Mail, MapPin, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminSettings() {
  const { settings, updateSettings, changeAdminPassword } = useData();

  const [companyForm, setCompanyForm] = useState({
    companyName: settings.companyName,
    brandName: settings.brandName,
    phone: settings.phone,
    altPhone: settings.altPhone,
    email: settings.email,
    salesEmail: settings.salesEmail,
    gstin: settings.gstin,
    address: settings.address,
    workingHours: settings.workingHours,
    founder: settings.founder
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passStatus, setPassStatus] = useState({ error: '', success: '' });

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    updateSettings(companyForm);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassStatus({ error: '', success: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPassStatus({ error: 'New passwords do not match.', success: '' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPassStatus({ error: 'New password must be at least 6 characters.', success: '' });
      return;
    }

    const res = await changeAdminPassword(passwordForm.currentPassword, passwordForm.newPassword);
    if (res.success) {
      setPassStatus({ error: '', success: 'Password changed successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setPassStatus({ error: res.error || 'Failed to update password.', success: '' });
    }
  };

  return (
    <div className="admin-settings-root">
      <div className="settings-header">
        <h2>Corporate & Security Settings</h2>
        <p>Manage company details, factory addresses, and admin portal security credentials</p>
      </div>

      <div className="settings-grid">
        {/* Company Info Form */}
        <div className="card settings-card">
          <div className="card-header-with-icon">
            <Building size={20} className="text-green" />
            <h3>Company Information & Contact</h3>
          </div>

          <form onSubmit={handleSaveCompany} className="settings-form">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Company Legal Name</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={companyForm.companyName} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Brand Mark</label>
                <input 
                  type="text" 
                  name="brandName" 
                  value={companyForm.brandName} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Phone & WhatsApp</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={companyForm.phone} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">GSTIN / Tax ID</label>
                <input 
                  type="text" 
                  name="gstin" 
                  value={companyForm.gstin} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Primary Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={companyForm.email} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Sales Email</label>
                <input 
                  type="email" 
                  name="salesEmail" 
                  value={companyForm.salesEmail} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Factory & Unit Address</label>
              <textarea 
                rows="2" 
                name="address" 
                value={companyForm.address} 
                onChange={handleCompanyChange} 
                className="form-textarea" 
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Working Hours</label>
                <input 
                  type="text" 
                  name="workingHours" 
                  value={companyForm.workingHours} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Founder Name / Sign-off</label>
                <input 
                  type="text" 
                  name="founder" 
                  value={companyForm.founder} 
                  onChange={handleCompanyChange} 
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-save-row">
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Company Details
              </button>
            </div>
          </form>
        </div>

        {/* Security & Password Form */}
        <div className="card settings-card">
          <div className="card-header-with-icon">
            <Lock size={20} className="text-gold" />
            <h3>Change Admin Password</h3>
          </div>

          <p className="settings-desc">
            To keep the admin portal secure from unauthorized access, choose a strong password.
          </p>

          {passStatus.error && (
            <div className="alert alert-error">
              <AlertCircle size={16} />
              <span>{passStatus.error}</span>
            </div>
          )}

          {passStatus.success && (
            <div className="alert alert-success">
              <CheckCircle size={16} />
              <span>{passStatus.success}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label className="form-label">Current Admin Password</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••••••"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                required 
                placeholder="Minimum 6 characters"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="form-input" 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                required 
                placeholder="Re-enter new password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="form-input" 
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Update Admin Password
            </button>
          </form>

          <div className="portal-tip-box">
            <Shield size={18} className="text-green" />
            <div>
              <strong>Discreet Access Reminder</strong>
              <p>The Admin portal URL is <code>/admin</code>. You can also press <code>Ctrl + Shift + A</code> anywhere on the website to access this portal.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .settings-header {
          margin-bottom: 24px;
        }
        .settings-header h2 {
          font-size: 1.4rem;
          color: #0b1a30;
        }
        .settings-header p {
          font-size: 0.85rem;
          color: #64748b;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
        }
        .settings-card {
          padding: 28px;
          background: #ffffff;
        }
        .card-header-with-icon {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .card-header-with-icon h3 {
          font-size: 1.15rem;
          color: #0b1a30;
        }
        .settings-desc {
          font-size: 0.86rem;
          color: #64748b;
          margin-bottom: 20px;
        }
        .form-save-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 10px;
        }

        .alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          margin-bottom: 16px;
        }
        .alert-error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        .alert-success {
          background-color: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .portal-tip-box {
          margin-top: 28px;
          padding: 14px 16px;
          background: #f8fafc;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 0.82rem;
        }
        .portal-tip-box strong {
          display: block;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .portal-tip-box p {
          color: #64748b;
          line-height: 1.4;
        }
        .portal-tip-box code {
          background: #e2e8f0;
          padding: 2px 5px;
          border-radius: 3px;
          color: #0f172a;
          font-weight: 700;
        }

        @media (max-width: 991px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .settings-card {
            padding: 20px 16px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .form-save-row .btn {
            width: 100%;
          }
          .portal-tip-box {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
