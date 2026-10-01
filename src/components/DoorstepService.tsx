'use client';

import React from 'react';
import { Car, MapPin, FileCheck2, UserCheck, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
  onOpenBooking?: (grams?: number, bank?: string) => void;
}

export default function DoorstepService({ onOpenBooking }: Props) {
  const { isTelugu } = useLanguage();

  return (
    <section id="doorstep" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {isTelugu ? 'ప్రత్యేక సౌకర్యం' : 'Premium Concierge Service'}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'డోర్‌స్టెప్ & బ్యాంక్ ఎస్కార్ట్ సేవ' : 'Doorstep & Bank Branch Escort Service'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'మీరు మా బ్రాంచ్‌కు రాలేని పరిస్థితుల్లో లేదా బ్యాంక్ వద్దకే నిధులతో హాజరు కావాలనుకున్నప్పుడు మా అధికారిక ప్రతినిధి నేరుగా వస్తారు.'
              : 'Our verified officer accompanies you to your bank branch or residence with verified settlement funds for a seamless clearance experience.'}
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Pillar 1: What the service is */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-4">
                <Car className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-2"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '1. ఈ సేవ ఏమిటి?' : '1. What is the Service?'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'VR GOLD అధికారిక ప్రతినిధి అవసరమైన నగదు/డిజిటల్ నిధులతో నేరుగా మీ వద్దకు లేదా మీ బ్యాంక్ బ్రాంచ్‌కు వచ్చి లావాదేవీని పూర్తి చేయడం.'
                  : 'An authorized VR GOLD representative arrives directly at your location or bank counter with full clearance liquidity.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">Official Facilitation</span>
          </div>

          {/* Pillar 2: Where it is available */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-2"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '2. ఎక్కడ అందుబాటులో ఉంది?' : '2. Where is it Available?'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'కడప నగరం, NGO కాలనీ, Y-జంక్షన్ పరిసరాలు, ప్రొద్దుటూరు మరియు వైఎస్సార్ కడప జిల్లాలోని ప్రధాన ప్రాంతాలలో అందుబాటులో ఉంది.'
                  : 'Covering Kadapa municipal limits, NGO Colony, Y-Junction area, Proddatur, and key regional hubs across Kadapa district.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">Kadapa & Regional</span>
          </div>

          {/* Pillar 3: What customer provides */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-2"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '3. మీరు ఏమి అందించాలి?' : '3. What to Provide?'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'మీ చెల్లుబాటు అయ్యే ప్రభుత్వ గుర్తింపు కార్డు (ఆధార్/పాన్), బ్యాంక్ తాకట్టు స్లిప్ లేదా రశీదు మరియు బంగారం కొనుగోలు వివరాలు.'
                  : 'Valid government identity proof (Aadhaar/PAN card) and the original pledge receipt or bank loan documentation.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">ID & Loan Receipt</span>
          </div>

          {/* Pillar 4: What happens during visit */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-2"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '4. విజిట్ సమయంలో ఏం జరుగుతుంది?' : '4. During the Visit'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'అధికారి మీ సమక్షంలోనే బ్యాంకు కౌంటర్‌లో లోన్ క్లోజ్ చేస్తారు. బంగారం విడిపించి స్వచ్ఛత నిర్ధారించి మిగులు నగదు వెంటనే అందజేస్తారు.'
                  : 'The officer settles the loan directly at the bank counter, retrieves the ornaments, verifies purity, and hands over your balance.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">Immediate Settlement</span>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="text-center">
          {onOpenBooking ? (
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy-950 hover:bg-slate-900 text-gold-300 hover:text-white font-bold text-sm shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <span>{isTelugu ? 'డోర్‌స్టెప్ విజిట్ బుక్ చేయండి' : 'Request a Visit'}</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </button>
          ) : (
            <a
              href="tel:8978973576"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Kadapa Desk: 8978973576</span>
            </a>
          )}
          <p className="text-[11px] text-slate-500 mt-2.5">
            {isTelugu ? 'కడప జిల్లాలోని బ్యాంక్ శాఖలకు సేవ అందుబాటులో ఉంది' : 'Available across scheduled bank branches in Kadapa'}
          </p>
        </div>

      </div>
    </section>
  );
}
