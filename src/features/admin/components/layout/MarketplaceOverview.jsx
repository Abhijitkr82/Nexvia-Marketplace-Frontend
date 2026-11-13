
import { ShieldCheck, Database, Store } from 'lucide-react';

export default function MarketplaceOverview() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#101b35] text-[#d9b879]">
          <Store size={22} />
        </div>

        <div>
          <h3 className="font-semibold text-[#101b35]">
            Marketplace Overview
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Platform data and administration
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <ShieldCheck size={19} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800">
              Protected Admin Access
            </p>

            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              Dashboard statistics, user records and vendor records are loaded
              from protected admin APIs.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
          <Database size={17} className="text-[#a17a3d]" />
          <span className="text-xs font-medium text-slate-600">
            Connected to marketplace data services
          </span>
        </div>
      </div>
    </section>
  );
}
