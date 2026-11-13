import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Store,
  UserRound,
} from 'lucide-react';

export default function RegisterForm({
  name,
  email,
  password,
  role,
  error,
  showPassword,
  loading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onRoleChange,
  onTogglePassword,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Full name
        </label>

        <div className="relative">
          <UserRound
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#3157a4] focus:ring-4 focus:ring-[#3157a4]/10"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#3157a4] focus:ring-4 focus:ring-[#3157a4]/10"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
            required
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#3157a4] focus:ring-4 focus:ring-[#3157a4]/10"
          />

          <button
            type="button"
            onClick={() => onTogglePassword()}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#3157a4]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Register as
        </label>

        <div className="relative">
          <Store
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            id="role"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-[#3157a4] focus:ring-4 focus:ring-[#3157a4]/10"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#101b35] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#101b35]/15 transition hover:bg-[#1b2b4d] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Creating account...' : 'Create your account'}

        {!loading && (
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        )}
      </button>
    </form>
  );
}
