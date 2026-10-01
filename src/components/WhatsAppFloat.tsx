'use client';

import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WhatsAppFloat() {
  const { isTelugu } = useLanguage();

  const whatsappUrl = `https://wa.me/918978973576?text=${encodeURIComponent(
    "Hi VR GOLD Kadapa! I want to check today's gold rate / release pledged gold from my bank."
  )}`;

  return (
    <>
      {/* Sticky Bottom Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center gap-2 shadow-lg">
        <a
          href="tel:8978973576"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 text-gold-300 font-bold text-xs shadow-xs"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{isTelugu ? 'కాల్ 8978973576' : 'Call 8978973576'}</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Floating Desktop WhatsApp Button */}
      <aside aria-label="Quick contact" className="hidden sm:block fixed bottom-6 right-6 z-30">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
          <span className="font-bold text-xs tracking-wide">
            {isTelugu ? 'వాట్సాప్ డెస్క్' : 'WhatsApp Desk'}
          </span>
        </a>
      </aside>
    </>
  );
}
