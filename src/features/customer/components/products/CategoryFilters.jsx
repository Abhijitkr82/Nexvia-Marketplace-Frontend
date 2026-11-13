
export default function CategoryFilters({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#b38a48]">
            Browse by interest
          </p>

          <h2 className="mt-1.5 text-2xl font-black tracking-tight text-[#101b35]">
            Shop Categories
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Explore products from different categories.
          </p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 [scrollbar-width:thin] [scrollbar-color:#c49a52_transparent]">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(cat)}
              className={`group relative shrink-0 overflow-hidden rounded-xl border px-5 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c49a52] focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-[#101b35] bg-[#101b35] text-white shadow-lg shadow-[#101b35]/15'
                  : 'border-slate-200/80 bg-white text-slate-600 shadow-sm hover:-translate-y-0.5 hover:border-[#c49a52]/60 hover:bg-[#fffdf8] hover:text-[#101b35] hover:shadow-md'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {cat}

                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d9b879] shadow-[0_0_8px_#d9b879]" />
                )}
              </span>

              {!isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#c49a52] transition-transform duration-300 group-hover:scale-x-100" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
