'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Menu, X, ShieldCheck, Search, Lock, Calendar } from 'lucide-react';

interface Props {
  onOpenBooking?: () => void;
}

export default function Header({ onOpenBooking }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gold-200/80 shadow-xs">
      {/* Top micro strip */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <span className="text-gold-200 font-semibold truncate">
              ⚡ కాల్ చేసిన వెంటనే మీ దగ్గరకే వచ్చి డబ్బులు కట్టి విడిపించబడును (Doorstep Gold Loan Release)
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-400" />
              NGO Colony, Kadapa
            </span>
            <span className="text-gold-300 font-bold">Today: Best Spot Cash Rate in Kadapa</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-gold-400/80 shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform shrink-0 bg-white p-0.5 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="VR GOLD BUYER'S Official Logo"
              width={44}
              height={44}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-navy-950 leading-none">
              VR <span className="text-gold-600">GOLD</span> BUYER&apos;S
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">
              Gold Release &amp; Renewal · Kadapa
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-gray-700">
          <Link href="/#calculator" className="hover:text-gold-600 transition-colors">
            Gold Calculator
          </Link>
          <Link href="/#doorstep" className="hover:text-gold-600 transition-colors">
            Doorstep Service
          </Link>
          <Link href="/#process" className="hover:text-gold-600 transition-colors">
            How It Works
          </Link>
          <Link href="/#location" className="hover:text-gold-600 transition-colors">
            Kadapa Branch
          </Link>
          <Link
            href="/track"
            className="inline-flex items-center gap-1 text-gold-700 hover:text-gold-800 font-bold bg-gold-50 px-2.5 py-1 rounded-lg border border-gold-200 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Pledge</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-950 border border-gold-300 text-xs font-black transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-gold-700" />
              <span>Book Visit</span>
            </button>
          )}

          <a
            href="tel:8978973576"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy-950 text-xs font-bold transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-gold-600" />
            <span>8978973576</span>
          </a>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 text-xs font-bold shadow-xs transition-colors"
            title="VR Gold Staff & Management Portal"
          >
            <Lock className="w-3 h-3 text-gold-400" />
            <span>Staff CRM</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-navy-950 rounded-lg hover:bg-gray-100"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-2 shadow-lg text-sm">
          {onOpenBooking && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-gold-500 text-navy-950 font-black flex items-center justify-between"
            >
              <span>🚗 Book Doorstep Bank Release</span>
              <span>→</span>
            </button>
          )}
          <Link
            href="/#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-bold text-gray-900 hover:bg-gold-50"
          >
            💰 Live Gold Rate Calculator
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-bold text-gold-700 hover:bg-gold-50"
          >
            🔍 Track Your Pledge Status
          </Link>
          <Link
            href="/#doorstep"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-bold text-gray-900 hover:bg-gold-50"
          >
            🚗 Doorstep Bank Clearance
          </Link>
          <Link
            href="/#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-bold text-gray-900 hover:bg-gold-50"
          >
            📍 NGO Colony Branch Location
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100"
          >
            🔒 VR Gold Staff &amp; CRM Login
          </Link>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
            <a
              href="tel:8978973576"
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-gray-100 font-bold text-xs text-navy-950"
            >
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              8978973576
            </a>
            <a
              href="tel:8978977465"
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-gold-600 font-bold text-xs text-white"
            >
              <Phone className="w-3.5 h-3.5" />
              8978977465
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
