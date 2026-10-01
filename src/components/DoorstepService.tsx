'use client';

import React from 'react';
import { Car, MapPin, FileCheck2, UserCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';

export default function DoorstepService() {
  const { isTelugu } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <section id="doorstep" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {isTelugu ? 'ప్రత్యేక సౌకర్యం' : 'Local Escort Service'}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'మీ సౌలభ్యం కోసం ప్రత్యేక ప్రొఫెషనల్ సేవలు' : 'Professional Assistance, At Your Convenience.'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'కడప వ్యాప్తంగా బ్యాంకుల్లోని తాకట్టు రుణాన్ని క్లియర్ చేయడానికి మా అధికారిక ప్రతినిధి నేరుగా మీ వద్దకు వస్తారు.'
              : 'Our authorized officer accompanies you to your bank branch or residence with verified settlement liquidity.'}
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center mb-3.5">
                <Car className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-1.5"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '1. ఈ సేవ ఏమిటి?' : '1. What is the Service?'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'VR GOLD ప్రతినిధి అవసరమైన నగదు లేదా డిజిటల్ నిధులతో నేరుగా మీ వద్దకు లేదా బ్యాంక్ బ్రాంచ్‌కు వచ్చి లావాదేవీని పూర్తి చేయడం.'
                  : 'An authorized VR GOLD representative arrives directly at your location or bank counter with full clearance liquidity.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">Official Facilitation</span>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center mb-3.5">
                <MapPin className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-1.5"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '2. ఎక్కడ అందుబాటులో ఉంది?' : '2. Where is it Available?'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'కడప నగరం, NGO కాలనీ, Y-జంక్షన్ పరిసరాలు, ప్రొద్దుటూరు మరియు వైఎస్సార్ కడప జిల్లాలోని బ్యాంక్ శాఖల్లో అందుబాటులో ఉంది.'
                  : 'Covering Kadapa municipal limits, NGO Colony, Y-Junction area, Proddatur, and key regional hubs across Kadapa district.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">Kadapa Regional</span>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center mb-3.5">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-1.5"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '3. మీరు ఏమి అందించాలి?' : '3. What to Provide?'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'మీ చెల్లుబాటు అయ్యే ప్రభుత్వ గుర్తింపు కార్డు (ఆధార్/పాన్) మరియు అసలు బ్యాంక్ తాకట్టు స్లిప్ లేదా రశీదు.'
                  : 'Valid government identity proof (Aadhaar/PAN card) and the original pledge receipt or bank loan documentation.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">ID & Pledge Slip</span>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center mb-3.5">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3
                className="text-sm font-bold text-slate-900 mb-1.5"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '4. విజిట్ సమయంలో ఏం జరుగుతుంది?' : '4. During the Visit'}
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? 'అధికారి మీ సమక్షంలోనే బ్యాంకులో లోన్ క్లోజ్ చేస్తారు. బంగారం విడిపించి స్వచ్ఛత నిర్ధారించి మిగులు నగదును వెంటనే అందజేస్తారు.'
                  : 'The officer settles the loan directly at the bank counter, retrieves the ornaments, verifies purity, and hands over your balance.'}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-4 block">Immediate Settlement</span>
          </div>

        </div>

        {/* CTA Action */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#060D1A] hover:bg-slate-900 text-gold-300 hover:text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
              {isTelugu ? 'విజిట్ బుక్ చేయండి' : 'Request a Visit'}
            </span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </button>
          <p
            className="text-[11px] text-slate-500 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'కడప జిల్లాలోని బ్యాంక్ శాఖలకు సేవ అందుబాటులో ఉంది' : 'Available across scheduled bank branches in Kadapa'}
          </p>
        </div>

      </div>
    </section>
  );
}
