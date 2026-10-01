'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Clock, Phone } from 'lucide-react';

interface GoldRatesData {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver: number;
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

  useEffect(() => {
    fetch('/api/rates')
      .then((res) => res.json())
      .then((data) => {
        if (data.rates) {
          setRates(data.rates);
        }
      })
      .catch((err) => console.error('Failed to load rates ticker:', err));
  }, []);

  const formattedTime = new Date(rates.updatedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-gold-500/20 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        {/* Left: Live Indicator & Core Telugu Hook */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-gold-300 font-bold uppercase tracking-wider hidden sm:inline-block">
            LIVE KADAPA RATES:
          </span>
          <span className="text-gold-200 font-semibold truncate">
            ⚡ కాల్ చేసిన వెంటనే మీ దగ్గరకే వచ్చి డబ్బులు కట్టి విడిపించబడును
          </span>
        </div>

        {/* Right: Live Rates Badges */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto py-0.5 no-scrollbar text-xs">
          <div className="flex items-center gap-1.5 bg-navy-900/80 px-2.5 py-1 rounded-lg border border-gold-500/30">
            <span className="text-gray-400 font-medium">24K:</span>
            <span className="text-gold-300 font-black">₹{rates.gold24k.toLocaleString('en-IN')}/g</span>
          </div>

          <div className="flex items-center gap-1.5 bg-gold-500/15 px-2.5 py-1 rounded-lg border border-gold-400/40">
            <span className="text-gold-200 font-semibold">22K 916:</span>
            <span className="text-white font-black">₹{rates.gold22k.toLocaleString('en-IN')}/g</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 bg-navy-900/80 px-2.5 py-1 rounded-lg border border-gray-700">
            <span className="text-gray-400 font-medium">18K:</span>
            <span className="text-gold-300 font-bold">₹{rates.gold18k.toLocaleString('en-IN')}/g</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3 h-3 text-gold-400" />
            <span>Updated: {formattedTime}</span>
          </div>

          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black px-3 py-1 rounded-lg text-[11px] shadow-sm transition-transform hover:scale-105 shrink-0"
            >
              Book Doorstep Visit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
