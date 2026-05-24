import { useTenant } from './context/TenantContext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DepartmentTemplate } from './pages/DepartmentTemplate';
import { PublicHome } from './pages/PublicHome';
import { ClientRegister } from './pages/ClientRegister';
import { ClientDashboard } from './pages/ClientDashboard';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { getTenantId } from './services/api';
import './App.css';

function App() {
  const { loading, error } = useTenant();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const tenantId = getTenantId();
  const isSubdomain = tenantId !== 'default';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAuthenticated(!!token);
    setUserRole(user.role || null);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner strokeWidth="3" />
      </div>
    );
  }

  // If it's a subdomain, we always show the live portal view
  if (isSubdomain) {
    if (error) {
      return (
        <div className="flex justify-content-center align-items-center min-h-screen">
          <Message severity="error" text={error} />
        </div>
      );
    }
    return <DepartmentTemplate />;
  }

  // Main Domain Flow
  return (
    <Routes>
      <Route path="/" element={<PublicHome />} />
      <Route path="/register" element={<ClientRegister />} />
      <Route path="/login" element={<LoginPage onLoginSuccess={() => window.location.href = '/dashboard'} />} />
      
      <Route path="/dashboard" element={
        isAuthenticated ? (
          userRole === 'SuperAdmin' ? <SuperAdminDashboard /> : <ClientDashboard />
        ) : (
          <Navigate to="/login" />
        )
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
