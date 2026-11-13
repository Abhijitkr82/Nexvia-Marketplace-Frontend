
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { tab: 'overview', label: 'Overview', icon: LayoutDashboard },
  { tab: 'products', label: 'My Products', icon: Package },
  { tab: 'orders', label: 'Orders', icon: ShoppingCart },
  { tab: 'add-product', label: 'Add New Product', icon: PlusCircle },
];

export default function VendorSidebar({ activeTab, onSelectTab }) {
  return (
    <aside className="shrink-0 border-b border-slate-200/80 bg-white p-3 md:w-64 md:border-b-0 md:border-r md:p-5">
      {/* Sidebar Heading */}
      <div className="mb-6 hidden px-3 md:block">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a17a3d]">
          Workspace
        </p>
        <h2 className="mt-1 text-lg font-bold text-[#101b35]">
          Store Management
        </h2>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Vendor dashboard navigation"
        className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0"
      >
        {NAV_ITEMS.map(({ tab, label, icon: Icon }) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onSelectTab(tab)}
              aria-current={isActive ? 'page' : undefined}
              className={`group flex shrink-0 items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d9b879]/40 md:w-full md:py-3.5 ${
                isActive
                  ? 'bg-[#101b35] text-white shadow-md shadow-[#101b35]/10'
                  : 'text-slate-600 hover:bg-[#fbf8f0] hover:text-[#765a2d]'
              }`}
            >
              <span className="flex items-center gap-2.5 md:gap-3">
                <Icon
                  size={19}
                  className={
                    isActive
                      ? 'shrink-0 text-[#d9b879]'
                      : 'shrink-0 text-slate-400 transition-colors group-hover:text-[#a17a3d]'
                  }
                />
                <span className="whitespace-nowrap">{label}</span>
              </span>

              <ChevronRight
                size={16}
                className={`hidden shrink-0 transition-all duration-200 md:block ${
                  isActive
                    ? 'translate-x-0 text-[#d9b879] opacity-100'
                    : '-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
