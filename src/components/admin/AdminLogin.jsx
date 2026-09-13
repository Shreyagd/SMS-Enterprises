import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const { loginAdmin } = useData();
  const [email, setEmail] = useState('admin@smsenterprises.com');
  const [password, setPassword] = useState('SMSAdmin@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginAdmin(email, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="login-card fade-in">
        <div className="login-header">
          <div className="security-icon-circle">
            <Lock size={28} className="text-gold" />
          </div>
          <span className="badge badge-navy">RESTRICTED ACCESS</span>
          <h2 className="login-title">SMS ENTERPRISES</h2>
          <p className="login-subtitle">Operations & Lead Management Portal</p>
        </div>

        {error && (
          <div className="login-error-alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Admin Email / ID</label>
            <div className="input-icon-wrap">
              <Mail size={18} className="input-icon" />
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@smsenterprises.com"
                className="form-input with-icon"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-icon-wrap">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="form-input with-icon with-right-btn"
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary btn-block login-btn"
          >
            {loading ? 'Authenticating...' : 'SECURE ADMIN LOGIN'}
          </button>
        </form>

        <div className="login-footer">
          <div className="security-note">
            <ShieldCheck size={14} className="text-green" />
            <span>End-to-End Encrypted Session</span>
          </div>
          <button onClick={onCancel} className="back-btn">
            <ArrowLeft size={14} />
            <span>Back to Public Website</span>
          </button>
        </div>
      </div>

      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #050d18 0%, #0c1c30 100%);
          padding: 20px;
        }
        .login-card {
          max-width: 440px;
          width: 100%;
          background: #0f243e;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-lg);
          padding: 40px 34px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          color: #ffffff;
        }
        .login-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .security-icon-circle {
          width: 56px;
          height: 56px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .login-header .badge {
          margin-bottom: 10px;
        }
        .login-title {
          color: #ffffff;
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -0.3px;
        }
        .login-subtitle {
          color: #94a3b8;
          font-size: 0.85rem;
          margin-top: 4px;
        }

        .login-error-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background-color: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-sm);
          color: #fca5a5;
          font-size: 0.85rem;
          margin-bottom: 20px;
        }

        .login-form .form-label {
          color: #cbd5e1;
        }
        .input-icon-wrap {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }
        .with-icon {
          padding-left: 38px;
          background-color: #081525;
          border-color: #1e3552;
          color: #ffffff;
        }
        .with-icon:focus {
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.25);
        }
        .with-right-btn {
          padding-right: 40px;
        }
        .password-toggle-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
        }
        .password-toggle-btn:hover {
          color: #cbd5e1;
        }

        .login-btn {
          margin-top: 10px;
          padding: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .login-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: #64748b;
        }
        .security-note {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .back-btn {
          background: none;
          border: none;
          color: #94a3b8;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .back-btn:hover {
          color: #ffffff;
        }

        @media (max-width: 600px) {
          .login-container {
            padding: 16px;
          }
          .login-card-inner {
            padding: 24px 18px;
          }
          .login-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
