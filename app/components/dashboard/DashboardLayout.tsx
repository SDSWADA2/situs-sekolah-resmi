'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  onLogout: () => void;
}

export function DashboardLayout({ children, role, onLogout }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <Sidebar role={role} onLogout={onLogout} />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
