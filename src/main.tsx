import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import './styles/index.css';

const isAdminPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

const App = lazy(() => import('./App'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

const AdminLoadingFallback = () => (
  <div className="min-h-screen bg-[#F1F4F4] flex flex-col items-center justify-center font-['Onest'] text-[#1F292A]">
    <div className="w-8 h-8 border-2 border-[#336E87] border-t-transparent rounded-full animate-spin" />
    <p className="mt-3 text-xs tracking-wider uppercase text-[#5A6D6C] font-mono">Loading Admin Portal...</p>
  </div>
);

const PublicLoadingFallback = () => (
  <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#336E87] border-t-transparent rounded-full animate-spin" />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={isAdminPath ? <AdminLoadingFallback /> : <PublicLoadingFallback />}>
        {isAdminPath ? <AdminApp /> : <App />}
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
