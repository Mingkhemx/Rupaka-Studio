import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Image as ImageIcon, MessageCircle, FileText, Home, Settings } from 'lucide-react';
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
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'chat', label: 'Chat WhatsApp', icon: MessageCircle },
    { id: 'blog', label: 'Blog', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-24'} bg-gradient-to-b from-[#1B3A52] via-[#1B3A52] to-[#0F2438] text-white transition-all duration-300 flex flex-col fixed h-screen z-40 shadow-2xl`}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="font-display font-bold text-xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Rupaka</h1>
              <p className="font-body text-xs text-white/50 mt-1">Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all ml-auto"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-8 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#E8654D] to-[#F39237] text-white shadow-lg shadow-orange-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="font-body text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-4">
          {sidebarOpen && (
            <div className="px-3 py-3 bg-white/5 rounded-lg border border-white/10">
              <p className="font-body text-xs text-white/50 mb-1">Logged in as</p>
              <p className="font-display text-sm font-bold text-white truncate">{adminEmail}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-200 text-white font-body text-sm font-medium shadow-lg shadow-red-600/20"
          >
            <LogOut size={18} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-24'}`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200/50 px-8 py-6 shadow-sm">
          <h2 className="font-display text-3xl font-bold bg-gradient-to-r from-[#1B3A52] to-[#2E5A8C] bg-clip-text text-transparent">
            {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
          </h2>
          <p className="font-body text-sm text-slate-500 mt-1">Kelola konten Rupaka Studio</p>
        </div>

        {/* Content */}
        <div className="p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Stats for dashboard overview
  const dashboardStats = [
    { label: 'Total Portfolio', value: '12', color: 'from-blue-500 to-blue-600', icon: ImageIcon },
    { label: 'Active Chats', value: '5', color: 'from-green-500 to-green-600', icon: MessageCircle },
    { label: 'Blog Posts', value: '8', color: 'from-purple-500 to-purple-600', icon: FileText },
  ];

  // Dashboard component
  function Dashboard() {
    return (
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${stat.color} p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-white/80 text-sm mb-2">{stat.label}</p>
                    <p className="font-display text-4xl font-bold">{stat.value}</p>
                  </div>
                  <Icon size={40} className="opacity-20" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/50">
          <h3 className="font-display text-xl font-bold text-slate-800 mb-6">Akses Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => setActiveTab('portfolio')} className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200 transition-all duration-300 text-left group">
              <ImageIcon className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <p className="font-display font-bold text-slate-800">Kelola Portfolio</p>
              <p className="font-body text-sm text-slate-600 mt-1">Tambah atau edit karya</p>
            </button>
            <button onClick={() => setActiveTab('chat')} className="p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border border-green-200 transition-all duration-300 text-left group">
              <MessageCircle className="text-green-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <p className="font-display font-bold text-slate-800">Chat WhatsApp</p>
              <p className="font-body text-sm text-slate-600 mt-1">Lihat pesan masuk</p>
            </button>
            <button onClick={() => setActiveTab('blog')} className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl border border-purple-200 transition-all duration-300 text-left group">
              <FileText className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <p className="font-display font-bold text-slate-800">Kelola Blog</p>
              <p className="font-body text-sm text-slate-600 mt-1">Tulis atau edit artikel</p>
            </button>
            <button className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl border border-orange-200 transition-all duration-300 text-left group">
              <Settings className="text-orange-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <p className="font-display font-bold text-slate-800">Pengaturan</p>
              <p className="font-body text-sm text-slate-600 mt-1">Konfigurasi panel</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render content
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'portfolio':
        return <PortfolioManager />;
      case 'chat':
        return <ChatManager />;
      case 'blog':
        return <BlogManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
}


