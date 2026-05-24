import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiFetch } from '../services/api';
import { Building, Globe, User, Lock, ArrowRight, Shield } from 'lucide-react';

export const ClientRegister = () => {
    const [formData, setFormData] = useState({
        departmentName: '',
        slug: '',
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Wait a moment for state to settle
            setTimeout(() => {
                navigate('/dashboard');
                window.location.reload(); 
            }, 600);
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-canvas flex align-items-center justify-content-center min-h-screen p-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 14 }}
                className="register-card"
            >
                <div className="text-center mb-4" style={{ textAlign: 'center' }}>
                    <div className="flex align-items-center justify-content-center mb-3" style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                        <div className="register-logo-glow">
                            <Building size={26} className="text-white" />
                        </div>
                    </div>
                    <h2 className="login-title">BharatCMS Provisioning</h2>
                    <span className="login-subtitle">Deploy a Sovereign GIGW-Compliant Portal</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-column gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Department Name */}
                    <div className="flex flex-column gap-1.5" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="departmentName" className="login-label">Department Name</label>
                        <div className="input-container">
                            <div className="input-icon">
                                <Building size={16} />
                            </div>
                            <InputText 
                                id="departmentName" 
                                value={formData.departmentName} 
                                onChange={(e) => setFormData({...formData, departmentName: e.target.value})} 
                                placeholder="e.g., Department of Digital Education"
                                className="w-full login-input"
                                style={{ paddingLeft: '40px' }}
                                required 
                            />
                        </div>
                    </div>

                    {/* Portal Slug (Subdomain) */}
                    <div className="flex flex-column gap-1.5" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="slug" className="login-label">Portal Slug (Subdomain)</label>
                        <div className="input-container flex" style={{ display: 'flex', width: '100%' }}>
                            <span className="slug-addon-prefix">https://</span>
                            <div style={{ position: 'relative', flexGrow: 1 }}>
                                <div className="input-icon" style={{ left: '12px' }}>
                                    <Globe size={16} />
                                </div>
                                <InputText 
                                    id="slug" 
                                    value={formData.slug} 
                                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})} 
                                    required 
                                    placeholder="education-portal" 
                                    className="w-full login-input slug-input"
                                    style={{ paddingLeft: '38px', borderRadius: '0' }}
                                />
                            </div>
                            <span className="slug-addon-suffix">.gov.in</span>
                        </div>
                        <small className="text-gray-500 font-mono" style={{ fontSize: '10px', display: 'block', marginTop: '2px' }}>
                            * Alphanumeric & hyphens only. Maps to isolated tenant schema.
                        </small>
                    </div>

                    <div className="register-divider"></div>

                    {/* Username */}
                    <div className="flex flex-column gap-1.5" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="username" className="login-label">Admin Username</label>
                        <div className="input-container">
                            <div className="input-icon">
                                <User size={16} />
                            </div>
                            <InputText 
                                id="username" 
                                value={formData.username} 
                                onChange={(e) => setFormData({...formData, username: e.target.value})} 
                                placeholder="admin"
                                required 
                                className="w-full login-input"
                                style={{ paddingLeft: '40px' }}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-column gap-1.5" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="password" className="login-label">Secure Admin Password</label>
                        <div className="input-container password-container">
                            <div className="input-icon">
                                <Lock size={16} />
                            </div>
                            <Password 
                                id="password" 
                                value={formData.password} 
                                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                toggleMask 
                                required 
                                feedback={false}
                                className="w-full"
                                inputClassName="w-full login-input"
                                style={{ width: '100%' }}
                                inputStyle={{ paddingLeft: '40px', width: '100%' }}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="login-error-container animate-fadein">
                            <Shield size={16} style={{ marginRight: '8px', flexShrink: 0 }} />
                            <span>{error}</span>
                        </div>
                    )}

                    <motion.button 
                        type="submit" 
                        disabled={loading} 
                        whileHover={{ scale: loading ? 1 : 1.01 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className="login-submit-btn mt-3" 
                        style={{ marginTop: '16px' }}
                    >
                        {loading ? "Initializing Sandbox..." : "Provision Digital Gateway"}
                        {!loading && <ArrowRight size={16} />}
                    </motion.button>
                </form>

                <div className="mt-4 text-center" style={{ marginTop: '24px', textAlign: 'center' }}>
                    <button 
                        className="back-login-link cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                        style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '13px', fontWeight: 600 }}
                    >
                        Return to Admin Console
                    </button>
                    <p className="login-footer-text mt-3" style={{ marginTop: '16px' }}>
                        Secured by NIC sovereign multi-tenant orchestration frameworks.
                    </p>
                </div>
            </motion.div>

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

                .register-card {
                    max-width: 480px;
                    width: 100%;
                    background: rgba(15, 23, 42, 0.65) !important;
                    border: 1.5px solid rgba(255, 255, 255, 0.06) !important;
                    border-radius: 20px;
                    padding: 40px;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
                }

                .register-logo-glow {
                    width: 54px;
                    height: 54px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 20px rgba(14, 165, 233, 0.45);
                }

                .login-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 25px;
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

                /* Subdomain input group */
                .slug-addon-prefix {
                    background: rgba(15, 23, 42, 0.85);
                    border: 1.5px solid rgba(255, 255, 255, 0.08);
                    border-right: none;
                    padding: 12px 14px;
                    color: #64748b;
                    font-family: monospace;
                    font-size: 13px;
                    font-weight: 600;
                    border-radius: 10px 0 0 10px;
                    display: flex;
                    align-items: center;
                    user-select: none;
                }

                .slug-addon-suffix {
                    background: rgba(15, 23, 42, 0.85);
                    border: 1.5px solid rgba(255, 255, 255, 0.08);
                    border-left: none;
                    padding: 12px 14px;
                    color: #0ea5e9;
                    font-family: monospace;
                    font-size: 13px;
                    font-weight: 700;
                    border-radius: 0 10px 10px 0;
                    display: flex;
                    align-items: center;
                    user-select: none;
                    box-shadow: inset 1px 0 0 rgba(255,255,255,0.02);
                }

                .slug-input {
                    border-radius: 0 !important;
                    border-left: 1px solid rgba(255, 255, 255, 0.06) !important;
                    border-right: 1px solid rgba(255, 255, 255, 0.06) !important;
                }

                .register-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06) 20%, rgba(255, 255, 255, 0.06) 80%, transparent);
                    margin: 8px 0;
                }

                .password-container .p-password-input {
                    padding-left: 40px !important;
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
                }

                .login-submit-btn:disabled {
                    background: rgba(255,255,255,0.05) !important;
                    color: #475569 !important;
                    box-shadow: none !important;
                    cursor: not-allowed !important;
                }

                .login-footer-text {
                    font-size: 11px;
                    color: #475569;
                    margin: 0;
                }

                .back-login-link {
                    transition: color 200ms ease;
                }
                .back-login-link:hover {
                    color: #0ea5e9 !important;
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
