
import { formatPrice } from '../../../../utils/formatters';
import {
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Tag,
  ShoppingBag,
} from 'lucide-react';

export default function CartSummary({
  totalPrice,
  appliedCoupon,
  finalTotal,
  isCheckingOut,
  paymentMethod,
  onCheckout,
}) {
  return (
    <div className="shrink-0 border-t border-slate-200 bg-white p-5 sm:p-7">
      {/* Price breakdown */}
      <div className="mb-5 space-y-3">
        {appliedCoupon && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold text-[#101b35]">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <Tag size={14} />
                Coupon Discount
              </span>
              <span className="font-bold text-emerald-700">
                - {formatPrice(appliedCoupon.discount)}
              </span>
            </div>
          </>
        )}

        {/* Final amount */}
        <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
          <div>
            <p className="text-sm font-bold text-slate-600">
              Total Amount
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              Inclusive of applied discounts
            </p>
          </div>

          <span className="text-2xl font-black tracking-tight text-[#101b35] sm:text-3xl">
            {formatPrice(finalTotal)}
          </span>
        </div>
      </div>

      {/* Checkout button */}
      <button
        type="button"
        onClick={onCheckout}
        disabled={isCheckingOut}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#101b35] py-4 text-sm font-black text-white shadow-lg shadow-[#101b35]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#203456] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#d9b879] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isCheckingOut ? (
          <>
            <RefreshCw size={17} className="animate-spin" />
            Processing Your Order...
          </>
        ) : (
          <>
            <ShoppingBag size={17} />
            {paymentMethod === 'COD'
              ? 'Place COD Order'
              : 'Pay with Razorpay'}
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      {/* Security note */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-emerald-600" />
        <p className="text-[10px] font-semibold text-slate-400">
          Secure checkout powered by Nexvia
        </p>
      </div>
    </div>
  );
}
