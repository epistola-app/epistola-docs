/**
 * Pure logica voor de financiële simulatie. Geen DOM, geen Astro — alleen
 * berekeningen. Daardoor te testen met Vitest.
 */

export interface Schaal {
  id: string;
  label: string;
  inwoners: string;
  tarief: number;
}

export interface Schaalvoordeel {
  vanaf: number;
  korting: number;
}

export interface Tarieven {
  valuta: string;
  periode: string;
  schalen: Schaal[];
  schaalvoordeel: Schaalvoordeel[];
}

export interface SimulationInputs {
  /** Aantal gemeenten in jaar 1 */
  startGemeenten: number;
  /** Aantal extra gemeenten per jaar */
  groei: number;
  /** Schaal-id uit tarieven.schalen */
  schaalId: string;
  /** Aantal preferred suppliers (voor certificeringsbijdrage) */
  suppliers: number;
  /** SaaS per-document afdracht (€/jaar, totaal) */
  perDocBudget: number;
  /** FTE in jaar 1 */
  fteStart: number;
  /** FTE-uitbreiding per jaar */
  fteGroei: number;
  /** All-in kosten per FTE per jaar (€) */
  fteKosten: number;
  /** BV overhead-factor (bv 1.30) */
  overhead: number;
  /** Externe BV-omzet per gemeente per jaar (€) */
  bvOmzetPerGemeente: number;
  /** Administratiekosten + stewards-vergoedingen per jaar (€) */
  admin: number;
  /** Stichting feature-budget per jaar (€) */
  features: number;
  /** Initiële investering (€) */
  investering: number;
}

export interface YearRow {
  jaar: number;
  gemeenten: number;
  fte: number;
  licentieInkomsten: number;
  perDocInkomsten: number;
  certInkomsten: number;
  totaalInkomsten: number;
  bvKosten: number;
  bvExterneOmzet: number;
  bvOnderhoud: number;
  featureBudget: number;
  adminKosten: number;
  stichtingKosten: number;
  stichtingResultaat: number;
  bvResultaat: number;
  cumulatief: number;
}

export interface SimulationResult {
  rows: YearRow[];
  investering: number;
}

export const CERT_PER_SUPPLIER_PER_JAAR = 1000;
export const MAX_BV_FTE = 20;
export const JAREN = 5;

/** Lookup van tarief op basis van schaal-id. Geeft 0 terug als id onbekend is. */
export function tariefVoorSchaal(tarieven: Tarieven, id: string): number {
  const match = tarieven.schalen.find((s) => s.id === id);
  return match ? match.tarief : 0;
}

/** Geeft de toepasselijke schaalkorting (0..1) terug bij het opgegeven aantal gemeenten. */
export function schaalKorting(tarieven: Tarieven, gemeenten: number): number {
  let korting = 0;
  for (const drempel of tarieven.schaalvoordeel) {
    if (gemeenten >= drempel.vanaf) korting = drempel.korting;
  }
  return korting;
}

/**
 * Bereken één jaar in isolatie.
 * Cumulatief moet door de aanroeper bijgehouden worden.
 */
export function berekenJaar(
  jaar: number,
  inputs: SimulationInputs,
  tarief: number,
  korting: number,
): Omit<YearRow, 'cumulatief'> {
  const gemeenten = inputs.startGemeenten + (jaar - 1) * inputs.groei;
  const fte = Math.min(inputs.fteStart + (jaar - 1) * inputs.fteGroei, MAX_BV_FTE);

  const licentieInkomsten = Math.round(gemeenten * tarief * (1 - korting));
  const perDocInkomsten = inputs.perDocBudget;
  const certInkomsten = inputs.suppliers * CERT_PER_SUPPLIER_PER_JAAR;
  const totaalInkomsten = licentieInkomsten + perDocInkomsten + certInkomsten;

  const bvKosten = Math.round(fte * inputs.fteKosten * inputs.overhead);
  const bvExterneOmzet = gemeenten * inputs.bvOmzetPerGemeente;
  const featureBudget = inputs.features;

  // BV werkt cost-plus: stichting dekt het deel dat BV niet zelf via gemeenten-
  // diensten of feature-opdrachten kan financieren (ondergrens 0).
  const bvOnderhoud = Math.max(0, bvKosten - bvExterneOmzet - featureBudget);

  const adminKosten = inputs.admin;
  const stichtingKosten = bvOnderhoud + featureBudget + adminKosten;
  const stichtingResultaat = totaalInkomsten - stichtingKosten;

  // BV-resultaat ≈ 0 onder cost-plus, positief als BV meer ophaalt dan kost.
  const bvResultaat = bvOnderhoud + bvExterneOmzet + featureBudget - bvKosten;

  return {
    jaar,
    gemeenten,
    fte,
    licentieInkomsten,
    perDocInkomsten,
    certInkomsten,
    totaalInkomsten,
    bvKosten,
    bvExterneOmzet,
    bvOnderhoud,
    featureBudget,
    adminKosten,
    stichtingKosten,
    stichtingResultaat,
    bvResultaat,
  };
}

/** Volledige 5-jaars simulatie met cumulatief stichting-kassaldo. */
export function simulate(inputs: SimulationInputs, tarieven: Tarieven): SimulationResult {
  const tarief = tariefVoorSchaal(tarieven, inputs.schaalId);
  const rows: YearRow[] = [];
  let cumulatief = inputs.investering;

  for (let jaar = 1; jaar <= JAREN; jaar++) {
    // Korting hangt af van het aantal gemeenten in dit jaar
    const gemeentenInJaar = inputs.startGemeenten + (jaar - 1) * inputs.groei;
    const korting = schaalKorting(tarieven, gemeentenInJaar);
    const jaarRow = berekenJaar(jaar, inputs, tarief, korting);
    cumulatief += jaarRow.stichtingResultaat;
    rows.push({ ...jaarRow, cumulatief });
  }

  return { rows, investering: inputs.investering };
}

export interface Milestones {
  operationeleBreakEvenJaar: number | null;
  investeringTerugverdiendJaar: number | null;
  overwinstJaar: number | null;
}

/** Mijlpalen op de stichting-cashflow. */
export function berekenMijlpalen(result: SimulationResult, buffer = 100_000): Milestones {
  const breakEven = result.rows.find((r) => r.stichtingResultaat >= 0);
  const terugverdiend = result.rows.find((r) => r.cumulatief - result.investering >= 0);
  const overwinst = result.rows.find((r) => r.cumulatief - result.investering >= buffer);

  return {
    operationeleBreakEvenJaar: breakEven ? breakEven.jaar : null,
    investeringTerugverdiendJaar: terugverdiend ? terugverdiend.jaar : null,
    overwinstJaar: overwinst ? overwinst.jaar : null,
  };
}
