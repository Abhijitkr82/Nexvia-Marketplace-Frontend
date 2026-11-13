
import useAdminDashboard from '../hooks/useAdminDashboard';
import AdminHeader from '../components/layout/AdminHeader';
import AdminHeading from '../components/layout/AdminHeading';
import MarketplaceOverview from '../components/layout/MarketplaceOverview';
import StatsError from '../components/stats/StatsError';
import StatsGrid from '../components/stats/StatsGrid';
import UserManagementSection from '../components/users/UserManagementSection';
import VendorManagementSection from '../components/vendors/VendorManagementSection';
import ProductManagementSection from '../components/products/ProductManagementSection';
import OrderManagementSection from '../components/orders/OrderManagementSection';
import CouponManagementSection from '../components/coupons/CouponManagementSection';

export default function AdminDashboard() {
  const dashboard = useAdminDashboard();

  return (
    <div className="min-h-screen bg-[#f5f6f9]">
      <AdminHeader onLogout={dashboard.logout} />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <AdminHeading
          refreshing={dashboard.refreshing}
          onRefresh={dashboard.refreshDashboard}
        />

        {dashboard.statsError && (
          <StatsError
            message={dashboard.statsError}
            onRetry={dashboard.fetchStats}
          />
        )}

        <section aria-label="Marketplace statistics">
          <StatsGrid
            cards={dashboard.statCards}
            loading={dashboard.statsLoading}
          />
        </section>

        <section aria-label="User management">
          <UserManagementSection usersState={dashboard.users} />
        </section>

        <section aria-label="Vendor management">
          <VendorManagementSection vendorsState={dashboard.vendors} />
        </section>

        <section aria-label="Product management">
          <ProductManagementSection productsState={dashboard.products} />
        </section>

        <section aria-label="Order management">
          <OrderManagementSection ordersState={dashboard.orders} />
        </section>

        <section aria-label="Coupon management">
          <CouponManagementSection couponsState={dashboard.coupons} />
        </section>

        <section aria-label="Marketplace overview">
          <MarketplaceOverview />
        </section>
      </main>
    </div>
  );
}
