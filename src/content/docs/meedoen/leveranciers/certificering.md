---
title: Certificering als Preferred Supplier
description: Vereisten, het proces en wat Preferred Supplier-status je oplevert
---

Om diensten te mogen leveren aan gemeenten via het Epistola-platform, doorloop je een certificeringstraject bij de stichting. Certificering is niet administratief — het is de manier waarop de stichting garandeert dat gemeenten op elke preferred supplier kunnen vertrouwen.

---

## Wat levert Preferred Supplier-status op?

- Gebruik van het "Preferred Supplier"-keurmerk in je communicatie
- Vermelding op de officiële leverancierslijst (raadpleegbaar door gemeenten)
- Toegang tot technische sessies, vroegtijdige inzage in releases en de jaarlijkse strategiesessie
- Deelname aan gezamenlijke aanbestedingsloten voor gemeenten die via de stichting inkopen

Zonder certificering kun je technisch gezien het platform gebruiken (de code is open), maar je mag je niet als preferred supplier presenteren en je krijgt geen toegang tot de samenwerkingsstructuur.

---

## Vereisten

### Informatiebeveiliging

| Vereiste | Drempelwaarde |
|---|---|
| ISMS-certificering | ISO/IEC 27001 of gelijkwaardig |
| Penetratietest | Jaarlijks door geaccrediteerde partij |
| Security patches kritiek | < 48 uur na disclosure |
| Security patches hoog | < 7 dagen na disclosure |
| Incident disclosure naar klanten | < 72 uur |

### Upstream bijdragen

Preferred suppliers dragen actief bij aan het platform. Dit kan op twee manieren:

- **Uren:** minimaal 20% van de bestede ontwikkeltijd aan Epistola-gerelateerd werk gaat upstream
- **Financieel:** minimaal €10.000 per jaar in upstream code, documentatie of community-bijdragen

Upstream code wordt gereviewed en geaccepteerd via het standaard pull-request proces. Maatwerkontwikkeling voor gemeenten valt ook onder de upstream-verplichting tenzij expliciet anders afgesproken.

### Dienstverleningskwaliteit

| Vereiste | Drempelwaarde |
|---|---|
| Uptime-garantie (SLA) | ≥ 99% aantoonbaar (monitoring-rapport vereist) |
| Data portability | Gestandaardiseerde export altijd beschikbaar |
| Contractuele lock-in | Niet toegestaan |
| Private forks | Niet toegestaan |

---

## Het certificeringsproces

```
1. Aanmelding
   └── Invullen van het aanmeldformulier + bedrijfsprofiel

2. Documentatiereview (2–4 weken)
   └── Stichting beoordeelt ISO-certificaat, upstream-track record,
       uptime-rapportage en SLA-voorwaarden

3. Technisch gesprek (1 uur)
   └── Architectuur, deployment, security-aanpak, bijdrageplannen

4. Goedkeuring & overeenkomst
   └── Ondertekening van de Preferred Supplier Agreement

5. Certificering actief
   └── Vermelding op leverancierslijst, toegang tot kanalen
```

**Doorlooptijd:** gemiddeld 4–6 weken na aanmelding.

**Kosten:**
- Initiële certificering: €2.000–€5.000 (afhankelijk van omvang review)
- Jaarlijkse hercertificering: €1.000

---

## Hercertificering

Certificering is één jaar geldig. Hercertificering vindt jaarlijks plaats op basis van:

- Actueel ISO-certificaat of gelijkwaardig bewijs
- Upstream-bijdrageoverzicht van het afgelopen jaar
- Uptime-rapportage van het afgelopen jaar
- Eventuele incidenten en de afhandeling daarvan

Bij aantoonbare non-compliance volgt een herstelperiode van 30 dagen. Daarna kan de stichting de certificering intrekken met een voormeldtermijn van 3 maanden. In die periode blijf je als preferred supplier vermeld, zodat gemeenten tijd hebben om een alternatief te regelen.

---

## Decertificering

Decertificering kan op verzoek van de leverancier of door de stichting bij aanhoudende non-compliance.

| Situatie | Voormeldtermijn |
|---|---|
| Vrijwillige uitschrijving | 3 maanden |
| Non-compliance na herstelperiode | 3 maanden |
| Zwaar incident (fraude, ernstige datalek zonder disclosure) | Directe schorsing, daarna formeel proces |

Gemeenten worden bij decertificering proactief geïnformeerd door de stichting.

---

## Zie ook

- [Overzicht voor Leveranciers](/meedoen/leveranciers/overzicht) — Verdienmodel en spelregels
- [Doorontwikkeling & Roadmap](/meedoen/leveranciers/roadmap-en-doorontwikkeling) — Hoe features upstream komen
- [Model 2: BSL + Ecosysteem](/epistola/model-2-bsl-licentie) — Waarom het ecosysteem werkt zoals het werkt
