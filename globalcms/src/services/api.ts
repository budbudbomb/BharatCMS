const API_BASE_URL = 'http://localhost:5163/api';

export const getTenantId = (): string => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // Handle localhost (dept-a.localhost) or subdomain (dept-a.globalcms.gov)
  if (parts.length > 2 || (parts.length === 2 && parts[1] === 'localhost')) {
    const subdomain = parts[0];
    return subdomain === 'www' ? 'default' : subdomain;
  }
  
  return 'default';
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const tenantId = getTenantId();
  const token = localStorage.getItem('token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Tenant-Id': tenantId,
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorBody || response.statusText}`);
  }

  return response.json();
};
