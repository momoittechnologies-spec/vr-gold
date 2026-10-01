'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  MessageSquare,
  Phone,
  ShieldCheck,
  Building2,
  Coins,
  TrendingDown,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useBooking } from '@/context/BookingContext';

export default function LiveGoldCalculator() {
  const { isTelugu } = useLanguage();
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<'PLEDGE_RELEASE' | 'SPOT_SALE'>('PLEDGE_RELEASE');

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
  const [monthlyInterestRate, setMonthlyInterestRate] = useState<number>(2.0);
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
    <section id="calculator" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold mb-3 border border-gold-300">
            <Calculator className="w-3.5 h-3.5 text-gold-700" />
            <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
              {isTelugu ? 'కడప లైవ్ గోల్డ్ వ్యాల్యుయేషన్ ఇంజిన్' : 'Kadapa Dual-Engine Live Valuation Tool'}
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'బంగారు విలువ & తాకట్టు విడుదల మిగులు నగదును లెక్కించండి'
              : 'Calculate Gold Valuation & Surplus Payout'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-xl mx-auto"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'నేటి కడప లైవ్ బులియన్ మార్కెట్ రేటు ఆధారంగా మీ ఆభరణాల విలువను లెక్కించండి (అన్ని ఫలితాలు అంచనాలు మాత్రమే).'
              : 'Estimate your net surplus cash after loan clearance or calculate instant spot cash payout at daily rates.'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6 p-1.5 bg-slate-200/80 rounded-2xl max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('PLEDGE_RELEASE')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'PLEDGE_RELEASE'
                  ? 'bg-[#060D1A] text-gold-300 shadow-md scale-[1.02]'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                {isTelugu ? 'తాకట్టు విడుదల' : 'Pledged Gold Release'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('SPOT_SALE')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'SPOT_SALE'
                  ? 'bg-[#060D1A] text-gold-300 shadow-md scale-[1.02]'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                {isTelugu ? 'తక్షణ స్పాట్ క్యాష్' : 'Instant Spot Cash'}
              </span>
            </button>
          </div>
        </div>

        {/* ─── TAB 1: PLEDGED GOLD RELEASE CALCULATOR ──────────────────────── */}
        {activeTab === 'PLEDGE_RELEASE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Bank Selection */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu ? '1. మీ బంగారం ఎక్కడ తాకట్టు ఉంది?' : '1. Where is your gold currently pledged?'}
                </label>
                <select
                  value={pledgeBank}
                  onChange={(e) => setPledgeBank(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-gold-500 bg-slate-50/50"
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
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? '2. బంగారం బరువు (గ్రాములు)' : '2. Gold Weight (Grams)'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={pledgeWeight || ''}
                      onChange={(e) => setPledgeWeight(Math.max(1, Number(e.target.value)))}
                      className="w-full text-lg font-black text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500"
                      placeholder="e.g. 35"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      Grams
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? '3. స్వచ్ఛత' : '3. Gold Purity'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPledgePurity('22K')}
                      className={`py-2.5 px-3 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${
                        pledgePurity === '22K'
                          ? 'border-gold-500 bg-gold-50 text-slate-900 shadow-xs'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      22K (916)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPledgePurity('24K')}
                      className={`py-2.5 px-3 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${
                        pledgePurity === '24K'
                          ? 'border-gold-500 bg-gold-50 text-slate-900 shadow-xs'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      24K Pure
                    </button>
                  </div>
                </div>
              </div>

              {/* Loan Principal Borrowed */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? '4. తీసుకున్న లోన్ మొత్తం (₹)' : '4. Total Loan Principal Borrowed (₹)'}
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
                    className="w-full text-lg font-black text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500"
                    placeholder="e.g. 150000"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    INR (₹)
                  </span>
                </div>
              </div>

              {/* Interest Rate & Months Slider */}
              <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-gold-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {isTelugu ? 'అంచనా వడ్డీ రేటు:' : 'Est. Interest Rate:'} {monthlyInterestRate}% / month
                  </span>
                  <span className="text-slate-500">
                    {isTelugu ? 'కాలపరిమితి:' : 'Duration:'} {monthsPledged} {isTelugu ? 'నెలలు' : 'Months'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="3.5"
                  step="0.1"
                  value={monthlyInterestRate}
                  onChange={(e) => setMonthlyInterestRate(Number(e.target.value))}
                  className="w-full accent-gold-600 cursor-pointer"
                  aria-label="Monthly interest rate"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Bank (0.8% - 1.2%)</span>
                  <span>NBFC (1.5% - 2.5%)</span>
                  <span>Private (2.5% - 3.5%)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                  {isTelugu
                    ? 'VR GOLD మీ బ్యాంకు అప్పు చెల్లించడానికి 100% నిధులను నేరుగా కౌంటర్‌కే తెస్తుంది.'
                    : 'VR GOLD provides 100% clearance liquidity directly at the bank counter.'}
                </span>
              </div>
            </div>

            {/* Right Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#060D1A] via-navy-950 to-[#060D1A] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-gold-500/30">
              <div>
                <div className="flex items-center justify-between text-xs text-gold-300 font-semibold mb-2">
                  <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                    {isTelugu ? 'మీ చేతికి అందే అంచనా మిగులు నగదు' : 'YOUR ESTIMATED CASH SURPLUS'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                    IN HAND
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
                  ₹{netCashSurplus.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400 block mb-4">
                  * {isTelugu ? 'అంచనా విలువ మాత్రమే. క్యారెట్‌మీటర్ పరీక్ష ఆధారంగా ఖరారవుతుంది.' : 'Indicative estimate based on benchmark rates.'}
                </span>

                {/* Ledger Breakdown */}
                <div className="space-y-2 py-3 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>1. {isTelugu ? 'బంగారం మార్కెట్ విలువ' : 'Gold Market Value'}:</span>
                    <span className="font-bold text-white">₹{totalGoldMarketValue.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-red-300">
                    <span>2. {isTelugu ? 'క్లియర్ చేసే బ్యాంక్ అసలు' : 'Bank Principal'}:</span>
                    <span className="font-bold">- ₹{loanPrincipal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-red-300">
                    <span>3. {isTelugu ? 'అంచనా వడ్డీ బకాయి' : 'Accrued Interest'}:</span>
                    <span className="font-bold">- ₹{accruedInterest.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-300 pt-2 border-t border-slate-800 font-bold">
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {isTelugu ? 'వార్షిక వడ్డీ ఆదా' : 'Annual Interest Saved'}:
                    </span>
                    <span>₹{annualInterestBleeding.toLocaleString('en-IN')}/yr</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => openBooking(pledgeWeight, pledgeBank)}
                  className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-black text-xs shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                    {isTelugu ? 'డోర్‌స్టెప్ బ్యాంక్ విడుదల బుక్ చేయండి' : 'Book Doorstep Bank Release'}
                  </span>
                </button>

                <a
                  href={`https://wa.me/918978973576?text=${pledgeWaMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-transform hover:scale-[1.02]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                    {isTelugu ? 'వాట్సాప్ కోట్ పొందండి' : 'WhatsApp Settlement Quote'}
                  </span>
                </a>
              </div>

            </div>
          </div>
        )}

        {/* ─── TAB 2: INSTANT SPOT CASH CALCULATOR ──────────────────────────── */}
        {activeTab === 'SPOT_SALE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-5">
              {/* Purity Selector */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu ? '1. బంగారు స్వచ్ఛతను ఎంచుకోండి' : '1. Select Gold Purity'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSpotPurity('22K')}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      spotPurity === '22K'
                        ? 'border-gold-500 bg-gold-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-gold-300'
                    }`}
                  >
                    <span className="block text-sm font-black text-slate-900">22K (916)</span>
                    <span className="text-[10px] text-slate-500 block">{isTelugu ? 'ఆభరణాలు' : 'Hallmark'}</span>
                    <span className="text-xs font-bold text-gold-700 mt-0.5 block">
                      ₹{rates.gold22k.toLocaleString('en-IN')}/g
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpotPurity('24K')}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      spotPurity === '24K'
                        ? 'border-gold-500 bg-gold-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-gold-300'
                    }`}
                  >
                    <span className="block text-sm font-black text-slate-900">24K Pure</span>
                    <span className="text-[10px] text-slate-500 block">{isTelugu ? 'కాయిన్స్/బార్లు' : 'Coins/Bars'}</span>
                    <span className="text-xs font-bold text-gold-700 mt-0.5 block">
                      ₹{rates.gold24k.toLocaleString('en-IN')}/g
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSpotPurity('18K')}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      spotPurity === '18K'
                        ? 'border-gold-500 bg-gold-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-gold-300'
                    }`}
                  >
                    <span className="block text-sm font-black text-slate-900">18K Gold</span>
                    <span className="text-[10px] text-slate-500 block">{isTelugu ? 'స్టోన్ నగల' : 'Ornaments'}</span>
                    <span className="text-xs font-bold text-gold-700 mt-0.5 block">
                      ₹{rates.gold18k.toLocaleString('en-IN')}/g
                    </span>
                  </button>
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
                    {isTelugu ? '2. బంగారం బరువు (గ్రాములు)' : '2. Gold Weight (Grams)'}
                  </label>
                  <span className="text-xs font-bold text-gold-700">{spotWeight} Grams</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={spotWeight || ''}
                    onChange={(e) => setSpotWeight(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xl font-black text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500"
                    placeholder="e.g. 24"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Grams (gm)
                  </span>
                </div>

                {/* Quick Weight Selectors */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {[8, 16, 24, 32, 50, 100].map((gm) => (
                    <button
                      key={gm}
                      type="button"
                      onClick={() => setSpotWeight(gm)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
                        spotWeight === gm
                          ? 'bg-gold-500 text-navy-950 font-black border-gold-500'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {gm}g {gm === 8 && '(1 Tola)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Deduction */}
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  {isTelugu ? '3. రాళ్ల / ఎనామెల్ మినహాయింపు (ఐచ్ఛికం)' : '3. Approximate Stone Deduction (Optional)'}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={stoneDeductionGrams || ''}
                  onChange={(e) => setStoneDeductionGrams(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs font-bold text-slate-900 px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500"
                  placeholder="0 (e.g. 1.5g)"
                />
              </div>

              <p
                className="text-[11px] text-slate-500 italic"
                style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
              >
                {isTelugu
                  ? '* ఖచ్చితమైన స్వచ్ఛత జర్మన్ క్యారెట్‌మీటర్ ద్వారా ఆభరణాలకు ఎలాంటి నష్టం లేకుండా నిర్ణయించబడుతుంది.'
                  : '* Exact purity confirmed via German Karatmeter with zero damage or weight loss.'}
              </p>
            </div>

            {/* Right Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#060D1A] via-navy-950 to-[#060D1A] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-gold-500/30">
              <div>
                <div className="flex items-center justify-between text-xs text-gold-300 font-semibold mb-2">
                  <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                    {isTelugu ? 'అంచనా స్పాట్ క్యాష్ చెల్లింపు' : 'ESTIMATED SPOT CASH PAYOUT'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 text-[10px] font-bold">
                    {spotPurity} Gold
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1">
                  ₹{spotEstimatedValue.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400 block mb-4">
                  * {isTelugu ? 'అంచనా మాత్రమే. స్పాట్ క్యాష్ లేదా బ్యాంక్ IMPS ద్వారా తక్షణ బదిలీ.' : 'Estimated spot value for immediate settlement.'}
                </span>

                <div className="space-y-2 py-3 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>{isTelugu ? 'నేటి రేటు' : "Today's Rate"}:</span>
                    <span className="font-bold text-white">₹{spotRate.toLocaleString('en-IN')} / g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{isTelugu ? 'నికర బరువు' : 'Net Weight'}:</span>
                    <span className="font-bold text-white">{netSpotWeight} Grams</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{isTelugu ? 'పరీక్ష రుసుము' : 'Testing Fee'}:</span>
                    <span className="font-bold text-emerald-400">FREE (₹0)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-4">
                <a
                  href={`https://wa.me/918978973576?text=${spotWaMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-transform hover:scale-[1.02]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
                    {isTelugu ? 'వాట్సాప్ ఇన్‌స్టంట్ కోట్' : 'WhatsApp Instant Quote'}
                  </span>
                </a>

                <a
                  href="tel:8978973576"
                  className="w-full inline-flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-gold-300 font-bold text-xs border border-slate-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Kadapa Desk: 8978973576</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
