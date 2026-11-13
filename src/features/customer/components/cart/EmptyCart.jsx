
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export default function EmptyCart({ onContinueShopping }) {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 py-10 text-center">
      {/* Decorative icon */}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-[#d9b879]/30 bg-gradient-to-br from-[#f8f1e4] to-[#eee3d0] text-[#a17a3d] shadow-lg shadow-[#a17a3d]/10">
        <ShoppingBag size={40} strokeWidth={1.5} />

        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#f8f9fc] bg-[#101b35] text-[#d9b879]">
          <Sparkles size={14} />
        </span>
      </div>

      {/* Content */}
      <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a17a3d]">
        Your next favourite is waiting
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight text-[#101b35]">
        Your cart is empty
      </h3>

      <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
        Looks like you haven't added anything yet. Explore our collection and
        find something you'll love.
      </p>

      {/* Continue shopping */}
      <button
        type="button"
        onClick={onContinueShopping}
        className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#101b35] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#101b35]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#1b2c50] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#d9b879] focus:ring-offset-2"
      >
        Continue Shopping
        <ArrowRight
          size={17}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </button>

      <p className="mt-5 text-xs text-slate-400">
        Discover products picked for you
      </p>
    </div>
  );
}
