import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Globe, Shield, Bolt, Languages, ArrowRight, 
    Lock, Cpu, Server, Activity 
} from 'lucide-react';

export const PublicHome = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-canvas">
            {/* Nav Header */}
            <motion.header 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="landing-header"
            >
                <div className="landing-header-container">
                    <div className="landing-logo-block">
                        <div className="landing-logo">
                            <Globe size={18} />
                        </div>
                        <span className="landing-logo-text">BharatCMS</span>
                        <span className="landing-badge">V2026 ACTIVE</span>
                    </div>
                    
                    <nav className="landing-nav hidden lg:flex">
                        <a href="#features" className="landing-nav-link">Platform Pillars</a>
                        <a href="#compliance" className="landing-nav-link">GIGW Compliance</a>
                        <a href="#architecture" className="landing-nav-link">Secure Architecture</a>
                    </nav>

                    <div className="landing-header-actions">
                        <button className="btn-secondary-light" onClick={() => navigate('/login')}>
                            Admin Console
                        </button>
                        <button className="btn-primary-light" onClick={() => navigate('/register')}>
                            Deploy Portal
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hero-tag"
                    >
                        <span className="hero-tag-dot"></span>
                        SOVEREIGN PORTAL OPERATING SYSTEM
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 70 }}
                        className="hero-title"
                    >
                        The Post-Modern Infrastructure <br />
                        <span className="text-gradient">For Government Portals</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hero-subtitle"
                    >
                        Configure, audit, and deploy secure, GIGW-compliant, multi-tenant public service gateways in under 30 seconds. Powered by cryptographical schema isolation and native Bhashini translation modules.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="hero-actions"
                    >
                        <button className="btn-primary-large" onClick={() => navigate('/register')}>
                            Initialize Your Department Profile
                            <ArrowRight size={16} />
                        </button>
                        <button className="btn-secondary-large" onClick={() => navigate('/login')}>
                            Sign In Master Console
                        </button>
                    </motion.div>

                    {/* Developer Master Keys Console Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="master-keys-card"
                    >
                        <div className="master-keys-header">
                            <Lock size={12} className="text-blue-400" />
                            <span>DEVELOPER SANDBOX • SUPERADMIN OVERSIGHT LOGIN KEYS</span>
                            <span className="status-indicator">ACTIVE</span>
                        </div>
                        <div className="master-keys-body">
                            <div className="key-row">
                                <span className="key-lbl">Tenant Slug:</span>
                                <span className="key-val font-mono">default</span>
                            </div>
                            <div className="key-row">
                                <span className="key-lbl">SuperAdmin User:</span>
                                <span className="key-val font-mono">superadmin</span>
                            </div>
                            <div className="key-row">
                                <span className="key-lbl">Master Password:</span>
                                <span className="key-val font-mono">superadmin123</span>
                            </div>
                        </div>
                        <div className="master-keys-footer">
                            Click <strong className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Admin Console</strong> at the top right, insert these credentials to review all created accounts and their subdomains!
                        </div>
                    </motion.div>

                    {/* Live Portal Browser Visual Mockup */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 50 }}
                        className="browser-mockup"
                    >
                        <div className="browser-header">
                            <div className="browser-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="browser-address">
                                <span>https://mp.state.gov.in/portal-preview</span>
                            </div>
                            <span className="browser-badge">PREVIEW CANVAS</span>
                        </div>
                        <div className="browser-body">
                            <div className="mock-banner">
                                <div className="mock-banner-left">
                                    <div className="mock-seal"></div>
                                    <div>
                                        <h4 className="m-0 text-sm font-bold text-slate-800">MADHYA PRADESH STATE EDUCATION GATEWAY</h4>
                                        <p className="m-0 text-xxs text-slate-500 uppercase font-mono tracking-widest mt-1">Sovereign State Infrastructure</p>
                                    </div>
                                </div>
                                <div className="mock-banner-right flex gap-3 text-slate-400 font-mono text-xxs">
                                    <span>[A-]</span>
                                    <span>[A]</span>
                                    <span>[A+]</span>
                                    <span style={{ color: '#0369A1' }}>[ENGLISH]</span>
                                </div>
                            </div>
                            <div className="mock-hero">
                                <div className="mock-hero-content">
                                    <div className="mock-badge">ACTIVE SERVICE ENGINE</div>
                                    <h2 className="mock-hero-title">Empowering State Scholars</h2>
                                    <p className="mock-hero-subtitle">Unified scholarship allocations, circular dispatches, and blockchain student marksheets.</p>
                                    <div className="flex gap-2 mt-4 justify-content-center">
                                        <span className="mock-btn primary">Apply Online</span>
                                        <span className="mock-btn secondary">RTI Circulars</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mock-grid">
                                <div className="mock-grid-item">
                                    <Activity size={18} className="text-blue-500" />
                                    <h5>DPI Marksheet Vault</h5>
                                    <p>Secure digital certificate verification module.</p>
                                </div>
                                <div className="mock-grid-item">
                                    <Server size={18} className="text-emerald-500" />
                                    <h5>Ruk Jaana Nahi</h5>
                                    <p>State examination enrollment and audit system.</p>
                                </div>
                                <div className="mock-grid-item">
                                    <Languages size={18} className="text-purple-500" />
                                    <h5>Bhashini Bridge</h5>
                                    <p>Real-time Hindi and regional language translation.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Features Grid */}
            <section id="features" className="features-section">
                <div className="features-container">
                    <div className="text-center mb-8">
                        <h2 className="section-title">The Three Pillars of Sovereign Portals</h2>
                        <p className="section-subtitle">A state-of-the-art secure platform engineering framework built directly on strict government architecture directives.</p>
                    </div>

                    <div className="bento-grid">
                        {/* Bento Card 1 */}
                        <motion.div 
                            whileHover={{ y: -8, scale: 1.015 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bento-card col-span-2"
                        >
                            <div className="bento-icon">
                                <Shield size={24} />
                            </div>
                            <h3 className="bento-title">Sovereign Cryptographical Multi-Tenancy</h3>
                            <p className="bento-desc">
                                Every government department receives completely isolated SQL Server database query scopes. Zero data leaks, robust defense-in-depth, and rigorous audit registers to fulfill all state compliance guidelines.
                            </p>
                            <div className="bento-tech-badge font-mono">EF CORE 9 TENANT ISOLATION</div>
                        </motion.div>

                        {/* Bento Card 2 */}
                        <motion.div 
                            whileHover={{ y: -8, scale: 1.015 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bento-card"
                        >
                            <div className="bento-icon" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.08)' }}>
                                <Bolt size={24} />
                            </div>
                            <h3 className="bento-title">30-Second Initialization</h3>
                            <p className="bento-desc">
                                Create an operational, beautiful, bento-grid public service portal with standard notice bulletins and maps instantly.
                            </p>
                            <div className="bento-tech-badge font-mono">FAST BOOT V2</div>
                        </motion.div>

                        {/* Bento Card 3 */}
                        <motion.div 
                            whileHover={{ y: -8, scale: 1.015 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bento-card"
                        >
                            <div className="bento-icon" style={{ color: '#a855f7', background: 'rgba(168,85,247,0.08)' }}>
                                <Languages size={24} />
                            </div>
                            <h3 className="bento-title">Bhashini API Ready</h3>
                            <p className="bento-desc">
                                Fully integrated translation core to instantly convert citizen gateways, bulletins, and circular registers to major national Indian languages.
                            </p>
                            <div className="bento-tech-badge font-mono">BHASHINI TRANSLATION CORE</div>
                        </motion.div>

                        {/* Bento Card 4 */}
                        <motion.div 
                            whileHover={{ y: -8, scale: 1.015 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bento-card col-span-2"
                        >
                            <div className="bento-icon" style={{ color: '#eab308', background: 'rgba(234,179,8,0.08)' }}>
                                <Cpu size={24} />
                            </div>
                            <h3 className="bento-title">Strict GIGW & WCAG AAA Compliance</h3>
                            <p className="bento-desc">
                                BharatCMS automatically injects GIGW tools: interactive high-contrast schemes, dynamic relative font size scale overrides, complete ARIA descriptions, and a logical keyboard focus ring system for blind or visually impaired citizens.
                            </p>
                            <div className="bento-tech-badge font-mono">WCAG AAA COMPLIANT</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-footer-container">
                    <div className="footer-brand">
                        <div className="landing-logo">
                            <Globe size={16} />
                        </div>
                        <span className="landing-logo-text" style={{ color: 'white' }}>BharatCMS</span>
                    </div>
                    <p className="footer-copyright">
                        © 2026 National Informatics Centre & Department of Information Technology. Protected by sovereign security algorithms.
                    </p>
                    
                    {/* Visitor counter */}
                    <div className="visitor-led">
                        <span className="led-label">Visitor Count:</span>
                        <div className="led-digits font-mono">
                            <span>0</span><span>0</span><span>4</span><span>8</span><span>1</span><span>2</span><span>9</span><span>0</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Premium Post-Modern CSS Styles */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

                .landing-canvas {
                    background-color: #020617;
                    color: #f8fafc;
                    min-height: 100vh;
                    font-family: 'Source Sans 3', sans-serif;
                    overflow-x: hidden;
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(3, 105, 161, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.1) 0px, transparent 50%),
                        radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 0);
                    background-size: 100% 100%, 100% 100%, 24px 24px;
                }

                /* Header Navbar */
                .landing-header {
                    background: rgba(15, 23, 42, 0.7);
                    backdrop-filter: blur(16px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    padding: 16px 0;
                }

                .landing-header-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .landing-logo-block {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .landing-logo {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 0 12px rgba(14, 165, 233, 0.35);
                }

                .landing-logo-text {
                    font-family: 'Lexend', sans-serif;
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                    letter-spacing: -0.02em;
                }

                .landing-badge {
                    background: rgba(14, 165, 233, 0.15);
                    border: 1px solid rgba(14, 165, 233, 0.3);
                    color: #38bdf8;
                    font-size: 9px;
                    font-family: monospace;
                    font-weight: 700;
                    padding: 3px 8px;
                    border-radius: 999px;
                    letter-spacing: 0.05em;
                }

                .landing-nav {
                    display: flex;
                    gap: 32px;
                }

                .landing-nav-link {
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    transition: color 200ms ease;
                }

                .landing-nav-link:hover {
                    color: white;
                }

                .landing-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                /* Hero Area */
                .hero-section {
                    padding: 80px 24px 120px 24px;
                    position: relative;
                }

                .hero-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .hero-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: #94a3b8;
                    font-family: 'Lexend', sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 6px 16px;
                    border-radius: 999px;
                    letter-spacing: 0.08em;
                    margin-bottom: 24px;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
                }

                .hero-tag-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #0ea5e9;
                    box-shadow: 0 0 8px #0ea5e9;
                }

                .hero-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 56px;
                    font-weight: 800;
                    color: white;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    margin: 0 0 24px 0;
                }

                .text-gradient {
                    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-subtitle {
                    font-size: 18px;
                    color: #94a3b8;
                    line-height: 1.6;
                    max-width: 720px;
                    margin: 0 0 40px 0;
                }

                .hero-actions {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin-bottom: 48px;
                }

                /* Master Keys Card */
                .master-keys-card {
                    max-width: 580px;
                    width: 100%;
                    background: rgba(15, 23, 42, 0.85);
                    border: 1px solid rgba(14, 165, 233, 0.25);
                    border-radius: 14px;
                    padding: 16px;
                    text-align: left;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(14, 165, 233, 0.05);
                    margin-bottom: 64px;
                }

                .master-keys-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 10.5px;
                    font-family: 'Lexend', sans-serif;
                    font-weight: 700;
                    color: #94a3b8;
                    letter-spacing: 0.05em;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                    padding-bottom: 10px;
                    margin-bottom: 12px;
                }

                .master-keys-header .status-indicator {
                    margin-left: auto;
                    background: rgba(34, 197, 94, 0.1);
                    color: #4ade80;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 9px;
                    font-weight: 700;
                }

                .master-keys-body {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    background: rgba(0,0,0,0.2);
                    border-radius: 8px;
                    padding: 12px;
                    border: 1px solid rgba(255,255,255,0.03);
                }

                .key-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }

                .key-lbl {
                    color: #64748b;
                    font-weight: 600;
                }

                .key-val {
                    color: #38bdf8;
                    font-weight: 700;
                }

                .master-keys-footer {
                    font-size: 11px;
                    color: #64748b;
                    line-height: 1.4;
                    margin-top: 10px;
                    text-align: center;
                }

                /* Browser Mockup */
                .browser-mockup {
                    width: 100%;
                    max-width: 900px;
                    background: #1e293b;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
                }

                .browser-header {
                    background: #0f172a;
                    padding: 12px 20px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .browser-dots {
                    display: flex;
                    gap: 6px;
                }

                .browser-dots .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .browser-dots .dot.red { background: #ef4444; }
                .browser-dots .dot.yellow { background: #eab308; }
                .browser-dots .dot.green { background: #22c55e; }

                .browser-address {
                    flex-grow: 1;
                    max-width: 460px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 6px;
                    padding: 4px 16px;
                    font-family: monospace;
                    font-size: 11px;
                    color: #94a3b8;
                }

                .browser-badge {
                    background: rgba(234, 179, 8, 0.1);
                    border: 1px solid rgba(234, 179, 8, 0.3);
                    color: #fbbf24;
                    font-size: 9px;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: monospace;
                }

                .browser-body {
                    background: #f8fafc;
                    height: 380px;
                    overflow-y: hidden;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }

                .mock-banner {
                    background: #0f172a;
                    padding: 12px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 3px solid #0369a1;
                    color: white;
                }

                .mock-banner-left {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .mock-seal {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #ffffff;
                    background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .mock-hero {
                    background: radial-gradient(circle at top right, rgba(3,105,161,0.08) 0%, transparent 60%), #ffffff;
                    padding: 40px 24px;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: center;
                    text-align: center;
                }

                .mock-hero-content {
                    max-width: 500px;
                }

                .mock-badge {
                    display: inline-block;
                    background: rgba(3, 105, 161, 0.06);
                    color: #0369a1;
                    border: 1px solid rgba(3, 105, 161, 0.15);
                    font-size: 9px;
                    font-weight: 700;
                    padding: 3px 10px;
                    border-radius: 99px;
                    letter-spacing: 0.05em;
                    font-family: 'Lexend', sans-serif;
                    margin-bottom: 12px;
                }

                .mock-hero-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 24px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0 0 8px 0;
                }

                .mock-hero-subtitle {
                    font-size: 12px;
                    color: #475569;
                    line-height: 1.4;
                    margin: 0;
                }

                .mock-btn {
                    padding: 6px 14px;
                    font-size: 11px;
                    font-weight: 600;
                    border-radius: 6px;
                    font-family: 'Lexend', sans-serif;
                }

                .mock-btn.primary {
                    background: #0369a1;
                    color: white;
                }

                .mock-btn.secondary {
                    border: 1px solid #0f172a;
                    color: #0f172a;
                }

                .mock-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    padding: 20px;
                }

                .mock-grid-item {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }

                .mock-grid-item h5 {
                    font-family: 'Lexend', sans-serif;
                    font-size: 12px;
                    font-weight: 700;
                    margin: 8px 0 4px 0;
                    color: #0f172a;
                }

                .mock-grid-item p {
                    font-size: 10px;
                    color: #64748b;
                    margin: 0;
                    line-height: 1.3;
                }

                /* Bento Section */
                .features-section {
                    padding: 100px 24px;
                    background: #020617;
                    border-top: 1px solid rgba(255,255,255,0.03);
                }

                .features-container {
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .section-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 36px;
                    font-weight: 800;
                    color: white;
                    letter-spacing: -0.02em;
                    margin: 0 0 12px 0;
                }

                .section-subtitle {
                    font-size: 16px;
                    color: #64748b;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.5;
                }

                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-top: 56px;
                }

                .bento-card {
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    padding: 32px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
                }

                .bento-card:hover {
                    border-color: rgba(3, 105, 161, 0.3);
                    background: rgba(15, 23, 42, 0.6);
                    transform: translateY(-2px);
                }

                .bento-card.col-span-2 {
                    grid-column: span 2;
                }

                .bento-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 10px;
                    background: rgba(3,105,161,0.08);
                    color: #38bdf8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .bento-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                    margin: 0 0 12px 0;
                    letter-spacing: -0.01em;
                }

                .bento-desc {
                    font-size: 14px;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin: 0 0 32px 0;
                }

                .bento-tech-badge {
                    font-size: 10px;
                    color: #475569;
                    letter-spacing: 0.05em;
                    font-weight: 600;
                }

                /* Footer */
                .landing-footer {
                    background: #090d16;
                    border-top: 1px solid rgba(255,255,255,0.04);
                    padding: 48px 24px;
                }

                .landing-footer-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 24px;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .footer-copyright {
                    font-size: 13px;
                    color: #475569;
                    margin: 0;
                    max-width: 460px;
                    line-height: 1.5;
                }

                /* LED counter */
                .visitor-led {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .led-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: #475569;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .led-digits {
                    display: flex;
                    gap: 3px;
                    background: #020617;
                    padding: 4px;
                    border-radius: 6px;
                    border: 1px solid rgba(255,255,255,0.04);
                }

                .led-digits span {
                    background: #0f172a;
                    color: #ef4444;
                    font-size: 14px;
                    font-weight: 700;
                    padding: 4px 8px;
                    border-radius: 4px;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    text-shadow: 0 0 4px rgba(239, 68, 68, 0.4);
                }

                /* Modern Buttons Styling */
                .btn-primary-light {
                    background: #0369a1;
                    color: white;
                    border: none;
                    padding: 8px 18px;
                    font-size: 13.5px;
                    font-weight: 600;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'Lexend', sans-serif;
                    transition: all 200ms ease;
                }

                .btn-primary-light:hover {
                    background: #025a8b;
                }

                .btn-secondary-light {
                    background: transparent;
                    color: #94a3b8;
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 8px 18px;
                    font-size: 13.5px;
                    font-weight: 600;
                    border-radius: 6px;
                    cursor: pointer;
                    font-family: 'Lexend', sans-serif;
                    transition: all 200ms ease;
                }

                .btn-secondary-light:hover {
                    color: white;
                    border-color: rgba(255,255,255,0.2);
                    background: rgba(255,255,255,0.02);
                }

                .btn-primary-large {
                    background: #0369a1;
                    color: white;
                    border: none;
                    padding: 14px 28px;
                    font-size: 15px;
                    font-weight: 700;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Lexend', sans-serif;
                    transition: all 200ms ease;
                    box-shadow: 0 4px 14px rgba(3, 105, 161, 0.3);
                }

                .btn-primary-large:hover {
                    background: #025a8b;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(3, 105, 161, 0.4);
                }

                .btn-secondary-large {
                    background: transparent;
                    color: white;
                    border: 2px solid white;
                    padding: 12px 26px;
                    font-size: 15px;
                    font-weight: 700;
                    border-radius: 8px;
                    cursor: pointer;
                    font-family: 'Lexend', sans-serif;
                    transition: all 200ms ease;
                }

                .btn-secondary-large:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-1px);
                }

                .animate-fadein {
                    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .hero-title { font-size: 38px; }
                    .bento-grid { grid-template-columns: 1fr; }
                    .bento-card.col-span-2 { grid-column: span 1; }
                    .mock-grid { grid-template-columns: 1fr; }
                    .browser-mockup { display: none; }
                }
            `}</style>
        </div>
    );
};
