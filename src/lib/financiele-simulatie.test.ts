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
  MIN_BV_FTE,
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
  contractduur: 4,
  startSuppliers: 3,
  supplierGroei: 1,
  startSaasAanbieders: 1,
  saasGroei: 1,
  tariefPerDoc: 0.1,
  docsPerSaasAanbieder: 250_000,
  onderhoudsbudget: 250_000,
  features: 50_000,
  admin: 25_000,
  investering: 100_000,
};

const bvDefaults: BVInputs = {
  aandeelOnderhoud: 1.0,
  aandeelFeatures: 1.0,
  bvStartGemeenten: 2,
  bvGroeiPercentage: 0.5,
  bvOmzetPerGemeente: 15_000,
  fteKosten: 100_000,
  overhead: 1.3,
  klantenPerFte: 7,
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

  it('jaar 1: alle 5 start-gemeenten betalen, contractduur 4 vooruit', () => {
    expect(r.nieuweGemeenten).toBe(5);
    expect(r.betalendeGemeenten).toBe(5);
  });

  it('licentie = betalende gemeenten × contractduur × tarief × (1 − korting)', () => {
    // 5 betalend × 4 jaar vooruit × €4.500 × (1 − 0)
    expect(r.licentieInkomsten).toBe(5 * 4 * 4500);
  });

  it('certificering = suppliers × €1.000', () => {
    expect(r.certInkomsten).toBe(3 * CERT_PER_SUPPLIER_PER_JAAR);
  });

  it('per-doc = SaaS-aanbieders × docs/aanbieder × tarief', () => {
    expect(r.perDocInkomsten).toBe(1 * 250_000 * 0.1);
  });

  it('totaalInkomsten somt de drie stromen', () => {
    expect(r.totaalInkomsten).toBe(90_000 + 3_000 + 25_000);
  });

  it('uitgaven volgen rechtstreeks uit inputs', () => {
    expect(r.onderhoudsbudget).toBe(250_000);
    expect(r.featureBudget).toBe(50_000);
    expect(r.adminKosten).toBe(25_000);
    expect(r.stichtingKosten).toBe(325_000);
  });

  it('stichting-resultaat = inkomsten − uitgaven', () => {
    expect(r.stichtingResultaat).toBe(118_000 - 325_000);
  });
});

describe('betalendeGemeenten — cohort & renewal-logica', () => {
  it('jaar 1 = alle start-gemeenten', () => {
    const r = berekenStichtingJaar(1, stichtingDefaults, 4500, 0);
    expect(r.betalendeGemeenten).toBe(5);
  });

  it('jaar 2–4: alleen de nieuwe cohort betaalt (eerdere zitten in 4-jaars contract)', () => {
    const r2 = berekenStichtingJaar(2, stichtingDefaults, 4500, 0);
    const r3 = berekenStichtingJaar(3, stichtingDefaults, 4500, 0);
    const r4 = berekenStichtingJaar(4, stichtingDefaults, 4500, 0);
    expect(r2.betalendeGemeenten).toBe(8);
    expect(r3.betalendeGemeenten).toBe(8);
    expect(r4.betalendeGemeenten).toBe(8);
  });

  it('jaar 5: nieuwe cohort + renewal van de jaar-1-cohort', () => {
    const r5 = berekenStichtingJaar(5, stichtingDefaults, 4500, 0);
    // nieuw cohort jaar 5 = 8, renewal cohort jaar 1 = 5
    expect(r5.betalendeGemeenten).toBe(13);
  });

  it('contractduur 1 reduceert tot het jaarlijkse model (iedereen betaalt elk jaar)', () => {
    const jaarlijks: StichtingInputs = { ...stichtingDefaults, contractduur: 1 };
    const r3 = berekenStichtingJaar(3, jaarlijks, 4500, 0);
    // jaar 3 actief = 5 + 2×8 = 21; iedereen betaalt → betalend = 21
    expect(r3.betalendeGemeenten).toBe(21);
    expect(r3.gemeenten).toBe(21);
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
    expect(result.rows[4].perDocInkomsten).toBe(5 * 250_000 * 0.1);
  });

  it('licentie past schaalkorting toe op basis van actieve gemeenten, met 4-jaars vooruitbetaling', () => {
    const result = simulateStichting(stichtingDefaults, tarievenTyped);
    // betalend × 4 (contractduur) × tarief × (1−korting op actief aantal)
    // J1: betalend 5, actief 5  → 0%
    expect(result.rows[0].licentieInkomsten).toBe(Math.round(5 * 4 * 4500 * 1.0));
    // J2: betalend 8, actief 13 → 5%
    expect(result.rows[1].licentieInkomsten).toBe(Math.round(8 * 4 * 4500 * 0.95));
    // J3: betalend 8, actief 21 → 10%
    expect(result.rows[2].licentieInkomsten).toBe(Math.round(8 * 4 * 4500 * 0.9));
    // J5: betalend 13 (8 nieuw + 5 renewal), actief 37 → 15%
    expect(result.rows[4].licentieInkomsten).toBe(Math.round(13 * 4 * 4500 * 0.85));
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

    expect(r.vanStichtingOnderhoud).toBe(stichtingDefaults.onderhoudsbudget * 1.0);
    expect(r.vanStichtingFeatures).toBe(stichtingDefaults.features * 1.0);
    expect(r.vanStichting).toBe(
      stichtingDefaults.onderhoudsbudget + stichtingDefaults.features,
    );
    // bvStart=2, totaal=5 → 2 BV-klanten × €15k
    expect(r.bvGemeenten).toBe(2);
    expect(r.vanGemeenten).toBe(2 * 15_000);
  });

  it('BV-gemeenten worden gecapt op het totale aantal stichting-gemeenten', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    // Forceer BV groter dan markt: 100 klanten in jaar 1 maar maar 3 gemeenten totaal
    const r = berekenBVJaar(stichtingResult.rows[0], {
      ...bvDefaults,
      bvStartGemeenten: 100,
      bvGroeiPercentage: 0,
    });
    expect(r.bvGemeenten).toBe(stichtingResult.rows[0].gemeenten);
  });

  it('BV-gemeenten groeit compound tot aan markt-cap', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const j1 = berekenBVJaar(stichtingResult.rows[0], bvDefaults);
    const j5 = berekenBVJaar(stichtingResult.rows[4], bvDefaults);
    // jaar 1: 2 × 1.5^0 = 2; jaar 5: round(2 × 1.5^4) = round(10.125) = 10
    expect(j1.bvGemeenten).toBe(2);
    expect(j5.bvGemeenten).toBe(10);
  });

  it('FTE = max(budget-FTE, demand-FTE), gecapt op MAX_BV_FTE', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const r = berekenBVJaar(stichtingResult.rows[0], bvDefaults);
    // bvInkomsten = 100k (onderhoud) + 100k (features in defaults) + 2 × 15k = 230k
    // budgetFte = floor(230k / 130k) = 1
    // demandFte = max(MIN_BV_FTE=2, ceil(2 / 7) = 1) = 2
    // → fte = max(1, 2) = 2
    expect(r.demandFte).toBe(2);
    expect(r.fte).toBe(2);
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

  it('FTE-minimum is MIN_BV_FTE ook bij heel weinig klanten', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const r = berekenBVJaar(stichtingResult.rows[0], {
      ...bvDefaults,
      bvStartGemeenten: 0,
      bvGroeiPercentage: 0,
    });
    expect(r.demandFte).toBe(MIN_BV_FTE);
    expect(r.fte).toBeGreaterThanOrEqual(MIN_BV_FTE);
  });

  it('Demand-FTE schaalt met klantenbasis (35 klanten / 7 per FTE = 5)', () => {
    // Forceer 35 BV-klanten in jaar 5
    const stichtingResult = simulateStichting(
      { ...stichtingDefaults, gemeenteGroei: 8 },
      tarievenTyped,
    );
    const r = berekenBVJaar(stichtingResult.rows[4], {
      ...bvDefaults,
      bvStartGemeenten: 35,
      bvGroeiPercentage: 0,
    });
    expect(r.demandFte).toBe(5);
  });

  it('BV-resultaat kan negatief zijn als demand-FTE budget overstijgt', () => {
    // Maak demand veel groter dan budget: veel klanten, weinig omzet en budget
    const inputs: StichtingInputs = {
      ...stichtingDefaults,
      onderhoudsbudget: 0,
      features: 0,
      startGemeenten: 20,
      gemeenteGroei: 0,
    };
    const stichtingResult = simulateStichting(inputs, tarievenTyped);
    const r = berekenBVJaar(stichtingResult.rows[0], {
      ...bvDefaults,
      bvStartGemeenten: 20,
      bvGroeiPercentage: 0,
      bvOmzetPerGemeente: 5_000, // bewust te laag
    });
    expect(r.demandFte).toBeGreaterThan(r.budgetFte);
    expect(r.bvResultaat).toBeLessThan(0);
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

  it('meer BV-gemeenten verhoogt BV-inkomsten en FTE', () => {
    const stichtingResult = simulateStichting(stichtingDefaults, tarievenTyped);
    const klein = berekenBVJaar(stichtingResult.rows[4], {
      ...bvDefaults,
      bvStartGemeenten: 2,
      bvGroeiPercentage: 0,
    });
    const groot = berekenBVJaar(stichtingResult.rows[4], {
      ...bvDefaults,
      bvStartGemeenten: 20,
      bvGroeiPercentage: 0,
    });
    expect(groot.bvInkomsten).toBeGreaterThan(klein.bvInkomsten);
    expect(groot.fte).toBeGreaterThanOrEqual(klein.fte);
  });
});

describe('simulateBV — pipeline met stichting', () => {
  it('levert evenveel rijen als de stichting', () => {
    const stichting = simulateStichting(stichtingDefaults, tarievenTyped);
    const bv = simulateBV(stichting, bvDefaults);
    expect(bv.rows.length).toBe(stichting.rows.length);
  });

  it('Wanneer budget de operationele behoefte dekt, ligt resultaat in cost-plus marge', () => {
    // Royaal scenario: budget veel hoger dan demand
    const ruimInputs: StichtingInputs = {
      ...stichtingDefaults,
      onderhoudsbudget: 1_000_000,
      features: 500_000,
    };
    const stichting = simulateStichting(ruimInputs, tarievenTyped);
    const bv = simulateBV(stichting, bvDefaults);
    const kostenPerFte = bvDefaults.fteKosten * bvDefaults.overhead;
    for (const r of bv.rows) {
      if (r.fte < MAX_BV_FTE) {
        expect(r.bvResultaat).toBeGreaterThanOrEqual(0);
        expect(r.bvResultaat).toBeLessThan(kostenPerFte);
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
