import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Image,
  FileText,
  MessageSquare,
  ShoppingCart,
  Clock,
  CheckCircle
} from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { getStats, getOrders } from '../services';
import type { AdminStats, AdminOrder } from '../types';
import { format } from 'date-fns';

// ─── Stat card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  key?: string;
  icon: typeof ShoppingCart;
  label: string;
  value: number;
  iconBg: string;
  iconColor: string;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          background: iconBg,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Icon style={{ width: 22, height: 22, color: iconColor }} />
      </div>
      <div>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: '2px 0 0' }}>{value}</p>
      </div>
    </motion.div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: AdminOrder['status'] }) {
  const map: Record<AdminOrder['status'], { bg: string; color: string; label: string }> = {
    pending:     { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
    in_progress: { bg: '#dbeafe', color: '#1e40af', label: 'In Progress' },
    completed:   { bg: '#dcfce7', color: '#166534', label: 'Completed' },
    cancelled:   { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' }
  };
  const s = map[status];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: 20
      }}
    >
      {s.label}
    </span>
  );
}

// ─── Dashboard page ───────────────────────────────────────────────────────────

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
    setStats(getStats());
    setRecentOrders(
      getOrders()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
    );
  }, []);

  const statCards: StatCardProps[] = [
    { icon: Image,        label: 'Portfolio',     value: stats.totalPortfolios,   iconBg: '#f3e8ff', iconColor: '#7c3aed', delay: 0 },
    { icon: FileText,     label: 'Blog Posts',    value: stats.totalBlogs,         iconBg: '#dbeafe', iconColor: '#1d4ed8', delay: 0.05 },
    { icon: MessageSquare,label: 'Testimonials',  value: stats.totalTestimonials,  iconBg: '#cffafe', iconColor: '#0e7490', delay: 0.1 },
    { icon: ShoppingCart, label: 'Total Orders',  value: stats.totalOrders,        iconBg: '#ffedd5', iconColor: '#c2410c', delay: 0.15 },
    { icon: Clock,        label: 'Pending',        value: stats.pendingOrders,      iconBg: '#fef9c3', iconColor: '#a16207', delay: 0.2 },
    { icon: CheckCircle,  label: 'Completed',      value: stats.completedOrders,    iconBg: '#dcfce7', iconColor: '#15803d', delay: 0.25 }
  ];

  return (
    <AdminLayout>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
          Selamat datang di Rupaka Studio Admin Panel
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}
      >
        {statCards.map(card => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Recent orders */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <ShoppingCart style={{ width: 18, height: 18, color: '#f97316' }} />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0 }}>
            Recent Orders
          </h2>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ padding: '32px 20px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
            Belum ada order
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['Order ID', 'Client', 'Project', 'Status', 'Amount', 'Tanggal'].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#374151',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    style={{
                      borderTop: '1px solid #f3f4f6',
                      background: i % 2 === 0 ? '#fff' : '#fafafa'
                    }}
                  >
                    <td style={{ padding: '10px 16px', fontWeight: 600, color: '#111827' }}>{order.id}</td>
                    <td style={{ padding: '10px 16px', color: '#374151' }}>{order.clientName}</td>
                    <td style={{ padding: '10px 16px', color: '#374151', textTransform: 'capitalize' }}>{order.projectType}</td>
                    <td style={{ padding: '10px 16px' }}><StatusBadge status={order.status} /></td>
                    <td style={{ padding: '10px 16px', fontWeight: 600, color: '#111827' }}>{order.amount}</td>
                    <td style={{ padding: '10px 16px', color: '#6b7280' }}>
                      {format(new Date(order.createdAt), 'dd MMM yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
}
