"use client";

import React from "react";
import { MessageSquare, Phone } from "lucide-react";

export default function WhatsAppFloat() {
  const whatsappUrl = `https://wa.me/918978973576?text=${encodeURIComponent(
    "Hi VR GOLD Kadapa! I want to check today's gold rate / release pledged gold from my bank."
  )}`;

  return (
    <>
      {/* Sticky Bottom Bar on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-gold-200 px-3 py-2 flex items-center gap-2 shadow-2xl">
        <a
          href="tel:8978973576"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gold-600 text-white font-extrabold text-xs shadow-md"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 8978973576</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Floating Desktop WhatsApp Button */}
      <aside aria-label="Quick contact" className="hidden sm:block fixed bottom-6 right-6 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
          <span className="font-extrabold text-xs tracking-wide">
            Instant Gold Valuation
          </span>
        </a>
      </aside>
    </>
  );
}
