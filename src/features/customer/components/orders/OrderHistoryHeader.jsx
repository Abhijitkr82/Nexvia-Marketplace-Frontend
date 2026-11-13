
import { RefreshCw } from 'lucide-react';

export default function OrderHistoryHeader({
  ordersLoading,
  onRefresh,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b38a48]">
          Your Account
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-[#101b35] sm:text-4xl">
          My Orders
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Track your purchases and order status.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={ordersLoading}
        aria-label="Refresh orders"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#101b35] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c49a52] hover:bg-[#fffdf8] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        <RefreshCw
          size={16}
          className={ordersLoading ? 'animate-spin' : ''}
        />

        {ordersLoading ? 'Refreshing...' : 'Refresh Orders'}
      </button>
    </div>
  );
}
