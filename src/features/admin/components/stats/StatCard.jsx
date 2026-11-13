
export default function StatCard({ card, loading }) {
  const Icon = card.icon;

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b879]/60 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">
            {card.title}
          </p>

          {loading ? (
            <div className="mt-4 h-9 w-28 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="mt-3 text-2xl font-bold tracking-tight text-[#101b35] sm:text-3xl">
              {card.title === 'Order Value'
                ? card.value
                : Number(card.value).toLocaleString('en-IN')}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.bg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`${card.color}`} size={25} />
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-sm leading-relaxed text-slate-500">
          {card.detail}
        </p>
      </div>
    </div>
  );
}
