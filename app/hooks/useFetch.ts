'use client';

import { useCallback, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface FetchOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export function useFetch<T>(
  table: string,
  query?: (q: any) => any,
  options?: FetchOptions
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      let q = supabase.from(table).select('*');
      if (query) q = query(q);
      const { data, error: err } = await q;
      if (err) throw err;
      setData(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fetch gagal');
    } finally {
      setLoading(false);
    }
  }, [table, query]);

  useEffect(() => {
    if (options?.enabled === false) return;
    fetch();
  }, [fetch, options?.enabled]);

  return { data, loading, error, refetch: fetch };
}
