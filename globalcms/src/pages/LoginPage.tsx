import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Globe, Lock, Shield, ArrowRight, User } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tenantId, setTenantId] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5163/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-Id': tenantId,
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-canvas flex align-items-center justify-content-center min-h-screen p-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="login-card animate-fadein">
        <div className="text-center mb-5" style={{ textAlign: 'center' }}>
          <div className="flex align-items-center justify-content-center mb-3" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div className="login-logo-glow">
              <Globe size={28} className="text-white" />
            </div>
          </div>
          <h2 className="login-title">BharatCMS Gate</h2>
          <span className="login-subtitle">Sovereign State Infrastructure Console</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-column gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="flex flex-column gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="tenantId" className="login-label">Tenant Slug / ID</label>
            <div className="input-container">
              <div className="input-icon">
                <Shield size={16} />
              </div>
              <InputText 
                id="tenantId" 
                value={tenantId} 
                onChange={(e) => setTenantId(e.target.value)} 
                placeholder="e.g., default or state-slug"
                className="w-full login-input"
                style={{ paddingLeft: '40px' }}
                required
              />
            </div>
          </div>

          <div className="flex flex-column gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="username" className="login-label">Username</label>
            <div className="input-container">
              <div className="input-icon">
                <User size={16} />
              </div>
              <InputText 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="superadmin or admin"
                required
                className="w-full login-input"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div className="flex flex-column gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="password" className="login-label">Secure Password</label>
            <div className="input-container password-container">
              <div className="input-icon">
                <Lock size={16} />
              </div>
              <Password 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                toggleMask 
                required
                feedback={false}
                className="w-full"
                inputClassName="w-full login-input"
                style={{ width: '100%' }}
                inputStyle={{ paddingLeft: '40px', width: '100%' }}
              />
            </div>
          </div>

          {error && (
            <div className="login-error-container">
              <i className="pi pi-exclamation-triangle" style={{ marginRight: '8px' }}></i>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="login-submit-btn" 
          >
            {loading ? "Authenticating Signature..." : "Log In Console"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-5 text-center" style={{ marginTop: '24px', textAlign: 'center' }}>
          <p className="login-footer-text">
            Protected by NIC Ruthless Security Architecture v2.0
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

        .login-canvas {
            background-color: #020617;
            color: #f8fafc;
            min-height: 100vh;
            font-family: 'Source Sans 3', sans-serif;
            background-image: 
                radial-gradient(at 0% 0%, rgba(3, 105, 161, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.1) 0px, transparent 50%),
                radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 0);
            background-size: 100% 100%, 100% 100%, 24px 24px;
        }

        .login-card {
            max-width: 420px;
            width: 100%;
            background: rgba(15, 23, 42, 0.65) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.06) !important;
            border-radius: 20px;
            padding: 40px;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .login-logo-glow {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.45);
        }

        .login-title {
            font-family: 'Lexend', sans-serif;
            font-size: 26px;
            font-weight: 700;
            color: white;
            margin: 16px 0 4px 0;
            letter-spacing: -0.02em;
        }

        .login-subtitle {
            font-size: 13px;
            color: #64748b;
            font-weight: 500;
        }

        .login-label {
            font-size: 11px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
        }

        .input-container {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
        }

        .input-icon {
            position: absolute;
            left: 14px;
            z-index: 5;
            color: #64748b;
            pointer-events: none;
            display: flex;
            align-items: center;
        }

        .login-input {
            width: 100% !important;
            padding: 12px 16px 12px 40px !important;
            background: rgba(8, 12, 20, 0.8) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.08) !important;
            color: #f3f4f6 !important;
            border-radius: 10px !important;
            font-size: 14px !important;
            transition: all 250ms ease !important;
            font-family: 'Source Sans 3', sans-serif !important;
        }

        .input-container .login-input,
        .input-container .p-password-input {
            padding-left: 40px !important;
        }

        .login-input:focus {
            border-color: #0ea5e9 !important;
            background: rgba(8, 12, 20, 0.95) !important;
            box-shadow: 0 0 0 3.5px rgba(14, 165, 233, 0.2) !important;
            outline: none !important;
        }

        /* Prevent browser autofill from injecting ugly white/blue backgrounds */
        .login-input:-webkit-autofill,
        .login-input:-webkit-autofill:hover, 
        .login-input:-webkit-autofill:focus,
        .login-input:-webkit-autofill:active,
        .p-password-input:-webkit-autofill,
        .p-password-input:-webkit-autofill:hover,
        .p-password-input:-webkit-autofill:focus,
        .p-password-input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px rgba(8, 12, 20, 0.95) inset !important;
            -webkit-text-fill-color: #f3f4f6 !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        .login-error-container {
            background: rgba(239, 68, 68, 0.08);
            border: 1px solid rgba(239, 68, 68, 0.25);
            color: #f87171;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
        }

        .login-submit-btn {
            background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%) !important;
            color: white !important;
            border: none !important;
            padding: 14px !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            border-radius: 10px !important;
            cursor: pointer !important;
            transition: all 250ms ease !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            width: 100% !important;
            font-family: 'Lexend', sans-serif !important;
            box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3) !important;
        }

        .login-submit-btn:hover {
            box-shadow: 0 6px 20px rgba(14, 165, 233, 0.5) !important;
            transform: translateY(-1px);
        }

        .login-submit-btn:disabled {
            background: rgba(255,255,255,0.05) !important;
            color: #475569 !important;
            box-shadow: none !important;
            cursor: not-allowed !important;
            transform: none !important;
        }

        .login-footer-text {
            font-size: 11px;
            color: #475569;
            margin: 0;
        }

        .animate-fadein {
            animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
