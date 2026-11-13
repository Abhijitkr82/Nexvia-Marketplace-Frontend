
import OrderHistoryHeader from './OrderHistoryHeader';
import OrderCard from './OrderCard';
import NoOrders from './NoOrders';

// My Orders view: loading, error, empty states and order list.
export default function OrderHistory({
  orders,
  ordersLoading,
  ordersError,
  ordersActionMessage,
  cancellingOrderId,
  onRefresh,
  onCancel,
  onStartShopping,
}) {
  return (
    <section
      id="my-orders"
      aria-label="My Orders"
      className="space-y-6"
    >
      <OrderHistoryHeader
        ordersLoading={ordersLoading}
        onRefresh={onRefresh}
      />

      {/* Order action feedback */}
      {ordersActionMessage && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5 text-sm font-semibold text-blue-700 shadow-sm"
        >
          {ordersActionMessage}
        </div>
      )}

      {/* Loading state */}
      {ordersLoading ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
                  <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
                </div>

                <div className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-slate-100" />
                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-xs font-medium text-slate-400">
            Loading your orders...
          </p>
        </div>
      ) : ordersError ? (
        /* Error state */
        <div
          role="alert"
          className="rounded-2xl border border-red-100 bg-red-50 p-6 shadow-sm sm:p-8"
        >
          <p className="text-sm font-semibold leading-6 text-red-700">
            {ordersError}
          </p>

          <button
            type="button"
            onClick={onRefresh}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#101b35] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#203456] focus:outline-none focus:ring-2 focus:ring-[#d9b879] focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      ) : orders.length === 0 ? (
        /* Empty state */
        <NoOrders onStartShopping={onStartShopping} />
      ) : (
        /* Orders list */
        <div className="space-y-5">
          {orders.map((order, index) => {
            const orderId = order._id || order.id || index;

            return (
              <OrderCard
                key={orderId}
                order={order}
                orderId={orderId}
                cancellingOrderId={cancellingOrderId}
                onCancel={onCancel}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
