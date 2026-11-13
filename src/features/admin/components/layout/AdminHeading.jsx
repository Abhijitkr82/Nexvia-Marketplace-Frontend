
import { RefreshCw, LayoutDashboard } from 'lucide-react';

export default function AdminHeading({ refreshing, onRefresh }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

      {/* Dashboard Title */}
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <LayoutDashboard
            size={17}
            className="text-[#b38a48]"
          />

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b38a48]">
            Overview
          </p>
        </div>

        <h2 className="text-2xl font-black tracking-tight text-[#101b35] sm:text-3xl">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Monitor marketplace statistics, users and vendors.
        </p>
      </div>

      {/* Refresh Button */}
      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        aria-label="Refresh dashboard statistics"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#101b35] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c49a52] hover:bg-[#fffdf8] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#c49a52] focus:ring-offset-2"
      >
        <RefreshCw
          size={16}
          className={refreshing ? 'animate-spin' : ''}
        />

        {refreshing ? 'Refreshing...' : 'Refresh Dashboard'}
      </button>

    </div>
  );
}
