'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FinalCTA() {
  const { isTelugu } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 via-navy-950 to-slate-950 text-white relative overflow-hidden border-t border-gold-500/20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-wider mb-5">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
          <span>{isTelugu ? 'కడప గోల్డ్ సర్వీసెస్' : 'Kadapa Bullion Desk'}</span>
        </div>

        <h2
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4"
          style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
        >
          {isTelugu ? 'మీ బంగారం విలువ తెలుసుకోవడానికి సిద్ధంగా ఉన్నారా?' : 'Ready to Know the True Value of Your Gold?'}
        </h2>

        <p
          className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed"
          style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
        >
          {isTelugu
            ? 'మా ఆన్‌లైన్ కాలిక్యులేటర్‌తో నిమిషాల్లో అంచనా వేయండి లేదా మా కడప NGO కాలనీ బ్రాంచ్‌ను నేరుగా సంప్రదించండి.'
            : 'Estimate your surplus cash payout online in seconds, or speak directly with our certified gold valuation team in Kadapa.'}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-8">
          <Link
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-sm shadow-lg shadow-gold-500/20 transition-all hover:scale-102"
          >
            <Calculator className="w-4 h-4" />
            <span>{isTelugu ? 'బంగారం విలువ లెక్కించండి' : 'Get Gold Valuation'}</span>
          </Link>

          <a
            href="tel:8978973576"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-slate-700 text-white font-bold text-sm transition-colors"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>{isTelugu ? 'కడప డెస్క్: 8978973576' : 'Contact VR GOLD'}</span>
          </a>
        </div>

        {/* Local Address Micro Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span>D.No. 42/1201, Near Y-Junction Sivalayam, NGO Colony, Kadapa</span>
        </div>

      </div>
    </section>
  );
}
