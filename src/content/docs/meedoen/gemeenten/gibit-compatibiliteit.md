---
title: GIBIT-compatibiliteit van Model 1 en Model 2
description: Per relevante GIBIT-clausule een analyse van hoe Epistola's twee primaire modellen passen binnen de bestaande gemeentelijke inkoopvoorwaarden
---

De **GIBIT** (Gemeentelijke Inkoopvoorwaarden bij IT) is de standaard set voorwaarden die Nederlandse gemeenten hanteren bij IT-aanbestedingen. Voor een gemeente die Epistola wil inkopen is de vraag: past dit binnen onze standaardkaders, of moeten er aanpassingen worden gemaakt?

Deze pagina behandelt die vraag per relevante clausule, voor beide primaire modellen. Het is geen juridisch advies — gebruik dit als startpunt voor je eigen jurist of inkoopadviseur.

---

## Welke GIBIT-clausules zijn relevant?

Voor platformsoftware met een open source-fundament zijn vooral deze thema's belangrijk:

| Thema | Wat de GIBIT erover zegt |
|---|---|
| **Intellectueel eigendom** | De afnemer wil duidelijkheid over wie de rechten heeft op code, configuratie en data, en welke gebruiksrechten worden verleend |
| **Broncode-escrow** | Bij propriëtaire software gangbaar: borging dat de broncode beschikbaar komt bij faillissement van de leverancier |
| **Open source software** | Specifieke bepalingen over licenties, afhankelijkheden en aansprakelijkheid bij OSS-componenten |
| **Beëindiging & exit** | Wat er gebeurt bij contracteinde: data-overdracht, kennisoverdracht, transitieperiode |
| **Gegevensportabiliteit** | Recht op export van data in een bruikbaar formaat |
| **Vermijden van leveranciersafhankelijkheid** | Geen lock-in op één partij; mogelijkheid tot wisselen |
| **Aansprakelijkheid & garanties** | Wie staat in voor werking, veiligheid en compliance |

---

## Model 1 — volledig open source + diensten

In dit model is de software vanaf dag 1 onder een OSI-erkende open source licentie. De gemeente contracteert een dienstverlener voor implementatie, hosting en support.

### Intellectueel eigendom

De broncode is publiek en valt onder een open source licentie. De gemeente verkrijgt via die licentie een gebruiksrecht zonder dat er een aparte IP-overeenkomst met een leverancier nodig is. Maatwerk dat de gemeente specifiek laat ontwikkelen blijft contractueel hun eigendom, met de afspraak dat verbeteringen aan het platform upstream worden bijgedragen.

**Verhouding tot GIBIT:** Past zonder aanpassing. Open source-bepalingen in de GIBIT (over toegestane licenties, vermelding van componenten, etc.) zijn direct toepasbaar.

### Broncode-escrow

**Niet nodig.** Escrow is bedoeld als noodvoorziening voor propriëtaire software. Bij open source is de broncode al publiek beschikbaar — escrow voegt niets toe.

**Verhouding tot GIBIT:** Aanbestedingstekst kan de escrow-eis vervangen door een vermelding dat de broncode publiek beschikbaar is onder [licentie X] op [URL].

### Open source software

Dit is het hoofdkenmerk van het model. Alle voorwaarden uit GIBIT rondom open source (vermelding van licenties, aansprakelijkheid bij vrije software, etc.) zijn direct relevant.

**Verhouding tot GIBIT:** Volledig binnen het bestaande kader.

### Beëindiging & exit

Bij contracteinde levert de dienstverlener de gemeente-data en configuratie terug volgens afgesproken formaten. Omdat de software open source is, kan een andere dienstverlener of de gemeente zelf de exploitatie overnemen zonder licentiehindernis.

**Verhouding tot GIBIT:** Past binnen reguliere exit-clausules. De afwezigheid van licentiehindernissen is een sterk argument bij de risicoanalyse.

### Gegevensportabiliteit

De afnemer behoudt eigenaarschap van data. Export-functionaliteit en data-formaten zijn contractueel vast te leggen met de dienstverlener; de software zelf legt geen beperkingen op.

**Verhouding tot GIBIT:** Standaard data-portabiliteit-eisen volstaan.

### Leveranciersafhankelijkheid

Per definitie laag: meerdere dienstverleners kunnen het platform exploiteren. Een gemeente kan tussen suppliers wisselen zonder de software te wijzigen.

**Verhouding tot GIBIT:** Sterk anti-lock-in profiel. De aanbestedingstekst kan dit expliciet maken als gewenste eigenschap.

### Aansprakelijkheid

De dienstverlener is aansprakelijk voor zijn dienstverlening; de stichting (eigenaar van het IP) is geen contractpartij van de gemeente en draagt geen contractuele aansprakelijkheid voor exploitatie.

**Verhouding tot GIBIT:** Standaard aansprakelijkheidsclausules met de supplier volstaan.

### Conclusie Model 1

**Sterk compatibel.** Geen aanpassingen aan de GIBIT nodig; in tegendeel — het model speelt expliciet in op de GIBIT-doelen rond open standaarden, anti-lock-in en data-eigenaarschap.

---

## Model 2 — BSL + ecosysteem

In dit model is de software onder een **Business Source License** (BSL): broncode publiek inzichtelijk, commercieel gebruik vereist een licentie tot één jaar na release. Na de change date wordt elke versie automatisch Apache 2.0 (volledig open source). De gemeente contracteert een gecertificeerde preferred supplier die licentie + diensten in één offerte aanbiedt.

### Intellectueel eigendom

De broncode is publiek inzichtelijk. Het IP ligt bij de stichting, die de licentie uitgeeft. De gemeente koopt via haar preferred supplier een gebruiksrecht; de supplier draagt de licentie-afdracht door naar de stichting. Dit is een driehoeksverhouding, maar contractueel houdt de gemeente één tegenpartij: haar supplier.

**Verhouding tot GIBIT:** Past binnen het kader, maar vraagt expliciete toelichting in de aanbesteding. De BSL is geen OSI-erkende open source licentie (omdat ze tijdelijk commercieel beperkt is). Gemeenten die in hun aanbestedingen onderscheid maken tussen "open source" en "commerciële licentie" moeten dit punt expliciet adresseren — bijvoorbeeld via een aparte categorie "**source-available met geborgde overgang naar open source**".

### Broncode-escrow

**Niet nodig.** De broncode is publiek inzichtelijk vanaf dag 1, en wordt automatisch Apache 2.0 één jaar na elke release. Statutaire borging zorgt dat bij ontbinding van de stichting de gehele code per direct overgaat naar Apache 2.0. Er is geen scenario waarin de afnemer zonder broncode komt te zitten.

**Verhouding tot GIBIT:** Aanbestedingstekst kan de escrow-eis vervangen door (a) verwijzing naar de publieke broncode-vindplaats, (b) toelichting op de change date als juridische escrow-equivalent, en (c) verwijzing naar de statutaire ontbindingsclausule.

### Open source software

De BSL is geen open source per OSI-definitie, maar wordt het automatisch na één jaar. Voor afhankelijkheden (libraries, frameworks) die de software intern gebruikt gelden hun eigen licenties — daarvoor zijn de reguliere GIBIT-bepalingen direct toepasbaar.

**Verhouding tot GIBIT:** Een gemeente die in haar aanbesteding alleen OSI-erkende licenties accepteert, moet die formulering verruimen tot "open source of source-available met geborgde overgang naar open source binnen [12 maanden]". Dit is een toevoeging, geen conflict.

### Beëindiging & exit

Identiek aan Model 1: data en configuratie blijven van de gemeente; een andere supplier kan het overnemen omdat het platform onder publieke (eventueel BSL) licentie staat. De gemeente kan, als ze dat wenst, overstappen op een eerder uitgebrachte Apache 2.0-versie (alles ouder dan één jaar) zonder licentiebezwaar.

**Verhouding tot GIBIT:** Past binnen reguliere exit-clausules. Voeg toe: bij contracteinde behoudt de gemeente toegang tot de op dat moment beschikbare versies (BSL én Apache 2.0 versies).

### Gegevensportabiliteit

Identiek aan Model 1. De stichting verplicht preferred suppliers via de certificering tot gestandaardiseerde export-functionaliteit.

**Verhouding tot GIBIT:** Standaard data-portabiliteit-eisen volstaan, met een sterkere garantie omdat de certificeringsplicht supplier-overstijgend is.

### Leveranciersafhankelijkheid

Lager dan in een propriëtair model, maar iets hoger dan in Model 1 zolang de software nog onder BSL valt:

- Tijdens BSL-periode (jaar 1): commerciële exploitatie vereist een licentie, dus alleen gecertificeerde preferred suppliers kunnen dienstverlenen
- Na change date (Apache 2.0): elke partij mag exploiteren

De gemeente kan binnen het ecosysteem altijd wisselen tussen gecertificeerde preferred suppliers. En de mogelijkheid om volledig over te stappen naar een eerdere Apache 2.0-versie blijft bestaan.

**Verhouding tot GIBIT:** De aanbestedingstekst kan vragen om aantonen van het meervoudige-supplier-ecosysteem en de change date als anti-lock-in waarborg.

### Aansprakelijkheid

Identiek aan Model 1: supplier is aansprakelijk voor dienstverlening; stichting draagt geen exploitatie-aansprakelijkheid.

---

### Conclusie Model 2

**Compatibel, met expliciete toelichting.** De BSL-categorie vraagt om aanpassing van standaardformuleringen (van "open source" naar "open source of source-available met geborgde overgang"). Geen blokker, wel een gespreksonderwerp voor de gemeente-jurist.

---

## Vergelijkingsoverzicht

| Clausule | Model 1 | Model 2 |
|---|---|---|
| Intellectueel eigendom | Geen issue | Driehoeksverhouding via supplier; toelichten |
| Broncode-escrow | Niet nodig (publiek) | Niet nodig (publiek + change date) |
| Open source-bepalingen | Direct toepasbaar | "Source-available met overgang" categorie nodig |
| Beëindiging & exit | Standaard | Standaard + verwijzing naar publiek beschikbare versies |
| Gegevensportabiliteit | Standaard | Standaard + certificeringsgarantie |
| Anti-lock-in | Sterk | Sterk (na change date), gemiddeld tijdens BSL |
| Aansprakelijkheid | Standaard met supplier | Standaard met supplier |

---

## Aanbevolen formuleringen voor aanbestedingen

### Eis aan licentie/openheid van de software (geschikt voor beide modellen)

> De aangeboden software is beschikbaar onder een open source licentie zoals erkend door het Open Source Initiative, óf onder een source-available licentie met een statutair geborgde overgang naar een open source licentie binnen 12 maanden na elke release.

### Vraag aan de broncode

> De inschrijver toont aan dat de broncode van het kernsysteem publiek inzichtelijk is en welke licentie van toepassing is. Een traditionele broncode-escrow-regeling is niet vereist mits de broncode publiek beschikbaar is.

### Eis aan anti-lock-in

> De inschrijver toont aan dat de gemeente bij contracteinde kan overstappen op een andere dienstverlener of zelf de exploitatie kan voortzetten, zonder licentiebelemmering en met data-export in een gangbaar, machineleesbaar formaat.

### Eis aan ecosysteem (specifiek voor Model 2)

> Voor source-available licenties met meerdere gecertificeerde leveranciers toont de inschrijver aan dat er ten minste twee onafhankelijke partijen gecertificeerd zijn om diensten te leveren, en dat een wissel tussen leveranciers contractueel mogelijk is.

---

## Relatie tot onze aanbeveling om de GIBIT aan te passen

Beide modellen zijn compatibel met de **huidige** GIBIT. Onze aanbeveling om de GIBIT aan te passen ([zie modelkeuze](/epistola/modelkeuze#aanbeveling-aan-de-vng-pas-de-gibit-aan)) gaat niet over compatibiliteit — het gaat over een nieuwe verplichting tot continuïteitsbijdrage die het free-rider-probleem structureel oplost. Die aanpassing is wenselijk voor de duurzaamheid van het platform, niet noodzakelijk voor adoptie.

Met andere woorden: een gemeente kan vandaag al aanbesteden onder de huidige GIBIT, voor zowel Model 1 als Model 2. De voorgestelde aanpassing maakt het ecosysteem stabieler, niet juridisch toegankelijker.

---

## Zie ook

- [Aanbestedingen](/meedoen/gemeenten/aanbestedingen) — Algemene rol van Epistola in aanbestedingsprocedures
- [Modelkeuze & Transitie](/epistola/modelkeuze) — De aanbeveling om de GIBIT aan te passen
- [Model 1: Open Source + Diensten](/epistola/model-1-open-source)
- [Model 2: BSL + Ecosysteem](/epistola/model-2-bsl-licentie)
- [BSL Licentie (referentie)](/referentie/bsl-licentie) — Hoe de change date werkt
