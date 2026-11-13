
const STYLES = {
  approved: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  rejected: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  pending: 'bg-[#fbf5e8] text-[#956d25] ring-1 ring-[#e8d5a9]',
};

export default function VendorStatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase() || 'unknown';

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
        STYLES[normalizedStatus] ||
        'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
      }`}
    >
      <span
        className={`mr-2 h-1.5 w-1.5 rounded-full ${
          normalizedStatus === 'approved'
            ? 'bg-emerald-500'
            : normalizedStatus === 'rejected'
              ? 'bg-red-500'
              : normalizedStatus === 'pending'
                ? 'bg-[#c49a52]'
                : 'bg-slate-400'
        }`}
      />
      {normalizedStatus}
    </span>
  );
}
