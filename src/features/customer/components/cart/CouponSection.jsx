
import { formatPrice } from '../../../../utils/formatters';
import {
  CheckCircle2,
  Tag,
  TicketPercent,
  X,
} from 'lucide-react';

export default function CouponSection({
  couponCode,
  appliedCoupon,
  couponMessage,
  isApplyingCoupon,
  isCheckingOut,
  onCodeChange,
  onApply,
  onRemove,
}) {
  return (
    <section className="rounded-2xl border border-[#e7ddc9] bg-gradient-to-br from-[#fcfaf5] to-[#f8f3e9] p-4 shadow-sm sm:p-5">
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d9b879]/30 bg-white text-[#a17a3d]">
          <TicketPercent size={19} />
        </div>

        <div>
          <h3 className="font-black text-[#101b35]">
            Have a coupon code?
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Apply an offer and save on your order.
          </p>
        </div>
      </div>

      {/* Coupon input and action */}
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Enter coupon code"
          aria-label="Coupon code"
          disabled={
            isApplyingCoupon ||
            isCheckingOut ||
            !!appliedCoupon
          }
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold uppercase text-[#101b35] placeholder:font-normal placeholder:normal-case placeholder:text-slate-400 outline-none transition focus:border-[#c49a52] focus:ring-2 focus:ring-[#d9b879]/20 disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        {appliedCoupon ? (
          <button
            type="button"
            onClick={onRemove}
            disabled={isCheckingOut}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 text-xs font-black text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={14} />
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={onApply}
            disabled={
              isApplyingCoupon ||
              isCheckingOut ||
              !couponCode.trim()
            }
            className="shrink-0 rounded-xl bg-[#101b35] px-5 text-xs font-black text-white shadow-md shadow-[#101b35]/10 transition duration-200 hover:bg-[#203456] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isApplyingCoupon ? 'Checking...' : 'Apply'}
          </button>
        )}
      </div>

      {/* Coupon feedback */}
      {couponMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-3 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold ${
            appliedCoupon
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-600'
          }`}
        >
          {appliedCoupon && (
            <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
          )}
          <span>{couponMessage}</span>
        </div>
      )}

      {/* Applied coupon discount */}
      {appliedCoupon && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={17}
              className="shrink-0 text-emerald-600"
            />
            <div>
              <p className="text-xs font-black text-emerald-800">
                Coupon applied!
              </p>
              <p className="mt-0.5 text-[11px] text-emerald-700">
                You're saving on this order.
              </p>
            </div>
          </div>

          <span className="text-sm font-black text-emerald-700">
            -{formatPrice(appliedCoupon.discount)}
          </span>
        </div>
      )}
    </section>
  );
}
