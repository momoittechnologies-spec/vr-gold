'use client';

import React from 'react';
import Link from 'next/link';
import { Coins, Landmark, Scale, HelpCircle, Car, Calculator, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
  onOpenBooking?: (grams?: number, bank?: string) => void;
}

export default function CoreServices({ onOpenBooking }: Props) {
  const { isTelugu } = useLanguage();

  const services = [
    {
      id: 'sell-gold',
      icon: Coins,
      titleEn: 'Sell Physical Gold',
      titleTe: 'బంగారు ఆభరణాల అమ్మకం',
      descEn: 'Instant settlement for old, scrap, or unwanted gold jewellery at live market rates.',
      descTe: 'పాత మరియు వాడని బంగారు ఆభరణాలకు నేటి ప్రత్యక్ష మార్కెట్ రేటుతో తక్షణ నగదు.',
      actionTextEn: 'Calculate Value',
      actionTextTe: 'విలువ లెక్కించండి',
      href: '#calculator',
    },
    {
      id: 'pledged-gold',
      icon: Landmark,
      titleEn: 'Release Pledged Gold',
      titleTe: 'బ్యాంకు తాకట్టు విడుదల',
      descEn: 'We provide full liquidity to clear bank gold loans and hand over the surplus cash.',
      descTe: 'బ్యాంకు లేదా ఫైనాన్స్ కంపెనీలో ఉన్న తాకట్టు రుణాన్ని తీర్చి, మిగులు నగదును అందజేస్తాం.',
      actionTextEn: 'Explore Release',
      actionTextTe: 'విధానం చూడండి',
      href: '#pledged-gold',
    },
    {
      id: 'valuation',
      icon: Scale,
      titleEn: 'Computerized Gold Valuation',
      titleTe: 'కంప్యూటరైజ్డ్ స్వచ్ఛత & వ్యాల్యుయేషన్',
      descEn: 'Non-destructive German XRF Karatmeter purity testing with zero melt loss.',
      descTe: 'యాసిడ్ లేదా కరగబెట్టే నష్టం లేకుండా జర్మన్ క్యారెట్‌మీటర్‌తో ఖచ్చితమైన స్వచ్ఛత పరీక్ష.',
      actionTextEn: 'Test Purity',
      actionTextTe: 'పరీక్ష వివరాలు',
      href: '#calculator',
    },
    {
      id: 'loan-assistance',
      icon: HelpCircle,
      titleEn: 'Gold Loan & Renewal Assistance',
      titleTe: 'గోల్డ్ లోన్ & రెన్యూవల్ సాయం',
      descEn: 'Professional consultation for overdue gold loans, auction prevention, and renewals.',
      descTe: 'గడువు ముగిసిన గోల్డ్ లోన్లు, వేలం నివారణ మరియు రెన్యూవల్ సంబంధిత నిపుణుల సలహాలు.',
      actionTextEn: 'Speak with Team',
      actionTextTe: 'సంప్రదించండి',
      href: '#contact',
    },
    {
      id: 'doorstep-service',
      icon: Car,
      titleEn: 'Doorstep Bank Escort',
      titleTe: 'డోర్‌స్టెప్ బ్యాంక్ విజిట్ సేవ',
      descEn: 'Our authorized officer meets you directly at your bank branch with settlement funds.',
      descTe: 'మా అధికారి నేరుగా మీ బ్యాంకు బ్రాంచ్‌ వద్దకు వచ్చి లోన్ క్లియరెన్స్‌ పూర్తి చేస్తారు.',
      actionTextEn: 'Book Visit',
      actionTextTe: 'విజిట్ బుక్ చేయండి',
      isModalAction: true,
    },
    {
      id: 'live-rates',
      icon: Calculator,
      titleEn: 'Live Bullion Calculator',
      titleTe: 'లైవ్ గోల్డ్ రేట్ కాలిక్యులేటర్',
      descEn: 'Interactive dual-engine tool to estimate exact gross weight, deductions, and net cash.',
      descTe: 'స్థూల బరువు, తరుగు మరియు చేతికి వచ్చే నికర నగదును సులభంగా లెక్కించే డిజిటల్ టూల్.',
      actionTextEn: 'Use Calculator',
      actionTextTe: 'కాలిక్యులేటర్ వాడండి',
      href: '#calculator',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300/40">
            {isTelugu ? 'మా సేవా రంగాలు' : 'Core Services'}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'VR GOLD అందించే అధికారిక సేవా విభాగాలు'
              : 'Professional Gold & Bullion Services in Kadapa'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'పారదర్శకమైన విలువ, స్వచ్ఛత పరీక్ష మరియు చట్టబద్ధమైన బ్యాంకింగ్ రిలీజ్ సదుపాయం.'
              : 'Transparent valuation, certified purity testing, and reliable bank loan clearance assistance.'}
          </p>
        </div>

        {/* Services Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-gold-400/80 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-navy-950 group-hover:bg-navy-950 group-hover:text-gold-400 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-base font-bold text-slate-900 group-hover:text-gold-700 transition-colors"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? item.titleTe : item.titleEn}
                  </h3>
                  <p
                    className="text-xs text-slate-600 mt-2 leading-relaxed"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? item.descTe : item.descEn}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  {item.isModalAction ? (
                    <button
                      type="button"
                      onClick={() => onOpenBooking && onOpenBooking()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:text-gold-800 transition-colors cursor-pointer"
                    >
                      <span>{isTelugu ? item.actionTextTe : item.actionTextEn}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-gold-700 transition-colors"
                    >
                      <span>{isTelugu ? item.actionTextTe : item.actionTextEn}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
