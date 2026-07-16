import { motion } from 'motion/react';
import { TrendingUp, FileText, MessageSquare, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { AdminStats, AdminOrder } from '../types';
import { format } from 'date-fns';

interface AdminDashboardProps {
  stats: AdminStats;
  recentOrders: AdminOrder[];
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color = 'bg-blue-100'
}: {
  icon: typeof TrendingUp;
  label: string;
  value: number | string;
  trend?: string;
  color?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg p-6 border border-line-grey hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-grey text-sm font-medium">{label}</p>
        <h3 className="text-3xl font-bold text-text-dark mt-2">{value}</h3>
        {trend && <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </p>}
      </div>
      <div className={`${color} p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
    </div>
  </motion.div>
);

const StatusBadge = ({ status }: { status: 'pending' | 'in_progress' | 'completed' | 'cancelled' }) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const labels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };

  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

export function AdminDashboard({ stats, recentOrders }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          icon={Image as any}
          label="Total Portfolio"
          value={stats.totalPortfolios}
          color="bg-purple-100"
        />
        <StatCard
          icon={FileText}
          label="Blog Posts"
          value={stats.totalBlogs}
          color="bg-blue-100"
        />
        <StatCard
          icon={MessageSquare}
          label="Testimonials"
          value={stats.totalTestimonials}
          color="bg-cyan-100"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={stats.totalOrders}
          color="bg-orange-100"
        />
        <StatCard
          icon={Clock}
          label="Pending"
          value={stats.pendingOrders}
          trend={`${Math.round((stats.pendingOrders / stats.totalOrders) * 100)}% of total`}
          color="bg-yellow-100"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={stats.completedOrders}
          trend={`${Math.round((stats.completedOrders / stats.totalOrders) * 100)}% success rate`}
          color="bg-green-100"
        />
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg border border-line-grey overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-line-grey">
          <h2 className="text-lg font-semibold text-text-dark flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-accent-orange" />
            Recent Orders
          </h2>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-grey">
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-soft-card">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-text-dark">Order ID</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-dark">Client</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-dark">Project</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-dark">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-dark">Amount</th>
                  <th className="px-6 py-3 text-left font-semibold text-text-dark">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map(order => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-line-grey hover:bg-soft-card-2 transition-colors"
                  >
                    <td className="px-6 py-3 font-medium text-text-dark">{order.id}</td>
                    <td className="px-6 py-3">{order.clientName}</td>
                    <td className="px-6 py-3 capitalize">{order.projectType}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-3 font-medium text-text-dark">{order.amount}</td>
                    <td className="px-6 py-3 text-muted-grey text-xs">
                      {format(new Date(order.createdAt), 'dd MMM yyyy')}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Fix for missing import
const Image = FileText; // Fallback icon
