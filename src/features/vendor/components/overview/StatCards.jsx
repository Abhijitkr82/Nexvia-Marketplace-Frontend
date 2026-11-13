
import {
  Package,
  Boxes,
  Wallet,
  Clock3,
  ArrowRight,
} from 'lucide-react';

import { formatCurrencyINR } from '../../../../utils/formatters';

export default function StatCards({
  totalProducts = 0,
  totalStock = 0,
  totalInventoryValue = 0,
  pendingOrders = 0,
  onViewOrders,
}) {
  const cards = [
    {
      title: 'Total Products',
      value: Number(totalProducts || 0).toLocaleString('en-IN'),
      description: 'Your product listings',
      icon: Package,
      iconBg: 'bg-[#f8f3e8]',
      iconColor: 'text-[#a17a3d]',
    },
    {
      title: 'Total Stock Units',
      value: Number(totalStock || 0).toLocaleString('en-IN'),
      description: 'Units across your products',
      icon: Boxes,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Inventory Value',
      value: formatCurrencyINR(Number(totalInventoryValue) || 0),
      description: 'Price × stock; not sales revenue',
      icon: Wallet,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Pending Orders',
      value: Number(pendingOrders || 0).toLocaleString('en-IN'),
      description: 'Orders awaiting processing',
      icon: Clock3,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      action: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d9b879]/60 hover:shadow-lg sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-3 break-words text-2xl font-bold tracking-tight text-[#101b35] sm:text-3xl">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={24} className={card.iconColor} />
              </div>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-xs leading-relaxed text-slate-500">
                {card.description}
              </p>

              {card.action && (
                <button
                  type="button"
                  onClick={onViewOrders}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-xs font-bold text-[#a17a3d] transition-colors hover:text-[#765a2d] focus:outline-none focus:ring-2 focus:ring-[#d9b879]/50 focus:ring-offset-2"
                >
                  View orders
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
