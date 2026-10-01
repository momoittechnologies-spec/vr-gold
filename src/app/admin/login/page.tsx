'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const autofillCredentials = (role: 'ADMIN' | 'STAFF') => {
    if (role === 'ADMIN') {
      setEmail('admin@vrgold.com');
      setPassword('vrgold@2026');
    } else {
      setEmail('staff@vrgold.com');
      setPassword('kadapa@2026');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-navy-900 border border-gold-500/30 rounded-3xl p-8 shadow-2xl relative z-10 text-white">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400 mx-auto mb-4 bg-white p-1 shadow-lg shadow-gold-500/20">
            <Image
              src="/logo.png"
              alt="VR Gold"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">VR GOLD BUYER&apos;S</h1>
          <p className="text-xs text-gold-300 font-bold uppercase tracking-widest mt-1">
            Kadapa Operations &amp; CRM Portal
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-semibold mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vrgold.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950/80 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950/80 border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-sm shadow-lg shadow-gold-500/25 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to VR Gold CRM'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Quick Fill Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <span className="text-[11px] text-gray-400 font-semibold block mb-3">
            QUICK DEMO ACCESS (1-CLICK TEST):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => autofillCredentials('ADMIN')}
              className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gold-500/30 text-[11px] text-gold-300 font-bold transition-colors cursor-pointer"
            >
              Fill Admin Login
            </button>
            <button
              type="button"
              onClick={() => autofillCredentials('STAFF')}
              className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-700 text-[11px] text-gray-300 font-bold transition-colors cursor-pointer"
            >
              Fill Staff Login
            </button>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-gold-300 transition-colors">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
