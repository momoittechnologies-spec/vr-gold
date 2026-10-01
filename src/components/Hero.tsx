"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, MapPin, Zap, Star, Clock, BadgeCheck, Landmark, Scale, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RatesData {
  gold24k: number;
  gold22k: number;
}

export default function Hero() {
  const { isTelugu } = useLanguage();
  const [rates, setRates] = useState<RatesData>({ gold24k: 7520, gold22k: 6890 });

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((d) => { if (d.rates) setRates(d.rates); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-white">
      {/* Decorative Luxury Gold Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10 opacity-70">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-gold-300/25 rounded-full blur-[130px]" />
        <div className="absolute top-16 right-1/4 w-[450px] h-[450px] bg-amber-400/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Official Brand Emblem Badge */}
        <div className="inline-block mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white p-1.5 border-2 border-gold-400 shadow-2xl shadow-gold-500/30 mx-auto hover:scale-105 transition-transform">
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

        {/* Institutional Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-300/80 shadow-xs shadow-gold-500/10 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-navy-950">
            VR GOLD BUYER&apos;S · BULLION &amp; TREASURY SERVICES
          </span>
          <span className="text-[11px] sm:text-xs text-gold-700 font-bold border-l border-gold-300 pl-2">
            KADAPA · WE ARE FOR YOU
          </span>
        </div>

        {/* Urgent Callout Banner */}
        <div
          className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white font-extrabold text-sm sm:text-base md:text-lg px-5 py-2.5 rounded-2xl max-w-2xl mx-auto shadow-lg shadow-red-900/15 mb-6"
          style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
        >
          {isTelugu ? (
            '⚠️ మీరు బ్యాంకులో తాకట్టు పెట్టిన బంగారానికి అధిక వడ్డీ కట్టి అష్టకష్టాలు పడుతున్నారా?'
          ) : (
            '⚠️ Paying excessive monthly interest on pledged bank gold? Stop your interest outflow today.'
          )}
        </div>

        {/* Grand Headline */}
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-black text-navy-950 tracking-tight leading-[1.2] max-w-4xl mx-auto mb-4"
          style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
        >
          {isTelugu ? (
            <>
              తాకట్టు బంగారాన్ని విడిపించి{' '}
              <span className="bg-gradient-to-r from-amber-600 via-gold-600 to-amber-700 bg-clip-text text-transparent">
                నేడు మార్కెట్ రేటుకే
              </span>{' '}
              కొనుగోలు చేయబడును
            </>
          ) : (
            <>
              Release Your Pledged Bank Gold at{' '}
              <span className="bg-gradient-to-r from-amber-600 via-gold-600 to-amber-700 bg-clip-text text-transparent">
                Today&apos;s Highest Bullion Rate
              </span>
            </>
          )}
        </h1>

        {/* Subheading */}
        <p
          className="text-base sm:text-xl text-emerald-900 font-bold max-w-2xl mx-auto mb-3"
          style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
        >
          {isTelugu
            ? 'ఒక్క కాల్‌తో మీ ఇంటికే వచ్చి, బ్యాంకు అప్పు తీర్చి, మిగతా డబ్బు వెంటనే చేతిలో పెడతాం.'
            : 'Bank loan principal & interest cleared on the spot. Full surplus cash handed over with 100% transparent settlement.'}
        </p>

        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          {isTelugu
            ? 'SBI, Canara, APGB, Andhra Bank, Muthoot, Manappuram & అన్ని ప్రైవేట్ ఫైనాన్స్ సంస్థల నుండి పారదర్శక మార్కెట్ రేటుతో తాకట్టు విముక్తి.'
            : 'Release gold ornaments from SBI, Canara Bank, APGB, Andhra Bank, Muthoot, Manappuram, IIFL & cooperative societies across Kadapa with zero hidden deductions.'}
        </p>

        {/* Live Rate Display — Bank Treasury Style */}
        <div className="inline-flex items-center gap-3 bg-[#050B17] text-white px-5 py-3 rounded-2xl shadow-xl mb-6 border border-gold-500/40">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-gold-300 font-bold text-xs sm:text-sm uppercase tracking-wide">
            {isTelugu ? 'నేటి కడప లైవ్ బులియన్ రేటు:' : "Today's Kadapa Treasury Rate:"}
          </span>
          <span className="text-white font-black text-sm sm:text-base">24K ₹{rates.gold24k.toLocaleString("en-IN")}/g</span>
          <span className="text-gold-400 font-bold text-xs sm:text-sm">| 22K ₹{rates.gold22k.toLocaleString("en-IN")}/g</span>
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
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu ? '🏠 మీ ఇంటికే వచ్చే డోర్‌స్టెప్ సేవ' : '🏠 Doorstep Bank Clearance Executive'}
              </span>
              <p
                className="text-xs sm:text-sm font-semibold text-emerald-800 mt-0.5"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? '"కాల్ చేసిన వెంటనే బ్యాంకుకు తీసుకెళ్ళి, లోన్ క్లోజ్ చేసి డబ్బులు ఇస్తాం."'
                  : '"Our verified officer visits your bank branch, settles the full loan balance, and pays your surplus."'}
              </p>
            </div>
          </div>
          <a
            href="tel:8978973576"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shrink-0 transition-transform hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            <span>{isTelugu ? 'ఇప్పుడే కాల్ చేయండి' : 'Request Bank Visit'}</span>
          </a>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <a
            href="tel:8978973576"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-sm shadow-lg shadow-gold-500/30 hover:scale-[1.02] transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Officer: 8978973576</span>
          </a>
          <a
            href="tel:8978977465"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#050B17] hover:bg-navy-900 text-white font-extrabold text-sm shadow-md transition-all"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Desk: 8978977465</span>
          </a>
          <Link
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-sm shadow-xs transition-colors"
          >
            <span>{isTelugu ? 'బంగారం విలువ చెక్ చేయండి' : 'Calculate Gold Payout'}</span>
            <ArrowRight className="w-4 h-4 text-gold-600" />
          </Link>
        </div>

        {/* 3-Pillar Institutional Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl border border-gold-200 shadow-sm p-4 text-left hover:border-gold-400 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-gold-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-gold-600" />
              </div>
              <span className="text-xs font-black uppercase text-navy-950 tracking-wide">
                {isTelugu ? 'గరిష్ట మార్కెట్ రేటు' : 'Highest Market Benchmark'}
              </span>
            </div>
            <p
              className="text-sm font-bold text-emerald-800"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu ? 'మార్కెట్‌లో అత్యధిక రేటు — మేమే ఇస్తాం' : 'Daily Bullion Reference Rate'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isTelugu ? 'MCX బులియన్ రేటు మరియు క్యారెట్‌మీటర్ ఖచ్చితత్వం' : 'Real-time multi-city rates & German XRF Karatmeter testing'}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-4 text-left hover:border-emerald-400 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-black uppercase text-navy-950 tracking-wide">
                {isTelugu ? 'అదే రోజు సెటిల్‌మెంట్' : 'Same-Day Full Settlement'}
              </span>
            </div>
            <p
              className="text-sm font-bold text-emerald-800"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu ? 'ఈ రోజే బ్యాంకు లోన్ క్లోజ్ — ఈ రోజే నగదు' : 'Zero Waiting Period'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isTelugu ? 'బ్యాంక్ లోన్ క్లియర్ కాగానే తక్షణ నగదు / IMPS' : 'Instant IMPS / RTGS / Cash payout immediately upon bank release'}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-4 text-left hover:border-blue-400 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-black uppercase text-navy-950 tracking-wide">
                {isTelugu ? 'దాచిన చార్జీలు లేవు' : '100% Institutional Transparency'}
              </span>
            </div>
            <p
              className="text-sm font-bold text-emerald-800"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu ? 'దాచిన చార్జీలు శూన్యం — పూర్తి పారదర్శకత' : 'Auditable Digital Voucher'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isTelugu ? 'నో ప్రాసెసింగ్ ఫీజు, నో దాచిన కట్స్' : 'Official settlement breakdown voucher with verifiable code'}
            </p>
          </div>
        </div>

        {/* Institutional Trust Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-gray-200/80 text-xs">
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{isTelugu ? 'క్యారెట్‌మీటర్ స్వచ్ఛత' : 'Karatmeter Certified'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
            <span>{isTelugu ? 'స్పాట్ క్యాష్ / IMPS' : 'Instant Disbursal Desk'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <Landmark className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{isTelugu ? '16+ బ్యాంకులు కవర్' : '16+ Scheduled Banks'}</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-bold text-gray-700 bg-gray-50/80 py-2.5 px-3 rounded-xl border border-gray-200">
            <MapPin className="w-4 h-4 text-red-600 shrink-0" />
            <span>{isTelugu ? 'NGO కాలనీ, కడప' : 'NGO Colony, Kadapa'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
