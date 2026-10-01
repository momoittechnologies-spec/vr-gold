'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FinalCTA() {
  const { isTelugu } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#060D1A] via-navy-950 to-[#040814] text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Branch Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-gold-300 text-xs font-bold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          <span>{isTelugu ? 'కడప గోల్డ్ సర్వీసెస్' : 'Kadapa Bullion Desk'}</span>
        </div>

        {/* Short, Powerful Headline */}
        <h2
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3.5"
          style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
        >
          {isTelugu ? 'మీ బంగారం నిజమైన విలువను తెలుసుకోండి.' : 'Know the Value of Your Gold.'}
        </h2>

        {/* Supporting text */}
        <p
          className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed"
          style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
        >
          {isTelugu
            ? 'నేటి మార్కెట్ రేటు ప్రకారం పారదర్శక లెక్కింపును పొందండి మరియు VR GOLD కడప బృందాన్ని సంప్రదించండి.'
            : 'Get a transparent valuation and speak with the VR GOLD team. Fast, confidential, and verified.'}
        </p>

        {/* Clear 2-CTA Priority */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          {/* Primary CTA */}
          <Link
            href="/#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <Scale className="w-4 h-4 text-navy-950" />
            <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
              {isTelugu ? 'బంగారం విలువ లెక్కించండి' : 'Get Gold Valuation'}
            </span>
            <ArrowRight className="w-4 h-4 text-navy-950" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/#location"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
              {isTelugu ? 'VR GOLD ను సంప్రదించండి' : 'Contact VR GOLD'}
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
