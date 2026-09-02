'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, LineChart, PieChart } from '@/components/dashboard/Charts';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { StatCard } from '@/components/dashboard/StatCard';
import { Users, FileText, ClipboardList, BarChart3, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [chartData, setChartData] = useState({
    attendance: null,
    grades: null,
    ppdbTrend: null,
    revenue: null,
  });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    attendance: 0,
    averageGrade: 0,
    revenue: 0,
    growth: 0,
  });

  useEffect(() => {
    if (!user) return;
    fetchAnalyticsData();
  }, [user]);

  const fetchAnalyticsData = async () => {
    try {
      // Mock data untuk attendance trend
      const attendanceData = {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        datasets: [
          {
            label: 'Hadir',
            data: [125, 128, 132, 130, 135, 140],
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            fill: true,
          },
          {
            label: 'Alpa',
            data: [8, 6, 4, 5, 3, 2],
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 2,
            fill: true,
          },
        ],
      };

      // Mock data untuk distribusi nilai
      const gradesData = {
        labels: ['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'E (<60)'],
        datasets: [
          {
            label: 'Jumlah Siswa',
            data: [45, 62, 38, 12, 3],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(249, 115, 22, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
          },
        ],
      };

      // Mock data untuk trend PPDB
      const ppdbTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [
          {
            label: 'Pendaftar PPDB',
            data: [15, 28, 42, 58, 71, 85],
            borderColor: 'rgb(139, 92, 246)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      };

      // Mock data untuk revenue
      const revenueData = {
        labels: ['BOS', 'SPP', 'Kegiatan', 'Donasi', 'Lainnya'],
        datasets: [
          {
            label: 'Pendapatan (Juta Rp)',
            data: [125, 85, 45, 30, 15],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(236, 72, 153, 0.8)',
            ],
          },
        ],
      };

      setChartData({
        attendance: attendanceData,
        grades: gradesData,
        ppdbTrend: ppdbTrendData,
        revenue: revenueData,
      });

      // Mock stats
      setStats({
        attendance: 95.5,
        averageGrade: 78.3,
        revenue: 300,
        growth: 12.5,
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout role={user.role} onLogout={logout}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analitik & Laporan</h1>
          <p className="text-gray-500 mt-2">Dashboard visualisasi data sekolah</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Tingkat Kehadiran"
            value={Math.round(stats.attendance)}
            icon={<Users size={32} />}
            color="blue"
            trend={5.2}
          />
          <StatCard
            label="Rata-rata Nilai"
            value={Math.round(stats.averageGrade * 10) / 10}
            icon={<BarChart3 size={32} />}
            color="green"
            trend={2.1}
          />
          <StatCard
            label="Pendapatan (Juta Rp)"
            value={Math.round(stats.revenue)}
            icon={<TrendingUp size={32} />}
            color="yellow"
            trend={8.5}
          />
          <StatCard
            label="Pertumbuhan YoY"
            value={Math.round(stats.growth * 10) / 10}
            icon={<BarChart3 size={32} />}
            color="red"
            trend={3.2}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chartData.attendance && (
            <LineChart
              labels={chartData.attendance.labels}
              datasets={chartData.attendance.datasets}
              title="Trend Kehadiran (Mingguan)"
            />
          )}

          {chartData.revenue && (
            <PieChart
              labels={chartData.revenue.labels}
              datasets={chartData.revenue.datasets}
              title="Sumber Pendapatan"
            />
          )}
        </div>

        {/* Full Width Charts */}
        <div className="grid grid-cols-1 gap-6">
          {chartData.ppdbTrend && (
            <LineChart
              labels={chartData.ppdbTrend.labels}
              datasets={chartData.ppdbTrend.datasets}
              title="Trend Pendaftaran PPDB (Semester)"
            />
          )}

          {chartData.grades && (
            <BarChart
              labels={chartData.grades.labels}
              datasets={chartData.grades.datasets}
              title="Distribusi Nilai Siswa"
            />
          )}
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Kehadiran</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Siswa</span>
                <span className="font-semibold">160</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hadir</span>
                <span className="font-semibold text-green-600">153 (95.6%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alpa</span>
                <span className="font-semibold text-red-600">5 (3.1%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Izin</span>
                <span className="font-semibold text-yellow-600">2 (1.3%)</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performa Akademik</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nilai Tertinggi</span>
                <span className="font-semibold">99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nilai Terendah</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rata-rata</span>
                <span className="font-semibold">78.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Median</span>
                <span className="font-semibold">79</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Keuangan</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pendapatan</span>
                <span className="font-semibold">Rp 300 Juta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pengeluaran</span>
                <span className="font-semibold">Rp 250 Juta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Surplus</span>
                <span className="font-semibold text-green-600">Rp 50 Juta</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Efisiensi</span>
                <span className="font-semibold">83.3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
