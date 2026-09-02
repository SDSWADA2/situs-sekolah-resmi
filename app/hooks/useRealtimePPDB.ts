'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { PPDBApplication } from '@/types';

interface RealtimePPDB extends PPDBApplication {
  realtime?: boolean;
}

export function useRealtimePPDB() {
  const [applications, setApplications] = useState<RealtimePPDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    fetchApplications();

    // Subscribe to real-time changes
    const subscription = supabase
      .from('ppdb_applications')
      .on('INSERT', (payload) => {
        setApplications(prev => [{ ...payload.new as PPDBApplication, realtime: true }, ...prev]);
      })
      .on('UPDATE', (payload) => {
        setApplications(prev =>
          prev.map(a => (a.id === payload.new.id ? { ...payload.new as PPDBApplication, realtime: true } : a))
        );
      })
      .on('DELETE', (payload) => {
        setApplications(prev => prev.filter(a => a.id !== payload.old.id));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('ppdb_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Failed to fetch PPDB applications:', error);
    } finally {
      setLoading(false);
    }
  };

  return { applications, loading, refetch: fetchApplications };
}
