'use client';

import React from 'react';
import { Scale, Award, FileText, UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TrustBar() {
  const { isTelugu } = useLanguage();

  const trustPoints = [
    {
      icon: Scale,
      titleEn: 'Transparent Gold Valuation',
      titleTe: 'పారదర్శకమైన బంగారు విలువ',
      descEn: 'Rates aligned with live daily bullion benchmarks without concealed deductions.',
      descTe: 'దాచిన కోతలు లేకుండా రోజువారీ ప్రత్యక్ష బులియన్ రేటు ఆధారిత లెక్కింపు.',
    },
    {
      icon: Award,
      titleEn: 'Verified Purity Testing',
      titleTe: 'ధృవీకరించబడిన స్వచ్ఛత పరీక్ష',
      descEn: 'Scientific, non-destructive German XRF Karatmeter testing conducted in your presence.',
      descTe: 'మీ కళ్ల ముందే కంప్యూటరైజ్డ్ క్యారెట్‌మీటర్‌తో ఖచ్చితమైన స్వచ్ఛత పరీక్ష.',
    },
    {
      icon: FileText,
      titleEn: 'Secure Documentation',
      titleTe: 'చట్టబద్ధమైన డాక్యుమెంటేషన్',
      descEn: 'Verifiable settlement receipts and clear digital valuation vouchers for every transaction.',
      descTe: 'ప్రతి లావాదేవీకి డిజిటల్ వోచర్ మరియు అధికారిక రశీదు అందజేయబడుతుంది.',
    },
    {
      icon: UserCheck,
      titleEn: 'Professional Assistance',
      titleTe: 'అనుభవజ్ఞులైన నిపుణుల సేవలు',
      descEn: 'Dedicated bank coordination team assisting with pledge release and doorstep clearance.',
      descTe: 'తాకట్టు విడుదల మరియు డోర్‌స్టెప్ సేవల్లో తోడ్పడే నమ్మకమైన సిబ్బంది.',
    },
  ];

  return (
    <section className="py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/60 border border-slate-200/70 hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className="text-xs sm:text-sm font-bold text-slate-900 leading-snug"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? item.titleTe : item.titleEn}
                  </h3>
                  <p
                    className="text-[11px] text-slate-600 mt-1 leading-relaxed"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? item.descTe : item.descEn}
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
