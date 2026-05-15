/**
 * Pure logica voor de financiële simulatie. Geen DOM, geen Astro — alleen
 * berekeningen. Twee gescheiden simulaties met eenrichtingsafhankelijkheid:
 *
 *   simulateStichting(inputs, tarieven) → StichtingResult
 *   simulateBV(stichtingResult, bvInputs) → BVResult
 *
 * De stichting ontvangt drie inkomstenstromen (licenties, certificering,
 * per-document afdracht) en besteedt onderhoud + features uit aan suppliers
 * waarvan de BV er één is. De BV-prognose volgt direct uit de stichting-output.
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

// ----------------------------------------------------------------------------
// Stichting
// ----------------------------------------------------------------------------

export interface StichtingInputs {
  /** Aantal gemeenten in jaar 1 */
  startGemeenten: number;
  /** Aantal extra gemeenten per jaar */
  gemeenteGroei: number;
  /** Schaal-id uit tarieven.schalen */
  schaalId: string;

  // Ecosysteem-groei
  /** Aantal preferred suppliers in jaar 1 */
  startSuppliers: number;
  /** Aantal nieuwe preferred suppliers per jaar */
  supplierGroei: number;
  /** Aantal SaaS-aanbieders (cloud hosters) in jaar 1 */
  startSaasAanbieders: number;
  /** Aantal nieuwe SaaS-aanbieders per jaar */
  saasGroei: number;
  /** Tarief per gegenereerd document (€), afdracht naar stichting */
  tariefPerDoc: number;
  /** Gemiddeld aantal documenten per SaaS-aanbieder per jaar */
  docsPerSaasAanbieder: number;

  // Uitgaven (stichting beslist hoeveel ze uitbesteedt)
  /** Basis-onderhoudsbudget per jaar (€) */
  onderhoudsbudget: number;
  /** Budget voor nieuwe features per jaar (€) */
  features: number;
  /** Administratiekosten + stewards-vergoedingen per jaar (€) */
  admin: number;
  /** Initiële investering (€) */
  investering: number;
}

export interface StichtingYearRow {
  jaar: number;
  gemeenten: number;
  suppliers: number;
  saasAanbieders: number;
  licentieInkomsten: number;
  certInkomsten: number;
  perDocInkomsten: number;
  totaalInkomsten: number;
  onderhoudsbudget: number;
  featureBudget: number;
  adminKosten: number;
  stichtingKosten: number;
  stichtingResultaat: number;
  cumulatief: number;
}

export interface StichtingResult {
  rows: StichtingYearRow[];
  investering: number;
}

// ----------------------------------------------------------------------------
// BV
// ----------------------------------------------------------------------------

export interface BVInputs {
  /** Aandeel van stichting-onderhoud dat naar BV gaat (0..1, default 1.0) */
  aandeelOnderhoud: number;
  /** Aandeel van stichting-features dat naar BV gaat (0..1) */
  aandeelFeatures: number;
  /** Aantal gemeenten dat BV als preferred supplier kiest, in jaar 1 */
  bvStartGemeenten: number;
  /** Aantal nieuwe BV-gemeenten per jaar (gecapt op totaal aantal gemeenten) */
  bvGemeenteGroei: number;
  /** Externe BV-omzet per BV-gemeente per jaar (€) */
  bvOmzetPerGemeente: number;
  /** All-in kosten per FTE per jaar (€) */
  fteKosten: number;
  /** BV overhead-factor (bv 1.30) */
  overhead: number;
}

export interface BVYearRow {
  jaar: number;
  /** All-in kosten per FTE inclusief overhead (€) — referentie voor de afleiding */
  kostenPerFte: number;
  /** Theoretische FTE-capaciteit bij het beschikbare budget (float, niet afgerond) */
  beoogdeFte: number;
  /** Daadwerkelijk gekozen FTE — conservatief: floor(beoogdeFte), max MAX_BV_FTE */
  fte: number;
  /** Aantal gemeenten dat BV bedient (afgerond) — afgeleid uit aandeelGemeenten */
  bvGemeenten: number;
  vanStichtingOnderhoud: number;
  vanStichtingFeatures: number;
  vanStichting: number;
  vanGemeenten: number;
  bvInkomsten: number;
  bvKosten: number;
  /** Buffer = inkomsten − kosten; onder cost-plus altijd ≥ 0 en < kostenPerFte (tenzij FTE gecapt is) */
  bvResultaat: number;
}

export interface BVResult {
  rows: BVYearRow[];
}

// ----------------------------------------------------------------------------
// Constants & helpers
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// Stichting-simulatie
// ----------------------------------------------------------------------------

/**
 * Bereken één jaar van de stichting-cashflow in isolatie.
 * Cumulatief wordt door de aanroeper bijgehouden.
 */
export function berekenStichtingJaar(
  jaar: number,
  inputs: StichtingInputs,
  tarief: number,
  korting: number,
): Omit<StichtingYearRow, 'cumulatief'> {
  const gemeenten = inputs.startGemeenten + (jaar - 1) * inputs.gemeenteGroei;
  const suppliers = inputs.startSuppliers + (jaar - 1) * inputs.supplierGroei;
  const saasAanbieders = inputs.startSaasAanbieders + (jaar - 1) * inputs.saasGroei;

  // Drie inkomstenstromen
  const licentieInkomsten = Math.round(gemeenten * tarief * (1 - korting));
  const certInkomsten = suppliers * CERT_PER_SUPPLIER_PER_JAAR;
  const perDocInkomsten = Math.round(
    saasAanbieders * inputs.docsPerSaasAanbieder * inputs.tariefPerDoc,
  );
  const totaalInkomsten = licentieInkomsten + certInkomsten + perDocInkomsten;

  // Uitgaven (rechtstreeks uit inputs)
  const onderhoudsbudget = inputs.onderhoudsbudget;
  const featureBudget = inputs.features;
  const adminKosten = inputs.admin;
  const stichtingKosten = onderhoudsbudget + featureBudget + adminKosten;
  const stichtingResultaat = totaalInkomsten - stichtingKosten;

  return {
    jaar,
    gemeenten,
    suppliers,
    saasAanbieders,
    licentieInkomsten,
    certInkomsten,
    perDocInkomsten,
    totaalInkomsten,
    onderhoudsbudget,
    featureBudget,
    adminKosten,
    stichtingKosten,
    stichtingResultaat,
  };
}

/** Volledige 5-jaars stichting-simulatie. */
export function simulateStichting(
  inputs: StichtingInputs,
  tarieven: Tarieven,
): StichtingResult {
  const tarief = tariefVoorSchaal(tarieven, inputs.schaalId);
  const rows: StichtingYearRow[] = [];
  let cumulatief = inputs.investering;

  for (let jaar = 1; jaar <= JAREN; jaar++) {
    const gemeentenInJaar = inputs.startGemeenten + (jaar - 1) * inputs.gemeenteGroei;
    const korting = schaalKorting(tarieven, gemeentenInJaar);
    const jaarRow = berekenStichtingJaar(jaar, inputs, tarief, korting);
    cumulatief += jaarRow.stichtingResultaat;
    rows.push({ ...jaarRow, cumulatief });
  }

  return { rows, investering: inputs.investering };
}

// ----------------------------------------------------------------------------
// BV-simulatie (afgeleid uit stichting-result)
// ----------------------------------------------------------------------------

/**
 * Bereken één jaar van de BV-cashflow gegeven de overeenkomstige stichting-rij.
 * Onder cost-plus is BV-resultaat ~0, met afwijking als de cap (MAX_BV_FTE) bindt.
 */
export function berekenBVJaar(
  stichtingJaar: StichtingYearRow,
  inputs: BVInputs,
): BVYearRow {
  const vanStichtingOnderhoud = stichtingJaar.onderhoudsbudget * inputs.aandeelOnderhoud;
  const vanStichtingFeatures = stichtingJaar.featureBudget * inputs.aandeelFeatures;
  const vanStichting = vanStichtingOnderhoud + vanStichtingFeatures;

  // BV-gemeenten groeit met eigen tempo, maar kan nooit het totaal aantal
  // gemeenten van de stichting overstijgen.
  const beoogdeBvGemeenten =
    inputs.bvStartGemeenten + (stichtingJaar.jaar - 1) * inputs.bvGemeenteGroei;
  const bvGemeenten = Math.max(0, Math.min(beoogdeBvGemeenten, stichtingJaar.gemeenten));
  const vanGemeenten = bvGemeenten * inputs.bvOmzetPerGemeente;
  const bvInkomsten = vanStichting + vanGemeenten;

  const kostenPerFte = inputs.fteKosten * inputs.overhead;
  const beoogdeFte = kostenPerFte > 0 ? bvInkomsten / kostenPerFte : 0;
  // Conservatieve staffing: floor naar beneden zodat BV nooit overcommitteert.
  // Het FTE-afrondingsverschil blijft over als positieve buffer (overwinst die
  // terugvloeit naar de gemeenschap). BV-resultaat is daarmee per definitie ≥ 0.
  const fte = Math.min(Math.floor(beoogdeFte), MAX_BV_FTE);
  const bvKosten = Math.round(fte * kostenPerFte);
  const bvResultaat = bvInkomsten - bvKosten;

  return {
    jaar: stichtingJaar.jaar,
    kostenPerFte,
    beoogdeFte,
    fte,
    bvGemeenten,
    vanStichtingOnderhoud,
    vanStichtingFeatures,
    vanStichting,
    vanGemeenten,
    bvInkomsten,
    bvKosten,
    bvResultaat,
  };
}

/** Volledige 5-jaars BV-simulatie. Vereist het stichting-result. */
export function simulateBV(
  stichtingResult: StichtingResult,
  inputs: BVInputs,
): BVResult {
  const rows = stichtingResult.rows.map((sr) => berekenBVJaar(sr, inputs));
  return { rows };
}

// ----------------------------------------------------------------------------
// Mijlpalen (op stichting-cashflow)
// ----------------------------------------------------------------------------

export interface Milestones {
  operationeleBreakEvenJaar: number | null;
  investeringTerugverdiendJaar: number | null;
  overwinstJaar: number | null;
}

/** Mijlpalen op de stichting-cashflow. */
export function berekenMijlpalen(result: StichtingResult, buffer = 100_000): Milestones {
  const breakEven = result.rows.find((r) => r.stichtingResultaat >= 0);
  const terugverdiend = result.rows.find((r) => r.cumulatief - result.investering >= 0);
  const overwinst = result.rows.find((r) => r.cumulatief - result.investering >= buffer);

  return {
    operationeleBreakEvenJaar: breakEven ? breakEven.jaar : null,
    investeringTerugverdiendJaar: terugverdiend ? terugverdiend.jaar : null,
    overwinstJaar: overwinst ? overwinst.jaar : null,
  };
}

// ----------------------------------------------------------------------------
// Voordelen voor de gemeenschap (afgeleid uit stichting-result)
// ----------------------------------------------------------------------------

export interface VoordelenGemeenschap {
  totaalFeatureBudget: number;
  totaalOnderhoudsbudget: number;
  suppliersOpHetEinde: number;
  saasOpHetEinde: number;
  gemeentenOpHetEinde: number;
  overschotVoorReserveEnOss: number;
}

/**
 * Aggregeert de stichting-result naar zichtbare voordelen over 5 jaar.
 * `overschotVoorReserveEnOss` is de eindstand minus initiële investering.
 */
export function berekenVoordelen(result: StichtingResult): VoordelenGemeenschap {
  const rows = result.rows;
  const laatste = rows[rows.length - 1];

  return {
    totaalFeatureBudget: rows.reduce((sum, r) => sum + r.featureBudget, 0),
    totaalOnderhoudsbudget: rows.reduce((sum, r) => sum + r.onderhoudsbudget, 0),
    suppliersOpHetEinde: laatste ? laatste.suppliers : 0,
    saasOpHetEinde: laatste ? laatste.saasAanbieders : 0,
    gemeentenOpHetEinde: laatste ? laatste.gemeenten : 0,
    overschotVoorReserveEnOss: laatste ? laatste.cumulatief - result.investering : 0,
  };
}
