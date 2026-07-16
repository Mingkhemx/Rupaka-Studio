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
        className="lg:hidden fixed bottom-6 left-6 z-40 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar - Always visible on large screens */}
      <aside className="hidden lg:flex flex-col w-64 bg-black-dark text-white overflow-y-auto border-r border-white/10">
        {/* Logo Area */}
        <div className="p-6 border-b border-white/10 sticky top-0 bg-black-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg text-black">
              R
            </div>
            <div>
              <h1 className="font-bold text-lg">Rupaka</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2 flex-1">
          {MENU_ITEMS.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-white/10 bg-black/40 text-xs text-gray-400">
          <p className="font-semibold text-white/60">Rupaka Studio</p>
          <p>Admin Panel © 2025</p>
        </div>
      </aside>

      {/* Mobile Sidebar - Overlay on small screens */}
      {isOpen && (
        <>
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-screen w-64 bg-black-dark text-white overflow-y-auto z-30 flex flex-col lg:hidden"
          >
            {/* Logo Area */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg text-black">
                  R
                </div>
                <div>
                  <h1 className="font-bold text-lg">Rupaka</h1>
                  <p className="text-xs text-gray-400">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-2 flex-1">
              {MENU_ITEMS.map(item => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer Info */}
            <div className="p-4 border-t border-white/10 bg-black/40 text-xs text-gray-400">
              <p className="font-semibold text-white/60">Rupaka Studio</p>
              <p>Admin Panel © 2025</p>
            </div>
          </motion.aside>

          {/* Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        </>
      )}
    </>
  );
}
