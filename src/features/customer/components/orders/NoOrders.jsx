
import { Package, ShoppingBag, ArrowRight } from 'lucide-react';

export default function NoOrders({ onStartShopping }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm sm:px-8">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d9b879]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#101b35]/5 blur-3xl" />

      <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-[#d9b879]/30 bg-gradient-to-br from-[#faf7ef] to-[#f1ead9] text-[#a17a3d] shadow-sm">
        <ShoppingBag size={42} strokeWidth={1.5} />

        <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#101b35] text-white">
          <Package size={15} />
        </span>
      </div>

      <div className="relative mx-auto mt-7 max-w-md">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b38a48]">
          Your Shopping Journey
        </p>

        <h3 className="mt-3 text-2xl font-black tracking-tight text-[#101b35] sm:text-3xl">
          No orders yet
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          Looks like you haven't placed any orders yet.
          Explore our collection and find something you'll love.
          Your purchases will appear here after checkout.
        </p>

        <button
          type="button"
          onClick={onStartShopping}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#101b35] px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-[#101b35]/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203456] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c49a52] focus:ring-offset-2"
        >
          Start Shopping
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
