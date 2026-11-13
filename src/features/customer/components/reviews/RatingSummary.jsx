export default function RatingSummary({ averageRating, reviewCount }) {
  return (
    <div className="mb-6 rounded-xl bg-blue-50 p-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl font-black text-slate-900">
          {Number(averageRating).toFixed(1)}
        </span>
        <div>
          <div className="text-xl tracking-wider text-amber-400">
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
          </div>
          <p className="text-sm text-slate-600">
            Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>
    </div>
  );
}
