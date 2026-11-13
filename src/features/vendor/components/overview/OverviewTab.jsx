
import { Store, TrendingUp } from 'lucide-react';
import StatCards from './StatCards';
import RecentProducts from './RecentProducts';

export default function OverviewTab({
  products = [],
  loadingProducts = false,
  stats = {},
  onViewOrders,
  onViewProducts,
}) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <section className="space-y-7">

      {/* Section Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Store size={17} className="text-[#a17a3d]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a17a3d]">
              Store Overview
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-[#101b35] sm:text-3xl">
            Store Performance
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Track your products, inventory and order activity.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
          <TrendingUp size={15} />
          Inventory at a glance
        </div>
      </div>

      {/* Store Statistics */}
      <StatCards
        totalProducts={safeProducts.length}
        totalStock={Number(stats.totalStock) || 0}
        totalInventoryValue={Number(stats.totalInventoryValue) || 0}
        pendingOrders={Number(stats.pendingOrders) || 0}
        onViewOrders={onViewOrders}
      />

      {/* Recent Products */}
      <RecentProducts
        products={safeProducts}
        loadingProducts={loadingProducts}
        onViewAll={onViewProducts}
      />

    </section>
  );
}
