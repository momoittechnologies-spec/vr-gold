'use client';

import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Navigation } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactLocation() {
  const { isTelugu } = useLanguage();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "VR GOLD Beside Mruthunjayakunta Sivalayam NGO Colony Kadapa"
  )}`;

  const whatsappUrl = `https://wa.me/918978973576?text=${encodeURIComponent(
    "Hi VR GOLD Kadapa! Please share your branch location and directions."
  )}`;

  return (
    <section id="location" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {isTelugu ? 'కడప బ్రాంచ్' : 'Branch Location'}
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'VR GOLD కడప బ్రాంచ్ వివరాలు' : 'VR GOLD — Kadapa Branch'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'NGO కాలనీ, Y-జంక్షన్ సమీపంలో మా హెడ్ బ్రాంచ్ ఉంది. స్వచ్ఛత పరీక్ష మరియు ప్రత్యక్ష సంప్రదింపులకు ఎప్పుడైనా రావచ్చు.'
              : 'Conveniently located near Y-Junction, NGO Colony, Kadapa. Walk in for instant valuation or call our helpline.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address & Contact Details */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Address Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isTelugu ? 'బ్రాంచ్ చిరునామా' : 'Branch Address'}
                  </span>
                  <p className="text-sm font-extrabold text-slate-900 mt-1 leading-snug">
                    D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, KADAPA, Andhra Pradesh – 516002.
                  </p>
                  <span
                    className="text-xs text-gold-700 font-semibold mt-1 block"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? 'ల్యాండ్‌మార్క్: మృత్యుంజయకుంట శివాలయం పక్కన' : 'Landmark: Beside Mruthunjayakunta Sivalayam'}
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-[#060D1A] text-gold-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isTelugu ? 'పనివేళలు' : 'Working Hours'}
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    Monday to Sunday: 09:00 AM – 08:30 PM
                  </p>
                  <span
                    className="text-xs text-emerald-700 font-semibold mt-0.5 block"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? 'వారంలో 7 రోజులూ సేవలు అందుబాటులో ఉన్నాయి' : 'Open all 7 days for customer service'}
                  </span>
                </div>
              </div>

              {/* Helpline Contact */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-gold-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {isTelugu ? 'ప్రత్యక్ష హెల్ప్‌లైన్' : 'Direct Helpline'}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a
                      href="tel:8978973576"
                      className="text-base font-black text-slate-900 hover:text-gold-700 transition-colors"
                    >
                      8978973576
                    </a>
                    <span className="text-slate-300">|</span>
                    <a
                      href="tel:8978977465"
                      className="text-base font-black text-slate-900 hover:text-gold-700 transition-colors"
                    >
                      8978977465
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#060D1A] text-white hover:bg-slate-900 font-bold text-xs shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4 text-gold-400" />
                <span>Google Maps Route</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Location</span>
              </a>
            </div>

          </div>

          {/* Right Column: Directional Map Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 rounded-2xl bg-slate-100 border border-slate-200/90 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>Kadapa City Landmark</span>
                </div>
                <h3
                  className="text-xl font-black text-slate-900"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu ? 'సులభమైన రవాణా & చేరుకునే మార్గం' : 'Easy Access & Landmark Guidance'}
                </h3>
                <p
                  className="text-xs text-slate-600 leading-relaxed"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu
                    ? 'కడప Y-జంక్షన్ నుండి NGO కాలనీ వైపు వచ్చే ప్రధాన మార్గంలో, మృత్యుంజయకుంట శివాలయం పక్కనే మా బ్రాంచ్ కలదు. కస్టమర్ల కోసం ప్రత్యేక పార్కింగ్ సదుపాయం ఉంది.'
                    : 'Located on the main approach from Y-Junction towards NGO Colony, right beside Mruthunjayakunta Sivalayam. Dedicated customer parking is available.'}
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <span>From Y-Junction Kadapa: 2 mins drive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <span>From RTC Main Bus Stand: 8 mins drive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500" />
                    <span>From Kadapa Railway Station: 12 mins drive</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs shadow-xs transition-colors"
                >
                  <Navigation className="w-4 h-4 text-gold-600" />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
