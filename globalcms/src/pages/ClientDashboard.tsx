import React, { useState, useEffect } from 'react';
import { useTenant } from '../context/TenantContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Globe, TrendingUp, Shield, 
    Users, Clock, Database, Zap, 
    Settings, LogOut, MessageCircle, ChevronLeft, 
    ChevronDown, ChevronUp, Award, Bell, Briefcase, Info, Save,
    Plus, Trash2, Link, Image as ImageIcon, MapPin, Mail, Phone,
    AlignLeft, List, BarChart2
} from 'lucide-react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { AnimatedCounter } from '../components/layout/AnimatedContainer';
import { LivePreview } from './LivePreview';
import { apiFetch } from '../services/api';

const SectionTab = ({ 
    id, label, icon: Icon, idx, total, isEnabled, onToggleEnable, 
    expandedTab, toggleTab, renderOrderControls, children 
}: any) => (
    <div className={`custom-editor-tab ${expandedTab === id ? 'expanded' : ''}`}>
        <div className="tab-header" onClick={() => toggleTab(id)}>
            <div className="flex align-items-center gap-3">
                <Icon size={18} className="tab-icon" />
                <span className="tab-title">{label}</span>
            </div>
            <div className="flex align-items-center gap-3">
                <div className="flex align-items-center gap-3" onClick={e => e.stopPropagation()}>
                    {renderOrderControls(idx, total)}
                    {onToggleEnable && <InputSwitch checked={isEnabled} onChange={(e) => onToggleEnable(e.value)} />}
                </div>
                <div className="flex align-items-center justify-content-center" style={{ width: '24px' }}>
                    {expandedTab === id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>
        </div>
        <AnimatePresence initial={false}>
            {expandedTab === id && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="tab-content">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export const ClientDashboard = () => {
    const { tenant, refreshTenant } = useTenant();
    const [activeTab, setActiveTab] = useState<'hub' | 'analytics' | 'system' | 'builder'>('hub');
    const [user, setUser] = useState<any>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Track active accordion tab in unified visual builder sidebar
    const [expandedTab, setExpandedTab] = useState<string | null>('accessibility');

    // Default Pro Max GIGW Data State
    const [dynamicData, setDynamicData] = useState<any>({
        themeColor: 'f97316',
        departmentName: 'MP STATE OPEN SCHOOL EDUCATION BOARD',
        departmentNameHi: 'म.प्र. राज्य मुक्त स्कूल शिक्षा बोर्ड',
        emblemUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg',
        stateLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Emblem_of_Madhya_Pradesh.svg',
        
        accessibility: {
            supportEmail: 'admin@mpos.gov.in',
            supportPhone: '+91 755 255 2106',
            screenReaderUrl: '#'
        },

        leadership: [
            { name: 'Dr. Mohan Yadav', title: 'Hon. Chief Minister, MP', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mohan_Yadav_official_portrait.jpg/220px-Mohan_Yadav_official_portrait.jpg' },
            { name: 'Uday Pratap Singh', title: 'Minister, School Education', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Uday_Pratap_Singh_official_portrait.jpg/220px-Uday_Pratap_Singh_official_portrait.jpg' }
        ],

        navItems: [
            { label: 'Home', url: '#', dropdowns: [] },
            { label: 'About Us', url: '#', dropdowns: ['Overview', 'History & Milestones', 'Our Leadership'] },
            { label: 'Schemes', url: '#', dropdowns: ['Ruk Jaana Nahi', 'PM SHRI Schools', 'Super 100 Scheme'] },
            { label: 'Services', url: '#', dropdowns: ['Check Eligibility', 'Track Application', 'Digital Marksheets'] },
            { label: 'Dashboard', url: '#', dropdowns: ['Impact Stats', 'Sovereign Nodes'] },
            { label: 'Media', url: '#', dropdowns: ['Press Releases', 'Photo Gallery', 'Video Portal'] },
            { label: 'RTI', url: '#', dropdowns: ['Mandatory Disclosures', 'Apply online'] },
            { label: 'Contact', url: '#', dropdowns: ['Bhopal Head Office', 'District Nodes'] }
        ],

        slides: [
            { 
                title: 'Empowering Citizens Through Digital Education', 
                subtitle: 'Strategic Operations & Transparent Governance Gateway for Madhya Pradesh Open Schooling.', 
                bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600',
                btnText: 'Apply online Now',
                btnUrl: '#'
            },
            { 
                title: 'NIC Sovereign Portal Compliant with GIGW', 
                subtitle: 'Next-Gen architectural patterns built with high availability, modern accessibility, and dark theme support.', 
                bgImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600',
                btnText: 'Verify Certification',
                btnUrl: '#'
            },
            { 
                title: 'Direct Benefit Transfers & Student Welfare', 
                subtitle: 'Ensuring absolute clarity, transparency, and speed in state educational scheme deployments.', 
                bgImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600',
                btnText: 'Explore Schemes',
                btnUrl: '#'
            }
        ],

        flashAlert: '◆ DPI Baseline Configuration module live. ◆ Ruk Jaana Nahi exam registration extended. ◆ Digital Locker integration active.',
        tickerLabel: 'Latest News',

        services: [
            { title: 'Check Eligibility', desc: 'Instant verification of academic and financial eligibility for state-funded schemes.', iconName: 'Shield', link: '#' },
            { title: 'Track Application', desc: 'Monitor the status of your marksheets, certificates, and enrollment requests in real-time.', iconName: 'RefreshCw', link: '#' },
            { title: 'Online Admissions', desc: 'Centralized portal for seamless enrollment into Open School programs across 52 districts.', iconName: 'Building', link: '#' },
            { title: 'Digital Marksheets', desc: 'Access blockchain-secured digital certificates compatible with DigiLocker.', iconName: 'FileText', link: '#' }
        ],

        aboutTitle: 'Pioneering Digital Education.',
        aboutText: 'The MP State Open School Education Board (MPSOS) is a pioneer in bringing flexible learning models to the doorstep of every citizen. By integrating modern digital tools with GIGW-compliant accessibility, we ensure that educational barriers are removed for every student in Madhya Pradesh.',
        aboutImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
        aboutBadgeNumber: '25+',
        aboutBadgeText: 'Academic Years',
        quickLinks: [
            { label: 'Right to Information (RTI)', url: '#' },
            { label: 'Citizen Charter & SOPs', url: '#' },
            { label: 'Tenders & Procurement', url: '#' },
            { label: 'Mandatory Disclosures', url: '#' }
        ],

        schemesTitle: 'Welfare Initiatives Directory',
        schemesSub: 'Explore central and state-sponsored schemes designed to support every learner across the socio-economic spectrum.',
        schemes: [
            { type: 'State', name: 'Ruk Jaana Nahi', desc: 'A flagship initiative allowing students to clear subjects instantly and resume their academic journey without gaps.', logoUrl: '', link: '#' },
            { type: 'Central', name: 'PM SHRI Schools', desc: 'Developing select institutions into smart-school models with high-end labs and digital infrastructure.', logoUrl: '', link: '#' },
            { type: 'State', name: 'Super 100 Scheme', desc: 'Free residential coaching for high-merit board students for medical and engineering entrance exams.', logoUrl: '', link: '#' }
        ],

        impactTitle: 'MPSOS Impact Metrics',
        impactSub: 'Data-Driven Transparency',
        impactStats: [
            { label: 'Active Clusters', value: 450, suffix: '+', color: '#0369a1' },
            { label: 'Infrastructure Uptime', value: 99, suffix: '%', color: '#fbbf24' },
            { label: 'Daily Verified Users', value: 12450, suffix: '', color: '#f472b6' },
            { label: 'Govt Service Nodes', value: 210, suffix: '', color: '#4ade80' }
        ],
        mapSvgUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Madhya_Pradesh_districts.svg',

        noticeTitle: 'Recent Publications',
        notices: [
            { date: '24 May', tag: 'OFFICIAL ORDER', title: 'Implementation of NEP 2026 Credit Transfer Protocols', id: 'MPSOS-ORD-2026-089', downloadUrl: '#' },
            { date: '22 May', tag: 'ACTIVE TENDER', title: 'Procurement of High-Security Biometric Evaluation Units', id: 'TDR-MPSOS-INFRA-04', downloadUrl: '#' },
            { date: '20 May', tag: 'PUBLIC NEWS', title: 'MPSOS Residential Coaching Entrance Results Declared', id: 'NEWS-SUPER100-26', downloadUrl: '#' }
        ],
        helpdeskTitle: 'Need Assistance?',
        helpdeskPhone: '1800-233-3114',
        helpdeskSub: 'Direct 24/7 technical assistance for enrollment, verification, and portal navigation.',
        helpdeskBtnText: 'Lodge a Complaint',
        helpdeskBtnUrl: '#',

        footer: {
            address: 'Krishi Bhawan, Arera Hills, Bhopal, MP - 462011',
            email: 'admin@mpos.gov.in',
            phone: '+91-755-255-2106',
            copyrightText: '© 2026 National Informatics Centre (NIC). All Rights Reserved. Bharat CMS v4.0.2-Stable',
            visitorCounterBase: 1245678,
            importantLinks: [
                { label: 'Executive Dashboard', url: '#' },
                { label: 'Regional Clusters', url: '#' },
                { label: 'Procurement Portal', url: '#' },
                { label: 'Staff Intranet', url: '#' },
                { label: 'RTI Disclosures', url: '#' }
            ],
            policies: [
                { label: 'Privacy Policy', url: '#' },
                { label: 'Terms of Use', url: '#' },
                { label: 'Hyperlinking Policy', url: '#' },
                { label: 'Disclaimer', url: '#' }
            ]
        },

        layout: {
            showAccessibilityStrip: true,
            showBrandingHeader: true,
            showNavbar: true,
            showNewsTicker: true,
            showHero: true,
            showServices: true,
            showAbout: true,
            showSchemes: true,
            showImpact: true,
            showNoticeHelpdesk: true
        }
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) try { setUser(JSON.parse(storedUser)); } catch (e) {}
        
        if (tenant?.dynamicData) {
            try {
                const parsed = JSON.parse(tenant.dynamicData);
                // Ensure layout objects merge cleanly
                const mergedLayout = { ...dynamicData.layout, ...(parsed.layout || {}) };
                setDynamicData((prev: any) => ({ ...prev, ...parsed, layout: mergedLayout }));
            } catch (e) {}
        }
    }, [tenant]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await apiFetch('/tenant/profile', {
                method: 'PUT',
                body: JSON.stringify({
                    name: dynamicData.departmentName || tenant?.name,
                    dynamicData: JSON.stringify(dynamicData)
                })
            });
            refreshTenant();
        } catch (e) {} finally { setLoading(false); }
    };

    
    const moveSection = (idx: number, dir: 1 | -1) => {
        setDynamicData((prev: any) => {
            const currentOrder = prev.layout?.sectionOrder || ['accessibility', 'branding', 'navbar', 'ticker', 'hero', 'services', 'about', 'schemes', 'impact', 'noticeHelpdesk', 'footer'];
            if ((dir === -1 && idx === 0) || (dir === 1 && idx === currentOrder.length - 1)) return prev;
            
            const newOrder = [...currentOrder];
            const temp = newOrder[idx];
            newOrder[idx] = newOrder[idx + dir];
            newOrder[idx + dir] = temp;
            
            return { ...prev, layout: { ...prev.layout, sectionOrder: newOrder } };
        });
    };

    
    const renderOrderControls = (idx: number, total: number) => (
        <div className="flex align-items-center gap-1 mr-2" onClick={e => e.stopPropagation()}>
            <button 
                disabled={idx === 0} 
                onClick={(e) => { e.stopPropagation(); moveSection(idx, -1); }} 
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', borderRadius: '4px', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: '2px 6px', fontSize: '10px' }}
            >▲</button>
            <button 
                disabled={idx === total - 1} 
                onClick={(e) => { e.stopPropagation(); moveSection(idx, 1); }} 
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: idx === total - 1 ? 'rgba(255,255,255,0.2)' : '#fff', borderRadius: '4px', cursor: idx === total - 1 ? 'not-allowed' : 'pointer', padding: '2px 6px', fontSize: '10px' }}
            >▼</button>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }}></div>
        </div>
    );

    const updateField = (field: string, value: any) => setDynamicData((prev: any) => ({ ...prev, [field]: value }));
    const updateNestedField = (p: string, f: string, v: any) => setDynamicData((prev: any) => ({ ...prev, [p]: { ...prev[p], [f]: v } }));
    const updateLayout = (field: string, val: boolean) => setDynamicData((prev: any) => ({ ...prev, layout: { ...prev.layout, [field]: val } }));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const toggleTab = (tabName: string) => {
        setExpandedTab(expandedTab === tabName ? null : tabName);
    };

    const renderHub = () => (
        <div className="canvas-body animate-fadein">
            <div className="hub-greeting mb-6">
                <div style={{ color: '#38bdf8', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>COMMAND CENTER</div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>
                    Welcome, {user?.username || 'Administrator'}
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                    Monitoring sovereign digital infrastructure for <span style={{ color: '#fff', fontWeight: 700 }}>{tenant?.name || 'Madhya Pradesh Department'}</span>.
                </p>
            </div>

            <div className="metrics-grid mb-6">
                {[
                    { label: 'Citizen Inquiries', value: 1250, icon: MessageCircle, color: '#38bdf8' },
                    { label: 'Active Clusters', value: 450, icon: Database, color: '#818cf8' },
                    { label: 'System Uptime', value: 99.9, suffix: '%', icon: Zap, color: '#fbbf24' },
                    { label: 'Verified Beneficiaries', value: 245600, icon: Users, color: '#f472b6' }
                ].map((s, i) => (
                    <motion.div key={i} whileHover={{ y: -5, background: 'rgba(255,255,255,0.05)' }} className="metric-card-pro">
                        <div className="flex justify-content-between align-items-center mb-3">
                            <div style={{ background: `${s.color}20`, color: s.color, padding: '0.8rem', borderRadius: '12px' }}><s.icon size={22} /></div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '2px 8px', borderRadius: '100px' }}>+12.5%</div>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}><AnimatedCounter value={s.value} />{s.suffix || ''}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.4rem' }}>{s.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid">
                <div className="col-12 lg:col-8">
                    <div className="card-pro">
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'white', margin: 0, marginBottom: '2rem' }}>Active Node Monitoring</h3>
                        <div className="flex flex-column gap-4">
                            {['Central Registry API', 'Bhashini Pipeline', 'Multi-Tenant Auth Engine'].map((n, i) => (
                                <div key={i} className="flex align-items-center justify-content-between p-3 border-round-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="flex align-items-center gap-3">
                                        <div className="w-2 h-2 border-circle bg-green-500 shadow-pulse"></div>
                                        <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{n}</span>
                                    </div>
                                    <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700, background: 'rgba(34, 197, 94, 0.1)', padding: '4px 12px', borderRadius: '4px' }}>OPERATIONAL</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-4">
                    <div className="card-pro h-full">
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'white', margin: 0, marginBottom: '2rem' }}>Portal Integrity</h3>
                        <div className="text-center p-4 border-round-2xl mb-4" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Shield size={48} className="mx-auto mb-3 text-blue-400" />
                            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>STRICT v4.0</div>
                        </div>
                        <div className="flex flex-column gap-2 text-sm">
                            <div className="flex justify-content-between"><span style={{ color: '#94a3b8' }}>Last Audit</span><span style={{ color: '#fff' }}>Today, 09:42</span></div>
                            <div className="flex justify-content-between"><span style={{ color: '#94a3b8' }}>Encryption</span><span style={{ color: '#22c55e' }}>AES-256</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="workspace-pro">
            {/* CONDITIONAL LEFT SIDEBAR: Normal dashboard menu vs. visual editor sidebar */}
            {activeTab !== 'builder' ? (
                <aside className="sidebar-pro">
                    <div className="sidebar-header-pro">
                        <div className="logo-pro"><Globe size={18} /></div>
                        <h2 className="title-pro">BharatCMS</h2>
                    </div>
                    <div className="sidebar-menu-pro">
                        <div className="menu-label-pro">DASHBOARD</div>
                        <button className={`menu-item-pro ${activeTab === 'hub' ? 'active' : ''}`} onClick={() => setActiveTab('hub')}>
                            <LayoutDashboard size={18} /> <span>Command Hub</span>
                        </button>
                        <button className={`menu-item-pro ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
                            <TrendingUp size={18} /> <span>Analytics</span>
                        </button>
                        
                        <div className="menu-label-pro" style={{ marginTop: '2.5rem' }}>MANAGEMENT</div>
                        <button className="menu-item-pro" onClick={() => setActiveTab('builder')} style={{ background: 'rgba(56, 189, 248, 0.05)', color: '#38bdf8' }}>
                            <Globe size={18} /> <span>Visual Builder</span>
                        </button>
                        <button className="menu-item-pro"><Database size={18} /> <span>Data Engine</span></button>
                        <button className="menu-item-pro"><Settings size={18} /> <span>Settings</span></button>
                    </div>
                    <div className="sidebar-footer-pro">
                        <div className="user-pill-pro" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                            <div className="user-avatar-pro">{user?.username?.charAt(0).toUpperCase() || 'A'}</div>
                            <div className="user-info-pro">
                                <div className="user-name-pro">{user?.username || 'Admin'}</div>
                                <div className="user-role-pro">Dept Head</div>
                            </div>
                            <ChevronUp size={14} className="ml-auto opacity-40" />
                        </div>
                        {isProfileOpen && (
                            <div className="profile-popover-pro animate-fadein">
                                <div className="popover-header-pro">
                                    <div className="user-name-pro">{user?.username || 'Admin'}</div>
                                    <div className="user-email-pro" style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{user?.username?.toLowerCase()}@globalcms.gov</div>
                                </div>
                                <div className="popover-divider-pro" />
                                <button className="popover-item-pro"><Users size={14} /> My Profile</button>
                                <button className="popover-item-pro" onClick={() => setActiveTab('analytics')}><TrendingUp size={14} /> Performance</button>
                                <button className="popover-item-pro"><Settings size={14} /> Settings</button>
                                <button className="popover-item-pro"><Shield size={14} /> Security</button>
                                <div className="popover-divider-pro" />
                                <button onClick={handleLogout} className="logout-btn-pro"><LogOut size={14} /> SIGN OUT</button>
                            </div>
                        )}
                    </div>
                </aside>
            ) : (
                /* UNIFIED SIDEBAR EDITOR: Replaces normal navigation entirely when inside Visual Builder */
                <aside className="editor-sidebar-container" style={{ width: '420px', minWidth: '420px', background: '#090d16', borderRight: '2px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                    <div className="p-4 border-bottom-1 flex justify-content-between align-items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="flex align-items-center gap-3">
                            <button 
                                onClick={() => setActiveTab('hub')} 
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}
                                title="Exit visual builder"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div>
                                <h2 className="text-white text-md font-black m-0 tracking-tight" style={{ fontSize: '1rem', color: '#fff' }}>Portal Designer</h2>
                                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unified Visual Builder</span>
                            </div>
                        </div>
                        <Button 
                            label="Deploy Portal" 
                            icon={<Save size={14} style={{ marginRight: '6px' }} />} 
                            onClick={handleSave} 
                            loading={loading} 
                            style={{ 
                                background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)', 
                                color: 'white', 
                                border: 'none', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '8px', 
                                fontWeight: 900, 
                                fontSize: '0.8rem', 
                                cursor: 'pointer',
                                boxShadow: '0 10px 15px -3px rgba(99,102,241,0.3)' 
                            }} 
                        />
                    </div>
                    
                    {/* ACCORDION EDITOR PANELS - Scrollable, dark slate layout */}
                    <div className="flex-grow-1 overflow-y-auto p-4 custom-scrollbar" style={{ flexGrow: 1, overflowY: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            
                            
                            {(() => {
                                const defaultOrder = ['accessibility', 'branding', 'navbar', 'ticker', 'hero', 'services', 'about', 'schemes', 'impact', 'noticeHelpdesk', 'footer'];
                                const sectionOrder = dynamicData.layout?.sectionOrder || defaultOrder;
                                
                                const EditorTabs: Record<string, (idx: number, total: number) => React.ReactNode> = {
                                    accessibility: (idx, total) => (
                                        <SectionTab 
                                            id="accessibility" label="GIGW Accessibility" icon={Globe} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showAccessibilityStrip}
                                            onToggleEnable={(v: boolean) => updateLayout('showAccessibilityStrip', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Support Email</label>
                                                <input type="text" value={dynamicData.accessibility?.supportEmail || ''} onChange={e => updateNestedField('accessibility', 'supportEmail', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Support Phone</label>
                                                <input type="text" value={dynamicData.accessibility?.supportPhone || ''} onChange={e => updateNestedField('accessibility', 'supportPhone', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Screen Reader Link</label>
                                                <input type="text" value={dynamicData.accessibility?.screenReaderUrl || ''} onChange={e => updateNestedField('accessibility', 'screenReaderUrl', e.target.value)} />
                                            </div>
                                        </SectionTab>
                                    ), 
                                    branding: (idx, total) => (
                                        <SectionTab 
                                            id="branding" label="Branding Header" icon={Award} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showBrandingHeader}
                                            onToggleEnable={(v: boolean) => updateLayout('showBrandingHeader', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Department Name (EN)</label>
                                                <input type="text" value={dynamicData.departmentName || ''} onChange={e => updateField('departmentName', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Department Name (HI)</label>
                                                <input type="text" value={dynamicData.departmentNameHi || ''} onChange={e => updateField('departmentNameHi', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>National Emblem URL</label>
                                                <input type="text" value={dynamicData.emblemUrl || ''} onChange={e => updateField('emblemUrl', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>State Government Logo URL</label>
                                                <input type="text" value={dynamicData.stateLogoUrl || ''} onChange={e => updateField('stateLogoUrl', e.target.value)} />
                                            </div>
                                            
                                            <div className="sub-section">
                                                <h4>VVIP PORTRAITS (MAX 2)</h4>
                                                {dynamicData.leadership?.map((leader: any, lIdx: number) => (
                                                    <div key={lIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">VVIP Profile #{lIdx + 1}</span>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" value={leader.name || ''} onChange={e => {
                                                                const copy = [...dynamicData.leadership];
                                                                copy[lIdx].name = e.target.value;
                                                                updateField('leadership', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Title / Office</label>
                                                            <input type="text" value={leader.title || ''} onChange={e => {
                                                                const copy = [...dynamicData.leadership];
                                                                copy[lIdx].title = e.target.value;
                                                                updateField('leadership', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Photo URL</label>
                                                            <input type="text" value={leader.photoUrl || ''} onChange={e => {
                                                                const copy = [...dynamicData.leadership];
                                                                copy[lIdx].photoUrl = e.target.value;
                                                                updateField('leadership', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ), 
                                    navbar: (idx, total) => (
                                        <SectionTab 
                                            id="navbar" label="Main Navigation" icon={AlignLeft} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showNavbar}
                                            onToggleEnable={(v: boolean) => updateLayout('showNavbar', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="sub-section">
                                                <div className="flex justify-content-between align-items-center mb-3">
                                                    <h4>NAVIGATION LINKS</h4>
                                                    <button className="add-btn" onClick={() => {
                                                        const copy = [...dynamicData.navItems];
                                                        copy.push({ label: 'New Link', url: '#', dropdowns: [] });
                                                        updateField('navItems', copy);
                                                    }}><Plus size={14} /> Add Link</button>
                                                </div>
                                                {dynamicData.navItems?.map((nav: any, nIdx: number) => (
                                                    <div key={nIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">Nav Item #{nIdx + 1}</span>
                                                            <button className="delete-btn" onClick={() => {
                                                                const copy = [...dynamicData.navItems];
                                                                copy.splice(nIdx, 1);
                                                                updateField('navItems', copy);
                                                            }}><Trash2 size={12} /></button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Label</label>
                                                            <input type="text" value={nav.label || ''} onChange={e => {
                                                                const copy = [...dynamicData.navItems];
                                                                copy[nIdx].label = e.target.value;
                                                                updateField('navItems', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>URL</label>
                                                            <input type="text" value={nav.url || ''} onChange={e => {
                                                                const copy = [...dynamicData.navItems];
                                                                copy[nIdx].url = e.target.value;
                                                                updateField('navItems', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Dropdown Items (Comma separated)</label>
                                                            <input 
                                                                type="text" 
                                                                value={nav.dropdowns?.join(', ') || ''} 
                                                                onChange={e => {
                                                                    const copy = [...dynamicData.navItems];
                                                                    copy[nIdx].dropdowns = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                                                    updateField('navItems', copy);
                                                                }} 
                                                                placeholder="e.g. History, Directives, Contact"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ),
                                    ticker: (idx, total) => (
                                        <SectionTab 
                                            id="ticker" label="Ticker Marquee" icon={Bell} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showNewsTicker}
                                            onToggleEnable={(v: boolean) => updateLayout('showNewsTicker', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Ticker Title</label>
                                                <input type="text" value={dynamicData.tickerLabel || ''} onChange={e => updateField('tickerLabel', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Marquee Scrolling Message</label>
                                                <textarea rows={3} value={dynamicData.flashAlert || ''} onChange={e => updateField('flashAlert', e.target.value)} />
                                            </div>
                                        </SectionTab>
                                    ),
                                    hero: (idx, total) => (
                                        <SectionTab 
                                            id="hero" label="Hero Carousel" icon={Zap} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showHero}
                                            onToggleEnable={(v: boolean) => updateLayout('showHero', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="sub-section">
                                                <div className="flex justify-content-between align-items-center mb-3">
                                                    <h4>CAROUSEL SLIDES</h4>
                                                    <button className="add-btn" onClick={() => {
                                                        const copy = [...dynamicData.slides];
                                                        copy.push({ title: 'New Slide Heading', subtitle: 'Slide sub-description', bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600', btnText: 'Apply Now', btnUrl: '#' });
                                                        updateField('slides', copy);
                                                    }}><Plus size={14} /> Add Slide</button>
                                                </div>
                                                {dynamicData.slides?.map((slide: any, sIdx: number) => (
                                                    <div key={sIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">Slide #{sIdx + 1}</span>
                                                            <button className="delete-btn" onClick={() => {
                                                                const copy = [...dynamicData.slides];
                                                                copy.splice(sIdx, 1);
                                                                updateField('slides', copy);
                                                            }}><Trash2 size={12} /></button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Headline Text</label>
                                                            <input type="text" value={slide.title || ''} onChange={e => {
                                                                const copy = [...dynamicData.slides];
                                                                copy[sIdx].title = e.target.value;
                                                                updateField('slides', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Subtext Description</label>
                                                            <textarea rows={2} value={slide.subtitle || ''} onChange={e => {
                                                                const copy = [...dynamicData.slides];
                                                                copy[sIdx].subtitle = e.target.value;
                                                                updateField('slides', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Background Image URL</label>
                                                            <input type="text" value={slide.bgImage || ''} onChange={e => {
                                                                const copy = [...dynamicData.slides];
                                                                copy[sIdx].bgImage = e.target.value;
                                                                updateField('slides', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Orange Button Text</label>
                                                            <input type="text" value={slide.btnText || ''} onChange={e => {
                                                                const copy = [...dynamicData.slides];
                                                                copy[sIdx].btnText = e.target.value;
                                                                updateField('slides', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Orange Button Redirect URL</label>
                                                            <input type="text" value={slide.btnUrl || ''} onChange={e => {
                                                                const copy = [...dynamicData.slides];
                                                                copy[sIdx].btnUrl = e.target.value;
                                                                updateField('slides', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ),
                                    services: (idx, total) => (
                                        <SectionTab 
                                            id="services" label="Quick Services Cards" icon={Briefcase} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showServices}
                                            onToggleEnable={(v: boolean) => updateLayout('showServices', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="sub-section">
                                                <h4>4-COLUMN FLOATING CARDS</h4>
                                                {dynamicData.services?.slice(0, 4).map((s: any, sIdx: number) => (
                                                    <div key={sIdx} className="inner-card">
                                                        <span className="inner-card-title">Service Card #{sIdx + 1}</span>
                                                        <div className="form-group">
                                                            <label>Card Title</label>
                                                            <input type="text" value={s.title || ''} onChange={e => {
                                                                const copy = [...dynamicData.services];
                                                                copy[sIdx].title = e.target.value;
                                                                updateField('services', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Brief Description</label>
                                                            <textarea rows={2} value={s.desc || ''} onChange={e => {
                                                                const copy = [...dynamicData.services];
                                                                copy[sIdx].desc = e.target.value;
                                                                updateField('services', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Icon Identifier</label>
                                                            <select 
                                                                value={s.iconName || 'Shield'} 
                                                                onChange={e => {
                                                                    const copy = [...dynamicData.services];
                                                                    copy[sIdx].iconName = e.target.value;
                                                                    updateField('services', copy);
                                                                }}
                                                                style={{ width: '100%', background: '#0a0f1d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '0.8rem' }}
                                                            >
                                                                <option value="Shield">Shield (Security)</option>
                                                                <option value="RefreshCw">Refresh (Tracking)</option>
                                                                <option value="Building">Building (Admissions)</option>
                                                                <option value="FileText">FileText (Marksheets)</option>
                                                                <option value="Award">Award (Certificates)</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Redirect URL</label>
                                                            <input type="text" value={s.link || ''} onChange={e => {
                                                                const copy = [...dynamicData.services];
                                                                copy[sIdx].link = e.target.value;
                                                                updateField('services', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ),
                                    about: (idx, total) => (
                                        <SectionTab 
                                            id="about" label="About Section Split" icon={Info} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showAbout}
                                            onToggleEnable={(v: boolean) => updateLayout('showAbout', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Intro Title</label>
                                                <input type="text" value={dynamicData.aboutTitle || ''} onChange={e => updateField('aboutTitle', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Introductory Paragraph</label>
                                                <textarea rows={4} value={dynamicData.aboutText || ''} onChange={e => updateField('aboutText', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Left Image URL</label>
                                                <input type="text" value={dynamicData.aboutImage || ''} onChange={e => updateField('aboutImage', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Floating Badge Number</label>
                                                <input type="text" value={dynamicData.aboutBadgeNumber || ''} onChange={e => updateField('aboutBadgeNumber', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Floating Badge Label</label>
                                                <input type="text" value={dynamicData.aboutBadgeText || ''} onChange={e => updateField('aboutBadgeText', e.target.value)} />
                                            </div>
                                            
                                            <div className="sub-section">
                                                <div className="flex justify-content-between align-items-center mb-3">
                                                    <h4>STACKED QUICK LINKS</h4>
                                                    <button className="add-btn" onClick={() => {
                                                        const copy = [...dynamicData.quickLinks];
                                                        copy.push({ label: 'New Quick Link', url: '#' });
                                                        updateField('quickLinks', copy);
                                                    }}><Plus size={14} /> Add Link</button>
                                                </div>
                                                {dynamicData.quickLinks?.map((link: any, qIdx: number) => (
                                                    <div key={qIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">Quick Link #{qIdx + 1}</span>
                                                            <button className="delete-btn" onClick={() => {
                                                                const copy = [...dynamicData.quickLinks];
                                                                copy.splice(qIdx, 1);
                                                                updateField('quickLinks', copy);
                                                            }}><Trash2 size={12} /></button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Label</label>
                                                            <input type="text" value={link.label || ''} onChange={e => {
                                                                const copy = [...dynamicData.quickLinks];
                                                                copy[qIdx].label = e.target.value;
                                                                updateField('quickLinks', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Redirect URL</label>
                                                            <input type="text" value={link.url || ''} onChange={e => {
                                                                const copy = [...dynamicData.quickLinks];
                                                                copy[qIdx].url = e.target.value;
                                                                updateField('quickLinks', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ),
                                    schemes: (idx, total) => (
                                        <SectionTab 
                                            id="schemes" label="Schemes Directory" icon={List} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showSchemes}
                                            onToggleEnable={(v: boolean) => updateLayout('showSchemes', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Directory Title</label>
                                                <input type="text" value={dynamicData.schemesTitle || ''} onChange={e => updateField('schemesTitle', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Directory Subtitle</label>
                                                <textarea rows={2} value={dynamicData.schemesSub || ''} onChange={e => updateField('schemesSub', e.target.value)} />
                                            </div>
                                            
                                            <div className="sub-section">
                                                <div className="flex justify-content-between align-items-center mb-3">
                                                    <h4>DIRECTORY SCHEMES</h4>
                                                    <button className="add-btn" onClick={() => {
                                                        const copy = [...dynamicData.schemes];
                                                        copy.push({ name: 'New Initiative', type: 'State', desc: 'Initiative details and instructions.', logoUrl: '', link: '#' });
                                                        updateField('schemes', copy);
                                                    }}><Plus size={14} /> Add Scheme</button>
                                                </div>
                                                {dynamicData.schemes?.map((sch: any, sIdx: number) => (
                                                    <div key={sIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">Scheme #{sIdx + 1}</span>
                                                            <button className="delete-btn" onClick={() => {
                                                                const copy = [...dynamicData.schemes];
                                                                copy.splice(sIdx, 1);
                                                                updateField('schemes', copy);
                                                            }}><Trash2 size={12} /></button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Scheme Name</label>
                                                            <input type="text" value={sch.name || ''} onChange={e => {
                                                                const copy = [...dynamicData.schemes];
                                                                copy[sIdx].name = e.target.value;
                                                                updateField('schemes', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Scheme Sponsor Type</label>
                                                            <select 
                                                                value={sch.type || 'State'} 
                                                                onChange={e => {
                                                                    const copy = [...dynamicData.schemes];
                                                                    copy[sIdx].type = e.target.value;
                                                                    updateField('schemes', copy);
                                                                }}
                                                                style={{ width: '100%', background: '#0a0f1d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', padding: '0.8rem' }}
                                                            >
                                                                <option value="State">State Scheme</option>
                                                                <option value="Central">Central Scheme</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Description (Max 2 lines)</label>
                                                            <textarea rows={2} value={sch.desc || ''} onChange={e => {
                                                                const copy = [...dynamicData.schemes];
                                                                copy[sIdx].desc = e.target.value;
                                                                updateField('schemes', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Apply Link</label>
                                                            <input type="text" value={sch.link || ''} onChange={e => {
                                                                const copy = [...dynamicData.schemes];
                                                                copy[sIdx].link = e.target.value;
                                                                updateField('schemes', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ),
                                    impact: (idx, total) => (
                                        <SectionTab 
                                            id="impact" label="Impact Metrics" icon={BarChart2} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showImpact}
                                            onToggleEnable={(v: boolean) => updateLayout('showImpact', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Impact Heading</label>
                                                <input type="text" value={dynamicData.impactTitle || ''} onChange={e => updateField('impactTitle', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Impact Subtitle</label>
                                                <input type="text" value={dynamicData.impactSub || ''} onChange={e => updateField('impactSub', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>MP Map SVG URL (Highlighting)</label>
                                                <input type="text" value={dynamicData.mapSvgUrl || ''} onChange={e => updateField('mapSvgUrl', e.target.value)} />
                                            </div>
                                            
                                            <div className="sub-section">
                                                <h4>4 SIDE METRIC CARDS</h4>
                                                {dynamicData.impactStats?.slice(0, 4).map((s: any, sIdx: number) => (
                                                    <div key={sIdx} className="inner-card">
                                                        <span className="inner-card-title">Stat Card #{sIdx + 1}</span>
                                                        <div className="form-group">
                                                            <label>Stat Metric Label</label>
                                                            <input type="text" value={s.label || ''} onChange={e => {
                                                                const copy = [...dynamicData.impactStats];
                                                                copy[sIdx].label = e.target.value;
                                                                updateField('impactStats', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Stat Metric Value (Number)</label>
                                                            <input type="number" value={s.value || 0} onChange={e => {
                                                                const copy = [...dynamicData.impactStats];
                                                                copy[sIdx].value = parseInt(e.target.value) || 0;
                                                                updateField('impactStats', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Value Suffix (e.g. %, +)</label>
                                                            <input type="text" value={s.suffix || ''} onChange={e => {
                                                                const copy = [...dynamicData.impactStats];
                                                                copy[sIdx].suffix = e.target.value;
                                                                updateField('impactStats', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Accent Hex (Border side)</label>
                                                            <input type="text" value={s.color || ''} placeholder="e.g. #fbbf24" onChange={e => {
                                                                const copy = [...dynamicData.impactStats];
                                                                copy[sIdx].color = e.target.value;
                                                                updateField('impactStats', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ),
                                    noticeHelpdesk: (idx, total) => (
                                        <SectionTab 
                                            id="noticeHelpdesk" label="Notices & Helpdesk" icon={Bell} idx={idx} total={total}
                                            isEnabled={dynamicData.layout.showNoticeHelpdesk}
                                            onToggleEnable={(v: boolean) => updateLayout('showNoticeHelpdesk', v)}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Notice Board Title</label>
                                                <input type="text" value={dynamicData.noticeTitle || ''} onChange={e => updateField('noticeTitle', e.target.value)} />
                                            </div>
                                            
                                            <div className="sub-section">
                                                <div className="flex justify-content-between align-items-center mb-3">
                                                    <h4>RECENT PUBLICATIONS</h4>
                                                    <button className="add-btn" onClick={() => {
                                                        const copy = [...dynamicData.notices];
                                                        copy.push({ date: '20 May', tag: 'OFFICIAL ORDER', title: 'New policy details', id: 'MPSOS-ORD-2026-100', downloadUrl: '#' });
                                                        updateField('notices', copy);
                                                    }}><Plus size={14} /> Add Notice</button>
                                                </div>
                                                {dynamicData.notices?.map((n: any, nIdx: number) => (
                                                    <div key={nIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">Notice #{nIdx + 1}</span>
                                                            <button className="delete-btn" onClick={() => {
                                                                const copy = [...dynamicData.notices];
                                                                copy.splice(nIdx, 1);
                                                                updateField('notices', copy);
                                                            }}><Trash2 size={12} /></button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Notice Date (e.g. 24 May)</label>
                                                            <input type="text" value={n.date || ''} onChange={e => {
                                                                const copy = [...dynamicData.notices];
                                                                copy[nIdx].date = e.target.value;
                                                                updateField('notices', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Tag (e.g. OFFICIAL ORDER, ACTIVE TENDER)</label>
                                                            <input type="text" value={n.tag || ''} onChange={e => {
                                                                const copy = [...dynamicData.notices];
                                                                copy[nIdx].tag = e.target.value;
                                                                updateField('notices', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Notice ID/Serial</label>
                                                            <input type="text" value={n.id || ''} onChange={e => {
                                                                const copy = [...dynamicData.notices];
                                                                copy[nIdx].id = e.target.value;
                                                                updateField('notices', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Publication Title</label>
                                                            <textarea rows={2} value={n.title || ''} onChange={e => {
                                                                const copy = [...dynamicData.notices];
                                                                copy[nIdx].title = e.target.value;
                                                                updateField('notices', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Download Document URL</label>
                                                            <input type="text" value={n.downloadUrl || ''} onChange={e => {
                                                                const copy = [...dynamicData.notices];
                                                                copy[nIdx].downloadUrl = e.target.value;
                                                                updateField('notices', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="sub-section" style={{ marginTop: '2rem' }}>
                                                <h4>NEED ASSISTANCE? (HELPDESK CARD)</h4>
                                                <div className="form-group">
                                                    <label>Card Heading</label>
                                                    <input type="text" value={dynamicData.helpdeskTitle || ''} onChange={e => updateField('helpdeskTitle', e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Card Subtext</label>
                                                    <textarea rows={2} value={dynamicData.helpdeskSub || ''} onChange={e => updateField('helpdeskSub', e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Toll-Free Helpline Number</label>
                                                    <input type="text" value={dynamicData.helpdeskPhone || ''} onChange={e => updateField('helpdeskPhone', e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Complaint Button Text</label>
                                                    <input type="text" value={dynamicData.helpdeskBtnText || ''} onChange={e => updateField('helpdeskBtnText', e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Complaint Button Redirect URL</label>
                                                    <input type="text" value={dynamicData.helpdeskBtnUrl || ''} onChange={e => updateField('helpdeskBtnUrl', e.target.value)} />
                                                </div>
                                            </div>
                                        </SectionTab>
                                    ),
                                    footer: (idx, total) => (
                                        <SectionTab 
                                            id="footer" label="Government Footer" icon={Shield} idx={idx} total={total}
                                            expandedTab={expandedTab} toggleTab={toggleTab} renderOrderControls={renderOrderControls}
                                        >
                                            <div className="form-group">
                                                <label>Office Address</label>
                                                <input type="text" value={dynamicData.footer?.address || ''} onChange={e => updateNestedField('footer', 'address', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Support Email</label>
                                                <input type="text" value={dynamicData.footer?.email || ''} onChange={e => updateNestedField('footer', 'email', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Support Phone</label>
                                                <input type="text" value={dynamicData.footer?.phone || ''} onChange={e => updateNestedField('footer', 'phone', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Copyright Attribution Text</label>
                                                <input type="text" value={dynamicData.footer?.copyrightText || ''} onChange={e => updateNestedField('footer', 'copyrightText', e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Hits Visitor Base Number</label>
                                                <input type="number" value={dynamicData.footer?.visitorCounterBase || 0} onChange={e => updateNestedField('footer', 'visitorCounterBase', parseInt(e.target.value) || 0)} />
                                            </div>
                                            
                                            <div className="sub-section">
                                                <div className="flex justify-content-between align-items-center mb-3">
                                                    <h4>FOOTER IMPORTANT LINKS</h4>
                                                    <button className="add-btn" onClick={() => {
                                                        const copy = { ...dynamicData.footer };
                                                        copy.importantLinks.push({ label: 'New Footer Link', url: '#' });
                                                        updateField('footer', copy);
                                                    }}><Plus size={14} /> Add Link</button>
                                                </div>
                                                {dynamicData.footer?.importantLinks?.map((link: any, fIdx: number) => (
                                                    <div key={fIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">Footer Link #{fIdx + 1}</span>
                                                            <button className="delete-btn" onClick={() => {
                                                                const copy = { ...dynamicData.footer };
                                                                copy.importantLinks.splice(fIdx, 1);
                                                                updateField('footer', copy);
                                                            }}><Trash2 size={12} /></button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Label</label>
                                                            <input type="text" value={link.label || ''} onChange={e => {
                                                                const copy = { ...dynamicData.footer };
                                                                copy.importantLinks[fIdx].label = e.target.value;
                                                                updateField('footer', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>URL</label>
                                                            <input type="text" value={link.url || ''} onChange={e => {
                                                                const copy = { ...dynamicData.footer };
                                                                copy.importantLinks[fIdx].url = e.target.value;
                                                                updateField('footer', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="sub-section">
                                                <div className="flex justify-content-between align-items-center mb-3">
                                                    <h4>FOOTER POLICIES</h4>
                                                    <button className="add-btn" onClick={() => {
                                                        const copy = { ...dynamicData.footer };
                                                        copy.policies.push({ label: 'New Policy', url: '#' });
                                                        updateField('footer', copy);
                                                    }}><Plus size={14} /> Add Policy</button>
                                                </div>
                                                {dynamicData.footer?.policies?.map((policy: any, pIdx: number) => (
                                                    <div key={pIdx} className="inner-card">
                                                        <div className="flex justify-content-between align-items-center mb-2">
                                                            <span className="inner-card-title">Policy Link #{pIdx + 1}</span>
                                                            <button className="delete-btn" onClick={() => {
                                                                const copy = { ...dynamicData.footer };
                                                                copy.policies.splice(pIdx, 1);
                                                                updateField('footer', copy);
                                                            }}><Trash2 size={12} /></button>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Label</label>
                                                            <input type="text" value={policy.label || ''} onChange={e => {
                                                                const copy = { ...dynamicData.footer };
                                                                copy.policies[pIdx].label = e.target.value;
                                                                updateField('footer', copy);
                                                            }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>URL</label>
                                                            <input type="text" value={policy.url || ''} onChange={e => {
                                                                const copy = { ...dynamicData.footer };
                                                                copy.policies[pIdx].url = e.target.value;
                                                                updateField('footer', copy);
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SectionTab>
                                    ),
                                };

                                return (
                                    <>
                                        {sectionOrder.map((key: string, idx: number) => (
                                            <React.Fragment key={key}>
                                                {EditorTabs[key] && EditorTabs[key](idx, sectionOrder.length)}
                                            </React.Fragment>
                                        ))}
                                    </>
                                );
                            })()}
</div>
                    </div>
                </aside>
            )}

            {/* MAIN PORTAL AREA */}
            <main className="main-area-pro" style={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {activeTab === 'builder' ? (
                    /* DYNAMIC FULL-SCREEN DUAL PANEL FOR THE UNIFIED VISUAL BUILDER PREVIEW */
                    <div className="flex-grow-1 relative bg-slate-900 p-4" style={{ flexGrow: 1, overflow: 'hidden', display: 'flex', background: '#0b0f19' }}>
                        <div className="bg-white shadow-8 border-round-2xl h-full w-full overflow-y-auto custom-scrollbar border-1 border-gray-800" style={{ flexGrow: 1, borderRadius: '16px', background: '#fff', overflowY: 'auto' }}>
                            <LivePreview dataOverride={dynamicData} />
                        </div>
                    </div>
                ) : (
                    <>
                        <header className="header-pro">
                            <div className="header-status-pro">
                                <div className="flex align-items-center gap-2">
                                    <div className="pulse-dot-pro"></div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em' }}>SOVEREIGN NETWORK ACTIVE</span>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>INSTANCE: {tenant?.tenantId?.toUpperCase() || 'DEFAULT'}</div>
                            </div>
                            <div className="flex gap-4 align-items-center">
                                <div className="header-clock-pro"><Clock size={14} className="mr-2" /> {new Date().toLocaleTimeString()}</div>
                                <button className="btn-notif-pro"><Bell size={18} /><span className="notif-badge-pro">3</span></button>
                            </div>
                        </header>
                        <div className="content-pro">
                            {activeTab === 'hub' && renderHub()}
                            {activeTab === 'analytics' && <div className="p-8 text-center text-gray-500">Analytics Dashboard module syncing...</div>}
                        </div>
                    </>
                )}
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Lexend:wght@700;800;900&display=swap');
                .workspace-pro { display: flex; height: 100vh; width: 100vw; background: #020617; color: #e2e8f0; font-family: 'Inter', sans-serif; overflow: hidden; }
                .sidebar-pro { width: 280px; background: #020617; border-right: 1.5px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; padding: 2rem 1.5rem; z-index: 100; }
                .sidebar-header-pro { display: flex; align-items: center; gap: 1rem; margin-bottom: 4rem; }
                .logo-pro { width: 36px; height: 36px; background: linear-gradient(135deg, #4c1d95 0%, #2e1065 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 10px 15px -3px rgba(76,29,149,0.4); }
                .title-pro { font-family: 'Lexend', sans-serif; font-size: 1.5rem; font-weight: 900; margin: 0; letter-spacing: -0.04em; color: white; }
                .sidebar-menu-pro { flex-grow: 1; }
                .menu-label-pro { font-size: 0.65rem; font-weight: 900; color: #475569; letter-spacing: 0.25em; margin-bottom: 1rem; margin-left: 0.5rem; }
                .menu-item-pro { display: flex; align-items: center; gap: 1rem; width: 100%; padding: 1rem 1.2rem; background: transparent; border: none; color: #94a3b8; font-size: 0.9rem; font-weight: 700; border-radius: 12px; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-align: left; margin-bottom: 0.5rem; }
                .menu-item-pro:hover { background: rgba(255,255,255,0.03); color: white; transform: translateX(4px); }
                .menu-item-pro.active { background: #4c1d95 !important; color: white !important; box-shadow: 0 10px 15px -3px rgba(76,29,149,0.3); }
                .user-pill-pro { display: flex; align-items: center; gap: 1rem; padding: 0.8rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; cursor: pointer; }
                .user-avatar-pro { width: 40px; height: 40px; background: #38bdf8; color: #020617; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; }
                .profile-popover-pro { position: absolute; bottom: calc(100% + 1rem); left: 0; right: 0; background: #0f172a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 0.6rem; z-index: 1000; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
                .popover-header-pro { padding: 0.8rem; }
                .popover-divider-pro { height: 1px; background: rgba(255,255,255,0.05); margin: 0.4rem 0.2rem; }
                .popover-item-pro { width: 100%; padding: 0.7rem 0.8rem; background: transparent; border: none; color: #94a3b8; font-size: 0.8rem; font-weight: 700; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s; }
                .popover-item-pro:hover { background: rgba(255,255,255,0.04); color: white; }
                .logout-btn-pro { width: 100%; padding: 0.8rem; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.1); color: #f87171; font-weight: 900; font-size: 0.7rem; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 0.4rem; transition: all 0.2s; }
                .logout-btn-pro:hover { background: rgba(239, 68, 68, 0.15); color: #ef4444; border-color: rgba(239, 68, 68, 0.2); }
                
                .main-area-pro { flex-grow: 1; display: flex; flex-direction: column; }
                .header-pro { padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(2, 6, 23, 0.5); backdrop-filter: blur(10px); }
                .pulse-dot-pro { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; animation: pulseNode 2s infinite; }
                @keyframes pulseNode { 0% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } }
                .content-pro { padding: 3rem; flex-grow: 1; overflow-y: auto; }
                .metric-card-pro { background: rgba(255,255,255,0.02); border: 1.5px solid rgba(255,255,255,0.05); border-radius: 24px; padding: 2.5rem; transition: all 0.3s ease; }
                .card-pro { background: rgba(255,255,255,0.02); border: 1.5px solid rgba(255,255,255,0.05); border-radius: 32px; padding: 3rem; }
                .shadow-pulse { animation: shadowPulse 2s infinite; }
                @keyframes shadowPulse { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
                
                /* PRESET UTILITIES FOR SYSTEM BUILDER SIDEBAR EDITOR */
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                
                .custom-editor-tab { background: #0c1322; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin-bottom: 0.8rem; overflow: hidden; transition: all 0.3s ease; }
                .custom-editor-tab.expanded { border-color: rgba(99, 102, 241, 0.35); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
                .tab-header { padding: 1.2rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; }
                .tab-header:hover { background: rgba(255,255,255,0.02); }
                .tab-icon { color: #6366f1; }
                .tab-title { color: #f1f5f9; font-weight: 800; font-size: 0.9rem; }
                
                .tab-content { padding: 1.2rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 1.2rem; background: #0a0f1d; }
                
                .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .form-group label { color: #94a3b8; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; }
                .form-group input, .form-group textarea { background: #070a13 !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #fff !important; border-radius: 8px !important; width: 100% !important; padding: 0.8rem !important; font-size: 0.85rem !important; font-family: 'Inter', sans-serif; transition: all 0.2s ease; }
                .form-group input:focus, .form-group textarea:focus { border-color: #6366f1 !important; outline: none; }
                
                .sub-section { border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 1.5rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 1rem; }
                .sub-section h4 { font-size: 0.8rem; font-weight: 950; color: #818cf8; letter-spacing: 0.15em; margin: 0; text-transform: uppercase; }
                
                .inner-card { background: #0c1322; border: 1px solid rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 10px; display: flex; flex-direction: column; gap: 1rem; }
                .inner-card-title { font-size: 0.75rem; font-weight: 800; color: #64748b; }
                
                .add-btn { display: inline-flex; align-items: center; gap: 4px; background: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 6px; padding: 0.4rem 0.8rem; font-size: 0.75rem; font-weight: 850; cursor: pointer; transition: all 0.2s; }
                .add-btn:hover { background: rgba(99, 102, 241, 0.3); color: #fff; }
                
                .delete-btn { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 0.4rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .delete-btn:hover { background: #ef4444; color: #fff; }

                .animate-fadein { animation: fadeIn 0.4s ease forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};
