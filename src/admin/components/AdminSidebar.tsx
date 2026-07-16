import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Image,
  FileText,
  MessageSquare,
  HelpCircle,
  ShoppingCart,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Image, label: 'Portfolio', path: '/admin/portfolio' },
  { icon: FileText, label: 'Blog', path: '/admin/blog' },
  { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: HelpCircle, label: 'FAQ', path: '/admin/faq' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' }
];

export function AdminSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-40 p-3 bg-accent-orange text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -240 }}
        animate={{ x: isOpen ? 0 : -240 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-60 bg-primary-dark text-white overflow-y-auto lg:translate-x-0 z-30"
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-primary-blue/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-orange rounded-lg flex items-center justify-center font-bold text-lg">
              R
            </div>
            <div>
              <h1 className="font-bold text-lg">Rupaka</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {MENU_ITEMS.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-accent-orange text-white shadow-lg'
                    : 'text-gray-300 hover:bg-primary-blue/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-blue/30 bg-primary-blue/10 text-xs text-gray-400">
          <p>Rupaka Studio Admin</p>
          <p>© 2025</p>
        </div>
      </motion.aside>

      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
    </>
  );
}
