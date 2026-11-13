
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ProductsError({ message }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-gradient-to-b from-red-50 to-white px-5 py-14 text-center shadow-sm"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
        <AlertCircle size={32} strokeWidth={1.8} />
      </div>

      <h3 className="text-lg font-extrabold text-[#101b35]">
        Unable to Load Products
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message || 'Something went wrong while fetching products. Please try again later.'}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2 text-xs font-bold text-red-500">
        <RefreshCw size={14} />
        Please refresh the page
      </div>
    </div>
  );
}
