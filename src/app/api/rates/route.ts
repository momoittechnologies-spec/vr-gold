import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const rates = db.getRates();
    return NextResponse.json({ success: true, rates });
  } catch (error) {
    console.error('Error fetching rates:', error);
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { gold24k, gold22k, gold18k, silver, buyingMarginPercent } = body;

    if (!gold24k || !gold22k) {
      return NextResponse.json({ error: 'Valid 24K and 22K rates are required' }, { status: 400 });
    }

    const updated = db.updateRates(
      {
        gold24k: Number(gold24k),
        gold22k: Number(gold22k),
        gold18k: gold18k ? Number(gold18k) : Math.round(Number(gold24k) * 0.75),
        silver: silver ? Number(silver) : 96,
        buyingMarginPercent: buyingMarginPercent !== undefined ? Number(buyingMarginPercent) : 1.5,
      },
      `${session.name} (${session.role})`
    );

    return NextResponse.json({ success: true, rates: updated });
  } catch (error) {
    console.error('Error updating rates:', error);
    return NextResponse.json({ error: 'Failed to update rates' }, { status: 500 });
  }
}
