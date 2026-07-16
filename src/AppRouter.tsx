import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import App from './App';
import { AdminApp } from './admin';
import { AdminLogin } from './admin/pages/Login';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, error } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#94a3b8' }}>
        Memuat...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#ef4444', padding: 20, textAlign: 'center' }}>
        <div>
          <h2 style={{ fontSize: 18, marginBottom: 10 }}>Error Firebase</h2>
          <p style={{ fontSize: 14 }}>{error}</p>
          <p style={{ fontSize: 12, marginTop: 10, color: '#94a3b8' }}>Pastikan environment variables sudah diisi dengan benar di Vercel</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <AdminApp />
            </RequireAuth>
          }
        />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
