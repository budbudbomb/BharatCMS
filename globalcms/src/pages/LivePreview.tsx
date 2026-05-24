import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FadeInSection, 
    AnimatedCounter 
} from '../components/layout/AnimatedContainer';
import {
    Globe, Phone, Mail,
    ArrowRight, Zap, FileText,
    Award, RefreshCw,
    MapPin, Download, ExternalLink,
    Info, Bell, Shield, Building, Scale,
    ChevronDown, Layout, ChevronLeft, ChevronRight,
    Globe as GlobeIcon, MessageCircle, Video, UserCheck
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   PREMIUM UTILITY COMPONENTS & GIGW TRANSLATION
   ═══════════════════════════════════════════════════════════════ */

const GIGWNav = ({ children, accentColor }: { children: React.ReactNode; accentColor: string }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav 
            className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-scrolled' : ''}`}
            style={{
                background: isScrolled ? 'rgba(30, 16, 80, 0.95)' : '#4c1d95', // Deep Purple
                borderBottom: `3px solid ${accentColor}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isScrolled ? '0.6rem 2rem' : '1rem 2rem',
                minHeight: isScrolled ? '64px' : '76px',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none'
            }}
        >
            {children}
        </motion.nav>
    );
};

// GIGW Dictionary for real-time translation
const dict = {
    en: {
        screenReader: "Screen Reader Access",
        govOfMp: "GOVERNMENT OF MADHYA PRADESH",
        secureAccess: "SECURE ACCESS",
        portalLogin: "PORTAL LOGIN",
        latestNews: "LATEST NEWS",
        applyNow: "Apply Now",
        readMore: "Read More",
        overview: "INSTITUTIONAL OVERVIEW",
        welfareDirectory: "Welfare Initiatives Directory",
        welfareSubtitle: "Explore central and state-sponsored schemes designed to support every learner across the socio-economic spectrum.",
        impactMetrics: "MPSOS Impact Metrics",
        dataTransparency: "Data-Driven Transparency",
        bulletinBoard: "Bulletin Board",
        recentPublications: "Recent Publications",
        viewArchive: "VIEW ARCHIVE",
        needAssistance: "Need Assistance?",
        lodgeComplaint: "Lodge a Complaint",
        tollFree: "Toll Free Helpline",
        visitorCounter: "Visitor Hits Counter",
        allSchemes: "ALL SCHEMES",
        centralSchemes: "CENTRAL SCHEMES",
        stateSchemes: "STATE SCHEMES",
        quickLinks: "Quick Links"
    },
    hi: {
        screenReader: "स्क्रीन रीडर एक्सेस",
        govOfMp: "मध्य प्रदेश सरकार",
        secureAccess: "सुरक्षित पहुंच",
        portalLogin: "पोर्टल लॉगिन",
        latestNews: "नवीनतम समाचार",
        applyNow: "अभी आवेदन करें",
        readMore: "अधिक पढ़ें",
        overview: "संस्थागत अवलोकन",
        welfareDirectory: "कल्याणकारी योजना निर्देशिका",
        welfareSubtitle: "सामाजिक-आर्थिक पृष्ठभूमि के सभी शिक्षार्थियों की सहायता के लिए बनाई गई केंद्रीय और राज्य प्रायोजित योजनाओं का पता लगाएं।",
        impactMetrics: "MPSOS प्रभाव संकेतक",
        dataTransparency: "डेटा-संचालित पारदर्शिता",
        bulletinBoard: "सूचना पट्ट",
        recentPublications: "हाल के प्रकाशन",
        viewArchive: "अभिलेखागार देखें",
        needAssistance: "सहायता की आवश्यकता है?",
        lodgeComplaint: "शिकायत दर्ज करें",
        tollFree: "टोल फ्री हेल्पलाइन",
        visitorCounter: "कुल आगंतुक संख्या",
        allSchemes: "सभी योजनाएं",
        centralSchemes: "केंद्रीय योजनाएं",
        stateSchemes: "राज्य योजनाएं",
        quickLinks: "त्वरित लिंक्स"
    }
};

/* ═══════════════════════════════════════════════════════════════
   MAIN LIVE PREVIEW COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export const LivePreview = ({ dataOverride }: { dataOverride?: any }) => {
    
    // States for interactive a11y features
    const [lang, setLang] = useState<'en' | 'hi'>('en');
    const [highContrast, setHighContrast] = useState<boolean>(false);
    const [fontSizeScale, setFontSizeScale] = useState<'small' | 'medium' | 'large'>('medium');
    const [activeSchemeTab, setActiveSchemeTab] = useState<'All' | 'Central' | 'State'>('All');
    const [activeSlide, setActiveSlide] = useState(0);

    /* ── DEFAULT PRO MAX DATA ── */
    const defaultData = {
        themeColor: 'f97316', // Orange Theme Color
        departmentName: 'MP STATE OPEN SCHOOL EDUCATION BOARD',
        departmentNameHi: 'म.प्र. राज्य मुक्त स्कूल शिक्षा बोर्ड',
        emblemUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg',
        stateLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Emblem_of_Madhya_Pradesh.svg',
        
        // 1. Accessibility Customization
        accessibility: {
            supportEmail: 'admin@mpos.gov.in',
            supportPhone: '+91 755 255 2106',
            screenReaderUrl: '#'
        },

        // 2. Branding Portraits
        leadership: [
            { name: 'Dr. Mohan Yadav', title: 'Hon. Chief Minister, MP', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mohan_Yadav_official_portrait.jpg/220px-Mohan_Yadav_official_portrait.jpg' },
            { name: 'Uday Pratap Singh', title: 'Minister, School Education', photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Uday_Pratap_Singh_official_portrait.jpg/220px-Uday_Pratap_Singh_official_portrait.jpg' }
        ],

        // 3. Main Navigation links
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

        // 4. Hero slides
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

        // 5. News Ticker
        flashAlert: '◆ DPI Baseline Configuration module live. ◆ Ruk Jaana Nahi exam registration extended. ◆ Digital Locker integration active.',
        tickerLabel: 'Latest News',

        // 6. Services Grid Cards
        services: [
            { title: 'Check Eligibility', desc: 'Instant verification of academic and financial eligibility for state-funded schemes.', iconName: 'Shield', link: '#' },
            { title: 'Track Application', desc: 'Monitor the status of your marksheets, certificates, and enrollment requests in real-time.', iconName: 'RefreshCw', link: '#' },
            { title: 'Online Admissions', desc: 'Centralized portal for seamless enrollment into Open School programs across 52 districts.', iconName: 'Building', link: '#' },
            { title: 'Digital Marksheets', desc: 'Access blockchain-secured digital certificates compatible with DigiLocker.', iconName: 'FileText', link: '#' }
        ],

        // 7. About Section
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

        // 8. Schemes Directory
        schemesTitle: 'Welfare Initiatives Directory',
        schemesSub: 'Explore central and state-sponsored schemes designed to support every learner across the socio-economic spectrum.',
        schemes: [
            { type: 'State', name: 'Ruk Jaana Nahi', desc: 'A flagship initiative allowing students to clear subjects instantly and resume their academic journey without gaps.', logoUrl: '', link: '#' },
            { type: 'Central', name: 'PM SHRI Schools', desc: 'Developing select institutions into smart-school models with high-end labs and digital infrastructure.', logoUrl: '', link: '#' },
            { type: 'State', name: 'Super 100 Scheme', desc: 'Free residential coaching for high-merit board students for medical and engineering entrance exams.', logoUrl: '', link: '#' }
        ],

        // 9. Impact metrics
        impactTitle: 'MPSOS Impact Metrics',
        impactSub: 'Data-Driven Transparency',
        impactStats: [
            { label: 'Active Clusters', value: 450, suffix: '+', color: '#0369a1' },
            { label: 'Infrastructure Uptime', value: 99, suffix: '%', color: '#fbbf24' },
            { label: 'Daily Verified Users', value: 12450, suffix: '', color: '#f472b6' },
            { label: 'Govt Service Nodes', value: 210, suffix: '', color: '#4ade80' }
        ],
        mapSvgUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Madhya_Pradesh_districts.svg',

        // 10. Notice Board & Helpdesk
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

        // 11. Footer details
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
    };

    // Deep merge function to prevent nested object fallback errors
    const deepMerge = (target: any, source: any) => {
        if (!source) return target;
        const output = { ...target };
        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                output[key] = deepMerge(target[key] || {}, source[key]);
            } else {
                output[key] = source[key];
            }
        });
        return output;
    };

    const data = deepMerge(defaultData, dataOverride);
    const accentHex = `#${(data.themeColor || 'f97316').replace('#', '')}`;
    const t = dict[lang];

    // Carousel auto advance
    useEffect(() => {
        if (!data.slides || data.slides.length <= 1) return;
        const interval = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % data.slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data.slides]);

    // Helpers to render dynamic icons by string name
    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'Shield': return Shield;
            case 'RefreshCw': return RefreshCw;
            case 'Building': return Building;
            case 'FileText': return FileText;
            case 'Award': return Award;
            case 'Globe': return Globe;
            case 'Phone': return Phone;
            case 'Mail': return Mail;
            default: return Info;
        }
    };

    // Responsive font scaling
    const fontSizeClass = 
        fontSizeScale === 'small' ? 'text-sm-scale' : 
        fontSizeScale === 'large' ? 'text-lg-scale' : '';

    return (
        <div 
            className={`portal-wrapper ${highContrast ? 'gigw-high-contrast' : ''} ${fontSizeClass}`}
            style={{ 
                fontFamily: "'Inter', 'Source Sans 3', sans-serif", 
                background: highContrast ? '#000000' : '#ffffff', 
                color: highContrast ? '#ffff00' : '#0f172a', 
                overflowX: 'hidden',
                minHeight: '100vh',
                transition: 'all 0.3s ease'
            }}
        >
            <style>{`
                /* GIGW Font size Scaling Classes */
                .text-sm-scale { transform: scale(0.95); transform-origin: top center; }
                .text-lg-scale { transform: scale(1.05); transform-origin: top center; }
            `}</style>
            {(() => {
                const defaultOrder = ['accessibility', 'branding', 'navbar', 'ticker', 'hero', 'services', 'about', 'schemes', 'impact', 'noticeHelpdesk', 'footer'];
                const sectionOrder = data.layout?.sectionOrder || defaultOrder;
                const PreviewSections: Record<string, React.ReactNode> = {
                    accessibility: data.layout?.showAccessibilityStrip && (
                <motion.div 
                    initial={{ y: -50 }} animate={{ y: 0 }}
                    className="gigw-topbar"
                    style={{ 
                        background: highContrast ? '#000' : '#020617', 
                        color: highContrast ? '#fff' : 'rgba(255,255,255,0.7)', 
                        padding: '0.5rem 2rem', 
                        fontSize: '0.75rem', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        borderBottom: highContrast ? '2px solid #ffff00' : '1px solid rgba(255,255,255,0.05)',
                        zIndex: 100
                    }}
                >
                    <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 600 }}>
                        <a href={data.accessibility?.screenReaderUrl || '#'} style={{ color: highContrast ? '#ffff00' : 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Layout size={12} /> {t.screenReader}
                        </a>
                        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <button 
                                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} 
                                className="a11y-action-btn"
                                style={{ background: highContrast ? '#ffff00' : 'rgba(255,255,255,0.1)', color: highContrast ? '#000' : 'white', border: highContrast ? '1px solid #fff' : '1px solid rgba(255,255,255,0.2)', padding: '2px 8px', cursor: 'pointer', fontWeight: 800, borderRadius: '4px', fontSize: '0.65rem' }}
                            >
                                {lang === 'en' ? 'हिन्दी' : 'English'}
                            </button>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <button onClick={() => setFontSizeScale('small')} className={`a11y-pill ${fontSizeScale === 'small' ? 'active' : ''}`}>A-</button>
                                <button onClick={() => setFontSizeScale('medium')} className={`a11y-pill ${fontSizeScale === 'medium' ? 'active' : ''}`}>A</button>
                                <button onClick={() => setFontSizeScale('large')} className={`a11y-pill ${fontSizeScale === 'large' ? 'active' : ''}`}>A+</button>
                            </div>
                            <button 
                                onClick={() => setHighContrast(!highContrast)} 
                                style={{ 
                                    background: highContrast ? '#ffffff' : '#000000', 
                                    width: '18px', 
                                    height: '18px', 
                                    borderRadius: '50%', 
                                    border: highContrast ? '2px solid #ffff00' : '2px solid #ffffff', 
                                    cursor: 'pointer', 
                                    boxShadow: '0 0 10px rgba(255,255,255,0.2)' 
                                }}
                                title="Toggle High Contrast Mode"
                            ></button>
                        </div>
                    </div>
                    <div style={{ fontWeight: 800, letterSpacing: '0.05em', color: highContrast ? '#ffff00' : 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Globe size={13} style={{ color: highContrast ? '#ffff00' : accentHex }} /> {t.govOfMp}
                    </div>
                </motion.div>
            ),
            branding: data.layout?.showBrandingHeader && (
                <header 
                    style={{ 
                        background: highContrast ? '#000' : 'white', 
                        padding: '1.5rem 2rem', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        position: 'relative', 
                        overflow: 'hidden',
                        borderBottom: highContrast ? '2px solid #ffff00' : 'none'
                    }}
                >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: highContrast ? '#ffff00' : `linear-gradient(90deg, ${accentHex}, #4c1d95)` }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {data.emblemUrl && <img src={data.emblemUrl} alt="National Emblem" style={{ height: '72px', filter: highContrast ? 'brightness(0) invert(1)' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }} />}
                            {data.stateLogoUrl && <img src={data.stateLogoUrl} alt="State Logo" style={{ height: '72px', filter: highContrast ? 'brightness(0) invert(1)' : 'none' }} />}
                        </div>
                        <div style={{ borderLeft: highContrast ? '2px solid #ffff00' : '2.5px solid #f1f5f9', paddingLeft: '2rem' }}>
                            <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 900, color: highContrast ? '#ffff00' : '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                                {lang === 'en' ? data.departmentName : (data.departmentNameHi || data.departmentName)}
                            </h1>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: highContrast ? '#fff' : '#64748b', textTransform: 'uppercase', marginTop: '8px', letterSpacing: '0.1em' }}>
                                <Scale size={14} className="inline mr-2 text-blue-600" /> School Education Department
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {data.leadership?.slice(0, 2).map((l: any, i: number) => (
                            <div key={i} style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 900, color: highContrast ? '#ffff00' : '#0f172a' }}>{l.name}</div>
                                    <div style={{ fontSize: '0.65rem', color: highContrast ? '#fff' : '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{l.title}</div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <img 
                                        src={l.photoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60'} 
                                        alt={l.name} 
                                        style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: highContrast ? '2px solid #ffff00' : `3px solid #fff`, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                                    />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', background: '#22c55e', border: '2px solid #fff', borderRadius: '50%' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </header>
            ),
            navbar: data.layout?.showNavbar && (
                <GIGWNav accentColor={highContrast ? '#ffff00' : accentHex}>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {data.navItems?.map((item: any, i: number) => (
                            <div key={i} className="nav-item-group" style={{ position: 'relative' }}>
                                <a 
                                    href={item.url || '#'} 
                                    style={{ 
                                        color: 'white', 
                                        textDecoration: 'none', 
                                        padding: '1.2rem 1.4rem', 
                                        fontSize: '0.8rem', 
                                        fontWeight: 800, 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.08em', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '6px', 
                                        transition: 'all 0.3s ease' 
                                    }}
                                    className="nav-link"
                                >
                                    {item.label} 
                                    {item.dropdowns && item.dropdowns.length > 0 && <ChevronDown size={14} className="opacity-50" />}
                                </a>
                                {item.dropdowns && item.dropdowns.length > 0 && (
                                    <div className="nav-dropdown-menu">
                                        {item.dropdowns.map((sub: string, idx: number) => (
                                            <a key={idx} href="#" className="nav-dropdown-item">{sub}</a>
                                        ))}
                                    </div>
                                )}
                                <div className="nav-underline" style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '3px', background: highContrast ? '#ffff00' : 'white', opacity: 0, transition: 'all 0.3s ease' }}></div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: highContrast ? '#ffff00' : '#4ade80', fontSize: '0.7rem', fontWeight: 900 }}>
                            <span className="pulse-dot"></span> {t.secureAccess}
                        </div>
                        <button 
                            style={{ 
                                background: highContrast ? '#ffff00' : '#fff', 
                                color: '#4c1d95', 
                                border: highContrast ? '2px solid #000' : 'none', 
                                padding: '0.7rem 1.8rem', 
                                borderRadius: '100px', 
                                fontWeight: 900, 
                                fontSize: '0.75rem', 
                                cursor: 'pointer', 
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)', 
                                transition: 'all 0.3s ease' 
                            }} 
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} 
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {t.portalLogin}
                        </button>
                    </div>
                </GIGWNav>
            ),
            ticker: data.layout?.showNewsTicker && (
                <div style={{ background: highContrast ? '#000' : '#fef2f2', borderBottom: highContrast ? '2px solid #ffff00' : '1px solid #fee2e2', padding: '0.7rem 0', display: 'flex', overflow: 'hidden', boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ background: highContrast ? '#ffff00' : accentHex, color: highContrast ? '#000' : 'white', padding: '0 1.5rem', fontWeight: 900, fontSize: '0.75rem', zIndex: 10, display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <Zap size={14} className="mr-2 fill-current" /> {data.tickerLabel?.toUpperCase() || t.latestNews}
                        <div style={{ position: 'absolute', right: '-10px', top: 0, bottom: 0, width: '20px', background: highContrast ? '#ffff00' : accentHex, transform: 'skewX(-15deg)' }}></div>
                    </div>
                    <div style={{ flex: 1, whiteSpace: 'nowrap' }}>
                        <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', fontSize: '0.9rem', fontWeight: 700, color: highContrast ? '#ffff00' : '#991b1b' }}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={{ margin: '0 3rem' }}>◆ {data.flashAlert}</span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            ),
            hero: data.layout?.showHero && data.slides && data.slides.length > 0 && (
                <section style={{ position: 'relative', height: '620px', background: '#020617', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeSlide}
                            initial={{ opacity: 0, scale: 1.05 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                zIndex: 0,
                                background: `linear-gradient(rgba(0,0,0,0.35), rgba(2,6,23,0.95)), url(${data.slides[activeSlide]?.bgImage || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600'}) center/cover` 
                            }} 
                        />
                    </AnimatePresence>
                    <div style={{ position: 'relative', height: '100%', maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', padding: '0 2rem', zIndex: 10 }}>
                        <div style={{ maxWidth: '800px' }}>
                            <motion.div 
                                initial={{ x: -30, opacity: 0 }} 
                                animate={{ x: 0, opacity: 1 }} 
                                transition={{ delay: 0.2 }} 
                                style={{ 
                                    background: highContrast ? 'transparent' : `${accentHex}20`, 
                                    border: highContrast ? '2px solid #ffff00' : `1.5px solid ${accentHex}`, 
                                    color: highContrast ? '#ffff00' : '#38bdf8', 
                                    padding: '6px 16px', 
                                    borderRadius: '100px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 900, 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '10px', 
                                    marginBottom: '2rem', 
                                    letterSpacing: '0.15em' 
                                }}
                            >
                                <Award size={16} /> ADVANCING DIGITAL GOVERNANCE
                            </motion.div>
                            
                            <h2 style={{ color: 'white', fontSize: '4.2rem', fontWeight: 900, lineHeight: 1.1, margin: '0 0 1.5rem 0', letterSpacing: '-0.04em' }}>
                                {data.slides[activeSlide]?.title}
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.3rem', marginBottom: '3rem', lineHeight: 1.6, fontWeight: 500 }}>
                                {data.slides[activeSlide]?.subtitle}
                            </p>
                            
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <button 
                                    style={{ 
                                        background: highContrast ? '#ffff00' : accentHex, 
                                        color: highContrast ? '#000' : '#fff', 
                                        border: 'none', 
                                        padding: '1.2rem 3rem', 
                                        fontSize: '1.1rem', 
                                        fontWeight: 900, 
                                        borderRadius: '8px', 
                                        cursor: 'pointer', 
                                        boxShadow: highContrast ? 'none' : `0 20px 40px ${accentHex}40`, 
                                        transition: 'all 0.3s ease' 
                                    }} 
                                    className="btn-hero-primary"
                                >
                                    {data.slides[activeSlide]?.btnText || t.applyNow} <ArrowRight size={20} className="inline ml-2" />
                                </button>
                                <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)', padding: '1.2rem 2.5rem', fontSize: '1.1rem', fontWeight: 800, borderRadius: '8px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                                    Portal Guidelines
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    {data.slides.length > 1 && (
                        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', display: 'flex', gap: '8px', zIndex: 20 }}>
                            {data.slides.map((_: any, idx: number) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setActiveSlide(idx)}
                                    style={{ 
                                        width: idx === activeSlide ? '32px' : '10px', 
                                        height: '10px', 
                                        borderRadius: '50px', 
                                        background: idx === activeSlide ? (highContrast ? '#ffff00' : accentHex) : 'rgba(255,255,255,0.3)', 
                                        border: 'none', 
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                ></button>
                            ))}
                        </div>
                    )}
                    
                    {/* Visual Flourish: Glassmorphic Active Badge */}
                    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: highContrast ? '#000' : 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', padding: '1rem 1.5rem', borderRadius: '12px', border: highContrast ? '2px solid #ffff00' : '1.5px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', gap: '0.8rem', zIndex: 20 }}>
                        <div style={{ background: '#22c55e', width: '10px', height: '10px', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>256 Active Clusters Online</div>
                    </div>
                </section>
            ),
            services: data.layout?.showServices && data.services && data.services.length > 0 && (
                <section style={{ position: 'relative', zIndex: 30, maxWidth: '1280px', margin: '-5rem auto 5rem', padding: '0 2rem' }}>
                    <div className="services-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {data.services?.slice(0, 4).map((s: any, i: number) => {
                            const IconComponent = getIconComponent(s.iconName || 'Shield');
                            return (
                                <motion.div 
                                    key={i} whileHover={{ y: -12, scale: 1.01 }} 
                                    style={{ 
                                        background: highContrast ? '#000' : 'white', 
                                        padding: '2.5rem 2rem', 
                                        borderRadius: '16px', 
                                        boxShadow: highContrast ? 'none' : '0 20px 40px -10px rgba(0,0,0,0.12)', 
                                        border: highContrast ? '2px solid #ffff00' : '1px solid #f1f5f9', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        gap: '1.2rem', 
                                        textAlign: 'center', 
                                        position: 'relative', 
                                        overflow: 'hidden' 
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: i % 2 === 0 ? (highContrast ? '#ffff00' : accentHex) : '#4c1d95' }}></div>
                                    <div style={{ color: highContrast ? '#ffff00' : accentHex, background: highContrast ? 'transparent' : `${accentHex}10`, width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: highContrast ? '2px solid #ffff00' : 'none' }}>
                                        <IconComponent size={32} strokeWidth={2.5} />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: highContrast ? '#ffff00' : '#0f172a', letterSpacing: '-0.02em' }}>{s.title}</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: highContrast ? '#fff' : '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
                                    <a href={s.link || '#'} style={{ color: highContrast ? '#ffff00' : accentHex, textDecoration: 'none', fontWeight: 900, fontSize: '0.85rem', marginTop: 'auto', borderTop: highContrast ? '1px solid #ffff00' : '1px solid #f1f5f9', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} className="service-link-pro">
                                        LAUNCH MODULE <ExternalLink size={14} />
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            ),
            about: data.layout?.showAbout && (
                <section style={{ maxWidth: '1280px', margin: '8rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '6rem', alignItems: 'center' }}>
                    <FadeInSection>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-1.5rem', left: '-1.5rem', width: '160px', height: '160px', background: highContrast ? 'transparent' : `${accentHex}10`, border: highContrast ? '2px dashed #ffff00' : 'none', borderRadius: '32px', zIndex: -1 }}></div>
                            <img src={data.aboutImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'} alt="Department Building" style={{ width: '100%', borderRadius: '20px', boxShadow: highContrast ? 'none' : '0 30px 60px -15px rgba(0,0,0,0.15)', border: highContrast ? '2px solid #ffff00' : 'none' }} />
                            {data.aboutBadgeNumber && (
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: '-2rem', 
                                        right: '-2rem', 
                                        background: '#4c1d95', 
                                        color: 'white', 
                                        padding: '2.5rem 2rem', 
                                        borderRadius: '20px', 
                                        textAlign: 'center', 
                                        boxShadow: highContrast ? 'none' : '0 20px 40px -10px rgba(76,29,149,0.4)', 
                                        border: highContrast ? '2px solid #ffff00' : '1px solid rgba(255,255,255,0.1)' 
                                    }}
                                >
                                    <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, color: highContrast ? '#ffff00' : 'white' }}>{data.aboutBadgeNumber}</div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.4rem', opacity: 0.8 }}>{data.aboutBadgeText || 'Years'}</div>
                                </motion.div>
                            )}
                        </div>
                    </FadeInSection>
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: highContrast ? '#ffff00' : accentHex, fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                            <div style={{ width: '30px', height: '3px', background: highContrast ? '#ffff00' : accentHex }}></div> {t.overview}
                        </div>
                        <h2 style={{ fontSize: '3.2rem', fontWeight: 900, margin: '0 0 2rem 0', lineHeight: 1.1, letterSpacing: '-0.03em', color: highContrast ? '#ffff00' : '#0f172a' }}>
                            {data.aboutTitle}
                        </h2>
                        <p style={{ color: highContrast ? '#fff' : '#475569', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '3rem' }}>
                            {data.aboutText}
                        </p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 900, color: highContrast ? '#ffff00' : '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.quickLinks}</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {data.quickLinks?.map((l: any, i: number) => (
                                    <motion.a 
                                        key={i} href={l.url || '#'} 
                                        whileHover={{ x: 8, background: highContrast ? '#000' : '#fff', borderLeftColor: highContrast ? '#ffff00' : accentHex }}
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.8rem', 
                                            textDecoration: 'none', 
                                            color: highContrast ? '#ffff00' : '#0f172a', 
                                            fontWeight: 800, 
                                            fontSize: '0.9rem', 
                                            padding: '1.2rem', 
                                            border: highContrast ? '2px solid #ffff00' : '1px solid #f1f5f9', 
                                            borderRadius: '10px', 
                                            background: highContrast ? '#000' : '#f8fafc', 
                                            borderLeft: highContrast ? '5px solid #ffff00' : `5px solid #e2e8f0`, 
                                            transition: 'all 0.3s ease' 
                                        }}
                                    >
                                        <div style={{ color: highContrast ? '#ffff00' : accentHex }}><Info size={16} /></div> {l.label}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ),
            schemes: data.layout?.showSchemes && (
                <section style={{ background: highContrast ? '#000' : '#f8fafc', padding: '8rem 2rem', position: 'relative', borderTop: highContrast ? '2px solid #ffff00' : 'none' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                            <h2 style={{ fontSize: '3.2rem', fontWeight: 900, margin: 0, letterSpacing: '-0.03em', color: highContrast ? '#ffff00' : '#0f172a' }}>
                                {data.schemesTitle}
                            </h2>
                            <p style={{ color: highContrast ? '#fff' : '#64748b', marginTop: '1.2rem', fontSize: '1.15rem', maxWidth: '750px', margin: '1.2rem auto 0' }}>
                                {data.schemesSub}
                            </p>
                            
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3.5rem', background: highContrast ? '#000' : '#e2e8f0', border: highContrast ? '2px solid #ffff00' : 'none', padding: '0.5rem', borderRadius: '100px', width: 'fit-content', margin: '3.5rem auto 0' }}>
                                {['All', 'Central', 'State'].map(tab => (
                                    <button 
                                        key={tab} onClick={() => setActiveSchemeTab(tab as any)} 
                                        style={{ 
                                            background: activeSchemeTab === tab ? (highContrast ? '#ffff00' : 'white') : 'transparent', 
                                            color: activeSchemeTab === tab ? '#020617' : (highContrast ? '#fff' : '#64748b'), 
                                            border: 'none', 
                                            padding: '0.8rem 2.5rem', 
                                            borderRadius: '100px', 
                                            fontWeight: 900, 
                                            cursor: 'pointer', 
                                            fontSize: '0.85rem',
                                            boxShadow: activeSchemeTab === tab && !highContrast ? '0 10px 15px -3px rgba(0,0,0,0.05)' : 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {tab === 'All' ? t.allSchemes : tab === 'Central' ? t.centralSchemes : t.stateSchemes}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                            {data.schemes?.filter((s: any) => activeSchemeTab === 'All' || s.type === activeSchemeTab).map((s: any, i: number) => (
                                <motion.div 
                                    key={i} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -10 }} 
                                    style={{ 
                                        background: highContrast ? '#000' : 'white', 
                                        padding: '3rem 2.5rem', 
                                        borderRadius: '20px', 
                                        boxShadow: highContrast ? 'none' : '0 15px 30px -5px rgba(0,0,0,0.02)', 
                                        border: highContrast ? '2px solid #ffff00' : '1px solid #f1f5f9', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        position: 'relative' 
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: '1.8rem', right: '1.8rem', fontSize: '0.7rem', fontWeight: 900, background: s.type === 'Central' ? '#eff6ff' : '#fef2f2', color: s.type === 'Central' ? '#2563eb' : '#ef4444', padding: '4px 12px', borderRadius: '100px', border: `1px solid ${s.type === 'Central' ? '#dbeafe' : '#fee2e2'}` }}>
                                        {s.type?.toUpperCase()}
                                    </div>
                                    <div style={{ background: highContrast ? '#000' : '#f8fafc', border: highContrast ? '2px solid #ffff00' : 'none', width: '56px', height: '56px', borderRadius: '14px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {s.logoUrl ? <img src={s.logoUrl} style={{ width: '32px', height: '32px' }} /> : <Award size={28} style={{ color: highContrast ? '#ffff00' : accentHex }} />}
                                    </div>
                                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.45rem', fontWeight: 900, color: highContrast ? '#ffff00' : '#0f172a', letterSpacing: '-0.02em' }}>{s.name}</h3>
                                    <p style={{ margin: '0 0 2.5rem 0', color: highContrast ? '#fff' : '#475569', fontSize: '0.95rem', lineHeight: 1.6, height: '4.8rem', overflow: 'hidden' }}>{s.desc}</p>
                                    <a 
                                        href={s.link || '#'} 
                                        style={{ 
                                            background: highContrast ? '#ffff00' : '#4c1d95', 
                                            color: highContrast ? '#000' : 'white', 
                                            border: 'none', 
                                            padding: '1rem', 
                                            borderRadius: '8px', 
                                            fontWeight: 900, 
                                            fontSize: '0.9rem', 
                                            cursor: 'pointer', 
                                            textDecoration: 'none',
                                            textAlign: 'center',
                                            width: '100%', 
                                            boxShadow: highContrast ? 'none' : '0 10px 15px -3px rgba(76,29,149,0.2)', 
                                            transition: 'all 0.3s ease' 
                                        }}
                                        className="scheme-apply-btn"
                                    >
                                        {t.applyNow}
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ),
            impact: data.layout?.showImpact && (
                <section style={{ padding: '8rem 2rem', background: highContrast ? '#000' : '#020617', color: 'white', position: 'relative', overflow: 'hidden', borderTop: highContrast ? '2px solid #ffff00' : 'none' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                            <div style={{ color: highContrast ? '#ffff00' : '#38bdf8', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>{data.impactSub || t.dataTransparency}</div>
                            <h2 style={{ fontSize: '3.6rem', fontWeight: 900, margin: 0, letterSpacing: '-0.04em', color: highContrast ? '#ffff00' : '#fff' }}>
                                {data.impactTitle}
                            </h2>
                        </div>
                        <div className="impact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {data.impactStats?.slice(0, 2).map((s: any, idx: number) => (
                                    <motion.div 
                                        key={idx} whileHover={{ scale: 1.03 }} 
                                        style={{ 
                                            background: 'rgba(255,255,255,0.03)', 
                                            padding: '2.5rem 2rem', 
                                            borderRadius: '24px', 
                                            border: highContrast ? '2px solid #ffff00' : '1.5px solid rgba(255,255,255,0.08)', 
                                            borderLeft: highContrast ? '2px solid #ffff00' : `6px solid ${s.color || accentHex}` 
                                        }}
                                    >
                                        <div style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em', color: highContrast ? '#ffff00' : '#fff' }}>
                                            <AnimatedCounter value={s.value} />{s.suffix}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.6rem' }}>{s.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                {!highContrast && <div style={{ position: 'absolute', width: '450px', height: '450px', border: '1.5px dashed rgba(56,189,248,0.08)', borderRadius: '50%', animation: 'spin 120s linear infinite' }} />}
                                <img 
                                    src={data.mapSvgUrl || 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Madhya_Pradesh_districts.svg'} 
                                    alt="MP Map" 
                                    style={{ 
                                        height: '420px', 
                                        filter: highContrast ? 'invert(1) opacity(0.8)' : 'invert(1) opacity(0.35) drop-shadow(0 0 35px rgba(56,189,248,0.25))', 
                                        position: 'relative', 
                                        zIndex: 5 
                                    }} 
                                />
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {data.impactStats?.slice(2, 4).map((s: any, idx: number) => (
                                    <motion.div 
                                        key={idx} whileHover={{ scale: 1.03 }} 
                                        style={{ 
                                            background: 'rgba(255,255,255,0.03)', 
                                            padding: '2.5rem 2rem', 
                                            borderRadius: '24px', 
                                            border: highContrast ? '2px solid #ffff00' : '1.5px solid rgba(255,255,255,0.08)', 
                                            borderLeft: highContrast ? '2px solid #ffff00' : `6px solid ${s.color || accentHex}` 
                                        }}
                                    >
                                        <div style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em', color: highContrast ? '#ffff00' : '#fff' }}>
                                            <AnimatedCounter value={s.value} />{s.suffix}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.6rem' }}>{s.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ),
            noticeHelpdesk: data.layout?.showNoticeHelpdesk && (
                <section style={{ maxWidth: '1280px', margin: '10rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1.40fr 1fr', gap: '5rem', borderTop: highContrast ? '2px solid #ffff00' : 'none' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
                            <div>
                                <div style={{ color: highContrast ? '#ffff00' : accentHex, fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>{t.bulletinBoard}</div>
                                <h2 style={{ fontSize: '2.6rem', fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: '1rem', color: highContrast ? '#ffff00' : '#0f172a' }}>
                                    <Bell size={32} style={{ color: highContrast ? '#ffff00' : accentHex }} className="pulse-slow" /> {data.noticeTitle || t.recentPublications}
                                </h2>
                            </div>
                            <button className="btn-outline-pro" style={{ border: highContrast ? '2px solid #ffff00' : '2px solid #f1f5f9', color: highContrast ? '#ffff00' : '#0f172a' }}>{t.viewArchive}</button>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {data.notices?.map((n: any, i: number) => (
                                <motion.div 
                                    key={i} whileHover={{ x: 10, background: highContrast ? '#000' : '#fbfcfd', borderColor: highContrast ? '#ffff00' : accentHex }} 
                                    style={{ 
                                        padding: '2rem', 
                                        background: highContrast ? '#000' : 'white', 
                                        border: highContrast ? '2px solid #ffff00' : '1.5px solid #f1f5f9', 
                                        borderRadius: '14px', 
                                        display: 'flex', 
                                        gap: '2rem', 
                                        alignItems: 'center', 
                                        transition: 'all 0.3s ease' 
                                    }}
                                >
                                    <div style={{ textAlign: 'center', minWidth: '80px', borderRight: highContrast ? '2px solid #ffff00' : '2px solid #f1f5f9', paddingRight: '2rem' }}>
                                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: highContrast ? '#ffff00' : '#4c1d95', lineHeight: 1 }}>{n.date?.split(' ')[0]}</div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: highContrast ? '#fff' : '#94a3b8', marginTop: '4px' }}>{n.date?.split(' ')[1]}</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 900, background: highContrast ? '#000' : '#f1f5f9', border: highContrast ? '1px solid #ffff00' : '1px solid #ddd6fe', padding: '3px 10px', borderRadius: '100px', color: highContrast ? '#ffff00' : '#4c1d95' }}>{n.tag}</span>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: highContrast ? '#fff' : '#94a3b8', fontFamily: 'monospace' }}>#{n.id}</span>
                                        </div>
                                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: highContrast ? '#ffff00' : '#0f172a', lineHeight: 1.3 }}>{n.title}</h4>
                                    </div>
                                    <a href={n.downloadUrl || '#'} className="download-icon-box" style={{ background: highContrast ? '#000' : '#f8fafc', border: highContrast ? '1px solid #ffff00' : 'none', padding: '0.8rem', borderRadius: '10px', color: highContrast ? '#ffff00' : '#94a3b8' }}>
                                        <Download size={20} />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                        style={{ 
                            background: highContrast ? '#000' : '#4c1d95', 
                            color: 'white', 
                            padding: '4rem 3rem', 
                            borderRadius: '24px', 
                            boxShadow: highContrast ? 'none' : '0 30px 60px -10px rgba(76,29,149,0.4)', 
                            border: highContrast ? '2px solid #ffff00' : '1px solid rgba(255,255,255,0.1)', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '2.5rem', 
                            position: 'relative', 
                            overflow: 'hidden' 
                        }}
                    >
                        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', background: 'white', opacity: 0.03, borderRadius: '50%' }}></div>
                        <div style={{ background: highContrast ? '#000' : 'rgba(255,255,255,0.1)', border: highContrast ? '2px solid #ffff00' : '1.5px solid rgba(255,255,255,0.15)', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={40} style={{ color: highContrast ? '#ffff00' : '#a78bfa' }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em', color: highContrast ? '#ffff00' : '#fff' }}>
                                {data.helpdeskTitle || t.needAssistance}
                            </h3>
                            <p style={{ opacity: 0.85, fontSize: '1.1rem', lineHeight: 1.6, marginTop: '1.2rem', color: highContrast ? '#ffff00' : '#fff' }}>
                                {data.helpdeskSub}
                            </p>
                        </div>
                        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: highContrast ? '2px solid #ffff00' : '1.5px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                                <div style={{ background: highContrast ? '#ffff00' : '#a78bfa', color: '#4c1d95', padding: '0.8rem', borderRadius: '50%', display: 'flex' }}>
                                    <Phone size={24} style={{ color: '#000' }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.15em', color: highContrast ? '#ffff00' : '#fff' }}>{t.tollFree}</div>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '3px', color: highContrast ? '#ffff00' : '#fff' }}>{data.helpdeskPhone}</div>
                                </div>
                            </div>
                            <a 
                                href={data.helpdeskBtnUrl || '#'} 
                                style={{ 
                                    background: highContrast ? '#ffff00' : 'white', 
                                    color: '#4c1d95', 
                                    border: highContrast ? '2px solid #000' : 'none', 
                                    padding: '1.2rem', 
                                    borderRadius: '12px', 
                                    fontWeight: 950, 
                                    fontSize: '1rem', 
                                    textAlign: 'center', 
                                    textDecoration: 'none', 
                                    cursor: 'pointer', 
                                    transition: 'all 0.3s ease' 
                                }}
                                className="helpdesk-btn-pro"
                            >
                                {data.helpdeskBtnText || t.lodgeComplaint}
                            </a>
                        </div>
                    </motion.div>
                </section>
            ),
            footer: (
                <footer style={{ background: highContrast ? '#000' : '#020617', color: highContrast ? '#fff' : 'rgba(255,255,255,0.4)', padding: '8rem 2rem 4rem', borderTop: highContrast ? '3px solid #ffff00' : 'none' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div className="footer-cols-grid" style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: '5rem', marginBottom: '6rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                {data.emblemUrl && <img src={data.emblemUrl} alt="Emblem" style={{ height: '70px', filter: 'brightness(0) invert(1) opacity(0.5)' }} />}
                                <div style={{ borderLeft: highContrast ? '2px solid #ffff00' : '1.5px solid rgba(255,255,255,0.1)', paddingLeft: '1.2rem' }}>
                                    <div style={{ color: 'white', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Bharat CMS Suite</div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', marginTop: '4px', opacity: 0.5 }}>Sovereign Infrastructure</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '420px' }}>The MPSOS platform represents a paradigm shift in state-level educational governance. Engineered by NIC for the 2026 Digital Bharat mission, ensuring absolute transparency and speed in public service delivery.</p>
                        </div>
                        
                        <div>
                            <h4 className="footer-heading" style={{ color: highContrast ? '#ffff00' : '#fff' }}>Department Contacts</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem', color: highContrast ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}><MapPin size={18} style={{ color: highContrast ? '#ffff00' : accentHex }} className="flex-shrink-0" /> {data.footer?.address}</div>
                                <div style={{ display: 'flex', gap: '1rem' }}><Mail size={18} style={{ color: highContrast ? '#ffff00' : accentHex }} /> {data.footer?.email}</div>
                                <div style={{ display: 'flex', gap: '1rem' }}><Phone size={18} style={{ color: highContrast ? '#ffff00' : accentHex }} /> {data.footer?.phone}</div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="footer-heading" style={{ color: highContrast ? '#ffff00' : '#fff' }}>Important Links</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
                                {data.footer?.importantLinks?.map((link: any, idx: number) => (
                                    <li key={idx}><a href={link.url || '#'} className="footer-link" style={{ color: highContrast ? '#ffff00' : 'rgba(255,255,255,0.6)' }}>◆ {link.label}</a></li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="footer-heading" style={{ color: highContrast ? '#ffff00' : '#fff' }}>Visitor Pulse</h4>
                            <div style={{ background: highContrast ? '#000' : '#f97316', color: 'white', padding: '1.8rem 1.2rem', borderRadius: '12px', textAlign: 'center', boxShadow: highContrast ? 'none' : '0 15px 30px rgba(249,115,22,0.3)', border: highContrast ? '2px solid #ffff00' : 'none', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.9, marginBottom: '0.8rem' }}>{t.visitorCounter}</div>
                                <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '6px' }}>
                                    {String(data.footer?.visitorCounterBase || 1245678).padStart(8, '0')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Policies row */}
                    <div style={{ borderTop: highContrast ? '2px solid #ffff00' : '1px solid rgba(255,255,255,0.06)', borderBottom: highContrast ? '2px solid #ffff00' : '1px solid rgba(255,255,255,0.06)', padding: '2rem 0', margin: '3rem 0', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', fontSize: '0.85rem' }}>
                        {data.footer?.policies?.map((policy: any, idx: number) => (
                            <a key={idx} href={policy.url || '#'} style={{ color: highContrast ? '#ffff00' : 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }} className="hover:text-white">
                                {policy.label}
                            </a>
                        ))}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                        <div style={{ opacity: 0.6 }}>{data.footer?.copyrightText}</div>
                        <div style={{ display: 'flex', gap: '2rem', opacity: 0.7 }}>
                            <a href="#" style={{ color: highContrast ? '#ffff00' : '#fff' }}><GlobeIcon size={20} /></a>
                            <a href="#" style={{ color: highContrast ? '#ffff00' : '#fff' }}><MessageCircle size={20} /></a>
                            <a href="#" style={{ color: highContrast ? '#ffff00' : '#fff' }}><Video size={20} /></a>
                        </div>
                    </div>
                </div>
                </footer>
            )
        };

        return (
            <>
                {sectionOrder.map((key: string) => (
                    <React.Fragment key={key}>
                        {PreviewSections[key]}
                    </React.Fragment>
                ))}
            </>
        );
    })()}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                
                .nav-scrolled { padding: 0.6rem 2rem !important; backdrop-filter: blur(16px) !important; background: rgba(30, 16, 80, 0.95) !important; }
                
                .a11y-pill { background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15); color: white; cursor: pointer; padding: 2px 10px; border-radius: 6px; font-weight: 800; font-size: 0.65rem; transition: all 0.2s ease; }
                .a11y-pill:hover { background: rgba(255,255,255,0.25); }
                .a11y-pill.active { background: white; color: #020617; }
                
                .nav-link:hover { background: rgba(255,255,255,0.08); border-radius: 8px; }
                .nav-item-group:hover .nav-underline { opacity: 1 !important; bottom: 8px !important; }
                
                /* Mock Nav Dropdown */
                .nav-dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background: #2e1065; border-top: 3px solid ${accentHex}; min-width: 220px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); border-radius: 0 0 10px 10px; padding: 0.5rem 0; z-index: 100; }
                .nav-item-group:hover .nav-dropdown-menu { display: block; }
                .nav-dropdown-item { display: block; color: rgba(255,255,255,0.8); text-decoration: none; padding: 0.8rem 1.5rem; font-size: 0.8rem; font-weight: 700; transition: all 0.2s; }
                .nav-dropdown-item:hover { background: rgba(255,255,255,0.08); color: white; padding-left: 1.8rem; }

                .pulse-dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
                @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); } }
                
                .btn-hero-primary:hover { transform: translateY(-4px); background: #fff !important; color: ${accentHex} !important; }
                
                .service-link-pro:hover { gap: 10px !important; color: #4c1d95 !important; }
                
                .footer-heading { color: white; font-weight: 900; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 2.5rem; position: relative; }
                .footer-heading::after { content: ''; position: absolute; bottom: -0.8rem; left: 0; width: 40px; height: 3px; background: ${accentHex}; }
                
                .footer-link { color: inherit; text-decoration: none; transition: all 0.2s ease; }
                .footer-link:hover { color: white !important; padding-left: 8px; }
                
                .pulse-slow { animation: pulseSlow 3s infinite ease-in-out; }
                @keyframes pulseSlow { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
                
                .btn-outline-pro { background: transparent; border: 2.5px solid #f1f5f9; color: #0f172a; padding: 0.8rem 2.2rem; border-radius: 8px; font-weight: 900; font-size: 0.85rem; cursor: pointer; transition: all 0.3s ease; }
                .btn-outline-pro:hover { border-color: ${accentHex}; color: ${accentHex}; }
                
                .helpdesk-btn-pro:hover { transform: translateY(-3px); box-shadow: 0 15px 30px -5px rgba(0,0,0,0.15); }
                
                .scheme-apply-btn:hover { background: #5b21b6 !important; transform: translateY(-2px); }
                
                /* GIGW Font size Scaling Classes (Moved to parent div style block to avoid tag overrides) */
                /* GIGW High Contrast Mode Overrides */
                .gigw-high-contrast { background-color: #000000 !important; color: #ffff00 !important; }
                .gigw-high-contrast header, 
                .gigw-high-contrast section, 
                .gigw-high-contrast footer,
                .gigw-high-contrast nav,
                .gigw-high-contrast div { background: #000000 !important; color: #ffff00 !important; border-color: #ffff00 !important; box-shadow: none !important; }
                .gigw-high-contrast h1, 
                .gigw-high-contrast h2, 
                .gigw-high-contrast h3, 
                .gigw-high-contrast h4,
                .gigw-high-contrast a,
                .gigw-high-contrast span,
                .gigw-high-contrast p,
                .gigw-high-contrast li { color: #ffff00 !important; }
                .gigw-high-contrast button { background: #ffff00 !important; color: #000000 !important; border: 2px solid #ffffff !important; }
                .gigw-high-contrast button:hover { background: #ffffff !important; color: #000000 !important; }
                .gigw-high-contrast svg { color: #ffff00 !important; }
                .gigw-high-contrast img { border-color: #ffff00 !important; }
                .gigw-high-contrast .a11y-pill.active { background: #ffff00 !important; color: #000000 !important; border-color: #ffffff !important; }
                
                button:active { transform: scale(0.97) !important; }
                
                @media (max-width: 1024px) {
                    .services-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .impact-grid { grid-template-columns: 1fr !important; }
                    .footer-cols-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                    section { padding: 4rem 1rem !important; }
                }
            `}</style>
        </div>
    );
};
