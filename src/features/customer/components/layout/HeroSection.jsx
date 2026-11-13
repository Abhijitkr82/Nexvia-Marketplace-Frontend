
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Star,
  CheckCircle2,
} from 'lucide-react';

export default function HeroSection({ onExplore }) {
  return (
    <section className="relative mb-10 overflow-hidden rounded-[28px] bg-[#101b35] shadow-2xl shadow-slate-900/15">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full border border-[#d9b879]/20" />
      <div className="pointer-events-none absolute -right-12 -top-16 h-72 w-72 rounded-full border border-[#d9b879]/20" />
      <div className="pointer-events-none absolute -bottom-32 left-[35%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[15%] h-72 w-72 rounded-full bg-[#c49a52]/15 blur-3xl" />

      <div className="relative z-10 grid items-center gap-12 px-6 py-12 sm:px-10 md:grid-cols-[1.1fr_0.9fr] md:px-14 md:py-16">

        {/* Left content */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d9b879]/30 bg-[#d9b879]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e6c995]">
            <Sparkles size={14} />
            Discover the Nexvia Experience
          </span>

          <h1 className="mt-7 max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[62px]">
            Find what you love.
            <span className="mt-2 block bg-gradient-to-r from-[#e8d2a6] via-[#d9b879] to-[#b98a43] bg-clip-text text-transparent">
              Shop with confidence.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Discover quality products from multiple vendors, explore
            exciting collections and enjoy a shopping experience
            designed around you.
          </p>

          <button
            onClick={onExplore}
            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#e6c995] to-[#c49a52] px-7 py-4 text-sm font-extrabold text-[#101b35] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d9b879]/20"
          >
            Explore Collection
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Trust features */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 border-t border-white/10 pt-7 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-[#d9b879]" />
              Secure Checkout
            </span>

            <span className="flex items-center gap-2">
              <Store size={17} className="text-[#d9b879]" />
              Multiple Vendors
            </span>

            <span className="flex items-center gap-2">
              <Truck size={17} className="text-[#d9b879]" />
              Easy Shopping
            </span>
          </div>
        </div>

        {/* Right visual showcase */}
        <div className="relative mx-auto flex w-full max-w-[390px] items-center justify-center py-8 md:py-0">

          <div className="absolute h-72 w-72 rounded-full border border-[#d9b879]/20 sm:h-80 sm:w-80" />
          <div className="absolute h-60 w-60 rounded-full border border-[#d9b879]/15 sm:h-64 sm:w-64" />

          <div className="relative flex h-56 w-56 items-center justify-center rounded-[42px] border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.03] shadow-2xl backdrop-blur-sm sm:h-64 sm:w-64">
            <div className="flex h-36 w-36 items-center justify-center rounded-[32px] bg-gradient-to-br from-[#f0dcb6] via-[#d9b879] to-[#a77a35] text-[#101b35] shadow-2xl sm:h-40 sm:w-40">
              <ShoppingBag size={82} strokeWidth={1.3} />
            </div>
          </div>

          {/* Premium floating card */}
          <div className="absolute -right-1 top-5 rounded-2xl border border-white/10 bg-[#203456]/95 px-4 py-3 shadow-xl backdrop-blur-md sm:-right-3 sm:top-8">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#d9b879]/15 p-2 text-[#e6c995]">
                <Star size={17} fill="currentColor" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-white">Premium Finds</p>
                <p className="mt-1 text-[10px] text-slate-400">Explore collections</p>
              </div>
            </div>
          </div>

          {/* Verified card */}
          <div className="absolute -left-2 bottom-3 rounded-2xl border border-white/10 bg-[#203456]/95 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-5 sm:bottom-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={19} className="text-[#d9b879]" />
              <div>
                <p className="text-xs font-extrabold text-white">Shop with trust</p>
                <p className="mt-1 text-[10px] text-slate-400">Made for you</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
