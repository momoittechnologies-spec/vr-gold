'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Building, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';

export default function PledgedGoldSection() {
  const { isTelugu } = useLanguage();
  const { openBooking } = useBooking();

  const supportedLenders = [
    'State Bank of India (SBI)',
    'Andhra Pragathi Grameena (APGB)',
    'Canara Bank',
    'Union Bank / Andhra Bank',
    'Muthoot Finance',
    'Manappuram Finance',
    'IIFL Gold Loans',
    'Indian Bank',
    'Bank of Baroda',
    'Licensed Co-operatives',
  ];

  return (
    <section id="pledged-gold" className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Calm Financial Advisory Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
              {isTelugu ? 'తాకట్టు బంగారం పరిష్కారం' : 'Pledged Gold Assistance'}
            </span>
            
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu ? 'తాకట్టు బంగారం విడిపించడంలో సహాయం కావాలా?' : 'Need help with your pledged gold?'}
            </h2>

            <p
              className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu
                ? 'బ్యాంకులు లేదా ఫైనాన్స్ సంస్థల్లో ఉన్న తాకట్టు రుణాన్ని పారదర్శకంగా క్లియర్ చేసుకుని, నేటి మార్కెట్ విలువ ప్రకారం మిగిలే నికర మిగులు నగదును పొందే సులభమైన విధానాన్ని పరిశీలించండి.'
                : 'Explore a transparent, legally documented process for releasing or managing your pledged gold from banks and NBFCs, and collect your surplus market value in hand.'}
            </p>

            {/* 3 Core Verifiable Assurances */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p
                  className="text-xs text-slate-300"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu
                    ? '100% క్లియరెన్స్ నిధులు: బ్యాంకు కౌంటర్‌లో అసలు మరియు వడ్డీ చెల్లించడానికి పూర్తి నిధులను VR GOLD అందిస్తుంది.'
                    : '100% Settlement Liquidity: VR GOLD provides the full funds required to settle principal and accrued interest at your bank counter.'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p
                  className="text-xs text-slate-300"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu
                    ? 'పారదర్శక మిగులు నగదు లెక్కింపు: ప్రస్తుత మార్కెట్ విలువ నుండి బ్యాంక్ బకాయిలు తీసివేయగా మిగిలిన సొమ్ము మీ చేతికే అందుతుంది.'
                    : 'Transparent Surplus Calculation: Gross realizable gold value minus bank settlement equals immediate net cash in your hands.'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p
                  className="text-xs text-slate-300"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu
                    ? 'కౌంటర్ వద్దే ప్రక్రియ: మా అధికారిక ఎగ్జిక్యూటివ్ మీతో పాటు బ్రాంచ్‌కు వచ్చి లావాదేవీని గౌరవప్రదంగా పూర్తి చేస్తారు.'
                    : 'Direct Bank Branch Escort: Our verified officer assists you at the bank counter for a smooth, confidential transaction.'}
                </p>
              </div>
            </div>

            {/* CTAs: Primary + Secondary */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <Link
                href="/#calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-xs shadow-md transition-transform hover:scale-[1.02]"
              >
                <span>{isTelugu ? 'విలువ & ఆప్షన్స్ చెక్ చేయండి' : 'Explore Pledged Gold Services'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-300 border border-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>{isTelugu ? 'సాయం కోసం అభ్యర్థించండి' : 'Request Assistance'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Supported Financial Institutions Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-slate-700/80 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Building className="w-4 h-4 text-gold-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">
                  {isTelugu ? 'తాకట్టు విడుదల సదుపాయం గల సంస్థలు' : 'Supported Financial Institutions'}
                </h3>
              </div>
              <p
                className="text-xs text-slate-400 leading-relaxed mb-5"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'కడపలోని జాతీయ బ్యాంకులు, గ్రామీణ బ్యాంకులు మరియు రిజిస్టర్డ్ NBFC ల నుండి తాకట్టు విడిపించబడును:'
                  : 'Assistance available across nationalized banks, regional rural banks, and registered NBFC branches in Kadapa:'}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {supportedLenders.map((bank) => (
                  <span
                    key={bank}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-700"
                  >
                    {bank}
                  </span>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {isTelugu ? 'కడప హెల్ప్‌లైన్:' : 'Kadapa Helpline:'}
                </span>
                <a href="tel:8978973576" className="text-gold-400 font-bold hover:underline">
                  8978973576
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
