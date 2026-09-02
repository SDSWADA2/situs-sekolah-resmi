'use client';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Download, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DataTable } from '@/components/dashboard/DataTable';
import { Modal } from '@/components/dashboard/Modal';
import { Alert } from '@/components/dashboard/Alert';
import type { Article } from '@/types';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Selamat Datang di Website Baru',
    slug: 'selamat-datang',
    content: 'Konten artikel...',
    excerpt: 'Website baru SD Negeri Sumber Waru 2',
    author: 'Admin',
    authorId: '1',
    published: true,
    viewCount: 150,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Pengumuman PPDB Tahun Ajaran 2024/2025',
    slug: 'pengumuman-ppdb',
    content: 'Konten artikel...',
    excerpt: 'Pengumuman pembukaan PPDB',
    author: 'Kepala Sekolah',
    authorId: '2',
    published: true,
    viewCount: 320,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

export default function ArticlesPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedArticles = filteredArticles.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      setArticles(articles.filter(a => a.id !== id));
      setAlert({ type: 'success', message: 'Berita berhasil dihapus' });
    }
  };

  const handleExport = () => {
    const csv = [
      ['Judul', 'Penulis', 'Status', 'Views', 'Tanggal'],
      ...articles.map(a => [
        a.title,
        a.author,
        a.published ? 'Dipublikasikan' : 'Draft',
        a.viewCount || 0,
        a.createdAt.toLocaleDateString('id-ID'),
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'articles.csv';
    a.click();
  };

  return (
    <DashboardLayout role={user?.role || 'operator'} onLogout={logout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Berita</h1>
            <p className="text-gray-500 mt-1">Total: {articles.length} berita</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Download size={18} />
              Export
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Plus size={18} />
              Tulis Berita
            </button>
          </div>
        </div>

        {/* Alert */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow">
          <DataTable
            data={paginatedArticles}
            columns={[
              { key: 'title', label: 'Judul', sortable: true },
              { key: 'author', label: 'Penulis', sortable: true },
              {
                key: 'published',
                label: 'Status',
                render: (value) => (
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {value ? 'Dipublikasikan' : 'Draft'}
                  </span>
                ),
              },
              {
                key: 'viewCount',
                label: 'Views',
                render: (value) => value || 0,
              },
              {
                key: 'createdAt',
                label: 'Tanggal',
                render: (value) => new Date(value).toLocaleDateString('id-ID'),
              },
            ]}
            actions={(row) => (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-700 transition">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-600 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
            pagination={{
              page,
              limit: pageSize,
              total: filteredArticles.length,
              onPageChange: setPage,
            }}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Tulis Berita Baru"
        onSubmit={() => {
          setShowModal(false);
          setAlert({ type: 'success', message: 'Berita berhasil ditambahkan' });
        }}
        submitLabel="Publikasikan"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Judul Berita"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Ringkasan (excerpt)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Konten Berita"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm text-gray-700">Publikasikan sekarang</span>
          </label>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
