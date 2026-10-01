'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Scale, Navigation, ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { InstagramIcon } from '@/components/InstagramShowcase';

export default function Footer() {
  const { isTelugu } = useLanguage();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "VR GOLD Beside Mruthunjayakunta Sivalayam NGO Colony Kadapa"
  )}`;

  const whatsappUrl = `https://wa.me/918978973576?text=${encodeURIComponent(
    "Hi VR GOLD Kadapa! I want to check today's gold rate / release pledged gold."
  )}`;

  return (
    <footer className="bg-[#040814] text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        
        {/* 4-Column Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* COLUMN 1 — VR GOLD */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-400 bg-white p-0.5 shadow-xs shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="VR GOLD Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">
                  VR <span className="text-gold-500">GOLD</span> BUYER&apos;S
                </span>
                <span className="text-[10px] tracking-wider text-slate-500 font-bold uppercase mt-0.5">
                  Kadapa Bullion Desk
                </span>
              </div>
            </Link>

            <p
              className="text-xs text-slate-400 leading-relaxed"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu
                ? 'వృత్తిపరమైన బంగారు వ్యాల్యుయేషన్, బంగారు విక్రయం మరియు బ్యాంక్ తాకట్టు విడుదల సేవలు.'
                : 'Professional gold valuation, gold selling and pledged-gold assistance services in Kadapa.'}
            </p>

            <div className="pt-1 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Kadapa, Andhra Pradesh</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <a href="tel:8978973576" className="hover:text-white transition-colors">
                  8978973576
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Advisory
                </a>
              </div>
            </div>

            {/* Official Social Link */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/vrgoldbuyers2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-pink-500" />
                <span>@vrgoldbuyers2026</span>
              </a>
            </div>
          </div>

          {/* COLUMN 2 — SERVICES */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isTelugu ? 'సేవలు' : 'Services'}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#services" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'బంగారం అమ్మకం' : 'Sell Gold'}
                </Link>
              </li>
              <li>
                <Link href="/#pledged-gold" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'తాకట్టు విడుదల' : 'Release Pledged Gold'}
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'గోల్డ్ వ్యాల్యుయేషన్' : 'Gold Valuation'}
                </Link>
              </li>
              <li>
                <Link href="/#doorstep" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'డోర్‌స్టెప్ సేవలు' : 'Doorstep Assistance'}
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'గోల్డ్ కాలిక్యులేటర్' : 'Gold Calculator'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — QUICK LINKS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isTelugu ? 'త్వరిత లింకులు' : 'Quick Links'}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'హోమ్' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/#rates" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'నేటి బంగారం రేట్లు' : 'Gold Rates'}
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'విధానం (How It Works)' : 'How It Works'}
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'బ్రాంచ్ లొకేషన్' : 'Branch Location'}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'తరచుగా అడిగే ప్రశ్నలు' : 'FAQs'}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-gold-400 transition-colors">
                  {isTelugu ? 'తాకట్టు ట్రాకింగ్' : 'Pledge Status Tracker'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 — CONTACT & ACTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
              {isTelugu ? 'సంప్రదించండి' : 'Contact'}
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              D.No. 42/1201, Beside Sivalayam, Near Y-Junction, NGO Colony, Kadapa.
            </p>

            <div className="space-y-1 text-xs">
              <p className="text-slate-300">
                <span className="text-slate-500">{isTelugu ? 'ఫోన్:' : 'Phone:'}</span>{' '}
                <a href="tel:8978973576" className="font-bold text-white hover:text-gold-400">
                  8978973576
                </a>
              </p>
              <p className="text-slate-400 text-[11px]">
                Mon–Sun: 9:00 AM – 8:30 PM
              </p>
            </div>

            <div className="pt-1">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps / Directions</span>
              </a>
            </div>

            {/* Simple CTA */}
            <div className="pt-2">
              <Link
                href="/#calculator"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-xs shadow-xs transition-transform hover:scale-[1.02]"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isTelugu ? 'బంగారం విలువ లెక్కించండి' : 'Get Gold Valuation'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* ─── Footer Bottom Bar ────────────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 VR GOLD BUYER&apos;S. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms &amp; Conditions</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Disclaimer</span>
            <span>·</span>
            <Link href="/admin/login" className="hover:text-gold-400 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-600 leading-relaxed text-center sm:text-left">
          <p>
            DISCLAIMER: VR Gold Buyer&apos;s is an independent gold asset clearance facilitator in Kadapa, Andhra Pradesh. We facilitate the lawful redemption of pledged gold ornaments from nationalized banks, cooperative societies, and licensed NBFCs upon customer mandate. All valuations strictly adhere to daily spot bullion rates benchmarked to MCX/Bullion markets. Physical gold testing is conducted through non-destructive computerized Karatmeter spectrometry.
          </p>
        </div>

      </div>
    </footer>
  );
}
