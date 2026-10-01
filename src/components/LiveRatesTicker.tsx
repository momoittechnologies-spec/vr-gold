'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Phone } from 'lucide-react';

interface GoldRatesData {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver: number;
  mumbai24k?: number;
  mumbai22k?: number;
  hyderabad24k?: number;
  hyderabad22k?: number;
  proddatur24k?: number;
  proddatur22k?: number;
  liveApiSource?: string;
  updatedAt: string;
}

interface Props {
  onOpenBooking?: () => void;
}

export default function LiveRatesTicker({ onOpenBooking }: Props) {
  const [rates, setRates] = useState<GoldRatesData>({
    gold24k: 7520,
    gold22k: 6890,
    gold18k: 5640,
    silver: 96,
    updatedAt: new Date().toISOString(),
  });
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    fetch('/api/rates')
      .then((res) => res.json())
      .then((data) => {
        if (data.rates) setRates(data.rates);
      })
      .catch((err) => console.error('Failed to load rates ticker:', err));
  }, []);

  // Cycle through cities every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const cities = [
    {
      name: 'KADAPA',
      flag: '📍',
      r24: rates.gold24k,
      r22: rates.gold22k,
      highlight: true,
    },
    {
      name: 'MUMBAI',
      flag: '🏙️',
      r24: rates.mumbai24k ?? rates.gold24k + 30,
      r22: rates.mumbai22k ?? rates.gold22k + 30,
    },
    {
      name: 'HYDERABAD',
      flag: '🌇',
      r24: rates.hyderabad24k ?? rates.gold24k + 10,
      r22: rates.hyderabad22k ?? rates.gold22k + 10,
    },
    {
      name: 'PRODDATUR',
      flag: '🏘️',
      r24: rates.proddatur24k ?? rates.gold24k + 20,
      r22: rates.proddatur22k ?? rates.gold22k + 20,
    },
  ];

  const current = cities[cityIndex];

  const formattedTime = new Date(rates.updatedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-gold-500/20 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">

        {/* Left: Live Indicator + Telugu Tagline */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-gold-300 font-bold uppercase tracking-wider hidden sm:inline-block shrink-0">
            LIVE RATES:
          </span>
          <span
            className="text-gold-200 font-semibold truncate"
            style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
          >
            ⚡ కాల్ చేసిన వెంటనే మీ దగ్గరకే వచ్చి బంగారు తాకట్టు విడిపించబడును
          </span>
        </div>

        {/* Right: City Rate Cycling Badge + All City Badges */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-0.5 no-scrollbar text-xs shrink-0">

          {/* Cycling city badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
            current.highlight
              ? 'bg-gold-500/20 border-gold-400/50 text-gold-300'
              : 'bg-navy-900/80 border-gray-700 text-white'
          }`}>
            <span className="text-sm">{current.flag}</span>
            <span className="font-black text-[10px] uppercase hidden sm:inline">{current.name}:</span>
            <span className="font-black">₹{current.r24.toLocaleString('en-IN')}/g</span>
            <span className="text-gray-400 font-medium hidden md:inline">24K</span>
          </div>

          {/* Static Kadapa 22K badge */}
          <div className="flex items-center gap-1.5 bg-gold-500/15 px-2.5 py-1 rounded-lg border border-gold-400/40">
            <span className="text-gold-200 font-semibold">22K 916:</span>
            <span className="text-white font-black">₹{rates.gold22k.toLocaleString('en-IN')}/g</span>
          </div>

          {/* Live indicator badge */}
          {rates.liveApiSource === 'live' && (
            <span className="hidden md:inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">
              LIVE API
            </span>
          )}

          {/* Updated time */}
          <div className="hidden lg:flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3 h-3 text-gold-400" />
            <span>{formattedTime}</span>
          </div>

          {/* Book Visit CTA */}
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black px-3 py-1 rounded-lg text-[11px] shadow-sm transition-transform hover:scale-105 shrink-0"
            >
              Book Doorstep Visit
            </button>
          )}

          {/* Mobile phone CTA */}
          <a
            href="tel:8978973576"
            className="sm:hidden flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-2.5 py-1 rounded-lg text-[11px] transition-colors shrink-0"
          >
            <Phone className="w-3 h-3" />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
