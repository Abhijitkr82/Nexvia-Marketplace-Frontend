
import { LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react';

export default function AdminHeader({ onLogout }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101b35]/95 px-4 py-3 shadow-lg shadow-[#101b35]/10 backdrop-blur-md sm:px-6 sm:py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        {/* Admin Branding */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d9b879]/30 bg-white/10 text-[#e3c78e] shadow-inner sm:h-12 sm:w-12">
            <LayoutDashboard size={24} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-black tracking-tight text-white sm:text-xl">
                Nexvia Admin
              </h1>

              <ShieldCheck
                size={17}
                className="shrink-0 text-[#d9b879]"
                aria-label="Admin panel"
              />
            </div>

            <p className="mt-0.5 truncate text-xs font-medium text-slate-300">
              Marketplace Administration
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          aria-label="Logout from admin dashboard"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-red-300/20 bg-red-500/10 px-3 py-2.5 text-sm font-bold text-red-200 transition-all duration-200 hover:border-red-300/40 hover:bg-red-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-[#101b35] sm:px-4"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
}
