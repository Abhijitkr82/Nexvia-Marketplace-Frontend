
import { useState } from 'react';
import { Pencil, Power, TicketPercent } from 'lucide-react';

function formatDate(value) {
  if (!value) return '—';

  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatDiscount(coupon) {
  return coupon.discountType === 'percentage'
    ? `${coupon.discountValue}% OFF`
    : `₹${coupon.discountValue} OFF`;
}

export default function CouponTable({
  coupons,
  loading,
  error,
  onRetry,
  onEdit,
  onDeactivate,
  saving,
}) {
  const [confirmId, setConfirmId] = useState(null);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        Loading coupons...
      </div>
    );
  }

  if (error && coupons.length === 0) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={onRetry}
          className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <TicketPercent className="mx-auto mb-3 text-slate-400" size={32} />
        <p className="font-medium text-slate-700">No coupons created yet.</p>
        <p className="mt-1 text-sm text-slate-500">
          Create your first coupon to offer discounts.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      {error && (
        <p className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <table className="w-full min-w-[950px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-4">Coupon</th>
            <th className="px-5 py-4">Discount</th>
            <th className="px-5 py-4">Min. Order</th>
            <th className="px-5 py-4">Usage</th>
            <th className="px-5 py-4">Expiry</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {coupons.map((coupon) => {
            const inactive = !coupon.isActive;

            return (
              <tr key={coupon._id} className="hover:bg-slate-50/70">
                <td className="px-5 py-4">
                  <p className="font-bold tracking-wide text-[#101b35]">
                    {coupon.code}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Starts: {formatDate(coupon.startsAt)}
                  </p>
                </td>

                <td className="px-5 py-4 font-semibold text-[#a17a3d]">
                  {formatDiscount(coupon)}
                  {coupon.maxDiscount != null && (
                    <p className="mt-1 text-xs font-normal text-slate-500">
                      Max ₹{coupon.maxDiscount}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  ₹{coupon.minOrderAmount || 0}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {coupon.usedCount || 0} / {coupon.usageLimit ?? '∞'}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {formatDate(coupon.expiresAt)}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      inactive
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {inactive ? 'Inactive' : 'Active'}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(coupon)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-[#a17a3d] hover:text-[#a17a3d]"
                      title="Edit coupon"
                      aria-label={`Edit ${coupon.code}`}
                    >
                      <Pencil size={16} />
                    </button>

                    {!inactive && (
                      confirmId === coupon._id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setConfirmId(null)}
                            disabled={saving}
                            className="rounded-lg px-2 py-2 text-xs text-slate-500 hover:bg-slate-100"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={async () => {
                              await onDeactivate(coupon._id);
                              setConfirmId(null);
                            }}
                            disabled={saving}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            Confirm
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(coupon._id)}
                          disabled={saving}
                          className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                          title="Deactivate coupon"
                          aria-label={`Deactivate ${coupon.code}`}
                        >
                          <Power size={16} />
                        </button>
                      )
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
