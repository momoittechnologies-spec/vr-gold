import React from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // Only the (dashboard) group pages are protected. Login page is outside this group.
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar user={{ name: session.name, email: session.email, role: session.role }} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
