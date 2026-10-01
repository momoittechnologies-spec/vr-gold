'use client';

import React from 'react';
import { Scale, Award, FileText, UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TrustBar() {
  const { isTelugu } = useLanguage();

  const trustPillars = [
    {
      icon: Scale,
      title: isTelugu ? 'పారదర్శక వ్యాల్యుయేషన్' : 'Transparent Valuation',
      desc: isTelugu
        ? 'నేటి లైవ్ మార్కెట్ రేటు ప్రకారమే లెక్కింపు. ఎటువంటి ఊహాజనిత లేదా రహస్య కోతలు ఉండవు.'
        : 'Valuations pegged directly to daily bullion market rates with zero hidden deductions.',
    },
    {
      icon: Award,
      title: isTelugu ? 'కంప్యూటరైజ్డ్ స్వచ్ఛత పరీక్ష' : 'Verified Purity Testing',
      desc: isTelugu
        ? 'జర్మన్ ఎక్స్-రే క్యారెట్‌మీటర్ పరీక్ష మీ ముందే జరుగుతుంది. ఆభరణాలు కరగబెట్టడం లేదా రాపిడి ఉండదు.'
        : 'Non-destructive German XRF spectrometry in your presence with zero scratching or damage.',
    },
    {
      icon: FileText,
      title: isTelugu ? 'స్పష్టమైన డాక్యుమెంటేషన్' : 'Clear Documentation',
      desc: isTelugu
        ? 'ప్రతి లావాదేవీకి డిజిటల్ లేదా ప్రింటెడ్ వోచర్ మరియు అధికారిక రశీదు వెంటనే అందజేయబడును.'
        : 'Formal digital settlement receipts detailing gross valuation, bank clearance, and net payout.',
    },
    {
      icon: UserCheck,
      title: isTelugu ? 'వృత్తిపరమైన సహాయం' : 'Professional Assistance',
      desc: isTelugu
        ? 'బ్యాంకుల్లో తాకట్టు రుణాలు క్లియర్ చేయడానికి మా ప్రతినిధి నేరుగా మీతో పాటు బ్రాంచ్‌కు వస్తారు.'
        : 'Authorized field officers assist directly at bank counters to clear pledges and retrieve gold.',
    },
  ];

  return (
    <section className="py-10 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className="text-sm font-bold text-slate-900 mb-1"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-slate-600 leading-relaxed"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
