
import { MapPin, ShieldCheck } from 'lucide-react';

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-[#101b35] placeholder:text-slate-400 outline-none transition duration-200 hover:border-slate-300 focus:border-[#c49a52] focus:bg-white focus:ring-2 focus:ring-[#d9b879]/20';

const labelClass =
  'mb-1.5 block text-xs font-semibold text-slate-600';

export default function ShippingAddressSection({
  shippingAddress,
  onFieldChange,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Section heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d9b879]/30 bg-[#f8f3e9] text-[#a17a3d]">
          <MapPin size={19} />
        </div>

        <div>
          <h3 className="font-black text-[#101b35]">
            Shipping Address
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Where should we deliver your order?
          </p>
        </div>
      </div>

      {/* Address fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="shipping-street" className={labelClass}>
            Street Address
          </label>
          <input
            id="shipping-street"
            type="text"
            required
            autoComplete="street-address"
            value={shippingAddress.street}
            onChange={(e) => onFieldChange('street', e.target.value)}
            placeholder="House number, street and area"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipping-city" className={labelClass}>
            City
          </label>
          <input
            id="shipping-city"
            type="text"
            required
            autoComplete="address-level2"
            value={shippingAddress.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
            placeholder="Enter your city"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipping-state" className={labelClass}>
            State
          </label>
          <input
            id="shipping-state"
            type="text"
            required
            autoComplete="address-level1"
            value={shippingAddress.state}
            onChange={(e) => onFieldChange('state', e.target.value)}
            placeholder="Enter your state"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipping-zipcode" className={labelClass}>
            PIN Code
          </label>
          <input
            id="shipping-zipcode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            minLength={6}
            required
            value={shippingAddress.zipCode}
            onChange={(e) =>
              onFieldChange(
                'zipCode',
                e.target.value.replace(/\D/g, '').slice(0, 6)
              )
            }
            placeholder="6-digit PIN code"
            pattern="[0-9]{6}"
            title="Please enter a valid 6-digit PIN code"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="shipping-country" className={labelClass}>
            Country
          </label>
          <input
            id="shipping-country"
            type="text"
            required
            autoComplete="country-name"
            value={shippingAddress.country}
            onChange={(e) => onFieldChange('country', e.target.value)}
            placeholder="Enter your country"
            className={inputClass}
          />
        </div>
      </div>

      {/* Privacy note */}
      <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-3">
        <ShieldCheck
          size={16}
          className="mt-0.5 shrink-0 text-emerald-600"
        />
        <p className="text-xs leading-5 text-slate-500">
          Your delivery information is used to process and deliver your order.
        </p>
      </div>
    </section>
  );
}
