import { formatLocaleDate } from '../../../../utils/formatters';

export default function ReviewCard({ review }) {
  return (
    <article className="rounded-xl border border-slate-100 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold text-slate-800">
          {review.customer?.name || 'Customer'}
        </p>
        <span className="text-sm text-amber-400">
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {review.comment}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {review.createdAt ? formatLocaleDate(review.createdAt) : ''}
      </p>
    </article>
  );
}
