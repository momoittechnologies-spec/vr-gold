"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, MapPin, Zap, Star, Clock, BadgeCheck } from "lucide-react";

interface RatesData {
  gold24k: number;
  gold22k: number;
}

export default function Hero() {
  const [rates, setRates] = useState<RatesData>({ gold24k: 7520, gold22k: 6890 });

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((d) => { if (d.rates) setRates(d.rates); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-white">
      {/* Decorative Gold Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none overflow-hidden -z-10 opacity-70">
        <div className="absolute -top-24 left-1/4 w-[450px] h-[450px] bg-gold-300/30 rounded-full blur-[110px]" />
        <div className="absolute top-16 right-1/4 w-[420px] h-[420px] bg-amber-400/25 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Official Brand Emblem Badge */}
        <div className="inline-block mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white p-1.5 border-2 border-gold-400 shadow-xl shadow-gold-500/25 mx-auto hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="VR GOLD BUYER'S Official Emblem"
              width={112}
              height={112}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-300 shadow-sm shadow-gold-500/10 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-navy-950">
            VR GOLD BUYER&apos;S · KADAPA
          </span>
          <span className="text-xs text-gold-700 font-bold border-l border-gold-300 pl-2">
            WE ARE FOR YOU
          </span>
        </div>

        {/* Telugu Urgent Banner */}
        <div
          className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-extrabold text-sm sm:text-base md:text-lg px-5 py-2.5 rounded-2xl max-w-2xl mx-auto shadow-md mb-6 animate-pulse"
          style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
        >
          ⚠️ మీరు బ్యాంకులో తాకట్టు పెట్టిన బంగారానికి అధిక వడ్డీ కట్టి అష్టకష్టాలు పడుతున్నారా?
        </div>

        {/* Grand Telugu Headline */}
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-black text-navy-950 tracking-tight leading-[1.2] max-w-4xl mx-auto mb-4"
          style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
        >
          తాకట్టు బంగారాన్ని విడిపించి{" "}
          <span className="bg-gradient-to-r from-amber-600 via-gold-600 to-amber-700 bg-clip-text text-transparent">
            నేడు మార్కెట్ రేటుకే
          </span>{" "}
          కొనుగోలు చేయబడును
        </h1>

        {/* Telugu Subheading */}
        <p
          className="text-lg sm:text-xl text-emerald-800 font-bold max-w-2xl mx-auto mb-3"
          style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
        >
          ఒక్క కాల్‌తో మీ ఇంటికే వచ్చి, బ్యాంకు అప్పు తీర్చి, మిగతా డబ్బు వెంటనే చేతిలో పెడతాం.
        </p>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Release your pledged gold from SBI, Canara, APGB, Andhra Bank, Muthoot, Manappuram &amp; all private finance companies — with 100% transparent market rate settlement and zero hidden charges.
        </p>

        {/* Live Rate Display */}
        <div className="inline-flex items-center gap-3 bg-navy-950 text-white px-5 py-2.5 rounded-xl shadow-lg mb-6 border border-gold-500/30">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-gold-300 font-bold text-sm uppercase tracking-wide">Today&apos;s Kadapa Rate:</span>
          <span className="text-white font-black text-base">24K ₹{rates.gold24k.toLocaleString("en-IN")}/g</span>
          <span className="text-gold-400 font-bold text-sm">| 22K ₹{rates.gold22k.toLocaleString("en-IN")}/g</span>
        </div>

        {/* Doorstep USP Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-500/60 max-w-3xl mx-auto mb-8 shadow-sm text-left sm:text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span
                className="text-sm font-black text-emerald-900 block"
                style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
              >
                🏠 మీ ఇంటికే వచ్చే డోర్‌స్టెప్ సేవ
              </span>
              <p
                className="text-xs sm:text-sm font-semibold text-emerald-800 mt-0.5"
                style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
              >
                "కాల్ చేసిన వెంటనే బ్యాంకుకు తీసుకెళ్ళి, లోన్ క్లోజ్ చేసి డబ్బులు ఇస్తాం."
              </p>
            </div>
          </div>
          <a
            href="tel:8978973576"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shrink-0 transition-transform hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span>ఇప్పుడే కాల్ చేయండి</span>
          </a>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <a
            href="tel:8978973576"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-lg shadow-gold-500/30 hover:scale-[1.02] transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call: 8978973576</span>
          </a>
          <a
            href="tel:8978977465"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-extrabold text-sm shadow-md transition-all"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Call: 8978977465</span>
          </a>
          <Link
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-sm shadow-xs transition-colors"
          >
            <span>బంగారం విలువ చెక్ చేయండి</span>
            <ArrowRight className="w-4 h-4 text-gold-600" />
          </Link>
        </div>

        {/* 3-Pillar Trust Cards — Bilingual */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl border border-gold-200 shadow-sm p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-gold-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-gold-600" />
              </div>
              <span className="text-xs font-black uppercase text-navy-950 tracking-wide">Highest Rate Guaranteed</span>
            </div>
            <p
              className="text-sm font-bold text-emerald-800"
              style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
            >
              మార్కెట్‌లో అత్యధిక రేటు — మేమే ఇస్తాం
            </p>
            <p className="text-xs text-gray-500 mt-1">Daily MCX bullion rate, verified by Karatmeter</p>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-black uppercase text-navy-950 tracking-wide">Same-Day Settlement</span>
            </div>
            <p
              className="text-sm font-bold text-emerald-800"
              style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
            >
              ఈ రోజే బ్యాంకు లోన్ క్లోజ్ — ఈ రోజే డబ్బు చేతిలో
            </p>
            <p className="text-xs text-gray-500 mt-1">Instant IMPS / RTGS / Cash payout after bank clearance</p>
          </div>

          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-black uppercase text-navy-950 tracking-wide">Zero Hidden Charges</span>
            </div>
            <p
              className="text-sm font-bold text-emerald-800"
              style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
            >
              దాచిన చార్జీలు శూన్యం — పూర్తి పారదర్శకత
            </p>
            <p className="text-xs text-gray-500 mt-1">No processing fees. No deductions. Rate is rate.</p>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-gray-200/80 text-xs">
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Karatmeter Purity</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
            <span>Spot Cash / UPI</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <Star className="w-4 h-4 text-amber-500 shrink-0" />
            <span>All Banks Covered</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <MapPin className="w-4 h-4 text-red-600 shrink-0" />
            <span>NGO Colony, Kadapa</span>
          </div>
        </div>
      </div>
    </section>
  );
}
