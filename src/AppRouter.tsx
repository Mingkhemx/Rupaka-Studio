/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isAuthenticated } from './admin/services';

// Main app page
import App from './App';

// Admin app
import { AdminApp } from './admin';

// Protected route for admin
function AdminRoute() {
  if (!isAuthenticated() && window.location.pathname !== '/admin/login') {
    window.location.href = '/admin/login';
    return null;
  }
  return <AdminApp />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website */}
        <Route path="/" element={<App />} />

        {/* Admin panel - all admin routes are prefixed with /admin */}
        <Route path="/admin/*" element={<AdminRoute />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
