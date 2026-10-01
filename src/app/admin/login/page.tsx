'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, Building2, CheckCircle2, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performLogin = async (loginEmail: string, loginPass: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      setSuccess(`✅ Authenticated as ${data.user?.name || loginEmail}! Opening CRM Dashboard...`);

      // Critical: Hard location navigation so all cookies are fresh on serverless execution
      setTimeout(() => {
        window.location.href = '/admin';
      }, 400);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please verify your credentials.');
      }
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(email, password);
  };

  // Instant 1-Click Login for Demo / Testing
  const handleQuickLogin = (role: 'ADMIN' | 'STAFF') => {
    if (role === 'ADMIN') {
      setEmail('admin@vrgold.com');
      setPassword('vrgold@2026');
      performLogin('admin@vrgold.com', 'vrgold@2026');
    } else {
      setEmail('staff@vrgold.com');
      setPassword('kadapa@2026');
      performLogin('staff@vrgold.com', 'kadapa@2026');
    }
  };

  return (
    <div className="min-h-screen bg-[#050B17] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Luxury Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0A1329] border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-white">
        
        {/* Header Institutional Branding */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400 mx-auto mb-3 bg-white p-1 shadow-lg shadow-gold-500/20">
            <Image
              src="/logo.png"
              alt="VR Gold"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">VR GOLD BUYER&apos;S</h1>
          <p className="text-[11px] text-gold-300 font-bold uppercase tracking-widest mt-0.5">
            Kadapa Treasury &amp; CRM Operations
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-2 rounded-full bg-navy-950 border border-gold-500/20 text-[10px] text-gray-400 font-semibold">
            <ShieldCheck className="w-3 h-3 text-gold-400" />
            <span>Bank-Grade 256-Bit Authenticated Portal</span>
          </div>
        </div>

        {/* 1-Click Quick Login Showcase at Top for Instant Access */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-gold-500/15 via-navy-950 to-navy-900 border border-gold-500/40 text-center">
          <div className="flex items-center justify-center gap-1.5 text-gold-300 text-xs font-black uppercase tracking-wider mb-2.5">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Instant 1-Click Access (No Typing Required)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('ADMIN')}
              className="py-2.5 px-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              ⚡ Login as Admin
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleQuickLogin('STAFF')}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-gold-500/40 text-gold-200 font-bold text-xs shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              ⚡ Login as Staff
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            Tap either button above to enter immediately with verified credentials.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/80 text-emerald-200 text-xs font-bold mb-4 text-center flex items-center justify-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-semibold mb-4 text-center">
            {error}
          </div>
        )}

        {/* Manual Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050B17] border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 placeholder-gray-600"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#050B17] border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 placeholder-gray-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-sm shadow-lg shadow-gold-500/25 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In with Credentials'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials Reference Card */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-left">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 mb-2">
            <KeyRound className="w-3.5 h-3.5 text-gold-400" />
            <span>Authorized Kadapa Credentials:</span>
          </div>
          <div className="space-y-1 text-[11px] font-mono bg-[#050B17] p-2.5 rounded-lg border border-gray-800 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gold-300">Admin:</span>
              <span>admin@vrgold.com / vrgold@2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Staff:</span>
              <span>staff@vrgold.com / kadapa@2026</span>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-5 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-gold-300 transition-colors">
            ← Return to Public Banking Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
