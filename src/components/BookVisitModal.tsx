'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, Building2, Calendar, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialGrams?: number;
  initialBank?: string;
}

export default function BookVisitModal({ isOpen, onClose, initialGrams, initialBank }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'DOORSTEP_RELEASE',
    bankName: initialBank || 'SBI Kadapa Main Branch',
    estimatedGrams: initialGrams || 20,
    pledgeAmount: '',
    location: 'Kadapa Town',
    preferredDate: 'Today',
    preferredTime: 'Immediate (Within 1-2 Hours)',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmittedCode(data.trackingCode);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please call directly at 8978973576.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gold-300 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white p-6 relative">
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Kadapa Doorstep Bank Release</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Schedule Bank Clearance
          </h3>
          <p className="text-xs text-gold-200/90 mt-1 font-medium">
            మా బృందం నేరుగా మీ బ్యాంకు వద్దకే వచ్చి డబ్బులు కట్టి బంగారాన్ని విడిపిస్తుంది.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedCode ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-black text-navy-950">Request Dispatched!</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Our Kadapa desk is reviewing your details and assigning a field executive.
                </p>
              </div>

              {/* Reference Code Box */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-gold-400 text-center">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block">
                  YOUR TRACKING REFERENCE CODE
                </span>
                <span className="text-3xl font-black text-navy-950 tracking-wider font-mono block my-1">
                  {submittedCode}
                </span>
                <span className="text-[11px] text-emerald-800 font-semibold block">
                  ✓ Saved in VR Gold Dispatch Ledger
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/918978973576?text=Hi%20VR%20GOLD%20Kadapa!%20I%20have%20submitted%20pledged%20gold%20release%20request%20with%20Tracking%20Code%20*${submittedCode}*.%20Bank%3A%20${encodeURIComponent(
                    formData.bankName
                  )}%2C%20Weight%3A%20${formData.estimatedGrams}g.%20Please%20confirm%20visit.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-transform hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify Kadapa Desk on WhatsApp</span>
                </a>

                <Link
                  href={`/track?ref=${submittedCode}`}
                  onClick={handleReset}
                  className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-sm transition-colors"
                >
                  <span>Track Live Status Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Subba Reddy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9848012345"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Bank Selector & Estimated Grams */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Bank / Finance Company *
                  </label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                  >
                    <option value="SBI Kadapa Main Branch">SBI Kadapa Main Branch</option>
                    <option value="SBI RIMS / Yerramukkapalli">SBI RIMS / Yerramukkapalli</option>
                    <option value="Andhra Pragathi Grameena Bank (APGB)">APGB (Grameena Bank)</option>
                    <option value="Canara Bank - Kadapa">Canara Bank - Kadapa</option>
                    <option value="Union Bank of India">Union Bank (Andhra Bank)</option>
                    <option value="Muthoot Finance Kadapa">Muthoot Finance</option>
                    <option value="Manappuram Gold Loan">Manappuram Gold Loan</option>
                    <option value="Other Bank / Private Lender">Other Bank / Private Lender</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Approx Gold Weight (Grams) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.estimatedGrams}
                    onChange={(e) => setFormData({ ...formData, estimatedGrams: Number(e.target.value) })}
                    placeholder="e.g. 35"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Location / Mandal
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. NGO Colony, Kadapa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none bg-white"
                  >
                    <option value="Immediate (Within 1-2 Hours)">Immediate (Within 1-2 Hours)</option>
                    <option value="Today Afternoon (02:00 PM - 05:00 PM)">Today Afternoon (02:00 PM - 05:00 PM)</option>
                    <option value="Tomorrow Morning (10:00 AM - 01:00 PM)">Tomorrow Morning (10:00 AM - 01:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Loan / Gold Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. 4 bangles & 1 necklace pledged for approx ₹1.8 Lakhs. Need cash to clear loan."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-sm shadow-lg shadow-gold-500/25 transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? 'Registering Dispatch...' : 'Confirm & Request Doorstep Bank Visit'}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Confidential · Free Spot Evaluation · Zero Advance Fees</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
