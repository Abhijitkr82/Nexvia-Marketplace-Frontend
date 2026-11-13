import { Link } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, Store } from 'lucide-react';

export default function LoginBrandPanel() {
  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-[#101b35] px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
      <div className="absolute -bottom-40 -left-24 h-[500px] w-[500px] rounded-full border border-white/10" />
      <div className="absolute right-20 top-1/3 h-64 w-64 rounded-full bg-[#c49a52]/10 blur-3xl" />

      <Link
        to="/login"
        className="relative z-10 inline-flex w-fit items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c49a52] text-[#101b35]">
          <ShoppingBag size={25} strokeWidth={2.5} />
        </div>
        <span className="text-2xl font-bold tracking-wide">NEXVIA</span>
      </Link>

      <div className="relative z-10 max-w-xl">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-[#e8c98f]">
          <ShieldCheck size={16} />
          Your marketplace, your possibilities
        </span>

        <h1 className="text-5xl font-bold leading-tight xl:text-6xl">
          Everything you need,
          <span className="mt-2 block text-[#d6b477]">all in one place.</span>
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
          Discover products, connect with trusted sellers and enjoy a simpler
          shopping experience with Nexvia.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <ShoppingBag className="mb-3 text-[#d6b477]" size={25} />
            <p className="font-semibold">Easy shopping</p>
            <p className="mt-1 text-sm text-slate-400">
              Explore products in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <Store className="mb-3 text-[#d6b477]" size={25} />
            <p className="font-semibold">Seller community</p>
            <p className="mt-1 text-sm text-slate-400">
              Grow your business with us.
            </p>
          </div>
        </div>
      </div>

      <p className="relative z-10 text-sm text-slate-400">
        © {new Date().getFullYear()} Nexvia Marketplace. All rights reserved.
      </p>
    </section>
  );
}
