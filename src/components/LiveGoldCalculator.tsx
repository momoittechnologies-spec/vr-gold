'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  ArrowRight,
  MessageSquare,
  Phone,
  ShieldCheck,
  Building2,
  Coins,
  CheckCircle2,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

interface Props {
  onOpenBooking?: (grams?: number, bank?: string) => void;
}

export default function LiveGoldCalculator({ onOpenBooking }: Props) {
  const [activeTab, setActiveTab] = useState<'SPOT_SALE' | 'PLEDGE_RELEASE'>('PLEDGE_RELEASE');

  // Rates fetched from live API
  const [rates, setRates] = useState({
    gold24k: 7520,
    gold22k: 6890,
    gold18k: 5640,
  });

  useEffect(() => {
    fetch('/api/rates')
      .then((res) => res.json())
      .then((data) => {
        if (data.rates) {
          setRates({
            gold24k: data.rates.gold24k,
            gold22k: data.rates.gold22k,
            gold18k: data.rates.gold18k,
          });
        }
      })
      .catch((err) => console.error('Error loading rates into calculator:', err));
  }, []);

  // Spot Cash state
  const [spotPurity, setSpotPurity] = useState<'22K' | '24K' | '18K'>('22K');
  const [spotWeight, setSpotWeight] = useState<number>(24);
  const [stoneDeductionGrams, setStoneDeductionGrams] = useState<number>(0);

  // Pledge Release state
  const [pledgeBank, setPledgeBank] = useState<string>('SBI Kadapa Main Branch');
  const [pledgePurity, setPledgePurity] = useState<'22K' | '24K'>('22K');
  const [pledgeWeight, setPledgeWeight] = useState<number>(35);
  const [loanPrincipal, setLoanPrincipal] = useState<number>(180000);
  const [monthlyInterestRate, setMonthlyInterestRate] = useState<number>(2.0); // 2% per month
  const [monthsPledged, setMonthsPledged] = useState<number>(6);

  // Spot Cash Calculation
  const spotRate =
    spotPurity === '24K' ? rates.gold24k : spotPurity === '22K' ? rates.gold22k : rates.gold18k;
  const netSpotWeight = Math.max(0, spotWeight - stoneDeductionGrams);
  const spotEstimatedValue = Math.round(netSpotWeight * spotRate);

  // Pledge Release Calculation
  const pledgeRate = pledgePurity === '24K' ? rates.gold24k : rates.gold22k;
  const totalGoldMarketValue = Math.round(pledgeWeight * pledgeRate);
  const accruedInterest = Math.round((loanPrincipal * (monthlyInterestRate / 100)) * monthsPledged);
  const totalBankSettlement = loanPrincipal + accruedInterest;
  const netCashSurplus = Math.max(0, totalGoldMarketValue - totalBankSettlement);
  const annualInterestBleeding = Math.round(loanPrincipal * (monthlyInterestRate / 100) * 12);

  // WhatsApp Strings
  const spotWaMsg = encodeURIComponent(
    `Hi VR GOLD Kadapa! I checked the Spot Cash Calculator:\n• Purity: ${spotPurity} Gold\n• Weight: ${spotWeight}g (Net: ${netSpotWeight}g)\n• Estimated Payout: ₹${spotEstimatedValue.toLocaleString(
      'en-IN'
    )}\nPlease confirm today's live rate.`
  );

  const pledgeWaMsg = encodeURIComponent(
    `Hi VR GOLD Kadapa! I want to release pledged gold:\n• Bank: ${pledgeBank}\n• Gold Weight: ${pledgeWeight} Grams (${pledgePurity})\n• Loan Amount: ₹${loanPrincipal.toLocaleString(
      'en-IN'
    )}\n• Estimated Surplus Cash to me: ₹${netCashSurplus.toLocaleString(
      'en-IN'
    )}\nPlease dispatch executive for doorstep bank clearance.`
  );

  return (
    <section id="calculator" className="py-16 md:py-24 bg-surface-light border-y border-gold-200/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold mb-3 border border-gold-300">
            <Calculator className="w-3.5 h-3.5 text-gold-700" />
            <span>Kadapa Dual-Engine Live Valuation Tool</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Calculate Pledged Gold Release &amp; Cash Payout
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            See exactly how much surplus cash you will receive in hand after VR Gold clears your full bank loan.
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6 p-1.5 bg-gray-200/80 rounded-2xl max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('PLEDGE_RELEASE')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'PLEDGE_RELEASE'
                  ? 'bg-navy-950 text-gold-300 shadow-md scale-102'
                  : 'text-gray-700 hover:text-navy-950'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Pledged Gold Release</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('SPOT_SALE')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'SPOT_SALE'
                  ? 'bg-navy-950 text-gold-300 shadow-md scale-102'
                  : 'text-gray-700 hover:text-navy-950'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Instant Spot Cash</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: PLEDGED GOLD RELEASE CALCULATOR (FLAGSHIP ENGINE) */}
        {/* ======================================================== */}
        {activeTab === 'PLEDGE_RELEASE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gold-300">
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Bank Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  1. Where is your gold currently pledged?
                </label>
                <select
                  value={pledgeBank}
                  onChange={(e) => setPledgeBank(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-bold text-navy-950 text-sm focus:ring-2 focus:ring-gold-500 bg-gray-50/50"
                >
                  <option value="SBI Kadapa Main Branch">State Bank of India (SBI Kadapa)</option>
                  <option value="Andhra Pragathi Grameena Bank (APGB)">APGB (Grameena Bank)</option>
                  <option value="Canara Bank - Kadapa Branch">Canara Bank - Kadapa</option>
                  <option value="Union Bank of India (Andhra Bank)">Union Bank / Andhra Bank</option>
                  <option value="Muthoot Finance Kadapa">Muthoot Finance</option>
                  <option value="Manappuram Gold Loan">Manappuram Finance</option>
                  <option value="Private Financier / Pawn Broker">Private Financier / Pawn Broker</option>
                </select>
              </div>

              {/* Weight & Purity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    2. Gold Weight (Grams)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={pledgeWeight || ''}
                      onChange={(e) => setPledgeWeight(Math.max(1, Number(e.target.value)))}
                      className="w-full text-xl font-black text-navy-950 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold-500"
                      placeholder="e.g. 35"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      Grams
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    3. Gold Purity
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPledgePurity('22K')}
                      className={`py-3 px-3 rounded-xl border-2 font-black text-xs transition-all ${
                        pledgePurity === '22K'
                          ? 'border-gold-500 bg-gold-50 text-navy-950 shadow-xs'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      22K (916)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPledgePurity('24K')}
                      className={`py-3 px-3 rounded-xl border-2 font-black text-xs transition-all ${
                        pledgePurity === '24K'
                          ? 'border-gold-500 bg-gold-50 text-navy-950 shadow-xs'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      24K Pure
                    </button>
                  </div>
                </div>
              </div>

              {/* Loan Amount Borrowed */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    4. Total Loan Principal Borrowed (₹)
                  </label>
                  <span className="text-xs font-bold text-gold-700">₹{loanPrincipal.toLocaleString('en-IN')}</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="1000"
                    min="5000"
                    value={loanPrincipal || ''}
                    onChange={(e) => setLoanPrincipal(Math.max(0, Number(e.target.value)))}
                    className="w-full text-xl font-black text-navy-950 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold-500"
                    placeholder="e.g. 150000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    INR (₹)
                  </span>
                </div>
              </div>

              {/* Interest Rate & Months Slider */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-gold-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-navy-950">Est. Monthly Interest: {monthlyInterestRate}% / month</span>
                  <span className="text-gray-500">Duration: {monthsPledged} Months</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="3.5"
                  step="0.1"
                  value={monthlyInterestRate}
                  onChange={(e) => setMonthlyInterestRate(Number(e.target.value))}
                  className="w-full accent-gold-600"
                />
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Bank (0.8% - 1.2%)</span>
                  <span>NBFC (1.5% - 2.5%)</span>
                  <span>Private (2.5% - 3.5%)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  VR Gold brings 100% of the funds to clear your bank loan directly at the branch counter.
                </span>
              </div>
            </div>

            {/* Right Settlement Breakdown Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-gold-500/30">
              <div>
                <div className="flex items-center justify-between text-xs text-gold-300 font-semibold mb-2">
                  <span>YOUR ESTIMATED CASH SURPLUS</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                    IN YOUR HAND
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                  ₹{netCashSurplus.toLocaleString('en-IN')}
                </div>

                <p className="text-xs text-gold-200/90 leading-relaxed mb-6 font-medium">
                  This is the extra cash paid to you after VR Gold clears your ₹{totalBankSettlement.toLocaleString('en-IN')}{' '}
                  loan settlement with {pledgeBank}.
                </p>

                {/* Financial Ledger Breakdown */}
                <div className="space-y-2.5 py-4 border-t border-navy-800 text-xs">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>1. Gold Market Value ({pledgeWeight}g × ₹{pledgeRate.toLocaleString('en-IN')}):</span>
                    <span className="font-bold text-white">₹{totalGoldMarketValue.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-red-300">
                    <span>2. Bank Principal Cleared:</span>
                    <span className="font-bold">- ₹{loanPrincipal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-red-300">
                    <span>3. Accrued Interest Cleared:</span>
                    <span className="font-bold">- ₹{accruedInterest.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-300 pt-2 border-t border-navy-800 font-bold">
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Interest Saved Annually:
                    </span>
                    <span>₹{annualInterestBleeding.toLocaleString('en-IN')}/year</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-6">
                <button
                  type="button"
                  onClick={() => onOpenBooking && onOpenBooking(pledgeWeight, pledgeBank)}
                  className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-xs shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Book Doorstep Bank Release</span>
                </button>

                <a
                  href={`https://wa.me/918978973576?text=${pledgeWaMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-transform hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Settlement Quote</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: INSTANT SPOT CASH CALCULATOR (DIRECT SALE) */}
        {/* ======================================================== */}
        {activeTab === 'SPOT_SALE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gold-300">
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Purity Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  1. Select Gold Purity
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSpotPurity('22K')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      spotPurity === '22K'
                        ? 'border-gold-500 bg-gold-50/70 shadow-xs'
                        : 'border-gray-200 hover:border-gold-300'
                    }`}
                  >
                    <span className="block text-base font-black text-navy-950">22K (916)</span>
                    <span className="text-[11px] text-gray-500 block">Hallmark</span>
                    <span className="text-xs font-bold text-gold-700 mt-1 block">
                      ₹{rates.gold22k.toLocaleString('en-IN')}/g
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpotPurity('24K')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      spotPurity === '24K'
                        ? 'border-gold-500 bg-gold-50/70 shadow-xs'
                        : 'border-gray-200 hover:border-gold-300'
                    }`}
                  >
                    <span className="block text-base font-black text-navy-950">24K Pure</span>
                    <span className="text-[11px] text-gray-500 block">Coins/Bars</span>
                    <span className="text-xs font-bold text-gold-700 mt-1 block">
                      ₹{rates.gold24k.toLocaleString('en-IN')}/g
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpotPurity('18K')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      spotPurity === '18K'
                        ? 'border-gold-500 bg-gold-50/70 shadow-xs'
                        : 'border-gray-200 hover:border-gold-300'
                    }`}
                  >
                    <span className="block text-base font-black text-navy-950">18K Gold</span>
                    <span className="text-[11px] text-gray-500 block">Ornaments</span>
                    <span className="text-xs font-bold text-gold-700 mt-1 block">
                      ₹{rates.gold18k.toLocaleString('en-IN')}/g
                    </span>
                  </button>
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    2. Gold Weight (Grams)
                  </label>
                  <span className="text-xs font-bold text-gold-700">{spotWeight} Grams</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={spotWeight || ''}
                    onChange={(e) => setSpotWeight(Math.max(1, Number(e.target.value)))}
                    className="w-full text-2xl font-black text-navy-950 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold-500"
                    placeholder="e.g. 24"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                    Grams (gm)
                  </span>
                </div>

                {/* Quick Weight Selectors */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[8, 16, 24, 32, 50, 100].map((gm) => (
                    <button
                      key={gm}
                      type="button"
                      onClick={() => setSpotWeight(gm)}
                      className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-colors ${
                        spotWeight === gm
                          ? 'bg-gold-500 text-navy-950 font-black border-gold-500'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      {gm}g {gm === 8 && '(1 Tola)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Deduction */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  3. Approximate Stone / Enamel Deduction (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={stoneDeductionGrams || ''}
                  onChange={(e) => setStoneDeductionGrams(Math.max(0, Number(e.target.value)))}
                  className="w-full text-sm font-bold text-navy-950 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold-500"
                  placeholder="0 (e.g. 1.5g if heavy stones)"
                />
              </div>

              <p className="text-[11px] text-gray-500 italic">
                * Exact purity confirmed via German Karatmeter with zero damage or scraping to ornaments.
              </p>
            </div>

            {/* Right Output */}
            <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-gold-500/30">
              <div>
                <div className="flex items-center justify-between text-xs text-gold-300 font-semibold mb-2">
                  <span>ESTIMATED SPOT CASH PAYOUT</span>
                  <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-[10px] font-bold">
                    {spotPurity} Gold
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                  ₹{spotEstimatedValue.toLocaleString('en-IN')}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  Instant spot cash or immediate RTGS/IMPS bank transfer for {netSpotWeight}g net gold at today&apos;s Kadapa rate.
                </p>

                <div className="space-y-2 py-4 border-t border-navy-800 text-xs text-gray-300">
                  <div className="flex items-center justify-between">
                    <span>Today&apos;s Rate:</span>
                    <span className="font-bold text-white">₹{spotRate.toLocaleString('en-IN')} / g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Net Gold Weight:</span>
                    <span className="font-bold text-white">{netSpotWeight} Grams</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Testing &amp; Valuation Fee:</span>
                    <span className="font-bold text-emerald-400">FREE (₹0)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <a
                  href={`https://wa.me/918978973576?text=${spotWaMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Instant Quote</span>
                </a>

                <a
                  href="tel:8978973576"
                  className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-xs shadow-md transition-transform hover:scale-[1.02]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 8978973576</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
