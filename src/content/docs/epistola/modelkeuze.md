---
title: Modelkeuze & Transitiestrategie
description: Waarom Epistola de voorkeur geeft aan Model 2, waarom we beginnen met Model 1, en wat we de VNG adviseren om dit structureel op te lossen
---

De vorige pagina's beschreven drie modellen elk op hun eigen merites. Deze pagina legt uit waarom we een voorkeur hebben, waarom de werkelijkheid van 2025 ons dwingt anders te beginnen, en hoe we hopen dat dat verandert.

---

## De vergelijking in één tabel

| | Model 1: Open Source + Diensten | Model 2: BSL + Ecosysteem | Model 3: Centraal Aanbesteed |
|---|---|---|---|
| **Adoptiedrempel** | Geen — iedereen kan starten | Licentieverplichting vraagt uitleg | Geen (gemeente volgt VNG-contract) |
| **Inkomstenstabiliteit** | Afhankelijk van dienstenvraag | Voorspelbaar via licenties | Hoog — maar alles bij één klant |
| **Ecosysteem-incentive** | Negatief — elke concurrent schaadt omzet | Positief — elke supplier vergroot de markt | Afhankelijk van contractvorm |
| **Concurrentie op diensten** | Structureel nadeel (anderen liften mee) | Eerlijk speelveld via licentieplicht | Beperkt — VNG is bottleneck |
| **Schaalbaarheid** | Begrensd door BV-capaciteit | Onbegrensd via ecosysteem | Direct groot, maar monopsonie-afhankelijk |
| **Klantconcentratie** | Verspreid over gemeenten | Verspreid over gemeenten | Extreem hoog (één klant: VNG) |
| **Innovatiesnelheid** | Hoog | Hoog | Laag (VNG-besluitvorming) |
| **Vertrouwen bij overheden** | Hoog ("echt open source") | Vraagt uitleg | Hoog (VNG-keurmerk) |
| **Financiering platform** | Kwetsbaar bij dienstenconcurrentie | Geborgd via stichting | Volledig afhankelijk van contractverlenging |
| **Lock-in risico** | Laag (open code) | Laag (BSL + Apache 2.0) | Hoog bij contractwisseling (tenzij open source) |

---

## Waarom we Model 2 prefereren

Model 2 lost het fundamentele probleem van Model 1 op: het ecosysteem-incentive-conflict. In Model 1 schaadt elke nieuwe dienstverlener onze eigen omzet. In Model 2 helpt elke nieuwe preferred supplier ons: meer suppliers = meer gemeenten = meer licenties = beter gefinancierd platform.

Dat is niet alleen beter voor Epistola — het is beter voor gemeenten. Een platform met meerdere concurrerende leveranciers is betrouwbaarder, goedkoper en beter bestand tegen het wegvallen van één partij.

Model 2 is ook het model dat we altijd al voor ogen hadden: een stichting die het IP beheert, een ecosysteem van suppliers dat concurreert op kwaliteit, en een BV die de kern bouwt zonder alles zelf te hoeven bedienen.

---

## Waarom we voorlopig met Model 1 beginnen

We leven niet in een ideale wereld.

Een groot deel van de Nederlandse gemeenten begrijpt niet dat open source ≠ gratis in stand te houden. De reactie op een licentieverzoek is te vaak: "maar het is toch open source?" — ook als diezelfde gemeente €300.000 uitgeeft aan een propriëtaire alternatief.

In die omgeving is een licentiemodel aan de voorkant een adoptierem. Als gemeenten al moeite hebben met het concept van "betalen voor iets dat je ook gratis kunt downloaden", is het gesprek over de BSL en de change date nog een stap verder.

We kiezen er daarom voor om te beginnen met Model 1: volledig open source, verdienen op diensten. Dat maakt onboarding eenvoudiger, verlaagt de drempel voor gemeenten die voorzichtig zijn, en geeft ons de kans om het platform te bewijzen voordat we het gesprek over financiering op platformniveau voeren.

We zijn ons bewust van het risico. Model 1 is houdbaar zolang we de dominante dienstverlener zijn. Zodra anderen onze services onderbieden zonder bij te dragen aan het onderhoud, verslechtert onze positie. Dat is de toestand die we willen voorkomen — en waarop de aanbeveling aan de VNG is gericht.

---

## Aanbeveling aan de VNG: pas de GIBIT aan

De **GIBIT** (Gemeentelijke Inkoopvoorwaarden bij IT) is de standaard set inkoopvoorwaarden die Nederlandse gemeenten gebruiken bij IT-aanbestedingen. Ze worden beheerd door de **VNG** (Vereniging van Nederlandse Gemeenten).

Wij adviseren de VNG om de GIBIT-voorwaarden zo aan te passen dat afnemers van open source software verplicht zijn om bij te dragen aan de continuïteit van het platform — ten minste in de vorm van een onderhoudsbijdrage.

### De kern van de aanbeveling

> **Als een gemeente open source software gebruikt én diensten afneemt van een andere partij dan de oorspronkelijke ontwikkelaar, is zij verplicht een onderhoudsbijdrage te betalen aan de organisatie die het platform beheert.**

### Waarom dit logisch is

Wanneer een gemeente diensten afneemt van een derde partij in plaats van de oorspronkelijke ontwikkelaar, profiteert die derde partij van het platform zonder bij te dragen aan het onderhoud. De oorspronkelijke ontwikkelaar draagt de onderhoudslasten maar mist de dienstenomzet.

Het resultaat: de financiering van het platform erodeert naarmate het platform succesvoller wordt. Dat is exact het free-rider probleem dat open source platformsoftware structureel bedreigt.

Een GIBIT-verplichting tot onderhoudsbijdrage lost dit op:

- De gemeente betaalt een kleine bijdrage aan de stichting of het platform-onderhoudsfonds — ongeacht welke leverancier ze kiest voor diensten
- De derde-partij-leverancier kan concurreren op diensten, maar draagt via de gemeente bij aan het platformonderhoud
- De oorspronkelijke ontwikkelaar kan investeren in het platform zonder volledig afhankelijk te zijn van dienstenomzet

```mermaid
flowchart LR
    G["🏘️ Gemeente"]
    PS["🏢 Derde Partij\n(diensten)"]
    S["🏛️ Stichting\n(platformonderhoud)"]

    G -->|"Diensten betalen"| PS
    G -->|"Onderhoudsbijdrage\n(GIBIT-verplichting)"| S
    PS -->|"Gebruikt platform\nzonder onderhoudslasten"| S

    style S fill:#e1f5fe
    style PS fill:#fce4ec
    style G fill:#f1f8e9
```

### Het effect op Model 1

Met een GIBIT-onderhoudsbijdrage wordt Model 1 structureel houdbaarder:

- Derde partijen kunnen concurreren op diensten — dat is goed, het bevordert kwaliteit
- Maar ze kunnen niet meer volledig gratis meeliften op het platform — de gemeente betaalt altijd een bijdrage aan het onderhoud
- De hoogte van die bijdrage kan aansluiten bij de schaal van de gemeente (vergelijkbaar met de licentietabel in Model 2)

In essentie introduceert een GIBIT-verplichting een geformaliseerde continuïteitsbijdrage — de brug tussen Model 1 en Model 2.

### Het effect op adoptie

Een GIBIT-verplichting verlaagt de adoptiedrempel voor open source software in de publieke sector. Gemeenten hoeven niet langer individueel de discussie te voeren over "moet ik bijdragen aan dit platform?" — de verplichting staat in de standaardvoorwaarden die ze toch al hanteren.

Voor gemeenten die al gewend zijn aan de GIBIT, is een onderhoudsbijdrage voor open source software geen nieuwe drempel maar een vertrouwd contractueel element.

---

## Model 3: de VNG-richting

Er is een derde model dat niet van Epistola komt, maar op ons afkomt: centrale aanbesteding door de VNG. Als de VNG namens alle gemeenten aanbesteedt, heeft dat aantrekkelijke eigenschappen — lagere aanbestedingslast, schaalvoordelen — maar ook een structureel risico dat weinig aandacht krijgt: **monopsonie**.

Als de VNG je enige klant is, ben je volledig afhankelijk van één beslissende partij. Niet verlengd? Je verliest al je omzet tegelijk. Innovatie wordt politiek — alles moet door VNG-besluitvorming. En de prijs van je product wordt bepaald door de onderhandelingsmacht van één koper, niet door een markt.

Voor Epistola is het scenario waarbij we het VNG-contract winnen en daarna niets anders meer hebben, structureel gevaarlijker dan kleinschalig maar gediversifieerd beginnen. We willen Model 3 mogelijk maken — maar dan in een variant waarbij de VNG een raamcontract sluit voor meerdere gecertificeerde suppliers, zodat concurrentie behouden blijft.

[→ Lees de volledige analyse van Model 3](/epistola/model-3-centraal-aanbesteed)

---

## De transitie

We verwachten dat de situatie evolueert:

**Nu (Model 1):** Volledig open source, verdienen op diensten. We bouwen het platform, bewijzen de waarde, en verzamelen goodwill bij gemeenten.

**Overgang:** Als het gesprek over platformfinanciering rijp is — ofwel door GIBIT-aanpassing ofwel door groeiende marktkennis bij gemeenten — introduceren we de licentiestructuur van Model 2.

**Later (Model 2):** BSL + ecosysteem. Stichting ontvangt licenties, preferred suppliers concurreren op diensten, ecosysteem groeit zonder incentive-conflict.

**Parallel (Model 3 — mits goed ingericht):** Als de VNG centraal aanbesteedt via een meervoudig raamcontract op basis van open source, kan dat samengaan met Model 2. De stichting certificeert suppliers, de VNG selecteert uit het gecertificeerde aanbod. In dat scenario versterken de modellen elkaar.

De organisatiestructuur (stichting + BV, de afspraken over salaris en focus) is al ingericht voor Model 2. Het licentiemodel kan worden geactiveerd zodra de markt er klaar voor is.

---

## Zie ook

- [Model 1: Open Source + Diensten](/epistola/model-1-open-source)
- [Model 2: BSL + Ecosysteem](/epistola/model-2-bsl-licentie)
- [Model 3: Centraal Aanbesteed](/epistola/model-3-centraal-aanbesteed)
- [Organisatiestructuur](/epistola/organisatiestructuur) — De BV en stichting die alle modellen onderbouwen
- [Financieringsmodellen](/open-source/financieringsmodellen) — De bredere afweging tussen community, licenties en subsidies
