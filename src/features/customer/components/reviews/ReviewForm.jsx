export default function ReviewForm({
  rating,
  onRatingChange,
  comment,
  onCommentChange,
  submitting,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-7 rounded-xl border border-slate-200 p-4"
    >
      <h3 className="mb-3 font-bold text-slate-900">Write a review</h3>

      <label className="mb-2 block text-sm font-medium text-slate-600">
        Your rating
      </label>

      <div className="mb-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onRatingChange(value)}
            className={`text-3xl ${
              value <= rating ? 'text-amber-400' : 'text-slate-300'
            }`}
            aria-label={`Rate ${value} out of 5`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        maxLength={1000}
        rows={3}
        placeholder="Share your experience with this product..."
        className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="mt-1 text-right text-xs text-slate-400">
        {comment.length}/1000
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="mt-3 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
