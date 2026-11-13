
const STYLES = {
  admin: 'bg-[#101b35] text-white ring-1 ring-[#101b35]/10',
  vendor: 'bg-[#f8f3e8] text-[#8a682f] ring-1 ring-[#d9b879]/30',
  customer: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
};

export default function RoleBadge({ role }) {
  const normalizedRole = role?.toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
        STYLES[normalizedRole] ||
        'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
      }`}
    >
      {normalizedRole || 'Unknown'}
    </span>
  );
}
