import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Image as ImageIcon, MessageCircle, FileText, BarChart3, Settings, Bell, Search } from 'lucide-react';
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

  const adminEmail = localStorage.getItem('adminEmail') || 'Admin User';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'blog', label: 'Blog', icon: FileText },
  ];

  const toolsItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-24'} bg-white border-r border-slate-200/50 transition-all duration-300 flex flex-col fixed h-screen z-40 shadow-sm`}>
        {/* Logo/Header */}
        <div className="p-6 border-b border-slate-200/50">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1B3A52] to-[#2E5A8C] rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">R</span>
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 text-sm">Rupaka</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B3A52] to-[#2E5A8C] rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-display font-bold">R</span>
            </div>
          )}
        </div>

        {/* MENU Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {sidebarOpen && <p className="text-xs font-display font-bold text-slate-400 uppercase tracking-wider mb-3">MENU</p>}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#E8654D] to-[#F39237] text-white shadow-md shadow-orange-500/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && <span className="font-body text-sm font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* TOOLS Section */}
          <div className="p-4 border-t border-slate-200/50">
            {sidebarOpen && <p className="text-xs font-display font-bold text-slate-400 uppercase tracking-wider mb-3">TOOLS</p>}
            <nav className="space-y-1">
              {toolsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#E8654D] to-[#F39237] text-white shadow-md shadow-orange-500/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && <span className="font-body text-sm font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer - Pro Card */}
        <div className={`p-4 border-t border-slate-200/50 ${sidebarOpen ? '' : 'flex justify-center'}`}>
          {sidebarOpen ? (
            <div className="bg-gradient-to-br from-[#1B3A52] to-[#0F2438] rounded-xl p-4 text-white text-center">
              <p className="font-body text-xs opacity-80 mb-2">User</p>
              <p className="font-display font-bold text-sm mb-3 truncate">{adminEmail}</p>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 text-white font-body text-xs font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 text-white flex items-center justify-center"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>

        {/* Toggle Button */}
        <div className="p-2 border-t border-slate-200/50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-24'} flex flex-col`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200/50 px-8 py-5 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-[#1B3A52] to-[#2E5A8C] bg-clip-text text-transparent">
              Performance Overview
            </h1>
            <p className="font-body text-sm text-slate-500 mt-1">Kelola semua konten Rupaka Studio</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1B3A52] to-[#2E5A8C] rounded-full flex items-center justify-center text-white font-display font-bold">
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-body text-sm font-medium text-slate-800">{adminEmail}</p>
                <p className="font-body text-xs text-slate-500">Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const stats = [
    { label: 'Total Portfolio', value: '12', subtext: 'Compared to last month', change: '+22.5%', color: 'from-[#1B3A52] to-[#2E5A8C]', icon: '📊' },
    { label: 'Monthly Order', value: '34,760', subtext: 'Monthly order count', change: '+12.45%', color: 'from-slate-300 to-slate-200', textColor: 'text-slate-800', icon: '📦' },
    { label: 'Unique Visits', value: '14,987', subtext: 'Unique visits this month', change: '-1.08%', changeColor: 'text-red-500', color: 'from-slate-100 to-slate-50', textColor: 'text-slate-800', icon: '👥' },
    { label: 'Products Sold', value: '12,387', subtext: 'Products delivered', change: '+12.7%', color: 'from-slate-200 to-slate-100', textColor: 'text-slate-800', icon: '🛍️' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className={`font-body text-sm ${stat.textColor ? 'text-slate-600' : 'text-white/80'} mb-1`}>{stat.label}</p>
                <p className={`font-display text-3xl font-bold ${stat.textColor || 'text-white'}`}>{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className={`font-body text-xs ${stat.textColor ? 'text-slate-500' : 'text-white/70'}`}>{stat.subtext}</p>
              <span className={`font-display text-sm font-bold ${stat.changeColor || 'text-green-400'}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
          <div className="mb-6">
            <h3 className="font-display text-lg font-bold text-slate-800">Customer Activity</h3>
            <p className="font-body text-sm text-slate-500 mt-1">Buying trends across months</p>
          </div>
          <div className="flex items-end justify-between h-64 bg-gradient-to-b from-slate-50 to-white rounded-xl p-6 border border-slate-200/30">
            {[40, 60, 35, 55, 70, 45, 50].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-12 bg-gradient-to-t from-[#1B3A52] to-[#2E5A8C] rounded-t-lg`} style={{ height: `${height * 2}px` }}></div>
                <p className="font-body text-xs text-slate-500">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Customer Activity Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-slate-800">Customer Activity</h3>
              <select className="font-body text-sm text-slate-600 bg-transparent border-none outline-none cursor-pointer">
                <option>Today</option>
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>
            <div className="flex items-center justify-center mb-6 h-40">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad1)" strokeWidth="20" strokeDasharray="251.2 314" strokeDashoffset="0" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1B3A52" />
                    <stop offset="100%" stopColor="#2E5A8C" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center">
                <p className="font-display text-3xl font-bold text-slate-800">7,738</p>
                <p className="font-body text-xs text-slate-500">Sold Today</p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
            <h3 className="font-display text-lg font-bold text-slate-800 mb-4">Top Products</h3>
            <div className="space-y-3">
              {[
                { name: 'Electronic', value: '2,487', change: '+22.08%' },
                { name: 'Games', value: '2,568', change: '-1.08%' },
                { name: 'Furniture', value: '2,568', change: '+12.08%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200/30">
                  <p className="font-body text-sm text-slate-800">{item.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="font-display font-bold text-slate-800">{item.value}</p>
                    <span className={`font-body text-xs px-2 py-1 rounded-full ${item.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

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


