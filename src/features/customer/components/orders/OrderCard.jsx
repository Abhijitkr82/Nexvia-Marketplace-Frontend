
import OrderItemRow from './OrderItemRow';
import { CUSTOMER_CANCELLABLE_STATUSES } from '../../../../constants/orderStatuses';
import {
  formatAddress,
  formatDateTime,
  formatPrice,
} from '../../../../utils/formatters';
import { getOrderAmount, getOrderStatusClass } from '../../utils/orders';
import { MapPin, Package, CalendarDays } from 'lucide-react';

export default function OrderCard({
  order,
  orderId,
  cancellingOrderId,
  onCancel,
}) {
  const orderProducts = Array.isArray(order.products)
    ? order.products
    : [];

  const amount = getOrderAmount(order);

  const isCancelling = cancellingOrderId === order._id;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-[#d9b879]/70 hover:shadow-md">

      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#f8f9fc] to-white p-5 sm:p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Order ID
          </p>

          <p className="mt-1 text-base font-black tracking-wide text-[#101b35]">
            #{String(orderId).slice(-8)}
          </p>

          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays size={13} />
            Placed: {formatDateTime(order.createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span
            className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getOrderStatusClass(order.status)}`}
          >
            {order.status || 'Pending'}
          </span>

          <span className="text-xs font-medium text-slate-500">
            Payment: {order.paymentStatus || 'Unknown'}
          </span>
        </div>
      </div>

      {/* Products */}
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Package size={16} className="text-[#b38a48]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Order Items ({orderProducts.length})
          </h3>
        </div>

        <div className="space-y-4">
          {orderProducts.map((item, itemIndex) => {
            const product = item.product || item;
            const productId =
              product._id || item._id || itemIndex;

            return (
              <OrderItemRow
                key={`${productId}-${itemIndex}`}
                item={item}
              />
            );
          })}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-5 sm:px-6">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <MapPin size={15} className="text-[#b38a48]" />
          Shipping Address
        </p>

        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          {formatAddress(order.shippingAddress)}
        </p>
      </div>

      {/* Order Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 p-5 sm:px-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Order Total
          </span>

          <p className="mt-1 text-2xl font-black tracking-tight text-[#101b35]">
            {formatPrice(amount)}
          </p>
        </div>

        <div>
          {CUSTOMER_CANCELLABLE_STATUSES.includes(order.status) && (
            <button
              type="button"
              onClick={() => onCancel(order._id)}
              disabled={isCancelling}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}

          {order.status === 'Cancelled' && (
            <span className="inline-flex items-center rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600">
              Order Cancelled
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
