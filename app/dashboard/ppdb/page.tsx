'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { PPDBApplication } from '@/types';

export default function PPDBPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [applications, setApplications] = useState<PPDBApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchApplications();
    }
  }, [user, authLoading, router]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('ppdb_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app =>
    filter === 'all' ? true : app.status === filter
  );

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    try {
      const { error } = await supabase
        .from('ppdb_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchApplications();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return classes[status as keyof typeof classes] || '';
  };

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout role={user.role} onLogout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PPDB - Pendaftaran Peserta Didik Baru</h1>
          <p className="text-gray-500 mt-1">Total: {applications.length} pendaftar</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'Semua', count: applications.length },
            { key: 'pending', label: 'Menunggu', count: applications.filter(a => a.status === 'pending').length },
            { key: 'approved', label: 'Diterima', count: applications.filter(a => a.status === 'approved').length },
            { key: 'rejected', label: 'Ditolak', count: applications.filter(a => a.status === 'rejected').length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === tab.key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Tidak ada pendaftar</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telepon</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredApplications.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.studentName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(app.id, 'approved')}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                            >
                              Terima
                            </button>
                            <button
                              onClick={() => handleStatusChange(app.id, 'rejected')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                            >
                              Tolak
                            </button>
                          </>
                        )}
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition">
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
