
import { ClipboardList, RefreshCw } from 'lucide-react';

export default function OrdersHeader({ loadingOrders, onRefresh }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <ClipboardList size={17} className="text-[#a17a3d]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17a3d]">
            Order Management
          </span>
        </div>

        <h2 className="text-2xl font-black tracking-tight text-[#101b35] sm:text-3xl">
          Customer Orders
        </h2>

        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-500">
          View orders containing your products and manage their status.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={loadingOrders}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-[#d9b879] hover:bg-[#fbf8f0] hover:text-[#765a2d] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw
          size={16}
          className={loadingOrders ? 'animate-spin' : ''}
        />
        {loadingOrders ? 'Refreshing...' : 'Refresh Orders'}
      </button>
    </div>
  );
}
