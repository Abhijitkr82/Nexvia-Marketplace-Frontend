
import { ClipboardList } from 'lucide-react';
import OrdersHeader from './OrdersHeader';
import NoOrders from './NoOrders';
import VendorOrderCard from './VendorOrderCard';

export default function OrdersTab({
  orders,
  loadingOrders,
  updatingOrderId,
  onRefresh,
  onStatusChange,
}) {
  return (
    <section className="space-y-6">
      <OrdersHeader
        loadingOrders={loadingOrders}
        onRefresh={onRefresh}
      />

      {loadingOrders ? (
        <div
          className="space-y-5"
          aria-label="Loading orders"
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-100" />
                  <div className="h-3 w-24 rounded bg-slate-100" />
                </div>
                <div className="h-7 w-24 rounded-full bg-slate-100" />
              </div>

              <div className="mt-5 space-y-3">
                <div className="h-4 w-3/4 rounded bg-slate-100" />
                <div className="h-4 w-1/2 rounded bg-slate-100" />
              </div>

              <div className="mt-5 flex justify-between gap-4">
                <div className="h-8 w-24 rounded bg-slate-100" />
                <div className="h-10 w-32 rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <NoOrders />
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ClipboardList size={17} className="text-[#a17a3d]" />
            <span>
              <span className="font-semibold text-[#101b35]">
                {orders.length}
              </span>{' '}
              {orders.length === 1 ? 'order' : 'orders'} found
            </span>
          </div>

          <div className="space-y-5">
            {orders.map((order) => (
              <VendorOrderCard
                key={order._id}
                order={order}
                updatingOrderId={updatingOrderId}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
