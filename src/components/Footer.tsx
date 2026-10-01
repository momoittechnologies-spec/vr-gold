"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  ShieldCheck,
  Clock,
  TrendingUp,
  Building2,
  Star,
  ArrowRight,
  ExternalLink,
  Landmark,
  Scale,
  Award,
  Lock,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RatesData {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver: number;
  mumbai24k?: number;
  mumbai22k?: number;
  hyderabad24k?: number;
  hyderabad22k?: number;
  proddatur24k?: number;
  proddatur22k?: number;
  liveApiSource?: string;
  updatedAt: string;
}

const SCHEDULED_BANKS = [
  "State Bank of India (SBI)",
  "Canara Bank",
  "Andhra Pragathi Grameena (APGB)",
  "Union Bank of India",
  "Indian Bank",
  "Bank of Baroda",
  "Punjab National Bank",
  "UCO Bank",
  "Karur Vysya Bank (KVB)",
  "Federal Bank",
  "South Indian Bank",
  "Muthoot Finance",
  "Manappuram Finance",
  "IIFL Gold Loans",
  "Shriram Finance",
  "Rupeek Gold",
];

export default function Footer() {
  const { isTelugu } = useLanguage();
  const [rates, setRates] = useState<RatesData | null>(null);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((d) => { if (d.rates) setRates(d.rates); })
      .catch(() => {});
  }, []);

  const cityRates = [
    {
      city: isTelugu ? "ముంబై (MCX)" : "Mumbai (Benchmark)",
      flag: "🏙️",
      r24: rates?.mumbai24k ?? rates?.gold24k ?? 7520,
      r22: rates?.mumbai22k ?? rates?.gold22k ?? 6890,
    },
    {
      city: isTelugu ? "హైదరాబాద్" : "Hyderabad",
      flag: "🌇",
      r24: rates?.hyderabad24k ?? (rates?.gold24k ? rates.gold24k - 10 : 7510),
      r22: rates?.hyderabad22k ?? (rates?.gold22k ? rates.gold22k - 10 : 6880),
    },
    {
      city: isTelugu ? "ప్రొద్దుటూరు" : "Proddatur",
      flag: "🏘️",
      r24: rates?.proddatur24k ?? (rates?.gold24k ? rates.gold24k - 20 : 7500),
      r22: rates?.proddatur22k ?? (rates?.gold22k ? rates.gold22k - 20 : 6870),
    },
    {
      city: isTelugu ? "కడప (హెడ్ డెస్క్)" : "Kadapa (Treasury)",
      flag: "📍",
      r24: rates?.gold24k ?? 7490,
      r22: rates?.gold22k ?? 6860,
      highlight: true,
    },
  ];

  return (
    <footer className="bg-[#040814] text-gray-400 border-t border-gold-500/25">

      {/* ─── Institutional Pre-Footer Assurance Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-red-800 via-rose-900 to-red-900 py-5 px-4 border-b border-red-700/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs uppercase tracking-widest font-black text-amber-300">
                {isTelugu ? 'కడప బ్యాంకింగ్ రిలీజ్ అత్యవసర డెస్క్' : 'Kadapa Banking Release Emergency Desk'}
              </span>
            </div>
            <p
              className="text-white font-black text-base sm:text-lg leading-snug"
              style={isTelugu ? { fontFamily: "var(--font-telugu), sans-serif" } : {}}
            >
              {isTelugu
                ? '⚡ ఈ రోజే బ్యాంకు తాకట్టు విడిపించుకోండి — VR GOLD సంపూర్ణ బాధ్యత & నగదు చెల్లింపు!'
                : '⚡ Liquidate or Release Your Pledged Bank Gold Today — Institutional Cash Settlement Guaranteed!'}
            </p>
            <p className="text-rose-200 text-xs sm:text-sm font-medium">
              {isTelugu
                ? 'అధికారిక డోర్‌స్టెప్ బ్యాంక్ ఎస్కార్ట్ అందుబాటులో ఉంది · కాల్ చేయగానే మీ బ్రాంచ్‌కే వస్తాం'
                : 'Direct Doorstep Bank Escort Protocol · Our Officer Visits Your Bank with Full Liquidity'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href="tel:8978973576"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Officer: 8978973576</span>
            </a>
            <a
              href="tel:8978977465"
              className="inline-flex items-center justify-center gap-2 bg-[#040814]/80 border border-gold-400/50 text-gold-300 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl hover:bg-[#040814] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Desk: 8978977465</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Multi-City Bullion Rates Board — Treasury Tier ─────────────────────────── */}
      <div className="bg-[#060D1E] border-b border-navy-800 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <TrendingUp className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-black uppercase tracking-widest text-gold-300">
                {isTelugu ? 'లైవ్ బులియన్ రేట్లు — నేటి మార్కెట్' : 'Institutional Bullion Indices — Daily Spot Rates'}
              </span>
              {rates?.liveApiSource === "live" && (
                <span className="text-[10px] text-emerald-400 font-semibold border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Live API Feed
                </span>
              )}
            </div>
            <div className="text-[11px] text-gray-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>
                {isTelugu ? 'ఖచ్చితమైన క్యారెట్‌మీటర్ పరీక్ష ఆధారంగా' : 'Benchmarked to MCX Spot & Calibrated via Karatmeter'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cityRates.map((c) => (
              <div
                key={c.city}
                className={`rounded-2xl p-4 border transition-all ${
                  c.highlight
                    ? "bg-gradient-to-b from-gold-500/15 via-[#0A1329] to-[#060D1E] border-gold-400/60 ring-1 ring-gold-400/40 shadow-lg shadow-gold-500/10"
                    : "bg-[#0A1329]/70 border-gray-800/80 hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{c.flag}</span>
                    <span
                      className={`text-xs font-black tracking-wide ${
                        c.highlight ? "text-gold-300" : "text-gray-300"
                      }`}
                    >
                      {c.city}
                    </span>
                  </div>
                  {c.highlight && (
                    <span className="text-[9px] bg-gold-500 text-navy-950 font-black px-1.5 py-0.5 rounded-md uppercase">
                      Head Office
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-400 font-medium">24K 999 Fine</span>
                    <span className={`font-black ${c.highlight ? "text-gold-300 text-sm" : "text-white"}`}>
                      ₹{c.r24.toLocaleString("en-IN")}/g
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-400 font-medium">22K 916 Standard</span>
                    <span className={`font-bold ${c.highlight ? "text-gold-400 text-sm" : "text-gray-300"}`}>
                      ₹{c.r22.toLocaleString("en-IN")}/g
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Footer 4-Column Corporate Banking Grid ─────────────────────────────── */}
      <div className="pt-14 pb-10 px-4 border-b border-navy-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Corporate Governance & Kadapa Treasury */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 border-2 border-gold-400 shadow-md shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="VR GOLD BUYER'S Official Crest"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  VR <span className="text-gold-400">GOLD BUYER&apos;S</span>
                </span>
                <span className="text-[10px] tracking-widest text-gold-300 font-bold uppercase block">
                  Kadapa Treasury &amp; Bullion Services
                </span>
              </div>
            </div>

            <p
              className="text-xs text-gray-300 leading-relaxed"
              style={isTelugu ? { fontFamily: "var(--font-telugu), sans-serif" } : {}}
            >
              {isTelugu
                ? "కడప నగరంలో రిజిస్టర్డ్ మరియు విశ్వసనీయమైన బంగారు ఆస్తుల పరిష్కార సంస్థ. షెడ్యూల్డ్ బ్యాంకులు మరియు ప్రైవేట్ ఫైనాన్స్ సంస్థల నుండి తాకట్టు బంగారాన్ని చట్టబద్ధంగా విడిపించి, తక్షణ నగదు మార్పిడి సౌకర్యం కల్పిస్తాం."
                : "Kadapa's premier gold asset resolution and physical bullion enterprise. Specializing in legal, transparent clearance of pledged bank loans and instant high-value spot settlements with zero hidden charges."}
            </p>

            <div className="p-3 rounded-xl bg-[#060D1E] border border-gold-500/20 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-gold-300 font-bold">
                <Landmark className="w-3.5 h-3.5 text-gold-400" />
                <span>Operating Credo: &ldquo;WE ARE FOR YOU&rdquo;</span>
              </div>
              <p className="text-gray-400 text-[10px]">
                Serving Kadapa, Proddatur, Pulivendula, Rayachoty &amp; the entire YSR Kadapa District.
              </p>
            </div>

            {/* Social Follow & Ratings */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                ))}
                <span className="text-[11px] text-gray-300 font-bold ml-1">5.0 / 5.0</span>
                <span className="text-[10px] text-gray-500">(1,250+ Verified Settlements)</span>
              </div>

              <a
                href="https://www.instagram.com/vrgoldbuyers2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 border border-rose-500/40 text-rose-300 hover:text-white hover:border-rose-400 text-xs font-bold transition-all w-fit group"
              >
                <svg className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Follow @vrgoldbuyers2026</span>
              </a>
            </div>
          </div>

          {/* Col 2 — Institutional Financial Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>{isTelugu ? 'ఆర్థిక సేవా రంగాలు' : 'Financial Clearing Services'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Bank Gold Loan Clearance", sub: "బ్యాంకు తాకట్టు విడుదల", href: "#doorstep" },
                { label: "Doorstep Treasury Settlement", sub: "డోర్‌స్టెప్ బ్యాంకింగ్ ఎస్కార్ట్", href: "#doorstep" },
                { label: "Instant IMPS / RTGS Spot Disbursal", sub: "స్పాట్ క్యాష్ / డిజిటల్ ట్రాన్స్‌ఫర్", href: "#calculator" },
                { label: "Computerized Karatmeter Audit", sub: "క్యారెట్‌మీటర్ స్వచ్ఛత పరీక్ష", href: "#why-us" },
                { label: "Live Bullion Valuation Engine", sub: "ప్రత్యక్ష గోల్డ్ కాలిక్యులేటర్", href: "#calculator" },
                { label: "Live Reels & Customer Proofs", sub: "లైవ్ ఇన్‌స్టాగ్రామ్ రీల్స్", href: "#instagram" },
                { label: "Public Pledge Status Tracking", sub: "తాకట్టు రిఫరెన్స్ ట్రాకింగ్", href: "/track" },
              ].map(({ label, sub, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-start gap-2 group hover:text-gold-400 transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 text-gold-600/60 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>
                      <span className="text-gray-300 group-hover:text-gold-300 font-semibold">{label}</span>
                      <span
                        className="block text-[10px] text-gray-500 group-hover:text-gold-600"
                        style={isTelugu ? { fontFamily: "var(--font-telugu), sans-serif" } : {}}
                      >
                        {sub}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Institutional Banking Clearing Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gold-400" />
              <span>{isTelugu ? 'బ్యాంకింగ్ క్లియరింగ్ నెట్‌వర్క్' : 'Banking Clearing Channels'}</span>
            </h4>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-2">
              {isTelugu
                ? "క్రింది అన్ని షెడ్యూల్డ్ కమర్షియల్ బ్యాంకులు & NBFCల నుండి అధికారిక రుణ క్లియరెన్స్ సౌకర్యం:"
                : "Authorized loan closure and immediate gold retrieval support across major institutional lenders:"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SCHEDULED_BANKS.map((bank) => (
                <span
                  key={bank}
                  className="text-[10px] font-semibold text-gray-300 bg-[#0A1329] border border-gray-800 px-2 py-0.5 rounded-md hover:border-gold-500/40 hover:text-gold-300 transition-colors cursor-default"
                >
                  {bank}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              + All Agricultural Cooperatives, Private Wealth NBFCs &amp; Regional Grameena Banks.
            </p>
          </div>

          {/* Col 4 — Kadapa Treasury Office & Officer Desk */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-gold-400" />
              <span>{isTelugu ? 'కడప కార్యాలయ చిరునామా' : 'Kadapa Treasury Desk'}</span>
            </h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-300 leading-relaxed">
                D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction,{" "}
                <span className="text-gold-300 font-semibold block">NGO Colony, KADAPA, A.P. — 516002</span>
              </span>
            </div>

            <div className="space-y-2">
              <a
                href="tel:8978973576"
                className="flex items-center gap-2.5 group hover:text-gold-400 transition-colors p-2 rounded-xl bg-[#060D1E] border border-gold-500/20"
              >
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">Principal Desk:</span>
                  <span className="text-white font-black text-sm group-hover:text-gold-300">
                    +91 89789 73576
                  </span>
                </div>
              </a>

              <a
                href="tel:8978977465"
                className="flex items-center gap-2.5 group hover:text-gold-400 transition-colors p-2 rounded-xl bg-[#060D1E] border border-gray-800"
              >
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">Secondary Line:</span>
                  <span className="text-white font-black text-sm group-hover:text-gold-300">
                    +91 89789 77465
                  </span>
                </div>
              </a>
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-emerald-950/20 border border-emerald-700/30 rounded-xl">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block">
                  Treasury Operational Hours
                </span>
                <span className="text-xs text-white font-bold">Monday – Sunday: 9:00 AM – 8:30 PM</span>
                <span
                  className="text-[11px] text-emerald-300 block mt-0.5"
                  style={isTelugu ? { fontFamily: "var(--font-telugu), sans-serif" } : {}}
                >
                  సోమవారం – ఆదివారం: ఉదయం 9 – రాత్రి 8:30 (నిరంతర సేవలు)
                </span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=VR+Gold+Buyers+Kadapa+NGO+Colony"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-bold transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Locate on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── Institutional Regulatory Compliance & Seals Strip ─────────────────────── */}
      <div className="bg-[#02050D] py-5 px-4 border-b border-navy-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-gray-300">100% Karatmeter Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-gold-400" />
              <span className="font-semibold text-gray-300">Instant Bank Disbursal Desk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-gray-300">256-Bit SSL Financial Encryption</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-gray-300">Auditable Digital Settlement Voucher</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-500">
            KYC Compliance: Government ID (Aadhaar/PAN) Mandatory for All Transactions.
          </div>
        </div>
      </div>

      {/* ─── Bottom Copyright & Architectural Signature ────────────────────────────── */}
      <div className="py-6 px-4 bg-[#040814]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} VR GOLD BUYER&apos;S ENTERPRISE. All rights reserved.</p>
            <span className="hidden sm:inline text-gray-700">·</span>
            <Link href="/track" className="hover:text-gold-400 transition-colors">
              Pledge Tracker
            </Link>
            <span className="text-gray-700">·</span>
            <Link href="/#calculator" className="hover:text-gold-400 transition-colors">
              Gold Calculator
            </Link>
            <span className="text-gray-700">·</span>
            <Link href="/admin/login" className="hover:text-gold-400 transition-colors">
              Treasury Staff Portal
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Engineered by</span>
            <a
              href="https://www.momoittechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 font-bold underline transition-colors"
            >
              MOMO IT TECHNOLOGIES, Kadapa
            </a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-gray-900/80 text-[10px] text-gray-600 leading-relaxed text-center sm:text-left">
          <p>
            DISCLAIMER: VR Gold Buyer&apos;s operates as an independent gold asset clearance facilitator in Kadapa, Andhra Pradesh. We facilitate the lawful redemption of pledged gold ornaments from nationalized banks, cooperative societies, and licensed NBFCs upon customer mandate. All valuations strictly adhere to daily spot bullion rates benchmarked to MCX/LBMA. Physical gold testing is conducted through non-destructive XRF Karatmeter spectrometry.
          </p>
        </div>
      </div>
    </footer>
  );
}
