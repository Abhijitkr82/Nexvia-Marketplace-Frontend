
import { useEffect, useState } from 'react';
import useAdminAuth from './useAdminAuth';
import useAdminStats from './useAdminStats';
import useAdminUsers from './useAdminUsers';
import useAdminVendors from './useAdminVendors';
import useAdminProducts from './useAdminProducts';
import useAdminOrders from './useAdminOrders';
import useAdminCoupons from './useAdminCoupons';
import { buildStatCards } from '../utils/statCards';

export default function useAdminDashboard() {
  const { checkAdmin, logout } = useAdminAuth();

  const statsState = useAdminStats(checkAdmin);
  const users = useAdminUsers(checkAdmin);
  const vendors = useAdminVendors(checkAdmin);
  const products = useAdminProducts(checkAdmin, statsState.fetchStats);
  const orders = useAdminOrders();
  const coupons = useAdminCoupons(checkAdmin);

  const [refreshing, setRefreshing] = useState(false);

  const refreshDashboard = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        statsState.fetchStats(),
        users.fetchUsers(),
        vendors.fetchVendors(),
        products.fetchProducts(),
        orders.fetchOrders(),
        coupons.fetchCoupons(),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    statsState.fetchStats();
    users.fetchUsers();
    vendors.fetchVendors();
    products.fetchProducts();
    orders.fetchOrders();
    coupons.fetchCoupons();
  }, []);

  return {
    logout,
    refreshing,
    refreshDashboard,
    stats: statsState.stats,
    statsLoading: statsState.loading,
    statsError: statsState.error,
    fetchStats: statsState.fetchStats,
    statCards: buildStatCards(statsState.stats),
    users,
    vendors,
    products,
    orders,
    coupons,
  };
}
