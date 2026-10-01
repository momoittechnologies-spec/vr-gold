import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const voucherQuery = searchParams.get('voucher') || searchParams.get('id');

    // Public lookup for voucher or tracking
    if (voucherQuery) {
      const txn = db.getTransactionByVoucherOrId(voucherQuery);
      if (!txn) {
        return NextResponse.json({ found: false, message: 'Voucher or transaction record not found' }, { status: 404 });
      }
      return NextResponse.json({ found: true, transaction: txn });
    }

    // Full CRM transaction list requires authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const transactions = db.getTransactions();
    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    console.error('Error in transactions GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerAadhaar,
      customerAddress,
      bankOrLender,
      loanAccountNo,
      pledgeSlipNo,
      type,
      items,
      bankPrincipalCleared,
      bankInterestCleared,
      vrGoldServiceFee,
      paymentMethod,
      paymentReference,
      notes,
    } = body;

    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Customer name, phone, and at least one item are required' }, { status: 400 });
    }

    const totalGrossWeightGrams = items.reduce((acc: number, item: { grossWeightGrams?: number }) => acc + (Number(item.grossWeightGrams) || 0), 0);
    const totalNetWeightGrams = items.reduce((acc: number, item: { netGoldWeightGrams?: number }) => acc + (Number(item.netGoldWeightGrams) || 0), 0);
    const grossGoldValuation = items.reduce((acc: number, item: { itemValuation?: number }) => acc + (Number(item.itemValuation) || 0), 0);

    const principal = Number(bankPrincipalCleared) || 0;
    const interest = Number(bankInterestCleared) || 0;
    const bankTotalSettlement = principal + interest;
    const serviceFee = Number(vrGoldServiceFee) || 0;
    const netPayoutToCustomer = Math.max(0, grossGoldValuation - bankTotalSettlement - serviceFee);

    const newTxn = db.createTransaction({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAadhaar: customerAadhaar || 'Verified (Physical ID)',
      customerAddress: customerAddress || 'Kadapa, AP',
      bankOrLender: bankOrLender || 'Direct Valuation',
      loanAccountNo: loanAccountNo || '',
      pledgeSlipNo: pledgeSlipNo || '',
      type: type || 'PLEDGED_GOLD_RELEASE',
      items,
      totalGrossWeightGrams: Math.round(totalGrossWeightGrams * 100) / 100,
      totalNetWeightGrams: Math.round(totalNetWeightGrams * 100) / 100,
      grossGoldValuation: Math.round(grossGoldValuation),
      bankPrincipalCleared: principal,
      bankInterestCleared: interest,
      bankTotalSettlement,
      vrGoldServiceFee: serviceFee,
      netPayoutToCustomer: Math.round(netPayoutToCustomer),
      paymentMethod: paymentMethod || 'IMPS_RTGS',
      paymentReference: paymentReference || `IMPS-${Date.now().toString().slice(-8)}`,
      status: 'SETTLEMENT_COMPLETED',
      staffName: `${session.name} (${session.role})`,
      notes: notes || '',
      completedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Transaction successfully processed and voucher generated',
      transaction: newTxn,
      voucherCode: newTxn.voucherCode,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
