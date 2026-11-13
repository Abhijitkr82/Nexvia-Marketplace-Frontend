
export default function RoleFilter({ roleFilter, onChange }) {
  return (
    <select
      value={roleFilter}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter users by role"
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#101b35] shadow-sm outline-none transition focus:border-[#a17a3d] focus:ring-2 focus:ring-[#d9b879]/20"
    >
      <option value="all">All roles</option>
      <option value="admin">Admin</option>
      <option value="vendor">Vendor</option>
      <option value="customer">Customer</option>
    </select>
  );
}
