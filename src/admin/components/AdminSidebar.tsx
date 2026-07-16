import {
  LayoutDashboard,
  Image,
  FileText,
  MessageSquare,
  HelpCircle,
  ShoppingCart,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../services';

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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 h-screen bg-black-dark text-white border-r border-white/10 fixed left-0 top-0">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg text-black flex-shrink-0">
              R
            </div>
            <div>
              <h1 className="font-bold text-base">Rupaka</h1>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    active
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 flex items-center gap-3 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={closeMenu}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Sidebar Panel */}
          <div className="absolute left-0 top-0 h-screen w-64 bg-black-dark text-white flex flex-col shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-lg text-black">
                  R
                </div>
                <div>
                  <h1 className="font-bold text-base">Rupaka</h1>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <div className="space-y-2">
                {MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className={`block w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                        active
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 flex items-center gap-3 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
