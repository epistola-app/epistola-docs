---
title: Open source licenties — een overzicht
description: "Het brede licentielandschap in één pagina: permissive, copyleft, source-available en propriëtair, met de bekende vertegenwoordigers"
---

Software-licenties vormen een spectrum, geen lijst losse opties. Van volledig propriëtair tot volledige public domain, met diverse tussenvarianten die elk een ander evenwicht zoeken tussen vrijheid, bescherming en commercieel gebruik. Deze pagina biedt het overzicht — voor verdieping op Epistola's specifieke keuze, zie [De BSL-licentie](/referentie/bsl-licentie) en [Waarom geen EUPL?](/referentie/eupl-vergelijking).

---

## De vier categorieën

| Categorie | Wat het kenmerkt |
|---|---|
| **Permissive** | Maximale vrijheid: gebruik, wijzig, distribueer onder elke licentie, ook propriëtair |
| **Zwakke copyleft** | Wijzigingen aan de licentievaste bestanden moeten onder dezelfde licentie blijven, maar je mag combineren met andere code |
| **Sterke copyleft** | Elk afgeleid werk moet onder dezelfde licentie worden vrijgegeven — copyleft "infecteert" |
| **Source-available** | Broncode is inzichtelijk, maar gebruik is beperkt (geen volledige open source) |

Daarnaast staat **propriëtair** (geen broncode, alle rechten voorbehouden) en **public domain-achtig** (geen rechten geclaimd) aan beide uiteinden van het spectrum.

---

## Vergelijkingstabel

| Licentie | Categorie | OSI? | Patent-clausule | Network-use trigger | Commercieel vrij | Bekend gebruik |
|---|---|---|---|---|---|---|
| **MIT** | Permissive | Ja | Nee | n.v.t. | Ja | React, jQuery, Rails |
| **BSD (2/3-clause)** | Permissive | Ja | Nee | n.v.t. | Ja | FreeBSD, nginx, Go |
| **Apache 2.0** | Permissive | Ja | Ja | n.v.t. | Ja | Kubernetes, Android, Swift |
| **MPL 2.0** | Zwakke copyleft | Ja | Ja | Nee | Ja | Firefox, Rust (deels) |
| **LGPL** | Zwakke copyleft | Ja | Ja | Nee | Ja | glibc, Qt (deels) |
| **EUPL 1.2** | Zwakke copyleft | Ja | Ja | Nee | Ja | EU-software |
| **GPL v2** | Sterke copyleft | Ja | Impliciet | Nee | Ja | Linux kernel, Git |
| **GPL v3** | Sterke copyleft | Ja | Ja | Nee | Ja | Bash, GCC |
| **AGPL v3** | Sterke copyleft | Ja | Ja | **Ja** | Ja | MongoDB (tot 2018), Nextcloud |
| **BSL** | Source-available | Nee | n.v.t. | n.v.t. | Beperkt (tijdelijk) | HashiCorp, Sentry, MariaDB |
| **SSPL** | Source-available | Nee | n.v.t. | **Ja** | Beperkt | MongoDB (2018+), Elasticsearch |
| **FSL** | Source-available | Nee | n.v.t. | n.v.t. | Beperkt (tijdelijk) | Sentry (alternatief) |
| **CC0** | Public domain-achtig | n.v.t. | Nee | n.v.t. | Ja | Datasets, Wikipedia-content |
| **Unlicense** | Public domain-achtig | Ja | Nee | n.v.t. | Ja | Kleine utilities |
| **Propriëtair** | Geen open source | Nee | n.v.t. | n.v.t. | Volgens contract | Microsoft Office, Photoshop |

**Network-use trigger** betekent dat ook netwerkgebruik (bv. SaaS-aanbod) wordt beschouwd als "distributie" en de copyleft-verplichting activeert. Dit dichten van het zogenaamde "ASP-gat" (Application Service Provider) is een belangrijk onderscheid voor cloud-gebruik.

---

## Per categorie, kort uitgelegd

### Permissive

De minst restrictieve licenties. Iedereen mag de code gebruiken, wijzigen en distribueren — ook in propriëtaire producten — zolang de auteursrechtvermelding behouden blijft.

- **MIT** — De allersimpelste, drie alinea's. Maximale adoptie, geen patent-clausule.
- **BSD** — Vergelijkbaar met MIT, in twee smaken (2-clause: simpel; 3-clause: voegt non-endorsement toe).
- **Apache 2.0** — Permissive maar met een expliciete patent-clausule die meer juridische zekerheid biedt. De standaardkeuze voor grote open source projecten.

Voor permissive geldt: maximaal voor adoptie, minimaal voor bescherming tegen privatisering. Iemand kan een permissive-gelicentieerd project oppakken en er een gesloten product van maken.

### Zwakke copyleft

Vereist dat *wijzigingen aan de gelicentieerde bestanden zelf* onder dezelfde licentie worden vrijgegeven, maar je mag deze code combineren met andere — ook propriëtaire — code in een groter werk.

- **MPL 2.0** — Per-bestand copyleft. Veelgebruikt voor componenten die in andere systemen worden ingebed.
- **LGPL** — Zwakke variant van GPL, specifiek bedoeld voor libraries die door propriëtaire applicaties gebruikt mogen worden.
- **EUPL** — EU-licentie met copyleft-werking. Heeft compatibiliteitsclausule die relicensing naar andere copyleft-licenties toestaat. Zie de [EUPL-vergelijking](/referentie/eupl-vergelijking) voor uitgebreide analyse.

### Sterke copyleft

Elk afgeleid werk moet onder dezelfde (of compatibele) licentie worden vrijgegeven. Copyleft "infecteert" het hele werk waar de gelicentieerde code in zit.

- **GPL v2** — De originele sterke copyleft. Linux kernel, Git, en talloze GNU-tools gebruiken dit. Geen expliciete patent-clausule.
- **GPL v3** — Updatet GPL v2 met expliciete patent-clausule, anti-tivoization-bepaling en betere compatibiliteit.
- **AGPL v3** — GPL v3 + network-use trigger. Wie de software als SaaS aanbiedt moet de broncode (inclusief wijzigingen) publiceren. Gebruikt door projecten die "het ASP-gat" willen dichten.

### Source-available

Broncode is publiek beschikbaar voor inzage, maar het gebruiksrecht is beperkt — geen volledige open source. Vaak een tussenvorm met commerciële beperkingen.

- **BSL (Business Source License)** — Gebruik is beperkt in jaar 1 (commercieel gebruik vereist licentie), daarna automatische overgang naar een vrije licentie (vaak Apache 2.0). Door MariaDB ontworpen, gebruikt door HashiCorp (Terraform, Vault, Consul), Sentry, Couchbase.
- **SSPL (Server Side Public License)** — Vergelijkbaar met AGPL maar nog restrictiever: wie de software als dienst aanbiedt moet *alle infrastructuur-code* publiceren. Niet erkend als open source door OSI. Door MongoDB en Elastic gebruikt als reactie op cloud-providers.
- **FSL (Functional Source License)** — Vergelijkbaar met BSL maar simpeler ontwerp: na 2 jaar Apache 2.0 of MIT, met beperking tegen direct concurrerende producten in jaar 1–2.

Source-available licenties zijn een eerlijke poging om commerciële financiering te combineren met code-transparantie. Ze worden in toenemende mate gebruikt door projecten met een open source kern die de financieringsuitdaging niet anders oplossen.

### Public domain-achtig

Geen of minimale rechten claimen — de auteur geeft de software effectief vrij voor elk gebruik.

- **CC0** — Creative Commons Zero, een poging om public domain-achtige status te creëren in jurisdicties waar dat niet vanzelfsprekend mogelijk is.
- **Unlicense** — Een korte tekst die zegt: "ik doe afstand van alle rechten". Niet OSI-erkend in alle interpretaties, maar wel praktisch werkzaam.

Voor de meeste software is volledig public domain niet ideaal omdat het geen aansprakelijkheids-disclaimers bevat. Daarom kiezen de meeste auteurs voor MIT of Apache 2.0 in plaats van CC0.

### Propriëtair

Broncode niet beschikbaar (of alleen onder strenge NDA), gebruik strikt volgens contract. Geen vrijheid om te wijzigen, geen vrijheid om te delen.

Buiten scope van deze pagina, maar relevant als nulpunt: alles wat naar links van propriëtair beweegt, is een vorm van openheid.

---

## Wat dit voor Epistola betekent

Epistola hanteert drie mogelijke modellen die elk een eigen licentiekeuze impliceren. De definitieve keuze is nog niet gemaakt — de site beargumenteert wel een voorkeur en een transitiepad.

| Model | Licentie | Status |
|---|---|---|
| **Model 1** — Open source + diensten | Permissive (Apache 2.0) of copyleft (AGPL/EUPL) | Huidig startpunt — pragmatische adoptie |
| **Model 2** — BSL + ecosysteem | BSL met change date naar Apache 2.0 | Voorkeursmodel, voorzien als eindbestemming |
| **Model 3** — Centraal aanbesteed | Afhankelijk van VNG-eisen | Wordt mogelijk gemaakt, niet actief nagestreefd |

Het BSL-model combineert code-transparantie vanaf dag 1, tijdelijke commerciële regulering voor platformfinanciering, en automatische overgang naar maximale vrijheid na één jaar. Voor de volledige onderbouwing en de redenering achter de modelkeuze, zie [Modelkeuze & Transitiestrategie](/epistola/modelkeuze). Voor de werking van de BSL specifiek, zie [De BSL-licentie](/referentie/bsl-licentie). Voor de EUPL-afweging zie [Waarom geen EUPL?](/referentie/eupl-vergelijking).

---

## Zie ook

- [De BSL-licentie](/referentie/bsl-licentie) — Hoe BSL werkt en hoe de change date werkt
- [Waarom geen EUPL?](/referentie/eupl-vergelijking) — De specifieke EUPL-afweging
- [Bronnen](/referentie/bronnen) — Externe verwijzingen over licenties
