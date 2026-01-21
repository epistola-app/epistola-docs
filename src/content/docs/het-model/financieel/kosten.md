---
title: Kostenstructuur
description: Kosten, inkomsten en financiële structuur van het Epistola-ecosysteem
---

Dit document beschrijft hoe kosten en inkomsten zijn georganiseerd
binnen het Epistola-ecosysteem, in lijn met steward ownership.

---

## Kernrollen

**Stichting:** Governance, architectuur-regie, certificering, IP-beheer
**Preferred suppliers:** Development, SLA, hosting, support, custom work
**Gemeentes:** Betaald suppliers (niet stichting) voor diensten

---

## Kosten van de stichting

Stichting maakt structurele kosten voor:

| Categorie | Omschrijving |
|---|---|
| **Governance** | Bestuurders, stewards, vergaderingen, audit |
| **Architectuur-regie** | Architect/security consultant, standaarden, design-review |
| **Certificering** | Toetsing preferred suppliers, audits, compliance |
| **IP-beheer** | Licentiehandhaving, justitiële zaken, merk |
| **Overhead** | Kantoor, HR, administratie, verzekeringen |

**Stichting doet NIET:**
- Software-development
- SLA/operatie
- Hosting/infrastructure
- Support/training
- Custom development

---

## Inkomsten van de stichting

De stichting ontvangt inkomsten uit:

| Bron | Bedrag | Omschrijving |
|---|---|---|
| **Licentiekosten** | €2–30k/gemeente/jaar | Doorbelast door preferred suppliers |
| **Certificerings-fees** | €1–3k per supplier | Intake & jaarlijkse audit |
| **Investeringen** (optioneel) | €80–100k startfase | Gemaximeerd rendement model |

**De stichting factureert gemeentes NIET rechtstreeks.**
Alle betaling loopt via preferred suppliers.

---

## Kostenstructuur per fase

### Jaar 1: Validatie

| Item | Budget | Toelichting |
|---|---|---|
| Director/Governance (0.5 FTE) | €50k | Bestuur, stewards, governance |
| Architect/Certificering (contractor) | €15k | Part-time architectuur-regie + eerste audits |
| Overhead | €10k | Kantoor, admin, juridisch |
| **TOTAAL KOSTEN** | **€75k** | |
| | | |
| **INKOMSTEN** | | |
| Licenties (5 gemeentes avg €5k) | €25k | |
| Certificering (2 suppliers) | €6k | |
| **TOTAAL INKOMSTEN** | **€31k** | |
| | | |
| **GAP** | **€44k** | → Investering/buffer nodig |

---

### Jaar 2: Groei

| Item | Budget | Toelichting |
|---|---|---|
| Director/Governance (0.75 FTE) | €60k | Uitbreiding |
| Architect (0.5 FTE) + Security consultant | €40k | Full-time architect + part-time security |
| Overhead | €20k | |
| **TOTAAL KOSTEN** | **€120k** | |
| | | |
| **INKOMSTEN** | | |
| Licenties (12 gemeentes avg €7k) | €84k | |
| Certificering (6 suppliers) | €12k | |
| **TOTAAL INKOMSTEN** | **€96k** | |
| | | |
| **GAP** | **€24k** | → Investeringen terugbetaling start |

---

### Jaar 3: Self-sustaining

| Item | Budget | Toelichting |
|---|---|---|
| Director (1 FTE) | €80k | Full-time |
| Architect (0.5 FTE) + Security | €60k | Full-time architect, part-time security |
| Governance/Audit contractor | €15k | Externe auditor, steward-ondersteuning |
| Overhead | €10k | |
| **TOTAAL KOSTEN** | **€165k** | |
| | | |
| **INKOMSTEN** | | |
| Licenties (25 gemeentes avg €9k) | €225k | |
| Certificering (15 suppliers) | €22.5k | |
| **TOTAAL INKOMSTEN** | **€247.5k** | |
| | | |
| **SURPLUS** | **€82.5k** | → Innovatie-fonds, investeringen-terugbetaling |

---

### Jaar 4+: Volwassen

| Item | Budget | Toelichting |
|---|---|---|
| Director (1 FTE) | €90k | |
| Architect (1 FTE) | €85k | Full-time, may include part-time developer voor POC/experimental work |
| Governance/Audit | €30k | |
| Overhead | €35k | |
| **TOTAAL KOSTEN** | **€240k** | |
| | | |
| **INKOMSTEN** | | |
| Licenties (40 gemeentes avg €10k) | €400k | |
| Certificering (25 suppliers) | €37.5k | |
| **TOTAAL INKOMSTEN** | **€437.5k** | |
| | | |
| **SURPLUS** | **€197.5k** | → Innovatie-fonds, publieke initiatieven |

---

## Kostenstructuur van preferred suppliers

Suppliers maken kosten voor:

| Item | Budget |
|---|---|
| Licentie per gemeenteklant | €2–30k/jaar |
| Certificering (eenmalig) | €2–5k |
| Jaarlijkse hercertificering | €1k |
| SLA/operatie (hun eigen) | €20–50k+ per klant |
| Hosting/infrastructure | €10–30k+ per klant |
| Support/training | Variable |
| Custom development | Variable |

**Suppliers verdienen** op:
- Licentie-marge (max. 15% op doorbelasting)
- SLA/hosting/support (vrije markt)
- Custom development (vrije markt)

---

## Doorbelasting aan gemeentes

**Totaalcost gemeente:**

```
Licentie (stichting):               €8.000 (50k gemeente)
SLA/LCM (supplier bepaalt):         €20.000
Hosting (supplier bepaalt):         €15.000
Support/training (supplier bepaalt): €5.000
Custom development (optional):      €0–50.000+
─────────────────────────────────
Totaal per gemeente:                €48.000+ per jaar
```

**Voor gemeente:**
- 1 contract (met supplier)
- 1 factuur (van supplier)
- Geen directe relatie met stichting

---

## Doorontwikkeling & innovatie

### Collectieve features (via stichting-investering)

Als 3+ gemeentes dezelfde feature willen:
- Feature gaat in publieke roadmap
- Stichting financieert (uit licentie-inkomsten)
- Preferred supplier voert uit
- Resultaat is upstream (alle gemeentes profiteren)

### Private/custom features (betaald door gemeente)

Gemeente wil unieke integratie:
- Betaalt preferred supplier direct (buiten stichting)
- Supplier voert uit (onder architectuur-regie stichting)
- Code gaat upstream (geen private forks)

---

## Financiële transparantie

**Jaarlijks publiceert stichting:**
- Realisatie inkomsten & uitgaven
- Onderverdeling naar categorieën
- Verklaring schaalvoordelen
- Vooruitblik volgende jaar

Dit geeft gemeentes en suppliers vertrouwen.

---

## Samenvatting

- Stichting-budgets zijn klein & realistisch (€75k–€240k)
- Suppliers verdienen op diensten + custom work, niet licentie
- Gemeentes betalen suppliers, niet stichting
- Investering nodig jaar 1–2 (€80–100k)
- Self-sustaining jaar 3 (€247k > €165k)
- Transparantie op alle niveaus

---

## Kosten voor commerciële partijen

Commerciële partijen maken kosten voor:
- licenties voor gebruik en exploitatie van Epistola
- certificering en periodieke hercertificering
- naleving van governance-, kwaliteits- en security-eisen

Deze kosten:
- zijn gelijk voor alle commerciële partijen
- zijn transparant
- vormen geen exclusiviteitsdrempel

Commerciële partijen dragen licentiekosten af aan de stichting.

---

## Doorbelasting aan afnemers

Commerciële partijen:
- verwerken licentiekosten in hun aanbod aan afnemers
- kunnen hier een marge op toepassen binnen een vastgesteld maximum (alleen voor
  licentiekosten; overige diensten kennen vrije marktprijsstelling)
- blijven volledig verantwoordelijk voor prijsstelling

Voor afnemers resulteert dit in:
- één leverancier
- één contract
- één factuur
- geen directe relatie met de stichting

---

## Doorontwikkeling en investeringen

Doorontwikkeling kan worden gefinancierd via:
- afnemers (via commerciële partijen)
- commerciële partijen zelf
- investeerders (via de stichting, met ROI-cap)

Alle doorontwikkeling komt upstream beschikbaar
binnen het Epistola-ecosysteem.

---

## Transparantie en bescherming

De financiële structuur:
- voorkomt vendor lock-in
- borgt continuïteit van Epistola
- maakt investeren mogelijk
- beschermt het publieke karakter van de voorziening

### Investeringen door de stichting

Omdat de stichting verantwoordelijk is voor de roadmap en de
lange-termijnontwikkeling van Epistola, moet zij actief kunnen
investeren in doorontwikkeling.

De stichting kan middelen inzetten voor:
- ontwikkeling van roadmap-functionaliteit
- onderhoud en verbetering van de kernsoftware
- architectuur- en kwaliteitsverbeteringen
- oplossen van technische schuld
- beveiligings- en compliance-verbeteringen

De stichting kan hiervoor:
- individuen inhuren (bijv. ontwikkelaars, architecten)
- commerciële partijen inhuren (waaronder preferred suppliers)
- opdrachten verstrekken via transparante selectie

Deze investeringen:
- worden gefinancierd uit licentiekosten en andere stichting-inkomsten
- zijn gericht op collectieve waarde
- leiden altijd tot upstream beschikbare resultaten

De stichting levert hiermee geen commerciële diensten,
maar vervult haar rol als steward en regisseur.

---

## Uitgangspunten financiering

Dit document integreert alle financiële principes:
- De stichting heeft geen winstoogmerk en gebruikt middelen voor continuïteit,
  onderhoud, governance en bescherming;
- Commerciële partijen verdienen aan dienstverlening en dragen bij via
  licentiekosten en certificering;
- Transparantie en heldere scheiding van geldstromen zijn leidend.

**Zie ook:**
- [Licentie & Kostenbeleid](/het-model/financieel/licentie-en-kostenbeleid) - Gedetailleerde prijzen en schaalvoordelen
- [Verdienmodel](/het-model/financieel/verdienmodel) - Hoe commerciële partijen verdienen
