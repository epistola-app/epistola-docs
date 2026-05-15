---
title: Model 1 — Open Source + Diensten
description: Wat er gebeurt als Epistola volledig open source is en uitsluitend verdient op diensten — inclusief het structurele ecosysteem-incentive-conflict
---

In dit model is Epistola volledig open source: de code is vrij beschikbaar, zonder licentievereiste. De financiering komt uitsluitend uit diensten — expertise die de BV aanbiedt rondom het platform.

Dit is het model waar veel open source bedrijven mee beginnen. Het klinkt schoon: geen licentiedrempel, maximale adoptie, de waarde zit in de kennis niet in de code.

Maar er is een structureel probleem dat zich pas later manifesteert.

---

## De diensten

In dit model verdient Epistola BV op:

- **Template kwaliteitscheck** — audit van bestaande documenten op toegankelijkheid, huisstijl en technische correctheid
- **Versie-compatibiliteitsvalidatie** — testen of bestaande templates werken na een platformupdate
- **Implementatie & migratie** — begeleiden van gemeenten bij onboarding en overstap
- **Training** — opleiden van functioneel beheerders, redacteuren en ICT-medewerkers
- **Maatwerk ontwikkeling** — specifieke integraties en uitbreidingen, code gaat upstream
- **Advies** — aanbestedingsondersteuning en architectuuradvies

Deze diensten zijn reëel waardevol. Gemeenten betalen er graag voor als de kwaliteit klopt. En in het begin — als Epistola de enige partij is die het platform door en door kent — is dit een houdbaar model.

---

## Het ecosysteem-incentive-conflict

Het probleem ontstaat als het platform succesvol wordt en andere partijen ook diensten willen aanbieden.

Stel: Supplier X wil template kwaliteitschecks aanbieden aan gemeenten. Ze vragen Epistola BV om:
- Documentatie over de kwaliteitscriteria
- API-toegang tot de validatietooling
- Certificering als erkend template-auditor

**Wat is de rationele reactie van Epistola BV?**

Ze hebben geen belang bij goede antwoorden. Elke gemeente die haar template QA bij Supplier X afneemt, neemt die bij Epistola BV *niet* af. Goede documentatie, open APIs en derde-partij-certificering schaden direct de eigen omzet.

Dit is niet malicieus — het is structureel. Elk besluit dat het ecosysteem versterkt, schaadt de dienstenomzet van Epistola BV. En omdat de BV van die dienstenomzet moet leven, zijn dit ook de besluiten die intern worden uitgesteld, ondergeprioriteerd of afgewimpeld.

---

## Hoe dit in de praktijk uitpakt

### Gedrag op productniveau

Features die Epistola's eigen diensten ondersteunen, krijgen prioriteit. Features die derde partijen helpen, worden uitgesteld.

- Een zelfservice-onboarding tool die gemeenten zelf kunnen gebruiken? Verlaagt de vraag naar implementatiebegeleiding — geen prioriteit.
- Uitgebreide API-documentatie die derden kunnen gebruiken voor maatwerk? Maakt de maatwerk-dienst van Epistola minder exclusief — geen prioriteit.
- Een open template-validatiestandaard die iedereen kan implementeren? Maakt de template QA-dienst commoditair — geen prioriteit.

### Gedrag op ecosysteemniveau

Epistola BV heeft geen rationele prikkel om het ecosysteem van preferred suppliers te laten groeien — zeker niet in de diensten-ruimte die ze zelf bezet.

Certificering van concurrerende template-auditors? Wordt traag of nooit gedaan.

Uitnodiging aan derde partijen om te concurreren op implementatie? Wordt strategisch vermeden.

Open standaarden die derden in staat stellen te integreren? Blijven "op de roadmap" staan zonder concrete uitvoering.

### Wat er uiteindelijk gebeurt

**Scenario A: het ecosysteem ontwikkelt zich niet.**

Epistola BV is de dominante of enige serieuze dienstverlener. Dat betekent: weinig concurrentie, weinig kwaliteitsprikkel, beperkte adoptie. Het platform blijft niche omdat er geen ecosysteem is dat het draagt.

**Scenario B: het ecosysteem ontwikkelt zich ondanks Epistola.**

Andere partijen beginnen diensten aan te bieden, gebruikmakend van de open code, zonder Epistola's hulp. Ze onderbieden Epistola op prijs — ze dragen immers geen onderhoudslast. Epistola's dienstenomzet daalt. De financiering van het platform staat onder druk. Uiteindelijk wordt het model onhoudbaar.

In beide scenario's faalt het model op de langere termijn.

---

## Waarom dit patroon zo vaak voorkomt

Dit is geen Epistola-specifiek risico. Het is het standaardpatroon van open source bedrijven die op diensten draaien.

HashiCorp bouwde Terraform als open source tool, verdienend op trainingen en enterprise features. Toen AWS Terraform-diensten begon aan te bieden zonder bij te dragen, reageerde HashiCorp met een restrictievere licentie (BSL). Het ecosysteem forkte: OpenTofu werd onder de Linux Foundation gebracht op basis van de laatste Apache 2.0-versie.

Elastic bouwde een bloeiend open source ecosysteem rondom Elasticsearch — totdat AWS dat ecosysteem exploiteerde via managed services. Elastic scherpte de licentie aan. Het ecosysteem werd kleiner en minder vertrouwen.

In elk geval: het dienstenmodel werkte zolang er geen groot ecosysteem was dat kon meeliftend. Zodra het platform succesvol genoeg werd om aantrekkelijk te zijn voor anderen, klapte het model in.

---

## Wanneer werkt Model 1 wél?

Model 1 kan werken als:

- Het platform zo gespecialiseerd is dat derde partijen de expertise niet kunnen opbouwen — tijdelijk voordeel
- De BV bewust klein blijft en niet probeert een ecosysteem te bouwen
- Er geen concurrentie is op diensten vanuit de open source code — onwaarschijnlijk als het platform succesvol is

Voor Epistola — met de ambitie om alle 300+ Nederlandse gemeenten te bedienen en een gezond ecosysteem van leveranciers te bouwen — is Model 1 structureel ongeschikt. Niet omdat het onethisch is, maar omdat de incentives verkeerd liggen.

---

## GIBIT-compatibiliteit

**Volledig compatibel.** De software is een OSI-erkende open source licentie; standaard GIBIT-clausules over open source software en data-portabiliteit zijn direct toepasbaar. Geen aanpassingen aan de aanbestedingstekst nodig.

[→ Volledige analyse per clausule](/meedoen/gemeenten/gibit-compatibiliteit#model-1--volledig-open-source--diensten)

---

## Zie ook

- [Model 2: BSL + Ecosysteem](/epistola/model-2-bsl-licentie) — Hoe de licentie het incentive-conflict oplost
- [Organisatiestructuur](/epistola/organisatiestructuur) — De BV-stichting structuur die beide modellen onderbouwt
- [Financieringsmodellen](/open-source/financieringsmodellen) — De brede afweging tussen community, licenties en subsidies
