
import { useNavigate } from 'react-router-dom';
import { UserRound, Mail, Save, ArrowLeft } from 'lucide-react';
import useProfile from '../hooks/useProfile';

export default function CustomerProfile() {
  const navigate = useNavigate();

  const { profile, setProfile, message, handleUpdate } = useProfile(
    'Failed to load profile data.',
  );

  const isError =
    message?.toLowerCase().includes('failed') ||
    message?.toLowerCase().includes('error');

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-[#101b35] outline-none transition placeholder:text-slate-400 focus:border-[#c49a52] focus:ring-2 focus:ring-[#d9b879]/20';

  return (
    <div className="min-h-screen bg-[#f5f6f9] px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">

        {/* Page Heading */}
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b38a48]">
            Your Account
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#101b35] sm:text-4xl">
            Customer Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-[#101b35] to-[#203456] p-6 sm:p-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d9b879]/40 bg-white/10 text-[#e3c78e]">
              <UserRound size={32} strokeWidth={1.6} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Keep your profile details up to date.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            {/* Status Message */}
            {message && (
              <div
                role={isError ? 'alert' : 'status'}
                aria-live="polite"
                className={`mb-6 rounded-xl border p-4 text-sm font-medium ${
                  isError
                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                }`}
              >
                {message}
              </div>
            )}

            {/* Profile Form */}
            <form onSubmit={handleUpdate} className="space-y-6">

              {/* Name */}
              <div>
                <label
                  htmlFor="customer-name"
                  className="mb-2 block text-sm font-bold text-[#101b35]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="customer-name"
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className={inputClass}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="customer-email"
                  className="mb-2 block text-sm font-bold text-[#101b35]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="customer-email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="Enter your email address"
                    className={inputClass}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">

                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#101b35] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#203456] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#c49a52] focus:ring-offset-2"
                >
                  <Save size={17} />
                  Update Profile
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/customer-dashboard')}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-[#101b35] transition-all duration-200 hover:border-[#c49a52] hover:bg-[#fffdf8] focus:outline-none focus:ring-2 focus:ring-[#c49a52] focus:ring-offset-2"
                >
                  <ArrowLeft size={17} />
                  Back to Dashboard
                </button>

              </div>
            </form>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Your account information is managed securely.
        </p>
      </div>
    </div>
  );
}
