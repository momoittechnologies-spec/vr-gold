'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441 645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

interface ReelItem {
  id: string;
  title: string;
  titleTelugu: string;
  creator: string;
  creatorHandle: string;
  reelUrl: string;
  tag: string;
  desc: string;
}

const REELS: ReelItem[] = [
  {
    id: 'DdIp7OTN4VJ',
    title: 'VR Gold Doorstep Service & Review',
    titleTelugu: 'కడపలో తాకట్టు బంగారం విడుదల డెమో & రివ్యూ',
    creator: 'Navarathnalu Batch',
    creatorHandle: '@navarathnalu_batch_official',
    reelUrl: 'https://www.instagram.com/navarathnalu_batch_official/reel/DdIp7OTN4VJ/',
    tag: 'Creator Feature',
    desc: 'Local creator reviews VR Gold doorstep gold release service in Kadapa.',
  },
  {
    id: 'DbkmQcPJmdQ',
    title: 'Bank Gold Loan Clearance Live Process',
    titleTelugu: 'బ్యాంకు అప్పు తీర్చి బంగారం విడిపించే విధానం',
    creator: 'VR Gold Buyers',
    creatorHandle: '@vrgoldbuyers2026',
    reelUrl: 'https://www.instagram.com/vrgoldbuyers2026/reel/DbkmQcPJmdQ/',
    tag: 'Official Video',
    desc: 'Walkthrough of clearing bank loan dues and receiving instant surplus cash.',
  },
  {
    id: 'Dd8cpcdnVxT',
    title: 'Spot Cash Payout & Karatmeter Testing',
    titleTelugu: 'కంప్యూటరైజ్డ్ క్యారెట్‌మీటర్ టెస్టింగ్ & స్పాట్ క్యాష్',
    creator: 'VR Gold Buyers',
    creatorHandle: '@vrgoldbuyers2026',
    reelUrl: 'https://www.instagram.com/vrgoldbuyers2026/reel/Dd8cpcdnVxT/',
    tag: 'Official Video',
    desc: 'Transparent German Karatmeter purity test and instant payout in Kadapa.',
  },
];

export default function InstagramShowcase() {
  const { isTelugu } = useLanguage();
  const [activeIframeId, setActiveIframeId] = useState<string | null>(null);

  const handleSingleTapFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    const instagramAppUrl = 'instagram://user?username=vrgoldbuyers2026';
    const instagramWebUrl = 'https://www.instagram.com/vrgoldbuyers2026/';
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = instagramAppUrl;
      setTimeout(() => {
        window.open(instagramWebUrl, '_blank', 'noopener,noreferrer');
      }, 750);
    } else {
      window.open(instagramWebUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="instagram" className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-2 border border-rose-200">
              <InstagramIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>@vrgoldbuyers2026</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu ? 'సోషల్ మీడియా వీడియో సాక్ష్యాలు' : 'Verified Social Media Proof'}
            </h2>
          </div>

          {/* 1-Tap Follow CTA */}
          <button
            type="button"
            onClick={handleSingleTapFollow}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-xs shadow-xs transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4 fill-white" />
            <span>{isTelugu ? 'ఇన్‌స్టాగ్రామ్‌లో ఫాలో అవ్వండి' : 'Follow @vrgoldbuyers2026'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Curated Video Cards (On-demand iframe / Click to play for optimal performance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REELS.map((reel) => {
            const isPlaying = activeIframeId === reel.id;

            return (
              <div
                key={reel.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:border-gold-400 transition-all"
              >
                {/* Media Area */}
                <div className="relative aspect-[9/12] bg-[#060D1A] flex items-center justify-center overflow-hidden">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media"
                      title={reel.title}
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col justify-between items-center text-center text-white relative">
                      <div className="w-full flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-[10px] px-2 py-0.5 rounded bg-white/10 text-gold-300">
                          {reel.tag}
                        </span>
                        <span className="text-[11px] text-slate-400">{reel.creatorHandle}</span>
                      </div>

                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setActiveIframeId(reel.id)}
                          aria-label={`Play ${reel.title}`}
                          className="w-14 h-14 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 flex items-center justify-center mx-auto shadow-lg transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Play className="w-6 h-6 fill-navy-950 ml-0.5" />
                        </button>
                        <p className="text-xs font-bold text-white max-w-xs mx-auto">
                          {isTelugu ? reel.titleTelugu : reel.title}
                        </p>
                      </div>

                      <a
                        href={reel.reelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-slate-400 hover:text-white underline inline-flex items-center gap-1"
                      >
                        <span>Open on Instagram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {isTelugu ? reel.titleTelugu : reel.title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {reel.creator}
                    </span>
                  </div>
                  <a
                    href={reel.reelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-700 hover:text-gold-800 font-bold shrink-0 inline-flex items-center gap-1"
                  >
                    <span>Watch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
