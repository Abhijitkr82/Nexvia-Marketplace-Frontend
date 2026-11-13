
import { useNavigate } from 'react-router-dom';
import { Store, UserRound, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import useProfile from '../hooks/useProfile';

export default function VendorProfile() {
  const navigate = useNavigate();

  const { profile, message } = useProfile(
    'Vendor profile load karne me error aaya.',
  );

  return (
    <div className="min-h-screen bg-[#f5f6f9] px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        {/* Page Heading */}
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b38a48]">
            Vendor Account
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#101b35] sm:text-4xl">
            Store Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View your registered vendor account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-[#101b35] to-[#203456] p-6 sm:p-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d9b879]/40 bg-white/10 text-[#e3c78e]">
              <Store size={32} strokeWidth={1.6} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Vendor Information
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                Your registered store account details.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* Error Message */}
            {message && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700"
              >
                {message}
              </div>
            )}

            {/* Account Details */}
            <div className="space-y-6">

              {/* Vendor Name */}
              <div>
                <label
                  htmlFor="vendor-name"
                  className="mb-2 block text-sm font-bold text-[#101b35]"
                >
                  Vendor Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="vendor-name"
                    type="text"
                    value={profile.name || ''}
                    readOnly
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              {/* Store Email */}
              <div>
                <label
                  htmlFor="vendor-email"
                  className="mb-2 block text-sm font-bold text-[#101b35]"
                >
                  Store Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="vendor-email"
                    type="email"
                    value={profile.email || ''}
                    readOnly
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>

              {/* Read-only Notice */}
              <div className="flex items-start gap-3 rounded-xl border border-[#d9b879]/30 bg-[#faf7ef] p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#a17a3d]"
                />

                <div>
                  <p className="text-sm font-bold text-[#101b35]">
                    Account Information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    These details are currently read-only and are displayed
                    from your registered vendor account.
                  </p>
                </div>
              </div>

              {/* Dashboard Button */}
              <div className="border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/vendor-dashboard')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#101b35] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203456] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#c49a52] focus:ring-offset-2"
                >
                  <ArrowLeft size={17} />
                  Back to Dashboard
                </button>
              </div>

            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Nexvia Marketplace · Vendor Account
        </p>

      </div>
    </div>
  );
}
