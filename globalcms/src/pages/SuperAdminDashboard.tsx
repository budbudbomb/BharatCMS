import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch } from '../services/api';
import { 
    Shield, Globe, Server, Activity, TrendingUp, RefreshCw, 
    ExternalLink, LogOut, Terminal, Layers, Database, Cpu
} from 'lucide-react';

export const SuperAdminDashboard = () => {
    const [tenants, setTenants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTenant, setSelectedTenant] = useState<any | null>(null);
    const [isInspectorOpen, setIsInspectorOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error(e);
            }
        }
        fetchTenants();
    }, []);

    const fetchTenants = async () => {
        setLoading(true);
        try {
            const data = await apiFetch('/tenant/all');
            setTenants(data);
        } catch (e) {
            console.error("Failed to fetch tenants", e);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const handleInspectTenant = (tenant: any) => {
        setSelectedTenant(tenant);
        setIsInspectorOpen(true);
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className="flex gap-2" style={{ display: 'flex', gap: '8px' }}>
                <button 
                    onClick={() => {
                        const url = `${window.location.protocol}//${rowData.tenantId}.localhost:5173`;
                        window.open(url, '_blank');
                    }}
                    className="console-action-btn flex align-items-center gap-1 cursor-pointer"
                    style={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.2)', background: 'rgba(56, 189, 248, 0.04)' }}
                    title="Launch Subdomain Portal"
                >
                    <ExternalLink size={13} />
                    <span>Live Portal</span>
                </button>
                <button 
                    onClick={() => handleInspectTenant(rowData)}
                    className="console-action-btn flex align-items-center gap-1 cursor-pointer"
                    style={{ color: '#c084fc', borderColor: 'rgba(192, 132, 252, 0.2)', background: 'rgba(192, 132, 252, 0.04)' }}
                    title="Inspect Tenant Context & Data"
                >
                    <Terminal size={13} />
                    <span>Schema Key</span>
                </button>
            </div>
        );
    };

    const statusBodyTemplate = () => {
        return (
            <span className="live-status-pill">
                <span className="live-status-dot"></span>
                ACTIVE
            </span>
        );
    };

    const slugBodyTemplate = (rowData: any) => {
        return (
            <span className="font-mono text-xs slug-badge">
                {rowData.tenantId}
            </span>
        );
    };

    return (
        <div className="workspace-container">
            {/* SuperAdmin Left Command Sidebar */}
            <div className="app-sidebar">
                <div className="app-sidebar-header flex flex-column gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex align-items-center gap-3">
                        <div className="superadmin-logo-glow">
                            <Shield size={18} className="text-white" />
                        </div>
                        <div>
                            <h2 className="app-sidebar-title" style={{ fontSize: '17px' }}>NIC Control</h2>
                            <span className="text-xxs text-gray-500 font-mono tracking-widest uppercase" style={{ fontSize: '8px', color: '#64748b' }}>Sovereign Node v2.6</span>
                        </div>
                    </div>
                </div>
                
                <div className="app-sidebar-menu">
                    <button className="app-sidebar-item active">
                        <Layers size={18} />
                        <span>Tenant Clusters</span>
                    </button>
                    
                    <button className="app-sidebar-item" onClick={() => window.open('/', '_blank')}>
                        <Globe size={18} />
                        <span>Public Home</span>
                    </button>
                    
                    <button className="app-sidebar-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>
                        <Database size={18} />
                        <span>SQL Master Vault</span>
                    </button>

                    <button className="app-sidebar-item" style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>
                        <Activity size={18} />
                        <span>Cluster Logs</span>
                    </button>
                </div>

                <div className="app-sidebar-footer">
                    <div className="profile-menu-container" style={{ width: '100%' }}>
                        <div className="profile-btn flex align-items-center justify-content-between" style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="flex align-items-center gap-2">
                                <div className="profile-avatar" style={{ margin: 0, width: '30px', height: '30px', fontSize: '12px' }}>
                                    SA
                                </div>
                                <div className="profile-info">
                                    <span className="profile-name" style={{ fontSize: '13px' }}>{user?.username || 'SuperAdmin'}</span>
                                    <span className="profile-role" style={{ fontSize: '9px', color: '#c084fc' }}>Master Operator</span>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="logout-trigger-btn cursor-pointer"
                                title="Secure Logout Account"
                                style={{ background: 'transparent', border: 'none', color: '#f87171', display: 'flex', padding: '4px' }}
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Command Workspace */}
            <div className="main-content">
                <div className="canvas-header flex align-items-center justify-content-between" style={{ background: '#080c14', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                        <h1 className="canvas-title" style={{ color: 'white' }}>Sovereign Tenant Oversight</h1>
                        <span className="canvas-subtitle" style={{ color: '#64748b' }}>NIC Multi-tenant isolated databases & routing matrices</span>
                    </div>
                    <button 
                        onClick={fetchTenants} 
                        className="refresh-btn flex align-items-center justify-content-center cursor-pointer"
                        title="Reload active registries"
                    >
                        <RefreshCw size={14} className={loading ? 'spin-animation' : ''} />
                    </button>
                </div>

                <div className="canvas-body">
                    {/* Staggered Entrance Metric Cards */}
                    <div className="metrics-grid">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="metric-card-console"
                        >
                            <div className="metric-icon-console" style={{ background: 'rgba(56, 189, 248, 0.08)', color: '#38bdf8' }}>
                                <Server size={20} />
                            </div>
                            <div className="metric-info">
                                <span className="metric-val" style={{ color: 'white' }}>{tenants.length}</span>
                                <span className="metric-lbl">Active DB Schemas</span>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="metric-card-console"
                        >
                            <div className="metric-icon-console" style={{ background: 'rgba(192, 132, 252, 0.08)', color: '#c084fc' }}>
                                <TrendingUp size={20} />
                            </div>
                            <div className="metric-info">
                                <span className="metric-val" style={{ color: 'white' }}>{tenants.length * 342 + 109}</span>
                                <span className="metric-lbl">Aggregated Hits (24h)</span>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="metric-card-console"
                        >
                            <div className="metric-icon-console" style={{ background: 'rgba(74, 222, 128, 0.08)', color: '#4ade80' }}>
                                <Activity size={20} />
                            </div>
                            <div className="metric-info">
                                <span className="metric-val" style={{ color: '#4ade80' }}>99.99%</span>
                                <span className="metric-lbl">Service Integrity</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Staggered entrance Datatable container */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="pm-card-console"
                    >
                        <h3 className="pm-card-title" style={{ color: 'white' }}>Department Subdomain Registry</h3>
                        <p className="pm-card-subtitle" style={{ color: '#64748b' }}>Every partition receives cryptographical tenant isolation within the SQL Server instance.</p>
                        
                        <div className="table-responsive-wrapper mt-4">
                            <DataTable 
                                value={tenants} 
                                loading={loading} 
                                paginator 
                                rows={10} 
                                responsiveLayout="stack" 
                                breakpoint="960px"
                                className="custom-console-datatable"
                                rowHover
                            >
                                <Column header="Slug / Domain Key" body={slugBodyTemplate} sortable className="font-mono"></Column>
                                <Column field="name" header="Governing State Department" sortable className="dept-cell"></Column>
                                <Column header="Cluster Status" body={statusBodyTemplate} style={{ width: '120px' }}></Column>
                                <Column header="Sovereign Control Channels" body={actionBodyTemplate} style={{ width: '280px' }}></Column>
                            </DataTable>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animated Inspector Modal (AnimatePresence) */}
            <AnimatePresence>
                {isInspectorOpen && selectedTenant && (
                    <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.25 }}
                            className="console-modal"
                        >
                            <div className="modal-header flex align-items-center justify-content-between">
                                <div className="flex align-items-center gap-2">
                                    <Cpu size={16} className="text-purple-400" />
                                    <span>DATABASE SCHEMA KEY: {selectedTenant.tenantId.toUpperCase()}</span>
                                </div>
                                <button 
                                    onClick={() => setIsInspectorOpen(false)}
                                    className="modal-close-btn cursor-pointer"
                                >
                                    &times;
                                </button>
                            </div>
                            
                            <div className="modal-body font-mono">
                                <div className="meta-box flex flex-column gap-2 mb-3">
                                    <div className="flex justify-content-between">
                                        <span className="lbl">Identity Title:</span>
                                        <span className="val text-white">{selectedTenant.name}</span>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <span className="lbl">State Schema Slug:</span>
                                        <span className="val" style={{ color: '#38bdf8' }}>{selectedTenant.tenantId}</span>
                                    </div>
                                    <div className="flex justify-content-between">
                                        <span className="lbl">Database Partition:</span>
                                        <span className="val" style={{ color: '#4ade80' }}>MSSQL_SCHEMA_ISO_ACTIVE</span>
                                    </div>
                                </div>

                                <div className="json-title">Parsed Raw DynamicData Ledger</div>
                                <pre className="json-container scrollbar-subtle">
                                    {selectedTenant.dynamicData ? (
                                        JSON.stringify(JSON.parse(selectedTenant.dynamicData), null, 4)
                                    ) : (
                                        "// No dynamic payload overrides initialized in this tenant register."
                                    )}
                                </pre>
                            </div>

                            <div className="modal-footer flex justify-content-end">
                                <button 
                                    className="modal-action-btn cursor-pointer"
                                    onClick={() => setIsInspectorOpen(false)}
                                >
                                    Acknowledge Record
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

                .workspace-container {
                    display: flex;
                    height: 100vh;
                    width: 100vw;
                    overflow: hidden;
                    background-color: #020617;
                    color: #f8fafc;
                    font-family: 'Source Sans 3', sans-serif;
                }

                /* Persistent Left Command Sidebar */
                .app-sidebar {
                    width: 260px;
                    min-width: 260px;
                    background: #0f172a;
                    border-right: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    z-index: 10;
                    padding: 0;
                }

                .app-sidebar-header {
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .superadmin-logo-glow {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #a855f7 0%, #2563eb 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 12px rgba(168, 85, 247, 0.4);
                }

                .app-sidebar-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 19px;
                    font-weight: 700;
                    color: white;
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .app-sidebar-menu {
                    flex-grow: 1;
                    padding: 24px 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .app-sidebar-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    border-radius: 8px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    transition: all 200ms ease;
                    width: 100%;
                    outline: none;
                }

                .app-sidebar-item:hover {
                    background: rgba(255, 255, 255, 0.04);
                    color: white;
                }

                .app-sidebar-item.active {
                    background: rgba(168, 85, 247, 0.15) !important;
                    color: #c084fc !important;
                    border-left: 3px solid #c084fc !important;
                    border-radius: 0 8px 8px 0;
                    padding-left: 13px;
                }

                .app-sidebar-footer {
                    padding: 16px;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                }

                /* Profile Footer Info */
                .profile-btn {
                    transition: all 200ms ease;
                }
                .profile-btn:hover {
                    border-color: rgba(168, 85, 247, 0.4) !important;
                    background: rgba(255, 255, 255, 0.08) !important;
                }
                .profile-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #a855f7 0%, #2563eb 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 12px;
                    box-shadow: 0 2px 6px rgba(168, 85, 247, 0.3);
                }
                .profile-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                }
                .profile-name {
                    font-size: 13px;
                    font-weight: 600;
                    color: #f3f4f6;
                    line-height: 1.2;
                    text-align: left;
                }
                .profile-role {
                    font-size: 8.5px;
                    font-family: monospace;
                    color: #c084fc;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    line-height: 1;
                    text-align: left;
                }

                .logout-trigger-btn {
                    transition: all 200ms ease;
                    border-radius: 6px;
                }
                .logout-trigger-btn:hover {
                    background: rgba(239, 68, 68, 0.15) !important;
                    transform: scale(1.05);
                }

                /* Main Command Workspace layout */
                .main-content {
                    flex-grow: 1;
                    height: 100%;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    background-color: #020617;
                }

                .canvas-header {
                    padding: 20px 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .canvas-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .canvas-subtitle {
                    font-size: 13px;
                    margin-top: 3px;
                    display: block;
                }

                .canvas-body {
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    max-width: 1400px;
                    width: 100%;
                    margin: 0 auto;
                }

                .refresh-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    background: rgba(255, 255, 255, 0.03);
                    color: #94a3b8;
                    transition: all 200ms ease;
                }
                .refresh-btn:hover {
                    color: white;
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.15);
                }

                /* Metrics bento-style grid */
                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 24px;
                }

                .metric-card-console {
                    background: rgba(15, 23, 42, 0.6);
                    border: 1.5px solid rgba(255, 255, 255, 0.05);
                    border-radius: 14px;
                    padding: 22px 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(10px);
                }

                .metric-icon-console {
                    width: 46px;
                    height: 46px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
                }

                .metric-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                }

                .metric-val {
                    font-family: 'Lexend', sans-serif;
                    font-size: 26px;
                    font-weight: 700;
                    line-height: 1.1;
                }

                .metric-lbl {
                    font-size: 12px;
                    color: #64748b;
                    font-weight: 600;
                    margin-top: 4px;
                }

                .pm-card-console {
                    background: rgba(15, 23, 42, 0.55);
                    border: 1.5px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
                    backdrop-filter: blur(10px);
                }

                .pm-card-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 6px 0;
                    letter-spacing: -0.01em;
                }

                .pm-card-subtitle {
                    font-size: 13px;
                    margin: 0;
                }

                /* Datatable Console Restyling */
                .custom-console-datatable {
                    background: transparent !important;
                }
                
                .custom-console-datatable .p-datatable-thead > tr > th {
                    background: rgba(8, 12, 20, 0.7) !important;
                    color: #94a3b8 !important;
                    border-bottom: 1.5px solid rgba(255, 255, 255, 0.06) !important;
                    font-family: 'Lexend', sans-serif !important;
                    font-weight: 600 !important;
                    font-size: 13px !important;
                    letter-spacing: 0.02em !important;
                    padding: 16px 20px !important;
                }

                .custom-console-datatable .p-datatable-tbody > tr {
                    background: rgba(15, 23, 42, 0.3) !important;
                    color: #e2e8f0 !important;
                    transition: all 150ms ease !important;
                }

                .custom-console-datatable .p-datatable-tbody > tr:hover {
                    background: rgba(15, 23, 42, 0.6) !important;
                }

                .custom-console-datatable .p-datatable-tbody > tr > td {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
                    padding: 16px 20px !important;
                    font-size: 14px !important;
                }

                .dept-cell {
                    font-family: 'Lexend', sans-serif;
                    font-weight: 500;
                    color: white;
                }

                /* Badges & Status Pills */
                .slug-badge {
                    background: rgba(56, 189, 248, 0.08) !important;
                    border: 1px solid rgba(56, 189, 248, 0.2) !important;
                    color: #38bdf8 !important;
                    padding: 4px 10px !important;
                    border-radius: 6px !important;
                    letter-spacing: 0.02em;
                    font-weight: 700;
                }

                .live-status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(74, 222, 128, 0.08);
                    border: 1px solid rgba(74, 222, 128, 0.15);
                    color: #4ade80;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 20px;
                    letter-spacing: 0.05em;
                }

                .live-status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #4ade80;
                    box-shadow: 0 0 8px #4ade80;
                }

                /* Table Actions */
                .console-action-btn {
                    padding: 6px 14px;
                    font-size: 12px;
                    font-weight: 600;
                    border-radius: 8px;
                    border: 1px solid;
                    transition: all 200ms ease;
                    font-family: 'Lexend', sans-serif;
                }

                .console-action-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    filter: brightness(1.15);
                }

                /* Spin animation */
                .spin-animation {
                    animation: spin-kf 1s linear infinite;
                }
                @keyframes spin-kf {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Custom Paginator for dark mode */
                .custom-console-datatable .p-paginator {
                    background: rgba(8, 12, 20, 0.5) !important;
                    border: none !important;
                    border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
                    padding: 12px !important;
                }
                .custom-console-datatable .p-paginator .p-paginator-pages .p-paginator-page {
                    color: #94a3b8 !important;
                    border-radius: 6px !important;
                    min-width: 2.2rem !important;
                    height: 2.2rem !important;
                }
                .custom-console-datatable .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
                    background: rgba(168, 85, 247, 0.15) !important;
                    color: #c084fc !important;
                    border: 1px solid rgba(168, 85, 247, 0.3) !important;
                }
                .custom-console-datatable .p-paginator .p-link {
                    color: #64748b !important;
                }
                .custom-console-datatable .p-paginator .p-link:hover {
                    background: rgba(255,255,255,0.03) !important;
                    color: white !important;
                }

                /* Modals details */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(2, 6, 23, 0.8);
                    backdrop-filter: blur(8px);
                    z-index: 1000;
                }

                .console-modal {
                    background: #0b1329;
                    border: 1.5px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    width: 90%;
                    max-width: 680px;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .modal-header {
                    background: rgba(8, 12, 20, 0.7);
                    padding: 18px 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    font-family: 'Lexend', sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    color: #94a3b8;
                    letter-spacing: 0.05em;
                }

                .modal-close-btn {
                    background: transparent;
                    border: none;
                    color: #64748b;
                    font-size: 24px;
                    line-height: 1;
                    padding: 0;
                    transition: color 150ms ease;
                }
                .modal-close-btn:hover {
                    color: white;
                }

                .modal-body {
                    padding: 24px;
                }

                .meta-box {
                    background: rgba(8, 12, 20, 0.4);
                    border: 1px solid rgba(255,255,255,0.04);
                    border-radius: 12px;
                    padding: 16px;
                }
                .meta-box .lbl {
                    color: #64748b;
                    font-size: 12px;
                    font-weight: 600;
                }
                .meta-box .val {
                    font-size: 12px;
                    font-weight: 700;
                }

                .json-title {
                    font-family: 'Lexend', sans-serif;
                    font-size: 12px;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin: 20px 0 10px 0;
                }

                .json-container {
                    background: #020617;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px;
                    padding: 16px;
                    font-size: 12px;
                    color: #a7f3d0;
                    max-height: 280px;
                    overflow-y: auto;
                    line-height: 1.5;
                    margin: 0;
                }

                .modal-footer {
                    background: rgba(8, 12, 20, 0.4);
                    padding: 16px 24px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                .modal-action-btn {
                    background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-family: 'Lexend', sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
                    transition: all 200ms ease;
                }
                .modal-action-btn:hover {
                    box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4);
                    transform: translateY(-1px);
                }

                /* Scrollbar styling */
                .scrollbar-subtle::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .scrollbar-subtle::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-subtle::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 999px;
                }
                .scrollbar-subtle::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};
