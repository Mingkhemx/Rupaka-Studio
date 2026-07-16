import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      {/* Fixed sidebar */}
      <AdminSidebar />

      {/* Main content — offset by sidebar width on large screens */}
      <div
        style={{ marginLeft: 0 }}
        className="lg:ml-64"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div style={{ padding: 32, maxWidth: 1280 }}>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
