---
title: SaaS Aanbieden
description: Het platform als multi-tenant clouddienst aanbieden — twee harde voorwaarden, operationele afwegingen en de business case
---

Naast zelf-hosting via een preferred supplier kan een gemeente het platform ook afnemen als **SaaS**: een multi-tenant clouddienst die door één leverancier voor meerdere gemeenten tegelijk wordt geëxploiteerd. Voor kleinere gemeenten is dat vaak de aantrekkelijkste route — geen eigen infrastructuur, snelle onboarding, voorspelbare maandkosten.

Voor leveranciers is SaaS een potentieel grote markt, maar het komt met twee niet-onderhandelbare voorwaarden.

---

## Twee harde voorwaarden

### 1. Gecertificeerd preferred supplier zijn

Je mag het platform alleen als SaaS aanbieden als je een **gecertificeerde preferred supplier** bent. Er zijn geen aparte SaaS-spelregels — dezelfde eisen rond informatiebeveiliging (ISO/IEC 27001), upstream bijdragen, SLA-kwaliteit en data-portability gelden voor alle leveranciers, ongeacht of ze single-tenant of multi-tenant draaien.

[→ Volledig certificeringsproces](/meedoen/leveranciers/certificering)

### 2. Per-document afdracht naar de stichting

Bij zelf-hosting betaalt de gemeente een jaarlijkse licentie op basis van inwonertal. Bij SaaS is dat niet praktisch: één platform-instance bedient meerdere gemeenten, en eindgebruik wisselt sterk. Daarom geldt voor SaaS-aanbieders een **per-document afdracht**: voor elk gegenereerd document betaalt de aanbieder een vast tarief aan de stichting.

Dat tarief is zo gekalibreerd dat de afdracht bij gemiddeld gebruik in de buurt komt van de vaste licentie van een vergelijkbare gemeente. Wie meer gebruikt, draagt meer bij; wie minder gebruikt, minder.

> Multi-tenancy is geen route om de licentieverplichting te omzeilen. De platformfinanciering moet doorlopen, ongeacht het hostingmodel.

---

## Hoe de per-document afdracht werkt

| Aspect | Hoe ingericht |
|---|---|
| Tarief | Vast bedrag per gegenereerd document, gepubliceerd door de stichting |
| Meting | Door de aanbieder geregistreerd via platform-telemetrie (audit-baar) |
| Rapportage | Maandelijks aan de stichting, jaarlijks gevalideerd |
| Facturering | Maandelijks of per kwartaal vanuit de stichting aan de aanbieder |
| Doorbelasting | De aanbieder verrekent dit in zijn SaaS-abonnementsprijs |

De aanbieder is vrij om zijn eigen prijsmodel te kiezen (per gemeente, per gebruiker, gestaffeld, all-inclusive) — de afdracht naar de stichting blijft echter altijd per document.

---

## Operationele afwegingen

### Multi-tenancy en data-isolatie

Elke gemeente moet logisch én juridisch gescheiden zijn binnen de SaaS-omgeving:

- **Logisch**: data van gemeente A is onder geen omstandigheid zichtbaar voor gemeente B
- **Audit-baar**: toegangslogs aantonen dat er geen cross-tenant leakage is
- **Encryptie**: bij voorkeur per-tenant encryptiesleutels voor data at rest
- **Backup-isolatie**: backups zijn per gemeente apart restoreerbaar

### Data-residentie

Gemeenten verwachten verwerking binnen Nederland of (minimaal) de EU. De aanbieder is verantwoordelijk voor het kunnen aantonen waar data fysiek wordt opgeslagen en verwerkt — inclusief eventuele subverwerkers (CDN, monitoring, e-mail).

### Compliance per gemeente

Sommige gemeenten stellen aanvullende eisen: BIO-compliance, NEN 7510 voor zorgcontext, specifieke logging-vereisten. Een SaaS-aanbieder die deze gemeenten wil bedienen, moet zijn infrastructuur ontwerpen op de strengste eis — of bewust een subset van de markt bedienen.

### Schaalbaarheid en piekbelasting

Documentgeneratie kent pieken (begin van het jaar, vakantieperiodes, verzendmomenten van vergunningen). De aanbieder moet capaciteit elastisch kunnen opschalen zonder dat een grote gemeente de SLA voor kleinere gemeenten verstoort.

### Configureerbaarheid

Gemeenten hebben eigen huisstijl, eigen workflows, eigen integraties met zaakgericht werken-systemen. De SaaS-aanbieder moet per-gemeente configureerbaarheid bieden zonder forks van de platform-code.

---

## Business case

### Wanneer is SaaS aantrekkelijk om aan te bieden?

| Factor | Wanneer gunstig |
|---|---|
| Schaal | Vanaf ongeveer 10–15 gemeenten gemiddeld; daaronder zijn vaste kosten relatief hoog |
| Doelgroep | Kleine en middelgrote gemeenten zonder eigen hostingcapaciteit |
| Specialisatie | Wie een specifiek segment kan bedienen (bv. zorg-gerichte gemeenten, of regio-cluster) heeft een sterkere positie |
| Differentiatie | Naast prijs vooral op SLA, integraties, support en specifieke compliance |

### Inkomstenmodel

| Bron | Mechanisme |
|---|---|
| SaaS-abonnement | Vrije marktprijs per gemeente (maandelijks of jaarlijks) |
| Implementatie & onboarding | Eenmalige fee, vrije markt |
| Aanvullende diensten | Training, maatwerk, integraties — vrije markt |
| **Afdracht naar stichting** | **Per gegenereerd document, vast tarief, niet onderhandelbaar** |

De marge die overblijft is je SaaS-marge. Hoe efficiënter je platform draait (hosting, support, beheer), hoe groter je marge — onafhankelijk van wat de gemeente betaalt.

---

## SaaS vs zelf-hosten (gemeenteperspectief)

Voor de eindafnemer is de keuze niet triviaal. Een korte vergelijking:

| | SaaS (multi-tenant) | Zelf-hosten via preferred supplier |
|---|---|---|
| **Drempel** | Laag — geen eigen infra | Hoog — vereist hostingbeslissingen |
| **Kosten** | Abonnement (per-document afdracht doorbelast) | Vaste licentie op inwonertal + hostingkosten |
| **Configureerbaarheid** | Beperkt tot wat de aanbieder ondersteunt | Volledige controle |
| **Integraties** | Beperkt tot wat de aanbieder ontsluit | Maatwerk mogelijk |
| **Data-locatie** | Bij de aanbieder | Bij de gemeente of haar gekozen hosting partner |
| **Wisselen van aanbieder** | Data-export, dan migratie | Naar andere supplier of in-house |
| **Geschikt voor** | Kleinere gemeenten, snelle start | Grotere gemeenten of gemeenten met specifieke integratie-eisen |

---

## Concurrentie en marktwerking

Meerdere partijen mogen SaaS aanbieden — er is geen exclusiviteit en de stichting wijst geen geprefereerde SaaS-leverancier aan. Concurrentie loopt op kwaliteit, prijs, SLA en specialisatie.

Dat creëert ruimte voor positionering:
- **Volume-aanbieder** — laagste prijs, groot aantal kleine gemeenten
- **Sectorspecialist** — gericht op gemeenten met specifieke profielen (vluchtelingenopvang, kustgemeenten, etc.)
- **Premium-aanbieder** — hoogste SLA, uitgebreide integraties, hogere prijs
- **Regionaal** — fysieke aanwezigheid en relatiebeheer in een specifieke regio

---

## Zie ook

- [Overzicht voor Leveranciers](/meedoen/leveranciers/overzicht) — Verdienmodel en spelregels
- [Certificering](/meedoen/leveranciers/certificering) — De vereisten die ook voor SaaS-aanbieders gelden
- [Model 2: BSL + Ecosysteem](/epistola/model-2-bsl-licentie) — Hoe SaaS zich verhoudt tot het bredere verdienmodel
- [Voor Gemeenten](/meedoen/gemeenten/overzicht) — De gemeenteperspectief op afname
