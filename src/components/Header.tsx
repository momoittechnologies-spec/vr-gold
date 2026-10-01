'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, Scale, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isTelugu } = useLanguage();

  const whatsappUrl = `https://wa.me/918978973576?text=${encodeURIComponent(
    "Hi VR GOLD Kadapa! I want to check today's gold valuation / release pledged gold."
  )}`;

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Top Institutional Micro-Strip */}
      <div className="bg-[#060D1A] text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span
              className="text-slate-300 font-medium truncate"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu
                ? 'కడప NGO కాలనీ బ్రాంచ్ · తక్షణ గోల్డ్ వ్యాల్యుయేషన్ & తాకట్టు విడుదల డెస్క్'
                : 'Kadapa NGO Colony Branch · Live Bullion Valuation & Pledged Gold Release Desk'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>Mon–Sun: 9:00 AM – 8:30 PM</span>
            <a href="tel:8978973576" className="text-gold-400 font-bold hover:underline">
              Helpline: 8978973576
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-400 bg-white p-0.5 shadow-xs shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="VR GOLD BUYER'S Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
              VR <span className="text-gold-600">GOLD</span> BUYER&apos;S
            </span>
            <span className="text-[10px] tracking-wider text-slate-500 font-bold uppercase mt-0.5">
              Kadapa Bullion Desk
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
          <Link href="/#services" className="hover:text-gold-600 transition-colors">
            {isTelugu ? 'బంగారు అమ్మకం' : 'Sell Gold'}
          </Link>
          <Link href="/#pledged-gold" className="hover:text-gold-600 transition-colors">
            {isTelugu ? 'తాకట్టు విడుదల' : 'Release Pledged Gold'}
          </Link>
          <Link href="/#rates" className="hover:text-gold-600 transition-colors">
            {isTelugu ? 'లైవ్ రేట్లు' : 'Gold Rates'}
          </Link>
          <Link href="/#calculator" className="hover:text-gold-600 transition-colors">
            {isTelugu ? 'కాలిక్యులేటర్' : 'Calculator'}
          </Link>
          <Link href="/#process" className="hover:text-gold-600 transition-colors">
            {isTelugu ? 'ప్రాసెస్' : 'How It Works'}
          </Link>
          <Link href="/#location" className="hover:text-gold-600 transition-colors">
            {isTelugu ? 'సంప్రదించండి' : 'Contact'}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher */}
          <LanguageToggle variant="header" />

          {/* Primary CTA: Get Gold Valuation */}
          <Link
            href="/#calculator"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 text-xs font-black shadow-xs transition-transform hover:scale-[1.02]"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'బంగారం విలువ లెక్కించండి' : 'Get Gold Valuation'}</span>
          </Link>

          {/* Direct Helpline Call */}
          <a
            href="tel:8978973576"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            title="Call Helpline"
          >
            <Phone className="w-3.5 h-3.5 text-gold-600" />
            <span className="hidden xl:inline">8978973576</span>
          </a>

          {/* Subtle WhatsApp Icon */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex items-center p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            title="WhatsApp Desk"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg text-sm">
          
          {/* Language Switcher */}
          <LanguageToggle variant="mobile" />

          {/* Primary CTA */}
          <Link
            href="/#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 font-black text-xs shadow-xs flex items-center justify-center gap-2"
          >
            <Scale className="w-4 h-4" />
            <span>{isTelugu ? 'బంగారం విలువ లెక్కించండి' : 'Get Gold Valuation'}</span>
          </Link>

          <div className="space-y-1 pt-1 font-semibold text-slate-800 text-xs">
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isTelugu ? 'బంగారు ఆభరణాల అమ్మకం' : 'Sell Gold Jewellery'}
            </Link>
            <Link
              href="/#pledged-gold"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isTelugu ? 'బ్యాంకు తాకట్టు విడుదల' : 'Release Pledged Gold'}
            </Link>
            <Link
              href="/#rates"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isTelugu ? 'నేటి లైవ్ బులియన్ రేట్లు' : 'Live Gold Rates'}
            </Link>
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isTelugu ? 'గోల్డ్ వ్యాల్యుయేషన్ కాలిక్యులేటర్' : 'Valuation Calculator'}
            </Link>
            <Link
              href="/#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isTelugu ? 'VR GOLD విధానం (5 దశలు)' : 'How It Works'}
            </Link>
            <Link
              href="/#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              {isTelugu ? 'కడప బ్రాంచ్ & కాంటాక్ట్' : 'Kadapa Branch & Contact'}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
            <a
              href="tel:8978973576"
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-100 font-bold text-xs text-slate-800"
            >
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              <span>Call Helpline</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-50 font-bold text-xs text-emerald-700"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
}
