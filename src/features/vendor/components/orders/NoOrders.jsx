
import { ShoppingBag, ClipboardList } from 'lucide-react';

export default function NoOrders() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d9b879]/60 bg-white px-5 py-12 text-center shadow-sm sm:px-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#fbf8f0] text-[#a17a3d]">
        <ShoppingBag size={38} strokeWidth={1.5} />
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-tight text-[#101b35]">
        No Orders Yet
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
        No customer orders containing your products have been received yet.
        New orders will appear here when customers make a purchase.
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
        <ClipboardList size={14} className="text-[#a17a3d]" />
        Your order activity will appear here
      </div>
    </div>
  );
}
