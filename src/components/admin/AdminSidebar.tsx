'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Calculator,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
} from 'lucide-react';

interface Props {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Live Rates Control', href: '/admin/rates', icon: TrendingUp },
    { label: 'Leads & Dispatch', href: '/admin/leads', icon: Users },
    { label: 'Valuation & Release', href: '/admin/valuation', icon: Calculator },
  ];

  return (
    <aside className="w-64 bg-navy-950 text-white flex flex-col shrink-0 border-r border-gold-500/20">
      {/* Brand Header */}
      <div className="p-5 border-b border-navy-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-400 bg-white p-0.5 shrink-0">
          <Image src="/logo.png" alt="VR Gold" width={40} height={40} className="w-full h-full object-contain" />
        </div>
        <div>
          <span className="font-black text-sm tracking-tight text-white block">VR GOLD CRM</span>
          <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">
            Kadapa Operations
          </span>
        </div>
      </div>

      {/* User Badge */}
      <div className="p-4 mx-3 my-3 rounded-2xl bg-navy-900/90 border border-gold-500/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center font-black text-xs">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user.name}</p>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 font-semibold uppercase">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-navy-950 shadow-md font-black'
                  : 'text-gray-300 hover:text-white hover:bg-navy-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-gold-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-navy-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-navy-900 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
            <span>Open Customer Site</span>
          </span>
          <span className="text-[10px] text-gold-400 font-mono">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-300 hover:text-red-200 hover:bg-red-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
