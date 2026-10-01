'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminRatesPage() {
  const [rates, setRates] = useState<any>({
    gold24k: 7520,
    gold22k: 6890,
    gold18k: 5640,
    silver: 96,
    buyingMarginPercent: 1.5,
    updatedAt: new Date().toISOString(),
    updatedBy: 'Admin (VR Gold)',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/rates');
      const data = await res.json();
      if (data.rates) {
        setRates(data.rates);
      }
    } catch (err) {
      console.error('Failed to load rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rates),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update rates');
      }

      setRates(data.rates);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error saving rates');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-4xl">
      <div>
        <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest block">
          DAILY BULLION PRICE CONTROL
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950">Live Gold Rates Management</h1>
        <p className="text-xs text-gray-500 mt-1">
          Adjust the daily purchase prices for 24 Karat pure gold, 22 Karat 916 Hallmark, 18 Karat jewellery, and Silver.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Rates updated and published across the website header ticker &amp; calculators!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 22K Rate */}
          <div className="p-5 rounded-2xl bg-gold-50/50 border-2 border-gold-400/80">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-navy-950">
                22 Karat (916 Hallmark) Buy Rate *
              </label>
              <span className="px-2 py-0.5 rounded-full bg-gold-200 text-gold-900 font-extrabold text-[10px]">
                Primary Standard
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-black text-gray-400">
                ₹
              </span>
              <input
                type="number"
                required
                value={rates.gold22k || ''}
                onChange={(e) => setRates({ ...rates, gold22k: Number(e.target.value) })}
                className="w-full pl-8 pr-16 py-3 rounded-xl border border-gray-300 text-xl font-black text-navy-950 focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                / Gram
              </span>
            </div>
            <span className="text-[11px] text-gray-500 mt-2 block">
              1 Tola (8g) = ₹{((rates.gold22k || 0) * 8).toLocaleString('en-IN')}
            </span>
          </div>

          {/* 24K Rate */}
          <div className="p-5 rounded-2xl bg-gray-50 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-navy-950">
                24 Karat Pure Bullion Buy Rate *
              </label>
              <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-extrabold text-[10px]">
                Coins / Bars
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-black text-gray-400">
                ₹
              </span>
              <input
                type="number"
                required
                value={rates.gold24k || ''}
                onChange={(e) => setRates({ ...rates, gold24k: Number(e.target.value) })}
                className="w-full pl-8 pr-16 py-3 rounded-xl border border-gray-300 text-xl font-black text-navy-950 focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                / Gram
              </span>
            </div>
            <span className="text-[11px] text-gray-500 mt-2 block">
              10 Grams = ₹{((rates.gold24k || 0) * 10).toLocaleString('en-IN')}
            </span>
          </div>

          {/* 18K Rate */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-950 block mb-2">
              18 Karat Jewellery Rate (₹ / Gram)
            </label>
            <input
              type="number"
              value={rates.gold18k || ''}
              onChange={(e) => setRates({ ...rates, gold18k: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-navy-950 text-base focus:ring-2 focus:ring-gold-500 focus:outline-none"
            />
          </div>

          {/* Silver Rate */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-950 block mb-2">
              Silver Rate (₹ / Gram)
            </label>
            <input
              type="number"
              value={rates.silver || ''}
              onChange={(e) => setRates({ ...rates, silver: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-navy-950 text-base focus:ring-2 focus:ring-gold-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Audit info */}
        <div className="p-4 rounded-xl bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-600" />
            <span>Last Modified: {new Date(rates.updatedAt).toLocaleString('en-IN')}</span>
          </div>
          <span className="font-semibold text-navy-950">Updated By: {rates.updatedBy}</span>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-sm shadow-md transition-transform hover:scale-[1.01] cursor-pointer disabled:opacity-60"
        >
          {saving ? 'Publishing Updates...' : 'Publish Rates Across Website & Web App'}
        </button>
      </form>
    </div>
  );
}
