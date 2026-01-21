---
title: Veelgestelde Vragen
description: Antwoorden op alle vragen over kosten, contracten en risico's
---

## Wat is Epistola?

Epistola is een open platform voor digitale documentgeneratie en -beheer. Het helpt gemeenten
op een veilige, standaard manier documenten (brieven, vergunningen, oproepingen) aan burgers
en bedrijven te genereren en uit te sturen.

Kernpunten:
- **Open source** (na 1 jaar) – geen leverancierslocking
- **Eigendom onafhankelijke stichting** – niet van één leverancier
- **Betaalbaar** – prijzen schalen met gemeentegrootte
- **Meerdere leveranciers** – jij kiest wie je vertrouwt
- **Onbeperkt documentvolume** – geen extra kosten per brief/document

---

## 1. Met wie sluit ik een contract?

Jouw gemeente sluit een contract met een **preferred supplier** (commerciële dienstverlener).
De stichting levert geen diensten en is geen contractpartij.

Je supplier is volledig verantwoordelijk voor:
- SLA (uptime-garanties)
- Support en incident handling
- Hosting/infrastructure
- Implementatie
- Training

Je hebt **één contact, één contract, één factuur**.

---

## 2. Wat kost het?

Epistola-licentiekosten volgen **gemeenteschaal (inwoners)**, niet gebruikerszantal.
Aantal documenten/brieven speelt geen rol (onbeperkt).

| Gemeentegrootte | Inwoners | Licentie/jaar |
|---|---|---|
| Micro | < 5k | €2.000 |
| Zeer klein | 5–10k | €3.000 |
| Klein | 10–20k | €4.500 |
| Mid | 35–60k | €8.000 |
| Groot | 100–150k | €15.000 |
| Zeer groot | 250k+ | €30.000 |

**Praktijkvoorbeelden:**
- Gemeente 10k inwoners: **€3.000/jaar** licentie
- Gemeente 50k inwoners: **€8.000/jaar** licentie
- Gemeente 150k inwoners: **€15.000/jaar** licentie

**Schaalvoordelen:** Bij 10+ gemeentes dalen alle prijzen met 5–10%.

---

## 3. Wat betaal ik precies?

Je supplier factureert:

| Component | Wie bepaalt | Prijs |
|---|---|---|
| **Licentie** | Stichting | €3–15k (afhankelijk gemeente) |
| **SLA/LCM** | Supplier | Vrije markt (~€20–40k) |
| **Hosting** | Supplier | Vrije markt (~€10–30k) |
| **Support/Training** | Supplier | Vrije markt (variabel) |
| **Custom features** | Supplier (betaald door jou) | Vrije markt (optioneel) |

**Meer informatie:** Zie [SLA Niveaus](/referentie/sla-niveaus) voor details over wat je per niveau krijgt.

**Voorbeeld gemeente 50k inwoners:**
- Licentie: €8.000
- SLA/hosting: €30.000 (supplier bepaalt)
- Support/training: €5.000
- **Totaal: €43.000/jaar**

Je betaalt **niet** rechtstreeks aan stichting. Supplier draagt licentiekosten af.

---

## 4. Is er vendor lock-in?

**Nee.** Dit is structureel geborgd:

- De software is **eigendom van Stichting Epistola**, niet je supplier
- Na 1 jaar: volledig open source (Apache 2.0) – iedereen kan het gebruiken
- Je data is van jou – geen exploitatie door supplier
- Je kunt naar ander supplier overstappen zonder data-verlies
- Stichting borgt data-portability (API's, exports, documentatie)

**Resultaat:** Je supplier kan je niet gijzelen.

**Lees meer:** [Waarom Dit Model](/introductie/waarom-dit-model) legt uit waarom vendor lock-in zo schadelijk is en hoe Epistola dit structureel oplost.

---

## 5. En de licentie – open bron of open source?

**Jaar 1–2: Open bron (BSL-licentie)**
- Code is inzichtelijk en toegankelijk
- Regie op kwaliteit en veiligheid
- Dit financieert het steward-team

**Jaar 2+: Volledig open source (Apache 2.0)**
- Iedereen mag code gebruiken, aanpassen, zelf hosten
- Je supplier voegt waarde toe via service, niet exclusieve code

**Voor jou:** Je hebt altijd toegang, geen discontinuïteitsvrees.

---

## 6. Wie beheert de software en de architectuur?

**Stichting Epistola** beheert:
- Broncode en architectuurprincipes
- Licentie en compliance
- Roadmap-prioriteiten (wat mag, wat niet)
- Certificering van suppliers (kwaliteit, security)

**Suppliers bouwen** alle features, SLA, hosting onder architectuur-regie stichting.

Stichting is **geen** leverancier – zij doet geen development, support, of SLA.

---

## 7. Wat als mijn supplier stopt of failliert?

**Epistola blijft bestaan.** Structureel geborgd:

1. Software blijft eigendom stichting
2. Je data blijft van jou
3. Andere supplier kan intrede doen (overstap zonder data-verlies)
4. Na 1 jaar: open source – je kunt zelf hosten
5. Stichting zorgt voor transitie-ondersteuning

**Dit voorkomt abrupte discontinuïteit.**

---

## 8. Hoe worden licentiekosten doorbelast?

Je supplier mag licentiekosten met **maximaal** een bepaalde marge doorberekenen:
- Klein (€3k): max. 15% → jij betaalt ~€3.450
- Mid (€8k): max. 12% → jij betaalt ~€8.960
- Groot (€15k): max. 10% → jij betaalt ~€16.500

**Alle overige diensten** (SLA, hosting, support, training, custom dev): **vrije marktprijsstelling**.

Suppliers concurreren op kwaliteit, niet op licentie.

---

## 9. Hoe werkt doorontwikkeling en features?

### Publieke features (collectieve behoefte)

Als 3+ gemeentes dezelfde feature willen:
- Stichting neemt op in roadmap
- Supplier bouwt het (betaald uit licentie-inkomsten)
- **Alle gemeentes kunnen het gebruiken** (upstream)

Voorbeeld: "Integratie met e-services." Dat willen gemeente A, B en C.
→ Stichting investeert, supplier bouwt, iedereen profiteert.

### Private features (jouw unieke wens)

Jij wilt iets specifieks (bijv. custom integratie met jouw zaaksysteem):
- Jij betaalt supplier direct voor custom development
- Supplier bouwt het (onder stichting-architectuur)
- **Code gaat upstream** – kan ook door anderen gebruikt worden

Voorbeeld: Gemeente X betaalt supplier €20k voor custom API-integratie.
→ Code gaat open, gemeente Y kan ook profiteren.

### Investeringen supplier

Supplier maakt eigen innovatie (via SLA/hosting-inkomsten):
- Kan ook upstream gaan (voordeel voor alle)
- Geen exclusiviteit mogelijk
- Stichting bewaakt architectuur

---

## 10. Wat zijn "preferred suppliers"?

Preferred suppliers zijn gecertificeerde leveranciers die aan strenge eisen voldoen:

- ISO/IEC 27001 (information security)
- Security patches < 48 uur
- 99%+ uptime SLA
- Jaarlijkse audit
- Upstream bijdragen (features gaan terug in Epistola)

**Voordelen voor jou:**
- Kwaliteitsgarantie
- Security-borging
- Geen vendor lock-in

**Alle major suppliers zullen preferred worden.**

---

## 11. Hoe werken aanbestedingen?

Standaard aanbestedingsproces:

1. Jouw gemeente publiceert: "Digitale documentdistributie"
2. Meerdere preferred suppliers kunnen inschrijven (allemaal met Epistola)
3. Jij kiest op: prijs, SLA, expertise, reputatie
4. Je sluit 1 contract met gekozen supplier

Dit voorkomt vendor lock-in en stimuleert concurrentie.

---

## 12. Wat als de stichting ophoudt te bestaan?

Zeer onwaarschijnlijk, maar wettelijk geborgd:

- IP en vermogen blijven publiek doel dienen
- Geen uitkering aan bestuurders/stewards
- Epistola gaat over naar vergelijkbare publieke entiteit (andere non-profit, coöperatief, etc.)

Dit staat in de statuten.

---

## 13. Wat zijn de risico's voor mijn gemeente?

Eerlijke antwoorden:

| Risico | Waarschijnlijkheid | Mitigatie |
|---|---|---|
| Supplier stopt | Laag–Gemiddeld | Andere kan overstappen; open source after year 2 |
| Security-incident | Laag | Preferred suppliers ISO/27001; jaarlijkse audit |
| Prijs stijgt | Laag | Schaalvoordelen dalen prijzen; transparantie |
| Features lukken niet | Laag–Gemiddeld | Upstream-verplichting; concurrent suppliers |

**Bottom line:** Risico's zijn beter beheerst dan bij propriëtaire leverancier.

---

## 14. Kan ik het contract tussentijds beëindigen?

Afhankelijk van supplier-contract (standaard commercial terms).

Maar: **overstap naar ander supplier is mogelijk** zonder data-verlies/discontinuïteit.
Dit is structureel gewaarborgd door stichting.

---

## Volgende stappen

1. **Vraag offerte aan [preferred supplier](/het-model/structuur-rollen/commerciele-partijen)**
2. **Vergelijk aanbiedingen** (prijs, SLA, expertise)
3. **Neem contact op met stichting** voor vragen over model/architectuur
4. **Check documentatie** voor meer details

**Nuttige links:**
- [Licentie & Kostenbeleid](/het-model/financieel/licentie-en-kostenbeleid) - Volledige prijstabel en schaalvoordelen
- [Aanbestedingen](/meedoen/gemeenten/aanbestedingen) - Hoe Epistola past in aanbestedingen
- [Organisatiestructuur](/het-model/structuur-rollen/structuur) - Hoe het model werkt
- [Volledige Samenvatting](/referentie/samenvatting) - Alle informatie in één document
