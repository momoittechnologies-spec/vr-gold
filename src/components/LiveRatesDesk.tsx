'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RatesData {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver: number;
  mumbai24k?: number;
  mumbai22k?: number;
  updatedAt: string;
  liveApiSource?: string;
}

export default function LiveRatesDesk() {
  const { isTelugu } = useLanguage();
  const [rates, setRates] = useState<RatesData>({
    gold24k: 7520,
    gold22k: 6890,
    gold18k: 5640,
    silver: 96,
    updatedAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);

  const fetchRates = () => {
    setLoading(true);
    fetch('/api/rates')
      .then((res) => res.json())
      .then((data) => {
        if (data.rates) setRates(data.rates);
      })
      .catch((err) => console.error('Failed to load live rates:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const formattedTime = new Date(rates.updatedAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = new Date(rates.updatedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section id="rates" className="py-6 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Meta Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
              {isTelugu ? 'నేటి కడప బులియన్ రేట్లు' : 'Live Daily Gold & Silver Rates'}
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {rates.liveApiSource === 'live' ? 'Live API Feed' : 'Kadapa Desk'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {isTelugu ? 'చివరిగా అప్‌డేట్:' : 'Last updated:'}{' '}
                <strong className="text-slate-700">{formattedDate}, {formattedTime}</strong>
              </span>
            </span>
            <button
              onClick={fetchRates}
              disabled={loading}
              title="Refresh Rates"
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Rates Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* 24K Pure Gold */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-gold-400/60 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold uppercase tracking-wider">24K Gold</span>
              <span className="text-[10px] font-semibold text-slate-400">99.9% Pure</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                ₹{rates.gold24k.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ gram</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {isTelugu ? 'ప్యూర్ బులియన్ బార్ రేటు' : 'Benchmark fine gold'}
            </p>
          </div>

          {/* 22K Standard Gold (Primary) */}
          <div className="bg-white p-4 rounded-xl border-2 border-gold-400/80 shadow-xs ring-1 ring-gold-400/20">
            <div className="flex items-center justify-between text-xs text-gold-900 mb-1">
              <span className="font-black uppercase tracking-wider">22K Gold (916)</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gold-100 text-gold-800">
                Jewellery
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                ₹{rates.gold22k.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ gram</span>
            </div>
            <p className="text-[10px] text-gold-700 font-medium mt-1">
              {isTelugu ? 'హాల్‌మార్క్ ఆభరణాల ప్రామాణిక రేటు' : 'Standard hallmark rate'}
            </p>
          </div>

          {/* 18K Commercial Gold */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold uppercase tracking-wider">18K Gold</span>
              <span className="text-[10px] font-semibold text-slate-400">75.0% Pure</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                ₹{rates.gold18k.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ gram</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {isTelugu ? 'స్టోన్ ఆభరణాల క్యాలిక్యులేషన్' : 'Commercial jewellery'}
            </p>
          </div>

          {/* Silver */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold uppercase tracking-wider">Fine Silver</span>
              <span className="text-[10px] font-semibold text-slate-400">99.9%</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                ₹{rates.silver.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-semibold">/ gram</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {isTelugu ? 'వెండి బార్లు & వస్తువులు' : 'Silver bullion reference'}
            </p>
          </div>

        </div>

        {/* Subtle Rate Disclaimer */}
        <p className="text-[11px] text-slate-500 mt-3 text-center sm:text-left">
          {isTelugu
            ? '* పై రేట్లు రోజువారీ మార్కెట్ బెంచ్‌మార్క్ ఆధారంగా ఉంటాయి. తుది చెల్లింపు విలువ క్యారెట్‌మీటర్ స్వచ్ఛత పరీక్ష మరియు నికర బరువు ఆధారంగా లెక్కించబడుతుంది.'
            : '* Rates are referenced to daily multi-city spot bullion benchmarks. Final settlement is determined by computerized Karatmeter purity assessment and net gold weight.'}
        </p>

      </div>
    </section>
  );
}
