
import RoleBadge from './RoleBadge';
import { formatShortDate } from '../../../../utils/formatters';

export default function UserRow({ user }) {
  return (
    <tr className="border-b border-slate-100 transition-colors duration-200 hover:bg-[#fbf8f0]/60">
      <td className="whitespace-nowrap px-5 py-4">
        <div className="font-semibold text-[#101b35]">
          {user.name || '—'}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          User ID: {user._id?.slice(-8) || '—'}
        </p>
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
        {user.email || '—'}
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
        {user.phone || '—'}
      </td>

      <td className="whitespace-nowrap px-5 py-4">
        <RoleBadge role={user.role} />
      </td>

      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
        {formatShortDate(user.createdAt)}
      </td>
    </tr>
  );
}
