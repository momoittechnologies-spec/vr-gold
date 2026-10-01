'use client';

import React from 'react';
import Link from 'next/link';
import { Coins, Building2, Scale, Car, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';

export default function ServiceSelector() {
  const { isTelugu } = useLanguage();
  const { openBooking } = useBooking();

  const services = [
    {
      id: 'sell',
      icon: Coins,
      title: isTelugu ? 'బంగారం అమ్మకం' : 'Sell Gold',
      desc: isTelugu
        ? 'నేటి లైవ్ మార్కెట్ రేటుతో పాత బంగారానికి తక్షణ స్పాట్ క్యాష్ లేదా బ్యాంక్ IMPS పొందండి.'
        : 'Receive immediate spot cash or IMPS transfer for your gold ornaments at daily bullion rates.',
      cta: isTelugu ? 'రేటు లెక్కించండి' : 'Calculate Payout',
      href: '/#calculator',
      isModal: false,
    },
    {
      id: 'pledge',
      icon: Building2,
      title: isTelugu ? 'తాకట్టు విడుదల' : 'Release Pledged Gold',
      desc: isTelugu
        ? 'మేము మీ బ్యాంక్ అప్పు పూర్తి నిధులతో చెల్లించి మీ బంగారాన్ని విడిపించి మిగులు నగదును అందజేస్తాము.'
        : 'We clear your bank loan dues directly at the branch counter and hand over your surplus cash.',
      cta: isTelugu ? 'విధానం చూడండి' : 'Explore Release',
      href: '/#pledged-gold',
      isModal: false,
    },
    {
      id: 'valuation',
      icon: Scale,
      title: isTelugu ? 'గోల్డ్ వ్యాల్యుయేషన్' : 'Get Gold Valuation',
      desc: isTelugu
        ? 'జర్మన్ కంప్యూటరైజ్డ్ క్యారెట్‌మీటర్ ద్వారా ఎటువంటి రాపిడి లేకుండా ఉచిత స్వచ్ఛత పరీక్ష.'
        : 'Instant non-destructive German Karatmeter purity appraisal with zero damage or weight loss.',
      cta: isTelugu ? 'విలువ చూడండి' : 'Check Valuation',
      href: '/#calculator',
      isModal: false,
    },
    {
      id: 'doorstep',
      icon: Car,
      title: isTelugu ? 'విజిట్ బుక్ చేయండి' : 'Request a Visit',
      desc: isTelugu
        ? 'కడప వ్యాప్తంగా మీ ఇంటి వద్దకు లేదా బ్యాంక్ వద్దకే వచ్చే అధికారిక ఎస్కార్ట్ సేవ.'
        : 'Authorized doorstep representative and bank branch escort anywhere across Kadapa.',
      cta: isTelugu ? 'విజిట్ బుక్ చేయండి' : 'Book a Visit',
      isModal: true,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full">
            {isTelugu ? 'సేవల ఎంపిక' : 'Primary Entry Point'}
          </span>
          <h2
            className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'మేము మీకు ఏ విధంగా సహాయపడగలం?' : 'What can we help you with?'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'మీ అవసరానికి తగిన సేవను ఎంచుకోండి — తక్షణ సహాయం మరియు పారదర్శక విధానం.'
              : 'Choose a service to begin — transparent pricing, professional support, and rapid turnaround.'}
          </p>
        </div>

        {/* 4 Clean Scannable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-gold-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-base font-bold text-slate-900 mb-2"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-slate-600 leading-relaxed mb-6"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {item.desc}
                  </p>
                </div>

                <div>
                  {item.isModal ? (
                    <button
                      type="button"
                      onClick={() => openBooking()}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-900 hover:text-gold-700 pt-3 border-t border-slate-100 group cursor-pointer"
                    >
                      <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                        {item.cta}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-900 hover:text-gold-700 pt-3 border-t border-slate-100 group"
                    >
                      <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                        {item.cta}
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
