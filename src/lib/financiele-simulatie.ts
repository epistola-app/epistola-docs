/**
 * Pure logica voor de financiële simulatie. Geen DOM, geen Astro — alleen
 * berekeningen. Daardoor te testen met Vitest.
 *
 * Model:
 *  - Stichting heeft licentie/cert/SaaS-inkomsten en kiest hoeveel ze
 *    uitbesteedt aan onderhoud en feature-ontwikkeling.
 *  - BV (en eventueel andere preferred suppliers) voeren het werk uit.
 *  - BV-FTE volgt uit het beschikbare budget (cost-plus break-even).
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
  /** Stichting basis-onderhoudsbudget per jaar (€) — vast bedrag, niet FTE-gedreven */
  onderhoudsbudget: number;
  /** Stichting budget voor nieuwe features per jaar (€) */
  features: number;
  /** Administratiekosten + stewards-vergoedingen per jaar (€) */
  admin: number;
  /** All-in kosten per FTE per jaar (€) — gebruikt om FTE af te leiden */
  fteKosten: number;
  /** BV overhead-factor (bv 1.30) */
  overhead: number;
  /** Externe BV-omzet per gemeente per jaar (€) — diensten aan gemeenten */
  bvOmzetPerGemeente: number;
  /** Initiële investering (€) */
  investering: number;
}

export interface YearRow {
  jaar: number;
  gemeenten: number;
  /** Afgeleide BV-FTE bij het beschikbare budget (gecapt op MAX_BV_FTE) */
  fte: number;
  licentieInkomsten: number;
  perDocInkomsten: number;
  certInkomsten: number;
  totaalInkomsten: number;
  /** Stichting uitgave: basis-onderhoud (input) */
  onderhoudsbudget: number;
  /** Stichting uitgave: features (input) */
  featureBudget: number;
  /** Stichting uitgave: admin (input) */
  adminKosten: number;
  stichtingKosten: number;
  stichtingResultaat: number;
  /** BV-totaalinkomsten = onderhoud + features + (gemeenten × omzet/gemeente) */
  bvInkomsten: number;
  /** BV externe omzet uit gemeente-diensten */
  bvExterneOmzet: number;
  /** BV-kosten = fte × kosten × overhead (na cap) */
  bvKosten: number;
  /** BV-resultaat — ≈ 0 onder cost-plus, kan klein verschil tonen door FTE-cap of afronding */
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
 * Bereken één jaar in isolatie. Cumulatief wordt door de aanroeper bijgehouden.
 */
export function berekenJaar(
  jaar: number,
  inputs: SimulationInputs,
  tarief: number,
  korting: number,
): Omit<YearRow, 'cumulatief'> {
  const gemeenten = inputs.startGemeenten + (jaar - 1) * inputs.groei;

  // Inkomsten stichting
  const licentieInkomsten = Math.round(gemeenten * tarief * (1 - korting));
  const perDocInkomsten = inputs.perDocBudget;
  const certInkomsten = inputs.suppliers * CERT_PER_SUPPLIER_PER_JAAR;
  const totaalInkomsten = licentieInkomsten + perDocInkomsten + certInkomsten;

  // Uitgaven stichting (direct vanuit inputs — niet afgeleid)
  const onderhoudsbudget = inputs.onderhoudsbudget;
  const featureBudget = inputs.features;
  const adminKosten = inputs.admin;
  const stichtingKosten = onderhoudsbudget + featureBudget + adminKosten;
  const stichtingResultaat = totaalInkomsten - stichtingKosten;

  // BV-cashflow: krijgt het uitbestedingsbudget + de diensten-omzet van gemeenten
  const bvExterneOmzet = gemeenten * inputs.bvOmzetPerGemeente;
  const bvInkomsten = onderhoudsbudget + featureBudget + bvExterneOmzet;

  // BV-FTE wordt afgeleid uit beschikbaar budget (cost-plus break-even)
  const kostenPerFte = inputs.fteKosten * inputs.overhead;
  const beoogdeFte = kostenPerFte > 0 ? bvInkomsten / kostenPerFte : 0;
  const fte = Math.min(Math.round(beoogdeFte), MAX_BV_FTE);

  const bvKosten = Math.round(fte * kostenPerFte);
  // BV-resultaat = inkomsten − kosten. Onder cost-plus ≈ 0, kan klein verschil
  // tonen door FTE-cap (te veel budget voor 20 FTE) of afronding.
  const bvResultaat = bvInkomsten - bvKosten;

  return {
    jaar,
    gemeenten,
    fte,
    licentieInkomsten,
    perDocInkomsten,
    certInkomsten,
    totaalInkomsten,
    onderhoudsbudget,
    featureBudget,
    adminKosten,
    stichtingKosten,
    stichtingResultaat,
    bvInkomsten,
    bvExterneOmzet,
    bvKosten,
    bvResultaat,
  };
}

/** Volledige 5-jaars simulatie met cumulatief stichting-kassaldo. */
export function simulate(inputs: SimulationInputs, tarieven: Tarieven): SimulationResult {
  const tarief = tariefVoorSchaal(tarieven, inputs.schaalId);
  const rows: YearRow[] = [];
  let cumulatief = inputs.investering;

  for (let jaar = 1; jaar <= JAREN; jaar++) {
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
