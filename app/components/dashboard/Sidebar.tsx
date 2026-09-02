'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  BookOpen,
  Image,
  ClipboardList,
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  role: string;
  onLogout: () => void;
}

export function Sidebar({ role, onLogout }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'principal', 'operator'] },
    { href: '/dashboard/students', label: 'Siswa', icon: Users, roles: ['admin', 'principal', 'teacher', 'operator'] },
    { href: '/dashboard/articles', label: 'Berita', icon: FileText, roles: ['admin', 'principal', 'operator'] },
    { href: '/dashboard/ppdb', label: 'PPDB', icon: ClipboardList, roles: ['admin', 'principal', 'operator'] },
    { href: '/dashboard/gallery', label: 'Galeri', icon: Image, roles: ['admin', 'principal', 'operator'] },
    { href: '/dashboard/teachers', label: 'Guru', icon: BookOpen, roles: ['admin', 'principal'] },
    { href: '/dashboard/reports', label: 'Laporan', icon: BarChart3, roles: ['admin', 'principal', 'finance'] },
    { href: '/dashboard/settings', label: 'Pengaturan', icon: Settings, roles: ['admin'] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">SD Sumber Waru 2</p>
      </div>

      <nav className="p-4 space-y-2">
        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition',
                isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800 text-gray-300'
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
