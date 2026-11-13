import {
  CheckCircle,
  IndianRupee,
  Package,
  ShoppingCart,
  Store,
  Users,
} from 'lucide-react';

export const INITIAL_STATS = {
  totalUsers: 0,
  totalCustomers: 0,
  totalVendors: 0,
  totalProducts: 0,
  totalOrders: 0,
  pendingOrders: 0,
  deliveredOrders: 0,
  totalRevenue: 0,
};

// Configuration of the six statistic cards shown at the top of the dashboard.
export const buildStatCards = (stats) => [
  {
    title: 'Total Users',
    value: stats.totalUsers,
    detail: `${stats.totalCustomers} customers`,
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Total Vendors',
    value: stats.totalVendors,
    detail: 'Registered vendors',
    icon: Store,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    title: 'Total Products',
    value: stats.totalProducts,
    detail: 'Marketplace listings',
    icon: Package,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    title: 'Total Orders',
    value: stats.totalOrders,
    detail: `${stats.pendingOrders} pending`,
    icon: ShoppingCart,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    title: 'Delivered Orders',
    value: stats.deliveredOrders,
    detail: 'Successfully delivered',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Order Value',
    value: `₹${Number(stats.totalRevenue).toLocaleString('en-IN')}`,
    detail: 'Non-cancelled orders',
    icon: IndianRupee,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];
