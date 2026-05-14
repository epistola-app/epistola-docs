import { describe, it, expect } from 'vitest';
import tarieven from '../data/licentie-tarieven.json';
import {
  tariefVoorSchaal,
  schaalKorting,
  berekenStichtingJaar,
  simulateStichting,
  berekenBVJaar,
  simulateBV,
  berekenMijlpalen,
  berekenVoordelen,
  CERT_PER_SUPPLIER_PER_JAAR,
  MAX_BV_FTE,
  JAREN,
  type Tarieven,
  type StichtingInputs,
  type BVInputs,
} from './financiele-simulatie';

const tarievenTyped = tarieven as Tarieven;

const stichtingDefaults: StichtingInputs = {
  startGemeenten: 5,
  gemeenteGroei: 8,
  schaalId: 'mid',
  startSuppliers: 3,
  supplierGroei: 1,
  startSaasAanbieders: 1,
  saasGroei: 1,
  perDocBudgetPerSaas: 25_000,
  onderhoudsbudget: 250_000,
  features: 50_000,
  admin: 25_000,
  investering: 100_000,
};

const bvDefaults: BVInputs = {
  aandeelOnderhoud: 1.0,
  aandeelFeatures: 1.0,
  aandeelGemeenten: 0.4,
  bvOmzetPerGemeente: 15_000,
  fteKosten: 100_000,
  overhead: 1.3,
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

describe('tariefVoorSchaal', () => {
  it('geeft het tarief voor een bestaande schaal', () => {
    expect(tariefVoorSchaal(tarievenTyped, 'mid')).toBe(4500);
    expect(tariefVoorSchaal(tarievenTyped, 'micro')).toBe(800);
    expect(tariefVoorSchaal(tarievenTyped, 'xl')).toBe(20_000);
  });

  it('geeft 0 voor een onbekende schaal', () => {
    expect(tariefVoorSchaal(tarievenTyped, 'onbekend')).toBe(0);
  });
});

describe('schaalKorting', () => {
  it('is 0 onder de eerste drempel (10 gemeenten)', () => {
    expect(schaalKorting(tarievenTyped, 5)).toBe(0);
    expect(schaalKorting(tarievenTyped, 9)).toBe(0);
  });
  it('is 5% vanaf 10 gemeenten', () => {
    expect(schaalKorting(tarievenTyped, 10)).toBe(0.05);
    expect(schaalKorting(tarievenTyped, 19)).toBe(0.05);
  });
  it('is 10% vanaf 20 gemeenten', () => {
    expect(schaalKorting(tarievenTyped, 20)).toBe(0.1);
  });
  it('is 15% vanaf 35 gemeenten', () => {
    expect(schaalKorting(tarievenTyped, 35)).toBe(0.15);
  });
});

// ----------------------------------------------------------------------------
// Stichting
// ----------------------------------------------------------------------------

describe('berekenStichtingJaar — defaults jaar 1', () => {
  const tarief = tariefVoorSchaal(tarievenTyped, 'mid'); // 4500
  const r = berekenStichtingJaar(1, stichtingDefaults, tarief, 0);

  it('telt gemeenten, suppliers en SaaS in jaar 1', () => {
    expect(r.gemeenten).toBe(5);
    expect(r.suppliers).toBe(3);
    expect(r.saasAanbieders).toBe(1);
  });

  it('licentie = gemeenten × tarief × (1 − korting)', () => {
    expect(r.licentieInkomsten).toBe(5 * 4500);
  });

  it('certificering = suppliers × €1.000', () => {
    expect(r.certInkomsten).toBe(3 * CERT_PER_SUPPLIER_PER_JAAR);
  });

  it('per-doc = SaaS-aanbieders × budget/aanbieder', () => {
    expect(r.perDocInkomsten).toBe(1 * 25_000);
  });

  it('totaalInkomsten somt de drie stromen', () => {
    expect(r.totaalInkomsten).toBe(22_500 + 3_000 + 25_000);
  });

  it('uitgaven volgen rechtstreeks uit inputs', () => {
    expect(r.onderhoudsbudget).toBe(250_000);
    expect(r.featureBudget).toBe(50_000);
    expect(r.adminKosten).toBe(25_000);
    expect(r.stichtingKosten).toBe(325_000);
  });

  it('stichting-resultaat = inkomsten − uitgaven', () => {
    expect(r.stichtingResultaat).toBe(50_500 - 325_000);
  });
});

describe('simulateStichting — ecosysteem-groei', () => {
  it('suppliers en SaaS groeien lineair per jaar', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    expect(result.rows[0].suppliers).toBe(3);
    expect(result.rows[4].suppliers).toBe(3 + 4 * 1); // 7
    expect(result.rows[0].saasAanbieders).toBe(1);
    expect(result.rows[4].saasAanbieders).toBe(1 + 4 * 1); // 5
  });

  it('certificeringsinkomsten schalen mee met suppliers', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    expect(result.rows[4].certInkomsten).toBe(7 * CERT_PER_SUPPLIER_PER_JAAR);
  });

  it('per-doc inkomsten schalen mee met SaaS-aanbieders', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    expect(result.rows[4].perDocInkomsten).toBe(5 * 25_000);
  });

  it('licentie past schaalkorting toe vanaf juiste jaar', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    expect(result.rows[0].licentieInkomsten).toBe(5 * 4500);
    expect(result.rows[1].licentieInkomsten).toBe(Math.round(13 * 4500 * 0.95));
    expect(result.rows[2].licentieInkomsten).toBe(Math.round(21 * 4500 * 0.9));
    expect(result.rows[4].licentieInkomsten).toBe(Math.round(37 * 4500 * 0.85));
  });

  it('cumulatief bouwt op vanaf de investering', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    expect(result.rows[0].cumulatief).toBe(
      stichtingDefaults.investering + result.rows[0].stichtingResultaat,
    );
    expect(result.rows[1].cumulatief).toBe(
      result.rows[0].cumulatief + result.rows[1].stichtingResultaat,
    );
  });

  it('rapporteert de investering ongewijzigd', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    expect(result.investering).toBe(stichtingDefaults.investering);
  });

  it('levert precies JAREN (5) rijen', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    expect(result.rows.length).toBe(JAREN);
  });
});

describe('simulateStichting — edge cases', () => {
  it('werkt met 0 ecosysteem-groei (statisch model)', () => {
    const inputs: StichtingInputs = {
      ...stichtingDefaults,
      supplierGroei: 0,
      saasGroei: 0,
      gemeenteGroei: 0,
    };
    const result = simulateStichting(inputs, tarievenTyped);
    for (const row of result.rows) {
      expect(row.suppliers).toBe(stichtingDefaults.startSuppliers);
      expect(row.saasAanbieders).toBe(stichtingDefaults.startSaasAanbieders);
      expect(row.gemeenten).toBe(stichtingDefaults.startGemeenten);
    }
  });

  it('werkt met onbekende schaal-id (tarief = 0)', () => {
    const inputs: StichtingInputs = { ...stichtingDefaults, schaalId: 'onbestaande' };
    const result = simulateStichting(inputs, tarievenTyped);
    expect(result.rows[0].licentieInkomsten).toBe(0);
  });

  it('werkt met 0 budgetten (admin-only stichting)', () => {
    const inputs: StichtingInputs = {
      ...stichtingDefaults,
      onderhoudsbudget: 0,
      features: 0,
    };
    const result = simulateStichting(inputs, tarievenTyped);
    expect(result.rows[0].stichtingKosten).toBe(25_000);
  });
});

// ----------------------------------------------------------------------------
// BV
// ----------------------------------------------------------------------------

describe('berekenBVJaar — afhankelijkheid van stichting', () => {
  it('BV ontvangt onderhoud + features × aandelen + gemeente-omzet', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const sr = stichtingResult.rows[0];
    const r = berekenBVJaar(sr, bvDefaults);

    expect(r.vanStichtingOnderhoud).toBe(250_000 * 1.0);
    expect(r.vanStichtingFeatures).toBe(50_000 * 1.0);
    expect(r.vanStichting).toBe(300_000);
    expect(r.vanGemeenten).toBe(5 * 0.4 * 15_000); // 30.000
    expect(r.bvInkomsten).toBe(300_000 + 30_000);
  });

  it('FTE volgt uit beschikbaar budget / (fteKosten × overhead)', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const r = berekenBVJaar(stichtingResult.rows[0], bvDefaults);
    // Budget 330k / (100k × 1.3 = 130k) = 2.54 → 3
    expect(r.fte).toBe(3);
  });

  it('FTE is gecapt op MAX_BV_FTE', () => {
    const bigInputs: StichtingInputs = {
      ...stichtingDefaults,
      onderhoudsbudget: 5_000_000,
    };
    const stichtingResult = simulateStichting(bigInputs, tarievenTyped);
    const r = berekenBVJaar(stichtingResult.rows[0], bvDefaults);
    expect(r.fte).toBe(MAX_BV_FTE);
  });

  it('aandeelOnderhoud van 0 sluit BV uit van platform-werk', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const r = berekenBVJaar(stichtingResult.rows[0], {
      ...bvDefaults,
      aandeelOnderhoud: 0,
      aandeelFeatures: 0,
    });
    expect(r.vanStichting).toBe(0);
    // BV moet alleen draaien op gemeente-diensten
    expect(r.bvInkomsten).toBe(r.vanGemeenten);
  });

  it('hoger aandeelGemeenten verhoogt BV-inkomsten en FTE', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const laag = berekenBVJaar(stichtingResult.rows[4], {
      ...bvDefaults,
      aandeelGemeenten: 0.2,
    });
    const hoog = berekenBVJaar(stichtingResult.rows[4], {
      ...bvDefaults,
      aandeelGemeenten: 0.8,
    });
    expect(hoog.bvInkomsten).toBeGreaterThan(laag.bvInkomsten);
    expect(hoog.fte).toBeGreaterThanOrEqual(laag.fte);
  });
});

describe('simulateBV — pipeline met stichting', () => {
  it('levert evenveel rijen als de stichting', () => {
    const stichting = simulateStichting(stichtingDefaults, tarievenTyped);
    const bv = simulateBV(stichting, bvDefaults);
    expect(bv.rows.length).toBe(stichting.rows.length);
  });

  it('cost-plus benadering: bv resultaat is normaal beperkt', () => {
    const stichting = simulateStichting(stichtingDefaults, tarievenTyped);
    const bv = simulateBV(stichting, bvDefaults);
    for (const r of bv.rows) {
      // Bij geen cap is afwijking < kostenPerFte (afrondingsverschil)
      const kostenPerFte = bvDefaults.fteKosten * bvDefaults.overhead;
      if (r.fte < MAX_BV_FTE) {
        expect(Math.abs(r.bvResultaat)).toBeLessThan(kostenPerFte);
      }
    }
  });
});

// ----------------------------------------------------------------------------
// Mijlpalen + voordelen
// ----------------------------------------------------------------------------

describe('berekenMijlpalen', () => {
  it('detecteert break-even bij voldoende ecosysteem-groei', () => {
    const inputs: StichtingInputs = {
      ...stichtingDefaults,
      schaalId: 'xl',
      startGemeenten: 50,
      gemeenteGroei: 10,
      startSuppliers: 10,
      supplierGroei: 2,
      onderhoudsbudget: 100_000,
      features: 0,
    };
    const result = simulateStichting(inputs, tarievenTyped);
    const mp = berekenMijlpalen(result);
    expect(mp.operationeleBreakEvenJaar).toBe(1);
  });

  it('geeft null als geen break-even binnen JAREN', () => {
    const inputs: StichtingInputs = {
      ...stichtingDefaults,
      onderhoudsbudget: 5_000_000,
    };
    const result = simulateStichting(inputs, tarievenTyped);
    const mp = berekenMijlpalen(result);
    expect(mp.operationeleBreakEvenJaar).toBeNull();
  });
});

describe('berekenVoordelen', () => {
  it('telt feature- en onderhoudsbudget over 5 jaar bij elkaar', () => {
    const stichting = simulateStichting(stichtingDefaults, tarievenTyped);
    const v = berekenVoordelen(stichting);
    expect(v.totaalFeatureBudget).toBe(50_000 * JAREN);
    expect(v.totaalOnderhoudsbudget).toBe(250_000 * JAREN);
  });

  it('rapporteert ecosysteem-tellers aan het einde', () => {
    const stichting = simulateStichting(stichtingDefaults, tarievenTyped);
    const v = berekenVoordelen(stichting);
    expect(v.suppliersOpHetEinde).toBe(7);
    expect(v.saasOpHetEinde).toBe(5);
    expect(v.gemeentenOpHetEinde).toBe(37);
  });

  it('overschot = eindstand cumulatief − investering', () => {
    const stichting = simulateStichting(stichtingDefaults, tarievenTyped);
    const v = berekenVoordelen(stichting);
    const laatste = stichting.rows[stichting.rows.length - 1];
    expect(v.overschotVoorReserveEnOss).toBe(laatste.cumulatief - stichting.investering);
  });
});
