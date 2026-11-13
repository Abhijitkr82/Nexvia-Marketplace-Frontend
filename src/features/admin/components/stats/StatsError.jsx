
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function StatsError({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="mt-6 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50/80 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <AlertCircle size={21} />
        </div>

        <div>
          <h3 className="font-semibold text-red-800">
            Unable to load statistics
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-red-700">
            {message}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
      >
        <RefreshCw size={16} />
        Retry statistics
      </button>
    </div>
  );
}
