import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface AdminStats {
  totalStudents: number;
  totalPPDBApplications: number;
  totalArticles: number;
  totalUsers: number;
  pendingApplications: number;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    totalPPDBApplications: 0,
    totalArticles: 0,
    totalUsers: 0,
    pendingApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [students, ppdb, articles, users, pendingPPDB] = await Promise.all([
        supabase.from('students').select('id', { count: 'exact' }),
        supabase.from('ppdb_applications').select('id', { count: 'exact' }),
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('users').select('id', { count: 'exact' }),
        supabase.from('ppdb_applications').select('id', { count: 'exact' }).eq('status', 'pending'),
      ]);

      setStats({
        totalStudents: students.count || 0,
        totalPPDBApplications: ppdb.count || 0,
        totalArticles: articles.count || 0,
        totalUsers: users.count || 0,
        pendingApplications: pendingPPDB.count || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: fetchStats };
}
