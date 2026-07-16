import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Image,
  FileText,
  MessageSquare,
  HelpCircle,
  ShoppingCart,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { logout } from '../services';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Image, label: 'Portfolio', path: '/admin/portfolio' },
  { icon: FileText, label: 'Blog', path: '/admin/blog' },
  { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: HelpCircle, label: 'FAQ', path: '/admin/faq' }
];

function isActive(path: string, current: string) {
  if (path === '/admin') return current === '/admin';
  return current.startsWith(path);
}

interface MenuItemProps {
  key?: string;
  icon: typeof LayoutDashboard;
  label: string;
  path: string;
  active: boolean;
  onClick: () => void;
}

function MenuItem({ icon: Icon, label, active, onClick }: MenuItemProps) {
  const [hovered, setHovered] = useState(false);

  const bg = active ? '#f97316' : hovered ? 'rgba(255,255,255,0.1)' : 'transparent';
  const color = active ? '#fff' : '#d1d5db';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '10px 16px',
        borderRadius: 8,
        background: bg,
        color,
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'left',
        transition: 'background 0.15s, color 0.15s'
      }}
    >
      <Icon style={{ width: 20, height: 20, flexShrink: 0 }} />
      <span>{label}</span>
    </button>
  );
}

function SidebarContent({
  onNavigate,
  onClose
}: {
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutHovered, setLogoutHovered] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    onNavigate?.();
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}
      >
        {onClose && (
          <button
            onClick={onClose}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              padding: 4
            }}
            aria-label="Close menu"
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        )}
        <div
          style={{
            width: 40,
            height: 40,
            background: '#f97316',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 18,
            color: '#000',
            flexShrink: 0
          }}
        >
          R
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Rupaka</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {MENU_ITEMS.map(item => (
            <MenuItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={isActive(item.path, location.pathname)}
              onClick={() => handleNav(item.path)}
            />
          ))}
        </div>
      </nav>

      {/* Footer / Logout */}
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <button
          onClick={handleLogout}
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            width: '100%',
            padding: '10px 16px',
            borderRadius: 8,
            background: logoutHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: '#d1d5db',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            transition: 'background 0.15s'
          }}
        >
          <LogOut style={{ width: 18, height: 18 }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar — always visible on lg+ */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 256,
          height: '100vh',
          background: '#111827',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column'
        }}
        className="hidden lg:flex"
      >
        <SidebarContent />
      </div>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 9998,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#f97316',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(249,115,22,0.4)'
        }}
        className="lg:hidden"
      >
        <Menu style={{ width: 22, height: 22 }} />
      </button>

      {/* Mobile overlay + drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.55)'
            }}
          />

          {/* Drawer */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 256,
              height: '100%',
              background: '#111827',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
