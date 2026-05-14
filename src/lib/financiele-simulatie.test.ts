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

// Defaults zoals de simulator-UI ze gebruikt
const defaultInputs: SimulationInputs = {
  startGemeenten: 5,
  groei: 8,
  schaalId: 'mid',
  suppliers: 3,
  perDocBudget: 0,
  fteStart: 2,
  fteGroei: 3,
  fteKosten: 100_000,
  overhead: 1.3,
  bvOmzetPerGemeente: 10_000,
  admin: 25_000,
  features: 0,
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

describe('berekenJaar — defaults jaar 1', () => {
  const tarief = tariefVoorSchaal(tarievenTyped, 'mid'); // 4500
  const korting = schaalKorting(tarievenTyped, 5); // 0
  const r = berekenJaar(1, defaultInputs, tarief, korting);

  it('telt gemeenten en FTE correct', () => {
    expect(r.gemeenten).toBe(5);
    expect(r.fte).toBe(2);
  });

  it('rekent licentie = gemeenten × tarief × (1 − korting)', () => {
    expect(r.licentieInkomsten).toBe(5 * 4500); // 22.500
  });

  it('telt certificering = suppliers × €1.000', () => {
    expect(r.certInkomsten).toBe(3 * CERT_PER_SUPPLIER_PER_JAAR);
  });

  it('totaalInkomsten is som van alle drie', () => {
    expect(r.totaalInkomsten).toBe(22_500 + 0 + 3_000);
  });

  it('BV-kosten = FTE × kostenPerFTE × overhead', () => {
    expect(r.bvKosten).toBe(2 * 100_000 * 1.3); // 260.000
  });

  it('BV externe omzet = gemeenten × omzet per gemeente', () => {
    expect(r.bvExterneOmzet).toBe(5 * 10_000); // 50.000
  });

  it('BV-onderhoud = BV-kosten − externe omzet − features (≥ 0)', () => {
    expect(r.bvOnderhoud).toBe(260_000 - 50_000 - 0); // 210.000
  });

  it('Stichting-kosten = onderhoud + features + admin', () => {
    expect(r.stichtingKosten).toBe(210_000 + 0 + 25_000); // 235.000
  });

  it('Stichting-resultaat = inkomsten − kosten', () => {
    expect(r.stichtingResultaat).toBe(25_500 - 235_000); // -209.500
  });

  it('BV-resultaat ≈ 0 onder cost-plus', () => {
    expect(r.bvResultaat).toBe(0);
  });
});

describe('berekenJaar — featurebudget', () => {
  it('feature-budget verlaagt het BV-onderhoud (komt naast externe omzet)', () => {
    const inputs: SimulationInputs = { ...defaultInputs, features: 100_000 };
    const r = berekenJaar(1, inputs, 4500, 0);
    // bvKosten 260k, externe 50k, features 100k → onderhoud = 110k
    expect(r.bvOnderhoud).toBe(110_000);
    // stichting kosten = onderhoud + features + admin
    expect(r.stichtingKosten).toBe(110_000 + 100_000 + 25_000);
  });

  it('BV-onderhoud heeft een ondergrens van 0 als externe + features ≥ BV-kosten', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      features: 300_000,
      bvOmzetPerGemeente: 0,
    };
    const r = berekenJaar(1, inputs, 4500, 0);
    // bvKosten 260k, features 300k → onderhoud zou negatief zijn → 0
    expect(r.bvOnderhoud).toBe(0);
  });

  it('BV-resultaat wordt positief als externe + features de BV-kosten overstijgen', () => {
    const inputs: SimulationInputs = {
      ...defaultInputs,
      features: 300_000,
      bvOmzetPerGemeente: 0,
    };
    const r = berekenJaar(1, inputs, 4500, 0);
    // bvOnderhoud = 0, externeOmzet = 0, features = 300k, bvKosten = 260k
    // bvResultaat = 0 + 0 + 300_000 − 260_000 = 40_000
    expect(r.bvResultaat).toBe(40_000);
  });
});

describe('berekenJaar — FTE-cap', () => {
  it('FTE wordt nooit meer dan MAX_BV_FTE', () => {
    const inputs: SimulationInputs = { ...defaultInputs, fteStart: 18, fteGroei: 5 };
    const r1 = berekenJaar(1, inputs, 4500, 0);
    const r5 = berekenJaar(5, inputs, 4500, 0);
    expect(r1.fte).toBe(18);
    expect(r5.fte).toBe(MAX_BV_FTE);
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
    // jaar 4: 29 gemeenten, 10%
    // jaar 5: 37 gemeenten, 15%
    const j1 = result.rows[0];
    const j2 = result.rows[1];
    const j3 = result.rows[2];
    const j5 = result.rows[4];

    expect(j1.licentieInkomsten).toBe(5 * 4500 * 1.0);
    expect(j2.licentieInkomsten).toBe(Math.round(13 * 4500 * 0.95));
    expect(j3.licentieInkomsten).toBe(Math.round(21 * 4500 * 0.9));
    expect(j5.licentieInkomsten).toBe(Math.round(37 * 4500 * 0.85));
  });

  it('cumulatief bouwt op vanaf de initiële investering', () => {
    const j1 = result.rows[0];
    expect(j1.cumulatief).toBe(defaultInputs.investering + j1.stichtingResultaat);

    const j2 = result.rows[1];
    expect(j2.cumulatief).toBe(j1.cumulatief + j2.stichtingResultaat);
  });

  it('rapporteert de investering ongewijzigd', () => {
    expect(result.investering).toBe(defaultInputs.investering);
  });
});

describe('berekenMijlpalen', () => {
  it('detecteert geen mijlpalen bij negatieve cashflow', () => {
    const result = simulate(defaultInputs, tarievenTyped);
    const mp = berekenMijlpalen(result);
    expect(mp.operationeleBreakEvenJaar).toBeNull();
    expect(mp.investeringTerugverdiendJaar).toBeNull();
  });

  it('detecteert break-even wanneer de stichting-cashflow positief wordt', () => {
    // Scenario waarbij break-even al jaar 1 wordt bereikt: hoog tarief + veel suppliers
    const inputs: SimulationInputs = {
      ...defaultInputs,
      schaalId: 'xl',
      startGemeenten: 30,
      groei: 10,
      suppliers: 10,
      fteStart: 1,
      fteGroei: 0,
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
    expect(result.rows[0].bvOnderhoud).toBeGreaterThan(0); // FTE-kosten lopen wel door
  });

  it('werkt met 0 FTE (geen BV-kosten)', () => {
    const inputs: SimulationInputs = { ...defaultInputs, fteStart: 0, fteGroei: 0 };
    const result = simulate(inputs, tarievenTyped);
    expect(result.rows[0].bvKosten).toBe(0);
    expect(result.rows[0].bvOnderhoud).toBe(0);
  });

  it('werkt met onbekende schaal-id (tarief = 0)', () => {
    const inputs: SimulationInputs = { ...defaultInputs, schaalId: 'onbestaande' };
    const result = simulate(inputs, tarievenTyped);
    expect(result.rows[0].licentieInkomsten).toBe(0);
  });
});
