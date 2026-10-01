'use client';

import React from 'react';
import Link from 'next/link';
import { Coins, Building2, Scale, ShieldCheck, Car, Calculator, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';

export default function CoreServices() {
  const { isTelugu } = useLanguage();
  const { openBooking } = useBooking();

  const services = [
    {
      id: 'sell-gold',
      icon: Coins,
      title: isTelugu ? 'పాత బంగారు ఆభరణాల విక్రయం' : 'Sell Physical Gold',
      desc: isTelugu
        ? 'పాత బంగారు నగలపై నేటి స్పాట్ మార్కెట్ రేటు ప్రకారం తక్షణ నగదు లేదా బ్యాంకు ఖాతాకు IMPS బదిలీ.'
        : 'Transparent spot market pricing for old or unused gold jewellery with immediate cash or IMPS transfer.',
      actionText: isTelugu ? 'విలువ లెక్కించండి' : 'Calculate Value',
      href: '/#calculator',
    },
    {
      id: 'release-pledged',
      icon: Building2,
      title: isTelugu ? 'బ్యాంక్ తాకట్టు బంగారం విడుదల' : 'Release Pledged Gold',
      desc: isTelugu
        ? 'బ్యాంకులు లేదా ఫైనాన్స్ సంస్థల్లోని తాకట్టు రుణాన్ని పూర్తి నిధులతో క్లియర్ చేసి మిగులు నగదు అందిస్తాము.'
        : 'We clear outstanding bank or NBFC loan dues directly and return your surplus equity in hand.',
      actionText: isTelugu ? 'విధానం చూడండి' : 'Explore Release',
      href: '/#pledged-gold',
    },
    {
      id: 'valuation',
      icon: Scale,
      title: isTelugu ? 'కంప్యూటరైజ్డ్ స్వచ్ఛత పరీక్ష' : 'Computerized Gold Valuation',
      desc: isTelugu
        ? 'జర్మన్ ఎక్స్-రే క్యారెట్‌మీటర్ ద్వారా 100% పారదర్శకమైన ఖచ్చితమైన స్వచ్ఛత పరీక్ష — ఎటువంటి కోతలు లేకుండా.'
        : 'Instant non-destructive German XRF Karatmeter appraisal with zero melting, rubbing, or acid damage.',
      actionText: isTelugu ? 'స్వచ్ఛత వివరాలు' : 'Check Valuation',
      href: '/#calculator',
    },
    {
      id: 'loan-clearance',
      icon: ShieldCheck,
      title: isTelugu ? 'బ్యాంక్ లోన్ క్లియరెన్స్ సాయం' : 'Bank Gold Loan Clearance',
      desc: isTelugu
        ? 'అధిక వడ్డీ భారం నుంచి విముక్తి. బ్యాంకు రశీదు ఆధారంగా పూర్తి వసూలు ప్రక్రియలో న్యాయబద్ధమైన సహకారం.'
        : 'Transparent assistance in closing high-interest pledges with scheduled commercial banks and NBFCs.',
      actionText: isTelugu ? 'రుణ పరిష్కారం' : 'Pledge Assistance',
      href: '/#pledged-gold',
    },
    {
      id: 'doorstep',
      icon: Car,
      title: isTelugu ? 'డోర్‌స్టెప్ & బ్యాంక్ ఎస్కార్ట్' : 'Doorstep & Bank Escort',
      desc: isTelugu
        ? 'మా అధికారిక ప్రతినిధి నేరుగా మీ బ్యాంకు వద్దకే వచ్చి నగదు చెల్లించి ప్రక్రియను పూర్తి చేస్తారు.'
        : 'Authorized field officers accompany you to your bank branch with settlement liquidity.',
      actionText: isTelugu ? 'విజిట్ బుక్ చేయండి' : 'Book a Visit',
      isModalAction: true,
    },
    {
      id: 'rates-calculator',
      icon: Calculator,
      title: isTelugu ? 'లైవ్ బులియన్ కాలిక్యులేటర్' : 'Live Bullion Calculator',
      desc: isTelugu
        ? 'నేటి కడప రేటు ప్రకారం మీ బంగారం విలువ మరియు తాకట్టు విడిపిస్తే వచ్చే మిగులు నగదును లెక్కించండి.'
        : 'Interactive dual-engine tool to estimate spot cash payouts and pledged gold net surplus in seconds.',
      actionText: isTelugu ? 'కాలిక్యులేటర్ వాడండి' : 'Use Calculator',
      href: '/#calculator',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {isTelugu ? 'మా సేవా రంగాలు' : 'Core Services'}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'కడపలో అధికారిక బంగారు సేవలు' : 'Professional Gold & Bullion Services'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'ప్రతి సేవలోనూ పారదర్శకత, ఖచ్చితమైన బెంచ్‌మార్క్ ధరలు మరియు తక్షణ నగదు బదిలీ మా ప్రత్యేకత.'
              : 'Every service is built on transparent spot bullion benchmarks, non-destructive testing, and immediate settlement.'}
          </p>
        </div>

        {/* 6 Clean Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-gold-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-base font-bold text-slate-900 mb-2"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-xs text-slate-600 leading-relaxed mb-6"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {svc.desc}
                  </p>
                </div>

                <div>
                  {svc.isModalAction ? (
                    <button
                      type="button"
                      onClick={() => openBooking()}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-900 hover:text-gold-700 pt-3 border-t border-slate-200/80 group cursor-pointer"
                    >
                      <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                        {svc.actionText}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      href={svc.href!}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-900 hover:text-gold-700 pt-3 border-t border-slate-200/80 group"
                    >
                      <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                        {svc.actionText}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover:translate-x-1 transition-transform" />
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
