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
} from "lucide-react";

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

const BANKS = [
  "SBI",
  "Canara Bank",
  "Andhra Bank",
  "APGB",
  "Indian Bank",
  "UCO Bank",
  "Bank of Baroda",
  "Union Bank",
  "Muthoot Finance",
  "Manappuram",
  "IIFL Gold",
  "Rupeek",
  "KVB",
  "Karur Vysya",
  "Federal Bank",
  "South Indian Bank",
];

export default function Footer() {
  const [rates, setRates] = useState<RatesData | null>(null);

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((d) => { if (d.rates) setRates(d.rates); })
      .catch(() => {});
  }, []);

  const cityRates = [
    {
      city: "Mumbai",
      flag: "🏙️",
      r24: rates?.mumbai24k ?? rates?.gold24k ?? 7520,
      r22: rates?.mumbai22k ?? rates?.gold22k ?? 6890,
    },
    {
      city: "Hyderabad",
      flag: "🌇",
      r24: rates?.hyderabad24k ?? (rates?.gold24k ? rates.gold24k - 10 : 7510),
      r22: rates?.hyderabad22k ?? (rates?.gold22k ? rates.gold22k - 10 : 6880),
    },
    {
      city: "Proddatur",
      flag: "🏘️",
      r24: rates?.proddatur24k ?? (rates?.gold24k ? rates.gold24k - 20 : 7500),
      r22: rates?.proddatur22k ?? (rates?.gold22k ? rates.gold22k - 20 : 6870),
    },
    {
      city: "Kadapa",
      flag: "📍",
      r24: rates?.gold24k ?? 7490,
      r22: rates?.gold22k ?? 6860,
      highlight: true,
    },
  ];

  return (
    <footer className="bg-navy-950 text-gray-400">

      {/* ─── Pre-footer Emergency CTA Banner ───────────────────────────────────────── */}
      <div
        className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 py-5 px-4"
        style={{ fontFamily: "var(--font-telugu), sans-serif" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-white font-black text-base sm:text-lg leading-snug">
              ⚡ ఈ రోజే బ్యాంకు తాకట్టు విడిపించుకోండి — VR GOLD అండగా ఉంది!
            </p>
            <p className="text-rose-200 text-xs sm:text-sm font-medium mt-0.5">
              డోర్‌స్టెప్ సేవ అందుబాటులో ఉంది · కాల్ చేయగానే మీ దగ్గరకే వస్తాం
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <a
              href="tel:8978973576"
              className="inline-flex items-center gap-2 bg-white text-red-700 font-black text-sm px-5 py-2.5 rounded-xl hover:bg-rose-50 shadow-lg transition-transform hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              8978973576
            </a>
            <a
              href="tel:8978977465"
              className="inline-flex items-center gap-2 bg-rose-900/60 border border-rose-500/50 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-rose-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              8978977465
            </a>
          </div>
        </div>
      </div>

      {/* ─── Multi-City Live Rates Board ──────────────────────────────────────────── */}
      <div className="bg-navy-900 border-b border-navy-800 py-5 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <TrendingUp className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-black uppercase tracking-widest text-gold-300">
              Live Gold Rates — Today
            </span>
            {rates?.liveApiSource === "live" && (
              <span className="text-[10px] text-emerald-400 font-semibold border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                Live API
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {cityRates.map((c) => (
              <div
                key={c.city}
                className={`rounded-xl p-3 border transition-all ${
                  c.highlight
                    ? "bg-gold-500/15 border-gold-400/50 ring-1 ring-gold-400/30"
                    : "bg-navy-950/60 border-navy-800"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm">{c.flag}</span>
                  <span
                    className={`text-xs font-black uppercase tracking-wide ${
                      c.highlight ? "text-gold-300" : "text-gray-400"
                    }`}
                  >
                    {c.city}
                    {c.highlight && (
                      <span className="ml-1 text-[9px] bg-gold-500/20 text-gold-300 px-1 py-0.5 rounded-full">
                        Our Branch
                      </span>
                    )}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-medium">24K</span>
                    <span className={`text-xs font-black ${c.highlight ? "text-gold-300" : "text-white"}`}>
                      ₹{c.r24.toLocaleString("en-IN")}/g
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-medium">22K</span>
                    <span className={`text-xs font-bold ${c.highlight ? "text-gold-400" : "text-gray-300"}`}>
                      ₹{c.r22.toLocaleString("en-IN")}/g
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-right">
            Rates are indicative. Contact branch for final settlement rate.
          </p>
        </div>
      </div>

      {/* ─── Main Footer 4-Column Grid ─────────────────────────────────────────────── */}
      <div className="pt-12 pb-8 px-4 border-b border-navy-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-white p-0.5 border border-gold-400 shadow-md shrink-0">
                <Image
                  src="/logo.png"
                  alt="VR GOLD BUYER'S"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                VR <span className="text-gold-400">GOLD BUYER&apos;S</span>
              </span>
            </div>
            <p
              className="text-xs text-gray-400 leading-relaxed"
              style={{ fontFamily: "var(--font-telugu), sans-serif" }}
            >
              కడపలో విశ్వసనీయమైన బంగారు కొనుగోలుదారులు. తాకట్టు బంగారాన్ని బ్యాంకు నుండి విడిపించి అధిక మార్కెట్ రేటుకు కొనుగోలు చేస్తాం.
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Kadapa&apos;s trusted gold buyers and pledged gold loan clearance specialists. Doorstep bank settlement with maximum daily market rates.
            </p>
            <div className="text-xs text-gold-400 font-semibold">
              &ldquo;WE ARE FOR YOU&rdquo; — Kadapa · Rayalaseema
            </div>
            {/* Star rating */}
            <div className="flex items-center gap-1 pt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              ))}
              <span className="text-[10px] text-gray-500 ml-1">5.0 · Trusted by 1000+ customers</span>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Bank Gold Loan Release", sub: "తాకట్టు విడుదల", href: "#doorstep" },
                { label: "Doorstep Bank Settlement", sub: "ఇంటికే సేవ", href: "#doorstep" },
                { label: "Spot Cash for Gold Jewellery", sub: "స్పాట్ క్యాష్", href: "#calculator" },
                { label: "22K / 24K Live Calculator", sub: "రేటు కాలిక్యులేటర్", href: "#calculator" },
                { label: "Karatmeter Purity Testing", sub: "స్వచ్ఛత పరీక్ష", href: "#why-us" },
                { label: "Track My Pledge", sub: "ట్రాక్ చేయండి", href: "/track" },
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
                        className="block text-[10px] text-gray-600 group-hover:text-gold-600"
                        style={{ fontFamily: "var(--font-telugu), sans-serif" }}
                      >
                        {sub}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Banks Covered */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-gold-400" />
              Banks &amp; Finance We Cover
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {BANKS.map((bank) => (
                <span
                  key={bank}
                  className="text-[10px] font-semibold text-gray-400 bg-navy-900 border border-navy-800 px-2 py-0.5 rounded-md hover:border-gold-600/40 hover:text-gold-300 transition-colors cursor-default"
                >
                  {bank}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-600 mt-1">
              + All nationalized, cooperative &amp; private gold financiers
            </p>
          </div>

          {/* Col 4 — Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Kadapa Branch
            </h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-400 leading-relaxed">
                D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction,{" "}
                <span className="text-gray-300 font-semibold">NGO Colony, KADAPA — 516002</span>
              </span>
            </div>

            <div className="space-y-2">
              <a
                href="tel:8978973576"
                className="flex items-center gap-2.5 group hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-white font-bold text-sm group-hover:text-gold-300">
                  +91 89789 73576
                </span>
              </a>
              <a
                href="tel:8978977465"
                className="flex items-center gap-2.5 group hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-white font-bold text-sm group-hover:text-gold-300">
                  +91 89789 77465
                </span>
              </a>
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-emerald-900/20 border border-emerald-700/30 rounded-xl">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block">
                  Working Hours
                </span>
                <span className="text-xs text-white font-bold">Mon – Sun: 9:00 AM – 8:30 PM</span>
                <span
                  className="text-[11px] text-emerald-300 block mt-0.5"
                  style={{ fontFamily: "var(--font-telugu), sans-serif" }}
                >
                  సోమవారం – ఆదివారం: ఉదయం 9 – రాత్రి 8:30
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span className="text-[11px] text-gray-400">
                Licensed &amp; registered gold buyer, Andhra Pradesh
              </span>
            </div>

            <a
              href="https://maps.google.com/?q=VR+Gold+Buyers+Kadapa+NGO+Colony"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-gold-400 hover:text-gold-300 font-semibold transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              View on Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── Bottom Strip ──────────────────────────────────────────────────────────── */}
      <div className="py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} VR GOLD BUYER&apos;S. All rights reserved.</p>
            <span className="hidden sm:inline text-gray-700">·</span>
            <div className="flex items-center gap-3">
              <Link href="/track" className="hover:text-gold-400 transition-colors">
                Track Pledge
              </Link>
              <span className="text-gray-700">·</span>
              <Link href="/admin/login" className="hover:text-gold-400 transition-colors">
                Staff Login
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Built by</span>
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
      </div>
    </footer>
  );
}
