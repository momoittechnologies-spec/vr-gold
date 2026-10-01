'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, ArrowRight, ShieldCheck, Calendar, Award, Building, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
  onOpenBooking?: () => void;
}

interface RatesData {
  gold24k: number;
  gold22k: number;
  updatedAt: string;
}

export default function Hero({ onOpenBooking }: Props) {
  const { isTelugu } = useLanguage();
  const [rates, setRates] = useState<RatesData>({
    gold24k: 7520,
    gold22k: 6890,
    updatedAt: new Date().toISOString(),
  });
  const [sampleGrams, setSampleGrams] = useState<number>(20);

  useEffect(() => {
    fetch('/api/rates')
      .then((r) => r.json())
      .then((d) => {
        if (d.rates) setRates(d.rates);
      })
      .catch(() => {});
  }, []);

  const sampleEstValue = sampleGrams * rates.gold22k;

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-white overflow-hidden border-b border-slate-200/80">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ─── Left Column: Message & CTA Hierarchy ───────────────────────── */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Brand Location Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span>VR GOLD BUYER&apos;S · KADAPA</span>
              <span className="text-slate-400">|</span>
              <span className="text-gold-700 font-semibold">NGO Colony Branch</span>
            </div>

            {/* Short, Confident Headline */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-slate-900 tracking-tight leading-[1.18]"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu ? (
                <>
                  విశ్వసనీయమైన బంగారు విక్రయం &amp;{' '}
                  <span className="text-gold-600 underline decoration-gold-300 underline-offset-4">
                    తాకట్టు విడుదల
                  </span>{' '}
                  సేవలు
                </>
              ) : (
                <>
                  Professional Gold Valuation &amp;{' '}
                  <span className="text-gold-600 underline decoration-gold-300 underline-offset-4">
                    Pledged Gold Release
                  </span>{' '}
                  Services
                </>
              )}
            </h1>

            {/* Concise, Grounded Subheading */}
            <p
              className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl"
              style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
            >
              {isTelugu
                ? 'నేటి ప్రత్యక్ష బులియన్ మార్కెట్ రేటుతో పాత బంగారాన్ని విక్రయించండి, లేదా బ్యాంకుల్లో ఉన్న తాకట్టు రుణాన్ని పారదర్శకంగా క్లియర్ చేసుకోండి. కడపలోని మా బ్రాంచ్‌లో కంప్యూటరైజ్డ్ క్యారెట్‌మీటర్ పరీక్ష మరియు డోర్‌స్టెప్ సదుపాయం కలదు.'
                : 'Sell your physical gold jewellery at transparent daily bullion rates, or let our experienced team assist with complete bank pledge clearances across Kadapa with zero hidden deductions.'}
            </p>

            {/* Clear CTA Hierarchy: Primary & Secondary */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* PRIMARY CTA: Get Gold Valuation */}
              <Link
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-sm shadow-md shadow-gold-500/20 transition-all hover:scale-[1.02] text-center"
              >
                <Scale className="w-4 h-4 text-navy-950" />
                <span>{isTelugu ? 'బంగారం విలువ లెక్కించండి' : 'Get Gold Valuation'}</span>
                <ArrowRight className="w-4 h-4 text-navy-950" />
              </Link>

              {/* SECONDARY CTA: Book a Visit */}
              {onOpenBooking ? (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{isTelugu ? 'విజిట్ బుక్ చేయండి' : 'Book a Visit'}</span>
                </button>
              ) : (
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{isTelugu ? 'విజిట్ బుక్ చేయండి' : 'Book a Visit'}</span>
                </Link>
              )}
            </div>

            {/* 3 Core Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-600" />
                <span>German XRF Karatmeter</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Same-Day IMPS / Cash</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-slate-600" />
                <span>Kadapa NGO Colony</span>
              </span>
            </div>

          </div>

          {/* ─── Right Column: Professional Financial Visual Area ────────────── */}
          <div className="lg:col-span-5">
            <div className="bg-[#060D1A] rounded-3xl p-6 sm:p-7 text-white border border-gold-500/30 shadow-xl shadow-slate-900/10 relative">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-gold-400 shrink-0">
                    <Image
                      src="/logo.png"
                      alt="VR GOLD Crest"
                      width={36}
                      height={36}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-wide text-white block">
                      VR GOLD APPRAISAL DESK
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold block">
                      Live Kadapa Benchmark
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Market Active</span>
                </div>
              </div>

              {/* Live Rate Snapshot Inside Visual Area */}
              <div className="grid grid-cols-2 gap-3 py-4 border-b border-slate-800">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    22K Standard (916)
                  </span>
                  <div className="text-lg font-black text-gold-400">
                    ₹{rates.gold22k.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-medium">/g</span>
                  </div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    24K Fine Gold (999)
                  </span>
                  <div className="text-lg font-black text-white">
                    ₹{rates.gold24k.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-medium">/g</span>
                  </div>
                </div>
              </div>

              {/* Mini Interactive Value Preview */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">
                    {isTelugu ? 'శాంపిల్ బరువు అంచనా:' : 'Sample Weight Valuation:'}
                  </span>
                  <span className="text-gold-400 font-black text-sm">{sampleGrams} Grams (22K)</span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={sampleGrams}
                  onChange={(e) => setSampleGrams(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  aria-label="Gold weight in grams"
                />

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-gold-500/20">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {isTelugu ? 'అంచనా స్థూల విలువ' : 'Est. Benchmark Value'}
                    </span>
                    <span className="text-xs text-slate-300">
                      {sampleGrams}g × ₹{rates.gold22k.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-xl font-black text-white">
                    ₹{sampleEstValue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-2">
                <Link
                  href="#calculator"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-300 text-xs font-bold border border-slate-700 transition-colors"
                >
                  <span>{isTelugu ? 'పూర్తి కాలిక్యులేటర్ తెరవండి' : 'Open Full Valuation Calculator'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <p className="text-[10px] text-slate-500 text-center mt-2">
                  100% transparent testing · Cash or IMPS bank transfer on the spot
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
