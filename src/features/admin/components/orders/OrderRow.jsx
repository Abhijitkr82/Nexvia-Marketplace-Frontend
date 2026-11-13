
import { ADMIN_ORDER_STATUSES } from '../../../../constants/orderStatuses';
import { formatRupees, formatShortDate } from '../../../../utils/formatters';
import { ShoppingBag, UserRound, CalendarDays, RefreshCw } from 'lucide-react';

export default function OrderRow({
  order,
  orderStatusChanges,
  updatingOrderId,
  onSelectStatus,
  onUpdateStatus,
}) {
  const currentStatus = order.status || 'Pending';
  const selectedStatus = orderStatusChanges[order._id] ?? currentStatus;
  const isUpdating = updatingOrderId === order._id;
  const hasStatusChanged = selectedStatus !== currentStatus;

  const statusStyles = {
    Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    Cancelled: 'bg-red-50 text-red-700 ring-red-200',
    Shipped: 'bg-blue-50 text-blue-700 ring-blue-200',
    Processing: 'bg-amber-50 text-amber-700 ring-amber-200',
    Pending: 'bg-[#fbf5e8] text-[#956d25] ring-[#e8d5a9]',
  };

  const badgeStyle =
    statusStyles[currentStatus] ||
    'bg-slate-100 text-slate-600 ring-slate-200';

  return (
    <tr className="border-b border-slate-100 transition-colors duration-200 hover:bg-[#fbf8f0]/60">
      {/* Customer */}
      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8f3e8] text-[#8a682f]">
            <UserRound size={19} />
          </div>

          <div>
            <p className="font-semibold text-[#101b35]">
              {typeof order.customer === 'object'
                ? order.customer?.name || 'Unknown customer'
                : 'Unknown customer'}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {typeof order.customer === 'object'
                ? order.customer?.email || ''
                : ''}
            </p>
          </div>
        </div>
      </td>

      {/* Products */}
      <td className="px-5 py-4">
        <div className="min-w-[180px] space-y-3">
          {order.products?.length > 0 ? (
            order.products.map((item, index) => (
              <div
                key={item._id || item.product?._id || index}
                className="flex items-start gap-2"
              >
                <ShoppingBag
                  size={15}
                  className="mt-0.5 shrink-0 text-[#a17a3d]"
                />

                <div>
                  <p className="font-medium text-[#101b35]">
                    {item.product?.title || 'Product unavailable'}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Quantity: {item.quantity || 0}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span className="text-sm text-slate-400">
              No products
            </span>
          )}
        </div>
      </td>

      {/* Total */}
      <td className="whitespace-nowrap px-5 py-4">
        <span className="font-bold text-[#101b35]">
          {formatRupees(order.totalAmount)}
        </span>
      </td>

      {/* Status and actions */}
      <td className="px-5 py-4">
        <div className="flex min-w-[170px] flex-col items-start gap-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${badgeStyle}`}
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
            {currentStatus}
          </span>

          {currentStatus === 'Cancelled' ? (
            <span className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600">
              Order cancellation is locked
            </span>
          ) : (
            <>
              <select
                value={selectedStatus}
                onChange={(e) => onSelectStatus(order._id, e.target.value)}
                disabled={isUpdating}
                aria-label={`Change status for order ${order._id}`}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-[#101b35] outline-none transition focus:border-[#a17a3d] focus:ring-2 focus:ring-[#d9b879]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {ADMIN_ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => onUpdateStatus(order)}
                disabled={isUpdating || !hasStatusChanged}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#101b35] px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1b2c50] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isUpdating ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Status'
                )}
              </button>
            </>
          )}
        </div>
      </td>

      {/* Order date */}
      <td className="whitespace-nowrap px-5 py-4">
        <span className="inline-flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={15} className="text-[#a17a3d]" />
          {formatShortDate(order.createdAt)}
        </span>
      </td>
    </tr>
  );
}
