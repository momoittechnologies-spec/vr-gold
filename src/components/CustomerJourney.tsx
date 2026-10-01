'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Calculator, Search, ShieldCheck, Banknote, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CustomerJourney() {
  const { isTelugu } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: MessageSquare,
      title: isTelugu ? 'వివరాలు తెలియజేయండి' : 'Share Your Requirement',
      desc: isTelugu
        ? 'మీ వద్ద ఉన్న ఆభరణాలు లేదా బ్యాంకు తాకట్టు రశీదు వివరాలను మా కడప డెస్క్‌కు తెలియజేయండి.'
        : 'Share your gold weight or bank loan receipt with our Kadapa team via phone or calculator.',
    },
    {
      step: '02',
      icon: Calculator,
      title: isTelugu ? 'ప్రాథమిక విలువ అంచనా' : 'Initial Gold Valuation',
      desc: isTelugu
        ? 'నేటి లైవ్ మార్కెట్ రేటు ప్రకారం మీ బంగారానికి వచ్చే స్థూల విలువను లెక్కించి చూపుతాము.'
        : 'Receive an immediate estimate of gross value and surplus cash based on live bullion rates.',
    },
    {
      step: '03',
      icon: Search,
      title: isTelugu ? 'స్వచ్ఛత నిర్ధారణ' : 'Purity Verification',
      desc: isTelugu
        ? 'జర్మన్ ఎక్స్-రే క్యారెట్‌మీటర్ ద్వారా ఎటువంటి రాపిడి లేకుండా 100% కచ్చితమైన స్వచ్ఛత నిర్ధారణ.'
        : 'Non-destructive computerized Karatmeter testing confirms exact gold karat in your presence.',
    },
    {
      step: '04',
      icon: ShieldCheck,
      title: isTelugu ? 'బ్యాంక్ లోన్ క్లియరెన్స్' : 'Processing & Bank Settlement',
      desc: isTelugu
        ? 'మా అధికారి నేరుగా మీ బ్యాంకుకు వచ్చి పూర్తి లోన్ మొత్తం చెల్లించి తాకట్టును విడిపిస్తారు.'
        : 'Our executive visits your bank counter with full funds to clear principal, interest, and dues.',
    },
    {
      step: '05',
      icon: Banknote,
      title: isTelugu ? 'తక్షణ నగదు చెల్లింపు' : 'Settlement & Handover',
      desc: isTelugu
        ? 'బంగారం విడిపించిన వెంటనే మిగిలిన నికర మిగులు నగదును తక్షణమే క్యాష్ లేదా IMPS ద్వారా పొందండి.'
        : 'Collect your gold or receive instant surplus funds via direct bank transfer or spot cash.',
    },
  ];

  return (
    <section id="process" className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full">
            {isTelugu ? 'పారదర్శక విధానం' : 'Transparent Workflow'}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'VR GOLD విధానం ఎలా పనిచేస్తుంది?' : 'How VR GOLD Works'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'మొదటి సంప్రదింపుల నుండి తుది నగదు చెల్లింపు వరకు ప్రతి దశలోనూ పూర్తి పారదర్శకత.'
              : 'A simple, legally documented 5-step process designed for complete speed and customer confidence.'}
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-gold-400 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black font-mono text-gold-600 bg-gold-50 px-2 py-0.5 rounded border border-gold-200">
                      {st.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3
                    className="text-sm font-bold text-slate-900 mb-2 leading-snug"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {st.title}
                  </h3>
                  <p
                    className="text-xs text-slate-600 leading-relaxed"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Context Banner */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p
            className="text-xs text-slate-600"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? '💡 తాకట్టు విడిపించడానికి అవసరమైన మొత్తం 100% నిధులను మా సంస్థే బ్యాంకుకు చెల్లిస్తుంది.'
              : '💡 VR GOLD provides 100% of the funds required to clear your bank loan directly at the counter.'}
          </p>
          <Link
            href="/#calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-gold-300 text-xs font-bold shrink-0 transition-colors"
          >
            <span>{isTelugu ? 'కాలిక్యులేటర్ చూడండి' : 'Check Valuation'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
