'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Article } from '@/types';

interface RealtimeArticle extends Article {
  realtime?: boolean;
}

export function useRealtimeArticles() {
  const [articles, setArticles] = useState<RealtimeArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    fetchArticles();

    // Subscribe to real-time changes
    const subscription = supabase
      .from('articles')
      .on('INSERT', (payload) => {
        setArticles(prev => [{ ...payload.new as Article, realtime: true }, ...prev]);
      })
      .on('UPDATE', (payload) => {
        setArticles(prev =>
          prev.map(a => (a.id === payload.new.id ? { ...payload.new as Article, realtime: true } : a))
        );
      })
      .on('DELETE', (payload) => {
        setArticles(prev => prev.filter(a => a.id !== payload.old.id));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return { articles, loading, refetch: fetchArticles };
}
