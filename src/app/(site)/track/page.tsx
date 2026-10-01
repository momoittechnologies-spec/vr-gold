'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  Phone,
  MessageSquare,
  FileText,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [query, setQuery] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    type?: string;
    record?: any;
    transaction?: any;
    message?: string;
  } | null>(null);

  const handleSearch = async (lookupCode: string) => {
    if (!lookupCode.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      // First check transactions
      const txnRes = await fetch(`/api/transactions?voucher=${encodeURIComponent(lookupCode.trim())}`);
      const txnData = await txnRes.json();

      if (txnData.found && txnData.transaction) {
        setResult({ found: true, type: 'TRANSACTION', transaction: txnData.transaction });
        setLoading(false);
        return;
      }

      // If not in transactions, check leads
      const leadRes = await fetch(`/api/leads?track=${encodeURIComponent(lookupCode.trim())}`);
      const leadData = await leadRes.json();

      if (leadData.found && leadData.record) {
        setResult({ found: true, type: 'LEAD', record: leadData.record });
      } else {
        setResult({ found: false, message: 'No record found with this reference code. Please verify or call our Kadapa desk.' });
      }
    } catch (err) {
      console.error(err);
      setResult({ found: false, message: 'Unable to connect to VR Gold ledger. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      handleSearch(initialRef);
    }
  }, [initialRef]);

  // Determine stage progression (0 to 4)
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'NEW':
        return 0;
      case 'CONTACTED':
        return 1;
      case 'BANK_VISIT_SCHEDULED':
      case 'IN_PROGRESS':
        return 2;
      case 'BANK_CLEARED':
        return 3;
      case 'RELEASE_COMPLETED':
      case 'SETTLEMENT_COMPLETED':
        return 4;
      default:
        return 1;
    }
  };

  const stages = [
    { title: 'Inquiry Received', desc: 'Logged in VR Gold dispatch' },
    { title: 'Desk Verified', desc: 'Valuation & bank reviewed' },
    { title: 'Executive Dispatched', desc: 'Meeting you at bank branch' },
    { title: 'Loan Cleared', desc: 'Bank loan settled by VR Gold' },
    { title: 'Cash Disbursed', desc: 'Gold delivered & surplus paid' },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-surface-light min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold mb-3 border border-gold-300">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-700" />
            <span>VR Gold Kadapa Ledger System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Track Your Pledged Gold Release
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your Tracking Code (e.g. <span className="font-mono font-bold text-navy-950">VRG-8921</span>, <span className="font-mono font-bold text-navy-950">VRG-1048</span>) or registered phone number.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg border border-gold-200 mb-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. VRG-8921, VRG-1048 or Phone Number"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-300 text-base font-bold text-navy-950 focus:ring-2 focus:ring-gold-500 focus:outline-none uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-sm shadow-md transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-70 shrink-0"
            >
              {loading ? 'Searching Ledger...' : 'Track Request'}
            </button>
          </form>
        </div>

        {/* Search Result */}
        {result && !result.found && (
          <div className="p-6 rounded-3xl bg-white border border-red-200 text-center shadow-md space-y-3">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="text-lg font-bold text-navy-950">Record Not Found</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">{result.message}</p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href="tel:8978973576"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 text-white font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Kadapa Desk: 8978973576</span>
              </a>
            </div>
          </div>
        )}

        {result && result.found && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gold-300 space-y-8 animate-fade-in">
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest block">
                  {result.type === 'TRANSACTION' ? 'OFFICIAL SETTLEMENT RECORD' : 'DOORSTEP CLEARANCE REQUEST'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mt-1">
                  {result.type === 'TRANSACTION'
                    ? result.transaction.voucherCode
                    : result.record.trackingCode}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Customer:{' '}
                  <span className="font-bold text-navy-950">
                    {result.type === 'TRANSACTION'
                      ? result.transaction.customerName
                      : result.record.name}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black">
                  STATUS:{' '}
                  {result.type === 'TRANSACTION'
                    ? result.transaction.status
                    : result.record.status}
                </span>
              </div>
            </div>

            {/* Progress Stepper */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
                Live Dispatch &amp; Clearance Stages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {stages.map((stage, idx) => {
                  const currentIdx = getStageIndex(
                    result.type === 'TRANSACTION'
                      ? result.transaction.status
                      : result.record.status
                  );
                  const isCompleted = idx <= currentIdx;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        isCompleted
                          ? 'bg-emerald-50/70 border-emerald-400'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-gray-400">0{idx + 1}</span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-navy-950 mb-0.5">{stage.title}</h4>
                      <p className="text-[10px] text-gray-500 leading-tight">{stage.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <div>
                <span className="text-gray-500 block mb-1 font-medium">Bank / Branch:</span>
                <p className="text-sm font-bold text-navy-950 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-gold-600" />
                  <span>
                    {result.type === 'TRANSACTION'
                      ? result.transaction.bankOrLender
                      : result.record.bankName}
                  </span>
                </p>
              </div>

              <div>
                <span className="text-gray-500 block mb-1 font-medium">Gold Weight:</span>
                <p className="text-sm font-bold text-navy-950">
                  {result.type === 'TRANSACTION'
                    ? `${result.transaction.totalNetWeightGrams}g Net (${result.transaction.totalGrossWeightGrams}g Gross)`
                    : `${result.record.estimatedGrams} Grams (Approx)`}
                </p>
              </div>

              {result.type === 'TRANSACTION' && (
                <>
                  <div>
                    <span className="text-gray-500 block mb-1 font-medium">Bank Loan Cleared:</span>
                    <p className="text-sm font-bold text-red-700">
                      ₹{result.transaction.bankTotalSettlement.toLocaleString('en-IN')} (Full Payoff)
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1 font-medium">Net Surplus Cash Paid:</span>
                    <p className="text-base font-black text-emerald-700">
                      ₹{result.transaction.netPayoutToCustomer.toLocaleString('en-IN')}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                <span>Questions about this request? Contact Kadapa Desk: </span>
                <a href="tel:8978973576" className="font-bold text-gold-700 hover:underline">
                  +91 89789 73576
                </a>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {result.type === 'TRANSACTION' && (
                  <Link
                    href={`/voucher/${result.transaction.voucherCode}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-sm transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Printable Settlement Voucher</span>
                  </Link>
                )}

                <a
                  href="https://wa.me/918978973576"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Kadapa Desk</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold">Loading VR Gold Ledger...</div>}>
      <TrackContent />
    </Suspense>
  );
}
