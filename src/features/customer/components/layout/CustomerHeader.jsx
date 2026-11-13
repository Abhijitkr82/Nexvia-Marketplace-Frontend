
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Search,
  ShoppingBag,
  ShoppingCart,
  UserRound,
} from 'lucide-react';

export default function CustomerHeader({
  searchQuery,
  onSearchChange,
  showOrders,
  onToggleOrders,
  onOpenCart,
  cartCount,
  onLogout,
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101b35]/95 text-white shadow-xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-10">

        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate('/customer-dashboard')}
          aria-label="Go to Nexvia home"
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e6c995] to-[#a77a35] text-[#101b35] shadow-lg transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105 sm:h-11 sm:w-11">
            <ShoppingBag size={23} strokeWidth={2.5} />
          </span>

          <span className="text-left">
            <span className="block text-lg font-black tracking-[0.12em] sm:text-xl">
              NEXVIA
            </span>

            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d9b879] sm:block">
              Premium Marketplace
            </span>
          </span>
        </button>

        {/* Navigation */}
        <div className="order-2 flex items-center gap-2 sm:gap-3 md:order-3">

          {/* Profile */}
          <button
            type="button"
            onClick={() => navigate('/customer-profile')}
            aria-label="Profile"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-[#d9b879]/50 hover:bg-white/10 hover:text-[#e2c48c] sm:flex"
          >
            <UserRound size={17} />
            <span>Profile</span>
          </button>

          {/* My Orders */}
          <button
            type="button"
            onClick={onToggleOrders}
            aria-pressed={showOrders}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold shadow-sm transition-all duration-200 sm:px-4 sm:text-sm ${
              showOrders
                ? 'border-[#d9b879] bg-[#d9b879] text-[#101b35]'
                : 'border-white/10 bg-white/5 text-slate-200 hover:border-[#d9b879]/50 hover:bg-white/10 hover:text-[#e2c48c]'
            }`}
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">My Orders</span>
            <span className="sm:hidden">Orders</span>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open cart, ${cartCount} items`}
            className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#e6c995] to-[#c49a52] px-3 py-2.5 text-xs font-black text-[#101b35] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 sm:px-4 sm:text-sm"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#101b35] px-1 text-[10px] font-black text-white">
              {cartCount}
            </span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            aria-label="Logout"
            className="flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-red-300/40 hover:bg-red-500/10 hover:text-red-200 sm:text-sm"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative order-3 w-full md:order-2 md:mx-6 md:max-w-xl md:flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products, brands and more..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products"
            className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-400 focus:border-[#d9b879] focus:bg-white/[0.14] focus:ring-2 focus:ring-[#d9b879]/10"
          />
        </div>

      </div>
    </header>
  );
}
