'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import type { Article } from '@/types';

export default function ArticlesPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchArticles();
    }
  }, [user, authLoading, router]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setArticles(articles.filter(a => a.id !== id));
    } catch (err) {
      console.error('Failed to delete article:', err);
    }
  };

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout role={user.role} onLogout={logout}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Berita</h1>
            <p className="text-gray-500 mt-1">Total: {articles.length} berita</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/articles/new')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={20} />
            Tulis Berita
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">Loading...</div>
          ) : articles.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">Tidak ada berita</div>
          ) : (
            articles.map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      article.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.published ? 'Dipublikasikan' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 py-2 rounded transition">
                      <Eye size={16} /> Lihat
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-2 rounded transition">
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
