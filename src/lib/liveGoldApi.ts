/**
 * Live Gold Price API — VR GOLD BUYER'S, Kadapa
 * Uses free public endpoints (no API key required).
 * Falls back gracefully to reasonable defaults.
 */

export interface LiveCityRates {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver: number;
  city: string;
  source: 'live' | 'fallback';
  fetchedAt: string;
}

export interface MultiCityRates {
  mumbai: LiveCityRates;
  hyderabad: LiveCityRates;
  proddatur: LiveCityRates;
  kadapa: LiveCityRates;
  fetchedAt: string;
  source: 'live' | 'fallback';
}

// City spread differentials relative to Mumbai (per gram, 24K)
// Mumbai is the benchmark; other cities are slightly lower due to logistics/local market
const CITY_SPREAD: Record<string, number> = {
  mumbai: 0,
  hyderabad: -10,
  proddatur: -20,
  kadapa: -30,
};

// Reasonable INR fallback defaults (will be used if API fails)
const FALLBACK_24K_MUMBAI = 7520; // ₹ per gram
const FALLBACK_SILVER = 96; // ₹ per gram

function calcRates(base24k: number, spread: number, silver: number, city: string, source: 'live' | 'fallback'): LiveCityRates {
  const g24 = Math.round(base24k + spread);
  const g22 = Math.round(g24 * (22 / 24));
  const g18 = Math.round(g24 * (18 / 24));
  return {
    gold24k: g24,
    gold22k: g22,
    gold18k: g18,
    silver,
    city,
    source,
    fetchedAt: new Date().toISOString(),
  };
}

function buildFallback(): MultiCityRates {
  const base = FALLBACK_24K_MUMBAI;
  const silver = FALLBACK_SILVER;
  const now = new Date().toISOString();
  return {
    mumbai: calcRates(base, CITY_SPREAD.mumbai, silver, 'Mumbai', 'fallback'),
    hyderabad: calcRates(base, CITY_SPREAD.hyderabad, silver, 'Hyderabad', 'fallback'),
    proddatur: calcRates(base, CITY_SPREAD.proddatur, silver, 'Proddatur', 'fallback'),
    kadapa: calcRates(base, CITY_SPREAD.kadapa, silver, 'Kadapa', 'fallback'),
    fetchedAt: now,
    source: 'fallback',
  };
}

/**
 * Fetch live XAU/USD price and USD/INR exchange rate from free public APIs.
 * Primary: Frankfurter (ECB data, free, no key)
 * Fallback: hardcoded reasonable default
 */
export async function fetchLiveMultiCityRates(): Promise<MultiCityRates> {
  try {
    // Fetch USD/INR from Frankfurter (European Central Bank data — free, no key)
    const fxRes = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR', {
      next: { revalidate: 900 }, // Cache for 15 minutes
      signal: AbortSignal.timeout(6000),
    });

    if (!fxRes.ok) throw new Error(`FX fetch failed: ${fxRes.status}`);
    const fxData = await fxRes.json();
    const usdInr: number = fxData?.rates?.INR;
    if (!usdInr || usdInr < 60 || usdInr > 120) throw new Error('Invalid USD/INR rate');

    // Fetch XAU/USD (gold per troy oz in USD) from metals-api free tier or goldapi free
    // Using open metals price from a public data source (no key needed)
    // Gold: ~1 troy oz = 31.1035 grams
    // We use a known-good free alternative: fetch from metals.live public CDN
    const goldRes = await fetch('https://api.metals.live/v1/spot', {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(6000),
    });

    let xauUsd: number | null = null;
    let silverUsd: number | null = null;

    if (goldRes.ok) {
      const goldData = await goldRes.json();
      // metals.live returns array of { gold: number, silver: number, ... }
      if (Array.isArray(goldData) && goldData.length > 0) {
        xauUsd = goldData[0]?.gold ?? null;
        silverUsd = goldData[0]?.silver ?? null;
      } else if (goldData?.gold) {
        xauUsd = goldData.gold;
        silverUsd = goldData.silver ?? null;
      }
    }

    if (!xauUsd || xauUsd < 1500 || xauUsd > 5000) {
      throw new Error(`Invalid XAU/USD: ${xauUsd}`);
    }

    // Convert to INR per gram
    const TROY_OZ_TO_GRAMS = 31.1035;
    const base24kMumbai = Math.round((xauUsd / TROY_OZ_TO_GRAMS) * usdInr);
    const silverPerGram = silverUsd ? Math.round((silverUsd / TROY_OZ_TO_GRAMS) * usdInr) : FALLBACK_SILVER;

    // Apply 2% making/import duty premium for Indian retail market (Mumbai benchmark)
    const mumbaiBase = Math.round(base24kMumbai * 1.02);

    return {
      mumbai: calcRates(mumbaiBase, CITY_SPREAD.mumbai, silverPerGram, 'Mumbai', 'live'),
      hyderabad: calcRates(mumbaiBase, CITY_SPREAD.hyderabad, silverPerGram, 'Hyderabad', 'live'),
      proddatur: calcRates(mumbaiBase, CITY_SPREAD.proddatur, silverPerGram, 'Proddatur', 'live'),
      kadapa: calcRates(mumbaiBase, CITY_SPREAD.kadapa, silverPerGram, 'Kadapa', 'live'),
      fetchedAt: new Date().toISOString(),
      source: 'live',
    };
  } catch (err) {
    console.warn('[VR Gold] Live gold API failed, using fallback rates:', err instanceof Error ? err.message : err);
    return buildFallback();
  }
}
