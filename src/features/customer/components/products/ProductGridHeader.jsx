
import { Package, Sparkles } from 'lucide-react';

export default function ProductGridHeader({ productCount }) {
  return (
    <section id="product-grid" className="mb-8 scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">

        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-[#c49a52]" />

            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b38a48]">
              Curated for you
            </p>

            <Sparkles size={13} className="text-[#c49a52]" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#101b35] sm:text-4xl">
            Trending Products
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Discover exceptional finds from our marketplace, handpicked for
            your everyday needs.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 rounded-2xl border border-[#e8d7b8] bg-white px-4 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8f1e5] text-[#b38a48]">
            <Package size={19} />
          </div>

          <div>
            <p className="text-lg font-black leading-5 text-[#101b35]">
              {productCount}
            </p>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Products
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
