
import { ShieldCheck } from 'lucide-react';
import SectionHeader from '../../../../components/common/SectionHeader';
import SearchInput from '../../../../components/common/SearchInput';
import RetryAlert from '../../../../components/common/RetryAlert';
import DataTable from '../../../../components/common/DataTable';
import RoleFilter from './RoleFilter';
import UserRow from './UserRow';

const COLUMNS = ['User', 'Email', 'Phone', 'Role', 'Joined'];

export default function UserManagementSection({ usersState }) {
  const {
    users,
    filteredUsers,
    usersLoading,
    usersError,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    fetchUsers,
  } = usersState;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <SectionHeader
        icon={ShieldCheck}
        iconClassName="text-[#a17a3d]"
        title="User Management"
        description="View and search registered marketplace users."
        badge={`${users.length} users`}
        badgeClassName="bg-[#f8f3e8] text-[#8a682f]"
      />

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <SearchInput
          className="relative md:col-span-2"
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users by name or email..."
        />

        <RoleFilter
          roleFilter={roleFilter}
          onChange={setRoleFilter}
        />
      </div>

      <div className="mt-5">
        <RetryAlert
          message={usersError}
          onRetry={fetchUsers}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <DataTable
          columns={COLUMNS}
          tableClassName="min-w-[760px]"
          loading={usersLoading}
          loadingMessage="Loading users..."
          isEmpty={filteredUsers.length === 0}
          emptyMessage="No users match your search."
        >
          {filteredUsers.map((user) => (
            <UserRow
              key={user._id}
              user={user}
            />
          ))}
        </DataTable>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing{' '}
        <span className="font-semibold text-[#101b35]">
          {filteredUsers.length}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-[#101b35]">
          {users.length}
        </span>{' '}
        users.
      </p>
    </section>
  );
}
