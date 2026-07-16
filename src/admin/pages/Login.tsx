import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';
import { login, initializeStorage } from '../services';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useAdmin';

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@rupaka.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Initialize storage with mock data on first login
      initializeStorage();

      const result = login(email, password);
      if (result.success) {
        showToast('Login successful!', 'success');
        setTimeout(() => {
          navigate('/admin');
        }, 500);
      } else {
        showToast(result.error || 'Invalid credentials', 'error');
      }
    } catch (error) {
      showToast('Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-blue to-primary-dark flex items-center justify-center p-4">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent-orange to-orange-600 px-6 py-8 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Rupaka Admin</h1>
            <p className="text-white/80 text-sm">Secure Admin Panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-grey" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange transition-all"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-grey" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-line-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800 font-medium">Demo Credentials:</p>
              <p className="text-xs text-blue-700 mt-1">
                Email: <code className="bg-blue-100 px-1 rounded">admin@rupaka.com</code>
              </p>
              <p className="text-xs text-blue-700">
                Password: <code className="bg-blue-100 px-1 rounded">admin123</code>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>

            {/* Footer */}
            <p className="text-xs text-center text-muted-grey">
              Protected by authentication
            </p>
          </form>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center text-white/60 text-xs">
          <p>© 2025 Rupaka Studio. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
