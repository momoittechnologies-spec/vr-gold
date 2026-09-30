"use client";

import React from "react";
import { MapPin, Phone, Clock, MessageSquare, Navigation, ShieldCheck } from "lucide-react";

export default function ContactLocation() {
  const address = "D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, KADAPA, Andhra Pradesh";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "VR GOLD Beside Mruthunjayakunta Sivalayam NGO Colony Kadapa"
  )}`;

  return (
    <section id="location" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-gold-700 bg-gold-100 px-3 py-1 rounded-full">
            Visit Our Branch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight mt-3">
            VR Gold Buyer&apos;s Kadapa Branch
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Located conveniently near Y-Junction, NGO Colony, Kadapa. Walk in for instant valuation or call for doorstep bank service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Address & Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Branch Address
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-navy-950 mt-1 leading-snug">
                    D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, KADAPA.
                  </p>
                  <span className="text-xs text-gold-700 font-semibold mt-1 block">
                    Landmark: Beside Mruthunjayakunta Sivalayam
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Direct Contact / Helpline
                  </span>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <a
                      href="tel:8978973576"
                      className="text-base font-black text-gold-700 hover:text-gold-800 transition-colors"
                    >
                      +91 89789 73576
                    </a>
                    <span className="text-gray-300">|</span>
                    <a
                      href="tel:8978977465"
                      className="text-base font-black text-navy-950 hover:text-gold-700 transition-colors"
                    >
                      +91 89789 77465
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Working Hours
                  </span>
                  <p className="text-sm font-bold text-navy-950 mt-0.5">
                    Monday to Sunday: 09:00 AM – 08:30 PM
                  </p>
                  <span className="text-xs text-emerald-700 font-medium">Open All 7 Days For Urgent Needs</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-extrabold text-xs shadow-md transition-all"
              >
                <Navigation className="w-4 h-4 text-gold-400" />
                <span>Get Google Maps Route</span>
              </a>
              <a
                href="https://wa.me/918978973576?text=Hi%20VR%20GOLD%20Kadapa!%20I%20need%20to%20visit%20your%20NGO%20Colony%20branch%20today."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Location</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Embed Card */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-gold-300 shadow-xl bg-gray-100 min-h-[360px] relative flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="w-16 h-16 rounded-2xl bg-gold-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-gold-500/30">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-navy-950 mb-2">
              VR GOLD BUYER&apos;S — KADAPA
            </h3>
            <p className="text-xs text-gray-700 max-w-sm mb-6 leading-relaxed">
              D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, KADAPA.
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-400 text-xs font-black shadow-md transition-all hover:scale-105"
            >
              <span>Open in Google Maps App</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
