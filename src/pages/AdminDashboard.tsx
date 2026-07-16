import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Image as ImageIcon, MessageCircle, FileText, Settings, Bell, Search } from 'lucide-react';
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
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'blog', label: 'Blog', icon: FileText },
  ];

  const toolsItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed h-screen z-40`}>
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Rupaka</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold">R</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* MENU Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {sidebarOpen && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Menu</p>}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* TOOLS Section */}
          <div className="p-4 border-t border-gray-200">
            {sidebarOpen && <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tools</p>}
            <nav className="space-y-2">
              {toolsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer - User Card */}
        <div className={`p-4 border-t border-gray-200 ${sidebarOpen ? '' : 'flex flex-col items-center gap-3'}`}>
          {sidebarOpen ? (
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-200">
              <p className="text-xs text-gray-500 mb-2 font-medium">Logged in as</p>
              <p className="font-semibold text-sm text-gray-900 mb-4 truncate">{adminEmail}</p>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white text-xs font-semibold"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white flex items-center justify-center"
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>

        {/* Toggle Button */}
        {/* Removed - toggle now in header */}
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} flex flex-col`}>
        {/* Top Bar */}
        <div className={`bg-white border-b border-gray-200 flex items-center justify-between transition-all duration-300 ${sidebarOpen ? 'px-8 py-5' : 'px-4 py-4'}`}>
          <div>
            <h1 className={`font-bold text-gray-900 ${sidebarOpen ? 'text-xl' : 'text-lg'}`}>Performance Overview</h1>
            {sidebarOpen && <p className="text-sm text-gray-500 mt-1">Kelola semua konten Rupaka Studio</p>}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
              <Search size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className={`flex items-center ${sidebarOpen ? 'gap-3 pl-4 border-l border-gray-200' : ''}`}>
              <div className={`bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold ${sidebarOpen ? 'w-9 h-9 text-sm' : 'w-8 h-8 text-xs'}`}>
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              {sidebarOpen && (
                <div>
                  <p className="text-sm font-medium text-gray-900">{adminEmail}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              )}
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
    { 
      label: 'Total Portfolio', 
      value: '12', 
      subtext: 'Compared to last month', 
      change: '+22.5%', 
      icon: '📊',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      label: 'Monthly Order', 
      value: '34,760', 
      subtext: 'Monthly order count', 
      change: '+12.45%', 
      icon: '📦',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    { 
      label: 'Unique Visits', 
      value: '14,987', 
      subtext: 'Unique visits this month', 
      change: '-1.08%',
      changeColor: 'text-red-600',
      icon: '👥',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    { 
      label: 'Products Sold', 
      value: '12,387', 
      subtext: 'Products delivered', 
      change: '+12.7%',
      icon: '🛍️',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-6 hover:shadow-sm transition-shadow duration-200`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">{stat.subtext}</p>
              <span className={`text-sm font-semibold ${stat.changeColor || 'text-green-600'}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
          <div className="mb-6">
            <h3 className="font-bold text-gray-900">Customer Activity</h3>
            <p className="text-sm text-gray-500 mt-1">Buying trends across months</p>
          </div>
          <div className="flex items-end justify-between h-64 bg-gray-50 rounded-lg p-6 border border-gray-200">
            {[40, 60, 35, 55, 70, 45, 50].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-10 bg-blue-600 rounded-t-md" style={{ height: `${height * 2}px` }}></div>
                <p className="text-xs text-gray-500">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Customer Activity Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Customer Activity</h3>
              <select className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer hover:text-gray-900">
                <option>Today</option>
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>
            <div className="flex flex-col items-center justify-center h-40 mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="#2563eb" 
                    strokeWidth="12" 
                    strokeDasharray="127.234 339.292"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-2xl font-bold text-gray-900">7,738</p>
                  <p className="text-xs text-gray-500">Sold</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
            <h3 className="font-bold text-gray-900 mb-4">Top Products</h3>
            <div className="space-y-3">
              {[
                { name: 'Electronic', value: '2,487', change: '+22.08%' },
                { name: 'Games', value: '2,568', change: '-1.08%' },
                { name: 'Furniture', value: '2,568', change: '+12.08%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${item.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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
  const [activeTab, setActiveTab] = useState('portfolio');

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
