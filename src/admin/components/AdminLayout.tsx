import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AdminLayout({ title, subtitle, children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-page-bg">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-60">
        {/* Header */}
        <AdminHeader title={title} subtitle={subtitle} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
