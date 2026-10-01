'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play, Sparkles, CheckCircle2, Heart, Share2, ShieldCheck, Film } from 'lucide-react';

// Custom SVG icon for Instagram
export function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

interface ReelItem {
  id: string;
  title: string;
  titleTelugu: string;
  creator: string;
  creatorHandle: string;
  isOfficial: boolean;
  reelUrl: string;
  embedUrl: string;
  tag: string;
  duration?: string;
  description: string;
}

const REELS: ReelItem[] = [
  {
    id: 'DdIp7OTN4VJ',
    title: 'VR Gold Doorstep Service & Review',
    titleTelugu: 'కడపలో తాకట్టు బంగారం విడుదల లైవ్ డెమో & రివ్యూ',
    creator: 'Navarathnalu Batch',
    creatorHandle: '@navarathnalu_batch_official',
    isOfficial: false,
    reelUrl: 'https://www.instagram.com/navarathnalu_batch_official/reel/DdIp7OTN4VJ/',
    embedUrl: 'https://www.instagram.com/reel/DdIp7OTN4VJ/embed/',
    tag: 'Creator Feature · వైరల్ వీడియో',
    description: 'Popular Rayalaseema creator reviews VR Gold doorstep gold release service in Kadapa.',
  },
  {
    id: 'DbkmQcPJmdQ',
    title: 'Bank Gold Loan Clearance Live Process',
    titleTelugu: 'బ్యాంకు అప్పు తీర్చి బంగారం విడిపించే లైవ్ విధానం',
    creator: 'VR Gold Buyers',
    creatorHandle: '@vrgoldbuyers2026',
    isOfficial: true,
    reelUrl: 'https://www.instagram.com/vrgoldbuyers2026/reel/DbkmQcPJmdQ/',
    embedUrl: 'https://www.instagram.com/reel/DbkmQcPJmdQ/embed/',
    tag: 'Official Video · లైవ్ ప్రాసెస్',
    description: 'Step-by-step walkthrough of closing bank pledge and immediate spot cash settlement.',
  },
  {
    id: 'Dd8cpcdnVxT',
    title: 'Spot Cash Payout & Karatmeter Testing',
    titleTelugu: 'కంప్యూటరైజ్డ్ క్యారెట్‌మీటర్ టెస్టింగ్ & స్పాట్ క్యాష్',
    creator: 'VR Gold Buyers',
    creatorHandle: '@vrgoldbuyers2026',
    isOfficial: true,
    reelUrl: 'https://www.instagram.com/vrgoldbuyers2026/reel/Dd8cpcdnVxT/',
    embedUrl: 'https://www.instagram.com/reel/Dd8cpcdnVxT/embed/',
    tag: 'Customer Story · నిజమైన కస్టమర్',
    description: '100% transparent German Karatmeter purity test and instant UPI / cash payout.',
  },
];

export default function InstagramShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | string>('all');

  // Single-tap follow handler: tries deep link to Instagram native app on mobile, falls back to web
  const handleSingleTapFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    const instagramAppUrl = 'instagram://user?username=vrgoldbuyers2026';
    const instagramWebUrl = 'https://www.instagram.com/vrgoldbuyers2026/';

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Attempt to open native Instagram app
      window.location.href = instagramAppUrl;
      // Fallback to web profile after short delay if app not installed
      setTimeout(() => {
        window.open(instagramWebUrl, '_blank', 'noopener,noreferrer');
      }, 750);
    } else {
      window.open(instagramWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const displayedReels = activeTab === 'all' ? REELS : REELS.filter((r) => r.id === activeTab);

  return (
    <section id="instagram" className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-50 via-rose-50 to-amber-50 border border-rose-200/70 shadow-xs mb-4">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <InstagramIcon className="w-3.5 h-3.5 text-rose-600" />
            <span className="text-xs font-black uppercase tracking-wider text-rose-950">
              Live On Instagram · @vrgoldbuyers2026
            </span>
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight leading-tight mb-4"
            style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
          >
            ఇన్‌స్టాగ్రామ్‌లో{' '}
            <span className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent">
              VR GOLD
            </span>{' '}
            లైవ్ వీడియోలు &amp; రీల్స్
          </h2>

          <p
            className="text-sm sm:text-base text-gray-700 font-semibold max-w-2xl mx-auto mb-2"
            style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
          >
            తాకట్టు బంగారం విడిపించే విధానం, స్పాట్ క్యాష్ చెల్లింపులు మరియు లైవ్ కస్టమర్ అనుభవాలను వీడియోలలో చూడండి!
          </p>

          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            Watch real cases of pledged gold release from banks, computerized purity testing, and follow our daily gold rate updates on Instagram.
          </p>
        </div>

        {/* ─── Profile Highlight Card with Single-Tap Follow ─────────────────────── */}
        <div className="relative mb-12 max-w-4xl mx-auto rounded-3xl p-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] shadow-xl shadow-rose-500/15">
          <div className="bg-white rounded-[22px] p-5 sm:p-7 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Avatar + Profile Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-5">
              {/* Instagram Story Gradient Ring Avatar */}
              <a
                href="https://www.instagram.com/vrgoldbuyers2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group shrink-0"
                title="View @vrgoldbuyers2026 on Instagram"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="VR GOLD Official Instagram Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Local Business">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* Bio & Information */}
              <div className="space-y-1.5 max-w-md">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <a
                    href="https://www.instagram.com/vrgoldbuyers2026/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg sm:text-xl font-black text-navy-950 hover:text-rose-600 transition-colors"
                  >
                    @vrgoldbuyers2026
                  </a>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    <ShieldCheck className="w-3 h-3" /> Official Page
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  VR GOLD BUYER&apos;S · Kadapa Gold Release &amp; Renewal
                </p>

                <p
                  className="text-xs text-gray-600 leading-relaxed"
                  style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
                >
                  ⚡ తాకట్టు పెట్టిన బంగారాన్ని విడిపించి ఈ రోజు మార్కెట్ రేటుకు కొనబడును · డోర్‌స్టెప్ సేవ అందుబాటులో ఉంది.
                </p>

                {/* Features Pills */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1 text-[10px] text-gray-500 font-semibold">
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md">📈 Daily Rates</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md">🎥 Live Release Reels</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-md">📍 Kadapa NGO Colony</span>
                </div>
              </div>
            </div>

            {/* Right: Single-Tap Follow Action */}
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                onClick={handleSingleTapFollow}
                className="w-full sm:w-auto md:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-black text-sm shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              >
                <InstagramIcon className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                <span>సింగిల్ ట్యాప్‌తో ఫాలో అవ్వండి</span>
              </button>

              <a
                href="https://www.instagram.com/vrgoldbuyers2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto md:w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold transition-colors"
              >
                <span>Open in Instagram App</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>

              <span className="text-[11px] text-gray-400 font-medium text-center">
                1-Tap opens directly in your Instagram app
              </span>
            </div>

          </div>
        </div>

        {/* ─── Mobile Tab Switcher (All / Specific Reel) ────────────────────────── */}
        <div className="flex lg:hidden items-center justify-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeTab === 'all'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All 3 Reels
          </button>
          {REELS.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => setActiveTab(r.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeTab === r.id
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Reel #{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* ─── The 3 Reels Display Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {displayedReels.map((reel, index) => (
            <div
              key={reel.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-lg shadow-gray-200/50 overflow-hidden flex flex-col hover:border-gold-300 transition-all hover:shadow-xl"
            >
              {/* Card Top Creator Bar */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5">
                      <Image
                        src="/logo.png"
                        alt={reel.creator}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-xs font-black text-navy-950 truncate">
                        {reel.creator}
                      </span>
                      {reel.isOfficial && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500 font-semibold block truncate">
                      {reel.creatorHandle}
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                  {reel.tag}
                </span>
              </div>

              {/* Title & Telugu Label */}
              <div className="px-4 py-3 bg-amber-50/40 border-b border-gray-100">
                <h3
                  className="text-xs sm:text-sm font-black text-navy-950 leading-snug line-clamp-1"
                  style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
                >
                  {reel.titleTelugu}
                </h3>
                <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                  {reel.title}
                </p>
              </div>

              {/* Embedded Instagram Reel Frame */}
              <div className="relative w-full bg-black min-h-[480px] sm:min-h-[520px] flex items-center justify-center overflow-hidden">
                <iframe
                  src={reel.embedUrl}
                  className="w-full h-[500px] sm:h-[540px] border-0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={reel.title}
                  loading="lazy"
                />
              </div>

              {/* Card Footer / Direct Action */}
              <div className="p-4 bg-white border-t border-gray-100 space-y-2.5">
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                  {reel.description}
                </p>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <a
                    href={reel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-bold shadow-xs transition-transform hover:scale-[1.02]"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-white" />
                    <span>Watch on Instagram</span>
                  </a>

                  <a
                    href={reel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    title="Open external link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ─── Bottom Channel Follow Callout ────────────────────────────────────────── */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-gold-200/80 max-w-2xl mx-auto shadow-xs">
          <div className="flex items-center justify-center gap-2 mb-2 text-gold-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider">
              Stay Connected · తాజా అప్‌డేట్స్ కోసం
            </span>
          </div>
          <p
            className="text-sm font-bold text-gray-800 mb-3"
            style={{ fontFamily: 'var(--font-telugu), sans-serif' }}
          >
            రోజువారీ మార్కెట్ బంగారం రేట్లు మరియు తాకట్టు విడిపించే లైవ్ అప్‌డేట్స్ కోసం మా ఇన్‌స్టాగ్రామ్ పేజీని అనుసరించండి.
          </p>
          <button
            onClick={handleSingleTapFollow}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            <InstagramIcon className="w-4 h-4 text-gold-400" />
            <span>Follow @vrgoldbuyers2026</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold-400 ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
