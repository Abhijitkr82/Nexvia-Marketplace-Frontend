
import { useNavigate } from 'react-router-dom';
import { UserRound, LogOut } from 'lucide-react';

export default function VendorHeader({ onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 px-3 py-3 shadow-sm backdrop-blur-md sm:px-6 sm:py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 sm:gap-4">

        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#101b35] text-lg font-black tracking-wide text-[#d9b879] shadow-sm sm:h-11 sm:w-11">
            NX
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight text-[#101b35] sm:text-xl">
              Nexvia Vendor Portal
            </h1>
            <p className="mt-0.5 hidden text-xs text-slate-500 sm:block sm:text-sm">
              Manage your store and inventory
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/vendor-profile')}
            aria-label="Open store profile"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#d9b879]/50 bg-[#fbf8f0] px-2.5 py-2.5 text-sm font-semibold text-[#765a2d] transition-all duration-200 hover:border-[#c49a52] hover:bg-[#f5eddc] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/40 focus:ring-offset-2 sm:gap-2 sm:px-3"
          >
            <UserRound size={17} />
            <span className="hidden sm:inline">Store Profile</span>
            <span className="sm:hidden">Profile</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            aria-label="Logout from vendor account"
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-2.5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 sm:gap-2 sm:px-3"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}
