
import VendorStatusBadge from './VendorStatusBadge';
import { formatShortDate } from '../../../../utils/formatters';
import { Calendar, UserRound, Check, X } from 'lucide-react';

export default function VendorRow({
  vendor,
  updatingVendorId,
  onStatusUpdate,
}) {
  const vendorStatus = vendor.vendorStatus || 'pending';
  const isUpdating = updatingVendorId === vendor._id;

  return (
    <tr className="border-b border-slate-100 transition-colors duration-200 hover:bg-[#fbf8f0]/60">
      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8f3e8] text-[#8a682f]">
            <UserRound size={20} />
          </div>

          <div>
            <p className="font-semibold text-[#101b35]">
              {vendor.name || '—'}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Vendor ID: {vendor._id?.slice(-8) || '—'}
            </p>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
        {vendor.email || '—'}
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
        {vendor.phone || '—'}
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <Calendar size={15} className="text-[#a17a3d]" />
          {formatShortDate(vendor.createdAt)}
        </span>
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <VendorStatusBadge status={vendorStatus} />
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        {vendorStatus === 'pending' ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStatusUpdate(vendor, 'approved')}
              disabled={isUpdating}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={14} />
              {isUpdating ? 'Updating...' : 'Approve'}
            </button>

            <button
              type="button"
              onClick={() => onStatusUpdate(vendor, 'rejected')}
              disabled={isUpdating}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={14} />
              Reject
            </button>
          </div>
        ) : (
          <span className="text-xs font-medium text-slate-400">
            No action required
          </span>
        )}
      </td>
    </tr>
  );
}
