
import { X, ShoppingBag } from 'lucide-react';

export default function CartDrawerHeader({ cartCount, onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#101b35] px-5 py-5 text-white sm:px-7">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d9b879]/25 bg-[#d9b879]/10 text-[#d9b879]">
          <ShoppingBag size={23} strokeWidth={1.8} />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d9b879]">
            Nexvia Checkout
          </p>

          <h2 className="mt-1 text-xl font-black tracking-tight">
            Your Shopping Cart
          </h2>

          <p className="mt-1 text-xs text-slate-300">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close cart"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition duration-200 hover:border-red-300/30 hover:bg-red-500/20 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-[#d9b879] focus:ring-offset-2 focus:ring-offset-[#101b35]"
      >
        <X size={20} />
      </button>
    </div>
  );
}
