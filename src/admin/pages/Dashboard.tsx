import { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { AdminDashboard as AdminDashboardComponent } from '../components/AdminDashboard';
import { getStats, getOrders } from '../services';
import { AdminStats, AdminOrder } from '../types';

export function Dashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalPortfolios: 0,
    totalBlogs: 0,
    totalTestimonials: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  const [recentOrders, setRecentOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    // Load stats
    const stats = getStats();
    setStats(stats);

    // Load recent orders
    const orders = getOrders().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setRecentOrders(orders);
  }, []);

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome to Rupaka Studio Admin Panel">
      <AdminDashboardComponent stats={stats} recentOrders={recentOrders} />
    </AdminLayout>
  );
}
