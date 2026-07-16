import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import './index.css';

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

try {
  createRoot(rootElement!).render(
    <StrictMode>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
  console.log('React rendered successfully');
} catch (error) {
  console.error('React render error:', error);
}
