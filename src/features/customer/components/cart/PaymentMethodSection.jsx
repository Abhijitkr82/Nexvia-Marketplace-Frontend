
import {
  CreditCard,
  Truck,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function PaymentMethodSection({
  paymentMethod,
  isCheckingOut,
  onChange,
}) {
  const methods = [
    {
      value: 'Razorpay',
      title: 'Online Payment',
      description: 'Pay securely using Razorpay',
      icon: CreditCard,
      badge: 'Digital payment',
    },
    {
      value: 'COD',
      title: 'Cash on Delivery',
      description: 'Pay when your order arrives',
      icon: Truck,
      badge: 'Pay on delivery',
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Section heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d9b879]/30 bg-[#f8f3e9] text-[#a17a3d]">
          <CreditCard size={19} />
        </div>

        <div>
          <h3 className="font-black text-[#101b35]">
            Payment Method
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Choose how you want to pay.
          </p>
        </div>
      </div>

      {/* Payment options */}
      <div className="space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = paymentMethod === method.value;

          return (
            <label
              key={method.value}
              className={`relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition duration-200 ${
                isSelected
                  ? 'border-[#c49a52] bg-[#fcfaf5] shadow-sm shadow-[#c49a52]/10'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              } ${
                isCheckingOut
                  ? 'cursor-not-allowed opacity-70'
                  : ''
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={isSelected}
                onChange={() => onChange(method.value)}
                disabled={isCheckingOut}
                className="h-4 w-4 shrink-0 accent-[#101b35] focus:ring-[#c49a52]"
              />

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  isSelected
                    ? 'bg-[#101b35] text-[#d9b879]'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Icon size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[#101b35]">
                    {method.title}
                  </p>

                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                    {method.badge}
                  </span>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {method.description}
                </p>
              </div>

              {isSelected && (
                <CheckCircle2
                  size={19}
                  className="shrink-0 text-[#a17a3d]"
                />
              )}
            </label>
          );
        })}
      </div>

      {/* Security information */}
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3">
        <ShieldCheck
          size={16}
          className="shrink-0 text-emerald-600"
        />
        <p className="text-xs leading-5 text-slate-500">
          Select your preferred payment method before placing your order.
        </p>
      </div>
    </section>
  );
}
