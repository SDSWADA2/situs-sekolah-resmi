'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Student } from '@/types';

interface RealtimeStudent extends Student {
  realtime?: boolean;
}

export function useRealtimeStudents() {
  const [students, setStudents] = useState<RealtimeStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    fetchStudents();

    // Subscribe to real-time changes
    const subscription = supabase
      .from('students')
      .on('INSERT', (payload) => {
        setStudents(prev => [{ ...payload.new as Student, realtime: true }, ...prev]);
      })
      .on('UPDATE', (payload) => {
        setStudents(prev =>
          prev.map(s => (s.id === payload.new.id ? { ...payload.new as Student, realtime: true } : s))
        );
      })
      .on('DELETE', (payload) => {
        setStudents(prev => prev.filter(s => s.id !== payload.old.id));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  return { students, loading, refetch: fetchStudents };
}
