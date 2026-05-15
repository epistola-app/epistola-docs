---
title: De Impact van AI op Open Source Businessmodellen
description: Hoe AI de ontwikkelsnelheid verhoogt, de concurrentie vergroot, en wat dat betekent voor de houdbaarheid van open source businessmodellen
---

Kunstmatige intelligentie verandert de economie van softwareontwikkeling. Voor open source platforms — en voor de businessmodellen die ze in stand houden — heeft dat consequenties die verder gaan dan "we kunnen sneller bouwen."

---

## Wat AI verandert

### Ontwikkelsnelheid stijgt — voor iedereen

AI-assistenten maken het mogelijk om sneller code te schrijven, te begrijpen en te debuggen. Dat geldt voor het team dat het platform bouwt, maar net zo goed voor:

- Concurrenten die een vergelijkbaar platform willen bouwen
- Partijen die een fork willen maken op basis van de vrijgegeven Apache 2.0-code
- Leveranciers die zonder bij te dragen aan het onderhoud diensten willen aanbieden op het platform

De "moat" van complexe, moeilijk te begrijpen code wordt kleiner. Een codebase die vroeger jaren expertise vroeg om te doorgronden, is met AI-hulp sneller leesbaar en uitbreidbaar. Dat verlaagt de toetredingsdrempel voor concurrentie.

### Diensten worden gedemocratiseerd

AI verlaagt de drempel voor het aanbieden van implementatiediensten. Partijen die vroeger niet de expertise hadden om gemeenten te begeleiden bij een Epistola-implementatie, kunnen met AI-ondersteuning sneller tot een acceptabel niveau komen.

Dat is goed nieuws voor de adoptie van het platform — maar het vergroot ook het risico dat diensten worden aangeboden door partijen die niet bijdragen aan het onderhoud van het platform zelf.

### Templategeneratie versnelt

AI kan helpen bij het genereren van documenttemplates. Gemeenten die zelf templates willen maken of aanpassen, kunnen met AI-hulp sneller resultaat bereiken. Dat is een voordeel voor adoptie.

Tegelijkertijd: de kwaliteitscontrole, toegankelijkheidstoets en versie-compatibiliteitsvalidatie van die templates worden niet overbodig — ze worden juist belangrijker. AI genereert sneller meer output; menselijke validatie van die output blijft noodzakelijk. Dat is precies waar de diensten van preferred suppliers waarde toevoegen.

---

## Wat AI niet verandert

### De noodzaak van platform-onderhoud

Een platform heeft onderhoud nodig: security patches, architectuurkeuzes, compatibiliteitsborging bij nieuwe versies, governance van bijdragen. AI maakt dit werk sneller, maar niet overbodig. En het lost de economische vraag niet op: **wie betaalt voor dit onderhoud?**

AI verlaagt de kosten van uitvoering, maar de vraag wie het onderhoudt en wie daarvoor verantwoordelijkheid neemt, blijft structureel.

### De waarde van domeinkennis

Wat AI niet eenvoudig vervangt, is diep begrip van het probleemdomein: hoe werken Nederlandse gemeentelijke processen, wat zijn de eisen aan toegankelijkheid van overheidsdocumenten, hoe functioneert de aanbestedingspraktijk. Die kennis zit niet in de code — ze zit in de mensen die jarenlang met dat domein werken.

Dienstverleners die die kennis hebben opgebouwd, behouden een reëel concurrentievoordeel — ook in een wereld waar AI de basisimplementatie versnelt.

### Switching costs voor bestaande gebruikers

AI maakt het goedkoper om software te **bouwen**, niet om over te **stappen**. Voor een gemeente die al een systeem in productie heeft, omvat overstappen veel meer dan "een ander platform installeren":

- **Data-migratie** — bestaande documenten, templates en metadata moeten worden geconverteerd; vaak met inhoudelijke validatie van conversie-resultaten
- **Template-migratie** — soms honderden templates die opnieuw gevalideerd, getest en gepubliceerd moeten worden
- **Integraties opnieuw inrichten** — koppelingen met zaakgericht werken, DigiD, archivering, ESB-routes; allemaal opnieuw configureren en doortesten
- **Training & change management** — medewerkers omscholen, processen bijstellen, instructies bijwerken
- **Contractuele afhandeling** — bestaande contracten ontbinden, juridische review van het nieuwe contract, aanbestedingstraject doorlopen
- **Tijdelijke dubbele kosten** — periode waarin oude én nieuwe systeem parallel draaien

Bij elkaar lopen die kosten makkelijk op tot meerdere malen de jaarlijkse licentiekosten. Dat creëert een **economische lock-in** die los staat van de technische of contractuele lock-in: zelfs als de software open source is en het contract netjes opzegbaar, is overstappen zelden economisch aantrekkelijk binnen één begrotingscyclus.

**Twee implicaties:**

1. **Voor de BV (en andere preferred suppliers)** — switching costs beschermen de zittende leverancier tegen AI-gedreven nieuwe concurrenten die het platform "even snel" kunnen reproduceren. De relatie met de klant is daarom een reële moat, los van de code-moat die AI uitholt.

2. **Voor gemeenten die nu op een propriëtaire oplossing zitten** — switching costs zijn ook het tegenovergestelde van een feature: ze maken vendor lock-in een dagelijkse realiteit, ongeacht of de leverancier zich misdraagt. Het platform-ontwerp dat anti-lock-in als kerneigenschap heeft (open source na 1 jaar, meerdere preferred suppliers, gestandaardiseerde data-portabiliteit) blijft daarom waardevol — niet alleen tegen toekomstige overstap, maar als blijvende garantie dat de overstap *technisch en contractueel* mogelijk is, wat de operationele kosten ook zijn.

---

## Consequenties voor open source businessmodellen

### Het free-rider probleem vergroot

Als AI het makkelijker maakt om platform-diensten aan te bieden zonder bij te dragen aan het onderhoud, neemt het free-rider probleem toe. Meer partijen kunnen profiteren van het platform zonder de onderhoudslasten te dragen.

Dat versterkt het argument voor een expliciete bijdragestructuur — via licenties, continuïteitsbijdragen of geformaliseerde upstream-verplichtingen. Een model dat draait op de goodwill van bijdragers, wordt fragieler naarmate AI de drempel voor free-riding verlaagt.

### De code-moat vervalt sneller

Vroeger was complexe, goed ontworpen code een competitief voordeel: concurrenten moesten jaren investeren om een vergelijkbaar platform te bouwen. Met AI wordt die investering kleiner. Het voordeel verschuift van "wie heeft de beste code" naar "wie heeft het beste netwerk, het beste vertrouwen, de beste domeinkennis, de beste governance."

Dat is een verschuiving die steward ownership structureel beter positioneert dan commercieel eigenaarschap: vertrouwen en governancekwaliteit zijn moeilijker te kopiëren dan code.

### De 20 FTE-grens blijft relevant — maar betekent meer

Met AI kan een team van 20 mensen effectief meer werk verzetten dan voorheen. De absolute grens op omvang is niet minder zinvol geworden — maar de productiviteit per persoon stijgt. Dat betekent dat het kostenplafond van de BV (20x max salaris + overhead) ook bij groeiende platformcomplexiteit houdbaar blijft.

---

## Wat dit betekent voor de licentie-vs-diensten afweging

AI vergroot de urgentie van de vraag die in [Epistola Organisatiestructuur](/epistola/organisatiestructuur) wordt gesteld: als diensten de primaire financieringsbron zijn, maar AI de toetredingsdrempel voor concurrerende diensten verlaagt — hoe lang is het dienstenmodel dan houdbaar?

Er zijn twee scenario's:

**Scenario A: diensten blijven de basis**
De BV biedt diensten die AI-tools niet eenvoudig vervangen: domeinkennis, kwaliteitsborging, governance-expertise, vertrouwensrelaties met gemeenten. AI versnelt het werk maar de waarde zit in de context, niet in de uitvoering. Het dienstenmodel blijft houdbaar.

**Scenario B: AI commoditiseert de diensten**
Als AI de diensten zelf goedkoop en generiek maakt, en concurrenten die diensten aanbieden zonder onderhoudslasten, dan verslechtert de positie van de BV structureel. In dat geval wordt het licentiemodel niet een ideologische keuze maar een economische noodzaak: de stichting heeft een inkomstenstroom nodig die niet afhankelijk is van een concurrentiegevoelig dienstenmarkt.

De conclusie: AI maakt het argument voor een sterke stichting met eigendomsrechten, stewardship en — indien nodig — een licentiemodel juist sterker, niet zwakker.

---

## Zie ook

- [Financieringsmodellen](/open-source/financieringsmodellen) — De drie basisopties voor open source financiering, inclusief de structurele zwakte van het dienstenmodel
- [Epistola Organisatiestructuur](/epistola/organisatiestructuur) — Hoe Epistola het licentie-vs-diensten vraagstuk aanpakt
- [Modelkeuze & Transitiestrategie](/epistola/modelkeuze) — De GIBIT-aanbeveling voor een continuïteitsbijdrage
