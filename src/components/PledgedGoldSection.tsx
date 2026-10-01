'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, CheckCircle2, ArrowRight, Building, HelpCircle, FileCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
  onOpenBooking?: (grams?: number, bank?: string) => void;
}

export default function PledgedGoldSection({ onOpenBooking }: Props) {
  const { isTelugu } = useLanguage();

  const supportedLenders = [
    'State Bank of India (SBI)',
    'Canara Bank',
    'Andhra Pragathi Grameena Bank (APGB)',
    'Union Bank of India',
    'Indian Bank',
    'Bank of Baroda',
    'Muthoot Finance',
    'Manappuram Finance',
    'IIFL Gold',
    'Regional Cooperative Banks',
  ];

  return (
    <section id="pledged-gold" className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Context & Explanation */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
              <Landmark className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'బ్యాంకు తాకట్టు విడుదల సేవ' : 'Pledged Gold Resolution'}</span>
            </span>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu
                ? 'మీరు బ్యాంకులో తాకట్టు పెట్టిన బంగారాన్ని విడిపించడంలో సహాయం కావాలా?'
                : 'Need Assistance Releasing or Managing Your Pledged Gold?'}
            </h2>

            <p
              className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu
                ? 'అనేక సందర్భాలలో బ్యాంకుల్లో తాకట్టు పెట్టిన బంగారంపై వడ్డీ పేరుకుపోవడం లేదా మొత్తం కట్టేందుకు తగిన నగదు అందుబాటులో లేకపోవడం జరుగుతుంటుంది. VR GOLD మీ తరఫున బ్యాంకుకు వచ్చి పూర్తి లోన్ మొత్తాన్ని క్లియర్ చేసి, మిగిలిన మిగులు విలువను మీకు వెంటనే అందజేస్తుంది.'
                : 'Pledging gold to meet financial requirements is common, but closing the loan or managing compounding interest can sometimes become challenging. VR GOLD offers a structured, transparent process: we clear your loan balance directly at the bank counter and disburse the remaining value to you.'}
            </p>

            {/* Structured Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200">
                  <strong>{isTelugu ? 'పూర్తి బ్యాంక్ క్లియరెన్స్ నిధులు:' : 'Full Bank Settlement Liquidity:'}</strong>{' '}
                  {isTelugu
                    ? 'మీరు మీ జేబు నుండి నగదు సమకూర్చుకోనవసరం లేదు; మేమే మొత్తం అప్పు కడతాం.'
                    : 'We provide 100% of the funds required to redeem your pledged ornaments.'}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200">
                  <strong>{isTelugu ? 'పారదర్శక మార్కెట్ లెక్కింపు:' : 'Transparent Market Calculation:'}</strong>{' '}
                  {isTelugu
                    ? 'నేటి మార్కెట్ రేటు ఆధారంగా నికర మిగులు నగదును స్పష్టంగా లెక్కించి ఇస్తాం.'
                    : 'Surplus cash is calculated clearly against live bullion benchmarks without hidden fees.'}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200">
                  <strong>{isTelugu ? 'కౌంటర్ సమక్షంలోనే ప్రక్రియ:' : 'At-the-Counter Process:'}</strong>{' '}
                  {isTelugu
                    ? 'బ్యాంకు శాఖలోనే మీ ఎదురుగానే అధికారికంగా రశీదు తీసుకుని క్లోజ్ చేస్తాం.'
                    : 'Clearance takes place directly at your bank branch with official bank receipts provided.'}
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="#calculator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-xs shadow-md transition-transform hover:scale-102"
              >
                <span>{isTelugu ? 'విలువ & ఆప్షన్స్ చెక్ చేయండి' : 'Check Your Options'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>{isTelugu ? 'సాయం కోసం అడగండి' : 'Request Assistance'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Supported Institutions Card */}
          <div className="lg:col-span-5 bg-slate-800/80 p-6 sm:p-7 rounded-2xl border border-slate-700/80 shadow-lg">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-700">
              <Building className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isTelugu ? 'మద్దతు గల బ్యాంకింగ్ సంస్థలు' : 'Supported Financial Institutions'}
                </h3>
                <span className="text-[10px] text-slate-400 block">
                  {isTelugu ? 'కడప మరియు రాయలసీమ శాఖలు' : 'Across Kadapa & Rayalaseema Branches'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 py-3 leading-relaxed">
              {isTelugu
                ? 'మేము కడపలోని జాతీయ బ్యాంకులు, గ్రామీణ బ్యాంకులు మరియు రిజిస్టర్డ్ NBFC సంస్థల నుండి తాకట్టు విడుదల సదుపాయం కల్పిస్తాం:'
                : 'We coordinate transparent loan redemptions across nationalized commercial lenders and financial institutions:'}
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-200">
              {supportedLenders.map((lender, i) => (
                <div key={i} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                  <span className="truncate">{lender}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Have a different bank slip?</span>
              <a href="tel:8978973576" className="text-gold-400 font-bold hover:underline">
                Call: 8978973576
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
