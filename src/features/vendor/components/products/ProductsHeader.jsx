
import { RefreshCw, Plus, Package } from 'lucide-react';

export default function ProductsHeader({ onRefresh, onAddProduct }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Package size={17} className="text-[#a17a3d]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17a3d]">
            Inventory Management
          </span>
        </div>

        <h2 className="text-2xl font-black tracking-tight text-[#101b35] sm:text-3xl">
          My Products
        </h2>

        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          Manage and organize your store product listings.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-[#d9b879] hover:bg-[#fbf8f0] hover:text-[#765a2d] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/40 focus:ring-offset-2"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

        <button
          type="button"
          onClick={onAddProduct}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#101b35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1b2c50] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/50 focus:ring-offset-2"
        >
          <Plus size={17} className="text-[#d9b879]" />
          Add Product
        </button>
      </div>
    </div>
  );
}
