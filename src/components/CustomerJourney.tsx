'use client';

import React from 'react';
import Link from 'next/link';
import { ClipboardList, Calculator, CheckCircle2, Landmark, Wallet, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CustomerJourney() {
  const { isTelugu } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: ClipboardList,
      titleEn: 'Submit Requirement',
      titleTe: 'వివరాలు తెలియజేయండి',
      descEn: 'Contact our Kadapa desk or submit weight & bank pledge receipt details online.',
      descTe: 'మా కడప డెస్క్‌ను సంప్రదించండి లేదా మీ బంగారం/తాకట్టు వివరాలు తెలియజేయండి.',
    },
    {
      step: '02',
      icon: Calculator,
      titleEn: 'Initial Valuation',
      titleTe: 'ప్రాథమిక విలువ లెక్కింపు',
      descEn: 'Receive an accurate estimation benchmarked against today’s live bullion rate.',
      descTe: 'నేటి ప్రత్యక్ష మార్కెట్ రేటు ఆధారంగా మీ బంగారానికి ప్రాథమిక అంచనా పొందండి.',
    },
    {
      step: '03',
      icon: CheckCircle2,
      titleEn: 'Purity Assessment',
      titleTe: 'స్వచ్ఛత నిర్ధారణ',
      descEn: 'Computerized Karatmeter testing confirms exact gold karatage in your presence.',
      descTe: 'మీ సమక్షంలోనే కంప్యూటరైజ్డ్ క్యారెట్‌మీటర్‌తో స్వచ్ఛత మరియు నికర బరువు నిర్ధారణ.',
    },
    {
      step: '04',
      icon: Landmark,
      titleEn: 'Bank Loan Clearance',
      titleTe: 'బ్యాంకు లోన్ క్లోజింగ్',
      descEn: 'For pledged gold, our officer visits your bank counter and pays the full balance.',
      descTe: 'తాకట్టు ఉన్నట్లయితే, మా అధికారి నేరుగా మీ బ్యాంకుకు వచ్చి అప్పు మొత్తం చెల్లిస్తారు.',
    },
    {
      step: '05',
      icon: Wallet,
      titleEn: 'Instant Settlement',
      titleTe: 'తక్షణ నగదు చెల్లింపు',
      descEn: 'Collect your released gold or receive immediate cash / direct bank IMPS payout.',
      descTe: 'మిగిలిన నికర మిగులు నగదును తక్షణమే క్యాష్ లేదా బ్యాంక్ ట్రాన్స్‌ఫర్ రూపంలో పొందండి.',
    },
  ];

  return (
    <section id="process" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {isTelugu ? 'పారదర్శక విధానం' : 'Transparent Workflow'}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'VR GOLD లో లావాదేవీ జరిగే 5 సరళమైన దశలు' : 'How VR GOLD Works'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'మొదటి సంప్రదింపుల నుండి తుది సెటిల్‌మెంట్ వరకు స్పష్టమైన మరియు సురక్షితమైన ప్రక్రియ.'
              : 'A clear, auditable 5-step process from initial inquiry to final funds disbursal.'}
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-gold-400 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-gold-600 bg-gold-50 px-2 py-0.5 rounded border border-gold-200/60 font-mono">
                      STEP {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3
                    className="text-sm font-bold text-slate-900 leading-snug"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? item.titleTe : item.titleEn}
                  </h3>

                  <p
                    className="text-[11px] text-slate-600 mt-2 leading-relaxed"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? item.descTe : item.descEn}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>{idx < 4 ? 'Next Step →' : 'Complete ✓'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Context Banner */}
        <div className="mt-10 p-4 rounded-xl bg-gold-50/60 border border-gold-200/70 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p
            className="text-xs font-semibold text-gold-950"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? '💡 మీ వద్ద ఉన్న బ్యాంక్ లోన్ రశీదుతో నేరుగా సంప్రదిస్తే మరింత వేగంగా అంచనా వేయబడుతుంది.'
              : '💡 Have your bank loan receipt ready for an instant, exact surplus calculation.'}
          </p>
          <Link
            href="#calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-950 text-white text-xs font-bold shrink-0 hover:bg-navy-900 transition-colors"
          >
            <span>{isTelugu ? 'కాలిక్యులేటర్ చూడండి' : 'Check Valuation'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
