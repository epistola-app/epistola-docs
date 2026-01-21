---
title: Risico & Mitigatie
description: Uitgebreide risico-analyse met mitigatiestrategieën voor alle stakeholders
---

Dit document beschrijft risico's op operationeel, juridisch, financieel en strategisch niveau en hoe Epistola deze mitigeert.

---

## 1. Operationele risico's

### 1.1 Security-incident of data breach

**Risico:** Epistola verwerkt gevoelige gemeentelijke data. Een beveiligingsincident kan reputatie-, financi­ele en juridische gevolgen hebben.

**Omvang:**
- Waarschijnlijkheid: Gemiddeld (alle software zit risico in zich)
- Impact: Hoog (vertrouwensverlies, juridische claims, GDPR-boetes)

**Mitigatie:**
- Alle preferred suppliers moeten ISO/IEC 27001 hebben
- Jaarlijkse penetration testing (onafhankelijk)
- Security-audit bij incident (externe expert)
- Incident Response Plan: publiekelijk disclosure < 72 uur
- Cyber-liability verzekering (aanbevolen)
- Open-source auditing: transparantie faciliteert snelle fixes

**Aftasteling:** Hoog → Gemiddeld

---

### 1.2 Service Level Agreement niet gehaald

**Risico:** Leverancier haalt uptime-garanties niet of slecht incidentmanagement; gemeenten zijn afhankelijk.

**Omvang:**
- Waarschijnlijkheid: Laag–Gemiddeld (marktmechanisme duwt naar kwaliteit)
- Impact: Gemiddeld (gemeenten zoeken ander, niet systemisch)

**Mitigatie:**
- Contractueel vaste SLA-waarborgen (99%+ uptime, < 4 uur kritiek)
- Openbare SLA-rapportering (dashboard)
- Certificering-voorwaarde: aantoonbare SLA-naleving
- Meerdere leveranciers: geen single point of failure
- Stichting kan leverancier decertificeren en klanten bij ander herherbeven
- Contracten voorzien in boete/schadevergoeding

**Aftasteling:** Gemiddeld → Laag

---

### 1.3 Technische schuld en achterstand

**Risico:** Epistola groeit sneller dan onderhouding; codebase vervalt, security-patches niet gedaan, architectuur veroudering.

**Omvang:**
- Waarschijnlijkheid: Hoog (veel startups vallen hier in)
- Impact: Hoog (kan leiden tot volledige rewrite, kostbaar)

**Mitigatie:**
- Stichting financiert actief onderhoud (20% van budget)
- Upstream-verplichting: leveranciers moeten bugs terug brengen
- Architecture review jaarlijks (externe expert)
- Code-quality metrics publiek (test coverage, SAST/DAST)
- Refactor-sprints gepland in roadmap
- Open-source = community kan helpen

**Aftasteling:** Hoog → Gemiddeld

---

### 1.4 Leverancier-faillissement of exit

**Risico:** Huidge leverancier (bv. Zoef.app) gaat failliet, stopt, of besluit niet verder te gaan. Klanten zonder service.

**Omvang:**
- Waarschijnlijkheid: Laag–Gemiddeld (startups zijn risicovol)
- Impact: Hoog (onmiddellijke dienstverstoring)

**Mitigatie:**
- **Structurele ontdubbeling:** Meerdere leveranciers actief
- **Data-portability:** SBoM, API-exporteert, geen lock-in
- **Contractueel:** Overgangsperiode (30–90 dagen service na exit)
- **Stichting-stewardship:** Epistola IP blijft beschikbaar
- **Speedup alternatieve leveranciers:** Andere kunnen inzake intredend
- **Klant-optie:** Zelf hosten, naar andere leverancier, wacht

**Aftasteling:** Gemiddeld → Laag (structureel)

---

## 2. Financiële risico's

### 2.1 Onvoldoende inkomsten (gemeenten/klanten trekken in)

**Risico:** Epistola schaalt langzamer dan verwacht. Gemeenten kiezen alternatief. Stichting kan operatie niet financieren.

**Omvang:**
- Waarschijnlijkheid: Gemiddeld (marktrisico altijd aanwezig)
- Impact: Hoog (kan leiden tot operatie-stopzetting)

**Mitigatie:**
- **Conservatieve begroting:** Start met 2 FTE, schaal pas op realiteit
- **Continuïteitsbuffer:** Min. 6 maanden reserves (targets: €150k)
- **Pilot-fase:** Valideer interesse met 3–5 gemeenten voor volledige launch
- **Diversificatie:** Niet afhankelijk van één grote klant
- **Flexibele kostenstructuur:** Kunnen contractors afgaan als nodig
- **Multiple revenue streams:** Licenties + certificering + investeringen
- **Transparant naar klanten:** Gemeenten zien dat model duurzaam is

**Aftasteling:** Gemiddeld → Laag

---

### 2.2 Schaalvoordelen realiseren zich niet

**Risico:** Model veronderstelt dat kosten per afnemer dalen met groei. Dat kan niet gebeuren (overhead-kosten stijgen).

**Omvang:**
- Waarschijnlijkheid: Laag–Gemiddeld (scenario-afhankelijk)
- Impact: Gemiddeld (prijzen moeten omhoog)

**Mitigatie:**
- **Cloud-native architectuur:** Schaal zonder lineaire kostengroei
- **Geautomatiseerde operatie:** Stichting investeert in tooling (monitoring, CI/CD)
- **SaaS-model:** Leveranciers draaien operatie, niet stichting
- **Herijkingsprocedure:** Jaarlijkse review; prijzen aangepast als nodig
- **Transparantie:** Communicatie over kostenstructuur voorkomt verrassingen

**Aftasteling:** Gemiddeld → Laag–Gemiddeld

---

### 2.3 Margedruk en onleefbare marges voor leveranciers

**Risico:** Marge-cap op licentiedoorbelasting + vrije markt op services leidt tot race-to-the-bottom; leveranciers kunnen niet overleven.

**Omvang:**
- Waarschijnlijkheid: Gemiddeld (balans is lastig)
- Impact: Gemiddeld (geen leveranciers = geen service)

**Mitigatie:**
- **Marge-cap realistisch:** Afhankelijk van omvang (15% klein, 10% groot)
- **Meerdere inkomstenbronnen:** Leveranciers verdienen op SLA/hosting/support/training
- **Volledige transparantie:** Stichting communiceert doelbegroting; leveranciers zien dat het houdbaar is
- **Herijking marge-cap:** Jaarlijks review; kan omhoog als stichting dat rechtvaardigt
- **Pilot-pricing:** Werk met leveranciers mee in startfase (voorkeursvoorwaarden)

**Aftasteling:** Gemiddeld → Laag–Gemiddeld

---

## 3. Juridische risico's

### 3.1 Steward ownership juridisch aangevochten

**Risico:** Steward ownership is experimenteel. Rechtbank kan bepalen dat statuten ongeldig zijn, of dat eigendomsrechten teruggaan naar oprichters/investeerders.

**Omvang:**
- Waarschijnlijkheid: Laag (juridische basis is sterker)
- Impact: Catastrofaal (verlies controle over IP)

**Mitigatie:**
- **Juridische voorbereiding:** Statuten samengesteld door specialisten (steward ownership)
- **Notariële oprichting:** Formeel en rechtskrachtig
- **Precedent-screening:** Gekeken naar vergelijkbare entiteiten (Purpose Foundation, etc.)
- **Regelmatige audit:** Juridische compliance jaarlijks
- **Verzekering:** Director & Officer liability dekking
- **Pre-emptive communicatie:** Publiceer juridische basis; forestall challenges

**Aftasteling:** Laag → Zeer laag

---

### 3.2 Licentie-geschil (leverancier claimt IP-rechten)

**Risico:** Leverancier beweert dat eigen investeringen hun IP-rechten geven; geweigerd upstream-verplichting.

**Omvang:**
- Waarschijnlijkheid: Laag–Gemiddeld (contractueel vastgelegd)
- Impact: Hoog (kunnen architectuur-probleem creëren)

**Mitigatie:**
- **Helder contract:** All work-for-hire clauses; upstream is verplicht
- **Certificerings-voorwaarde:** Naleving licentie is vereist
- **Dispute resolution:** Mediation/arbitrage, niet rechtbank (sneller, goedkoper)
- **Open-source fallback:** Na 1 jaar kan community continue development; IP-geschil minder relevant
- **Verzekering:** Intellectual property liability dekking

**Aftasteling:** Gemiddeld → Laag–Gemiddeld

---

### 3.3 GDPR- en compliance-schending

**Risico:** Epistola verwerkt persoonlijke data van burgers. Schending van GDPR, privacywetten of open-data-verplichtingen.

**Omvang:**
- Waarschijnlijkheid: Laag (goed framework)
- Impact: Hoog (boetes tot 4% omzet)

**Mitigatie:**
- **Data Protection Officer:** Aanstelling (verplicht per GDPR)
- **Privacy by design:** Architectuurtjes voorkomen dataverlies
- **Leverancier-verantwoordelijkheid:** Processor-agreements, data-processing
- **Audit:** Jaarlijkse privacy-audit
- **Transparantie:** Publieke datagovernance-policy
- **Verzekering:** Cyber/privacy liability

**Aftasteling:** Laag → Zeer laag

---

### 3.4 Aanbestedingswetgeving-geschillen

**Risico:** Municipality stelt Epistola open in aanbesteding. Concurrenten betwisten procedure; juridische strijd.

**Omvang:**
- Waarschijnlijkheid: Laag (Epistola is open, niet exclusief)
- Impact: Gemiddeld (vertragingen, kosten)

**Mitigatie:**
- **Transparante communicatie:** Maak duidelijk dat Epistola open is, multiple suppliers
- **Standaard aanbestedingsdocumenten:** Helpen gemeenten goed uit te vragen
- **Referentie-municipalities:** Toon dat het werkt (stelt anderen gerust)

**Aftasteling:** Laag → Zeer laag

---

## 4. Strategische risico's

### 4.1 Markt-inbegrip van model is laag

**Risico:** Gemeenten/leveranciers begrijpen steward ownership niet; wantrouwen. Kopen niet in, groei stagneert.

**Omvang:**
- Waarschijnlijkheid: Gemiddeld (uitleg is nodig, maar concept is eerlijk)
- Impact: Gemiddeld (groei veel langzamer)

**Mitigatie:**
- **Duidelijke communicatie:** Onafhankelijke stichting, geen leveranciersvertwisting
- **Use cases/pilots:** Toon aan met eerste gemeenten
- **Training:** Workshops voor gemeentelijke inkopers
- **Proof points:** Case studies, referenties
- **Investerders/partners:** Sterke sponsors geven vertrouwen
- **Transparante website:** Duidelijk verhaal over governance

**Aftasteling:** Gemiddeld → Laag

---

### 4.2 Concurrentie van alternatives (SaaS propriëtair, of andere open-source)

**Risico:** Grote tech-bedrijven lanceren vergelijkbare diensten; of alternatieve open-source platforms groeien sneller.

**Omvang:**
- Waarschijnlijkheid: Hoog (markt is aantrekkelijk)
- Impact: Gemiddeld–Hoog (marktaandeel onder druk)

**Mitigatie:**
- **First mover:** Epistola is al in oprichting; kan voorsprong hebben
- **Publieke missie:** Veel gemeenten willen NIET propriëtair
- **Openheid:** Open source (na 1 jaar) is moeilijk te verslaan
- **Ecosystem:** Meerdere leveranciers werken op Epistola; harder om weg te dringen
- **Network effects:** Meer gemeenten = meer integrations = meer waarde
- **Differentiation:** Focus op publieke noden, niet tech-trendy marketing

**Aftasteling:** Hoog → Gemiddeld

---

### 4.3 Misalignment tussen stichting en leveranciers

**Risico:** Stichting wil innovatie/openheid; leveranciers willen rendement/controle. Conflict verlammt organisatie.

**Omvang:**
- Waarschijnlijkheid: Gemiddeld (spanning is inherent)
- Impact: Hoog (kan tot stagnatie leiden)

**Mitigatie:**
- **Helder governance-contract:** Afspraken vastgelegd, niet onderhandelbaar
- **Financiële transparantie:** Iedereen ziet inkomsten/uitgaven
- **Regelmatige dialoog:** Stichting + leveranciers + stewards
- **Escalatie-procedure:** Conflict resolution mecanisme (mediatie)
- **Medezeggenschap leveranciers:** Adviesrol, niet bestuur
- **Exit-optie:** Geen permanente afhankelijkheid (meerdere leveranciers)

**Aftasteling:** Gemiddeld → Laag–Gemiddeld

---

### 4.4 Politieke/bestuursrisico's

**Risico:** Regering stelt eis dat Epistola toch propriëtair/gesloten wordt; of financiering wordt ingetrokken.

**Omvang:**
- Waarschijnlijkheid: Laag (beleid gaat juist richting open source)
- Impact: Hoog (kan fataal zijn)

**Mitigatie:**
- **Juridische borgstelling:** Statuten voorkomen overheid-overname
- **Internationale standaards:** Aansluiting bij EU-open-source-agenda
- **Stakeholder-coalitie:** Steward-raad bevat onafhankelijke experts (moeilijk overgenomen)
- **Diversificatie:** Niet afhankelijk van Nederlandse subsidie (gemeenten betalen)
- **Publieke communicatie:** Transparantie en publieke steun

**Aftasteling:** Laag → Zeer laag

---

## 5. Risico-kaart: Prioriteit & Voorbereiding

| Risico | Waarschijnlijkheid | Impact | Priority | Mitigatie-status |
|--------|---|---|---|---|
| Security incident | Gemiddeld | Hoog | **Hoog** | In voorbereiding |
| Faillissement leverancier | Laag–Gem | Hoog | **Hoog** | Structureel ontworpen |
| Onvoldoende inkomsten | Gemiddeld | Hoog | **Hoog** | Conservatieve planning |
| Steward-uitdaging | Laag | Catastrofaal | **Gemiddeld** | Juridisch voorbereiding |
| Schaalvoordelen niet | Gem–Laag | Gemiddeld | **Gemiddeld** | Cloud-native design |
| Technische schuld | Hoog | Hoog | **Gemiddeld** | Budgettering |
| Marktmisverstand | Gemiddeld | Gemiddeld | **Gemiddeld** | Communicatie-plan |
| Concurrentie | Hoog | Gemiddeld | **Laag** | Network effects |
| Compliance | Laag | Hoog | **Laag** | Framework-inplace |
| Politiek risico | Laag | Hoog | **Laag** | Coalitie-building |

---

## Voortgang & Monitoring

**Jaarlijkse risico-review:**
- Update waarschijnlijkheden en impacts
- Publiceer risico-register
- Communiceer mitigaties aan stakeholders

**Kwartaalse alerts:**
- Alert bij opkomende risico's (bijv. markttrend, incident)
- Rapid response plan

**Crisis management:**
- Pre-appointed crisis team (bestuur + extern expert)
- Communication playbook voor slechte scenario's
- Versicheringscoverage

---

## Conclusie

Epistola is voorzien van realistische risico-mitigaties. De meeste risico's zijn laag–gemiddeld en beheerst. De grootste risico's (inkomsten, technische schuld, markt) zijn structureel aangepakt.

Dit geeft investeerders, gemeenten en leveranciers vertrouwen in duurzaamheid.
