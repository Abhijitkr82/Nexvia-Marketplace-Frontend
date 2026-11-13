import { VENDOR_ORDER_STATUSES } from '../../../../constants/orderStatuses';
import {
  formatAddress,
  formatCurrencyINR,
  formatLocaleDateTime,
} from '../../../../utils/formatters';
import {
  CalendarDays,
  UserRound,
  MapPin,
  Package,
  ShoppingBag,
  RefreshCw,
  LockKeyhole,
} from 'lucide-react';

const NEXT_STATUS = {
  Pending: 'Processing',
  Processing: 'Shipped',
  Shipped: 'Delivered',
  Delivered: null,
  Cancelled: null,
};

const STATUS_STYLES = {
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Cancelled: 'bg-red-50 text-red-700 ring-red-200',
  Shipped: 'bg-blue-50 text-blue-700 ring-blue-200',
  Processing: 'bg-amber-50 text-amber-700 ring-amber-200',
  Pending: 'bg-[#fbf5e8] text-[#956d25] ring-[#e8d5a9]',
};

export default function VendorOrderCard({
  order,
  updatingOrderId,
  onStatusChange,
}) {
  const orderId = order._id;
  const shortOrderId = orderId?.slice(-8) || 'Unknown';
  const isUpdating = updatingOrderId === orderId;
  const currentStatus = order.status || 'Pending';
  const isCancelled = currentStatus === 'Cancelled';

  const badgeStyle =
    STATUS_STYLES[currentStatus] ||
    'bg-slate-100 text-slate-600 ring-slate-200';

  const vendorTotal = Number.isFinite(Number(order.vendorTotal))
    ? Number(order.vendorTotal)
    : (order.products || []).reduce((total, item) => {
        const quantity = Number(item.quantity) || 0;
        const lineTotal =
          item.lineTotal ??
          (item.unitPrice ?? item.product?.price ?? 0) * quantity;
        return total + (Number(lineTotal) || 0);
      }, 0);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-[#d9b879]/50 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-[#fbfaf7] px-5 py-5 sm:px-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-[#101b35]">
              Order #{shortOrderId}
            </h3>
            <span className="rounded-md bg-[#f5eddc] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8a682f]">
              Order
            </span>
          </div>
          <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays size={14} className="text-[#a17a3d]" />
            {formatLocaleDateTime(order.createdAt)}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${badgeStyle}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          Overall: {currentStatus}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fbf8f0] text-[#a17a3d]">
                <UserRound size={18} />
              </div>
              <h4 className="font-semibold text-[#101b35]">Customer Details</h4>
            </div>
            <p className="text-sm font-semibold text-slate-700">
              {order.customer?.name || 'Customer'}
            </p>
            <p className="mt-1 break-all text-sm text-slate-500">
              {order.customer?.email || 'Email unavailable'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fbf8f0] text-[#a17a3d]">
                <MapPin size={18} />
              </div>
              <h4 className="font-semibold text-[#101b35]">Shipping Address</h4>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {formatAddress(order.shippingAddress)}
            </p>
          </div>
        </div>

        <div className="mt-6 border-y border-slate-100 py-5">
          <div className="mb-4 flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#a17a3d]" />
            <h4 className="font-bold text-[#101b35]">Your Ordered Products</h4>
          </div>

          <div className="space-y-3">
            {order.products?.length > 0 ? (
              order.products.map((item, index) => {
                const product = item.product || {};
                const productId = product._id || item.product;
                const quantity = Number(item.quantity) || 0;
                const itemStatus = item.fulfillmentStatus || 'Pending';
                const nextStatus = NEXT_STATUS[itemStatus];
                const lineTotal =
                  item.lineTotal ??
                  (item.unitPrice ?? product.price ?? 0) * quantity;
                const itemIsLocked = isCancelled || itemStatus === 'Cancelled';
                const itemBadgeStyle =
                  STATUS_STYLES[itemStatus] ||
                  'bg-slate-100 text-slate-600 ring-slate-200';

                return (
                  <div
                    key={item._id || productId || index}
                    className="flex flex-col gap-3 rounded-xl bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#a17a3d] shadow-sm">
                        <Package size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="break-words text-sm font-semibold text-slate-700">
                          {product.title || 'Product unavailable'}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Quantity: {quantity}
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#101b35]">
                          {formatCurrencyINR(Number(lineTotal) || 0)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${itemBadgeStyle}`}
                      >
                        {itemStatus}
                      </span>

                      {itemIsLocked ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <LockKeyhole size={13} />
                          Locked
                        </span>
                      ) : nextStatus && VENDOR_ORDER_STATUSES.includes(nextStatus) ? (
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <span className="sr-only">
                            Update status for {product.title || 'product'}
                          </span>
                          <select
                            aria-label={`Update ${product.title || 'product'} status`}
                            value={itemStatus}
                            disabled={isUpdating}
                            onChange={(event) =>
                              onStatusChange(orderId, productId, event.target.value)
                            }
                            className="min-w-[145px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-[#101b35] outline-none transition focus:border-[#a17a3d] focus:ring-2 focus:ring-[#d9b879]/20 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <option value={itemStatus}>{itemStatus}</option>
                            <option value={nextStatus}>{nextStatus}</option>
                          </select>
                        </label>
                      ) : null}

                      {isUpdating && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                          <RefreshCw size={13} className="animate-spin" />
                          Saving
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-3 text-sm text-slate-400">
                No product details available.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 pt-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Your Products&apos; Total
            </p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-[#101b35]">
              {formatCurrencyINR(vendorTotal)}
            </p>
          </div>
          <p className="text-xs leading-5 text-slate-400 sm:max-w-xs sm:text-right">
            Update fulfillment separately for each product in this order.
          </p>
        </div>
      </div>
    </article>
  );
}
