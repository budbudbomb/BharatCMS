import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiFetch, getTenantId } from '../services/api';

interface TenantInfo {
  id: number;
  tenantId: string;
  name: string;
  dynamicData?: string; // JSON string
}

interface TenantContextType {
  tenant: TenantInfo | null;
  loading: boolean;
  error: string | null;
  refreshTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolveTenant = async () => {
    try {
      const subdomain = getTenantId();
      
      if (subdomain && subdomain !== 'default') {
        const profile = await apiFetch('/Tenant/profile');
        setTenant(profile);
      } else {
        // Default or admin tenant
        setTenant({
          id: 0,
          tenantId: 'default',
          name: 'Global CMS Admin'
        });
      }
    } catch (err) {
      setError('Failed to resolve tenant');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resolveTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading, error, refreshTenant: resolveTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
