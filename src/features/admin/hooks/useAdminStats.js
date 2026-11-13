import { useState } from 'react';
import { getStats } from '../../../services/adminService';
import { getToken } from '../../../utils/authStorage';
import { INITIAL_STATS } from '../utils/statCards';

export default function useAdminStats(checkAdmin) {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    if (!checkAdmin()) return;

    setLoading(true);
    setError('');

    try {
      setStats(await getStats(getToken()));
    } catch (err) {
      setError(err.message || 'Unable to connect to the backend.');
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, fetchStats };
}
