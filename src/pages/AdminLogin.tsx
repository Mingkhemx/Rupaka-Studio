import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '../lib/firebase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login gagal. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark to-primary-blue flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-dark/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-primary-dark" />
          </div>
          <h1 className="font-display text-3xl font-bold text-text-dark">Admin Login</h1>
          <p className="font-body text-sm text-muted-grey mt-2">Rupaka Studio Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="font-display text-sm font-bold text-text-dark mb-2 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-grey" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-panel-bg border border-line-grey/40 rounded-[12px] py-3 pl-12 pr-4 font-body text-sm text-text-dark placeholder-muted-grey/50 focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="font-display text-sm font-bold text-text-dark mb-2 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-grey" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-panel-bg border border-line-grey/40 rounded-[12px] py-3 pl-12 pr-4 font-body text-sm text-text-dark placeholder-muted-grey/50 focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[12px] p-3">
              <p className="font-body text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B3A52] text-white hover:bg-[#2E5A8C] disabled:opacity-50 font-display font-bold py-3 rounded-[12px] transition-all duration-300 cursor-pointer mt-8"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p className="text-center font-body text-xs text-muted-grey mt-6">
          Login menggunakan Firebase Authentication
        </p>
      </div>
    </div>
  );
}
