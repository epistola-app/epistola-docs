---
title: EUPL — alleen relevant binnen Model 1
description: Waarom de EUPL-vraag pas opkomt als je Model 1 kiest, en hoe EUPL zich dan verhoudt tot AGPL als copyleft-keuze
---

In gesprekken over Epistola komt regelmatig de vraag: "waarom niet gewoon EUPL?" Op het eerste gezicht een logische vraag — EUPL is expliciet ontworpen voor publieke-sector software in EU-context. Maar de vraag is alleen zinvol binnen een specifiek scenario: **Model 1** (volledig open source, verdienen op diensten). Onder Model 2 (de keuze van Epistola: BSL + ecosysteem) is EUPL geen alternatief voor BSL — ze lossen verschillende problemen op.

Deze pagina behandelt eerst waarom EUPL niet vergelijkbaar is met BSL, en daarna de eigenlijke vergelijking die wél interessant is: **EUPL versus AGPL** als copyleft-keuze binnen Model 1.

---

## Waarom EUPL geen tegenhanger van BSL is

Onder [Model 2](/epistola/model-2-bsl-licentie) financiert de stichting de doorlopende ontwikkeling van het platform door commercieel gebruik tijdelijk te beprijzen via de BSL. Na één jaar wordt elke versie automatisch Apache 2.0 — maximale vrijheid.

EUPL doet hier niets aan. Het is een copyleft-licentie die afgeleide werken dwingt openbaar te blijven, maar het beprijst commercieel gebruik niet. Iedereen mag de software vanaf dag 1 commercieel hosten en verkopen, zolang wijzigingen worden gedeeld.

| Vraag | BSL beantwoordt | EUPL beantwoordt |
|---|---|---|
| Voorkomt commerciële privatisering? | Tijdelijk via licentieverplichting | Permanent via copyleft |
| Financiert doorlopende ontwikkeling? | **Ja** (via licentie-inkomsten) | Nee |
| Voorkomt free-riding? | **Ja** (tijdens BSL-periode) | Nee (consumeren mag zonder bijdrage) |
| Gaat na verloop over naar volledige vrijheid? | **Ja** (Apache 2.0 na 1 jaar) | Nee (blijft permanent EUPL) |

Wie BSL en EUPL als alternatieven naast elkaar legt, vergelijkt twee gereedschappen voor verschillende klussen. EUPL hoort thuis in een ander model.

---

## In welk model is EUPL wel relevant?

In [Model 1](/epistola/model-1-open-source) — volledig open source vanaf dag 1, verdienen uitsluitend op diensten — speelt het ecosysteem-incentive-conflict een grote rol. Daar is een copyleft-licentie aantrekkelijk omdat ze voorkomt dat een commerciële concurrent een gesloten variant van het platform uitbrengt.

Binnen Model 1 zou je dan kiezen tussen verschillende copyleft-opties:

- **EUPL** — EU-publieke-sector-gericht, meertalig, zwakke copyleft
- **AGPL** — Sterke copyleft, dicht het SaaS-gat
- **GPL v3** — Sterke copyleft, geen SaaS-trigger
- **MPL 2.0** — Per-bestand copyleft, soepeler in compositie

De interessante vergelijking is daarmee niet EUPL versus BSL, maar **EUPL versus AGPL** — de twee meest serieuze copyleft-kandidaten voor een publieke-sector open source platform.

---

## EUPL versus AGPL

Beide zijn copyleft, beide voorkomen privatisering, beide zijn OSI-erkend. Toch leveren ze in de praktijk verschillende uitkomsten op.

| Aspect | EUPL 1.2 | AGPL v3 |
|---|---|---|
| **Type copyleft** | Zwak (per-bestand) | Sterk (hele werk) |
| **SaaS-gat dichten** | Nee — alleen distributie triggert | **Ja** — netwerkgebruik telt als distributie |
| **Patent-clausule** | Expliciet | Expliciet |
| **Meertalige juridische tekst** | **Ja** (24 EU-talen) | Nee (Engels) |
| **Compatibiliteit** | One-way relicensing naar GPL/AGPL/MPL/CeCILL | One-way met GPL v3 |
| **Apache 2.0-compatibel** | Nee | Nee |
| **Publieke-sector positionering** | **Sterk** (EU-aanbevolen) | Generiek |
| **Adoptie in commerciële context** | Beperkt | Beperkt (vermijden van AGPL is gangbaar bedrijfsbeleid) |

### Wanneer kies je voor AGPL?

AGPL is de scherpste keuze wanneer het SaaS-gat een echt probleem is. Voor software die voornamelijk als dienst wordt aangeboden, dwingt AGPL elke hosting-partij om wijzigingen openbaar te maken. Dit is precies waarom MongoDB ooit AGPL koos (en later overstapte naar SSPL toen AGPL niet ver genoeg ging).

Voor een documentgeneratieplatform dat door gemeenten in eigen omgeving (of via een leverancier) wordt gedraaid, is de SaaS-trigger minder relevant — het meeste gebruik is geen "SaaS naar derden".

### Wanneer kies je voor EUPL?

EUPL is de scherpste keuze wanneer:

- **Publieke-sector positionering** belangrijk is. EUPL-software draagt direct het "EU-publieke-sector-cred"-stempel.
- **Meertalige juridische zekerheid** binnen EU-context vereist is — de Nederlandse, Franse, Duitse versie zijn juridisch gelijkwaardig.
- **Zwakke copyleft** voldoet — afgeleide werken in de licentievaste bestanden moeten EUPL blijven, maar er is meer ruimte voor compositie met andere code.
- **Commerciële acceptatie** geen primaire zorg is. EUPL ligt commercieel iets makkelijker dan AGPL maar nog steeds copyleft.

### De praktische verschillen

In Model 1-territorium zou de keuze tussen EUPL en AGPL er als volgt uitzien:

- **AGPL** bij sterke nadruk op SaaS-bescherming en internationale adoptie
- **EUPL** bij sterke nadruk op EU-publieke-sector-legitimiteit en multilingual juridische basis

Voor een Nederlands gemeente-platform met EU-context en weinig SaaS-naar-derden zou EUPL de iets logischere keuze zijn. Maar onder Model 2 — de keuze van Epistola — is geen van beide aan de orde.

---

## Conclusie

EUPL is een uitstekende licentie voor een specifiek soort project: publieke-sector open source software die op een dienstenmodel draait (Model 1). Voor Epistola is dat niet het gekozen pad.

De vraag "waarom geen EUPL?" is dus eigenlijk de vraag "waarom geen Model 1?" — en het antwoord daarop staat op [Modelkeuze & Transitiestrategie](/epistola/modelkeuze): het ecosysteem-incentive-conflict en het ontbreken van een platformfinancieringsmechanisme.

Wie zich wel in Model 1-territorium wil oriënteren, zou EUPL serieus naast AGPL en GPL moeten leggen. Onder Model 2 is BSL de gepaste keuze; EUPL en AGPL spelen in een ander veld.

---

## Zie ook

- [De BSL-licentie](/referentie/bsl-licentie) — Hoe BSL het probleem oplost waar EUPL en AGPL geen antwoord op geven
- [Open source licenties: een overzicht](/referentie/licentievergelijking) — Het brede licentielandschap met alle categorieën
- [Model 1: Open Source + Diensten](/epistola/model-1-open-source) — Het scenario waarbinnen de EUPL/AGPL-vraag wel relevant wordt
- [Modelkeuze & Transitiestrategie](/epistola/modelkeuze) — Waarom Epistola voor Model 2 koos
