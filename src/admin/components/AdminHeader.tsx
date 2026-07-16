import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-white border-b border-line-grey">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">{title}</h1>
          {subtitle && <p className="text-muted-grey text-sm">{subtitle}</p>}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 text-text-dark hover:bg-soft-card rounded-lg transition-colors group"
        >
          <User className="w-5 h-5 group-hover:opacity-70" />
          <span className="hidden sm:inline text-sm font-medium">Logout</span>
          <LogOut className="w-4 h-4 opacity-60" />
        </button>
      </div>
    </header>
  );
}
