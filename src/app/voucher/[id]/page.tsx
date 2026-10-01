import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PrintButton from '@/components/PrintButton';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VoucherPage({ params }: Props) {
  const { id } = await params;
  const txn = db.getTransactionByVoucherOrId(id);

  if (!txn) {
    notFound();
  }

  const formattedDate = new Date(txn.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = new Date(txn.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 print:p-0 print:bg-white text-navy-950 font-sans">
      {/* Top Floating Action Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-navy-950 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to VR Gold Admin</span>
        </Link>

        <PrintButton />
      </div>

      {/* Printable Sheet (Standard A4 Container) */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl print:shadow-none print:rounded-none border border-gold-300 print:border-none p-8 sm:p-12 relative overflow-hidden">
        {/* Security Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none -rotate-45">
          <span className="text-8xl font-black uppercase tracking-widest text-navy-950">
            VR GOLD SETTLEMENT
          </span>
        </div>

        {/* Corporate Letterhead */}
        <div className="flex items-start justify-between border-b-2 border-gold-500/60 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400 shadow-md shrink-0 bg-white p-1">
              <Image
                src="/logo.png"
                alt="VR Gold Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight leading-none">
                VR <span className="text-gold-600">GOLD</span> BUYER&apos;S
              </h1>
              <p className="text-[11px] font-bold tracking-widest text-gold-700 uppercase mt-1">
                GOLD RELEASE &amp; RENEWAL · &quot;WE ARE FOR YOU&quot;
              </p>
              <p className="text-[10px] text-gray-600 mt-1 max-w-sm leading-tight">
                D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, KADAPA, AP.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-900 font-mono text-xs font-black">
              VOUCHER: {txn.voucherCode}
            </span>
            <p className="text-[11px] text-gray-500 mt-1.5 font-medium">
              Date: <span className="font-bold text-navy-950">{formattedDate}</span> ({formattedTime})
            </p>
            <p className="text-[11px] text-gray-500 font-medium">
              Kadapa Desk: <span className="font-bold text-navy-950">8978973576</span> / <span className="font-bold text-navy-950">8978977465</span>
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-2 px-4 rounded-xl bg-navy-950 text-white mb-6 flex items-center justify-between">
          <span className="text-xs font-bold text-gold-300">VR GOLD SETTLEMENT VOUCHER</span>
          <span className="text-xs font-extrabold uppercase">
            {txn.type === 'PLEDGED_GOLD_RELEASE' ? 'Pledged Gold Clearance & Payout' : 'Direct Gold Purchase'}
          </span>
          <span className="text-xs text-emerald-400 font-bold">100% AUDITED</span>
        </div>

        {/* Customer & Bank Details Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Customer Information</span>
            <p className="text-sm font-black text-navy-950 mt-0.5">{txn.customerName}</p>
            <p className="text-gray-600 font-semibold mt-0.5">Phone: +91 {txn.customerPhone}</p>
            <p className="text-gray-600 font-semibold">ID Proof: {txn.customerAadhaar}</p>
            <p className="text-gray-600 truncate">{txn.customerAddress}</p>
          </div>

          <div className="border-l border-gray-200 pl-4">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Pledge / Clearance Details</span>
            <p className="text-sm font-black text-navy-950 mt-0.5">{txn.bankOrLender}</p>
            {txn.loanAccountNo && (
              <p className="text-gray-600 font-semibold mt-0.5">Loan Acc: {txn.loanAccountNo}</p>
            )}
            {txn.pledgeSlipNo && (
              <p className="text-gray-600 font-semibold">Pledge Slip: {txn.pledgeSlipNo}</p>
            )}
            <p className="text-gray-600">Verification Officer: {txn.staffName}</p>
          </div>
        </div>

        {/* Ornaments Breakdown Table */}
        <div className="mb-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-2">
            Itemized Ornaments &amp; Purity Valuation
          </h3>
          <div className="overflow-x-auto border border-gray-300 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 border-b border-gray-300 font-bold text-gray-700">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Ornament Description</th>
                  <th className="py-2.5 px-3">Purity</th>
                  <th className="py-2.5 px-3 text-right">Gross Wt (g)</th>
                  <th className="py-2.5 px-3 text-right">Stone/Enamel (g)</th>
                  <th className="py-2.5 px-3 text-right">Net Gold (g)</th>
                  <th className="py-2.5 px-3 text-right">Rate / g</th>
                  <th className="py-2.5 px-3 text-right">Total Valuation (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {txn.items.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td className="py-2 px-3 text-gray-500">{idx + 1}</td>
                    <td className="py-2 px-3 font-bold text-navy-950">{item.name}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-gold-100 text-gold-900 font-black text-[10px]">
                        {item.purityKarat}K
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-medium">{item.grossWeightGrams}</td>
                    <td className="py-2 px-3 text-right text-gray-500">{item.stoneEnamelWeightGrams}</td>
                    <td className="py-2 px-3 text-right font-black text-navy-950">{item.netGoldWeightGrams}</td>
                    <td className="py-2 px-3 text-right text-gray-700">₹{item.ratePerGram.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-black text-navy-950">
                      ₹{item.itemValuation.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gold-50/70 border-t-2 border-gold-300 font-bold text-xs">
                <tr>
                  <td colSpan={3} className="py-2.5 px-3 text-navy-950 font-black">
                    TOTAL GOLD TESTED:
                  </td>
                  <td className="py-2.5 px-3 text-right font-black">{txn.totalGrossWeightGrams}g</td>
                  <td className="py-2.5 px-3 text-right text-gray-500">
                    {(txn.totalGrossWeightGrams - txn.totalNetWeightGrams).toFixed(2)}g
                  </td>
                  <td className="py-2.5 px-3 text-right font-black text-navy-950">{txn.totalNetWeightGrams}g</td>
                  <td className="py-2.5 px-3 text-right text-gray-500">-</td>
                  <td className="py-2.5 px-3 text-right text-navy-950 font-black text-sm">
                    ₹{txn.grossGoldValuation.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Settlement Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 rounded-2xl bg-amber-50/60 border-2 border-gold-300 mb-6">
          <div className="md:col-span-7 space-y-2 text-xs">
            <h4 className="font-black text-navy-950 text-sm uppercase tracking-wide mb-2">
              Financial Clearance Statement
            </h4>
            <div className="flex justify-between text-gray-700">
              <span>Gross Gold Value (Karatmeter verified):</span>
              <span className="font-bold">₹{txn.grossGoldValuation.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-red-700 font-medium">
              <span>Less: Bank Loan Principal Cleared by VR Gold:</span>
              <span className="font-bold">- ₹{txn.bankPrincipalCleared.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-red-700 font-medium">
              <span>Less: Accrued Bank Interest Cleared:</span>
              <span className="font-bold">- ₹{txn.bankInterestCleared.toLocaleString('en-IN')}</span>
            </div>
            {txn.vrGoldServiceFee > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Less: Evaluation &amp; Release Documentation:</span>
                <span className="font-bold">- ₹{txn.vrGoldServiceFee.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-700 pt-2 border-t border-gold-300">
              <span>Disbursement Mode:</span>
              <span className="font-bold uppercase text-navy-950">
                {txn.paymentMethod} ({txn.paymentReference})
              </span>
            </div>
          </div>

          <div className="md:col-span-5 bg-navy-950 text-white rounded-xl p-4 flex flex-col justify-between border border-gold-500/40">
            <div>
              <span className="text-[10px] font-bold text-gold-300 uppercase tracking-widest block">
                NET PAYOUT TO CUSTOMER
              </span>
              <div className="text-3xl font-black text-white mt-1">
                ₹{txn.netPayoutToCustomer.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-gray-300 mt-1 font-medium">
                Paid in full with zero pending liabilities on this pledged gold account.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold pt-2 border-t border-navy-800">
              <span>✓ Full Settlement Handover Complete</span>
            </div>
          </div>
        </div>

        {/* Authorization & Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-300 text-xs">
          <div>
            <div className="h-16 border-b border-dashed border-gray-400"></div>
            <p className="font-black text-navy-950 mt-2">Customer Declaration &amp; Signature</p>
            <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
              I acknowledge receipt of full net surplus cash and confirm the purity testing and bank loan settlement.
            </p>
          </div>

          <div className="text-right">
            <div className="h-16 border-b border-dashed border-gray-400 flex items-end justify-end pb-1">
              <span className="font-mono text-[10px] text-gray-400">AUTHORIZED STAMP &amp; SIGN</span>
            </div>
            <p className="font-black text-navy-950 mt-2">For VR GOLD BUYER&apos;S, Kadapa</p>
            <p className="text-[10px] text-gold-700 font-bold leading-tight mt-0.5">
              Authorized Branch Officer / Managing Desk
            </p>
          </div>
        </div>

        {/* Bottom Small Print */}
        <div className="text-center text-[9px] text-gray-400 mt-8 pt-4 border-t border-gray-100">
          VR GOLD BUYER&apos;S · Kadapa Branch · D.No. 42/1201 Near Y-Junction NGO Colony, Kadapa — 516002 · Helpline: 8978973576
        </div>
      </div>
    </div>
  );
}
