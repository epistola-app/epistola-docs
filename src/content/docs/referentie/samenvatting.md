---
title: Samenvatting
description: Compleet overzicht van structuur, governance en beleid in één document
---

## Kern in één oogopslag

**Model:** Onafhankelijke stichting (steward) + meerdere preferred suppliers (dienstverlening)

**Kosten:**
- Licentie volgt gemeenteschaal: €2k (5k inwoners) – €30k (250k+ inwoners)
- Voortuitbetaling standaard; 3-jarig contract geeft 10% korting

**Financiering stichting:**
- Jaar 1: Investering nodig €80–100k (gap: €44k)
- Jaar 2: Bijna break-even
- Jaar 3: Self-sustaining (€247k inkomsten vs €165k kosten)

**Belang:**
- Open source (na 1 jaar)
- Geen vendor lock-in
- Schaalvoordelen worden gedeeld
- Upstream development (alles terug in ecosystem)

---

## Missie en principes

**Kernmissie:** Epistola als duurzame, publieke digitale voorziening zonder vendor lock-in.

**Principes:**
- Publiek belang > commercieel belang
- Open bron (jaar 1), open source (jaar 2+)
- Geen vendor lock-in
- Transparante governance
- Continuïteit & duurzaamheid

---

## Structuur en rollen

### Stichting Epistola

**Doet:**
- Governance, stewardship, IP-beheer
- Architectuur-regie en standaarden
- Certificering preferred suppliers
- Roadmap-prioriteiten bepalen

**Doet NIET:**
- Development (suppliers doen dat)
- SLA/operatie
- Support, hosting, training
- Custom development

**Begroting:** €75k (jr1) → €120k (jr2) → €165k (jr3)

### Preferred Suppliers

**Doen:**
- SLA/operatie, hosting
- Support, training, implementatie
- **Development van features** (onder architectuur-regie)
- Custom development (betaald door klant)

**Verdienen aan:**
- SLA/hosting (vrije markt)
- Support/training (vrije markt)
- Custom dev (vrije markt)
- Licentie-marge (gemaximeerd: 15%/12%/10%)

### Gemeentes/Afnemers

**Sluiten contract met:** Preferred supplier (niet stichting)
**Betalen:** Één factuur aan supplier (licentie + SLA + hosting + services)
**Profijt:** Keuzevrijheid, data portability, geen lock-in

---

## Governance en stewards

**Operationalisering:**
- Bestuur quorum: min. 50%+1
- Stewards quorum: min. 2/3
- Zware besluiten: 2/3 bestuur + 2/3 stewards instemming
- Deadlock: Mediatie + onafhankelijke arbiter

**Stewards rollen:**
- Bewaken missie, licentie, governance
- Instemmingsrecht zware besluiten
- Informatie- & auditrecht
- Advies over certificering

**Samenstelling:** 5–9 stewards (meerderheid onafhankelijk)

**Zware besluiten:** Wijziging missie, licentie, IP, governance, ontbinding, margebeleid, investeringen > €50k

---

## Licentie & IP

**Model:** Business Source License (BSL)

**Jaar 1–2:** Open bron (code inzichtelijk, regie op kwaliteit)

**Jaar 2+:** Volledig open source (Apache 2.0)

**Doelen:** Kwaliteitsregie, misbruikpreventie, stabiele financiering, na 1 jaar openheid

---

## Licentieprijzen (realistisch)

Volgen **gemeenteschaal (inwoners)**, niet gebruikersaantal. Onbeperkt documentvolume.

| Gemeentegrootte | Inwoners | Licentie/jaar |
|---|---|---|
| Micro | < 5k | €2.000 |
| Zeer klein | 5–10k | €3.000 |
| Klein | 10–20k | €4.500 |
| Mid | 35–60k | €8.000 |
| Groot | 100–150k | €15.000 |
| Zeer groot | 250k+ | €30.000 |

**Praktijkvoorbeel:** Gemeente 50k inwoners = €8.000 licentie + SLA/hosting (supplier bepaalt)

**Schaalvoordelen:**
- Bij 10 gemeentes: -5%
- Bij 20 gemeentes: -10%
- Bij 35+ gemeentes: -15%

**Vooruitbetaling:** Standaard 1-jarig; 3-jarig contract = 10% korting

---

## Koststruktuur stichting

| Jaar | Kosten | Inkomsten | Gap |
|---|---|---|---|
| 1 | €75k (0.5 FTE dir + architect) | €31k | -€44k → **Investering nodig** |
| 2 | €120k (0.75 FTE + team) | €96k | -€24k (terugbetaling -€30k) → Break-even |
| 3 | €165k (1 FTE + architect) | €247k | +€82k → **Self-sustaining** ✓ |

**Inkomsten:** Licenties + certificering preferred suppliers

**Kosten:** Governance, architectuur, certificering, overhead

---

## Licentie vs. Services

### Wat betaalt gemeente?

| Component | Wie bepaalt | Prijs |
|---|---|---|
| **Licentie** | Stichting | €3–15k |
| **SLA/LCM** | Supplier | Vrije markt (~€20–40k) |
| **Hosting** | Supplier | Vrije markt (~€10–30k) |
| **Support/Training** | Supplier | Vrije markt |
| **Custom dev** | Supplier | Vrije markt (optioneel) |

**Totaal voorbeeld gemeente 50k:** €8k licentie + €35k services = €43k/jaar

### Doorontwikkeling

**Publieke features (3+ gemeentes willen het):**
- Stichting investeert via licentie-inkomsten
- Supplier bouwt
- Iedereen profiteert (upstream)

**Private/custom features:**
- Gemeente betaalt supplier direct
- Code gaat upstream (geen exclusiviteit)

---

## Preferred suppliers

**Criteria:**
- ISO/IEC 27001 certificering
- Security patches < 48 uur
- 99%+ uptime SLA
- Jaarlijkse audit
- Upstream bijdragen (min. 20% dev-uren of €10k/jaar)

**Certificering:** €2–5k intake, €1k/jaar audit

**Rechten:** Marketing-rechten, prioriteit in communicatie

**Intrekking:** Bij structurele schending, verlies certificering, non-compliance

---

## Commerciële partijen & marktwerking

**Gelijk speelveld:** Geen exclusiviteit, concurrentie op kwaliteit

**Investeringen:**
- Suppliers kunnen zelf investeren in features
- Geen eigendomsrechten, geen exclusiviteit
- Alles upstream (architectuur-regie stichting)

**Tijdelijke oprichters-voordelen:** Mogelijk, maar afgebakend en transparant

---

## Investeringsperspectief

### Waarom investeren?

**Investering:** €80–100k
**ROI-cap:** 1.5x (€120–150k)
**Payback:** Jaar 2–3
**Risk:** Gemiddeld (startup risk)
**Upside:** Publieke waarde + potentiële EU-schaal

### Scenarios

**A: Early Backer (€50–100k)**
- Seed voor validatie
- ROI-cap 1.5x, payback 2–3 jaar

**B: Growth (€100–250k)**
- Buffer + schaling
- ROI-cap 1.25–1.5x, payback 3–4 jaar
- Rapportage + adviesrecht

**C: Strategic (€250k+)**
- Publieke partners (ICTU, VNG)
- ROI-cap 1x (capital preservation)
- Medezeggenschap steward-college

---

## Risico's & mitigatie

| Risico | Waarschijnlijkheid | Mitigatie |
|---|---|---|
| Gemeenten kopen niet | Gemiddeld | Pilots, referenties, VNG-steun |
| Supplier fails | Laag | Meerdere suppliers, certificering |
| Security incident | Laag | ISO/27001, jaarlijkse audit |
| Groei trager | Laag–Gem | Conservative assumptions, buffer |
| Inkomsten dalen | Laag | Flexible budgeting, schaalvoordelen |

---

## Continuïteit & anti-lock-in

**Als supplier stopt:**
- Epistola blijft bestaan (stichting eigenaar)
- Data van jou (geen exploitatie)
- Andere supplier kan intrede doen
- Na 1 jaar: open source (zelf hosten)

**Juridisch geborgd:** Statuten voorkomen overname, winstuitkering

---

## Transparantie

**Jaarlijks:**
- Begroting & realisatie gepubliceerd
- Onafhankelijke audit
- Licentie-herijking op basis groei

**Gemeentes & suppliers:**
- Zicht op inkomsten/uitgaven
- Duidelijke pricing
- Ad hoc alerting voor material events

---

## FAQ-samenvatting

**Met wie contract?** Preferred supplier (niet stichting)
**Kostprijs?** €2–30k licentie + vrije markt SLA/hosting
**Lock-in?** Nee – open source na 1 jaar, data-portability, multiple suppliers
**Continuïteit?** Bij supplier-stop: andere supplier, of zelf hosten
**Development?** Suppliers bouwen (collectief of custom)
**Aanbesteding?** Meerdere suppliers kunnen inschrijven

---

## Samenvatting kernwaarden

✅ **Publiek eigendom** – Stichting als steward, niet verkocht
✅ **Betaalbaar** – Licenties €2–30k (schaal gemeenteschaal)
✅ **Keuzevrijheid** – Meerdere suppliers, geen lock-in
✅ **Duurzaam** – Self-sustaining jaar 3, surplus naar innovatie
✅ **Transparant** – Governance, pricing, roadmap openbaar
✅ **Open** – Open bron jaar 1, open source jaar 2+

Dit model maakt Epistola financieel haalbaar, publiek gewaarborgd, en duurzaam.
