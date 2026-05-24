import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/lara-light-blue/theme.css' // theme
import 'primereact/resources/primereact.min.css'              // core css
import 'primeicons/primeicons.css'                            // icons
import 'primeflex/primeflex.css'                              // css utility
import './index.css'
import App from './App.tsx'
import { TenantProvider } from './context/TenantContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TenantProvider>
          <App />
        </TenantProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
