'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  Plus,
  Trash2,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

interface ItemRow {
  id: string;
  name: string;
  purityKarat: 24 | 22 | 18;
  grossWeightGrams: number;
  stoneEnamelWeightGrams: number;
}

export default function AdminValuationPage() {
  const router = useRouter();

  // Live rates for auto-pricing
  const [rates, setRates] = useState<any>({
    gold24k: 7520,
    gold22k: 6890,
    gold18k: 5640,
  });

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    aadhaar: '',
    address: 'Kadapa, Andhra Pradesh',
    bankOrLender: 'State Bank of India (SBI Kadapa Main)',
    loanAccountNo: '',
    pledgeSlipNo: '',
    notes: '',
  });

  const [items, setItems] = useState<ItemRow[]>([
    {
      id: 'item-1',
      name: 'Gold Necklace / Haram',
      purityKarat: 22,
      grossWeightGrams: 28.5,
      stoneEnamelWeightGrams: 0.5,
    },
    {
      id: 'item-2',
      name: 'Gold Bangles (Pair)',
      purityKarat: 22,
      grossWeightGrams: 20.0,
      stoneEnamelWeightGrams: 0.0,
    },
  ]);

  const [bankPrincipal, setBankPrincipal] = useState<number>(200000);
  const [bankInterest, setBankInterest] = useState<number>(6400);
  const [serviceFee, setServiceFee] = useState<number>(3000);
  const [paymentMethod, setPaymentMethod] = useState<'IMPS_RTGS' | 'CASH' | 'UPI'>('IMPS_RTGS');
  const [paymentReference, setPaymentReference] = useState<string>('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/rates')
      .then((res) => res.json())
      .then((data) => {
        if (data.rates) {
          setRates(data.rates);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        name: 'Gold Ornament',
        purityKarat: 22,
        grossWeightGrams: 10,
        stoneEnamelWeightGrams: 0,
      },
    ]);
  };

  const removeItemRow = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateItemRow = (id: string, field: keyof ItemRow, value: any) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  // Calculations
  const calculatedItems = items.map((it) => {
    const netWt = Math.max(0, it.grossWeightGrams - it.stoneEnamelWeightGrams);
    const rate =
      it.purityKarat === 24
        ? rates.gold24k
        : it.purityKarat === 22
        ? rates.gold22k
        : rates.gold18k;
    const valuation = Math.round(netWt * rate);
    return {
      ...it,
      netGoldWeightGrams: Math.round(netWt * 100) / 100,
      ratePerGram: rate,
      itemValuation: valuation,
    };
  });

  const totalGrossWeight = calculatedItems.reduce((acc, it) => acc + (it.grossWeightGrams || 0), 0);
  const totalNetWeight = calculatedItems.reduce((acc, it) => acc + (it.netGoldWeightGrams || 0), 0);
  const totalGrossGoldValuation = calculatedItems.reduce((acc, it) => acc + (it.itemValuation || 0), 0);

  const totalBankSettlement = (Number(bankPrincipal) || 0) + (Number(bankInterest) || 0);
  const netCustomerPayout = Math.max(
    0,
    totalGrossGoldValuation - totalBankSettlement - (Number(serviceFee) || 0)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) {
      setError('Please provide customer name and phone number');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        customerName: customer.name,
        customerPhone: customer.phone,
        customerAadhaar: customer.aadhaar || 'Verified',
        customerAddress: customer.address,
        bankOrLender: customer.bankOrLender,
        loanAccountNo: customer.loanAccountNo,
        pledgeSlipNo: customer.pledgeSlipNo,
        type: 'PLEDGED_GOLD_RELEASE',
        items: calculatedItems,
        bankPrincipalCleared: bankPrincipal,
        bankInterestCleared: bankInterest,
        vrGoldServiceFee: serviceFee,
        paymentMethod,
        paymentReference: paymentReference || `UTR-${Date.now().toString().slice(-8)}`,
        notes: customer.notes,
      };

      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to process transaction');
      }

      // Redirect directly to the generated voucher
      router.push(`/voucher/${data.voucherCode}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Transaction processing failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-6xl">
      <div>
        <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest block">
          OFFICIAL SETTLEMENT WORKFLOW
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-navy-950">
          Pledged Gold Valuation &amp; Release Engine
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Perform computerized Karatmeter itemization, calculate bank loan deduction, and generate official printable settlement vouchers.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Customer & Bank Identification */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-navy-950 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center text-xs">
              1
            </span>
            <span>Customer &amp; Bank Loan Account Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="e.g. M. Rama Krishna Reddy"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="e.g. 9848012345"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Aadhaar / ID Proof (Optional)
              </label>
              <input
                type="text"
                value={customer.aadhaar}
                onChange={(e) => setCustomer({ ...customer, aadhaar: e.target.value })}
                placeholder="XXXX-XXXX-4812"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Pledged Bank / Lender *
              </label>
              <input
                type="text"
                required
                value={customer.bankOrLender}
                onChange={(e) => setCustomer({ ...customer, bankOrLender: e.target.value })}
                placeholder="e.g. SBI Kadapa Main Branch"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Loan Account Number
              </label>
              <input
                type="text"
                value={customer.loanAccountNo}
                onChange={(e) => setCustomer({ ...customer, loanAccountNo: e.target.value })}
                placeholder="e.g. GL-2026-9810"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Pledge Slip / Receipt No.
              </label>
              <input
                type="text"
                value={customer.pledgeSlipNo}
                onChange={(e) => setCustomer({ ...customer, pledgeSlipNo: e.target.value })}
                placeholder="e.g. PS-449102"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Itemized Ornaments & Karatmeter Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-navy-950 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center text-xs">
                2
              </span>
              <span>Computerized Ornaments &amp; Purity Valuation</span>
            </h2>

            <button
              type="button"
              onClick={addItemRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-100 hover:bg-gold-200 text-navy-950 font-bold text-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Ornament Row</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 font-bold uppercase text-[10px] text-gray-600">
                <tr>
                  <th className="py-3 px-3">Description</th>
                  <th className="py-3 px-3">Purity</th>
                  <th className="py-3 px-3">Gross Wt (g)</th>
                  <th className="py-3 px-3">Stone/Wax (g)</th>
                  <th className="py-3 px-3">Net Gold (g)</th>
                  <th className="py-3 px-3">Rate / g</th>
                  <th className="py-3 px-3">Valuation (₹)</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {calculatedItems.map((it) => (
                  <tr key={it.id}>
                    <td className="p-2">
                      <input
                        type="text"
                        value={it.name}
                        onChange={(e) => updateItemRow(it.id, 'name', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 font-bold text-navy-950 text-xs"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        value={it.purityKarat}
                        onChange={(e) =>
                          updateItemRow(it.id, 'purityKarat', Number(e.target.value))
                        }
                        className="px-2 py-1.5 rounded-lg border border-gray-300 font-bold text-xs bg-white"
                      >
                        <option value={24}>24K Pure</option>
                        <option value={22}>22K 916</option>
                        <option value={18}>18K Gold</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={it.grossWeightGrams}
                        onChange={(e) =>
                          updateItemRow(it.id, 'grossWeightGrams', Number(e.target.value))
                        }
                        className="w-20 px-2 py-1.5 rounded-lg border border-gray-300 text-xs font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={it.stoneEnamelWeightGrams}
                        onChange={(e) =>
                          updateItemRow(it.id, 'stoneEnamelWeightGrams', Number(e.target.value))
                        }
                        className="w-20 px-2 py-1.5 rounded-lg border border-gray-300 text-xs text-gray-500"
                      />
                    </td>
                    <td className="p-2 font-black text-navy-950">{it.netGoldWeightGrams}g</td>
                    <td className="p-2 text-gray-600 font-semibold">
                      ₹{it.ratePerGram.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2 font-black text-navy-950 text-sm">
                      ₹{it.itemValuation.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeItemRow(it.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gold-50/70 border-t-2 border-gold-300 font-black text-xs text-navy-950">
                <tr>
                  <td colSpan={2} className="py-3 px-3">
                    TOTALS:
                  </td>
                  <td className="py-3 px-3">{totalGrossWeight.toFixed(2)}g</td>
                  <td className="py-3 px-3 text-gray-500">
                    {(totalGrossWeight - totalNetWeight).toFixed(2)}g
                  </td>
                  <td className="py-3 px-3">{totalNetWeight.toFixed(2)}g Net</td>
                  <td>-</td>
                  <td className="py-3 px-3 text-base text-navy-950">
                    ₹{totalGrossGoldValuation.toLocaleString('en-IN')}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Step 3: Bank Settlement & Net Payout Calculation */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-xl space-y-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-gold-300 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center text-xs">
              3
            </span>
            <span>Bank Loan Payoff &amp; Net Surplus Cash Calculation</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Bank Principal Cleared by VR Gold (₹) *
              </label>
              <input
                type="number"
                required
                value={bankPrincipal}
                onChange={(e) => setBankPrincipal(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gray-700 text-white text-base font-bold focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Accrued Bank Interest Cleared (₹)
              </label>
              <input
                type="number"
                value={bankInterest}
                onChange={(e) => setBankInterest(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gray-700 text-white text-base font-bold focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Evaluation &amp; Processing Fee (₹)
              </label>
              <input
                type="number"
                value={serviceFee}
                onChange={(e) => setServiceFee(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-gray-700 text-white text-base font-bold focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          {/* Large Settlement Result Box */}
          <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
                TOTAL NET SURPLUS PAYOUT TO CUSTOMER
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white">
                ₹{netCustomerPayout.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-gray-400">
                Gold Valuation (₹{totalGrossGoldValuation.toLocaleString('en-IN')}) - Bank Settlement (₹{totalBankSettlement.toLocaleString('en-IN')}) - Fee (₹{serviceFee.toLocaleString('en-IN')})
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="px-4 py-3 rounded-xl bg-navy-950 border border-gray-700 text-white font-bold text-xs"
              >
                <option value="IMPS_RTGS">IMPS / RTGS Bank Transfer</option>
                <option value="CASH">Hard Cash Handover</option>
                <option value="UPI">UPI Direct Instant</option>
                <option value="SPLIT_CASH_AND_UPI">Split Cash &amp; UPI</option>
              </select>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-600 to-gold-600 hover:from-gold-600 hover:to-amber-700 text-navy-950 font-black text-sm shadow-xl transition-transform hover:scale-105 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{submitting ? 'Generating Settlement...' : 'Complete & Generate A4 Voucher'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
