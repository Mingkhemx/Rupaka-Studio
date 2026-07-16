import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Image as ImageIcon, MessageCircle, FileText } from 'lucide-react';
import PortfolioManager from './PortfolioManager';
import ChatManager from './ChatManager';
import BlogManager from './BlogManager';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

  const menuItems = [
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'chat', label: 'Chat WhatsApp', icon: MessageCircle },
    { id: 'blog', label: 'Blog', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-page-bg flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary-dark text-white transition-all duration-300 flex flex-col fixed h-screen z-40`}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="font-display font-bold text-lg">Rupaka Admin</h1>
              <p className="font-body text-xs text-white/60">Panel Manajemen</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-accent-coral text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="font-body text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          {sidebarOpen && (
            <div className="mb-4 pb-4 border-b border-white/10">
              <p className="font-body text-xs text-white/60">Logged in as</p>
              <p className="font-display text-sm font-bold text-white truncate">{adminEmail}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-body text-sm"
          >
            <LogOut size={18} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-line-grey/20 px-8 py-4">
          <h2 className="font-display text-2xl font-bold text-text-dark">
            {menuItems.find(item => item.id === activeTab)?.label}
          </h2>
        </div>

        {/* Content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');

  // Import pages dynamically
  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return <PortfolioManager />;
      case 'chat':
        return <ChatManager />;
      case 'blog':
        return <BlogManager />;
      default:
        return <PortfolioManager />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
}


