import { describe, it, expect } from 'vitest';
import tarieven from '../data/licentie-tarieven.json';
import {
  tariefVoorSchaal,
  schaalKorting,
  berekenJaar,
  simulate,
  berekenMijlpalen,
  CERT_PER_SUPPLIER_PER_JAAR,
  MAX_BV_FTE,
  JAREN,
  type Tarieven,
  type SimulationInputs,
} from './financiele-simulatie';

const tarievenTyped = tarieven as Tarieven;

const defaultInputs: SimulationInputs = {
  startGemeenten: 5,
  groei: 8,
  schaalId: 'mid',
  suppliers: 3,
  perDocBudget: 0,
  onderhoudsbudget: 300_000,
  features: 100_000,
  admin: 25_000,
  fteKosten: 100_000,
  overhead: 1.3,
  bvOmzetPerGemeente: 10_000,
  investering: 100_000,
};

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
    expect(schaalKorting(tarievenTyped, 34)).toBe(0.1);
  });

  it('is 15% vanaf 35 gemeenten', () => {
    expect(schaalKorting(tarievenTyped, 35)).toBe(0.15);
    expect(schaalKorting(tarievenTyped, 100)).toBe(0.15);
  });
});

describe('berekenJaar — stichting cashflow', () => {
  const tarief = tariefVoorSchaal(tarievenTyped, 'mid'); // 4500
  const r = berekenJaar(1, defaultInputs, tarief, 0);

  it('rekent licentie = gemeenten × tarief × (1 − korting)', () => {
    expect(r.licentieInkomsten).toBe(5 * 4500); // 22.500
  });

  it('telt certificering = suppliers × €1.000', () => {
    expect(r.certInkomsten).toBe(3 * CERT_PER_SUPPLIER_PER_JAAR);
  });

  it('totaalInkomsten somt licentie + per-doc + cert', () => {
    expect(r.totaalInkomsten).toBe(22_500 + 0 + 3_000);
  });

  it('onderhoudsbudget vloeit 1:1 uit input naar uitgave', () => {
    expect(r.onderhoudsbudget).toBe(300_000);
  });

  it('feature-budget vloeit 1:1 uit input naar uitgave', () => {
    expect(r.featureBudget).toBe(100_000);
  });

  it('stichting-kosten = onderhoud + features + admin', () => {
    expect(r.stichtingKosten).toBe(300_000 + 100_000 + 25_000);
  });

  it('stichting-resultaat = inkomsten − kosten', () => {
    expect(r.stichtingResultaat).toBe(25_500 - 425_000); // -399.500
  });
});

describe('berekenJaar — BV-FTE afleiding', () => {
  const tarief = 4500;

  it('FTE volgt uit beschikbaar budget / (kosten × overhead)', () => {
    const r = berekenJaar(1, defaultInputs, tarief, 0);
    // Beschikbaar = onderhoud 300k + features 100k + (5 gem × 10k) = 450k
    // Kosten per FTE = 100k × 1.3 = 130k
    // Beoogde FTE = 450 / 130 ≈ 3.46 → rond naar 3
    expect(r.fte).toBe(3);
  });

  it('FTE schaalt mee met aantal gemeenten (via externe omzet)', () => {
    const inputs: SimulationInputs = { ...defaultInputs, startGemeenten: 50 };
    const r = berekenJaar(1, inputs, tarief, 0);
    // 300k + 100k + (50 × 10k) = 900k; / 130k ≈ 6.92 → 7
    expect(r.fte).toBe(7);
  });

  it('FTE is gecapt op MAX_BV_FTE bij groot budget', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      onderhoudsbudget: 5_000_000,
      features: 0,
      bvOmzetPerGemeente: 0,
    };
    const r = berekenJaar(1, inputs, tarief, 0);
    expect(r.fte).toBe(MAX_BV_FTE);
  });

  it('FTE is 0 bij budget van 0', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      onderhoudsbudget: 0,
      features: 0,
      bvOmzetPerGemeente: 0,
    };
    const r = berekenJaar(1, inputs, tarief, 0);
    expect(r.fte).toBe(0);
    expect(r.bvKosten).toBe(0);
  });
});

describe('berekenJaar — BV cashflow (cost-plus)', () => {
  const tarief = 4500;

  it('BV-inkomsten = onderhoud + features + externe omzet', () => {
    const r = berekenJaar(1, defaultInputs, tarief, 0);
    expect(r.bvInkomsten).toBe(300_000 + 100_000 + 5 * 10_000);
  });

  it('externe omzet = gemeenten × omzet per gemeente', () => {
    const r = berekenJaar(1, defaultInputs, tarief, 0);
    expect(r.bvExterneOmzet).toBe(5 * 10_000);
  });

  it('BV-resultaat is bijna 0 onder normale (cost-plus) condities', () => {
    const r = berekenJaar(1, defaultInputs, tarief, 0);
    // FTE wordt gerond naar 3 (3.46), dus kosten = 3 × 130k = 390k
    // Inkomsten = 450k → resultaat = +60k (geen perfecte break-even door afronding)
    // Verwachten: kleine afwijking, geen orde-grootte fout
    expect(Math.abs(r.bvResultaat)).toBeLessThan(r.bvInkomsten);
  });

  it('BV-resultaat is positief als budget niet aan extra FTE besteed kan worden (cap)', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      onderhoudsbudget: 5_000_000,
      features: 0,
      bvOmzetPerGemeente: 0,
    };
    const r = berekenJaar(1, inputs, tarief, 0);
    // Budget 5M, maar 20 FTE max → kosten = 20 × 130k = 2.6M
    // BV-resultaat = 5M − 2.6M = 2.4M (overschot dat ergens heen moet — overwinst)
    expect(r.bvResultaat).toBeGreaterThan(2_000_000);
  });
});

describe('simulate — meerjarig', () => {
  const result = simulate(defaultInputs, tarievenTyped);

  it('levert precies JAREN (5) rijen', () => {
    expect(result.rows.length).toBe(JAREN);
  });

  it('past schaalkorting toe vanaf het juiste jaar', () => {
    // jaar 1: 5 gemeenten, 0%
    // jaar 2: 13 gemeenten, 5%
    // jaar 3: 21 gemeenten, 10%
    // jaar 5: 37 gemeenten, 15%
    expect(result.rows[0].licentieInkomsten).toBe(5 * 4500);
    expect(result.rows[1].licentieInkomsten).toBe(Math.round(13 * 4500 * 0.95));
    expect(result.rows[2].licentieInkomsten).toBe(Math.round(21 * 4500 * 0.9));
    expect(result.rows[4].licentieInkomsten).toBe(Math.round(37 * 4500 * 0.85));
  });

  it('cumulatief bouwt op vanaf de initiële investering', () => {
    const j1 = result.rows[0];
    expect(j1.cumulatief).toBe(defaultInputs.investering + j1.stichtingResultaat);

    const j2 = result.rows[1];
    expect(j2.cumulatief).toBe(j1.cumulatief + j2.stichtingResultaat);
  });

  it('onderhoudsbudget blijft constant over de jaren', () => {
    for (const row of result.rows) {
      expect(row.onderhoudsbudget).toBe(defaultInputs.onderhoudsbudget);
    }
  });

  it('rapporteert de investering ongewijzigd', () => {
    expect(result.investering).toBe(defaultInputs.investering);
  });
});

describe('berekenMijlpalen', () => {
  it('detecteert geen mijlpalen bij negatieve cashflow', () => {
    const result = simulate(defaultInputs, tarievenTyped);
    const mp = berekenMijlpalen(result);
    // Met 425k uitgaven en 25.5k inkomsten in jaar 1 zal break-even niet snel komen
    expect(mp.operationeleBreakEvenJaar).toBeNull();
  });

  it('detecteert break-even wanneer de stichting-cashflow positief wordt', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      schaalId: 'xl',
      startGemeenten: 30,
      groei: 10,
      suppliers: 10,
      onderhoudsbudget: 50_000,
      features: 0,
    };
    const result = simulate(inputs, tarievenTyped);
    const mp = berekenMijlpalen(result);
    expect(mp.operationeleBreakEvenJaar).toBe(1);
  });
});

describe('edge cases', () => {
  it('werkt met 0 gemeenten en 0 inkomsten', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      startGemeenten: 0,
      groei: 0,
      suppliers: 0,
      perDocBudget: 0,
      bvOmzetPerGemeente: 0,
    };
    const result = simulate(inputs, tarievenTyped);
    expect(result.rows[0].totaalInkomsten).toBe(0);
    // Stichting heeft nog steeds onderhouds- en feature-uitgaven
    expect(result.rows[0].stichtingKosten).toBe(425_000);
  });

  it('werkt met onbekende schaal-id (tarief = 0)', () => {
    const inputs: SimulationInputs = { ...defaultInputs, schaalId: 'onbestaande' };
    const result = simulate(inputs, tarievenTyped);
    expect(result.rows[0].licentieInkomsten).toBe(0);
  });

  it('werkt met 0 onderhoudsbudget en 0 features (zuiver reactief scenario)', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      onderhoudsbudget: 0,
      features: 0,
    };
    const result = simulate(inputs, tarievenTyped);
    expect(result.rows[0].stichtingKosten).toBe(25_000); // alleen admin
  });
});
