'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Coins,
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  MessageSquare,
  FileText,
  Plus,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [rates, setRates] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick rate update state
  const [quick22k, setQuick22k] = useState<number>(0);
  const [quick24k, setQuick24k] = useState<number>(0);
  const [updatingRate, setUpdatingRate] = useState(false);
  const [rateSuccess, setRateSuccess] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [rRes, lRes, tRes] = await Promise.all([
        fetch('/api/rates'),
        fetch('/api/leads'),
        fetch('/api/transactions'),
      ]);

      const rData = await rRes.json();
      const lData = await lRes.json();
      const tData = await tRes.json();

      if (rData.rates) {
        setRates(rData.rates);
        setQuick22k(rData.rates.gold22k);
        setQuick24k(rData.rates.gold24k);
      }
      if (lData.leads) setLeads(lData.leads);
      if (tData.transactions) setTransactions(tData.transactions);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuickRateUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingRate(true);
    setRateSuccess(false);

    try {
      const res = await fetch('/api/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gold22k: quick22k,
          gold24k: quick24k,
        }),
      });

      const data = await res.json();
      if (res.ok && data.rates) {
        setRates(data.rates);
        setRateSuccess(true);
        setTimeout(() => setRateSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Rate update error:', err);
    } finally {
      setUpdatingRate(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  // Metrics
  const totalGramsCleared = transactions.reduce((acc, t) => acc + (t.totalNetWeightGrams || 0), 0);
  const totalCashDisbursed = transactions.reduce((acc, t) => acc + (t.netPayoutToCustomer || 0), 0);
  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest block">
            VR GOLD OPERATIONS CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950">Executive CRM Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time management of daily gold buy rates, customer leads, bank visits, and payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-navy-950 shadow-xs cursor-pointer"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/admin/valuation"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-xs shadow-md transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>New Pledged Gold Release</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Today&apos;s 22K (916) Buy Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-gold-50 text-gold-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-950">
            ₹{rates?.gold22k?.toLocaleString('en-IN') || '6,890'}
            <span className="text-xs font-medium text-gray-400"> / gram</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active on public website ticker</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Pending Dispatches
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-950">
            {newLeadsCount} <span className="text-xs font-medium text-gray-400">New Inquiries</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            {leads.length} total customer requests in pipeline
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Gold Cleared
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-navy-950">
            {totalGramsCleared.toFixed(1)} <span className="text-xs font-medium text-gray-400">Grams Net</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">Across verified Kadapa bank settlements</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Net Surplus Payouts
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            ₹{totalCashDisbursed.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-gray-500 mt-2">Handed over to Kadapa customers</p>
        </div>
      </div>

      {/* Quick Live Rate Controller Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-6 text-white border border-gold-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              1-Click Live Rate Publishing
            </span>
            <h3 className="text-lg font-black text-white">Update Today&apos;s Public Buy Rates</h3>
            <p className="text-xs text-gray-300">
              Changes reflect instantly across the header ticker, spot cash calculator, and loan release engine.
            </p>
          </div>

          <form onSubmit={handleQuickRateUpdate} className="flex flex-wrap items-center gap-3">
            <div>
              <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">22K Hallmark (₹/g)</span>
              <input
                type="number"
                value={quick22k || ''}
                onChange={(e) => setQuick22k(Number(e.target.value))}
                className="w-32 px-3 py-2 rounded-xl bg-navy-900 border border-gray-700 text-white font-black text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">24K Pure (₹/g)</span>
              <input
                type="number"
                value={quick24k || ''}
                onChange={(e) => setQuick24k(Number(e.target.value))}
                className="w-32 px-3 py-2 rounded-xl bg-navy-900 border border-gray-700 text-white font-black text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
            </div>

            <div className="self-end">
              <button
                type="submit"
                disabled={updatingRate}
                className="py-2.5 px-5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-black text-xs shadow-md transition-transform hover:scale-105 cursor-pointer disabled:opacity-60"
              >
                {updatingRate ? 'Publishing...' : 'Publish Rates Now'}
              </button>
            </div>
          </form>
        </div>

        {rateSuccess && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center">
            ✓ Rates published successfully to website!
          </div>
        )}
      </div>

      {/* CRM Leads Dispatch Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-navy-950">Active Leads &amp; Doorstep Dispatches</h3>
            <p className="text-xs text-gray-500">Customer requests from the online booking modal &amp; calculator.</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-gold-700 hover:text-gold-800 flex items-center gap-1"
          >
            <span>View Full Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Bank / Branch</th>
                <th className="py-3 px-4">Approx Weight</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Quick WhatsApp</th>
                <th className="py-3 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.slice(0, 5).map((lead) => {
                const waText = encodeURIComponent(
                  `Namaste ${lead.name} garu! This is VR GOLD Kadapa desk regarding your request (${lead.trackingCode}) for ${lead.bankName}. Our executive is ready to assist you.`
                );

                return (
                  <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-950">
                      <Link href={`/track?ref=${lead.trackingCode}`} className="hover:underline text-gold-700">
                        {lead.trackingCode}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-navy-950">{lead.name}</p>
                      <a href={`tel:${lead.phone}`} className="text-gray-500 hover:underline">
                        +91 {lead.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-navy-950">{lead.bankName}</p>
                      <span className="text-[10px] text-gray-500">{lead.location}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy-950">{lead.estimatedGrams}g</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          lead.status === 'NEW'
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : lead.status === 'BANK_VISIT_SCHEDULED'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={`https://wa.me/91${lead.phone}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Reply</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-[11px] font-bold p-1.5 rounded-lg border border-gray-300 bg-white cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="BANK_VISIT_SCHEDULED">BANK VISIT SCHEDULED</option>
                        <option value="RELEASE_COMPLETED">RELEASE COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Settlements & Printable Vouchers */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-navy-950">Recent Completed Settlements</h3>
            <p className="text-xs text-gray-500">Official transactions with generated vouchers.</p>
          </div>
          <Link
            href="/admin/valuation"
            className="text-xs font-bold text-gold-700 hover:text-gold-800 flex items-center gap-1"
          >
            <span>Create New Settlement</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Voucher No</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Bank Loan Settled</th>
                <th className="py-3 px-4">Gold Grams</th>
                <th className="py-3 px-4">Net Cash Paid</th>
                <th className="py-3 px-4 text-right">Official Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-navy-950">{txn.voucherCode}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-navy-950">{txn.customerName}</p>
                    <span className="text-[10px] text-gray-500">{txn.bankOrLender}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-red-700">
                    ₹{txn.bankTotalSettlement.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-navy-950">{txn.totalNetWeightGrams}g Net</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 text-sm">
                    ₹{txn.netPayoutToCustomer.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/voucher/${txn.voucherCode}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-[11px] shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Print A4 Voucher</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
