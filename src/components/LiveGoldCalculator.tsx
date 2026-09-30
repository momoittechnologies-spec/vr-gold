"use client";

import React, { useState, useMemo } from "react";
import { Calculator, ArrowRight, MessageSquare, Phone, Sparkles, ShieldCheck } from "lucide-react";

export default function LiveGoldCalculator() {
  const [purity, setPurity] = useState<"22K" | "24K">("22K");
  const [weight, setWeight] = useState<number>(20);

  // Benchmarked daily rates for Kadapa market (configurable)
  const rate22K = 6880;
  const rate24K = 7500;

  const currentRate = purity === "22K" ? rate22K : rate24K;

  const estimatedValue = useMemo(() => {
    return Math.round((Number(weight) || 0) * currentRate);
  }, [weight, currentRate]);

  const whatsappMessage = encodeURIComponent(
    `Hi VR GOLD Kadapa! I want to check spot cash payout / release pledged gold:\n• Purity: ${purity} Gold\n• Weight: ${weight} Grams\n• Estimated Value: ₹${estimatedValue.toLocaleString("en-IN")}\n\nPlease confirm today's live rate and doorstep visit details.`
  );

  return (
    <section id="calculator" className="py-16 md:py-24 bg-surface-light border-y border-gold-200/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5 text-gold-700" />
            <span>Kadapa Live Valuation Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Calculate Your Instant Gold Value Today
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Get an instant, transparent estimate of your gold jewellery value before visiting or booking our doorstep bank release team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gold-200">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Purity Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                1. Select Gold Purity
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPurity("22K")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    purity === "22K"
                      ? "border-gold-500 bg-gold-50/70 shadow-sm"
                      : "border-gray-200 hover:border-gold-300"
                  }`}
                >
                  <span className="block text-lg font-black text-navy-950">22 Karat (916)</span>
                  <span className="text-xs text-gray-500 mt-1 block">Hallmark Jewellery Standard</span>
                  <span className="text-xs font-bold text-gold-700 mt-2 block">
                    Today: ₹{rate22K.toLocaleString("en-IN")}/g
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPurity("24K")}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    purity === "24K"
                      ? "border-gold-500 bg-gold-50/70 shadow-sm"
                      : "border-gray-200 hover:border-gold-300"
                  }`}
                >
                  <span className="block text-lg font-black text-navy-950">24 Karat (999)</span>
                  <span className="text-xs text-gray-500 mt-1 block">Pure Gold Biscuits &amp; Coins</span>
                  <span className="text-xs font-bold text-gold-700 mt-2 block">
                    Today: ₹{rate24K.toLocaleString("en-IN")}/g
                  </span>
                </button>
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  2. Enter Gold Weight (Grams)
                </label>
                <span className="text-xs font-bold text-gold-700">{weight} Grams</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={weight || ""}
                  onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                  className="w-full text-2xl font-black text-navy-950 px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  placeholder="e.g. 25"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                  Grams (gm)
                </span>
              </div>

              {/* Quick weight chip selectors */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[8, 16, 24, 32, 50, 100].map((gm) => (
                  <button
                    key={gm}
                    type="button"
                    onClick={() => setWeight(gm)}
                    className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
                      weight === gm
                        ? "bg-gold-500 text-white border-gold-500"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {gm}g {gm === 8 && "(1 Tola/Pav)"}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-gray-500 italic">
              * Final valuation depends on exact purity verified via computerized German Karatmeter testing with zero damage to jewellery.
            </p>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between h-full border border-gold-500/30">
            <div>
              <div className="flex items-center justify-between text-xs text-gold-300 font-semibold mb-3">
                <span>ESTIMATED PAYOUT</span>
                <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30">
                  {purity} Gold
                </span>
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                ₹{estimatedValue.toLocaleString("en-IN")}
              </div>

              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Estimated instant cash or immediate RTGS/IMPS bank transfer for {weight} grams of {purity} gold at today&apos;s Kadapa rate.
              </p>

              <div className="space-y-2 py-4 border-t border-navy-800 text-xs text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Current Gold Rate:</span>
                  <span className="font-bold text-white">₹{currentRate.toLocaleString("en-IN")} / gram</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Gross Weight:</span>
                  <span className="font-bold text-white">{weight} Grams</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Evaluation Fee:</span>
                  <span className="font-bold text-emerald-400">FREE (₹0)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <a
                href={`https://wa.me/918978973576?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg transition-transform hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Instant Quote</span>
              </a>

              <a
                href="tel:8978973576"
                className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-md transition-transform hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                <span>Call VR Gold Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
