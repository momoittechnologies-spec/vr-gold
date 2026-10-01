'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface Props {
  className?: string;
  variant?: 'header' | 'mobile' | 'floating';
}

export default function LanguageToggle({ className = '', variant = 'header' }: Props) {
  const { lang, setLang } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gold-200/80 ${className}`}>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
          <Globe className="w-4 h-4 text-gold-600" />
          <span>భాష / Language:</span>
        </div>
        <div className="inline-flex rounded-lg bg-gray-200/80 p-0.5 border border-gray-300">
          <button
            type="button"
            onClick={() => setLang('te')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              lang === 'te'
                ? 'bg-gold-500 text-navy-950 shadow-sm font-black'
                : 'text-gray-600 hover:text-navy-950'
            }`}
          >
            తెలుగు
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-navy-950 text-gold-300 shadow-sm font-black'
                : 'text-gray-600 hover:text-navy-950'
            }`}
          >
            English
          </button>
        </div>
      </div>
    );
  }

  // Header desktop variant: sleek pill
  return (
    <div
      className={`inline-flex items-center rounded-xl bg-navy-950/5 p-1 border border-gold-300/60 shadow-xs backdrop-blur-xs transition-all ${className}`}
      title="Switch Language / భాషను మార్చుకోండి"
    >
      <button
        type="button"
        onClick={() => setLang('te')}
        className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 ${
          lang === 'te'
            ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-navy-950 font-black shadow-xs'
            : 'text-gray-600 hover:text-navy-950 font-bold'
        }`}
      >
        <span>తెలుగు</span>
      </button>

      <span className="text-gray-300 text-[10px] mx-0.5">|</span>

      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer flex items-center gap-1 ${
          lang === 'en'
            ? 'bg-navy-950 text-gold-300 font-black shadow-xs'
            : 'text-gray-600 hover:text-navy-950 font-bold'
        }`}
      >
        <span>English</span>
      </button>
    </div>
  );
}
