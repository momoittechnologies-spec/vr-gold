import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { fetchLiveMultiCityRates } from '@/lib/liveGoldApi';

export async function GET() {
  try {
    const rates = db.getRates();

    // Try to enrich with live multi-city rates
    // If autoSyncLiveApi is not explicitly false, fetch live rates
    const shouldAutoSync = rates.autoSyncLiveApi !== false;

    if (shouldAutoSync) {
      try {
        const liveRates = await fetchLiveMultiCityRates();

        // If admin hasn't manually set city rates, use live API values
        const enrichedRates = {
          ...rates,
          // Kadapa rate: use admin-set or derive from live API
          gold24k: rates.gold24k || liveRates.kadapa.gold24k,
          gold22k: rates.gold22k || liveRates.kadapa.gold22k,
          gold18k: rates.gold18k || liveRates.kadapa.gold18k,
          silver: rates.silver || liveRates.kadapa.silver,
          // Multi-city rates from live API (admin rates take priority if set)
          mumbai24k: rates.mumbai24k || liveRates.mumbai.gold24k,
          mumbai22k: rates.mumbai22k || liveRates.mumbai.gold22k,
          hyderabad24k: rates.hyderabad24k || liveRates.hyderabad.gold24k,
          hyderabad22k: rates.hyderabad22k || liveRates.hyderabad.gold22k,
          proddatur24k: rates.proddatur24k || liveRates.proddatur.gold24k,
          proddatur22k: rates.proddatur22k || liveRates.proddatur.gold22k,
          liveApiSource: liveRates.source,
          liveApiSyncedAt: liveRates.fetchedAt,
        };

        return NextResponse.json({ success: true, rates: enrichedRates });
      } catch {
        // API enrichment failed — return stored rates as-is
      }
    }

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
    const {
      gold24k, gold22k, gold18k, silver, buyingMarginPercent,
      mumbai24k, mumbai22k, hyderabad24k, hyderabad22k, proddatur24k, proddatur22k,
      autoSyncLiveApi,
    } = body;

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
        // Multi-city overrides (optional — if not provided, live API values will be used)
        ...(mumbai24k !== undefined && { mumbai24k: Number(mumbai24k) }),
        ...(mumbai22k !== undefined && { mumbai22k: Number(mumbai22k) }),
        ...(hyderabad24k !== undefined && { hyderabad24k: Number(hyderabad24k) }),
        ...(hyderabad22k !== undefined && { hyderabad22k: Number(hyderabad22k) }),
        ...(proddatur24k !== undefined && { proddatur24k: Number(proddatur24k) }),
        ...(proddatur22k !== undefined && { proddatur22k: Number(proddatur22k) }),
        ...(autoSyncLiveApi !== undefined && { autoSyncLiveApi: Boolean(autoSyncLiveApi) }),
      },
      `${session.name} (${session.role})`
    );

    return NextResponse.json({ success: true, rates: updated });
  } catch (error) {
    console.error('Error updating rates:', error);
    return NextResponse.json({ error: 'Failed to update rates' }, { status: 500 });
  }
}
