import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useAdmin';

// Pages
import { AdminLogin } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PortfolioAdmin } from './pages/PortfolioAdmin';
import { BlogAdmin } from './pages/BlogAdmin';
import { TestimonialAdmin } from './pages/TestimonialAdmin';
import { FAQAdmin } from './pages/FAQAdmin';
import { OrdersAdmin } from './pages/OrdersAdmin';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

export function AdminApp() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <PortfolioAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <BlogAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/testimonials"
          element={
            <ProtectedRoute>
              <TestimonialAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <FAQAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersAdmin />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
