
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function FlashMessage({ message, type }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mb-5 flex items-start gap-3 rounded-xl border p-4 shadow-sm ${
        isSuccess
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {isSuccess ? (
          <CheckCircle2 size={20} className="text-emerald-600" />
        ) : (
          <AlertCircle size={20} className="text-red-600" />
        )}
      </div>

      <p className="min-w-0 flex-1 text-sm font-medium leading-relaxed">
        {message}
      </p>
    </div>
  );
}
