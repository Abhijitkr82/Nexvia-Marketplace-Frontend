
import { PackageOpen, Plus, Sparkles } from 'lucide-react';

export default function NoProducts({ onAddProduct }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d9b879]/60 bg-white px-5 py-12 text-center shadow-sm sm:px-8">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[#fbf8f0] text-[#a17a3d]">
        <PackageOpen size={38} strokeWidth={1.5} />

        <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-[#d9b879] text-[#101b35]">
          <Sparkles size={13} />
        </span>
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-[#101b35]">
        Your store is waiting!
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
        You haven't added any products yet. Add your first product to start
        building your store inventory.
      </p>

      <button
        type="button"
        onClick={onAddProduct}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#101b35] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1b2c50] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d9b879]/50 focus:ring-offset-2"
      >
        <Plus size={18} className="text-[#d9b879]" />
        Add Your First Product
      </button>
    </div>
  );
}
