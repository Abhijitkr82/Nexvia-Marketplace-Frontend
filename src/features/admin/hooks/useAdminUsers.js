import { useState } from 'react';
import { getUsers } from '../../../services/adminService';
import { getToken } from '../../../utils/authStorage';
import { filterUsers } from '../utils/filters';

export default function useAdminUsers(checkAdmin) {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchUsers = async () => {
    if (!checkAdmin()) return;

    setUsersLoading(true);
    setUsersError('');

    try {
      const data = await getUsers(getToken());

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setUsersError(err.message || 'Unable to fetch users.');
    } finally {
      setUsersLoading(false);
    }
  };

  return {
    users,
    filteredUsers: filterUsers(users, searchTerm, roleFilter),
    usersLoading,
    usersError,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    fetchUsers,
  };
}
