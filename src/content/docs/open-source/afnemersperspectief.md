---
title: Afnemersperspectief
description: Welke belangen spelen er bij gemeenten, leveranciers en andere betrokkenen — en hoe beoordeel je een open source platform op betrouwbaarheid
---

Een gemeente die een platform voor documentgeneratie wil aanschaffen, weegt meer dan alleen de prijs en de functionaliteit. Ze weegt continuïteit, betrouwbaarheid, politieke risico's en de vraag of ze over vijf jaar nog even vrij zijn als vandaag. Dit hoofdstuk beschrijft de belangen van de verschillende betrokkenen — en wat een platform betrouwbaar maakt vanuit elk perspectief.

---

## De gemeente als afnemer

### Totale eigendomskosten

De aanschafprijs is zelden het echte getal. Gemeenten die een documentgeneratieoplossing inkopen, kijken naar:

- **Licentiekosten** — jaarlijks, over de looptijd van het contract
- **Implementatiekosten** — inrichting, migratie van bestaande templates, training
- **Beheerkosten** — wie onderhoudt de templates, wie doet de updates?
- **Switching costs** — hoe duur is het om ooit te vertrekken?

Een propriëtaire oplossing kan goedkoop lijken in jaar één en duur worden in jaar vijf, als switching costs zo hoog zijn opgelopen dat vertrekken geen reële optie meer is.

### Lock-in: twee vormen

Lock-in bij software heeft twee vormen die gemeenten moeten onderscheiden:

**Technische lock-in** — de data, templates en configuraties zijn zo diep verweven met één leverancier dat overstappen technisch complex is. Open source mitigeert dit: de code is beschikbaar, formats zijn openbaar, export is mogelijk.

**Commerciële lock-in** — de contractuele of financiële kosten van overstappen zijn zo hoog dat vertrekken onpraktisch is, ook als het technisch zou kunnen. Een propriëtaire leverancier heeft een commercieel belang bij het maximaliseren van deze kosten.

Bij een goed gestructureerd open source platform met meerdere leveranciers is technische lock-in laag en commerciële lock-in beperkt: als de ene preferred supplier ontevreden maakt, kan een andere worden gekozen zonder het platform te verlaten.

### Betrouwbaarheid van de leverancier

Gemeenten tekenen contracten voor meerdere jaren. Ze willen weten: bestaat dit bedrijf over vijf jaar nog? Heeft het dan nog dezelfde focus? Is het dan nog betaalbaar?

Bij een for-profit leverancier zijn dit reële vragen. Een overname, een pivot, een faillissement — elk scenario leidt tot contractuele complicaties voor de gemeente. Bij een steward-owned platform is de continuïteit structureler geborgd: het platform is niet afhankelijk van één eigenaar, en de code is in elk scenario beschikbaar via Apache 2.0.

---

## Het 'afpersings'-scenario

Er is een patroon dat terugkeert in de software-industrie: een leverancier bouwt een grote gebruikersbasis op, vervolgens veranderen de voorwaarden fundamenteel.

**Unity (2023)**: de spelengine hief een runtime fee per installatie, ook voor al gepubliceerde games. Developers die jarenlang in Unity hadden geïnvesteerd konden niet zomaar overstappen — de switching costs waren te hoog.

**HashiCorp (2023)**: Terraform, jarenlang het standaard platform voor infrastructure-as-code, stapte over van een open source licentie naar de Business Source License. Grote delen van het ecosysteem konden niet langer vrij gebruik maken van de nieuwste versies.

**Elastic (2021)**: vergelijkbare stap, waarbij het bedrijf de licentie aanscherpte nadat AWS dezelfde software als managed service was gaan aanbieden.

In elk geval: organisaties die afhankelijk waren geworden van het platform, werden geconfronteerd met nieuwe spelregels die ze niet hadden voorzien. De gemeenschappelijke deler: één eigenaar die de voorwaarden unilateraal kon wijzigen.

:::note[Waarom dit bij steward ownership anders is]
Bij een steward-owned platform kan geen enkele partij de voorwaarden unilateraal wijzigen. Licentiewijzigingen vereisen goedkeuring van een meerderheid van het bestuur én instemmingsrecht van de stewards. De stichting kan niet worden overgenomen. En de BSL change date — het moment waarop code vrij wordt — is statutair vastgelegd en onherroepelijk.
:::

---

## De leverancier als betrokkene

Preferred suppliers hebben andere belangen dan gemeenten, maar ze zijn ook gebaat bij een eerlijk platform.

**Markttoegang** — een leverancier wil kunnen toetreden tot de markt zonder ongelijke concurrentie. Als één partij zowel het platform beheert als de meeste diensten levert, is het speelveld scheef. Een steward-owned model met gescheiden eigendom en uitvoering borgt eerlijke markttoegang.

**Duidelijke spelregels** — leveranciers investeren in expertise en capaciteit rondom het platform. Ze willen weten dat de spelregels stabiel zijn: dat certificeringseisen niet plotseling veranderen, dat de roadmap transparant is, dat licentievoorwaarden niet worden aangescherpt na adoptie.

**Ecosysteemwaarde** — hoe meer leveranciers het platform serieus nemen, hoe groter de markt voor iedereen. Een gezond ecosysteem trekt nieuwe klanten die anders niet hadden gekozen voor dit platform. Leverage uit het collectief.

---

## Wat maakt een platform betrouwbaar?

Vanuit het perspectief van zowel gemeenten als leveranciers zijn er vier factoren die een platform betrouwbaar maken:

### 1. Open code

Als de broncode publiek beschikbaar is, kan iedereen onafhankelijk beoordelen wat het platform doet. Geen verborgen dataverzameling, geen geheime afhankelijkheden, geen zwarte dozen. Voor overheden die verantwoording moeten afleggen aan burgers, is dit een basiseis.

### 2. Governance

Wie beslist over de roadmap? Wie bepaalt welke features prioriteit krijgen? Wie bewaakt de kwaliteitsnormen? Een platform zonder transparante governance is afhankelijk van de goodwill van één eigenaar. Een platform met formele governance — een stichting, stewards, een publiek besluitvormingsproces — is duurzamer.

### 3. Meerdere leveranciers

Als één leverancier de enige optie is voor ondersteuning, training en implementatie, is er feitelijk sprake van monopolie — ook als de software open source is. Meerdere gecertificeerde preferred suppliers creëren een markt: gemeenten kunnen kiezen, leveranciers moeten concurreren op kwaliteit en prijs.

### 4. Financiële transparantie

Een platform waarvan de eigenaar transparant is over kosten, prijsstelling en hoe inkomsten worden besteed, geeft afnemers een eerlijker beeld. Transparantie over de financiële structuur maakt het ook minder waarschijnlijk dat prijzen plotseling stijgen — er is immers geen verborgen marge om te maximaliseren.

---

## Zie ook

- [Financieringsmodellen](/open-source/financieringsmodellen) — Hoe een platform structureel gefinancierd kan worden
- [Missiegedreven & Steward Ownership](/organisatiestructuur/steward-ownership) — Hoe eigenaarschap en governance betrouwbaarheid borgen
- [Epistola: Model 2 — BSL + Ecosysteem](/epistola/model-2-bsl-licentie) — Hoe Epistola concreet omgaat met deze belangen
