
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';

export default function NoProductsFound({ onClearFilters }) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-[#fffdf9] to-[#f8f9fc] px-5 py-16 text-center shadow-sm sm:py-20">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d9b879]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-100/50 blur-3xl" />

      {/* Icon */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#e8d7b8] bg-[#faf5eb] text-[#b38a48] shadow-sm">
        <ShoppingBag size={34} strokeWidth={1.5} />

        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#101b35] text-white shadow-md">
          <Search size={14} />
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b38a48]">
          Nothing to show
        </p>

        <h3 className="text-xl font-black tracking-tight text-[#101b35] sm:text-2xl">
          No Products Found
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
          We couldn't find products matching your search.
          Try another keyword or explore a different category.
        </p>

        {/* Clear Filters */}
        <button
          type="button"
          onClick={onClearFilters}
          className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-[#101b35] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#101b35]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#203456] hover:shadow-xl active:scale-95"
        >
          Clear Filters
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}
